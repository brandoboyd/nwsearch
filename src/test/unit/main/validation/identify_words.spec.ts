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
import {_fieldValidator} from '../../../../main/typescript/_field';
import {retrieveFileList} from './util';

let os = require('os');
let fps = '/'; // filePathSeparator
if (os.platform() === 'win32') {
    fps = '\\';
}
let absoluteSearchFilePath = '.' + fps + 'src' + fps + 'test' + fps + 'unit' + fps + 'resources' + fps + 'quickSearch' + fps + '';
let relativeSearchFilePath = '..' + fps + '..' + fps + 'resources' + fps + 'quickSearch' + fps + '';
let fieldValidator = new _fieldValidator();
let ca_fieldValidator = new _fieldValidator("2");

describe('Data conversion test for entered SEARCH field values', function () {
    let fileList;
    let failedTests = [];

    beforeEach('Before each it() in Data SEARCH test ', function init() {
        fileList = retrieveFileList(absoluteSearchFilePath);   // Load all test files from the supplied directory
    });

    function executeMultiWordTest(fileName, failedTests) {
        let dataList = require(fileName); // load all test data rows.
        dataList.forEach(function (data) {
            try {
                let expectedData = data.EXPECTED[0];
                let returnData = fieldValidator.interpretSentenceAsObj(data.ACTUAL[0]);
                expect(expectedData.toLowerCase().trim(), 'should be equal to').to.equal(data.ACTUAL[0], returnData.toString().toLowerCase().trim());
            } catch (err) {
                // console.log(err.toString());
                failedTests.push(err.toString()); // Add each failing test
            }
        });
    }
});

describe('Data conversion test for entered SEARCH row values for Front End', function () {
    it('should return expected pair for all actual sentence Increment Object', () => {
        let failedTests = [];
        try {
            executeMultiWordTestForObj(relativeSearchFilePath + 'bulk_multiword_test_data.json', failedTests);
        } catch (err) {
            // console.log(err.toString());
            failedTests.push(err.toString()); // Add each failing test
        }
        // expect(failedTests).to.have.length(0);
    }).timeout(300000);
});


function executeMultiWordTestForObj(fileName, failedTests) {
    let dataList = require(fileName); // load all test data rows.
    dataList.forEach(function (data) {
        let expectedData = data.EXPECTED;
        let returnData = fieldValidator.interpretSentenceAsObj(data.ACTUAL);
        try {
            expect(expectedData).to.deep.equal(returnData);
        } catch (err) {
            // console.log(data.ACTUAL + ' : ' + JSON.stringify(data.EXPECTED) + ' : ' + JSON.stringify(returnData));
            failedTests.push(err.toString()); // Add each failing test
        }
    });
}

