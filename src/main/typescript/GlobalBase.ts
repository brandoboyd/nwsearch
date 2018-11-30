// 	Module:				_global.ts
// 	Description:		Global data definitions for heuristics.
// 	Also-see:
// 	Tab-stops:			4
// 	Author:				DR
// 	Language:			js
// 	Creation Date:		07/18/2018
// 	Description:
// 	Revisions:
//
//
import {sMakeModel, sMakeSynonyms, initializeModelSynonyms} from './_mmdata';
import {sLocation, sLocationSynonyms} from './_locationdata';
import {sColorMapping} from './_coldata';
import {sDriveTrainMapping, sTransmissionMapping} from './_adddata';
import {ca_sellers, us_sellers} from './_sellers';
import {oEngine, oOriginalEngine} from './_engine';
import {mapTSV} from './_string';

// 	==========================================================================
// 	See global.d.ts for global definitions.
// 	==========================================================================
// 	Define map object.
interface IMap2				{ [key: string]: any; }

export class GlobalBase {
// 	Precompiled regular expressions for the following function.
//
    sWhiteSpace = /\s+/;

// 	By instantiating static regular expressions up front, we avoid
// 		repeated compiles.
//
// 	Simple patterns.
//
    reAlphaOnly = /^[a-z]+$/i;
    reDigit = /[0-9]/;
    reDigitPair = /^[0-9]{2}$/;

// 	Matches 19NN or 20NN.
//
    reYear = /^([0-9]{2}|19[0-9]{2}|20[0-9]{2})$/;
// 	State.
    reState = /^(AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MH|MA|MI|FM|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VA|VI|WA|WV|WI|WY)$/i;

//
// 	ZIP code.
//
    reZIP = /^([0-9]{5}[- ][0-9]{4}|[0-9]{5}|[0-9]{4}\*|[0-9]{3}\*)$/;
// 	Date
// 		1/1/99 through 12/31/99 and 01/01/1900 through 12/31/2099
// 		Matches invalid dates such as February 31st
// 		Accepts dashes, spaces, forward slashes and dots as date separators
//
//    reDate = /^([1-9]|1[012])[-\/]([1-9]|[12][0-9]|3[01])[-\/]((19|20)[0-9]{2}|[0-9]{2})$/;
// 	Phone (North America).
// 	Matches 3334445555, 333.444.5555, 333-444-5555, 333 444 5555,
// 		(333) 444 5555 and all combinations thereof.
//
// let rePhone =			/^(?:1(?:[. -])?)?(?:\((?=\d{3}\)))?([2-9]\d{2})(?:(?<=\(\d{3})\))? ?(?:(?<=\d{3})[.-])?([2-9]\d{2})[. -]?(\d{4})(?: (?i:ext)\.? ?(\d{1,5}))?$/;
// 	Class definition for _fieldValidator.
//
//


// 	First matches 125000, 75,000, 4000, 125k, 75k, 4k for search.
// 	Second matches an actual mileage for cleansing.
//
    reOdometer = /^(\d{2}[.,]?000|\d{3}[.,]?000|[0-9]{3}k|[0-9]{2}k|[0-9]{1}k)$/i;
    reMileageActual = /^([0-9,]{1,}[k]{0,1})$/i;

// 	Make.
// 		Note that this info is a placeholder.
// 		Our more complete make/model data stored in _mmdata.js will overwrite if present.
//
    sMake;
    sModel: string = '';
    oMakeSynonyms = new Map();
    oModel = new Map();
    oModels4Make = new Map();
    oModel2Make = new Map();
    oMake = new Map();
    oTrims4MakeModel = new Map();
    sDelim = '\r\n';
    // TODO Remove all hard coding right now - Do not procrastinate - Jags
    aEngineNames = ['1 cylinder', '10 cylinder', '10 cylinder turbo', '12 cylinder', '12 cylinder turbo', '', '2 cylinder', '3 cylinder', '3 cylinder turbo',
        '4 cylinder', '4 cylinder turbo', '5 cylinder', '', '5 cylinder turbo', '6  cylinder', '6 cylinder', '6 cylinder turbo', '8  cylinder', '8 cylinder', '8 cylinder turbo',
        'electric', 'electric turbo', 'other', 'unknown'];
    oBodyStyles4MakeModelTrim = new Map();

    sColor = '';
    oColorDetail = new Map();
    aColor: string[] = [];
    reColor: any = '';
//
    sDriveTrain = '';
    oDriveTrainDetail = new Map();
    reDriveTrain: any = '';
    reTransmission: any = '';
    aMake = [];
    reMake;

