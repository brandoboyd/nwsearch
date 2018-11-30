//  Module:            VehicleSearchQueryBuilderWithVehiclesNotSold.spec.ts
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
import * as queryBuilder from '../../resources/builder/mockVehicleBuilderWithVehiclesNotSold';
import {VinSearchQueryBuilder} from '../../../../main/typescript/builder/VinSearchQueryBuilder';


describe('Vehicle Query Builder with Vehicles Not Sold', function () {
    const query = new VehicleSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });


    it('should return a valid query for Vehicles Not Sold', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_DEFAULT_VEHICLE_NOT_SOLD);
        let actualQuery = query
            .withLiveBlock()
            .withVehiclesNotSold()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for Make/Model Vehicles Not Sold', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MAKE_MODEL_VEHICLE_NOT_SOLD);
        let actualQuery = query
            .addMake('Honda')
            .withModel('Accord')
            .withLiveBlock()
            .withVehiclesNotSold()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for Multi Make/Model Vehicles Not Sold', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MULTI_MAKE_MODEL_VEHICLE_NOT_SOLD);
        let actualQuery = query
            .addMake('Honda')
            .withModel('Accord')
            .withLiveBlock()
            .withVehiclesNotSold()
            .addMake('Dodge')
            .withModel('Caravan')
            .withLiveBlock()
            .withVehiclesNotSold()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for vin Not Sold', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_VIN_VEHICLE_NOT_SOLD);
        let vinQuery = new VinSearchQueryBuilder();
        let actualQuery = vinQuery
            .addVin('3VWJL7AJ7AM004439')
            .withLiveBlock()
            .withVehiclesNotSold()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for partial vin Not Sold', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_PARTIAL_VIN_VEHICLE_NOT_SOLD);
        let vinQuery = new VinSearchQueryBuilder();
        let actualQuery = vinQuery
            .addVin('4439')
            .withLiveBlock()
            .withVehiclesNotSold()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });




});








