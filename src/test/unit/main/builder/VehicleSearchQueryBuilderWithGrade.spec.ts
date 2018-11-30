//  Module:            VehicleSearchQueryBuilderWithOffsiteAuctionLocation.spec.ts
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
import {
    VEHICLE_SORT_GRADE_RANGE,
    VEHICLE_WITH_GRADE_NO_RANGE,
    VEHICLE_WITH_GRADE_RANGE,
    VEHICLE_WITH_MAKE_MODEL_GRADE_NO_RANGE,
    VEHICLE_WITH_MAKE_MODEL_GRADE_RANGE
} from '../../resources/builder/mockVehicleBuilderWithGrade';


describe('Vehicle Query Builder with Grade', function () {
    const query = new VehicleSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });

    it('should return a valid query for grade of 0-3', () => {

        let expectedQuery = JSON.stringify(VEHICLE_WITH_GRADE_RANGE);
        let actualQuery =
            query
                .withGrade('0-3')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid query for grade 3', () => {

        let expectedQuery = JSON.stringify(VEHICLE_WITH_GRADE_NO_RANGE);
        let actualQuery =
            query
                .withGrade('3')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid query for make/model/grade of 0-3', () => {

        let expectedQuery = JSON.stringify(VEHICLE_WITH_MAKE_MODEL_GRADE_RANGE);
        let actualQuery =
            query
                .addMake('subaru')
                .withModel('crosstrek')
                .withGrade('0-3')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid query for make/model/grade of 3', () => {

        let expectedQuery = JSON.stringify(VEHICLE_WITH_MAKE_MODEL_GRADE_NO_RANGE);
        let actualQuery =
            query
                .addMake('subaru')
                .withModel('crosstrek')
                .withGrade('3')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid sort for grade of 0-3', () => {

        let expectedQuery = JSON.stringify(VEHICLE_SORT_GRADE_RANGE);
        let actualQuery =
            query
                .withGrade('0-3')
                .withLiveBlock()
                .sort('grade', 'asc')
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

});








