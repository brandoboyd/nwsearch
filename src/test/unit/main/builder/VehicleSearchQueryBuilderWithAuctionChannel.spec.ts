//  Module:            VehicleSearchQueryBuilderWithAuctionChannel.spec.ts
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
    VEHICLE_SORT_AUCTION_CHANNEL_DEALER_RUN_BLOCK,
    VEHICLE_SORT_AUCTION_CHANNEL_DEALER_RUN_LIVE_BLOCK,
    VEHICLE_SORT_AUCTION_CHANNEL_DEALERBLOCK,
    VEHICLE_WITH_AUCTION_CHANNEL_ALL,
    VEHICLE_WITH_AUCTION_CHANNEL_DEALER_BLOCK,
    VEHICLE_WITH_AUCTION_CHANNEL_DEALERBLOCK,
    VEHICLE_WITH_AUCTION_CHANNEL_DEALERBLOCK_LIVEBLOCK,
    VEHICLE_WITH_AUCTION_CHANNEL_DEALERBLOCK_RUNLIST,
    VEHICLE_WITH_AUCTION_CHANNEL_LIVEBLOCK_RUNLIST
} from '../../resources/builder/mockVehicleBuilderWithAuctionChannel';


describe('Vehicle Query Builder with Auction Channel', function () {
    const query = new VehicleSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });

    it('should return a valid query for auction channel all no params passed', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_AUCTION_CHANNEL_ALL);
        let actualQuery =
            query
                .withLiveBlock()
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid query for auction channel all 3 params passed', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_AUCTION_CHANNEL_ALL);
        let actualQuery =
            query
                .withLiveBlock('liveBlock,dealerBlock,runList')
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid query for auction channel with dealer block', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_AUCTION_CHANNEL_DEALERBLOCK);
        let actualQuery =
            query
                .withLiveBlock('dealerBlock')
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid query for auction channel with dealer block runlist', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_AUCTION_CHANNEL_DEALERBLOCK_RUNLIST);
        let actualQuery =
            query
                .withLiveBlock('dealerBlock,runList')
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });


    it('should return a valid query for auction channel with liveblock and runList', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_AUCTION_CHANNEL_LIVEBLOCK_RUNLIST);
        let actualQuery =
            query
                .withLiveBlock('liveBlock,runList')
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid query for auction channel with liveblock and dealerblock', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_AUCTION_CHANNEL_DEALERBLOCK_LIVEBLOCK);
        let actualQuery =
            query
                .withLiveBlock('dealerBlock,liveBlock')
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid sort for auction channel with sort of dealerblock', () => {
        let expectedQuery = JSON.stringify(VEHICLE_SORT_AUCTION_CHANNEL_DEALERBLOCK);
        let actualQuery =
            query
                .withLiveBlock('dealerBlock')
                .sort('dealerBlock', 'desc')
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid sort for auction channel with sort of dealerblock and runlist', () => {
        let expectedQuery = JSON.stringify(VEHICLE_SORT_AUCTION_CHANNEL_DEALER_RUN_BLOCK);
        let actualQuery =
            query
                .withLiveBlock('dealerBlock,runList')
                .sort('dealerBlock,runList', 'desc,desc')
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid sort for auction channel with sort of dealerblock runlist liveblock', () => {
        let expectedQuery = JSON.stringify(VEHICLE_SORT_AUCTION_CHANNEL_DEALER_RUN_LIVE_BLOCK);
        let actualQuery =
            query
                .withLiveBlock('dealerBlock,runList,liveBlock')
                .sort('dealerBlock,runList,liveBlock', 'desc,desc,desc')
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return all auction channels an invalid auction channel', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_AUCTION_CHANNEL_ALL);
        let actualQuery =
            query
                .withLiveBlock('unknown')
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return a valid sort for auction channel with make and dealerblock', () => {
        let expectedQuery = JSON.stringify(VEHICLE_WITH_AUCTION_CHANNEL_DEALER_BLOCK);
        let actualQuery =
            query
                .addMake('ford')
                .withLiveBlock('dealerBlock')
                .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });


});