describe('mandatory Search tests', function () {
     it('Search Field sentence cleansing5', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('nissan altima 2.5 S auto black 4 cyl'))).to.deep.equal(JSON.stringify({
            'make': 'Nissan',
            'model': 'Altima',
            'trim': '2.5 S',
            'transmission': 'Automatic',
            'exteriorColor': 'Black',
            'engine': '4 CYLINDER'
        }));
    }).timeout(300000);

    it('Search Field sentence cleansing0', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('frd explore 4wd auto black 15-18 ADESA Lexington AUCTION  AUTO SALES electric turbo 15000-50000'))).to.deep.equal(JSON.stringify({
            'make': 'Ford',
            'model': 'Explorer',
            'driveTrain': '4WD',
            'transmission': 'Automatic',
            'exteriorColor': 'Black',
            'year': '2015-2018',
            'Location Type': 'ADESA Locations',
            'auctionLocation': 'ADESA Lexington',
            'seller': 'AUCTION AUTO SALES',
            'engine': 'ELECTRIC TURBO',
            'odometer': '15000-50000'
        }));
    }).timeout(300000);

    it('Search Field sentence cleansing1', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('alfa romeo'))).to.deep.equal(JSON.stringify({
            'make': 'Alfa Romeo'
        }));
    }).timeout(300000);

    it('Search Field sentence cleansing2', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('alfa romeo alfa romeo'))).to.deep.equal(JSON.stringify({
            'make': 'Alfa Romeo',
            'model': 'Alfa Romeo'
        }));
    }).timeout(300000);

    it('Search Field sentence cleansing Location spelling', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('frd explore 4wd auto black 15-18 ADESA Lexingto AUCTION  AUTO SALES electric turbo 15000-50000'))).to.deep.equal(JSON.stringify({
            'make': 'Ford',
            'model': 'Explorer',
            'driveTrain': '4WD',
            'transmission': 'Automatic',
            'exteriorColor': 'Black',
            'year': '2015-2018',
            'Location Type': 'ADESA Locations',
            'auctionLocation': 'ADESA Lexington',
            'seller': 'AUCTION AUTO SALES',
            'engine': 'ELECTRIC TURBO',
            'odometer': '15000-50000'
        }));
    }).timeout(300000);

    it('Search Field sentence cleansing Location spelling', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('toyota'))).to.deep.equal(JSON.stringify({
            'make': 'Toyota'
        }));
    }).timeout(300000);

    it('Search Field sentence cleansing Location spelling', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('toyota'))).to.deep.equal(JSON.stringify({
            'make': 'Toyota'
        }));
    }).timeout(300000);

    it('Search Field sentence cleansing Location spelling', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('camry'))).to.deep.equal(JSON.stringify({
            'make': 'Toyota',
            'model': 'Camry'
        }));
    }).timeout(300000);

    it('Search Field sentence cleansing3', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('frd explore 4wd auto black 15 Lexingtn AUCTION  AUTO SALES electric turbo 15000-50000'))).to.deep.equal(JSON.stringify({
            'make': 'Ford',
            'model': 'Explorer',
            'driveTrain': '4WD',
            'transmission': 'Automatic',
            'exteriorColor': 'Black',
            'year': '2015',
            'Location Type': 'ADESA Locations',
            'auctionLocation': 'ADESA Lexington',
            'seller': 'AUCTION AUTO SALES',
            'engine': 'ELECTRIC TURBO',
            'odometer': '15000-50000'
        }));
    }).timeout(300000);

    it('Search Field sentence cleansing4', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('Honda cr-v 1-speed continuously variable ratio four wheel drive'))).to.deep.equal(JSON.stringify({
            'make': 'Honda', 'model': 'CR-V', 'transmission': 'CVT', 'driveTrain': '4WD'
        }));
    }).timeout(300000);

    it('Search Field sentence cleansing5', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('toyota rav 4'))).to.deep.equal(JSON.stringify({
            'make': 'Toyota', 'model': 'RAV4'
        }));
    }).timeout(300000);

    it('Search Field sentence cleansing6', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('toyota rav4 FWD CROWN BUICK - LA'))).to.deep.equal(JSON.stringify({
            'make': 'Toyota', 'model': 'RAV4', 'driveTrain': 'FWD', 'seller': 'CROWN BUICK - LA'
        }));
    }).timeout(300000);

    it('vin Cleanse', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('1FMZU72E22ZA11282 frd explore 4wd auto black 15 Lexingtn AUCTION  AUTO SALES electric turbo 15000-50000'))).to.deep.equal(JSON.stringify({
            'make': 'Ford',
            'model': 'Explorer',
            'vin': '1FMZU72E22ZA11282',
            'driveTrain': '4WD',
            'transmission': 'Automatic',
            'exteriorColor': 'Black',
            'year': '2015',
            'Location Type': 'ADESA Locations',
            'auctionLocation': 'ADESA Lexington',
            'seller': 'AUCTION AUTO SALES',
            'engine': 'ELECTRIC TURBO',
            'odometer': '15000-50000'
        }));
    }).timeout(300000);


    it('vin Cleanse', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('1FMZU72E22ZA11282 frd explore 4wd auto black 15 Lexingtn AUCTION  AUTO SALES electric turbo 15000-50000'))).to.deep.equal(JSON.stringify({
            'make': 'Ford',
            'model': 'Explorer',
            'vin': '1FMZU72E22ZA11282',
            'driveTrain': '4WD',
            'transmission': 'Automatic',
            'exteriorColor': 'Black',
            'year': '2015',
            'Location Type': 'ADESA Locations',
            'auctionLocation': 'ADESA Lexington',
            'seller': 'AUCTION AUTO SALES',
            'engine': 'ELECTRIC TURBO',
            'odometer': '15000-50000'
        }));
    }).timeout(300000);

    it('Old vin Cleanse, and year test', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('IFMZU72E22ZA12345 frd explore 4wd auto black 75'))).to.deep.equal(JSON.stringify({
            'make': 'Ford',
            'model': 'Explorer',
            'vin': 'IFMZU72E22ZA12345',
            'driveTrain': '4WD',
            'transmission': 'Automatic',
            'exteriorColor': 'Black',
            'year': '1975'
        }));
    }).timeout(300000);
});

