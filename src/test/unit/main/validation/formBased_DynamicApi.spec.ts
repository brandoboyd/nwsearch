import 'reflect-metadata';
import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';

import {formBasedSearch} from '../../../../main/typescript/Auto-complete/formBased_DynamicApi';

describe(`APP /`, () => {

    it(`should return json pair w.r.t searchText1a`, async () => {
        const event = {
            body: '{"selection": "getModel", "value": ["toyota"], "vehicleType": ["truck", "car"],"countryCode": "1"}'
        };

        const response = {
            'data': {
                'make': [
                    'Acura',
                ]
            }
        };
        await formBasedSearch(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"selection": "getAllMake", "value": [], "countryCode": "1"}'

        };

        const response = {'data': {'make': ['AM General', 'Acura', 'Alfa Romeo', 'American Motors (AMC)', 'Aston Martin', 'Audi', 'BMW', 'Bentley', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Daewoo', 'Daihatsu', 'Datsun', 'Dodge', 'Eagle', 'Ferrari', 'Fiat', 'Fisker', 'Ford', 'Freightliner', 'GMC', 'Genesis', 'Geo', 'HUMMER', 'Honda', 'Hyundai', 'INFINITI', 'Isuzu', 'Jaguar', 'Jeep', 'Karma', 'Kia', 'Lamborghini', 'Land Rover', 'Lexus', 'Lincoln', 'Lotus', 'MINI', 'Maserati', 'Maybach', 'Mazda', 'McLaren', 'Mercedes-Benz', 'Mercury', 'Merkur', 'Mitsubishi', 'Nissan', 'Oldsmobile', 'Panoz', 'Peugeot', 'Plymouth', 'Pontiac', 'Porsche', 'Ram', 'Renault', 'Rolls-Royce', 'Saab', 'Saturn', 'Scion', 'Spyker', 'Sterling', 'Subaru', 'Suzuki', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo', 'Yugo', 'smart']}};

        await formBasedSearch(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"selection": "getAllMake", "value": [], "vehicleType": ["truck", "car"],"countryCode": "1"}'
        };

        const response = {
            'data': {
                'make': [
                    'Acura',
                    'Alfa Romeo',
                    'American Motors (AMC)',
                    'Aston Martin',
                    'Audi',
                    'BMW',
                    'Bentley',
                    'Buick',
                    'Cadillac',
                    'Chevrolet',
                    'Chrysler',
                    'Daewoo',
                    'Daihatsu',
                    'Datsun',
                    'Dodge',
                    'Eagle',
                    'Ferrari',
                    'Fiat',
                    'Fisker',
                    'Ford',
                    'GMC',
                    'Genesis',
                    'Geo',
                    'HUMMER',
                    'Honda',
                    'Hyundai',
                    'INFINITI',
                    'Isuzu',
                    'Jaguar',
                    'Jeep',
                    'Karma',
                    'Kia',
                    'Lamborghini',
                    'Lexus',
                    'Lincoln',
                    'Lotus',
                    'MINI',
                    'Maserati',
                    'Maybach',
                    'Mazda',
                    'McLaren',
                    'Mercedes-Benz',
                    'Mercury',
                    'Merkur',
                    'Mitsubishi',
                    'Nissan',
                    'Oldsmobile',
                    'Panoz',
                    'Peugeot',
                    'Plymouth',
                    'Pontiac',
                    'Porsche',
                    'Ram',
                    'Renault',
                    'Rolls-Royce',
                    'Saab',
                    'Saturn',
                    'Scion',
                    'Sterling',
                    'Subaru',
                    'Suzuki',
                    'Tesla',
                    'Toyota',
                    'Volkswagen',
                    'Volvo',
                    'Yugo',
                    'smart'
                ]
            }
        };
        await formBasedSearch(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });




    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"selection": "getAllMake", "value": [], "vehicleType": ["truck"],"countryCode": "1"}'
        };

        const response = {
            'data': {
                'make': [
                    'Cadillac',
                    'Chevrolet',
                    'Datsun',
                    'Dodge',
                    'Fiat',
                    'Ford',
                    'GMC',
                    'HUMMER',
                    'Honda',
                    'Isuzu',
                    'Jeep',
                    'Lincoln',
                    'Mazda',
                    'Mercedes-Benz',
                    'Mitsubishi',
                    'Nissan',
                    'Plymouth',
                    'Ram',
                    'Subaru',
                    'Suzuki',
                    'Toyota',
                    'Volkswagen'
                ]
            }
        };
        await formBasedSearch(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return true for all model`, async () => {
        const event = {
            body: '{"selection": "getModel", "value": ["toyota"], "countryCode": "1"}'
        };

        const response = {'data': {'toyota': ['86', '2WD Pickups', '4Runner', '4runner', '4runner 4WD', '4Runner SR5', '4WD Pickups', 'Avalon', 'Avalon Hybrid', 'Camper Cab/Chassis', 'Camry', 'Camry Hybrid', 'Camry Solara', 'Cargo Vans', 'Celica', 'Chassis-Cabs', 'C-HR', 'Commercial Chassis-Cabs', 'Corolla', 'Corolla iM', 'Corona', 'Cressida', 'Echo', 'FJ Cruiser', 'Highlander', 'Highlander Hybrid', 'Land Cruiser', 'Long Bed Trucks', 'Matrix', 'Mirai', 'MR2', 'MR2 Spyder', 'Paseo', 'Passenger Vans', 'Pickup', 'Pickup & Landcruiser', 'Previa', 'Prius', 'Prius c', 'Prius Plug-In', 'Prius Prime', 'Prius v', 'RAV4', 'RAV4 EV', 'RAV4 Hybrid', 'Sequoia', 'Sienna', 'SR5 Trucks 4WD', 'SR5 Xtracab Trucks', 'Starlet', 'Std Bed Trucks', 'Std Bed Trucks 4WD', 'Supra', 'T100', 'Tacoma', 'Tercel', 'Tundra', 'Tundra 2WD', 'Tundra 2WD Truck', 'Tundra 4WD', 'Tundra 4WD Truck', 'Van Hatchback/Wagon', 'Vans', 'Venza', 'Xtracab Trucks', 'Yaris', 'Yaris iA', '2WD Compact Pickups', '2WD Compact Trucks', '4Runner SR5 Utilities', '4WD Compact Pickups', '4WD Compact Trucks', 'T100 Pickups', 'T100 Trucks', 'Tacoma Pickups', 'Yaris Hatchback/Wagon', 'Yaris Sedan']}};

        await formBasedSearch(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });
    it(`should return true for all model`, async () => {
        const event = {
            body: '{"selection": "getModel", "value": ["toyota"], "vehicleType": ["truck"],"countryCode": "1"}'
        };

        const response = {
            'data': {
                'Toyota': [
                    '2WD Pickups',
                    '4WD Pickups',
                    'Camper Cab Chassis',
                    'Camper Cab/Chassis',
                    'Chassis Cabs',
                    'Chassis-Cabs',
                    'Commercial Chassis Cabs',
                    'Commercial Chassis-Cabs',
                    'Long Bed Trucks',
                    'Pickup',
                    'Pickup & Landcruiser',
                    'SR5 Trucks 4WD',
                    'SR5 Xtracab Trucks',
                    'Std Bed Trucks',
                    'Std Bed Trucks 4WD',
                    'T100',
                    'Tacoma',
                    'Tundra',
                    'Tundra 2WD',
                    'Tundra 2WD Truck',
                    'Tundra 4WD',
                    'Tundra 4WD Truck',
                    'Xtracab Trucks'
                ]
            }
        };
        await formBasedSearch(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });
    it(`should return true for all model`, async () => {
        const event = {
            body: '{"selection": "getModel", "value": ["toyota"], "vehicleType": ["truck", "suv"],"countryCode": "1"}'
        };

        const response = {
            'data': {
                'Toyota': [
                    '2WD Pickups',
                    '4Runner',
                    '4runner 4WD',
                    '4Runner SR5',
                    '4WD Pickups',
                    'C HR',
                    'Camper Cab Chassis',
                    'Camper Cab/Chassis',
                    'Chassis Cabs',
                    'Chassis-Cabs',
                    'C-HR',
                    'Commercial Chassis Cabs',
                    'Commercial Chassis-Cabs',
                    'Highlander',
                    'Highlander Hybrid',
                    'Land Cruiser',
                    'Long Bed Trucks',
                    'Pickup',
                    'Pickup & Landcruiser',
                    'RAV4',
                    'RAV4 EV',
                    'RAV4 Hybrid',
                    'Sequoia',
                    'SR5 Trucks 4WD',
                    'SR5 Xtracab Trucks',
                    'Std Bed Trucks',
                    'Std Bed Trucks 4WD',
                    'T100',
                    'Tacoma',
                    'Tundra',
                    'Tundra 2WD',
                    'Tundra 2WD Truck',
                    'Tundra 4WD',
                    'Tundra 4WD Truck',
                    'Venza',
                    'Xtracab Trucks'
                ]
            }
        };
        await formBasedSearch(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });


    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"selection": "getTrim", "value": ["honda-accord","honda-civic"], "vehicleType": [],"countryCode": "1"}'
        };

        const response = {
            'data': {
                'Honda    Accord': [
                    'Other',
                    '10th Anniversary',
                    'DX',
                    'EX',
                    'EX w/Leather',
                    'LX',
                    'LX w/ABS',
                    'LXI',
                    'SE',
                    'SEI'
                ],
                'Honda    Civic': [
                    '1300',
                    'Other',
                    '1.6L',
                    '1300 DX',
                    '1500 DX',
                    '1500 GL',
                    'CX',
                    'Del Sol',
                    'Del Sol S',
                    'Del Sol Si',
                    'DX',
                    'EX',
                    'EX "A"',
                    'EX w/ABS',
                    'EX w/Option Pkg',
                    'EX-A',
                    'FE',
                    'GX',
                    'HX',
                    'Hybrid',
                    'LX',
                    'LX "A" w/Air',
                    'LX "O" w/Air',
                    'LX w/ABS',
                    'S',
                    'SI',
                    'Si w/ABS',
                    'VP',
                    'VX',
                    'Wagovan'
                ]
            }
        };

        await formBasedSearch(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            //  expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"selection": "getTrim", "value": ["honda-accord"], "vehicleType": [],"countryCode": "1"}'
        };

        const response = {
            'data': {
                'Honda    Accord': [
                    'Other',
                    '10th Anniversary',
                    'DX',
                    'EX',
                    'EX w/Leather',
                    'LX',
                    'LX w/ABS',
                    'LXI',
                    'SE',
                    'SEI'
                ]
            }
        };

        await formBasedSearch(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            //  expect(data.body).to.equal(JSON.stringify(response));
        });
    });
    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"selection": "getAdesaLocation", "value": [], "countryCode": "1"}'

        };
        const response = {'data': {'locations': ['AL - ADESA Birmingham', 'AR - ADESA Little Rock', 'AZ - ADESA Phoenix', 'CA - ADESA BRASHERS', 'CA - ADESA Brashers', 'CA - ADESA Fresno', 'CA - ADESA Golden Gate', 'CA - ADESA Los Angeles', 'CA - ADESA Sacramento', 'CA - ADESA San Diego', 'CA - ADESA San Jose', 'CA - ADESA San Jose UVA', 'CO - ADESA Colorado Springs', 'FL - ADESA Jacksonville', 'FL - ADESA Orlando', 'FL - ADESA Sarasota', 'FL - ADESA Tampa', 'GA - ADESA Atlanta', 'IA - ADESA Des Moines', 'ID - ADESA Boise', 'IL - ADESA Chicago', 'IN - ADESA Indianapolis', 'KY - ADESA Lexington', 'LA - ADESA Shreveport', 'MA - ADESA Boston', 'MA - ADESA Concord', 'MI - ADESA Flint', 'MI - ADESA Lansing', 'MN - ADESA Minneapolis', 'MO - ADESA Kansas City', 'MO - ADESA St. Louis', 'NC - ADESA Charlotte', 'NC - ADESA Raleigh', 'ND - ADESA Fargo', 'NJ - ADESA New Jersey', 'NV - ADESA Las Vegas', 'NV - ADESA Reno', 'NY - ADESA Buffalo', 'NY - ADESA Long Island', 'NY - ADESA Syracuse', 'OH - ADESA Cincinnati/Dayton', 'OH - ADESA Cleveland', 'OK - ADESA Tulsa', 'OR - ADESA Northwest', 'OR - ADESA Portland', 'PA - ADESA Mercer', 'PA - ADESA PA', 'PA - ADESA Pittsburgh', 'SD - ADESA Sioux Falls', 'TN - ADESA East Tennessee', 'TN - ADESA Knoxville', 'TN - ADESA Memphis', 'TN - ADESA Nashville', 'TX - ADESA Austin', 'TX - ADESA Dallas', 'TX - ADESA Houston', 'TX - ADESA San Antonio', 'UT - ADESA Salt Lake', 'VA - ADESA Washington DC', 'WA - ADESA Seattle']}};
        await formBasedSearch(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });

    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"selection": "getAdesaOffsite", "value": [], "countryCode": "2"}'
        };

        const response = {'data': {'offSite': ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']}};

        await formBasedSearch(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });
    it(`should return json pair w.r.t searchText`, async () => {
        const event = {
            body: '{"selection": "getCertifiedAuctionPartners", "value": [], "countryCode": "1"}'
        };
        const response = {'data': {'certifiedPatner': ["AL - AMERICA'S AUTO AUCTI...", 'AL - DEALERS AUTO AUCTION...', 'AL - SHOALS NORTH ALABAMA...', 'CA - AUCTIONS IN MOTION -...', 'CT - CENTRAL AUTO AUCTION', "FL - AMERICA'S AUTO AUCTI...", 'FL - ORLANDO LONGWOOD AUT...', 'FL - TEXAS LONE STAR AUTO...', 'FL - YOUR AUCTION OF TAMP...', "GA - AMERICA'S AUTO AUCTI...", 'GA - CHARLESTON AUTO AUCTION', 'GA - SOUTHEASTERN AUTO AU...', 'IA - DEALERS CHOICE AUTO ...', "IL - AMERICA'S AUTO AUCTI...", 'IL - BADGER STATE AUTO AU...', 'IL - DYER AUTO AUCTION, INC.', 'IL - GREATER ROCKFORD AUT...', 'IL - MORTON AUTO AUCTION INC', 'IN - CLARK COUNTY AUTO AU...', 'IN - DYER AUTO AUCTION, INC.', 'IN - GREATER KALAMAZOO AU...', 'IN - INDIANA AUTO AUCTION', 'KS - KC AUCTION DIRECT LLC', 'KS - SUNFLOWER AUTO AUCTION', "KY - AMERICA'S AUTO AUCTI...", "LA - AMERICA'S AUTO AUCTI...", "LA - LOUISIANA'S 1ST CHOI...", 'MA - LYNNWAY AUTO AUCTION', 'MI - FASTLANE AUTO EXCHAN...', 'MI - GRAND RAPIDS AUTO AU...', 'MI - GREATER KALAMAZOO AU...', "MO - AMERICA'S AUTO AUCTI...", 'MO - KANSAS CITY INDEPEND...', 'MO - MISSOURI AUTO AUCTION', 'MO - SUNFLOWER AUTO AUCTION', "MS - AMERICA'S AUTO AUCTI...", 'MS - DEALERS AUTO AUCTION...', "NC - AMERICA'S AUTO AUCTI...", 'NC - GREENVILLE AUTO AUCT...', 'NC - SPEEDWAY AUTO AUCTIO...', 'NM - LONE STAR AUTO AUCTI...', 'NY - CORRY AUTO DEALERS E...', 'NY - STATE LINE AUTO AUCTION', 'OH - AKRON AUTO AUCTION', "OH - AMERICA'S AUTO AUCTI...", 'OH - CORRY AUTO DEALERS E...', 'OH - GREATER KALAMAZOO AU...', 'OH - SKIPCO AUTO AUCTION', 'OH - VALUE AUTO AUCTION', 'OK - DEALERS AUTO AUCTION...', 'OK - Z66 AUTO AUCTION', 'PA - CORRY AUTO DEALERS E...', 'PA - GREATER ERIE AUTO AU...', 'PA - NORTH EAST PENNSYLVA...', "SC - AMERICA'S AUTO AUCTI...", 'SC - CHARLESTON AUTO AUCTION', "TN - AMERICA'S AUTO AUCTI...", 'TN - DEALERS AUTO AUCTION...', 'TN - MEMPHIS AUTO AUCTION', "TX - AMERICA'S AUTO AUCTI...", 'TX - BIG VALLEY AUTO AUCTION', 'TX - EPI AUCTIONS LLC', 'TX - HOUSTON AUTO AUCTION...', 'TX - LONE STAR AUTO AUCTI...', 'TX - METRO AUTO AUCTION D...', 'TX - TEXAS LONE STAR AUTO...', 'VA - RICHMOND AUTO AUCTION', 'VT - YORKMONT AUTO AUCTION', 'WA - DEALERS AUTO AUCTION...', 'WI - BADGER STATE AUTO AU...', 'WV - CAPITAL CITY AUTO AU...']}};
        await formBasedSearch(event, null, (error, data) => {
            expect(error).to.equal(null);
            expect(data.statusCode).to.equal(200);
            // expect(data.body).to.equal(JSON.stringify(response));
        });
    });
});
