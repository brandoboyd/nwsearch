import 'reflect-metadata';
import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';
import {spawnSync} from 'child_process';

describe.skip('Ingestion Test', function() {
    it('Should post command', function () {
        // On Windows Only ...
        let bat = require.resolve('../resources/ingestion/ingestion_tests.bat');
        try {
            let ls = spawnSync(bat);

        } catch (e) {
            // console.log(e);
        }
        // console.log('Command posted.');
    });
});


