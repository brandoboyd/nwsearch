//  Module:            VinSearchQueryBuilder.spec.ts
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
import {VinSearchQueryBuilder} from '../../../../main/typescript/builder/VinSearchQueryBuilder';
import {VEHICLE_WITH_2_DIGIT_VIN_SORT, VEHICLE_WITH_PARTIAL_VIN_DEFAULT_SORT, VEHICLE_WITH_VIN_DEFAULT_SORT} from '../../resources/builder/mockVehicleBuilderWithSortByEndTime';


describe('SearchQueryBuilder', function () {
    const query = new VinSearchQueryBuilder();

    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });
    it('should return a valid search and sort query for vin of length 17', () => {

        let vin = '1GCCS196068163410';
        assertFullVin(query, vin);


    });

    it('should return a valid search and sort query for vin of length 10', () => {

        let vin = 'P6FH203182';
        assertFullVin(query, vin);

    });

    it('should return a valid wildcard search and sort query for vin of length 6', () => {

        let vin = '163410';
        assertPartialVin(query, vin);

    });


    it('should return a valid wildcard search and sort query for vin of length 4', () => {

        let vin = '1634';
        assertPartialVin(query, vin);

    });

    it('should return a default sort query for vin of length 2', () => {

        let vin = '16';
        let msg = 'The VIN of ' + vin + ' does not match the expected value';
        let expected = JSON.stringify(VEHICLE_WITH_2_DIGIT_VIN_SORT);
        expect(query.addVin(vin).sort().build()).to.equal(expected, msg);

    });

    it('should return a valid wildcard search and sort query for vin of length 12', () => {

        let vin = 'AJ45P3241634';
        assertPartialVin(query, vin);

    });

    it('should return a empty string or default sort for a null vin', () => {
        let vin = null;
        let msg = 'The VIN of should return an empty value';
        let expected = JSON.stringify(VEHICLE_WITH_2_DIGIT_VIN_SORT);
        expect(query.addVin(vin).sort().build()).to.equal(expected, msg);
        expect(query.addVin(vin).build()).to.equal(expected, msg);
    });

    it('should return a an empty string of default sort for an empty vin string', () => {
        let vin = '';
        let msg = 'The VIN of should return an empty value';
        let expected = JSON.stringify(VEHICLE_WITH_2_DIGIT_VIN_SORT);
        expect(query.addVin(vin).sort().build()).to.equal(expected, msg);
        expect(query.addVin(vin).build()).to.equal(expected, msg);
    });

    it('should return a vin with liveblock string', () => {
        let vin = '1gccs196068163410';
        let msg = 'The VIN of should return an empty value';

        let expectedValue = '{"query":{"bool":{"must":[' +
            '{"match":{"vin":"1gccs196068163410"}},' +
            '{"query_string":{"fields":["isLiveBlockSearchable","isDealerBlockSearchable","isRunBlockSearchable"],"query":true}}]}}}';
        expect(query.addVin(vin).withLiveBlock().build()).to.equal(expectedValue, msg);
    });

    it('should return a valid LiveBlock query', () => {
        let expectedQuery = '{"query":{"query_string":{"fields":["isLiveBlockSearchable","isDealerBlockSearchable","isRunBlockSearchable"],"query":true}}}';
        let actualQuery = query
            .withLiveBlock()
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });


});

/**
 * Helper function to build searchQuery for a full vin
 */
function searchQuery(vin: string): string {
    let vinSearchQuery: string;
    vinSearchQuery = '{"query":{"match":{"vin":"' + vin.toLowerCase() + '"}}}';

    return vinSearchQuery;

}

/**
 * Helper function to build sortQuery for a full vin
 */
function sortQuery(vin: string): string {
    VEHICLE_WITH_VIN_DEFAULT_SORT.query.match.vin = vin.toLowerCase();
    return JSON.stringify(VEHICLE_WITH_VIN_DEFAULT_SORT);

}

/**
 * Helper function to build search query for a partial vin
 */
function searchQueryForPartialVin(vin: string): string {

    return '{"query":{"wildcard":{"vin":"*' + vin.toLowerCase() + '"}}}';

}

/**
 * Helper function to build sortQuery for a partial vin
 */
function sortQueryForPartialVin(vin: string): string {
    VEHICLE_WITH_PARTIAL_VIN_DEFAULT_SORT.query.wildcard.vin = '*' + vin.toLowerCase();
    return JSON.stringify(VEHICLE_WITH_PARTIAL_VIN_DEFAULT_SORT);
}

/**
 * Removes blank spaces from returned sort query for simpler match
 */
function formattedSortQuery(query: VinSearchQueryBuilder, vin: string): string {

    return query.addVin(vin).sort().build();
}

/**
 * Removes blank spaces from returned search query for simpler match
 */
function formattedSearchQuery(query: VinSearchQueryBuilder, vin: string): string {

    return query.addVin(vin).build();
}

/**
 * Message to return if test fails
 */
function getMessage(vin: string): string {
    return 'The VIN of ' + vin + ' does not match the expected value';
}

/**
 * Builds expected values and calls assert vin for full vin
 */
function assertFullVin(query: VinSearchQueryBuilder, vin: string) {
    let vinSortQuery = sortQuery(vin);
    let vinSearchQuery = searchQuery(vin);
    assertVin(query, vin, vinSortQuery, vinSearchQuery);

}

/**
 * Builds expected values and calls assert vin for partial vin
 */
function assertPartialVin(query: VinSearchQueryBuilder, vin: string) {

    let vinSortQuery = sortQueryForPartialVin(vin);
    let vinSearchQuery = searchQueryForPartialVin(vin);
    assertVin(query, vin, vinSortQuery, vinSearchQuery);
}

/**
 * Asserts vin
 */
function assertVin(query: VinSearchQueryBuilder, vin: string, sort: string, search: string) {

    expect(formattedSortQuery(query, vin)).to.equal(sort, getMessage(vin));
    query.reset();
    expect(formattedSearchQuery(query, vin)).to.equal(search, getMessage(vin));
}

