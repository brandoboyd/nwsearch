// 	Module:				search-elastic-search-index.ts
// 	Description:		construct search queries to be sent to ElasticSearch
// 	Also-see:
// 	Tab-stops:			4
// 	Author:				Katherine
// 	Language:			js
// 	Creation Date:		07/18/2018
// 	Revisions:
//

import {VinSearchQueryBuilder} from './builder/VinSearchQueryBuilder';
import {VehicleSearchQueryBuilder} from './builder/VehicleSearchQueryBuilder';

const AWS = require('aws-sdk');
AWS.config.region = process.env.REGION;
let credentials = new AWS.EnvironmentCredentials('AWS');

let searchQueryBuilder: any;
// Client to connect to elastic search
let client = require('elasticsearch').Client({
    hosts: [process.env.ES_URL],
    connectionClass: require('http-aws-es'),
    amazonES: {
        region: process.env.REGION,
        credentials: credentials
    }
});
let accessgroups = '';
let userId = '';
export const searchIndex = async (event: any, context: any, callback: any) => {

    const queryString = event.queryStringParameters;
    const requestContext = event.requestContext;

    let result = {};
    if (requestContext) {
        result = JSON.parse(requestContext.authorizer.principal);
        accessgroups = result['claims']['viewAccessGroups'].toString();
        userId = result['userId'].toString();
    }

    let start = 0;
    let sz = 10;
    let filter = '';

    if (queryString && queryString.vin) {
        searchQueryBuilder = new VinSearchQueryBuilder();
        searchQueryBuilder
            .addVin(queryString.vin)
            .withCountryName(queryString.country)
            .withAccessGroups(accessgroups)
            .withLiveBlock()
            .withVehiclesNotSold();
    } else if (queryString && queryString.make && queryString.make.indexOf(',') !== -1) {
        // the VehicleSearchQueryBuilder needs to be instantiated outside of any for loops
        // because the query needs to be built upon itself for each loop iteration.
        searchQueryBuilder = new VehicleSearchQueryBuilder();
        let multiMake: string[] = [];
        let multiModel: string[] = [];
        let model: string = '';
        let currentMakeIndex: number = 0;
        multiMake = queryString.make.split(',');
        multiMake.forEach(function (make: string) {
            currentMakeIndex = multiMake.indexOf(make);
            if (queryString.model) {
                multiModel = queryString.model.split('|');
                model = multiModel[currentMakeIndex];
            }
            searchQueryBuilder = constructSearchQuery(make, model, queryString);
        });

    } else if (queryString) {
        // the VehicleSearchQueryBuilder needs to be instantiated outside of any for loops
        // because the query needs to be built upon itself for each loop iteration.
        searchQueryBuilder = new VehicleSearchQueryBuilder();
        searchQueryBuilder = constructSearchQuery(queryString.make, queryString.model, queryString);
    } else {
        // no query params were sent down so we need to construct a default query that only has liveBlock
        searchQueryBuilder = new VehicleSearchQueryBuilder();
        searchQueryBuilder
            .withAccessGroups(accessgroups)
            .withLiveBlock()
            .withVehiclesNotSold();
    }

    if (queryString && queryString.ct) {
        filter = searchQueryBuilder.build();
    } else if (queryString) {
        filter = searchQueryBuilder.sort(queryString.sort, queryString.order).build();
    } else {
        filter = searchQueryBuilder.sort().build();
    }

    if (queryString && queryString.from) {
        start = queryString.from;
    }

    if (queryString && queryString.size) {
        sz = queryString.size;
    }

    console.log(filter);

    let vehiclesList: any;
    let totalVehicles: number;
    // Get only count of the records
    if (queryString && queryString.ct && filter) {
        let [customizedError, response] = await to(client.count({index: process.env.ES_INDEX, type: process.env.ES_TYPE, body: filter}), context.awsRequestId);
        if (customizedError)
            return callback(customizedError);
        else {
            vehiclesList = response.count;
        }
    } else if (filter) {
        // Get the actual vehicle results for the query
        let [customizedError, response] = await to(client.search({index: process.env.ES_INDEX, type: process.env.ES_TYPE, size: sz, from: start, body: filter, preference: userId }),
            context.awsRequestId);
        if (customizedError)
            return callback(customizedError);
        else {
            vehiclesList = new Array();
            if (response.hits) {
                totalVehicles = response.hits.total;
                response.hits.hits.forEach(function (hit: any) {
                    let vehicles = hit._source;
                    vehiclesList.push(vehicles);
                });
            }
        }
    }
    let resp = buildResponse(vehiclesList, totalVehicles);
    callback(null, resp);
};

function buildResponse(vehiclesList, totalVehicles) {
    class Result {
        userViewAccessGroups: string;
        totalVehicles: number;
        vehicles: object;

        constructor(vehicles: object, vehicleCount: number) {
            this.userViewAccessGroups = accessgroups;
            this.totalVehicles = vehicleCount;
            this.vehicles = vehicles;
        }
    }

    let result = new Result(vehiclesList, totalVehicles);
    let resp;
    if (result !== undefined) {
        resp = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
                'Access-Control-Allow-Credentials': 'true' // Required for cookies, authorization headers with HTTPS
            },
            'body': JSON.stringify(result),
            'isBase64Encoded': false
        };
        return resp;
    } else {
        resp = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
                'Access-Control-Allow-Credentials': 'true' // Required for cookies, authorization headers with HTTPS
            },
            'body': JSON.stringify(result),
            'isBase64Encoded': false
        };
    }
    return resp;
}

// https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
function to(promise, requestId: string) {
    return promise.then(data => {
        return [null, data];
    })
        .catch(err => [JSON.stringify({errorType: 'InternalServerError', httpStatus: 500, requestId: requestId, message: JSON.stringify(err)})]);
}

function constructSearchQuery(make: string, model: string, queryString) {

    searchQueryBuilder.addMake(make)
        .withModel(model)
        .withExteriorColor(queryString.exteriorColor || queryString.exteriorColour)
        .withYear(queryString.year)
        .withOdometer(queryString.odometer)
        .withState(queryString.state)
        .withDriveTrain(queryString.driveTrain)
        .withTransmission(queryString.transmission)
        .withEngine(queryString.engine)
        .withOriginalEngine(queryString.originalEngine)
        .withCountryName(queryString.country)
        .withTrim(queryString.trim)
        .withAuctionLocation(queryString.auctionLocation, queryString.offsiteState)
        .withGrade(queryString.grade)
        .withBodyType(queryString.vehicleType)
        .withSellerOrganization(queryString.seller)
        .withAccessGroups(accessgroups)
        .withMMF(queryString.mmf, queryString.mmv)
        .withLiveBlock(queryString.auctionChannel)
        .withVehiclesNotSold();
    return searchQueryBuilder;
}



