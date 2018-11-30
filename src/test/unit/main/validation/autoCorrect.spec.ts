import 'reflect-metadata';
import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';

import {searchWordsCorrection} from '../../../../main/typescript/Auto-complete/autoCorrect';

describe(`APP /`, () => {
    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "honda civic 18"}'
        };

        const response = {
            'data': [{
                'make': 'honda', 'model': 'civic', 'year': '2018'}]
        };

        await searchWordsCorrection(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "honda civic 18 4wd"}'
        };

        const response = {
            'data': [{
                'make': 'honda', 'model': 'civic', 'year': '2018', 'drivetrain': '4wd'}]
        };

        await searchWordsCorrection(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "18 Caddy Impala 50k"}'
        };

        const response = {
            'data': [{
                'make': 'chevrolet,cadillac', 'model': 'impala%7C', 'year': '2018', 'odometer': '50000'}]
        };

        await searchWordsCorrection(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            //  expect(data.body).to.equal(JSON.stringify(response));
        });
    });
    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "Chevy impala 2018 50k"}'
        };

        const response = {
            'data': [{
                'make': 'chevrolet', 'model': 'impala', 'year': '2018', 'odometer': '50000'}]
        };
        await searchWordsCorrection(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
           // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "honda civic 18 4wd automatic"}'
        };

        const response = {
            'data': [{
                'make': 'honda', 'model': 'civic', 'year': '2018', 'drivetrain': '4wd', 'transmission': 'automatic'}]
        };

        await searchWordsCorrection(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
           // expect(data.body).to.equal(JSON.stringify(response));
        });
    });
    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "adesa indianapolis"}'
        };

        const response = {
            'data': [{
                'processingLocation': 'adesa indianapolis'}]
        };
     await searchWordsCorrection(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
           // expect(data.body).to.equal(JSON.stringify(response));
        });
    });
// **********
    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "chevrolet corvette ford mustang"}'
        };

        const response = {
            'searchText': {'make': 'Chevrolet,Ford', 'model': 'Corvette%7CMustang'}
        };

        await searchWordsCorrection(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "chevrolet cobalt cruze ford mustang probe"}'
        };

        const response = {
            'searchText': {'make': 'Chevrolet,Ford', 'model': 'cobalt,cruze%7Cmustang,probe'}
        };

        await searchWordsCorrection(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "chevrolet ford mustang"}'
        };

        const response = {
            'searchText': {'make': 'Ford,Chevrolet', 'model': 'Mustang%7C'}
        };

        await searchWordsCorrection(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            expect(data.body).to.equal(JSON.stringify(response));
        });
    });
});
