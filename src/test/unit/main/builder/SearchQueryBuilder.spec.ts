//  Module:            SearchQueryBuilder.spec.ts
// 	Description:		Module to test the building the search query.

// 	Also-see:
// 	Tab-stops:			4
// 	Author:				Katherine Youngblood
// 	Language:			ts
// 	Creation Date:		06/21/2018
// 	Revisions:          Initial Version
//  Resources:          /resources/search
//  Test Target:        SearchQueryBuilder.ts
//
// 	==========================================================================
// 	See global.d.ts for global definitions.
// 	==========================================================================

import 'reflect-metadata';
import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';
import {VehicleSearchQueryBuilder} from '../../../../main/typescript/builder/VehicleSearchQueryBuilder';
import {ISearchQueryBuilder} from '../../../../main/typescript/builder/ISearchQueryBuilder';
import {VEHICLE_WITH_MAKE_DEFAULT_SORT, VEHICLE_WITH_MAKE_SORT_MAKE} from '../../resources/builder/mockVehicleBuilderWithSortByEndTime';


describe('SearchQueryBuilder', function () {
   let query = new VehicleSearchQueryBuilder();



    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });

    it('should return a default sort query no sort fields are passed', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_MAKE_DEFAULT_SORT);
        let actualQuery = query
            .addMake('acura')
            .withLiveBlock()
            .sort()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a sort query when a single sort/order field is passed', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_MAKE_SORT_MAKE);
        let actualQuery = query
            .addMake('acura')
            .withLiveBlock()
            .sort('make', 'asc')
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });


    it('should return a valid from query if a from value is passed', () => {
        let expectedQuery = '{"from":2,"query":{"bool":{"should":[{"bool":{"must":[{"match":{"make":"acura"}},' +
            '{"query_string":{"fields":["isLiveBlockSearchable","isDealerBlockSearchable","isRunBlockSearchable"],"query":true}}]}}]}}}';
        let actualQuery = query
            .addMake('acura')
            .withLiveBlock()
            .from(2)
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a no from query if an empty from value is passed', () => {
        let expectedQuery = '{"query":{"bool":{"should":[{"bool":{"must":[{"match":{"make":"acura"}},' +
            '{"query_string":{"fields":["isLiveBlockSearchable","isDealerBlockSearchable","isRunBlockSearchable"],"query":true}}]}}]}}}';
        let actualQuery = query
            .addMake('acura')
            .withLiveBlock()
            .from(undefined)
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });


});


function createVehicleSearchQueryBuilder(): ISearchQueryBuilder {
   let query = new VehicleSearchQueryBuilder();
   return query;
}
