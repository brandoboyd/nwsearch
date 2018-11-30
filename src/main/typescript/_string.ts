// 	Module:				_string.ts
// 	Description:		String-handling helper functions.
// 	Also-see:
// 	Tab-stops:			4
// 	Author:				DR
// 	Language:			js
// 	Creation Date:		07/18/2018
// 	Description:
// 	Revisions:
//
//

// 	==========================================================================
// 	See global.d.ts for global definitions.
// 	==========================================================================

// 	MapTSV is a helper function that takes our TSV data (e.g., "_coldata.ts")
// 		and maps it into an associative array. It also returns a pipe-delimited
// 		string for regular expression matching, levenshteinArray, etc.
//

export function mapTSV(sTSV: string, sDelim: string, oMappedDetail: Map<string, string>) {
    //
    let aLines	= sTSV.split(sDelim);
    let aColumns;
    let oMap = new Map();
    //
    let sOutput = '';
    //
    for (let i = 0; i < aLines.length; i++) {
        //
        aColumns = aLines[i].split('\t');
        if (aColumns.length !== 2) {
            continue;
        }
        //
        let sKeyLowercase = aColumns[1].toLowerCase();
        if (typeof oMap[sKeyLowercase] === 'undefined') {
            oMap[sKeyLowercase] = aColumns[0];
            if (sOutput.length) {
                sOutput += '|';
            }
            sOutput += aColumns[1];
        }
        //
        sKeyLowercase = aColumns[0].toLowerCase();
        if (typeof oMappedDetail[sKeyLowercase] === 'undefined') {
            oMappedDetail[sKeyLowercase] = aColumns[1];
        } else {
            // TODO fixme - Enable the warning. Currently it affects test cases execution time.
            // console.warn('Element skipped - Not added to GlobalBase (Key already exist): ' + sKeyLowercase + ':' + aColumns[1]);
        }
        //
    }
    //
    return (sOutput);
}


// 	Function matchPhrase is a helper function that handles potential
// 		multi-word attribute values (e.g., "Alfa Romeo").
//
export function matchPhrase(xLookup: any, aWords: string[], nCurrentWord: number, nTotalWords: number, upperCase: boolean = false) {
    //
    let bFound = false;
    let bRegex = ('global' in xLookup) ? true : false;
    let nNumberOfWordsToTry = nTotalWords - nCurrentWord;
    let sPhrase: string;
    for (let i = nNumberOfWordsToTry; i >= 1; i--) {
        sPhrase = '';
        for (let j = 0; j < i; j++) {
            if (j) {
                sPhrase += ' ';
            }
            sPhrase += aWords[nCurrentWord + j];
        }
        if (xLookup instanceof Array) {
            bFound = xLookup.indexOf(upperCase ? sPhrase.toUpperCase() : sPhrase.toLowerCase()) > -1;
        } else {
            bFound = (bRegex) ? xLookup.test(sPhrase) : (typeof xLookup[sPhrase.toLowerCase()] !== 'undefined');
        }
        if (bFound) {
            break;
        }
    }
    return ((bFound) ? sPhrase : '');
}

// Useful function for cleansing models. Models Synonyms and Models endswith and special chars in models words are handled. Ex: Hurricane to Huracan, CX 3 to CX-3 and '1 Series 128i' to 128i.
export function matchPhraseInAlias(xLookup: Map<string, string>, aWords: string[], nCurrentWord: number, nTotalWords: number, oCustomAlias: Map<string, string>, endsWithFlag: boolean = false) {
    //
    let bFound = false;
    let nNumberOfWordsToTry = nTotalWords - nCurrentWord;
    let sPhrase: string;
    let lowestLimit = nTotalWords === 1 ? 1 : 2; // This is needed to handle the Alfa Romeo being matched against Seller 'Alfa' only.
    for (let i = nNumberOfWordsToTry; i >= lowestLimit; i--) {
        sPhrase = '';
        for (let j = 0; j < i; j++) {
            if (j) {
                sPhrase += ' ';
            }
            sPhrase += aWords[nCurrentWord + j];
        }
        let value;
        Object.keys(xLookup).forEach(function (key) {
            value = xLookup[key];
            if (key.indexOf('-') > 0 || key.indexOf('/') > 0) {
                let tempItem1 = key.replace('-', '');
                let tempItem2 = key.replace('-', ' ');
                let tempItem3 = key.replace('/', ' ');
                if (tempItem1 === sPhrase.toLowerCase() || tempItem2 === sPhrase.toLowerCase() || tempItem3 === sPhrase.toLowerCase()) {
                    sPhrase = value;
                    return;
                }
            }
            if (sPhrase.toLowerCase().length > 2 && key.endsWith(' ' + sPhrase.toLowerCase())) { // Handle BMW '1 Series 128i'. Check for atleast 2 chars in model name.
                sPhrase = value;
                return;
            }
        });

        bFound = (typeof xLookup[sPhrase.toLowerCase()] !== 'undefined');
        if (bFound) {
            break;
        } else if (oCustomAlias.get(sPhrase.toLowerCase())) {
            sPhrase = oCustomAlias.get(sPhrase.toLowerCase());
            bFound = true;
            break;
        }
    }
    return ((bFound) ? sPhrase : (endsWithFlag ? wordEndsWith(xLookup, aWords[nCurrentWord]) : ''));
}

function wordEndsWith(xLookup, word) {
    let value;
    let returnValue = '';
    Object.keys(xLookup).forEach(function (key) {
        value = xLookup[key];
        if (word.toLowerCase().length > 2 && key.endsWith(' ' + word.toLowerCase())) { // Handle BMW '1 Series 128i'. Check for at least 2 chars in model name.
            returnValue = value;
            return;
        }
    });

    return returnValue;
}

// [EOF]
