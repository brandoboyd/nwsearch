// 	Module:				_trim.ts
// 	Description:		Trim cleansing heuristics.
// 	Also-see:
// 	Tab-stops:			4
// 	Author:				DR
// 	Language:			ts
// 	Creation Date:		07/21/2018
// 	Description:
// 	Revisions:
//
//

// 	Precompiled regular expressions.
//
import {GlobalBase} from './GlobalBase';

const reStripQuotes =			/['"]+/g;
const reStripWhiteSpace =		/\s/g;

// 	MapTrim uses a set of heuristics to cleanse a trim based upon make and model.
// 		Arguments:
// 			sInput: input trim/series data.
// 			sMake:  known make.
// 			sModel: known model.
// 		Outputs:
// 			string: cleansed trim.
//

export function MapTrim(sInput: string, sMake: string, sModel: string, _global: GlobalBase) {
    //
    let bFound  = false;
    let nLength = 999;
    let nMatch  = 0;
    let nCursor = 0;
    let sResult = '';
    let recognizedValue = false;
    do {

        // 	Strip white-space.
        //
        sInput = sInput.replace(reStripWhiteSpace, '');
        sInput = sInput.toLowerCase();
        if (!sInput.length) {
            break;
        }

        // 	Let's look up our list of trims for this make/model.
        //
        let sTrims = _global.getTrimsForMakeAndModel(sMake, sModel, '');
        if (!sTrims.length) {
            break;
        }

        // 	Bust JSON-stylie trim-string into a real array.
        //
        let aTrims = sTrims.split(', ');
        for (let i = 0; i < aTrims.length; i++) {

            // 	Strip white-space from each trim and see if we have a match.
            //
            let sTemp = aTrims[i];
            sTemp = sTemp.replace(reStripWhiteSpace, '');
            sTemp = sTemp.toLowerCase();
            if ((nCursor = sTemp.indexOf(sInput)) < 0) {
                continue;
            }

            // 	Let's save some info around this match because we want
            // 		the shortest trim that matches. Example:
            //
            // 		"EXT CAB 157.5" WB 4WD SRW LS"	==> "SRW LS", not "SRW"
            // 		"EXT CAB 157.5" WB 4WD SRW"		==> "SRW"
            //
            if (!bFound  ||  sTemp.length < nLength) {
                bFound = true;
                nMatch = i;
                nLength = sTemp.length;
            }

            // 	...end loop through trim iteration.
            //
        }
        if (!bFound) {
            break;
        }

        // 	Let's return the closest match.
        //
        sResult = aTrims[nMatch];
        sResult = sResult.replace(reStripQuotes, '');
        recognizedValue = true;
        //
    } while (0);

    return [sResult, recognizedValue];
}

// [EOF]
