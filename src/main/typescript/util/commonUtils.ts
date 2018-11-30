// 	Levenshtein a word in an array to find a misspelling.
// 		Returns the index of the word with the closest delta or -1 if not found.
// 		Note that "short words" must have the first character match to get the
// 		Levenshtein treatment.
//
import {getEditDistance} from '../_levens';
import {MapEngine} from '../_engine';
import {MapTrim} from '../_trim';
import {GlobalBase} from '../GlobalBase';
export const reYear = /^([0-9]{2}|19[0-9]{2}|20[0-9]{2})$/;

export function levenshteinArray(sWord: string, aChoices: string[]) {
    let iSlot = -1;
    let n: number;
    let nShortWordLength = 5;
    let startEndMatchMinChars = 5;
    let nCurrentMin = 3;
    if (sWord.length <= 3) {
        nCurrentMin = 2;
    } else if (sWord.length <= 2) {
        nCurrentMin = 1;
    }
    if (!sWord) return -1;
    sWord = sWord.toLowerCase();
    for (let i = 0; i < aChoices.length; i++) {
        let sTemp = aChoices[i].toLowerCase();
        if (sWord.length < nShortWordLength && (sTemp.substr(0, 1) !== sWord.substr(0, 1))) {
            continue;
        }
        if (sWord.length >= startEndMatchMinChars && (sTemp.startsWith(sWord) || sTemp.endsWith(sWord))) {
            // At least 5 chars exactly match with either start of text or end of text. This handles BR2500 against 'RAM BR2500'
            iSlot = i;
            break;
        } else {
            n = getEditDistance(sWord, sTemp);
            if (n < nCurrentMin) {
                nCurrentMin = n;
                iSlot = i;
            }
        }
    }
    return (iSlot);
}

export let dyn_functions = [];
    dyn_functions['levenshteinArray'] = function (sWord: string, aChoices: string[]) {
        return levenshteinArray (sWord, aChoices);
    };

dyn_functions['digit4ForYear'] = function (sWord: string) {
    let recognizedValue = false;
    let sNewVal = sWord;
    if (reYear.test(sWord)) {
        recognizedValue = true;
        if (sWord.length === 2) {
            let nTemp: number;
            let nYear: number;
            nYear = parseInt((new Date()).getFullYear().toString().substr(2, 2)) + 3;
            nTemp = parseInt(sWord);
            if (nTemp < nYear) {
                sNewVal = '20' + sWord;
            } else {
                sNewVal = '19' + sWord;
            }
        }
    }
    return [parseInt(sNewVal, 10), recognizedValue];
};

dyn_functions['MapEngine'] = function (sWord: string) {
    let cleansedEngine = MapEngine(sWord);
    let recognizedValue = false;
    if (cleansedEngine !== null && cleansedEngine !== undefined && cleansedEngine !== '') {
        recognizedValue = true;
    }
    return [cleansedEngine, recognizedValue];
};

dyn_functions['MapTrim'] = function (sWord: string, data: any, global: GlobalBase) {
    return  MapTrim(sWord, data.make, data.model, global);
};

export function bufferedRow2Json(record: any) {
    return JSON.parse(new Buffer(record.kinesis.data, 'base64').toString('utf8'));
}
