//  Module:             cleanse_model.spec.ts
// 	Description:		Module to test the data Ingestion lambda.
//                      This unit test will test the data conversion functionality of data received from kinesis stream before it is saved into ElasticSearch.
//                      Iterate through the actual/expected test files configured in 300000. Execute the tests.
//                      To adda new test, prepare & add test actual/expected files under resources directory and then link them in the ingestionTestIndex.json.
// 	Also-see:           ingestionTestIndex.json
// 	Tab-stops:			4
// 	Author:				Jag.Venkataswamy
// 	Language:			js
// 	Creation Date:		06/18/2018
// 	Revisions:          Initial Version
//  Resources:          /resources/ingestion
//  Test Target:        _fieldValidator.js  (functions: cleanseField)
// 	==========================================================================
// 	See global.d.ts for global definitions.
// 	==========================================================================

import 'reflect-metadata';
import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';
import {findFirstMatchedObjInArray} from './util';
import {DataCleanser} from '../../../../main/typescript/ingestion/DataCleanser';

let dataCleanser = new DataCleanser();
const _ = require('lodash');

describe('Ingestion', function() {
    // Execute each test file provided in the index file
    it('Cleanses vehicle_added_inventory', function () {
        let actualFile = '../../resources/cleanse/actual/vehicleAdded.json';
        let expectedFile = '../../resources/cleanse/expected/vehicleAdded.json';
        let actualRecords = require(actualFile);
        let expectedRecords = require(expectedFile);
        Object.keys(actualRecords).forEach(function (actualRecordCount, recordIndex) {
            let actualRecord = actualRecords[actualRecordCount];
            let expectedRecord = findFirstMatchedObjInArray('nwVehicleId', actualRecord.nwVehicleId, expectedRecords, true);
            // console.log(JSON.stringify(actualRecord));
            let cleansedData = dataCleanser.cleanseRow(actualRecord, 'vehicle_added_inventory');
            expect(cleansedData).to.deep.equal(expectedRecord);
        });
    }).timeout(300000);

    // Execute each test file provided in the index file
    it('Ingestion vehicle_added_inventory', function () {
        let actualFile = '../../resources/cleanse/actual/boAccepted.json';
        let expectedFile = '../../resources/cleanse/expected/boAccepted.json';
        let actualRecords = require(actualFile);
        let expectedRecords = require(expectedFile);
        Object.keys(actualRecords).forEach(function (actualRecordCount, recordIndex) {
            let actualRecord = actualRecords[actualRecordCount];
            let expectedRecord = findFirstMatchedObjInArray('nwVehicleId', actualRecord.nwVehicleId, expectedRecords, true);
            // console.log(JSON.stringify(actualRecord));
            let cleansedData = dataCleanser.cleanseRow(actualRecord, 'bo_Accepted');
            expect(cleansedData).to.deep.equal(expectedRecord);
        });
    }).timeout(300000);

/*    it('Cleanses vehicle_updated_inventory', function () {
        let actualFile = '../../resources/cleanse/actual/vehicleUpdated.json';
        let expectedFile = '../../resources/cleanse/expected/vehicleUpdated.json';
        let actualRecords = require(actualFile);
        let expectedRecords = require(expectedFile);
        Object.keys(actualRecords).forEach(function (actualRecordCount, recordIndex) {
            let actualRecord = actualRecords[actualRecordCount];
            let expectedRecord = findFirstMatchedObjInArray('nwVehicleId', actualRecord.nwVehicleId, expectedRecords, true);
            // console.log(JSON.stringify(actualRecord));
            let cleansedData = dataCleanser.cleanseRow(actualRecord, 'vehicle_updated_inventory');
            expect(cleansedData).to.deep.equal(expectedRecord);
        });
    }).timeout(300000);*/
});
