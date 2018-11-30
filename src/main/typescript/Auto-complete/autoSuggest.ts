import {Callback, Context} from 'aws-lambda';
import {ca_sellers, us_sellers} from '../_sellers';
import {sMakeModel} from '../_mmdata';
import {sLocation} from '../_locationdata';

// const allSellers: any = sSellers.split('\n').map((item) => {
//     const ary = item.split('\t');
//     const obj = { sellerOrg: null, countryCode: null };
//     if (ary[0]) obj.sellerOrg = ary[0];
//     if (ary[1]) obj.countryCode = ary[1];
//     return obj;
// });

const allLocations: any = sLocation.split('\n').map((item) => {
    const ary = item.split('\t');
    const obj = { locationCode: null, locationName: null, countryCode: null };
    if (ary[0]) obj.locationCode = ary[0];
    if (ary[1]) obj.locationName = ary[1];
    if (ary[2]) obj.countryCode = ary[2];
    return obj;
});
let allLocsWordsLowCase: string[] = [];
for (let locations of allLocations) {
    let locationWords = locations.toString().split(' ');
    locationWords.forEach(function (word) {
        allLocsWordsLowCase.push(word.toLowerCase());
    });
}

const cars = sMakeModel.split('\n').map((item) => {
    const ary = item.split('\t');
    const obj = { makeName: null, modelName: null, trimName: null, countryCode: null };
    if (ary[0]) obj.makeName = ary[0];
    if (ary[1]) obj.modelName = ary[1];
    if (ary[2]) obj.trimName = ary[2];
    if (ary[3]) obj.countryCode = ary[3];
    return obj;
});
let countryCode: string = '1';
const allMakes = getAllMake(cars);
let allMakesWordsLowCase: string[] = [];
for (let make of allMakes) {
    let makeWords = make.split(' ');
    makeWords.forEach(function (word) {
        allMakesWordsLowCase.push(word.toLowerCase());
    });
}

const allModels = getAllModels(cars);
let allModelsWordsLowCase: string[] = [];
for (let model of allModels) {
    let modelWords = model.split(' ');
    modelWords.forEach(function (word) {
        allModelsWordsLowCase.push(word.toLowerCase());
    });
}

const usSellerList = getSellersOfCountry('1');
const caSellerList = getSellersOfCountry('2');
let usSellerListLowCase: string[] = [];
let caSellerListLowCase: string[] = [];

for (let usSeller of usSellerList) {
    usSellerListLowCase.push(usSeller.toString().toLowerCase());
}
for (let caSeller of caSellerList) {
    caSellerListLowCase.push(caSeller.toString().toLowerCase());
}

