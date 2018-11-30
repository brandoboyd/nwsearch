//  Module:            VinSearchQueryBuilderWithCountry.spec.ts
// 	Description:		Module to test the building the search query.

// 	Also-see:
// 	Tab-stops:			4
// 	Author:				Katherine Youngblood
// 	Language:			ts
// 	Creation Date:		06/21/2018
// 	Revisions:          Initial Version
//  Resources:          /resources/search
//  Test Target:        VinSearchQueryBuilder.ts
//
// 	==========================================================================
// 	See global.d.ts for global definitions.
// 	==========================================================================

import 'reflect-metadata';
import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';
import {VinSearchQueryBuilder} from '../../../../main/typescript/builder/VinSearchQueryBuilder';
import * as queryBuilder from '../../resources/builder/mockVehicleBuilderWithVin';


describe('Vin Query Builder with Country', function () {
    const query = new VinSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });


    it('should return a valid query for Vin with United States', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_VIN_UNITED_STATES);
        let actualQuery = query
            .addVin('1fatp8ff7j5166917')
            .withCountryName('United States')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for Vin with Canada', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_VIN_CANADA);
        let actualQuery = query
            .addVin('1fatp8ff7j5166917')
            .withCountryName('Canada')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for partial Vin with Canada', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_PARITAL_VIN_CANADA);
        let actualQuery = query
            .addVin('760013')
            .withCountryName('Canada')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for partial Vin with United States', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_PARTIAL_VIN_UNITED_STATES);
        let actualQuery = query
            .addVin('760013')
            .withCountryName('United States')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

});








