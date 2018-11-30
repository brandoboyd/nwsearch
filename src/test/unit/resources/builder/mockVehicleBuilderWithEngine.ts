export const VEHICLE_WITH_ENGINE = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'engineName.keyword': '4 CYL'
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

export const VEHICLE_WITH_MULTI_ENGINE = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'bool': {
                            'should': [{
                                'match': {
                                    'engineName.keyword': '4 CYL'
                                }
                            }, {
                                'match': {
                                    'engineName.keyword': '6 CYL'
                                }
                            }
                            ]
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


export const VEHICLE_WITH_MAKE_MODEL_ENGINE = {
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
                            'engineName.keyword': '4 CYL'
                        }
                    }
                    ]
                }
            }
            ]
        }
    }
};

export const VEHICLE_SORT_ENGINE = {
    'sort': [{
        'engineName.keyword': {
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
                            'engineName.keyword': '4 CYL'
                        }
                    }
                    ]
                }
            }
            ]
        }
    }
};




