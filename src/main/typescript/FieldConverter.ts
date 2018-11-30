import {GlobalBase} from './GlobalBase';

export let _global;
const nwUtils = require('./util/commonUtils');
// const sWhiteSpace = /\s+/;
interface IMap2 { [key: string]: any; }
let synonymsMap: IMap2;
let aSynonymsMap: IMap2;
let regExMap: IMap2;
let _global_US = new GlobalBase('1');
let _global_CA = new GlobalBase('2');

export class FieldConverter {
    sAdesaProcessingLocation: string;
    constructor() {
    }

    initializeLocalMap(countryName: string = 'United States') {
        _global = countryName.toLowerCase() === 'united states' ? _global_US : _global_CA;
        this.sAdesaProcessingLocation = _global.sAdesaLocation;
        synonymsMap = {
            'oMakeSynonyms' : _global.oMakeSynonyms,
            'oModel'        : _global.oModel,
            'omodels4make'  : _global.oModels4Make,
            'omodel2make'   : _global.oModel2Make,
            'oColor' : _global.oColorDetail,
            'oDriveTrain' : _global.oDriveTrainDetail,
            'oTransmission' : _global.oTransmissionDetail,
            'oAdesaLocation': _global.oAdesaLocationDetail
        };
        aSynonymsMap = {
            'amake'         : _global.aMake,
            'aexteriorColor'        : _global.aColor,
            'ainteriorColor'        : _global.aColor,
            'aprocessingLocation' : _global.aAdesaLocation,
            'amodel'    : _global.aModel
        };
        regExMap = {
            'reexteriorColor'       : _global.reColor,
            'reinteriorColor'       : _global.reColor,
            'reDriveTrain'          : _global.reDriveTrain,
            'readesaLocation'        : _global.reAdesaLocation,
            'remodel'               : _global.remodel,
            'reTransmission'        : _global.reTransmission
        };
    }

    // Cleanse field attempts to cleanse/scrub a specified field, otherwise
    // 	it returns the original value.
    cleanseField(sField: string, sWord: string, config: any, data: any) {
        let recognizedValue: boolean = false;
        let sNewVal = sWord; // Assume.
        let result;
        if (config === undefined) {
            return [sNewVal, recognizedValue];
        }
        if (sWord === undefined || sWord === null) return [null, recognizedValue];

        this.initializeLocalMap(data.countryName);
        // Data comparision from synonyms are case insensitive operation but the the data saved to ES will use the same case from canonical data file.
        if (typeof sWord === 'string') {
            sNewVal = sWord = sWord.trim();
            /* if ( config.caseSensitive  && !(config.caseSensitive === true)) { if (_.isString(sWord)) {sWord = sWord.toLowerCase().trim();}} For MVP, Case sensitiveness is not required. */
            sNewVal = sWord = this.applyReplaceChars(config, sWord).trim();
        }

        // Synonyms
        if (synonymsMap[config.applySynonyms]) {
            let tempWord = synonymsMap[config.applySynonyms][sWord.toLowerCase()];
            if (tempWord) {
                sNewVal = tempWord;
                recognizedValue = true;
                // console.log(sNewVal);
                return [sNewVal, recognizedValue];
            }
        }

        if (regExMap[config.applyRegEx]) { // Regular expression map.
            if (regExMap[config.applyRegEx].test(sWord)) {
                recognizedValue = true;
                if (synonymsMap[config.applySynonyms]) { // Get the correct case from synonyms.
                    for (let item in synonymsMap[config.applySynonyms]) {
                        if (synonymsMap[config.applySynonyms][item].toString().toLowerCase() === sWord.toLowerCase()) {
                            sWord = synonymsMap[config.applySynonyms][item].toString();
                            break;
                        }
                    }
                }
            }
            sWord = sWord.replace(regExMap[config.applyRegEx], '$&');
            return [sWord, recognizedValue];
        }
        try {
            result = this.applyStandardFunctions(config, data, sField, sWord);
            // Custom functions
            if (config.customCleanseMethods && sWord !== null && sWord !== undefined && sWord !== '') { // The year can be 00 to represent 2000
                result = nwUtils.dyn_functions[config.customCleanseMethods](sWord, data, _global);
            }
        } catch (error) {
            // console.log(error);
        }
        return result;
    }

    private applyStandardFunctions(config: any, data: any, sField: string, sWord: string) {
// Standard functions
        let sNewVal = sWord;
        let recognizedValue: boolean = false;
        if (config.stdCleanseMethods) {
            let searchWithInStr;
            if (config.searchWithIn) {
                searchWithInStr = config.searchWithIn[0];
            }
            // Relative attributes check - populate the aFieldMap to be used in next block.
            let aFieldMap;
            if (searchWithInStr && data !== undefined && data !== '' && data.searchWithInStr) {
                aFieldMap = synonymsMap['o' + sField + 's4' + searchWithInStr][data.searchWithInStr.toString().toLowerCase()].split('|');
            } else {
                aFieldMap = aSynonymsMap['a' + sField];
            }
            let nSlot = nwUtils.levenshteinArray(sWord, aFieldMap);
            if (nSlot >= 0) {
                sNewVal = aFieldMap[nSlot];
                recognizedValue = true;
            } else {
                // TODO
            }
        }
        return [sNewVal, recognizedValue];
    }

    private applyReplaceChars(config: any, sWord: string) {
        if (config.replaceChars) {
            config.replaceChars.forEach(function (pair) {
                if (sWord !== undefined) {
                    sWord = sWord.toString().replace(Object.keys(pair)[0].toString(), pair[Object.keys(pair)[0]].toString());
                }
            });
        }
        return sWord;
    }
}

