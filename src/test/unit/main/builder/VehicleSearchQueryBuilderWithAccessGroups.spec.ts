//  Module:            VehicleSearchQueryBuilderWithAccessGroups.spec.ts
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
import {VinSearchQueryBuilder} from '../../../../main/typescript/builder/VinSearchQueryBuilder';
import * as queryBuilder from '../../resources/builder/mockVehicleBuilderWithAccessGroups';


describe('Vehicle Query Builder with Access Groups', function () {
    const query = new VehicleSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });


    it('should return a valid query for Access Groups', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_ACCESS_GROUPS);
        let actualQuery = query
            .withAccessGroups('1,385,386,387')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for Access Groups and vin', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_ACCESS_GROUPS_AND_VIN);
        let vinQuery = new VinSearchQueryBuilder();
        let actualQuery = vinQuery
            .addVin('1GYKNGRS8JZ146936')
            .withAccessGroups('1,385,386,387')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for no Access Groups and vin', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_NO_ACCESS_GROUPS_AND_VIN);
        let vinQuery = new VinSearchQueryBuilder();
        let actualQuery = vinQuery
            .addVin('1GYKNGRS8JZ146936')
            .withAccessGroups('')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for Access Groups and paritial vin', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_ACCESS_GROUPS_AND_PARTIAL_VIN);
        let vinQuery = new VinSearchQueryBuilder();
        let actualQuery = vinQuery
            .addVin('146936')
            .withAccessGroups('1,397,398,399')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for Access Groups and make/model', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_ACCESS_GROUPS_AND_MAKE_MODEL);

        let actualQuery = query
            .addMake('subaru')
            .withModel('crosstrek')
            .withAccessGroups('1,397,398,399')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for one Access Group and make/model', () => {
        let expectedQuery = JSON.stringify(queryBuilder.VEHICLE_WITH_ONE_ACCESS_GROUP_AND_MAKE_MODEL);

        let actualQuery = query
            .addMake('subaru')
            .withModel('crosstrek')
            .withAccessGroups('267')
            .withLiveBlock()
            .build();
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

});








