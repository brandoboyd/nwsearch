//  Module:             identify_words.spec.ts
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
//  Resources:          /resources/search
//  Test Target:        _fieldValidator.js (functions: identifyWord)
//
// 	==========================================================================
// 	See global.d.ts for global definitions.
// 	==========================================================================

import 'reflect-metadata';
import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';
import {GlobalBase} from '../../../../main/typescript/GlobalBase';


describe('mandatory GlobalBase test', function () {
    it('Test the getTrimsForMakeAndModel', () => {
        expect(new GlobalBase('1').getTrimsForMakeAndModel('Audi', 'A3', 'Premium')).to.equal(
            '"1.8T Premium", "1.8T Premium Plus", "2.0 TDI Premium", "2.0 TDI Premium Plus", "2.0T Premium", "2.0T Premium Plus", "Premium", "Premium Plus"'
        );
    });

    it('Test the getModelsForMake', () => {
        expect(new GlobalBase('1').getModelsForMake('Audi', 'A3')).to.equal(
            '"A3", "A3 Cabriolet", "A3 e-tron", "A3 Sedan", "A3 Sportback e-tron"'
        );
    });

    it('Test the getMakes', () => {
        expect(new GlobalBase('1').getMakes('Audi')).to.equal(
            '"Audi"'
        );
    });
});
