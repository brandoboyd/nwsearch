//  Module:             interpret_sentence.spec.ts
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
//  Test Target:        _fieldValidator.js (functions: interpretSentence)
//
// 	==========================================================================
// 	See global.d.ts for global definitions.
// 	==========================================================================

import 'reflect-metadata';
import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';
import {_fieldValidator} from '../../../../main/typescript/_field';


describe('Interpret Sentence', function () {
    it('should return expected value for all actual values', () => {
        let fieldValidator = new _fieldValidator();
        /*        let expectedValue = '["make:toyota,Toyota","model:%7CCamry","exteriorColor:black"]';
                let actualValue = JSON.stringify(fieldValidator.interpretSentence('Toyota Camry black')).replace(/ /g, '');*/
        // expect(actualValue).to.equal(expectedValue, 'Actual value does not meet expected value');
    });

   /* it('should return expected value for all actual values of unknown makes/models', () => {
        let fieldValidator = new _fieldValidator();
        let expectedValue = '["mmf:make,model,sellerOrganizationName","mmv:asdfasdf","mmf:make,model,sellerOrganizationName","mmv:asdfasdfasdf"]';
        let actualValue = JSON.stringify(fieldValidator.interpretSentence('asdfasdf asdfasdfasdf')).replace(/ /g, '');
        // expect(actualValue).to.equal(expectedValue, 'Actual value does not meet expected value');
    });*/

});
