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
import {VEHICLE_WITH_ENGINE,
    VEHICLE_WITH_MAKE_MODEL_ENGINE,
    VEHICLE_WITH_MULTI_ENGINE,
    VEHICLE_SORT_ENGINE} from '../../resources/builder/mockVehicleBuilderWithEngine';



describe('Vehicle Query Builder with Engine', function () {
    const query = new VehicleSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });


    it('should return a valid query for engine', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_ENGINE);
        let actualQuery = query
            .withEngine('4 CYL')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for list of engines engine', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_MULTI_ENGINE);
        let actualQuery = query
            .withEngine('4 CYL,6 CYL')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make/model/engine', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_MAKE_MODEL_ENGINE);
        let actualQuery = query
            .addMake('subaru')
            .withModel('Crosstrek')
            .withEngine('4 CYL')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid sort for engine', () => {
        let expectedQuery = JSON.stringify(VEHICLE_SORT_ENGINE);
        let actualQuery = query
            .addMake('subaru')
            .withModel('Crosstrek')
            .withEngine('4 CYL')
            .sort('engine', 'desc')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });


});








