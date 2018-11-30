import {Callback, Context} from 'aws-lambda';
import {_fieldValidator} from '../_field';

export const searchWordsCorrection = async (event: any, context: Context, callback: Callback) => {
    let UserInput;
    try {
        let searchText: any;
    if (event.body !== null && event.body !== undefined) {
        let body: any;
        body = JSON.parse(event.body);
        searchText = (body.searchText) ? body.searchText : null;
    }
    console.log('searchText', searchText);
    let fieldValidator = new _fieldValidator();

    if (searchText) {
        UserInput = (fieldValidator.interpretSentenceAsObj(searchText));
    }
    } catch (err) {
        console.error(err);
    }
    const response = { searchText: UserInput };
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



