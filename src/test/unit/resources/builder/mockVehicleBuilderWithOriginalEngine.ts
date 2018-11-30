export const VEHICLE_WITH_ORIG_ENGINE = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'origEngineName': '1.8 L'
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

export const VEHICLE_WITH_MAKE_MODEL_ORIG_ENGINE = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'subaru'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'Crosstrek',
                                'operator': 'and'
                            }
                        }
                    }, {
                        'match': {
                            'origEngineName': '1.8 L'
                        }
                    }
                    ]
                }
            }
            ]
        }
    }
};

export const VEHICLE_SORT_ORIG_ENGINE = {
    'sort': [{
        'origEngineName.keyword': {
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
                            'make': 'subaru'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'Crosstrek',
                                'operator': 'and'
                            }
                        }
                    }, {
                        'match': {
                            'origEngineName': '1.8 L'
                        }
                    }
                    ]
                }
            }
            ]
        }
    }
};



