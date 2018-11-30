import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';

describe.skip('Ingestion to Kinesis stream', function() {
   // kinesis.endpoint = 'arn:aws:kinesis:us-east-1:854045450972:stream/';

    it('should insert data to ES', function () {
        createStream('nw-deprotobuf-testdev', 2, function(err) {
            if (err) {
                console.error('Error starting Kinesis producer: ' + err);
                return;
            }

        });
        writeToKinesis('nw-deprotobuf-testdev');
    }).timeout(60);
});


let AWS = require('aws-sdk');

let kinesis = new AWS.Kinesis({region : 'us-east-1'});

function createStream(streamName, numberOfShards, callback) {
    let params = {
        ShardCount: numberOfShards,
        StreamName: streamName
    };

    // Create the new stream if it does not already exist.
    kinesis.createStream(params, function(err, data) {
        if (err && err.code !== 'ResourceInUseException') {
            callback(err);
            return;
        }
        // Make sure the stream is in the ACTIVE state before
        // you start pushing data.
        waitForStreamToBecomeActive(streamName, callback);
    });
}

function waitForStreamToBecomeActive(streamName, callback) {
    kinesis.describeStream({StreamName : streamName},
        function(err, streamMetaData) {
            if (err) {
                callback(err);
                return;
            }

            if (streamMetaData.StreamDescription.StreamStatus === 'ACTIVE') {
                callback();
            } else {
                // The stream is not ACTIVE yet. Wait for another 5 seconds before
                // checking the state again.
                setTimeout(function() {
                    waitForStreamToBecomeActive(streamName, callback);
                }, 5000);
            }
        }
    );
}

function writeToKinesis(streamName) {
    let data = '{event : vehicle_added_inventory, body: {originVehicleId : 381697378, nwVehicleId : 911A84E1-FDF5-444F-9842-9C33C93ADF2C, vin : 4T1BF1FK9DU244021, make : TOYOTA, model : CAMRY, year: 2013,  series : 4DR SDN I4 AUTO SE (, drivetrain : 4 wheel drive, transmission : zf-6spd, bodyStyle : 4DR SDN I4 AUTO (NAT, lbLaneNumber : D, lbRunNumber : 147,     lbSaleDate: 1528815000000, odometer : 73k, odometerUnitOfMeasure : MI, exteriorColor : BLACK,        interiorColor : BLACK, engineName : 12.3L DOHC MFI I14 engine, currency : USD, viewAccessGroupList : 1,297,566,567,568,569,570,571,572,        systemUuid : 6E02B598-C885-4125-876E-2A8217655D27,        systemOrigin : classic, systemWhenCreated: 1528810809933, systemTopic : nw-auction-develop, systemTopicKey : 911A84E1-FDF5-444F-9842-9C33C93ADF2C,        systemEvent : vehicle_updated_liveblock,        originTimestamp: 1528810805000, lbLotNumber : D, vehicleStatus : Live-Block Vehicles, state : MN, originLiveblockEventId : 1207253,        nwLiveblockEventId : 2C911D46-B086-46A7-8A6F-8C8962BBB9AD}}';
    let partitionKey = 'nwVehicleId-911A84E1-FDF5-444F-9842-9C33C93ADF2C';
    let recordParams = {
        Data: data,
        PartitionKey: partitionKey,
        StreamName: streamName
    };

    kinesis.putRecord(recordParams, function(err, testdata) {
        if (err) {
            console.error(err);
        }
    });
}

function ESTest() {
// Client to connect to elastic search
    let credentials = new AWS.EnvironmentCredentials('AWS');
    let client = require('elasticsearch').Client({
        hosts: [process.env.ES_URL],
        connectionClass: require('http-aws-es'),
        amazonES: {
            region: process.env.REGION,
            credentials: credentials
        }
    });
}

