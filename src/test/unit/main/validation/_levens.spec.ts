//  Module:            _levens.spec.ts
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
import {getEditDistance} from '../../../../main/typescript/_levens';

describe('getEditDistance', function () {


    it('it should return b length is a is empty', () => {
        let a = '';
        let b = 'four';
        let actual = getEditDistance(a, b);
        expect(actual).to.equal(4);
    });

    it('it should return a length if b is empty', () => {
        let a = 'four';
        let b = '';
        let actual = getEditDistance(a, b);
        expect(actual).to.equal(4);
    });


});

