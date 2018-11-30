const nwUtils = require('./util/commonUtils.ts');
import {DataCleanser} from './ingestion/DataCleanser';

let AWS = require('aws-sdk');
let credentials = new AWS.EnvironmentCredentials('AWS');
const dataCleanser = new DataCleanser();
const update_events = ['vehicle_added_inventory', 'vehicle_updated_inventory',
    'db_auction_started',
    'db_price_updated', 'vehicle_added_inspection',
    'vehicle_updated_inspection', 'rl_vehicle_added',
    'rl_vehicle_removed', 'lb_vehicle_added',
    'lb_vehicle_removed', 'db_auction_ended',
    'db_vehicle_schedule_updated', 'db_auction_extended',
    'rl_vehicle_updated', 'lb_vehicle_updated',
    'vehicle_added_pictures', 'vehicle_update_pictures',
    'vehicle_sold', 'ams_vehicle_sold',
    'lb_autobid_placed', 'lb_autobid_updated',
    'db_bid_placed', 'bo_placed',
    'bo_accepted', 'bo_declined',
    'vehicle_delete_picture'];
const lb_events = ['lb_event_created', 'lb_event_started',
    'lb_event_updated', 'lb_event_ended'];

// Client to connect to elastic search
let client = require('elasticsearch').Client({
    hosts: [process.env.ES_URL],
    connectionClass: require('http-aws-es'),
    amazonES: {
        region: process.env.REGION,
        credentials: credentials
    }
});

type lbInfoType = {};
let lbInfoMap: Map<string, lbInfoType> = new Map<string, lbInfoType>();

export const putIndex = async (event: any, context: any, callback: any) => {
    lbInfoMap.clear();

    await processRecordsForLBInfoMap(event.Records);
    await processRecordsForUpdateES(event.Records);

};

async function processRecordsForLBInfoMap(records: any) {
    // Process each kinesis record async to get events 'lb_vehicle_added' and 'lb_vehicle_updated'
    let docs: any = [];
    for (const record of records) {
        let recordLB: any;
        recordLB = nwUtils.bufferedRow2Json(record);
        if (recordLB.event === 'lb_vehicle_added' || recordLB.event === 'lb_vehicle_updated') {
            docs.push(
                recordLB.body.nwLiveblockEventId
            );
        }
    }

    if (docs.length !== 0) {
        // Eliminate duplicates
        docs = [...new Set(docs)];

        // mget all the liveblock events
        const lbResponse = await client.mget({
            'index': process.env.LBES_INDEX,
            'type': process.env.LBES_TYPE,
            body: {
                ids: docs
            }
        }).then(response => {
            response.docs.forEach(doc => {
                lbInfoMap.set(doc._id, doc._source);
            });
            log('Fetched_ES Live Block events', response.docs);
        }).catch(function (err) {
            if (err.status === 404) {
            } else {
                throw err;
            }
        });
    }
}

async function processRecordsForUpdateES(records: any) {
    let body: any = [];

    // Process each kinesis record async
    for (const record of records) {
        let recordTrns: any;
        recordTrns = nwUtils.bufferedRow2Json(record);
        // Modify picture related events based on isPrimaryField
        if ((recordTrns.event === 'vehicle_added_pictures' || recordTrns.event === 'vehicle_update_pictures') && !recordTrns.body.isPrimary) {
            recordTrns.event = 'vehicle_pictures_secondary';
        }
        if (update_events.includes(recordTrns.event) || lb_events.includes(recordTrns.event)) {
            await handleKinesisRecords(recordTrns, body);
        }
    }

    // bulk insert the records to ES
    if (body.length !== 0) {
        await client.bulk({
            body: body
        }).then(response => {
            let errorCount = 0;
            response.items.forEach(item => {
                if (item.index && item.index.error) {
                    console.log('error_ES', ++errorCount, item.index.error);
                }
            });
            let msg = 'Successfully indexed ' + ((body.length / 2) - errorCount) + ' out of ' + (body.length / 2) + ' events';
            log(msg, body);
        }).catch(err => console.log(`Bulk error_ES: ${err}`, body));
    }
}

