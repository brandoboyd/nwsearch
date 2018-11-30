// Module:           _field.ts
// Description:       Field-level recognition engine
// Also-see:
// Tab-stops:        4
// Author:          DR
// Language:         js
// Creation Date:     04/02/2018
// Description:
// Revisions:

// ==========================================================================
// See _global.d.ts for _global definitions.
// ==========================================================================

//     Precompiled regular expressions for the following function.
//

import {_global, FieldConverter} from './FieldConverter';
import {matchPhrase, matchPhraseInAlias} from './_string';
import {DataCleanser} from './ingestion/DataCleanser';
import {mModelSynonyms} from './_mmdata';
import {MapTrim} from './_trim';

const _ = require('lodash');
const cleanseConfig = require('./ingestion/cleanse/CleanseConfig.ts');

const nwUtils = require('./util/commonUtils');
const sWhiteSpace = /\s+/;
const dataCleanser = new DataCleanser();

// Class definition for _fieldValidator.
//
export class _fieldValidator extends FieldConverter {

    // Parallel arrays  of words in sentence and their identifiers.
    sLastMakeHandled: string;
    sLastModelHandled: string;
    aWords: string[];
    aIdentifiedAs: string[];
    countryCode: string;
    private numericalRange: RegExp = /^[0-9]+-[0-9]+|[0-9]+ - [0-9]+|[0-9]+to[0-9]+|[0-9]{1,3}k - [0-9]{1,6}k|[0-9]{1,3}k-[0-9]{1,6}k$/;  // year or odometer range;
    // We save any sentence passed in for reference purposes.
    //     A parallel array indicates whether we've identified the word.

    constructor(sCountryCode: string = '1') {
        super();
        this.countryCode = sCountryCode;
        this.resetFields();
    }

    // Interpret a sentence.
    //
    interpretSentence(sSentence: string) {
        // console.log(sSentence);
        this.resetFields();
        // Locals.
        let i: number;
        let nWordsHandled: number = 1;

        // Bust sentence into words.
        let aWords = this.convertSentenceToArray(sSentence);
        // First pass: try to decipher each word.
        //
        for (i = 0; i < aWords.length; i += nWordsHandled) {
            nWordsHandled = this.identifyWord(aWords, i, aWords.length);
        }
        // Return array of data-pairs. Note that we're combining makes and models
        let aKeyValuePairs = [];
        let oMakeHash = new Map();
        let allMakes: string[] = [];
        let addedMakes: string[] = [];
        for (i = 0; i < this.aWords.length; i++) {
            if (this.aIdentifiedAs[i] === 'make' && this.aWords[i] !== undefined) {
                // oMakeHash[this.aWords[i].toLowerCase()] = '';
                allMakes.push(this.aWords[i].toLowerCase());
                continue;
            }
            if (this.aIdentifiedAs[i] === 'model') {
                if (typeof _global.oModel2Make[this.aWords[i].toLowerCase()] === 'undefined') {
                    continue;
                }
                let sMake = _global.oModel2Make[this.aWords[i].toLowerCase()].toLowerCase();
                if (typeof oMakeHash[sMake] === 'undefined') {
                    oMakeHash[sMake] = this.aWords[i];
                    addedMakes.push(sMake);
                } else {
                    if (oMakeHash[sMake].length) {
                        oMakeHash[sMake] += ',' + this.aWords[i];
                    } else {
                        oMakeHash[sMake] = this.aWords[i];
                    }
                }

            }
        }
        //
        // Now add rationalized makes and models.
        //
        let missedMakesWithOutModel = (_.differenceWith(allMakes, addedMakes, _.isEqual));
        missedMakesWithOutModel.forEach(function (element) {
            oMakeHash[element] = '';
        });
        let sMakeList = '';
        let sModelList = '';
        let aTemp = Object.keys(oMakeHash);
        for (i = 0; i < aTemp.length; i++) {
            if (i) {
                sMakeList += ',';
                sModelList += '%7C';
            }
            sMakeList += aTemp[i] ? _global.oMake[aTemp[i].toLowerCase()] : aTemp[i];
            if (oMakeHash[aTemp[i]] && _global.oModel[oMakeHash[aTemp[i]].toLowerCase()]) {
                sModelList += _global.oModel[oMakeHash[aTemp[i]].toLowerCase()];
            } else {
                sModelList += oMakeHash[aTemp[i]];
            }
        }
        if (sMakeList.length) {
            aKeyValuePairs.push('make: ' + sMakeList);
        }
        if (sModelList.length) {
            if (!(sModelList.length === 1 && sModelList[0] === ',')) {
                if (sModelList.endsWith(',')) {
                    sModelList = sModelList.slice(0, -1);
                }
                aKeyValuePairs.push('model: ' + sModelList);
            }
        }
        //
        // Now add the rest of the key-value pairs.
        //
        for (i = 0; i < this.aWords.length; i++) {
            if (this.aIdentifiedAs[i] === 'make' || this.aIdentifiedAs[i] === 'model') { // Also remove state is 'auctionLocation' exists.
                continue;
            }
            let key = this.aIdentifiedAs[i];
            aKeyValuePairs.push(key + ': ' + this.aWords[i]);
        }
        return (aKeyValuePairs);
    }

