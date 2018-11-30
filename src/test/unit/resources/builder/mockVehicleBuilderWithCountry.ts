export const VEHICLE_WITH_COUNTRY = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'countryName': 'US'
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
            ]
        }
    }
};

export const VEHICLE_WITH_MAKE_MODEL_COUNTRY = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'honda'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'Accord',
                                'operator': 'and'
                            }
                        }
                    }, {
                        'match': {
                            'countryName': 'US'
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
            ]
        }
    }
};


export const VEHICLE_SORT_COUNTRY = {
    'sort': [{
        'countryName.keyword': {
            'order': 'desc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'countryName': 'US'
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
            ]
        }
    }
};





