//  Module:            VehicleSearchQueryBuilder.spec.ts
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


describe('VehicleSearchQueryBuilder', function () {
    const query = new VehicleSearchQueryBuilder();
    beforeEach('Before each query build reset the builder ', function init() {
        query.reset();
    });

    it('should return a valid query for make', () => {
        let expectedQuery = '{"query":{"bool":{"should":[{"bool":{"must":[' +
            '{"match":{"make":"acura"}},' +
            '{"query_string":{"fields":["isLiveBlockSearchable","isDealerBlockSearchable","isRunBlockSearchable"],"query":true}}]}}]}}}';
        let actualQuery =
            query
                .addMake('acura')
                .withLiveBlock()
                .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });





    it('should return a valid query for year', () => {
        let expectedQuery = '{"query":{"bool":{"should":[{"bool":{"must":[{"match":{"year":"2006"}},' +
            '{"query_string":{"fields":["isLiveBlockSearchable","isDealerBlockSearchable","isRunBlockSearchable"],"query":true}}]}}]}}}';
        let actualQuery = query
            .withYear('2006')
            .withLiveBlock()
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for yearRange', () => {
        let expectedQuery = '{"query":{"bool":{"should":[{"bool":{"must":[' +
            '{"range":{"year":{"gte":"2006","lte":"2015","boost":2}}},' +
            '{"query_string":{"fields":["isLiveBlockSearchable","isDealerBlockSearchable","isRunBlockSearchable"],"query":true}}]}}]}}}';
        let actualQuery = query
            .withYear('2006-2015')
            .withLiveBlock()
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for odometer', () => {
        let expectedQuery = '{"query":{"bool":{"should":[{"bool":{"must":[{"range":{"odometer":{"gte":"10000","lte":"999999","boost":2}}},' +
            '{"query_string":{"fields":["isLiveBlockSearchable","isDealerBlockSearchable","isRunBlockSearchable"],"query":true}}]}}]}}}';
        let actualQuery = query
            .withOdometer('10000')
            .withLiveBlock()
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for odometerRange', () => {
        let expectedQuery = '{"query":{"bool":{"should":[{"bool":{"must":[{"range":{"odometer":{"gte":"10000","lte":"20000","boost":2}}},' +
            '{"query_string":{"fields":["isLiveBlockSearchable","isDealerBlockSearchable","isRunBlockSearchable"],"query":true}}]}}]}}}';
        let actualQuery = query
            .withOdometer('10000-20000')
            .withLiveBlock()
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return a valid query for driveTrain', () => {
        let expectedQuery = '{"query":{"bool":{"should":[{"bool":{"must":[{"match":{"driveTrain":"AWD"}},' +
            '{"query_string":{"fields":["isLiveBlockSearchable","isDealerBlockSearchable","isRunBlockSearchable"],"query":true}}]}}]}}}';
        let actualQuery = query
            .withDriveTrain('AWD')
            .withLiveBlock()
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });



    it('should return a valid query for transmission', () => {
        let expectedQuery = '{"query":{"bool":{"should":[{"bool":{"must":[{"match":{"transmission":"Automatic"}},' +
            '{"query_string":{"fields":["isLiveBlockSearchable","isDealerBlockSearchable","isRunBlockSearchable"],"query":true}}]}}]}}}';
        let actualQuery = query
            .withTransmission('Automatic')
            .withLiveBlock()
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });




    it('should return a valid query for trim', () => {
        let expectedQuery = '{"query":{"bool":{"should":[{"bool":{"must":[' +
            '{"match":{"trim":"LIMITED"}},' +
            '{"query_string":{"fields":["isLiveBlockSearchable","isDealerBlockSearchable","isRunBlockSearchable"],"query":true}}]}}]}}}';
        let actualQuery = query
            .withTrim('LIMITED')
            .withLiveBlock()
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });


    it('should return a valid query with MMF', () => {
        let expectedQuery = '{"query":{"bool":{"should":[{"bool":{"must":[' +
            '{"match":{"transmission":"Automatic"}},' +
            '{"multi_match":{"query":"subaru","type":"phrase_prefix","lenient":"true","fields":["make","model"]}}]}}]}}}';
        let actualQuery = query
            .withTransmission('Automatic')
            .withMMF('make,model', 'subaru')
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return an liveBlock query', () => {
        let expectedQuery = '{"query":{"query_string":{"fields":["isLiveBlockSearchable","isDealerBlockSearchable","isRunBlockSearchable"],"query":true}}}';
        let actualQuery = query
            .withLiveBlock()
            .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');
    });

    it('should return make field then no fields for empty values passed excluding auction location', () => {
        let expectedQuery = '{"query":{"bool":{"should":[{"bool":{"must":[' +
            '{"match":{"make":"acura"}},' +
            '{"query_string":{"fields":["isLiveBlockSearchable","isDealerBlockSearchable","isRunBlockSearchable"],"query":true}}]}}]}}}';
        let actualQuery =
            query
                .addMake('acura')
                .withModel('')
                .withExteriorColor('')
                .withOdometer('')
                .withDriveTrain('')
                .withAccessGroups('')
                .withEngine('')
                .withState('')
                .withYear('')
                .withTransmission('')
                .withCountryName('')
                .withTrim('')
                .withMMF('', '')
                .withLiveBlock()
                .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });

    it('should return default live block when no query params are passed', () => {
        let expectedQuery = '{"query":{"query_string":{"fields":["isLiveBlockSearchable","isDealerBlockSearchable","isRunBlockSearchable"],"query":true}}}';
        let actualQuery =
            query
                .addMake('')
                .withModel('')
                .withExteriorColor('')
                .withOdometer('')
                .withDriveTrain('')
                .withAccessGroups('')
                .withEngine('')
                .withOriginalEngine('')
                .withState('')
                .withYear('')
                .withTransmission('')
                .withCountryName('')
                .withTrim('')
                .withGrade('')
                .withBodyType('')
                .withAuctionLocation(null)
                .withSellerOrganization('')
                .withMMF('', '')
                .withLiveBlock()
                .build().replace(/ /g, '');
        expect(actualQuery).to.equal(expectedQuery, 'Search query does not match');

    });
});








