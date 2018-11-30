
export const cleanseMaps = [
    {
        fieldName: 'year',
        customCleanseMethods: 'digit4ForYear',
        fieldType: 'numeric'
    },
    {
        fieldName: 'make',
        applySynonyms: 'oMakeSynonyms',
        stdCleanseMethods: 'levenshteinArray'
    } ,
    {
        fieldName: 'model',
        applySynonyms: 'oModel',
        stdCleanseMethods: 'levenshteinArray',
        searchWithIn: ['make']
    },
    {
        fieldName: 'trim',
        customCleanseMethods: 'MapTrim',
        searchWithIn: ['make', 'model']
    },
    {
        fieldName: 'exteriorColor',
        applySynonyms: ['oColor'],
        applyRegEx : 'reColor',
        stdCleanseMethods: 'levenshteinArray'
    },
    {
        fieldName: 'interiorColor',
        applySynonyms: ['oColor'],
        applyRegEx : 'reColor',
        stdCleanseMethods: 'levenshteinArray'
    },
    {
        fieldName       : 'odometer',
        replaceChars    : [ {'k': '000'}, {'K': '000'}, {',': ''} ],
        fieldType: 'numeric'
    },
    {
        fieldName: 'driveTrain',
        replaceChars    : [{'drive train - ': ''}],
        applyRegEx : 'reDriveTrain',
        applySynonyms: 'oDriveTrain'
    },
    {
        fieldName: 'processingLocation',
        applySynonyms: ['oAdesaLocation'],
        stdCleanseMethods: 'levenshteinArray'
    },
    {
        fieldName: 'engineName',
        caseSensitive: false,
        customCleanseMethods: 'MapEngine'
    },
    {
        fieldName: 'transmission',
        replaceChars    : [{'Transmission': ''}],
        applyRegEx : 'reTransmission',
        applySynonyms: 'oTransmission'
    },
];

export const defaultValueMaps = {
    make: 'other',
    model: 'other',
    trim: 'other',
    exteriorColor: 'other',
    interiorColor: 'other',
    driveTrain: 'other',
    transmission: 'other',
    engineName: 'other',
    bodyType: 'other'
};
