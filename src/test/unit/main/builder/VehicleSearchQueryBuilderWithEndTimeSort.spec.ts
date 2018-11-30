//  Module:            VehicleSearchQueryBuilderWithEndTimeSort.spec.ts
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
import * as queryBuilder from '../../resources/builder/mockVehicleBuilderWithSortByEndTime';


describe('Vehicle Query Builder with End Time Sort', function () {
    const query = new VehicleSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });


    it('should return a valid query for default sort', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_DEFAULT_SORT);
        let actualQuery = query
            .withLiveBlock()
            .sort()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for sort by endTime', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_SORT_WITH_ENDTIME);
        let actualQuery = query
            .withLiveBlock()
            .sort('endTime')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for sort by endTime asc', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_SORT_WITH_ENDTIME_ORDER_ASC);
        let actualQuery = query
            .withLiveBlock()
            .sort('endTime', 'asc')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for sort by endTime desc', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_SORT_WITH_ENDTIME_ORDER_DESC);
        let actualQuery = query
            .withLiveBlock()
            .sort('endTime', 'desc')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });
    it('should return a valid query for sort by make/endTime', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_SORT_WITH_MAKE_ENDTIME);
        let actualQuery = query
            .withLiveBlock()
            .sort('make,endTime')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });
    it('should return a valid query for sort by make/endTime asc', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_SORT_WITH_MAKE_ENDTIME_ORDER_ASC);
        let actualQuery = query
            .withLiveBlock()
            .sort('make,endTime', 'asc')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });
    it('should return a valid query for sort by make/endTime desc', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_SORT_WITH_MAKE_ENDTIME_ORDER_DESC);
        let actualQuery = query
            .withLiveBlock()
            .sort('make,endTime', 'desc')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });
    it('should return a valid query for sort by make/endTime asc/desc', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_SORT_WITH_MAKE_ENDTIME_ORDER_ASC_DESC);
        let actualQuery = query
            .withLiveBlock()
            .sort('make,endTime', 'asc,desc')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });
    it('should return a valid query for sort by make/endTime asc/asc', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_SORT_WITH_MAKE_ENDTIME_ORDER_ASC_ASC);
        let actualQuery = query
            .withLiveBlock()
            .sort('make,endTime', 'asc,asc')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });
    it('should return a valid query for sort by make/endTime desc,desc', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_SORT_WITH_MAKE_ENDTIME_ORDER_DESC_DESC);
        let actualQuery = query
            .withLiveBlock()
            .sort('make,endTime', 'desc,desc')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });
    it('should return a valid query for sort by make/endTime desc,asc', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_SORT_WITH_MAKE_ENDTIME_ORDER_DESC_ASC);
        let actualQuery = query
            .withLiveBlock()
            .sort('make,endTime', 'desc,asc')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

});








