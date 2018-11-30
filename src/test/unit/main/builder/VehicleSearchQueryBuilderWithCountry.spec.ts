//  Module:            VehicleSearchQueryBuilderWithCountry.spec.ts
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
import {VEHICLE_WITH_COUNTRY,
    VEHICLE_WITH_MAKE_MODEL_COUNTRY,
    VEHICLE_SORT_COUNTRY} from '../../resources/builder/mockVehicleBuilderWithCountry';



describe('Vehicle Query Builder with Country', function () {
    const query = new VehicleSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });


    it('should return a valid query for make/model/countryName', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_MAKE_MODEL_COUNTRY);
        let actualQuery = query
            .addMake('honda')
            .withModel('Accord')
            .withCountryName('US')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for countryName', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_COUNTRY);
        let actualQuery = query
            .withCountryName('US')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid sort for country', () => {
        let expectedQuery = JSON.stringify(VEHICLE_SORT_COUNTRY);
        let actualQuery = query
            .withCountryName('US')
            .withLiveBlock()
            .sort('country', 'desc')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });


});