export const autoSuggest = async (event: any, _context: Context, callback: Callback) => {
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

    let resultSet: any = [];
    let searchItems: any;
    let searchText: any;
    let searchItemTypes;

    try {
        let body = JSON.parse(event.body);

        searchText = (body.searchText) ? String(body.searchText) : null;
        if (body.countryCode) {
            countryCode = body.countryCode;
        }
        searchItems = searchText ? searchText.trim().split(' ') : [];
        if (!isNaN(searchItems[0])) {
            const numStr = Number(searchItems[0]);
            if (numStr >= 1950 && numStr <= 2020) {
                searchItems.splice(0, 1);
            } else if (searchItems[0] && searchItems[0].length == 2) {
                searchItems.splice(0, 1);
            }
        }
        searchItemTypes = getSearchItemTypes(searchItems);
     } catch (err) {
         /* istanbul ignore next */
         console.error(err);
     }

    let searchItemTypesCount = searchItemTypes.length;
    // // checking for userInput whether NULL or NOT
    if (!searchText) {
        resultSet.push({ makes: allMakes });
    }
    // validating the userInput to display the auto suggestions
    if (searchText && searchItemTypes) {
        resultSet = getResult(searchItemTypesCount, searchItems, searchItemTypes);
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

function getAllModelOfMake(make) {
    const result = {};
    if (make.length) {
        const makeToLower = make.map(item => item ? item.toString().toLowerCase() : item);
        let counter = 0;
        for (let ele of cars) {
            /* istanbul ignore next */
            if (counter == 5) { break; }
            if (ele.countryCode !== countryCode) { continue; }
            let currentMakeWords = ele.makeName ? ele.makeName.split(' ') : [];
            currentMakeWords = currentMakeWords.map(item => item.toString().toLowerCase());
            let isMake = makeToLower.filter(item => currentMakeWords.includes(item));
            if (ele.makeName && ele.modelName && isMake.length) {
                if (!result.hasOwnProperty(ele.makeName)) {
                    result[ele.makeName] = [];
                }
                if (!result[ele.makeName].includes(ele.modelName)) {
                    result[ele.makeName].push(ele.modelName);
                    counter++;
                }
            }
        }
    }
    return result;
}

function getModelWordsNotOfMakeWords(recordModelList, serachModelList) {
    const serachModelListToLower = serachModelList.map(item => item.toLowerCase());
    let pickedModelList = [];
    for (let make in recordModelList) {
        pickedModelList = pickedModelList.concat(recordModelList[make]);
    }
    const pickedModelListToLower = pickedModelList.map(item => item.toLowerCase());
    let pickedModelsWordList = [];
    pickedModelListToLower.forEach(item => {
        pickedModelsWordList = pickedModelsWordList.concat(item.split(' '));
    });
    const notRecordedModelList = serachModelListToLower.filter(item => !pickedModelsWordList.includes(item.toLowerCase()));
    return notRecordedModelList;
}

/* istanbul ignore next */
function getMakeModelOfModel(modelList) {
    let result = {};
    let counter = 0;
    for (let ele of cars) {
        /* istanbul ignore next */
        if (counter == 5) { break; }
        if (ele.makeName && ele.modelName && ele.countryCode === countryCode) {
            const modelWords = ele.modelName.toString().toLowerCase().split(' ');
            let isModel = modelList.filter(item => modelWords.includes(item.toLowerCase()));
            if (isModel.length) {
                if (!result.hasOwnProperty(ele.makeName)) {
                    result[ele.makeName] = [];
                }
                if (!result[ele.makeName].includes(ele.modelName)) {
                    result[ele.makeName].push(ele.modelName);
                    counter++;
                }
            }
        }
    }
    return result;
}
// TODO add testcases for previous function.

function getMakeEqualModelRecords(makes, models) {
    const makeModels = getAllModelOfMake(makes);
    const modelNotInRecords = getModelWordsNotOfMakeWords(makeModels, models);
    if (modelNotInRecords.length) {
        const missingModelsMakeModels = getMakeModelOfModel(modelNotInRecords);
        for (let make in missingModelsMakeModels) {
            if (makeModels.hasOwnProperty(make)) {
                makeModels[make] = makeModels[make].concat(missingModelsMakeModels[make]);
            } else {
                makeModels[make] = missingModelsMakeModels[make];
            }
        }
    }
    return makeModels;
}

/* istanbul ignore next */
function getModelsOfMakes(makelList, modelList) {
    let result = {};
    let counter = 0;
    for (let ele of cars) {
        /* istanbul ignore next */
        if (counter == 5) {
            break;
        }
        if (ele.makeName && ele.modelName && ele.countryCode === countryCode) {
            const makeWords = ele.makeName.toString().toLowerCase().split(' ');
            const foundMakes = makelList.filter(item => makeWords.includes(item.toLowerCase()));
            const foundModels = ele.modelName.toLowerCase().indexOf(modelList.join(' ').toLowerCase());
            const isMake = foundMakes.length === makelList.length;
            const isModel = foundModels !== -1;
            if (isMake && isModel) {
                if (!result.hasOwnProperty(ele.makeName)) {
                    result[ele.makeName] = [];
                }
                if (!result[ele.makeName].includes(ele.modelName)) {
                    result[ele.makeName].push(ele.modelName);
                    counter++;
                }
            }
        }
    }
    return result;
}

function getMakesForMakesAndTexts(makeList, textList) {
    const result = {};
    const testMakeWord = makeList.join(' ').toString().toLowerCase() + ' ' + textList.join(' ').toString().toLowerCase();
    let counter = 0;
    for (let ele of cars) {
        /* istanbul ignore next */
        if (counter == 5) { break; }
        if (ele.makeName && ele.modelName && ele.countryCode === countryCode) {
            const makelTolower = ele.makeName.toString().toLowerCase();
            const isMake = makelTolower.startsWith(testMakeWord);
            if (isMake) {
                if (!result.hasOwnProperty(ele.makeName)) {
                    result[ele.makeName] = [];
                }
                if (!result[ele.makeName].includes(ele.modelName)) {
                    result[ele.makeName].push(ele.modelName);
                    counter++;
                }
            }
        }
    }
    return result;
}

function getModelsForMakesAndTexts(makeList, textList) {
    const result = {};
    let counter = 0;
    for (let ele of cars) {
        /* istanbul ignore next */
        if (counter == 5) { break; }
        if (ele.makeName && ele.modelName && ele.countryCode === countryCode) {
            const makeWords = ele.makeName.toString().toLowerCase().split(' ');
            const foundMakes = makeList.filter(item => makeWords.includes(item.toLowerCase()));
            const isMake = foundMakes.length === makeList.length;
            if (isMake) {
                const modelWords = ele.modelName.toString().toLowerCase().split(' ');
                const foundModels = textList.filter(item => modelWords[0].startsWith(item.toLowerCase()));
                const isModel = foundModels.length > 0;
                if (isModel) {
                    if (!result.hasOwnProperty(ele.makeName)) {
                        result[ele.makeName] = [];
                    }
                    if (!result[ele.makeName].includes(ele.modelName)) {
                        result[ele.makeName].push(ele.modelName);
                        counter++;
                    }
                }
            }
        }
    }
    return result;
}

/* istanbul ignore next */
function getModelsForModelsAndTexts(modelList, textList) {
    const result = {};
    let counter = 0;
    for (let ele of cars) {
        /* istanbul ignore next */
        if (counter == 5) { break; }
        if (ele.makeName && ele.modelName && ele.countryCode === countryCode) {
            const modelTolower = ele.modelName.toString().toLowerCase();
            const modelPartsWord = modelList.join(' ').toLowerCase();
            const modelPartsWordWithTextList = textList.map(item => modelPartsWord + ' ' + item.toLowerCase());

            const foundModels = modelPartsWordWithTextList.filter(item => modelTolower.startsWith(item));
            const isModel = foundModels.length > 0;
            if (isModel) {
                if (!result.hasOwnProperty(ele.makeName)) {
                    result[ele.makeName] = [];
                }
                if (!result[ele.makeName].includes(ele.modelName)) {
                    result[ele.makeName].push(ele.modelName);
                    counter++;
                }
            }
        }
    }
    return result;
}
function getResult(searchItemTypesCount, searchItems, searchItemTypes) {

    // console.log('searchItemTypes', searchItemTypes);

    let resultSet = {
        make: [],
        model: [],
        seller: [],
        location: []
    };

    if (searchItemTypes.make && searchItemTypes.model && searchItemTypes.text) {
        const modelNotInMake = searchItemTypes.model.filter(model => searchItemTypes.make.indexOf(model) === -1);
        const isMakeEqualModel = modelNotInMake.length === 0;
        let result: any;

        if (isMakeEqualModel) {
            result = getMakeEqualModelRecords(searchItemTypes.make, searchItemTypes.model);
        } else {
            result = getModelsOfMakes(searchItemTypes.make, searchItemTypes.model);
        }


        for (let make in result) {
            resultSet.make.push(make);
            result[make].forEach(model => {
                const modelWords = model.toString().toLowerCase().split(' ');
                const serchModelsToLower = searchItemTypes.model.map(item => item.toLowerCase());
                const wordsNotInSearchModels = modelWords.filter(item => !serchModelsToLower.includes(item));
                const text = searchItemTypes.text.join(' ').toLowerCase();
                const hasOtherWords = wordsNotInSearchModels.length ? wordsNotInSearchModels[0].startsWith(text) : false;
                if (hasOtherWords) {
                    resultSet.model.push(make + ' ' + model);
                }
            });
        }

    } else if (searchItemTypes.make && searchItemTypes.model) {
        const modelNotInMake = searchItemTypes.model.filter(model => searchItemTypes.make.indexOf(model) === -1);
        const isMakeEqualModel = modelNotInMake.length === 0;
        let result: any;
        if (isMakeEqualModel) {
            result = getMakeEqualModelRecords(searchItemTypes.make, searchItemTypes.model);
        } else {
            result = getModelsOfMakes(searchItemTypes.make, searchItemTypes.model);
        }
        for (let make in result) {
            result[make].forEach(model => {
                resultSet.model.push(make + ' ' + model);
            });
        }
    } else if (searchItemTypes.make && searchItemTypes.text) { // TODO add testcase for this.
        /* istanbul ignore next */
        const makesResult = getMakesForMakesAndTexts(searchItemTypes.make, searchItemTypes.text);
        let modelResult: any;
        if (Object.getOwnPropertyNames(makesResult).length === 0) {
            modelResult = getModelsForMakesAndTexts(searchItemTypes.make, searchItemTypes.text);
        }
        const result = modelResult || makesResult;
        for (let make in result) {
            result[make].forEach(model => {
                if (!modelResult && !resultSet.make.includes(make)) {
                    resultSet.make.push(make);
                }
                resultSet.model.push(make + ' ' + model);
            });
        }
    } else if (searchItemTypes.model && searchItemTypes.text) {
        let result = getModelsForModelsAndTexts(searchItemTypes.model, searchItemTypes.text);
        for (let make in result) {
            result[make].forEach(model => {
                resultSet.model.push(make + ' ' + model);
            });
        }
    } else if (searchItemTypes.model) {
        let result = getModelsWithModelWords(searchItemTypes.model);
        for (let make in result) {
            result[make].forEach(model => {
                resultSet.model.push(make + ' ' + model);
            });
        }
    } else if (searchItemTypes.make) {
        let result = getModelsWithMakeWords(searchItemTypes.make);
        for (let make in result) {
            result[make].forEach(model => {
                resultSet.model.push(make + ' ' + model);
            });
        }
    } else if (searchItemTypes.text) {
        const text = searchItemTypes['text'][0];
        const makes = getMake(text);
        resultSet.make = resultSet.make.concat(makes);
        if (makes.length === 1) {
            const result = getModelsWithMakeWords(makes);
            for (let make in result) {
                result[make].forEach(model => {
                    resultSet.model.push(make + ' ' + model);
                });
            }
        } else {
            const models = getModel(text);
            resultSet.model = resultSet.model.concat(models);
        }
        let sellers = (searchItemTypes.seller && searchItemTypes.seller.length) ? searchItemTypes.seller : getCategorySentences(searchItemTypes.text);
        resultSet.seller = resultSet.seller.concat(sellers);
        let location = getAdesaLocation(searchItemTypes.text);
        resultSet.location = resultSet.location.concat(location);
    }

    if (searchItemTypes.seller) {
        resultSet.seller = searchItemTypes.seller;
    }

    if (searchItemTypes.location && (!resultSet.location || !resultSet.location.length)) {
        let location = getAdesaLocation(searchItemTypes.location);
        if (searchItemTypes.text && location.length) {
            const locationWordsToLower = searchItemTypes.location.map(item => item.toString().toLowerCase());
            const textWordsToLower = searchItemTypes.text.map(item => item.toString().toLowerCase());
            const textList = textWordsToLower.filter(item => locationWordsToLower .indexOf(item) === -1);
            if (textList.length) {
                const locationSearchList = locationWordsToLower .concat([textList[0]]);
                const locationWithText = getAdesaLocation(locationSearchList);
                if (locationWithText.length) {
                    location = locationWithText;
                }
            }
        }
        resultSet.location = resultSet.location.concat(location);
    }

    return resultSet;
}
function getSellersOfCountry(pCountryCode: string) {
    let result = [];
    if (pCountryCode === '1') {
        result = us_sellers;
    } else {
        result = ca_sellers;
    }

    return result;
}

function getCategorySentences(searchItems: string[]) {
    let counter = 0;
    let sellers: string[] = [];
    let sellersLowCase: string[] = [];
    if (countryCode === '1') {sellers = usSellerList; sellersLowCase = usSellerListLowCase; } else { sellers = caSellerList; sellersLowCase = caSellerListLowCase; }
    const filteredSentences = [];
    let searchItemsLowCase = searchItems.join(' ').toLowerCase();
    for (let i = sellersLowCase.length - 1; i >= 0; i--) {
        /* istanbul ignore next */
        if (counter == 5) { break; }
        if (!filteredSentences.includes(sellers[i])) {
            if (sellersLowCase[i].startsWith(searchItemsLowCase)) {
                filteredSentences.push(sellers[i]);
                counter++;
            }
        }
    }
    return filteredSentences;
}

function getAdesaLocation(locationWordList) {
    // End result declared with empty array
    let result = [];
    let counter = 0;
    const locationText = locationWordList.join(' ').toString().toLowerCase();
    for (let Adesalocation of allLocations) {
        const locationName = Adesalocation.locationCode + ' ' + Adesalocation.locationName;
        if (!Adesalocation.locationCode || Adesalocation.countryCode !== countryCode || result.includes(locationName)) {
            continue;
        }
        /* istanbul ignore next */
        if (counter == 5) {break; }
        let isLocation = false;
        if (locationText.length > 1) {
            isLocation = locationName.toString().toLowerCase().indexOf(locationText) !== -1;
        } else {
            /* istanbul ignore next */
            isLocation = Adesalocation.locationCode.toString().toLowerCase().startsWith(locationText) ||  Adesalocation.locationName.toString().toLowerCase().startsWith(locationText);
        }
        if (isLocation) {
            result.push(locationName);
            counter++;
        }
    }
    result = result.sort(ignoreCase);
    return result;
}
function getAllMake(cars = []) {
    let result = [];
    for (let i = cars.length - 1; i >= 0; i--) {
        let ele = cars[i];
        if (ele.makeName && !result.includes(ele.makeName)) {
            result.push(ele.makeName);
        }
    }
    result = result.sort(ignoreCase);
    return result;
}

function getAllModels(cars = []) {
    let result = [];
    cars.forEach((ele, i) => {
        if (ele.modelName && !result.includes(ele.modelName)) {
            result.push(ele.modelName);
        }
    });
    result = result.sort(ignoreCase);

    return result;
}

function getCategoryWords(searchItems: string[], dataSet) {
    const filteredWords = [];
    for (let item of searchItems) {
        let lowerCaseItem = item.toLowerCase();
        if (!filteredWords.includes(item)) {
                if (dataSet.includes(lowerCaseItem)) {
                    filteredWords.push(item);
            }
        }
    }
    return filteredWords;
}

function getModel(text) {
    let result = [];
    for (let ele of cars) {
        /* istanbul ignore next */
        if (result.length == 5) { break; }
        if (ele.makeName && ele.modelName && ele.countryCode === countryCode) {
            const modelWords = ele.modelName.toString().toLowerCase();
            const hasModelName = modelWords.startsWith(text.toString().toLowerCase());
            if (hasModelName && !result.includes(ele.makeName + ' ' + ele.modelName)) {
                result.push(ele.makeName + ' ' + ele.modelName);
            }
        }
    }
    result = result.sort(ignoreCase);
    return result;
}

function getMake(text) {
    let result = [];
    for (let ele of cars) {
        /* istanbul ignore next */
        if (result.length == 5) { break; }
        if (ele.makeName && !result.includes(ele.makeName) && ele.countryCode === countryCode) {
            const words = ele.makeName.toString().toLowerCase().split(' ');
            const hasMakeName = words.filter(word => word.startsWith(text.toLowerCase()));
            if (hasMakeName.length && !result.includes(ele.makeName)) {
                result.push(ele.makeName);
            }
        }
    }
    result = result.sort(ignoreCase);
    return result;
}

function getModelsWithMakeWords(makeList) {
    const result = {};
    let counter = 0;
    const makeTestWord = makeList.join(' ').toLowerCase();
    // TODO alfa romeo - fails. Enter Alfa Rom - Need to create a defect.
    for (let ele of cars) {
        /* istanbul ignore next */
        if (counter == 5) { break; }

        if (ele.makeName && ele.modelName && ele.countryCode === countryCode) {
            const makelTolower = ele.makeName.toLowerCase();
            const isMake = makelTolower.startsWith(makeTestWord);
            if (isMake) {
                /* istanbul ignore next */
                if (!result.hasOwnProperty(ele.makeName)) {
                    result[ele.makeName] = [];
                }
                if (!result[ele.makeName].includes(ele.modelName)) {
                    result[ele.makeName].push(ele.modelName);
                    counter++;
                }
            }

        }
    }
    return result;
}

function getModelsWithModelWords(modelList) {
    const result = {};
    let counter = 0;
    const modelTestWord = modelList.join(' ').toLowerCase();
    for (let ele of cars) {
        /* istanbul ignore next */
        if (counter == 5) { break; }
        if (ele.makeName && ele.modelName && ele.countryCode === countryCode) {
            const modelTolower = ele.modelName.toLowerCase();
            const isModel = modelTolower.startsWith(modelTestWord);
            if (isModel) {
                if (!result.hasOwnProperty(ele.makeName)) {
                    result[ele.makeName] = [];
                }
                if (!result[ele.makeName].includes(ele.modelName)) {
                    result[ele.makeName].push(ele.modelName);
                    counter++;
                }
            }
        }
    }
    return result;
}

function getSearchItemTypes(searchItems) {
    const searchItemTypes: any = {};

    const makeWords = getCategoryWords(searchItems, allMakesWordsLowCase);
    let modelWords = getCategoryWords(searchItems, allModelsWordsLowCase);

    if ((modelWords.length !== makeWords.length)) {
        modelWords = modelWords.filter((item) => {
            return (makeWords.indexOf(item) === -1);
        });
    }

    if (!makeWords.length && modelWords.length) {
        const modelTestWord = modelWords[0];
        const testRecords = getModelsWithModelWords([modelTestWord]);
        let testModels = [];
        for (let make in testRecords) {
            testModels = testModels.concat(testRecords[make]);
        }
        let testWords = [];
        testModels.forEach(item => {
            const currentModelWords = item.toString().toLowerCase().split(' ');
            testWords = testWords.concat(currentModelWords);
        });
        modelWords = modelWords.filter((item) => {
            return (testWords.indexOf(item.toString().toLowerCase()) !== -1);
        });
    }

    if (modelWords.length && makeWords.length) {

        const makeModelList = getAllModelOfMake(makeWords);
        let pickedModelList = [];
        for (let make in makeModelList) {
            pickedModelList = pickedModelList.concat(makeModelList[make]);
        }

        const pickedModelListToLower = pickedModelList.map(item => item.toLowerCase());
        let pickedModelsWordList = [];
        pickedModelListToLower.forEach(item => {
            pickedModelsWordList = pickedModelsWordList.concat(item.split(' '));
        });
        const notModelWords = modelWords.filter(item => !pickedModelsWordList.includes(item.toLowerCase()));
        modelWords = modelWords.filter((item) => {
            return (notModelWords.indexOf(item.toString().toLowerCase()) === -1);
        });
    }
     let sellersSentences = getCategorySentences(searchItems);
    // let locationsWords = getCategoryWords(searchItems, allLocsWordsLowCase); // Refer below for comments

    // console.log('sellersWords', sellersWords);

    const otherWords = searchItems.filter((item) => {
        return ((makeWords.indexOf(item) === -1) && (modelWords.indexOf(item) === -1));
    });

    if (makeWords.length) {
        searchItemTypes.make = makeWords;
    }
    if (modelWords.length) {
        searchItemTypes.model = modelWords;
    }

    if (sellersSentences.length) {
        searchItemTypes.seller = sellersSentences;
    }
    /* Not required anymore because the program has been changed to include the
    location directly at the getResult() before constructing response object.
    This change is made to gain a little performance improvement.
        if (locationsWords.length) {
            searchItemTypes.location = locationsWords;
        }
    */

    if (otherWords.length) {
        searchItemTypes.text = otherWords;
    }
    return searchItemTypes;
}

function ignoreCase(a, b) {
    return ('' + a).toUpperCase() < ('' + b).toUpperCase() ? -1 : 1;
}
