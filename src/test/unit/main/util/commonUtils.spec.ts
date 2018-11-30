//  Module:             commonUtils.spec.ts
// 	Description:		Module to test the search lambda.
//                      This unit test will test the data conversion functionality of search text entered before it is converted to search calls to ES.
//                      Iterate through the actual/expected test files configured under directory resources/search. Execute the tests.
//                      To adda new test, prepare field specific test file under resources/search directory. The test file contains actual/expected data.
// 	Also-see:
// 	Tab-stops:			4
// 	Author:				Katherine/Jag
// 	Language:			js
// 	Creation Date:		06/18/2018
// 	Revisions:          Initial Version
//  Resources:
//  Test Target:        commonUtils.ts
//
// 	==========================================================================
// 	See global.d.ts for global definitions.
// 	==========================================================================

import 'reflect-metadata';
import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';

describe('commonUtils', function () {
    const nwUtils = require('../../../../main/typescript/util/commonUtils');

    it('levenshteinArray', () => {
        let expectedValue = 'Buick';
        let aChoices: string [] = ['Buick', 'RAM BR2500'];
        let nSlot = nwUtils.levenshteinArray('Buick', aChoices);
        let actualCleanseValue = '';
        if (nSlot >= 0) {
            actualCleanseValue = aChoices[nSlot];
            actualCleanseValue = actualCleanseValue.toString().trim();
        }
        expect(actualCleanseValue).to.equal(expectedValue, 'Actual value does not meet expected value');
    });

    it('bufferedRow2Json', () => {
        let data = '"eyJldmVudCI6InZlaGljbGVfcmVtb3ZlZF9kZWFsZXJfYmxvY2siLCJib2R5Ijp7Im9yaWdpblZlaGljbGVJZCI6IjMzNTkxODIyNyIsIm53VmVoaWNsZUlkIjoiQkRGOTY1MkItNTdFRi00NURFLUJFQkMtRDU4NENEQjE1NDhGIiwidmluIjoiU0FKQkQ0QlY2R0NZMDU4MzMiLCJtYWtlIjoiSkFHVUFSIiwibW9kZWwiOiJYRiIsInllYXIiOjIwMTYsInNlcmllcyI6IlBSRU1JVU0iLCJib2R5U3R5bGUiOiIiLCJwdXJjaGFzZVByaWNlIjoyOTU1MCwic3lzdGVtVXVpZCI6IkIzRUZCREIzLTYwMDktNERBRC1BOUZBLTIwQjdGRkJENDk1NSIsInN5c3RlbU9yaWdpbiI6ImNsYXNzaWMiLCJzeXN0ZW1XaGVuQ3JlYXRlZCI6MTUzNzM2NTQ5MjEwMywic3lzdGVtVG9waWMiOiJudy1hdWN0aW9uLWRldmVsb3AiLCJzeXN0ZW1Ub3BpY0tleSI6IkJERjk2NTJCLTU3RUYtNDVERS1CRUJDLUQ1ODRDREIxNTQ4RiIsInN5c3RlbUV2ZW50IjoidmVoaWNsZV9yZW1vdmVkX2RlYWxlcl9ibG9jayIsIm9yaWdpblRpbWVzdGFtcCI6MTUzNzM2NTQ5MDAwMCwib3JpZ2luQ3JlYXRlZEJ5IjoiIiwib3JpZ2luTW9kaWZpZWRCeSI6IjMzNTgzNyIsIm53QXVjdGlvbklkIjoiQjA4NkMxMTItRTY3Mi00MTZBLUE2QjctMDAzNDVGQkMyRDBEIiwidmVoaWNsZVN0YXR1cyI6IlNvbGQifX0="';
        console.log(JSON.parse(new Buffer(data, 'base64').toString('utf8')));
    });
});
