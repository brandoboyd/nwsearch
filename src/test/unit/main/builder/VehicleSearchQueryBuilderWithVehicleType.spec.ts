//  Module:            VehicleSearchQueryBuilderWithVehicleType.spec.ts
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
import * as queryBuilder from '../../resources/builder/mockVehicleBuilderWithVehicleType';


describe('Vehicle Query Builder with Vehicle Type', function () {
    const query = new VehicleSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });


    it('should return a valid query for Vehicle Type', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_VEHICLE_TYPE);
        let actualQuery = query
            .withBodyType('Car')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid sort for Vehicle Type', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_SORT_VEHICLE_TYPE);
        let actualQuery = query
            .withBodyType('Car')
            .withLiveBlock()
            .sort('vehicleType', 'asc')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid sort for Vehicle Type if no order is sent', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_SORT_VEHICLE_TYPE);
        let actualQuery = query
            .withBodyType('Car')
            .withLiveBlock()
            .sort('vehicleType')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid sort for Vehicle Type multiple sorts are sent but no order is sent', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_MULTIPLE_SORT_VEHICLE_TYPE);
        let actualQuery = query
            .addMake('ford')
            .withBodyType('Car')
            .withLiveBlock()
            .addMake('toyota')
            .withBodyType('Car')
            .withLiveBlock()
            .sort('make,vehicleType')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });



    it('should return a valid sort for Vehicle Type multiple sorts are sent but only one less than order is sent', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_MULTIPLE_SORT_ORDER_VEHICLE_TYPE);
        let actualQuery = query
            .addMake('ford')
            .withBodyType('Car')
            .withLiveBlock()
            .addMake('toyota')
            .withBodyType('Car')
            .withLiveBlock()
            .sort('make,model,vehicleType', 'desc,asc')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for multiple Vehicle Types', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_VEHICLE_TYPE_LIST);
        let actualQuery = query
            .withBodyType('Car,SUV,Truck')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make and Vehicle Types', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MAKE_VEHICLE_TYPE);
        let actualQuery = query
            .addMake('ford')
            .withBodyType('Car')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

});