    interpretSentenceAsObj(sSentence: string) {
        let aKeyValuePairs = this.interpretSentence(sSentence);
        let json: any = {};
        aKeyValuePairs.forEach(function(value) {
            let arr = value.toString().split(':');
            json[arr[0].trim()] = arr[1].trim();
        });
        // console.log(sSentence, '\t',  json);

        return json;
    }

    private resetFields() {
        this.aWords =        [];
        this.aIdentifiedAs =   [];
        this.sLastMakeHandled = '';
        this.sLastModelHandled = '';
        this.aIdentifiedAs =   [];
        super.initializeLocalMap(this.countryCode === '1' ? 'United States' : 'Canada');
    }
    // The 'identifyWord' method uses a series of regular expressions to
    //     convert free-text into a JSON-like key-value pair. Example: 25000
    //     odometer: 25000.
    //
    //     For certain alpha fields, the Levenshtein algorithm is used to
    //     detect misspelllings.
    //
    //     Returns a field (key) name if recognized or empty string if not.
    //
    private identifyWord(aWords: string[], nCurrentWord: number, nTotalWords: number) {
        let nWordsConsumed = 1;
        let sKey = '';
        let sWord = aWords[nCurrentWord];

        do {
            if (typeof sWord === 'string') {
                sWord = sWord.toString().toLowerCase().trim();
            }

            // To speed things up, we look at the first character of the target word.
            //     A number versus a letter helps us omit certain matches.
            if (sWord !== 'string' && (sWord + '').substr(0, 1).match(_global.reDigit)) {
                sWord = sWord + ''; // Convert it to string to deal with it easily.
                sWord = sWord.replace(/miles/gi, '').replace(/kms/gi, '').replace(/miles/gi, '');
                if (sWord.match(this.numericalRange)) { // Range operator exist in code like '-' or 'to'.
                    const __ret = this.handleNumericalRange(sWord, sKey); // Year or odometer range is handled.
                    sWord = __ret.sWord;
                    sKey = __ret.sKey;
                    break;
                } else { // numeric but no range operator exist in a word.
                    if (sWord.match(nwUtils.reYear) && !('' + aWords[nCurrentWord + 1]).toLowerCase().startsWith('cyl')
                        && !(parseInt(sWord) >= 25 && parseInt(sWord) <= 65)) { // To address a 10 Cylinder being cleansed as Year 2010 and engine Cylinder. Also handle Mercedes-Benz	C-CLASS AMG C 63
                        sKey = 'year';
                        sWord = dataCleanser.cleanseField(sKey, sWord, _.find(cleanseConfig.cleanseMaps, {fieldName: sKey}), '')[0];
                        break;
                    }
                    if (sWord.match(_global.reOdometer)) {
                        const __ret = this.handleNumericalRange('1'.concat('-').concat(sWord), sKey); // Year or odometer range is handled.
                        sWord = __ret.sWord;
                        sKey = __ret.sKey;
                        // sKey = 'odometer';
                        // sWord = dataCleanser.cleanseField(sKey, sWord, _.find(cleanseConfig.cleanseMaps, {fieldName: sKey}), '')[0];
                        break;
                    }
                }
            }

            // Multiword SellerOrg
            let sSellerOrg: string = matchPhrase(_global.aSellerOrg, aWords, nCurrentWord, nTotalWords, true);

            // May be a Location.
            let tempProcessingLocation = _global.reAdesaLocation[sWord] ? _global.reAdesaLocation[sWord] : matchPhrase(_global.reAdesaLocation, aWords, nCurrentWord, nTotalWords);
            if (tempProcessingLocation) {
                let nWordsConsumedLocation = tempProcessingLocation.split(' ').length;
                let nWordsConsumedSeller = sSellerOrg.split(' ').length;
                if (nWordsConsumedSeller <= nWordsConsumedLocation) { // Matches more with seller or location.
                    this.addDataPair('Location Type', 'ADESA Locations');
                    nWordsConsumed = nWordsConsumedLocation;
                    sKey = 'auctionLocation';
                    sWord = dataCleanser.cleanseField('processingLocation', tempProcessingLocation, _.find(cleanseConfig.cleanseMaps, {fieldName: 'processingLocation'}), '')[0];
                } else {
                    sKey = 'seller';
                    sWord = sSellerOrg.toUpperCase();
                    nWordsConsumed = nWordsConsumedSeller;
                }
                break;
            }

            // Misspelled processing location (prefixed with ADESA ex: ADESA Indianapoli)
            // Misspelled multiword city is NOT handled.
            if (sWord === 'adesa') {
                // Misspelled auctionLocation?
                let nSlot4Location = nwUtils.dyn_functions['levenshteinArray'](aWords[nCurrentWord + 1], _global.aLocation);
                if (nSlot4Location >= 0) {
                    this.addDataPair('Location Type', 'ADESA Locations');
                    sKey = 'auctionLocation';
                    sWord = 'ADESA ' + _global.aLocation[nSlot4Location];
                    nWordsConsumed = 2;
                    break;
                }
            }

            // Exact match for State abbreviation or city alias name

            if (typeof _global.oAdesaLocationDetail[sWord] !== 'undefined') {
                this.addDataPair('Location Type', 'ADESA Locations');
                sKey = 'auctionLocation';
                if (sWord.length === 2 && nTotalWords > 1) { // state abbreviation - MI Adesa Flint
                    let tempProcessingLocation = matchPhrase(_global.reAdesaLocation, aWords, nCurrentWord + 1, nTotalWords);
                    // If MI ADESA Flint is entered, check if it is state (auto complete is used), then consume all words, add 1 for state
                    // and then use multiword to match against the location inside the state.
                    if (tempProcessingLocation) {
                        let nWordsConsumedLocation = tempProcessingLocation.split(' ').length + 1;
                        nWordsConsumed = nWordsConsumedLocation;
                        sKey = 'auctionLocation';
                        sWord = dataCleanser.cleanseField('processingLocation', tempProcessingLocation, _.find(cleanseConfig.cleanseMaps, {fieldName: 'processingLocation'}), '')[0];
                    }
                } else {
                    sWord = _global.oAdesaLocationDetail[sWord];
                }
                // Youngblood (11-08-2018) passing sWord as an empty string to fix OS-955.
                // There is an if statement and the end of the function that checks the sKey/sWord
                // based on sKey=auctionLocation and sWord = empty string
                // sWord = '';
                break;
            }

            // Multiword SellerOrg
            // if (sSellerOrg === '') { sSellerOrg = _global.reSellerOrg[sWord]; } // SingleWord
            if (sSellerOrg) {
                sKey = 'seller';
                sWord = sSellerOrg.toUpperCase();
                nWordsConsumed = sSellerOrg.split(' ').length;
                break;
            }

            if (this.sLastMakeHandled  && this.sLastModelHandled ) {
                let sMakeModel = this.sLastMakeHandled + '|' + this.sLastModelHandled;
                sMakeModel = sMakeModel.toLowerCase();
                if (typeof _global.oTrims4MakeModel[sMakeModel] !== 'undefined') {
                    let sTrim: string = _global.oTrims4MakeModel[sMakeModel];
                    let reTrim = new RegExp('^(' + sTrim + ')$', 'i');
                    let tempTrim = matchPhrase(reTrim, aWords, nCurrentWord, nTotalWords);
                    if (!tempTrim) {
                        if (reTrim.test(sWord)) {
                            sTrim.toString().split('|').find(function(element) {
                                tempTrim = element;
                                return element.toLowerCase() === sWord;
                            });
                        }
                    }
                    sTrim = tempTrim;
                    if (sTrim ) {
                        sKey = 'trim';
                        let tempArr = MapTrim(sTrim, this.sLastMakeHandled, this.sLastModelHandled, _global);
                        sWord = sTrim = tempArr[0].toString();
                        nWordsConsumed = sTrim.split(' ').length;
                        break;
                    }
                    if (sWord === 'base') {
                        // If the Base was one of recognized trim it would have been caught in previous block. Since, just 'base' trim does not exist in mmdata, it represents blank.
                        sKey = 'trim';
                        sWord = '';
                        break;
                    }

                    if (sWord === 'sport') {
                        // If the Base was one of recognized trim it would have been caught in previous block. Since, just 'base' trim does not exist in mmdata, it represents blank.
                        sKey = 'trim';
                        if (reTrim.test('se')) {
                            sWord = 'SE';
                        } else if (reTrim.test('s')) {
                            sWord = 'S';
                        } else {
                            sWord = 'Sport';
                        }
                        break;
                    }
                    // Place to spell check for trim when make/model provided.
                }
            }

            // Once we have a make, give precedence to model.
            if (this.sLastMakeHandled  && !this.sLastModelHandled) {
                let hasUsedAliasName = false;
                let sTempModel: string = matchPhrase(_global.oModel, aWords, nCurrentWord, nTotalWords);
                if (sTempModel === '') {
                    sTempModel = matchPhraseInAlias(_global.oModel, aWords, nCurrentWord, nTotalWords, mModelSynonyms, false);
                    if (sTempModel ) { hasUsedAliasName = true; }
                }
                if (!sTempModel) { sTempModel = _global.oModel[sWord]; }
                if (sTempModel) {
                    if (this.sLastMakeHandled.length < 1 && this.sLastMakeHandled !== _global.oModel2Make[sTempModel.toLowerCase()] ) {
                        // Make was empty and we found a value this time, let is assign 'make', Or make was different from last handled make (new make found)
                        this.addDataPair('make', _global.oModel2Make[sTempModel.toLowerCase()]);
                    }
                    sWord = sTempModel;
                    sKey = 'model';
                    nWordsConsumed = sTempModel.split(' ').length;
                    if (hasUsedAliasName) { nWordsConsumed += 1; }
                    break;
                }
            }

            // This is to handle a case where make and model are same. ex: 'Alfa Romeo Alfa Romeo Graduate'
            // if (this.sLastMakeHandled === '') { // Multiwords can be handled later differently.
            // Handle make synonyms.
            if (typeof _global.oMakeSynonyms[sWord] !== 'undefined') {
                sKey = 'make';
                sWord = _global.oMakeSynonyms[sWord];
                break;
            }
            // Make: note these can be multi-word, so we use helper.
            // The second condition is added to handle a case where make and model are same. ex: 'Alfa Romeo Alfa Romeo Graduate'
            if (this.sLastMakeHandled === '' || (this.sLastMakeHandled && this.sLastMakeHandled.indexOf(' ') === -1)) {
                let sMakeTemp: string = matchPhrase(_global.reMake, aWords, nCurrentWord, nTotalWords);
                if (!sMakeTemp) { sMakeTemp = _global.oMake[sWord]; }
                if (sMakeTemp) {
                    sKey = 'make';
                    sWord = sMakeTemp;
                    nWordsConsumed = sMakeTemp.split(' ').length;
                    break;
                }
            }

            // }
            // State.
            if (_global.reState.test(sWord)) {
                sKey = 'state';
                break;
            }

            // Model? Note models can have synonyms (the value of the key/value pair).
            let sTemp: string = matchPhrase(_global.oModel, aWords, nCurrentWord, nTotalWords);
            let hasUsedAliasName = false;
            if (!sTemp) {
                sTemp = matchPhraseInAlias(_global.oModel, aWords, nCurrentWord, nTotalWords, mModelSynonyms);
                if (sTemp ) { hasUsedAliasName = true; }
            }
            if (!sTemp) { sTemp = _global.oModel[sWord]; }
            if (sTemp ) {
                if (this.sLastMakeHandled.length < 1 && this.sLastMakeHandled !== _global.oModel2Make[sTemp]) {
                    // Make was empty and we found a value this time, let is assign 'make', Or make was different from last handled make (new make found)
                    let temp = _global.oModel2Make;
                    this.addDataPair('make', _global.oModel2Make[sTemp.toLowerCase()]);
                    // _global.oModel2Make
                }
                sWord = sTemp;
                sKey = 'model';
                nWordsConsumed = sTemp.split(' ').length;
                if (hasUsedAliasName) { nWordsConsumed += 1; }
                break;
            }

            // Multiword drivetrain
            let sDrivetrainTemp: string = matchPhrase(_global.oDriveTrainDetail, aWords, nCurrentWord, nTotalWords);
            if (sDrivetrainTemp ) {
                sKey = 'driveTrain';
                sWord = _global.oDriveTrainDetail[sDrivetrainTemp.toLowerCase()];
                nWordsConsumed = sDrivetrainTemp.split(' ').length;
                break;
            }
            // Singleword drivetrain and then check.
            let tempDrivetrain = dataCleanser.cleanseField('driveTrain', sWord, _.find(cleanseConfig.cleanseMaps, {fieldName: 'driveTrain'}), '')[0];
            if (_global.reDriveTrain.test(tempDrivetrain)) {
                sKey = 'driveTrain';
                sWord = tempDrivetrain;
                break;
            }

            // Multiword transmission
            let sTransmissionTemp: string = matchPhrase(_global.oTransmissionDetail, aWords, nCurrentWord, nTotalWords);
            if (sTransmissionTemp ) {
                sKey = 'transmission';
                sWord = _global.oTransmissionDetail[sTransmissionTemp.toLowerCase()];
                nWordsConsumed = sTransmissionTemp.split(' ').length;
                break;
            }
            // Single word transmission - cleansed
            let tempTransmission = dataCleanser.cleanseField('transmission', sWord, _.find(cleanseConfig.cleanseMaps, {fieldName: 'transmission'}), '')[0];
            if (_global.reTransmission.test(tempTransmission)) {
                sKey = 'transmission';
                sWord = tempTransmission;
                break;
            }

            // Multiword color
            let sColorTemp: string = matchPhrase(_global.oColorDetail, aWords, nCurrentWord, nTotalWords);
            if (sColorTemp ) {
                sKey = 'exteriorColor';
                sWord = _global.oColorDetail[sColorTemp.toLowerCase()];
                nWordsConsumed = sColorTemp.split(' ').length;
                break;
            }
            // Color.
            if (_global.reColor.test(sWord)) {
                sKey = 'exteriorColor';
                sWord = dataCleanser.cleanseField('exteriorColor', sWord, _.find(cleanseConfig.cleanseMaps, {fieldName: 'exteriorColor'}), '')[0];
                break;
            }

            // Cleansed engineName
            let sEngineTemp: string = matchPhrase(_global.oEngineList, aWords, nCurrentWord, nTotalWords);
            if (sEngineTemp ) {
                sKey = 'engine';
                sWord = dataCleanser.cleanseField('engineName', sEngineTemp, _.find(cleanseConfig.cleanseMaps, {fieldName: 'engineName'}), '')[0];
                nWordsConsumed = sEngineTemp.split(' ').length;
                break;
            }
            // Uncleansed Engine name search
            let sOrigEngineTemp: string = matchPhrase(_global.oOriginalEngineList, aWords, nCurrentWord, nTotalWords);
            if (sOrigEngineTemp ) {
                sKey = 'originalEngine';
                // sWord = sOrigEngineTemp;
                if (sOrigEngineTemp && sOrigEngineTemp !== 'UNKNOWN') {
                    sWord = _global.oOriginalEngineList[sOrigEngineTemp];
                    if (!sWord) { sWord = _global.oOriginalEngineList[sOrigEngineTemp.toLowerCase()]; } // Try all cases
                    nWordsConsumed = sOrigEngineTemp.split(' ').length;
                    break;
                }
            }

            // Misspelled make?
            let nSlot = nwUtils.dyn_functions['levenshteinArray'](sWord, _global.aMake);
            if (nSlot >= 0) {
                sKey = 'make';
                sWord = _global.aMake[nSlot];
                break;
            }

            // Misspelled model?
            //
            if (this.sLastMakeHandled.length) {
                if (typeof _global.oModels4Make[this.sLastMakeHandled.toLowerCase()] !== 'undefined') {
                    let aModel4Make = _global.oModels4Make[this.sLastMakeHandled.toLowerCase()].split('|');
                    nSlot = nwUtils.dyn_functions['levenshteinArray'](sWord, aModel4Make);
                    if (nSlot >= 0) {
                        sKey = 'model';
                        sWord = aModel4Make[nSlot];
                        sWord = sWord.toString().trim();
                        break;
                    }
                }
            }

            // Misspelled color?
            // if (_global.reColor.test(sWord)) { // Regular expression map.
            nSlot = nwUtils.dyn_functions['levenshteinArray'](sWord, _global.aColor);
            if (nSlot >= 0) {
                sKey = 'exteriorColor';
                sWord = _global.aColor[nSlot];
                break;
            }
            // }

            // VIN.
            if (_global.reVIN.test(sWord)) {
                sKey = 'vin';
                sWord = sWord.toUpperCase();
                break;
            }

            // Misspelled auctionLocation without ADESA prefix?
            nSlot = nwUtils.dyn_functions['levenshteinArray'](sWord, _global.aLocation);
            if (nSlot >= 0) {
                this.addDataPair('Location Type', 'ADESA Locations');
                sKey = 'auctionLocation';
                sWord = 'ADESA ' + _global.aLocation[nSlot];
                break;
            }

            // Haven't identified? We'll use multi-match to try.
            // this.aWords.push('make,model,sellerOrganizationName');
            // this.aIdentifiedAs.push('mmf');
            // sKey = 'mmv';
            sKey = ''; // This line is a must. The empty key will not be added to the cleansed array.
            break;

        } while (0);

        // Start the beta clause - The word could NOT be cleansed at all, give it second level
        if (sKey === '') {
            this.executeSecondLevelCleanse(sWord, aWords, nCurrentWord, nTotalWords); // Check all models
        } else {
            // Youngblood (11-08-2018):  Added the if constraint because of a defect with multiple auction locations
            // per state not working properly.  OS-955
            // This is a patch and the underlying logic should be updated when refactored.
            if (!(sKey === 'auctionLocation' && sWord === '')) {
                this.addDataPair(sKey, sWord);
            }
        }
        // Return number of words processed.
        //
        return (nWordsConsumed);
    }

