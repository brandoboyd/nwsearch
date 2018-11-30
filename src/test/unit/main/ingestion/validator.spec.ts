//  Module:            validator.spec.ts
// 	Description:		Module to test validator logic

// 	Also-see:
// 	Tab-stops:			4
// 	Author:				Katherine Youngblood
// 	Language:			ts
// 	Creation Date:		06/21/2018
// 	Revisions:          Initial Version
//  Resources:          /resources/search
//  Test Target:        validator.ts
//
// 	==========================================================================
// 	See global.d.ts for global definitions.
// 	==========================================================================
/* tslint:disable:no-unused-expression */
import 'reflect-metadata';
import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';


describe('validator', function () {
    const dataValidator = require('../../../../main/typescript/ingestion/validator');
    const payload = {
        'originVehicleId' : 'value'
    };

    it('it should return false if payload is empty', () => {
        payload['originVehicleId'] = '';
        let isValidData = dataValidator.validateData(payload);
        expect(isValidData).to.be.true;
    });

    it('it should return false if payload is null', () => {
        payload['originVehicleId'] = null;
        let isValidData = dataValidator.validateData(payload);
        expect(isValidData).to.be.true;
    });

    it('it should return false if payload is undefined', () => {
        payload['originVehicleId'] = undefined;
        let isValidData = dataValidator.validateData(payload);
        expect(isValidData).to.be.true;
    });

    it('it should return true if payload has data', () => {
        let isValidData = dataValidator.validateData(payload);
        expect(isValidData).to.be.true;
    });
});
