//  Module:            VehicleSearchQueryBuilderWithAuctionLocation.spec.ts
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
    VEHICLE_WITH_AUCTION_LOCATION,
    VEHICLE_WITH_AUCTION_LOCATION_ALL_ADESA,
    VEHICLE_WITH_MAKE_AUCTION_LOCATION,
    VEHICLE_WITH_MAKE_MODEL_AUCTION_LOCATION,
    VEHICLE_WITH_MAKE_MODEL_TRIM_AUCTION_LOCATION,
    VEHICLE_WITH_MAKE_MODEL_TRIM_COLOR_AUCTION_LOCATION,
    MULTI_VEHICLE_WITH_MAKE_MODEL_AUCTION_LOCATION,
    MULTI_VEHICLE_SORT_AUCTION_LOCATION} from '../../resources/builder/mockVehicleBuilderWithAuctionLocation';




describe('Vehicle Query Builder with Auction Location', function () {
    const query = new VehicleSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });

    it('should return a valid query for auction location', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_AUCTION_LOCATION);
        let actualQuery =
            query
                .withAuctionLocation('ADESA Ottawa')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

     it('should return a valid query for auction location all ADESA locations', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_AUCTION_LOCATION_ALL_ADESA);
        let actualQuery =
            query
                .withAuctionLocation('onsite')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid query for make, auction location', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_MAKE_AUCTION_LOCATION);
        let actualQuery =
            query
                .addMake('subaru')
                .withAuctionLocation('ADESA Ottawa')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make, model, auction location', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_MAKE_MODEL_AUCTION_LOCATION);
        let actualQuery =
            query
                .addMake('Ford')
                .withModel('escape')
                .withAuctionLocation('ADESA Ottawa')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make, model, trim, auction location', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_MAKE_MODEL_TRIM_AUCTION_LOCATION);
        let actualQuery =
            query
                .addMake('subaru')
                .withModel('crosstrek')
                .withTrim('LIMITED')
                .withAuctionLocation('ADESA Ottawa')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make, model, trim, exteriorColor,auction location', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_MAKE_MODEL_TRIM_COLOR_AUCTION_LOCATION);
        let actualQuery =
            query
                .addMake('subaru')
                .withModel('crosstrek')
                .withExteriorColor('black')
                .withTrim('LIMITED')
                .withAuctionLocation('ADESA Ottawa')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for multiple makes/models/auction locations', () => {
        let expectedQuery = JSON.stringify(MULTI_VEHICLE_WITH_MAKE_MODEL_AUCTION_LOCATION);
        let actualQuery =
            query
                .addMake('honda')
                .withModel('accord')
                .withAuctionLocation('ADESA Boston,ADESA Sacramento')
                .withLiveBlock()
                .addMake('ford')
                .withModel('escape')
                .withAuctionLocation('ADESA Boston,ADESA Sacramento')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid sort for multiple makes/models/auction locations', () => {
        let expectedQuery = JSON.stringify(MULTI_VEHICLE_SORT_AUCTION_LOCATION);
        let actualQuery =
            query
                .addMake('honda')
                .withModel('accord')
                .withAuctionLocation('ADESA Boston,ADESA Sacramento')
                .withLiveBlock()
                .addMake('ford')
                .withModel('escape')
                .withAuctionLocation('ADESA Boston,ADESA Sacramento')
                .withLiveBlock()
                .sort('auctionLocation', 'desc')
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

});