async function handleKinesisRecords(record: any, body: any) {
    let payload = record.body;
    let event = record.event;
    let cleansedData: any;
    try {
        cleansedData = dataCleanser.cleanseRow(payload, record.event);
    } catch (err) {
        log('Cleansing error_ES', payload, err.stack);
        return;
    }
    try {
        await createBulkDocument(cleansedData, event, body);
    } catch (err) {
        log('Ingest ES Documents error_ES', cleansedData, err.stack);
        return;
    }
}

async function createBulkDocument(data: any, event: string, body: any) {
    modifyJSONForDelete(data, event);
    try {
        if (update_events.includes(event)) {
            updatePictureEvents(data, event);
            await updateEvents(data, event, body);
            log('Updated_ES', data);
        } else if (lb_events.includes(event)) {
            await toBulk(data, process.env.LBES_INDEX, 'update', body);
            log('Updated_ES Live Block event', data);
        }
    } catch (e) {
        log('error_ES', data, e.message);
    }
}

function modifyJSONForDelete(data: any, event: string) {
    switch (event) {
        case 'rl_vehicle_added':
            data.isRunBlockSearchable = true;
            break;
        case 'rl_vehicle_removed':
            data.isRunBlockSearchable = false;
            break;
        case 'lb_vehicle_added':
            data.isLiveBlockSearchable = true;
            break;
        case 'lb_vehicle_removed':
            data.isLiveBlockSearchable = false;
            break;
        case 'db_auction_started':
            data.isDealerBlockSearchable = true;
            break;
        case 'db_auction_ended':
            data.isDealerBlockSearchable = false;
            break;
        default:
    }
    try {
        if (data.isDealerBlockSearchable === false) {
            data.auctionEndTime = null;
        }
        if (data.isLiveBlockSearchable === false) {
            data.scheduledStartTime = null;
        }
        if (data.isRunBlockSearchable === false) {
            data.rlSaleDate = null;
        }
    } catch (err) {
        console.error(err);
    }
}
async function updateEvents(data: any, event: string, body: any) {
    if (event === 'lb_vehicle_added' || event === 'lb_vehicle_updated') {
        await toBulk(data, process.env.ES_INDEX, 'get_update', body);
    }
    await toBulk(data, process.env.ES_INDEX, 'update', body);
}

function updatePictureEvents(data: any, event: string) {
    if (event === 'vehicle_added_pictures' || event === 'vehicle_update_pictures') {
        data.isPictureActive = true;
    } else {
        if (event === 'vehicle_delete_picture') {
            data.isPictureActive = false;
        }
    }
}

async function toBulk(data: any, index: string, action: string, body: any) {
    if (index === process.env.ES_INDEX) {
        body.push({
            update: {
                '_index': process.env.ES_INDEX,
                '_type': process.env.ES_TYPE,
                '_id': data.nwVehicleId,
                'retry_on_conflict': 25
            }
        });
    } else {
        body.push({
            update: {
                '_index': process.env.LBES_INDEX,
                '_type': process.env.LBES_TYPE,
                '_id': data.nwLiveblockEventId,
                'retry_on_conflict': 25
            }
        });
    }
    switch (action) {
        case 'update':
            body.push({
                'doc': data,
                'doc_as_upsert': true
            });
            break;
        case 'get_update':
            body.push({
                'doc': lbInfoMap.get(data.nwLiveblockEventId) ? lbInfoMap.get(data.nwLiveblockEventId) : {},
                'doc_as_upsert': true
            });
            log('Merged_ES Live Block event Using Cache', lbInfoMap.get(data.nwLiveblockEventId));
            break;
        default:
    }
}

/**
 * Logs an error message to the console using a JSON format needed by Loggly.
 * @param jsonEventName - The unique identifier of the event (i.e 'Updated_ES')
 * @param dataToLog - The JSON object to log (such as the event data)
 * @param errInfo - If exists, any additional error information is added to the JSON
 */
function log(jsonEventName: string, dataToLog: any, errInfo?: string) {

    let logEvent = {
        'eventName': '',
        'additionalInfo': '',
        'data': []
    };

    // initialize json if null data is passed
    if (!dataToLog) {
        dataToLog = {};
    }

    logEvent.eventName = jsonEventName;
    logEvent.data = dataToLog;
    if (errInfo) {
        logEvent.additionalInfo = errInfo;
    }
    if (process.env.INFO_LOG === 'ON') {
        console.log(JSON.stringify(logEvent));
    }
}
