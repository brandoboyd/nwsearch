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
    MULTI_VEHICLE_SORT_OFFSITE_AUCTION_LOCATION,
    MULTI_VEHICLE_WITH_MAKE_MODEL_OFFSITE_AUCTION_LOCATION,
    VEHICLE_OFFSITE_AUCTION_LOCATION_WITH_MULTI_LOCATIONS,
    VEHICLE_SORT_OFFSITE_AUCTION_LOCATION_AND_MULTI_STATE,
    VEHICLE_WITH_MAKE_MODEL_OFFSITE_AUCTION_LOCATION,
    VEHICLE_WITH_MAKE_MODEL_TRIM_OFFSITE_AUCTION_LOCATION,
    VEHICLE_WITH_MAKE_OFFSITE_AUCTION_LOCATION,
    VEHICLE_WITH_MAKE_OFFSITE_AUCTION_LOCATION_AND_STATE,
    VEHICLE_WITH_OFFSITE_AUCTION_LOCATION,
    VEHICLE_WITH_OFFSITE_AUCTION_LOCATION_AND_MULTI_STATE,
    VEHICLE_WITH_OFFSITE_AUCTION_LOCATION_AND_STATE,
    VEHICLE_SORT_OFFSITE_AUCTION_LOCATION_AND_STATE
} from '../../resources/builder/mockVehicleBuilderWithOffsiteAuctionLocation';


describe('Vehicle Query Builder with Offsite Auction Location', function () {
    const query = new VehicleSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });

    it('should return a valid query for offsite auction location', () => {

        let expectedQuery = JSON.stringify(VEHICLE_WITH_OFFSITE_AUCTION_LOCATION);
        let actualQuery =
            query
                .withAuctionLocation('other')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid query for offsite auction location with multi offsite', () => {

        let expectedQuery = JSON.stringify(VEHICLE_OFFSITE_AUCTION_LOCATION_WITH_MULTI_LOCATIONS);
        let actualQuery =
            query
                .withAuctionLocation('other,ADESA Indianapolis')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });


    it('should return a valid query for offsite auction location with state', () => {

        let expectedQuery = JSON.stringify(VEHICLE_WITH_OFFSITE_AUCTION_LOCATION_AND_STATE);
        let actualQuery =
            query
                .withAuctionLocation('other', 'CA')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid query for offsite auction location with multi-state', () => {

        let expectedQuery = JSON.stringify(VEHICLE_WITH_OFFSITE_AUCTION_LOCATION_AND_MULTI_STATE);
        let actualQuery =
            query
                .withAuctionLocation('other', 'CA,LA')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });
    it('should return a valid sort for offsite auction location with multi-state', () => {

        let expectedQuery = JSON.stringify(VEHICLE_SORT_OFFSITE_AUCTION_LOCATION_AND_MULTI_STATE);
        let actualQuery =
            query
                .withAuctionLocation('other', 'CA,TX')
                .withLiveBlock()
                .sort('state', 'desc')
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });
    it('should return a valid query for make, offsite auction location', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_MAKE_OFFSITE_AUCTION_LOCATION);
        let actualQuery =
            query
                .addMake('subaru')
                .withAuctionLocation('other')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make, offsite auction location and state', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_MAKE_OFFSITE_AUCTION_LOCATION_AND_STATE);
        let actualQuery =
            query
                .addMake('subaru')
                .withAuctionLocation('other', 'LA')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make, model, offsite auction location', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_MAKE_MODEL_OFFSITE_AUCTION_LOCATION);
        let actualQuery =
            query
                .addMake('Ford')
                .withModel('escape')
                .withAuctionLocation('other')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make, model, trim, offsite auction location', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_MAKE_MODEL_TRIM_OFFSITE_AUCTION_LOCATION);
        let actualQuery =
            query
                .addMake('subaru')
                .withModel('crosstrek')
                .withTrim('LIMITED')
                .withAuctionLocation('other')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for multiple makes/models/offsite auction locations', () => {
        let expectedQuery = JSON.stringify(MULTI_VEHICLE_WITH_MAKE_MODEL_OFFSITE_AUCTION_LOCATION);
        let actualQuery =
            query
                .addMake('honda')
                .withModel('accord')
                .withAuctionLocation('other')
                .withLiveBlock()
                .addMake('ford')
                .withModel('escape')
                .withAuctionLocation('other')
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid sort for multiple makes/models/offsite auction locations', () => {
        let expectedQuery = JSON.stringify(MULTI_VEHICLE_SORT_OFFSITE_AUCTION_LOCATION);
        let actualQuery =
            query
                .addMake('honda')
                .withModel('accord')
                .withAuctionLocation('other')
                .withLiveBlock()
                .addMake('ford')
                .withModel('escape')
                .withAuctionLocation('other')
                .withLiveBlock()
                .sort('auctionLocation', 'desc')
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

       it('should return a valid sort for offsite location and state', () => {
        let expectedQuery = JSON.stringify(VEHICLE_SORT_OFFSITE_AUCTION_LOCATION_AND_STATE);
        let actualQuery =
            query
                .withAuctionLocation('other')
                .withLiveBlock()
                .sort('offsiteState', 'asc')
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });


});








