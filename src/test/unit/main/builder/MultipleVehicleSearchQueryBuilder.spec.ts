//  Module:            MultipleVehicleSearchQueryBuilder.spec.ts
// 	Description:		Module to test the building the search query.

// 	Also-see:
// 	Tab-stops:			4
// 	Author:				Katherine Youngblood
// 	Language:			ts
// 	Creation Date:		06/21/2018
// 	Revisions:          Initial Version
//  Resources:          /resources/search
//  Test Target:        VehicleSearchQueryBuilder.tsuilder.ts
//
// 	==========================================================================
// 	See global.d.ts for global definitions.
// 	==========================================================================

import 'reflect-metadata';
import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';
import {VehicleSearchQueryBuilder} from '../../../../main/typescript/builder/VehicleSearchQueryBuilder';
import * as queryBuilder from '../../resources/builder/mockMultipleVehicleSearchQueryBuilder';

describe('VehicleSearchQueryBuilder', function () {
    const query = new VehicleSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {

        query.reset();
    });


    it('should return a valid query for makes', () => {
        let expectedQuery = JSON.stringify(queryBuilder.MULTIPLE_MAKES);
        let actualQuery = query
            .addMake('acura')
            .withLiveBlock()
            .addMake('bentley')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid query for makes/models', () => {
        let expectedQuery = JSON.stringify(queryBuilder.MULTIPLE_MAKE_MODEL);
        let actualQuery = query
            .addMake('honda')
            .withModel('Accord')
            .withLiveBlock()
            .addMake('subaru')
            .withModel('Crosstrek')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });


    it('should return a valid query for make/model/state', () => {
        let expectedQuery = JSON.stringify(queryBuilder.MULTIPLE_MAKE_MODEL_STATE);
        let actualQuery = query
            .addMake('acura')
            .withModel('nsx')
            .withState('OH')
            .addMake('bentley')
            .withModel('CONTINENTAL GT')
            .withState('OH')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });
    it('should return a valid query for make/model/year', () => {
        let expectedQuery = JSON.stringify(queryBuilder.MULTIPLE_MAKE_MODEL_YEAR);
        let actualQuery = query
            .addMake('acura')
            .withModel('nsx')
            .withYear('2006')
            .addMake('bentley')
            .withModel('CONTINENTAL GT')
            .withYear('2006')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });
    it('should return a valid query for make/model/yearRange', () => {
        let expectedQuery = JSON.stringify(queryBuilder.MULTIPLE_MAKE_MODEL_YEAR_RANGE);
        let actualQuery = query
            .addMake('acura')
            .withModel('nsx')
            .withYear('2006-2015')
            .addMake('bentley')
            .withModel('CONTINENTAL GT')
            .withYear('2006-2015')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make/model/odometer', () => {
        let expectedQuery = JSON.stringify(queryBuilder.MULTIPLE_MAKE_MODEL_ODOMETER);
        let actualQuery = query
            .addMake('acura')
            .withModel('nsx')
            .withOdometer('10000')
            .addMake('bentley')
            .withModel('CONTINENTAL GT')
            .withOdometer('10000')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });
    it('should return a valid query for make/model/odometerRange', () => {
        let expectedQuery = JSON.stringify(queryBuilder.MULTIPLE_MAKE_MODEL_ODOMETER_RANGE);
        let actualQuery = query
            .addMake('acura')
            .withModel('nsx')
            .withOdometer('10000-20000')
            .addMake('bentley')
            .withModel('CONTINENTAL GT')
            .withOdometer('10000-20000')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });
    it('should return a valid query for make/model/driveTrain', () => {
        let expectedQuery = JSON.stringify(queryBuilder.MULTIPLE_MAKE_MODEL_DRIVE_TRAIN);
        let actualQuery = query
            .addMake('acura')
            .withModel('nsx')
            .withDriveTrain('AWD')
            .addMake('bentley')
            .withModel('CONTINENTAL GT')
            .withDriveTrain('AWD')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make/model/transmission', () => {
        let expectedQuery = JSON.stringify(queryBuilder.MULTIPLE_MAKE_MODEL_TRANSMISSION);
        let actualQuery = query
            .addMake('honda')
            .withModel('Accord')
            .withTransmission('Automatic')
            .withLiveBlock()
            .addMake('subaru')
            .withModel('Crosstrek')
            .withTransmission('Automatic')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });


    it('should return a valid query with MMF', () => {
        let expectedQuery = JSON.stringify(queryBuilder.MULTIPLE_MAKE_MODEL_MMF);
        let actualQuery = query
            .addMake('honda')
            .withModel('Accord')
            .withMMF('make,model', 'subaru')
            .withLiveBlock()
            .addMake('subaru')
            .withMMF('make,model', 'subaru')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });


    it('should return a valid query with Multiple MMF', () => {
        let expectedQuery = JSON.stringify(queryBuilder.MULTIPLE_MMF);
        let actualQuery = query
            .withMMF('make,model', 'subaru')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query with comma separated model', () => {
        let expectedQuery = JSON.stringify(queryBuilder.MULTIPLE_MAKE_MODEL_WITH_MODELS_COMMA_DELIMITED);
        let actualQuery = query
            .addMake('ford')
            .withModel('fusion,escape')
            .withLiveBlock()
            .addMake('honda')
            .withModel('accord')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query with both models comma separated', () => {
        let expectedQuery = JSON.stringify(queryBuilder.MULTIPLE_MAKES_MODELS_BOTH_COMMA_DELIMITED);
        let actualQuery = query
            .addMake('ford')
            .withModel('fusion,escape')
            .withLiveBlock()
            .addMake('honda')
            .withModel('accord,civic')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });


});








