let AWS = require('aws-sdk');
let credentials = new AWS.EnvironmentCredentials('AWS');
let moment = require('moment');
import {DELETE_VEHICLE_STATUS} from './deleteQuery';
import {timeStamp_30days} from './deleteQuery';
import {timeStamp_31days} from './deleteQuery';

// get reference to S3 client
let s3 = new AWS.S3();

// Client to connect to elastic search
let client = require('elasticsearch').Client({
    hosts: [process.env.ES_URL],
    connectionClass: require('http-aws-es'),
    amazonES: {
        region: process.env.REGION,
        credentials: credentials
    }
});

export const deleteIndex = async (event: any, context: any, callback: any) => {

    await performBackupES(DELETE_VEHICLE_STATUS);
    await performDeleteES(DELETE_VEHICLE_STATUS);

};

async function performBackupES(body) {
    // Backup to S3

    const allVehicleStatusSold = [];
    const responseQueue = [];

    // start things off by searching, setting a scroll timeout, and pushing
    // our first response into the queue to be processed
    responseQueue.push( await client.search({
        index: process.env.ES_INDEX,
        type: process.env.ES_TYPE,
        scroll: '30s', // keep the search results "scrollable" for 30 seconds
        size: 20,
        body: body
    }));

    while (responseQueue.length) {
        const response = responseQueue.shift();

        response.hits.hits.forEach(function (hit) {
            allVehicleStatusSold.push(hit);
        });

        if (response.hits.total === allVehicleStatusSold.length) {
            console.log('allVehicleStatusSold', allVehicleStatusSold);
            break;
        }

        console.log('Done' + allVehicleStatusSold.length);

        responseQueue.push(
            await client.scroll({
                scrollId: response._scroll_id,
                scroll: '30s'
            })
        );
    }

    // archive_ES sold vehicles
    let params = {
        Bucket: process.env.S3_BUCKET,
        Key: process.env.S3_FILE + timeStamp_30days,
        Body: JSON.stringify(allVehicleStatusSold)
    };

    const resp = await s3.putObject(params).promise();
    console.log('Done archive_ES sold vehicles less than ' + timeStamp_30days);
}

async function performDeleteES(body) {
    // Delete ES sold vehicles
    await client.deleteByQuery({
        index: process.env.ES_INDEX,
        type: process.env.ES_TYPE,
        body: body
    });
    console.log('Done delete_ES sold vehicles less than ' + timeStamp_30days);
}
