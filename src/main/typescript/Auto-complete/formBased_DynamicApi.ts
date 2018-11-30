import { Callback, Context } from 'aws-lambda';
import { sMakeModel } from '../_mmdata';
import { sLocation, AdesaOffsite, certifiedPartner } from '../_locationdata';


const cars = sMakeModel.split('\n').map((item) => {
    const ary = item.split('\t');
    const obj = { makeName: null, modelName: null, trimName: null, countryCode: null, vehicleType: null };
    if (ary[0]) obj.makeName = ary[0];
    if (ary[1]) obj.modelName = ary[1];
    if (ary[2]) obj.trimName = ary[2];
    if (ary[3]) obj.countryCode = ary[3];
    if (ary[4]) obj.vehicleType = ary[4];
    return obj;
});
const adesaLocations: any = sLocation.split('\n').map((item) => {
    const ary = item.split('\t');
    const obj = { locationCode: null, locationName: null, countryCode: null };
    if (ary[0]) obj.locationCode = ary[0];
    if (ary[1]) obj.locationName = ary[1];
    if (ary[2]) obj.countryCode = ary[2];
    return obj;
});

const ADESA_Offsite: any = AdesaOffsite.split('\n').map((item) => {
    const ary = item.split('\t');
    const obj = { locationName: null, countryCode: null };
    if (ary[0]) obj.locationName = ary[0];
    if (ary[1]) obj.countryCode = (ary[1]).trim();
    return obj;
});
const certified_Partner: any = certifiedPartner.split('\n').map((item) => {
    const ary = item.split('\t');
    const str = ary.join(' ');
    return str;
});

let countryCode: string = '1';

export const formBasedSearch = async (event: any, context: Context, callback: Callback) => {
    if (!event.body) {
        let resp = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
                'Access-Control-Allow-Credentials': 'true' // Required for cookies, authorization headers with HTTPS
            },
            'body': JSON.stringify({ message: 'Invalid request!' }),
            'isBase64Encoded': false
        };
        return callback(null, resp);
    }

    let selection: string;
    let selectionValue: string;
    let vehicleType: any = [];
    let resultSet: any = [];
    let body = JSON.parse(event.body);
    selection = (body.selection) ? body.selection : null;
    selectionValue = (body.value) ? body.value : null;
    if (body.vehicleType && typeof body.vehicleType === 'object') {
        vehicleType = body.vehicleType;
    }
    if (body.countryCode) {
        countryCode = body.countryCode;
    }

    if (selection) {
        if (selection === 'getAllMake') {
            const make = getAllMake(cars, vehicleType);
            resultSet = { make };
        }
    }

    if (selection && selectionValue) {
        if (selection === 'getModel') {
            const model = getModel(cars, selectionValue, vehicleType);
            resultSet = model;
        }
    }
    if (selection && selectionValue) {
        if (selection === 'getTrim') {
            const trim = getTrim(cars, selectionValue, vehicleType);
            resultSet = trim;
        }
    }
    if (selection) {
        if (selection === 'getAdesaLocation') {
            const location = getAdesaLocation(adesaLocations);
            resultSet = { locations: location };
        }
    }
    if (selection) {
        if (selection === 'getAdesaOffsite') {
            const offSite = getAdesaOffsite(ADESA_Offsite);
            resultSet = { offSite: offSite };
        }
    }
    if (selection) {
        if (selection === 'getCertifiedAuctionPartners') {
            const certifiedPatner = getCertifiedAuctionPartners(certified_Partner);
            resultSet = { certifiedPatner: certifiedPatner };
        }
    }
    for (let field in resultSet) {
        resultSet[field].push('Other');
    }

    const response = { data: resultSet };
    let resp = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': 'true' // Required for cookies, authorization headers with HTTPS
        },
        'body': JSON.stringify(response),
        'isBase64Encoded': false
    };
    callback(null, resp);
};
function getAllMake(cars = [], vehicleTypeList) {
    let result = [];
    let vehicleTypeListToLower = vehicleTypeList.map(item => item.toString().toLowerCase());
    cars.forEach((ele) => {
        if (ele.makeName && !result.includes(ele.makeName) && ele.countryCode === countryCode ) {
            let isVechile = true;

            if (vehicleTypeList.length && ele.vehicleType) {
                if (!vehicleTypeListToLower.includes(ele.vehicleType.toString().toLowerCase())) {
                    isVechile = false;
                }
            }

            if (isVechile) {
                result.push(ele.makeName);
            }

        }

    });
    result = result.sort();
    return result;
}
function getModel(cars = [], makeList, vehicleTypeList) {
    const result = {};
    const makeListToLower = makeList.map(item => item.toString().toLowerCase());
    const vehicleTypeToLowerList = vehicleTypeList.map(item => item.toString().toLowerCase());
    for (let ele of cars) {
        const currentMake = ele.makeName ? ele.makeName.toString().toLowerCase() : null;
        let isMake = makeListToLower.includes(currentMake);
        if (!makeListToLower.length) {
            isMake = true;
        }
        if (currentMake && ele.modelName && isMake && ele.countryCode === countryCode) {
            if (!result[ele.makeName]) {
                result[ele.makeName] = [];
            }

            if (result[ele.makeName].includes(ele.modelName)) {
                continue;
            }

            let isModel = true;

            if (vehicleTypeList.length && ele.vehicleType) {
                if (!vehicleTypeToLowerList.includes(ele.vehicleType.toString().toLowerCase())) {
                    isModel = false;
                }
            }

            if (isModel) {
                result[ele.makeName].push(ele.modelName);
            }
        }
    }

    return result;
}

