//  Module:            VehicleSearchQueryBuilderWithSellerOrg.spec.ts
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
import * as queryBuilder from '../../resources/builder/mockVehicleBuilderWithSellerOrg';


describe('Vehicle Query Builder with Seller Organization', function () {
    const query = new VehicleSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });


    it('should return a valid query for Seller Organization', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_SELLER_ORG);
        let actualQuery = query
            .withSellerOrganization('JPMORGAN CHASE BANK, N.A.')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for Make/Model/Seller Org', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MAKE_MODEL_SELLER_ORG);
        let actualQuery = query
            .addMake('subaru')
            .withModel('outback')
            .withSellerOrganization('JPMORGAN CHASE BANK, N.A.')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query multiple seller orgs', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MULTIPLE_SELLER_ORG);
        let actualQuery = query
            .withSellerOrganization('JPMORGAN CHASE BANK, N.A.|SUBARU OF AMERICA INC.')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for make/model and multiple sellers', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MAKE_MODEL_MULTIPLE_SELLER_ORG);
        let actualQuery = query
            .addMake('ford')
            .withModel('escape')
            .withSellerOrganization('FORD CREDIT|Ford Motor Company of Canada')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid sort multiple make/model/seller', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_MULTIPLE_MAKE_MODEL_MULTIPLE_SELLER_ORG_SORT);
        let actualQuery = query
            .addMake('subaru')
            .withModel('outback')
            .withSellerOrganization('FORD CREDIT|JPMORGAN CHASE BANK, N.A.')
            .withLiveBlock()
            .addMake('ford')
            .withModel('escape')
            .withSellerOrganization('FORD CREDIT|JPMORGAN CHASE BANK, N.A.')
            .withLiveBlock()
            .sort('seller', 'desc')
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

});








