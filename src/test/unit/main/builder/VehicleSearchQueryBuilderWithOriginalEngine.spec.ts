//  Module:            VehicleSearchQueryBuilderWithEngine.spec.ts
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
import {VEHICLE_WITH_ORIG_ENGINE,
    VEHICLE_WITH_MAKE_MODEL_ORIG_ENGINE,
    VEHICLE_SORT_ORIG_ENGINE} from '../../resources/builder/mockVehicleBuilderWithOriginalEngine';



describe('Vehicle Query Builder with Seller Org', function () {
    const query = new VehicleSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });


    it('should return a valid query for Original engine', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_ORIG_ENGINE);
        let actualQuery = query
            .withOriginalEngine('1.8 L')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make/model/Original engine', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_MAKE_MODEL_ORIG_ENGINE);
        let actualQuery = query
            .addMake('subaru')
            .withModel('Crosstrek')
            .withOriginalEngine('1.8 L')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid sort for Original engine', () => {
        let expectedQuery = JSON.stringify(VEHICLE_SORT_ORIG_ENGINE);
        let actualQuery = query
            .addMake('subaru')
            .withModel('Crosstrek')
            .withOriginalEngine('1.8 L')
            .sort('originalEngine', 'desc')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });


});








