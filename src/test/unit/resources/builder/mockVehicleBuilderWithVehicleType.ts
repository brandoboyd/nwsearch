export const VEHICLE_WITH_VEHICLE_TYPE = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'bodyType.keyword': 'Car'
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

export const VEHICLE_WITH_VEHICLE_TYPE_LIST = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'bool': {
                            'should': [{
                                'match': {
                                    'bodyType.keyword': 'Car'
                                }
                            }, {
                                'match': {
                                    'bodyType.keyword': 'SUV'
                                }
                            }, {
                                'match': {
                                    'bodyType.keyword': 'Truck'
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

export const VEHICLE_WITH_MAKE_VEHICLE_TYPE = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'ford'
                        }
                    }, {
                        'match': {
                            'bodyType.keyword': 'Car'
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

export const VEHICLE_SORT_VEHICLE_TYPE = {
    'sort': [{
        'bodyType.keyword': {
            'order': 'asc',
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
                            'bodyType.keyword': 'Car'
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
export const VEHICLE_MULTIPLE_SORT_ORDER_VEHICLE_TYPE = {
    'sort': [{
        'make.keyword': {
            'order': 'desc',
            'missing': '_last'
        }
    }, {
        'model.keyword': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'bodyType.keyword': {
            'order': 'asc',
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
                            'make': 'ford'
                        }
                    }, {
                        'match': {
                            'bodyType.keyword': 'Car'
                        }
                    }, {
                        'query_string': {
                            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
                            'query': true
                        }
                    }
                    ]
                }
            }, {
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'toyota'
                        }
                    }, {
                        'match': {
                            'bodyType.keyword': 'Car'
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

export const VEHICLE_MULTIPLE_SORT_VEHICLE_TYPE = {
    'sort': [{
        'make.keyword': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'bodyType.keyword': {
            'order': 'asc',
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
                            'make': 'ford'
                        }
                    }, {
                        'match': {
                            'bodyType.keyword': 'Car'
                        }
                    }, {
                        'query_string': {
                            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
                            'query': true
                        }
                    }
                    ]
                }
            }, {
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'toyota'
                        }
                    }, {
                        'match': {
                            'bodyType.keyword': 'Car'
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



