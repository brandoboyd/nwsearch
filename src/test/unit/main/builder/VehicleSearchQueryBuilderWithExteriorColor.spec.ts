//  Module:            VehicleSearchQueryBuilderWithExteriorColor.spec.ts
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
import {VEHICLE_WITH_MAKE_MODEL_EXTERIOR_COLOR,
    VEHICLE_WITH_EXTERIOR_COLOR,
    VEHICLE_SORT_EXTERIOR_COLOR} from '../../resources/builder/mockVehicleBuilderWithExteriorColor';


describe('Vehicle Query Builder with Exterior Color', function () {
    const query = new VehicleSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });


    it('should return a valid query for make/model/exteriorColor', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_MAKE_MODEL_EXTERIOR_COLOR);
        let actualQuery = query
            .addMake('acura')
            .withModel('nsx')
            .withExteriorColor('black')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid query for exteriorColor', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_EXTERIOR_COLOR);
        let actualQuery = query
            .withExteriorColor('black')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid sort for exteriorColor', () => {
        let expectedQuery = JSON.stringify(VEHICLE_SORT_EXTERIOR_COLOR);
        let actualQuery = query
            .withExteriorColor('black')
            .withLiveBlock()
            .sort('exteriorColor', 'desc')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid sort for exteriorColour (Canadian Spelling)', () => {
        let expectedQuery = JSON.stringify(VEHICLE_SORT_EXTERIOR_COLOR);
        let actualQuery = query
            .withExteriorColor('black')
            .withLiveBlock()
            .sort('exteriorColour', 'desc')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

});