    private handleNumericalRange(sWord, sKey: string) {
        let str = sWord.indexOf('to') > -1 ? sWord.split('to') : sWord.split('-');
        if (str.length === 2) {
            if (str[0].trim().match(nwUtils.reYear) && str[1].trim().match(nwUtils.reYear)) {
                sKey = 'year';
                sWord = dataCleanser.cleanseField(sKey, str[0].trim(), _.find(cleanseConfig.cleanseMaps, {fieldName: sKey}), '')[0]
                    + '-' + dataCleanser.cleanseField(sKey, str[1].trim(), _.find(cleanseConfig.cleanseMaps, {fieldName: sKey}), '')[0];
            } else if ((str[0].trim().match('^[0-9]+') && str[1].trim().match('^[0-9]+')) || // 3000-5000
                (str[0].trim().match('^[0-9]{1,3}k') && str[1].trim().match('^[0-9]{1,5}k'))) { // 3k - 5K
                sKey = 'odometer';
                sWord = dataCleanser.cleanseField(sKey, str[0].trim(), _.find(cleanseConfig.cleanseMaps, {fieldName: sKey}), '')[0]
                    + '-' + dataCleanser.cleanseField(sKey, str[1].trim(), _.find(cleanseConfig.cleanseMaps, {fieldName: sKey}), '')[0];
            }
        }
        return {sWord, sKey};
    }

// Sentence to array.
    //
    private convertSentenceToArray(sSentence: string) {
        sSentence = sSentence.toString().trim();
        return (sSentence.split(sWhiteSpace));
    }