    aModel = [];
    reModel;

    sTransmission: string = '';
    oTransmissionDetail = new Map();
//
    reVIN = /^([^iIoOqQ '-\/]{6,13}\d{4})|(\d{5})$/i;

    sAdesaLocation = '';
    oAdesaLocationDetail = new Map();
    aAdesaLocation: string[] = [];
    reAdesaLocation: any = '';

    sLocation = '';
    oLocationDetail = new Map();
    aLocation: string[] = [];
    reLocation: any = '';
    oEngineList = oEngine;
    oOriginalEngineList = oOriginalEngine;

    // oSellerOrg = new Map();
    aSellerOrg: string[];
// 	InitializeCanonicalData:
// 		- Takes country code to initialize.
// 		- Returns number of matching rows processed by country.

    constructor(sCountry: string) {
        this.loadMakeModelBody(sCountry);
        this.loadColors();
        this.loadDriveTrain();
        this.loadTransmission();
        this.loadSellers(sCountry);
        this.loadLocations(sCountry);
        this.loadModelSynonyms();
        Object.freeze(GlobalBase);
    }

// 	======================================================================
// 	Helper functions.
//
// 		Function getMakes returns a list of makes based upon a match string.
// 			If the match string is empty, all makes are returned.
// 			The returned string consists of a JSON-style array:
// 			 'Acura', 'BMW', 'Chevrolet', ...
//
    getMakes(sMatch: string) {
        let sResult = '';
        sMatch = sMatch.toLowerCase();
        for (let i = 0; i < this.aMake.length; i++) {
            if (sMatch.length) {
                if (this.aMake[i].toLowerCase().indexOf(sMatch) < 0) {
                    continue;
                }
            }
            if (sResult.length) {
                sResult += ', ';
            }
            sResult += '"' + this.aMake[i] + '"';
        }
        return (sResult);
    }

    loadModelSynonyms() {
        initializeModelSynonyms();
    }
// 		Function getModelsForMake returns a list of models based upon a
// 			make and a match string. If the match string is empty, all models
// 			are returned. The returned string consists of a JSON-style array:
// 			 'Sport', 'Sport Premium', 'Targa', ...
//
    getModelsForMake(sMakeTemp: string, sMatch: string) {
        let sResult = '';
        sMakeTemp = sMakeTemp.toLowerCase();
        sMatch = sMatch.toLowerCase();
        if (typeof this.oModels4Make[sMakeTemp] !== 'undefined') {
            let aModelTemp = this.oModels4Make[sMakeTemp].split('|');
            for (let i = 0; i < aModelTemp.length; i++) {
                if (sMatch.length) {
                    if (aModelTemp[i].toLowerCase().indexOf(sMatch) < 0) {
                        continue;
                    }
                }
                if (sResult.length) {
                    sResult += ', ';
                }
                sResult += '"' + aModelTemp[i] + '"';
            }
        }
        return (sResult);
    }

// 		Function getTrimsForMakeAndModel returns a list of trims based upon a
// 			make, model and match string. If the match string is empty, all
// 			trims are returned. The returned string consists of a JSON-style
// 			array: 'SL Sport', 'SL Luxury', ...
//
    getTrimsForMakeAndModel(sMakeTemp: string, sModelTemp: string, sMatch: string) {
        let sResult = '';
        sMakeTemp = sMakeTemp.toLowerCase();
        sModelTemp = sModelTemp.toLowerCase();
        sMatch = sMatch.toLowerCase();
        if (typeof this.oTrims4MakeModel[sMakeTemp + '|' + sModelTemp] !== 'undefined') {
            let aTrim = this.oTrims4MakeModel[sMakeTemp + '|' + sModelTemp].split('|');
            for (let i = 0; i < aTrim.length; i++) {
                if (sMatch.length) {
                    if (aTrim[i].toLowerCase().indexOf(sMatch) < 0) {
                        continue;
                    }
                }
                if (sResult.length) {
                    sResult += ', ';
                }
                sResult += '"' + aTrim[i] + '"';
            }
        }
        return (sResult);
    }

// 	Fetch body styles for a make/model/time combination.
    getBodyStylesForMakeModelTrim(sMakeTemp: string, sModelTemp: string, sTrim: string = '') {
        let sResult = '';
        //
        sMakeTemp = sMakeTemp.toString().toLowerCase();
        sModelTemp = sModelTemp.toString().toLowerCase();
        if (sTrim !== null && sTrim !== undefined) {
            sTrim = sTrim.toString().toLowerCase();
        } else sTrim = '';

        if (typeof this.oBodyStyles4MakeModelTrim[sMakeTemp + '|' + sModelTemp + '|' + sTrim] !== 'undefined') {
            sResult = this.oBodyStyles4MakeModelTrim[sMakeTemp + '|' + sModelTemp + '|' + sTrim];
        } else {
            for (let oBodyStyles4MakeModelTrimKey in this.oBodyStyles4MakeModelTrim) {
                if (oBodyStyles4MakeModelTrimKey.startsWith(sMakeTemp + '|' + sModelTemp + '|')) {
                    sResult = this.oBodyStyles4MakeModelTrim[oBodyStyles4MakeModelTrimKey];
                    break;
                }
            }
        }
        return (sResult);
    }

    private loadLocations(sCountry: string) {
        let aLines: string[] = sLocation.split(this.sDelim);
        for (let i = 0; i < aLines.length; i++) {
            let aColumnsTemp = aLines[i].split('\t');
            if (aColumnsTemp[2] !== sCountry) {
                continue;
            }
            this.oAdesaLocationDetail[aColumnsTemp[0].toLowerCase()] = aColumnsTemp[1];
            this.sAdesaLocation += aColumnsTemp[1] + '|';
            this.oLocationDetail[aColumnsTemp[0].toLowerCase()] = aColumnsTemp[1].replace('ADESA ', '');
            this.sLocation += aColumnsTemp[1].replace('ADESA ', '') + '|';
        }
        aLines = sLocationSynonyms.split(this.sDelim);
        for (let i = 0; i < aLines.length; i++) {
            let aColumnsTemp = aLines[i].split('\t');
            if (aColumnsTemp[2] !== sCountry) {
                continue;
            }
            this.oAdesaLocationDetail[aColumnsTemp[0].toLowerCase()] = aColumnsTemp[1];
            this.sAdesaLocation += aColumnsTemp[1] + '|';
        }

        this.aAdesaLocation = this.sAdesaLocation.split('|');
        this.reAdesaLocation = new RegExp('^(' + this.sAdesaLocation + ')$', 'i');
        this.aLocation = this.sLocation.split('|');
        this.reLocation = new RegExp('^(' + this.sLocation + ')$', 'i');
    }

    private loadSellers(sCountry: string) {
        this.aSellerOrg = (sCountry === '1') ? us_sellers : ca_sellers;
    }

    private loadTransmission() {
// 	Transmission: data stored in _adddata.js will overwrite if present.
        //
        this.sTransmission = 'auto|automatic|manual|stick';
        if (typeof sTransmissionMapping !== 'undefined') {
            this.sTransmission = mapTSV(sTransmissionMapping, this.sDelim, this.oTransmissionDetail);
        }
        this.reTransmission = new RegExp('^(' + this.sTransmission + ')$', 'i');
    }

    private loadDriveTrain() {
// 	DriveTrain: data stored in _adddata.js will overwrite if present.
        //
        this.sDriveTrain = '4wd|awd|fwd|rwd|2wd';
        if (typeof sDriveTrainMapping !== 'undefined') {
            this.sDriveTrain = mapTSV(sDriveTrainMapping, this.sDelim, this.oDriveTrainDetail);
        }
        this.reDriveTrain = new RegExp('^(' + this.sDriveTrain + ')$', 'i');
    }

    private loadColors() {
        this.sColor = 'beige/tan|black|black"|blue|brown|gold|gray|green|orange|pink|purple|red|silver|two-tone|white|yellow';
        if (typeof sColorMapping !== 'undefined') {
            this.sColor = mapTSV(sColorMapping, this.sDelim, this.oColorDetail);
            if (this.sColor.indexOf( '|Unknown')) {
                this.sColor.replace('|Unknown', '');
            }
        }
        this.aColor = this.sColor.split('|');
        this.reColor = new RegExp('^(' + this.sColor + ')$', 'i');
    }

    private loadMakeModelBody( sCountry: string) {
        let aLines: string[] = [];
        let nRowsProcessed: number = 0;
        if (typeof sMakeModel !== 'undefined') {
            this.sDelim = (sMakeModel.indexOf('\r\n') >= 0) ? '\r\n' : '\n';
            aLines = sMakeModel.split(this.sDelim);
            let aColumns;
            let colCount = 5;
            //
            this.sMake = '';
            //
            // 	Handle make, model and trim based upon country code.
            //
            for (let i = 0; i < aLines.length; i++) {

                // 	Columnar format: make, model, trim, country, body-styles.
                //
                aColumns = aLines[i].split('\t');
                if (aColumns.length !== colCount) {
                    continue;
                }
                if (aColumns[3] !== sCountry) {
                    continue;
                }
                for (let j = 0; j < aColumns.length; j++) {
                    aColumns[j] = aColumns[j].trim();
                }
                nRowsProcessed++;
                //
                let sMakeLowercase = aColumns[0].toLowerCase();
                if (typeof this.oMake[sMakeLowercase] === 'undefined') {
                    this.oMake[sMakeLowercase] = aColumns[0];
                    if (this.sMake.length) {
                        this.sMake += '|';
                    }
                    this.sMake += aColumns[0];
                    this.oModels4Make[sMakeLowercase] = '';
                }
                //
                let sModelLowercase = aColumns[1].toLowerCase();
                if (typeof this.oModel[sModelLowercase] === 'undefined') {
                    this.oModel[sModelLowercase] = aColumns[1];
                    if (this.oModels4Make[sMakeLowercase].length) {
                        this.oModels4Make[sMakeLowercase] += '|';
                    }
                    this.oModels4Make[sMakeLowercase] += aColumns[1];
                    this.oModel2Make[sModelLowercase] = aColumns[0];

                    if (this.sModel.length) {
                        this.sModel += '|';
                    }
                    this.sModel += aColumns[1];
                } else {
                    // TODO fixme
                    // let tempArr = new Array();
                    // tempArr.push(this.oModel2Make[sModelLowercase]);
                    // tempArr.push(aColumns[0]);
                    // this.oModel2Make[sModelLowercase] = tempArr;
                    // this.oModels4Make[sMakeLowercase] += aColumns[1];
                    //  this.sModel += aColumns[1];
                    // console.log(this.oModel2Make[sModelLowercase]);
                    if (this.oModel2Make[sModelLowercase] !== undefined && this.oModel2Make[sModelLowercase].toLowerCase() !== aColumns[0].toLowerCase()) {
                        // console.warn('Overriding Model ' + sModelLowercase + ' of make ' + this.oModel2Make[sModelLowercase] + ' with make ' + aColumns[0]);
                    }
                }
                //
                if (typeof this.oTrims4MakeModel[sMakeLowercase + '|' + sModelLowercase] === 'undefined') {
                    this.oTrims4MakeModel[sMakeLowercase + '|' + sModelLowercase] = aColumns[2];
                } else {
                    this.oTrims4MakeModel[sMakeLowercase + '|' + sModelLowercase] += '|' + aColumns[2];
                }
                //
                let sTrimLowercase = aColumns[2].toLowerCase();
                if (typeof this.oBodyStyles4MakeModelTrim[sMakeLowercase + '|' + sModelLowercase + '|' + sTrimLowercase] === 'undefined') {
                    this.oBodyStyles4MakeModelTrim[sMakeLowercase + '|' + sModelLowercase + '|' + sTrimLowercase] = aColumns[4];
                } else {
                    this.oBodyStyles4MakeModelTrim[sMakeLowercase + '|' + sModelLowercase + '|' + sTrimLowercase] += '|' + aColumns[4];
                }
                // 	...end processing of makes, models and trims.
                //
            }

            // 	Initialize our make structures.
            //
            this.aMake = this.sMake.split('|');
            this.reMake = new RegExp('^(' + this.sMake + ')$', 'i');

            // 	Handle make synonyms.
            //
            aLines = sMakeSynonyms.split(this.sDelim);
            this.aModel = this.sModel.split('|');
            for (let i = 0; i < aLines.length; i++) {
                let aColumnsTemp = aLines[i].split('\t');
                if (aColumnsTemp.length !== 2) {
                    continue;
                }
                this.oMakeSynonyms[aColumnsTemp[0].toLowerCase()] = aColumnsTemp[1];
            }

            // 	Request from Ty: handle 4-character makes as synonyms.
            for (let i = 0; i < this.aMake.length; i++) {
                if (this.aMake[i].toString().indexOf(' ') === -1) {
                    this.oMakeSynonyms[this.aMake[i].substr(0, 4).toLowerCase()] = this.aMake[i];
                }
            }
        }
        this.reModel = new RegExp('^(' + this.sModel + ')$', 'i');
    }
}
// [EOF]
