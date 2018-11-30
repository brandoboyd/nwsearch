export const VEHICLE_WITH_MAKE_MODEL_EXTERIOR_COLOR = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'acura'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'nsx',
                                'operator': 'and'
                            }
                        }
                    }, {
                        'match': {
                            'exteriorColor': 'black'
                        }
                    }
                    ]
                }
            }
            ]
        }
    }
};

export const VEHICLE_WITH_EXTERIOR_COLOR = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'exteriorColor': 'black'
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

export const VEHICLE_SORT_EXTERIOR_COLOR = {
    'sort': [{
        'exteriorColor.keyword': {
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
                            'exteriorColor': 'black'
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