describe('Data conversion test for UI fields', function () {
    it('should test Color', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('blue'))).to.deep.equal(JSON.stringify({
            'exteriorColor': 'Blue'
        }));
    }).timeout(300000);
});

describe('Data conversion test for Some Models from Defect', function () {
     it('Search Field sentence cleansing5', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('Toyota RAV4 XLE'))).to.deep.equal(JSON.stringify({
            'make': 'Toyota',
            'model': 'RAV4',
            'trim': 'XLE'
        }));
    }).timeout(300000);

     it('Search Field sentence cleansing7', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('Nissan altima 2.5 sv'))).to.deep.equal(JSON.stringify({
            'make': 'Nissan',
            'model': 'Altima',
            'trim': '2.5 SV'
        }));
    }).timeout(300000);

     it('Search Field sentence cleansing8', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('C-CLASS AMG C 63'))).to.deep.equal(JSON.stringify({
            'make': 'Mercedes-Benz',
            'model': 'C-CLASS AMG C 63'
        }));
    }).timeout(300000);
     it('Search Field sentence cleansing12', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('Chevrolet Express Cargo Van'))).to.deep.equal(JSON.stringify({
            'make': 'Chevrolet',
            'model': 'Express Cargo Van'
        }));
    }).timeout(300000);

    it('Search Field sentence cleansing9', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('Honda red Blue auto manual 2wd rwd camry red'))).to.deep.equal(JSON.stringify({
            'make': 'Toyota,Honda',
            'model': 'Camry%7C', 'exteriorColor': 'Red,Blue', 'transmission': 'Automatic,Manual', 'driveTrain': '2WD,RWD'
        }));
    }).timeout(300000);
});


describe('Data conversion test for Some Models from Defect', function () {
    it('Search Field sentence cleansing5', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('Toyota RAV4 XLE'))).to.deep.equal(JSON.stringify({
            'make': 'Toyota',
            'model': 'RAV4',
            'trim': 'XLE'
        }));
    }).timeout(300000);

    it('Search Field sentence cleansing7', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('Nissan altima 2.5 sv'))).to.deep.equal(JSON.stringify({
            'make': 'Nissan',
            'model': 'Altima',
            'trim': '2.5 SV'
        }));
    }).timeout(300000);

    it('Search Field sentence cleansing8', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('C-CLASS AMG C 63'))).to.deep.equal(JSON.stringify({
            'make': 'Mercedes-Benz',
            'model': 'C-CLASS AMG C 63'
        }));
    }).timeout(300000);
    it('Search Field sentence cleansing12', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('Chevrolet Express Cargo Van'))).to.deep.equal(JSON.stringify({
            'make': 'Chevrolet',
            'model': 'Express Cargo Van'
        }));
    }).timeout(300000);

    it('Search Field sentence cleansing9', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('Honda red Blue auto manual 2wd rwd camry red'))).to.deep.equal(JSON.stringify(
            {"make":"Toyota,Honda","model":"Camry%7C","exteriorColor":"Red,Blue","transmission":"Automatic,Manual","driveTrain":"2WD,RWD"}
        ));
    }).timeout(300000);
});

describe('Data conversion test for Some Models from Defect1', function () {

    it('Search Field sentence cleansing9', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('Cincy'))).to.deep.equal(JSON.stringify({            'Location Type': 'ADESA Locations',
                'auctionLocation': 'ADESA Cincinnati/Dayton',
            }
        ));
    }).timeout(300000);

    it('Search Field sentence cleansing9', () => {
        expect(JSON.stringify(fieldValidator.interpretSentenceAsObj('MI ADESA Flint'))).to.deep.equal(JSON.stringify({
                'Location Type': 'ADESA Locations',
                'auctionLocation': 'ADESA Flint',
            }
        ));
    }).timeout(300000);

    it('Search Field sentence cleansing9', () => {
        expect(JSON.stringify(ca_fieldValidator.interpretSentenceAsObj('ADESA Vancouver'))).to.deep.equal(JSON.stringify({            'Location Type': 'ADESA Locations',
                'auctionLocation': 'ADESA Vancouver',
            }
        ));
    }).timeout(300000);

    it('Search Field sentence cleansing9', () => {
        expect(JSON.stringify(ca_fieldValidator.interpretSentenceAsObj('ADESA Quebec City'))).to.deep.equal(JSON.stringify({            'Location Type': 'ADESA Locations',
                'auctionLocation': 'ADESA Quebec City',
            }
        ));
    }).timeout(300000);

});