    private executeSecondLevelCleanse(sWord, aWords, nCurrentWord, nTotalWords) {

        // Model
        let sTempModel = matchPhraseInAlias(_global.oModel, aWords, nCurrentWord, nTotalWords, mModelSynonyms, true); // Ends with check to handle BMKW 1 series 128i.
        if (sTempModel) {
            if (this.sLastMakeHandled.length < 1 && this.sLastMakeHandled !== _global.oModel2Make[sTempModel.toLowerCase()]) {
                sTempModel = _global.oModel[sWord];
                sWord = sTempModel;
            }
        } else {
            let nSlot = nwUtils.dyn_functions['levenshteinArray'](sWord, _global.aModel);
            if (nSlot >= 0) {
                sTempModel = sWord = _global.aModel[nSlot].toString();
            }
        }
        if (sTempModel) {
            let sKey = 'make';
            let sMakeWord4Model = _global.oModel2Make[sWord.toLowerCase()];
            this.addDataPair(sKey, sMakeWord4Model);

            sKey = 'model';
            sWord = sTempModel;
            sWord = sWord.toString().trim();
            this.addDataPair(sKey, sWord);
        }
    }

    private addDataPair(sKey: string, sWord) {
        if (!['make', 'model', 'trim'].includes(sKey) && this.aIdentifiedAs.includes(sKey)) { // Other than make/model/trim but already added, then just append the value with comma.
            if (!this.aWords[this.aIdentifiedAs.indexOf(sKey)].split(',').includes(sWord)) { // Not already added
                this.aWords[this.aIdentifiedAs.indexOf(sKey)] = this.aWords[this.aIdentifiedAs.indexOf(sKey)].toString().concat(',').concat((sWord) ? sWord : '');
            }
            return;
        }
        this.aIdentifiedAs.push(sKey);
        this.aWords.push((sWord === null || sWord === undefined) ? '' : sWord);

        // console.log(sKey, sWord);
        if (sKey && sWord ) {
            if (sKey === 'make') {
                this.sLastMakeHandled = sWord;
            } else if (sKey === 'model') {
                this.sLastModelHandled = sWord;
            }
        }
    }
}

// function getString(tempString: Map<String, Set<string>>) {
//     const util = require('util');
//     return JSON.stringify(util.inspect(tempString, {depth: null}))
//         .toString()
//         .replace(/Map/g, '')
//         .replace(/Set/g, '')
//         .replace(/\\n/g, '')
//         .replace(/=>/g, ':');
// }
// ...end class _fieldValidator.
//   [EOF]

