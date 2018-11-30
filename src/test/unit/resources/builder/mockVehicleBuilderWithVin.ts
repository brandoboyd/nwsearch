export const VEHICLE_WITH_VIN_UNITED_STATES = {
    'query': {
        'bool': {
            'must': [{
                'match': {
                    'vin': '1fatp8ff7j5166917'
                }
            }, {
                'match': {
                    'countryName': 'United States'
                }
            }, {
                'query_string': {
                    'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
                    'query': true
                }
            }
            ]
        }
    }
};
export const VEHICLE_WITH_VIN_CANADA = {
    'query': {
        'bool': {
            'must': [{
                'match': {
                    'vin': '1fatp8ff7j5166917'
                }
            }, {
                'match': {
                    'countryName': 'Canada'
                }
            }, {
                'query_string': {
                    'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
                    'query': true
                }
            }
            ]
        }
    }
};
export const VEHICLE_WITH_PARTIAL_VIN_UNITED_STATES = {
    'query': {
        'bool': {
            'must': [{
                'wildcard': {
                    'vin': '*760013'
                }
            }, {
                'match': {
                    'countryName': 'United States'
                }
            }, {
                'query_string': {
                    'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
                    'query': true
                }
            }
            ]
        }
    }
};
export const VEHICLE_WITH_PARITAL_VIN_CANADA = {
    'query': {
        'bool': {
            'must': [{
                'wildcard': {
                    'vin': '*760013'
                }
            }, {
                'match': {
                    'countryName': 'Canada'
                }
            }, {
                'query_string': {
                    'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
                    'query': true
                }
            }
            ]
        }
    }
};



