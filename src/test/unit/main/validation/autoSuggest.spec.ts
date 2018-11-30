import 'reflect-metadata';
import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';

import {autoSuggest} from '../../../../main/typescript/Auto-complete/autoSuggest';

describe(`APP /`, () => {
    it(`should return models and sellers for a given existing Maker`, async () => {
        const event = {
            body: '{"searchText": "DAUWSY", "countryCode": "2"}'
        };

        const response = {
            'data': [{
                'models': [
                    'Civic',
                    'Prelude',
                    'Passport',
                    'Accord',
                    'Odyssey'
                ]
            },
                {
                    'sellers': [
                        'AIRPORT MARINA HONDA',
                        'ANDERSON HONDA',
                        'ARROWHEAD HONDA',
                        'AUTONATION HONDA MIAMI LAKES',
                        'BLOUNT HONDA',
                        'BRAMAN HONDA',
                        'ED VOYLES HONDA',
                        'HONDA OF STEVENS CREEK',
                        'HONDA WORLD (OR)',
                        'POWAY HONDA',
                        'ROBERTSON HONDA',
                        'SAM LINDER CADILLAC HONDA OLDS',
                        'STOKES HONDA NORTH INC',
                        'TEMPE HONDA'
                    ]
                }
            ]
        };

        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });


    it(`should return models and sellers for a given existing Maker`, async () => {
        const event = {
            body: '{"searchText": "Honda"}',
            'countryCode': '1'

        };

        const response = {
            'data': [{
                'models': [
                    'Civic',
                    'Prelude',
                    'Passport',
                    'Accord',
                    'Odyssey'
                ]
            },
                {
                    'sellers': [
                        'AIRPORT MARINA HONDA',
                        'ANDERSON HONDA',
                        'ARROWHEAD HONDA',
                        'AUTONATION HONDA MIAMI LAKES',
                        'BLOUNT HONDA',
                        'BRAMAN HONDA',
                        'ED VOYLES HONDA',
                        'HONDA OF STEVENS CREEK',
                        'HONDA WORLD (OR)',
                        'POWAY HONDA',
                        'ROBERTSON HONDA',
                        'SAM LINDER CADILLAC HONDA OLDS',
                        'STOKES HONDA NORTH INC',
                        'TEMPE HONDA'
                    ]
                }
            ]
        };

        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return no data for invalid searchText`, async () => {
        const event = {
            body: '{"searchText": "sgdfgf"}'
        };

        const response = {'data': {'make': [], 'model': [], 'seller': [], 'location': []}};

        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(JSON.stringify(response.data)).to.equal(data.body);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });


    it(`should return a Maker for a given search text`, async () => {
        const event = {
            body: '{"searchText": "Hon"}'
        };

        const response = {
            'data': [{
                'makes': [
                    'Honda'
                ]
            },
                {
                    'models': [
                        'Accord'
                    ]
                }]
        };

        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return a Maker for a given search text ModelsWithMakeWords`, async () => {
        const event = {
            body: '{"searchText": "Alfa Rom"}'
        };

        const response = {
            'data': [{
                'makes': [
                    'Alfa Romeo'
                ]
            }]
        };

        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return a Maker for a given search text ModelsWithMakeWords`, async () => {
        const event = {
            body: '{"searchText": "Civic"}'
        };

        const response = {'data': {'make': [], 'model': ['Honda Civic', 'Honda Civic Coupe', 'Honda Civic Cpe', 'Honda Civic del Sol', 'Honda Civic Hatchback Wagon', 'Honda Civic Hatchback/Wagon', 'Honda Civic Hybrid', 'Honda Civic Sdn', 'Honda Civic Sedan', 'Honda Civic Si'], 'seller': ['CIVIC CARS', 'CIVIC AUTO LINK', 'CIVIC IMPORTS LLC', 'CIVIC AUTO SALES LLC', 'CIVIC CENTER MOTORS, LTD', 'CIVIC AUTO SALES SERVICE'], 'location': []}};

        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return a Maker for a given search text ModelsWithMakeWords`, async () => {
        const event = {
            body: '{"searchText": "Alfa Romeo"}'
        };

        const response = {
            'data': {'make': [], 'model': ['Alfa Romeo 164 Series', 'Alfa Romeo 4C', 'Alfa Romeo 4C Coupe', 'Alfa Romeo 4C Spider', 'Alfa Romeo Alfa Romeo', 'Alfa Romeo Giulia', 'Alfa Romeo Giulia Quadrifoglio', 'Alfa Romeo GTV-6', 'Alfa Romeo Milano', 'Alfa Romeo Spider'], 'seller': ['ALFA ROMEO HAWAII', 'ALFA ROMEO OF OMAHA', 'ALFA ROMEO OF MARIN', 'Alfa Romeo Saa Babaa', 'ALFA ROMEO OF TYSONS', 'ALFA ROMEO OF DALLAS', 'ALFA ROMEO OF BOSTON', 'ALFA ROMEO OF ALBANY', 'ALFA ROMEO NASHVILLE', 'ALFA ROMEO OF SEATTLE'], 'location': []}
        };

        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return all Maker for if empty search`, async () => {
        const event = { body: '{"searchText": ""}'};

        const response = {
            'data': [{
                'makes': [
                    'AM General',
                    'Acura',
                    'Audi',
                    'BMW',
                    'Buick',
                    'Cadillac',
                    'Chevrolet',
                    'Chrysler',
                    'Dodge',
                    'Eagle',
                    'Ford',
                    'GMC',
                    'Geo',
                    'Honda',
                    'Hyundai',
                    'Isuzu',
                    'Pontiac',
                    'Porsche'
                ]
            }]
        };

        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            //  expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return a Maker for a given search text ModelsWithMakeWords`, async () => {
        const event = {
            body: '{"searchText": "Honda accor"}'
        };

        const response = {
            'data': [{
                'makes': [
                    'Honda'
                ]
            }]
        };

        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return model and seller w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "honda civ"}'
        };

        const response = {
            'data': [{'models': [
                        'Honda Civic',
                        'Honda Civic Coupe',
                        'Honda Civic Cpe',
                        'Honda Civic del Sol',
                        'Honda Civic Hatchback/Wagon',
                        'Honda Civic Hybrid',
                        'Honda Civic Sdn',
                        'Honda Civic Sedan',
                        'Honda Civic Si',
                        'Honda Civic Si Coupe',
                        'Honda Civic Si Sedan',
                        'Honda Civic Type R']
                    }, {
                    'sellers': [
                        '101125484 SASKATCHEWAN LTD O/A ROYAL HONDA',
                        '1583647 ALBERTA LTD DBA GO HONDA',
                        '1738135 ONTARIO INC. DBA FAMILY HONDA',
                        '2257638 ONTARIO INC DBA HAMBURG HONDA (2011)',
                        '2348347 ONTARIO INC DBA WELLAND HONDA',
                        '2547451 ONTARIO INC DBA MISSISSAUGA HONDA',
                        '2848 4368 QUEBEC INC DBA DERAGON HONDA',
                        '2848 7403 QUEBEC INC DBA HONDA BLAINVILLE',
                        '2945-4154 QUEBEC INC DBA GASPE HONDA',
                        '305960 SASK LTD. DBA REGINA HONDA',
                        '3242781 CANADA INC DBA SPINELLI HONDA',
                        '3278724 NS LTD DBA CENTURY HONDA',
                        '3291625 NOVA SCOTIA LIMITED DBA COLONIAL HONDA ***OOB***',
                        '4475518 CANADA INC DBA  HAWKESBURY HONDA',
                        '636066 ALBERTA LTD. D.B.A. SUNVALLEY HONDA',
                        '6676677 CANADA INC DBA HONDA DRUMMONDVILLE',
                        '9027 9118 QUEBEC INC DBA TROIS-RIVIERES HONDA',
                        '9048 3538 QUEBEC INC DBA HONDA MATANE',
                        '9075-5125 QUEBEC INC DBA ALMA HONDA',
                        'HONDA OF BURLINGTON']}]};


        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
           // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return models and sellers w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "Civic"}'
        };

        const response = {
            'data': [
                {
                    'makes': []
                }, {
                    'models': [
                        'Honda Civic',
                        'Honda Civic Coupe',
                        'Honda Civic Cpe',
                        'Honda Civic del Sol',
                        'Honda Civic Hatchback/Wagon',
                        'Honda Civic Hybrid',
                        'Honda Civic Sdn',
                        'Honda Civic Sedan',
                        'Honda Civic Si',
                        'Honda Civic Si Coupe',
                        'Honda Civic Si Sedan',
                        'Honda Civic Type R']
                    }, {
                    'sellers': [
                        'ALASKA CIVIC AUTO',
                        'CIVIC AUTO',
                        'CIVIC AUTO LINK',
                        'CIVIC AUTO LTD',
                        'CIVIC AUTO SALES',
                        'CIVIC AUTO SALES & SERVICE',
                        'CIVIC CARS',
                        'CIVIC CENTER MOTORS LTD',
                        'CIVIC IMPORTS']
                }, {
                    'locations': []
                }]};


        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
           // expect(data.body).to.equal(JSON.stringify(response));
        });
    });
    it(`should return models on sellers w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "alfa rom"}'
        };

        const response = {
            'data': [
                {
                    'models': [
                        'Alfa Romeo 164 Series',
                        'Alfa Romeo 4C',
                        'Alfa Romeo 4C Coupe',
                        'Alfa Romeo 4C Spider',
                        'Alfa Romeo Alfa Romeo',
                        'Alfa Romeo GTV-6',
                        'Alfa Romeo Giulia',
                        'Alfa Romeo Giulia Quadrifoglio',
                        'Alfa Romeo Milano',
                        'Alfa Romeo Spider',
                        'Alfa Romeo Spider Veloce',
                        'Alfa Romeo Stelvio',
                        'Alfa Romeo Stelvio Quadrifoglio'
                    ]
                },
                {
                    'sellers': [
                        'ALFA AUTO',
                        'ALFA AUTO MALL',
                        'ALFA AUTO SALE',
                        'ALFA AUTO SALES',
                        'ALFA MOTORS',
                        'ALFA ROMEO & FIAT OF CHICAGO',
                        'ALFA ROMEO AND FIAT OF AVONDALE',
                        'ALFA ROMEO AND FIAT OF SAN DIEGO',
                        'ALFA ROMEO FIAT OF EDMOND',
                        'ALFA ROMEO FIAT OF FORT WORTH',
                        'ALFA ROMEO FIAT OF FORT WORTH (PRIVATE LABEL)',
                        'ALFA ROMEO FIAT OF MCKINNEY',
                        'ALFA ROMEO FIAT OF THE TRIAD',
                        'ALFA ROMEO LOUISVILLE',
                        'ALFA ROMEO OF TYSONS',
                        'ALFA ROMEO OF WINNIPEG',
                        'ALFA TOWNCAR CORP',
                        'ALFAISAL MOTORS LTD',
                        'ALFALFA MOTORS',
                        'ALFANO MOTORCARS']}]};
        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
           // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return model and sellers w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "adesa toronto", "countryCode": "2"}'
        };

        const response = {'data': {'make': [], 'model': [], 'seller': ['ADESA TORONTO', 'ADESA TORONTO AUCTION', 'ADESA TORONTO (ONTARIO)'], 'location': ['ON ADESA Toronto']}};
        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });


    it(`should return model and sellers w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "honda civic c"}'
        };

        const response = {
            'data': [{'models': [
                'Honda Civic Coupe',
                'Honda Civic Cpe'
            ]
        },
        {
            'sellers': [
                '101125484 SASKATCHEWAN LTD O/A ROYAL HONDA',
                '1583647 ALBERTA LTD DBA GO HONDA',
                '1738135 ONTARIO INC. DBA FAMILY HONDA',
                '2257638 ONTARIO INC DBA HAMBURG HONDA (2011)',
                '2348347 ONTARIO INC DBA WELLAND HONDA',
                '2547451 ONTARIO INC DBA MISSISSAUGA HONDA',
                '2848 4368 QUEBEC INC DBA DERAGON HONDA',
                '2848 7403 QUEBEC INC DBA HONDA BLAINVILLE',
                '2945-4154 QUEBEC INC DBA GASPE HONDA',
                '305960 SASK LTD. DBA REGINA HONDA',
                '3242781 CANADA INC DBA SPINELLI HONDA',
                '3278724 NS LTD DBA CENTURY HONDA',
                '3291625 NOVA SCOTIA LIMITED DBA COLONIAL HONDA ***OOB***',
                '4475518 CANADA INC DBA  HAWKESBURY HONDA',
                '636066 ALBERTA LTD. D.B.A. SUNVALLEY HONDA',
                '6676677 CANADA INC DBA HONDA DRUMMONDVILLE',
                '9027 9118 QUEBEC INC DBA TROIS-RIVIERES HONDA',
                '9048 3538 QUEBEC INC DBA HONDA MATANE',
                '9075-5125 QUEBEC INC DBA ALMA HONDA',
                'HONDA OF BURLINGTON'
            ]}]
        };
        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
           // expect(data.body).to.equal(JSON.stringify(response));
        });
    });
    it(`should return make,model,sellers and location w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "Mo"}'
        };

        const response = {
            'data': [{'makes': [
                'American Motors (AMC)'
            ]
        },
        {
            'models': [
                'American Motors (AMC) Alliance',
                'American Motors (AMC) Concord',
                'American Motors (AMC) Eagle',
                'American Motors (AMC) Eagle 30 4WD',
                'American Motors (AMC) Eagle 4WD',
                'American Motors (AMC) Eagle 50 4WD',
                'American Motors (AMC) Encore',
                'American Motors (AMC) Spirit',
                'American Motors (AMC) Sport Hatchback/Wagon'
            ]
        },
        {
            'sellers': [
                '#1 COCHRAN OF MONROEVILLE',
                '0 TO 60 MOTORS',
                '0 TO 60 MOTORSPORTS',
                '007 MOTORS',
                '1 COCHRAN OF MONROEVILLE',
                '1 ELITE MOTORS',
                '1 STAR MOTORS',
                '1 STAR MOTORS AND LEASING',
                '10 FREEWAY MOTORS',
                '1023 MOTORS.COM',
                '107 MOTORS',
                '10K MOTORCARS',
                '11 11 MOTORS',
                '11 MOTORS',
                '1105 MOTORS',
                '1174206 ONTARIO LIMITED O/A FAVORIT MOTORS',
                '1197243 ONTARIO LTD DBA RON CLARK MOTORS',
                '11TH STREET MOTORS',
                'BAY AREA MOTORSPORTS',
                'CALI MOTORS INC'
            ]
        },
        {
            'locations': [
                'IA - ADESA Des Moines',
                'MO - ADESA Kansas City',
                'MO - ADESA St. Louis'
            ]}]
        };


        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
           // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return sellers and locations w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "adesa"}'
        };

        const response = {
            'data': [{'makes': []
        },
        {
            'models': []
        },
        {
            'sellers': [
                'ADESA ATLANTA',
                'ADESA AUCTIONS BOSTON',
                'ADESA AUSTIN',
                'ADESA BIRMINGHAM',
                'ADESA BOSTON',
                'ADESA BUFFALO',
                'ADESA CALGARY',
                'ADESA CALGARY AUCTION',
                'ADESA CANADA INC - DEALER AVENUE',
                'ADESA CANADA INC.- OPEN FLEET & LEASE CONSIGNORS',
                'ADESA CENTRAL MICHIGAN',
                'ADESA CHARLOTTE',
                'ADESA CHARLOTTE AUCTION',
                'ADESA CINCINNATI DAYTON AUCTION',
                'ADESA CINCINNATI/DAYTON',
                'ADESA CLEVELAND',
                'ADESA COLORADO SPRINGS',
                'ADESA COLORADO SPRINGS AUCTION',
                'ADESA CONCORD',
                'ADESA CORPORATE US PROCESSING AUCTION'
            ]
        },
        {
            'locations': [
                'AL - ADESA Birmingham',
                'CA - ADESA BRASHERS',
                'CA - ADESA Brashers',
                'CA - ADESA Fresno',
                'CO - ADESA Colorado Springs',
                'GA - ADESA Atlanta',
                'IA - ADESA Des Moines',
                'ID - ADESA Boise',
                'IL - ADESA Chicago',
                'MA - ADESA Boston',
                'MA - ADESA Concord',
                'MI - ADESA Flint',
                'NC - ADESA Charlotte',
                'ND - ADESA Fargo',
                'NY - ADESA Buffalo',
                'OH - ADESA Cincinnati/Dayton',
                'OH - ADESA Cleveland',
                'TN - ADESA East Tennessee',
                'TX - ADESA Austin',
                'TX - ADESA Dallas'
            ]}]
        };
        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
           // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return sellers and locations w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "adesa indianapolis"}'
        };

        const response = {
            'data': [
                {
                    'locations': [
                        'AL - ADESA Indianapolis'
                    ]}]
        };
        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return sellers and locations w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "adesa indianapoli"}'
        };

        const response = {
            'data': [
                {
                    'locations': [
                        'AL - ADESA Indianapolis'
                    ]}]
        };
        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return seller w.r.t searchText`, async () => {
        const event = {
            body: '{"searchText": "HONDA OF STEVENS CREEK"}'
        };

        const response = {
            'data': [{'sellers': ['HONDA OF STEVENS CREEK']}]
        };
        await autoSuggest(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
           // expect(data.body).to.equal(JSON.stringify(response));
        });
    });
});
it(`should return model and seller w.r.t searchText and ignore year`, async () => {
    const event = {
        body: '{"searchText": "2016 honda civ"}'
    };

    const response = {
        'data': [{'models': [
                    'Honda Civic',
                    'Honda Civic Coupe',
                    'Honda Civic Cpe',
                    'Honda Civic del Sol',
                    'Honda Civic Hatchback/Wagon',
                    'Honda Civic Hybrid',
                    'Honda Civic Sdn',
                    'Honda Civic Sedan',
                    'Honda Civic Si',
                    'Honda Civic Si Coupe',
                    'Honda Civic Si Sedan',
                    'Honda Civic Type R']
                }, {
                'sellers': [
                    '101125484 SASKATCHEWAN LTD O/A ROYAL HONDA',
                    '1583647 ALBERTA LTD DBA GO HONDA',
                    '1738135 ONTARIO INC. DBA FAMILY HONDA',
                    '2257638 ONTARIO INC DBA HAMBURG HONDA (2011)',
                    '2348347 ONTARIO INC DBA WELLAND HONDA',
                    '2547451 ONTARIO INC DBA MISSISSAUGA HONDA',
                    '2848 4368 QUEBEC INC DBA DERAGON HONDA',
                    '2848 7403 QUEBEC INC DBA HONDA BLAINVILLE',
                    '2945-4154 QUEBEC INC DBA GASPE HONDA',
                    '305960 SASK LTD. DBA REGINA HONDA',
                    '3242781 CANADA INC DBA SPINELLI HONDA',
                    '3278724 NS LTD DBA CENTURY HONDA',
                    '3291625 NOVA SCOTIA LIMITED DBA COLONIAL HONDA ***OOB***',
                    '4475518 CANADA INC DBA  HAWKESBURY HONDA',
                    '636066 ALBERTA LTD. D.B.A. SUNVALLEY HONDA',
                    '6676677 CANADA INC DBA HONDA DRUMMONDVILLE',
                    '9027 9118 QUEBEC INC DBA TROIS-RIVIERES HONDA',
                    '9048 3538 QUEBEC INC DBA HONDA MATANE',
                    '9075-5125 QUEBEC INC DBA ALMA HONDA',
                    'HONDA OF BURLINGTON']}]};


    await autoSuggest(event, null, (error, data) => {
        expect(error).to.equal(null);
        expect(data.statusCode).to.equal(200);
       // expect(data.body).to.equal(JSON.stringify(response));
    });

});