function getTrim(cars = [], makeModelList, vehicleTypeList) {
    const result = {};
    const modelToLowerList = makeModelList.map(makemodel => makemodel.toString().toLowerCase());
    const vehicleTypeToLowerList = vehicleTypeList.map(item => item.toString().toLowerCase());
    for (let ele of cars) {
        const currentMakeModel = (ele.makeName && ele.modelName) ? (ele.makeName + '-' + ele.modelName).toString().toLowerCase() : null;

        let isModel = modelToLowerList.includes(currentMakeModel);

        if (!modelToLowerList.length) {
            isModel = true;
        }

        if (ele.makeName && ele.modelName && isModel && ele.countryCode === countryCode) {
            if (!result[ele.makeName + '    ' + ele.modelName]) {
                result[ele.makeName + '    ' + ele.modelName] = [];
            }
            const trimName = (ele.trimName === '(null)') ? 'Other' : ele.trimName;
            if (result[ele.makeName + '    ' + ele.modelName].includes(ele.trimName)) {
                continue;
            }
            let isTrim = true;

            if (vehicleTypeList.length && ele.vehicleType) {
                if (!vehicleTypeToLowerList.includes(ele.vehicleType.toString().toLowerCase())) {
                    isTrim = false;
                }
            }
            if (isTrim) {
            result[ele.makeName + '    ' + ele.modelName].push(trimName);
            }
        }
    }

    return result;
}
function getAdesaLocation(adesaLocations = []) {
    let result = [];
    adesaLocations.forEach((ele) => {
        if (ele && !result.includes(ele) && ele.countryCode === countryCode) {
            result.push(ele.locationName);
        }
    });
    result = result.sort();
    return result;
}
function getAdesaOffsite(ADESA_Offsite = []) {
    let result = [];
    ADESA_Offsite.forEach((ele) => {
        if (ele && !result.includes(ele) && ele.countryCode === countryCode) {
            result.push(ele.locationName);
        }
    });
    result = result.sort();
    return result;

}
function getCertifiedAuctionPartners(certified_Partner = []) {
    let result = [];
    certified_Partner.forEach((ele) => {
        if (ele && !result.includes(ele)) {
            result.push(ele);
        }
    });
    result = result.sort();

    return result;
}
