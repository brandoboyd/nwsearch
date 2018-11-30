//  Module:            VehicleSearchQueryBuilderWithModel.spec.ts
// 	Description:		Module to test the building the search query.

// 	Also-see:
// 	Tab-stops:			4
// 	Author:				Katherine Youngblood
// 	Language:			ts
// 	Creation Date:		06/21/2018
// 	Revisions:          Initial Version
//  Resources:          /resources/search
//  Test Target:        VehicleSearchQueryBuilder.ts
//
// 	==========================================================================
// 	See global.d.ts for global definitions.
// 	==========================================================================

import 'reflect-metadata';
import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';
import {VehicleSearchQueryBuilder} from '../../../../main/typescript/builder/VehicleSearchQueryBuilder';
import * as queryBuilder from '../../resources/builder/mockVehicleBuilderWithModel';


describe('Vehicle Query Builder with Model', function () {
    const query = new VehicleSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });


    it('should return a valid query for model', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MODEL);
        let actualQuery = query
            .withModel('civic')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make/model', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MAKE_MODEL);
        let actualQuery = query
            .addMake('acura')
            .withModel('nsx')
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid query for make/model/liveblock', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MAKE_MODEL_LIVEBLOCK);
        let actualQuery = query
            .addMake('subaru')
            .withModel('crosstrek')
            .withLiveBlock()
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });


    it('should return a valid query for make/model/state', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MAKE_MODEL_STATE);
        let actualQuery = query
            .addMake('acura')
            .withModel('nsx')
            .withState('OH')
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make/model/year', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MAKE_MODEL_YEAR);
        let actualQuery = query
            .addMake('acura')
            .withModel('nsx')
            .withYear('2006')
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid sort for make/model/year', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MAKE_MODEL_YEAR_SORT);
        let actualQuery = query
            .addMake('acura')
            .withModel('nsx')
            .withYear('2006')
            .sort('year', 'asc')
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make/model/yearRange', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MAKE_MODEL_YEAR_RANGE);
        let actualQuery = query
            .addMake('acura')
            .withModel('nsx')
            .withYear('2006-2015')
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make/model/odometer', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MAKE_MODEL_ODOMETER);
        let actualQuery = query
            .addMake('acura')
            .withModel('nsx')
            .withOdometer('10000')
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid sort for make/model/odometer', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MAKE_MODEL_ODOMETER_SORT);
        let actualQuery = query
            .addMake('acura')
            .withModel('nsx')
            .withOdometer('10000')
            .sort('odometer', 'desc')
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make/model/odometerRange', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MAKE_MODEL_ODOMETER_RANGE);
        let actualQuery = query
            .addMake('acura')
            .withModel('nsx')
            .withOdometer('10000-20000')
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make/model/driveTrain', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MAKE_MODEL_DRIVE_TRAIN);
        let actualQuery = query
            .addMake('subaru')
            .withModel('crosstrek')
            .withDriveTrain('AWD')
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });
it('should return a valid query for make/model/transmission', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MAKE_MODEL_TRANSMISSION);
        let actualQuery = query
            .addMake('honda')
            .withModel('Accord')
            .withTransmission('Automatic')
            .withLiveBlock()
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

it('should return a valid query for make/model/trim', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MAKE_MODEL_TRIM);
        let actualQuery = query
            .addMake('honda')
            .withModel('Accord')
            .withTrim('LIMITED')
            .withLiveBlock()
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });


});








