export const VEHICLE_WITH_MODEL = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'model': {
                                'query': 'civic',
                                'operator': 'and'
                            }
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

export const VEHICLE_WITH_MAKE_MODEL = {
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
                    }
                    ]
                }
            }
            ]
        }
    }
};

export const VEHICLE_WITH_MAKE_MODEL_LIVEBLOCK = {
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
                                'query': 'crosstrek',
                                'operator': 'and'
                            }
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
export const VEHICLE_WITH_MAKE_MODEL_STATE = {
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
                            'stateAbbreviation.keyword': 'OH'
                        }
                    }
                    ]
                }
            }
            ]
        }
    }
};
export const VEHICLE_WITH_MAKE_MODEL_YEAR = {
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
                            'year': '2006'
                        }
                    }
                    ]
                }
            }
            ]
        }
    }
};
export const VEHICLE_WITH_MAKE_MODEL_YEAR_RANGE = {
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
                        'range': {
                            'year': {
                                'gte': '2006',
                                'lte': '2015',
                                'boost': 2
                            }
                        }
                    }
                    ]
                }
            }
            ]
        }
    }
};

export const VEHICLE_WITH_MAKE_MODEL_YEAR_SORT = {
    'sort': [{
        'year': {
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
                            'year': '2006'
                        }
                    }
                    ]
                }
            }
            ]
        }
    }
};
export const VEHICLE_WITH_MAKE_MODEL_ODOMETER = {
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
                        'range': {
                            'odometer': {
                                'gte': '10000',
                                'lte': '999999',
                                'boost': 2
                            }
                        }
                    }
                    ]
                }
            }
            ]
        }
    }
};
export const VEHICLE_WITH_MAKE_MODEL_ODOMETER_SORT = {
    'sort': [{
        'odometer': {
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
                        'range': {
                            'odometer': {
                                'gte': '10000',
                                'lte': '999999',
                                'boost': 2
                            }
                        }
                    }
                    ]
                }
            }
            ]
        }
    }
};

export const VEHICLE_WITH_MAKE_MODEL_ODOMETER_RANGE = {
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
                        'range': {
                            'odometer': {
                                'gte': '10000',
                                'lte': '20000',
                                'boost': 2
                            }
                        }
                    }
                    ]
                }
            }
            ]
        }
    }
};
export const VEHICLE_WITH_MAKE_MODEL_DRIVE_TRAIN = {
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
                                'query': 'crosstrek',
                                'operator': 'and'
                            }
                        }
                    }, {
                        'match': {
                            'driveTrain': 'AWD'
                        }
                    }
                    ]
                }
            }
            ]
        }
    }
};
export const VEHICLE_WITH_MAKE_MODEL_TRANSMISSION = {
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
                            'transmission': 'Automatic'
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

export const VEHICLE_WITH_MAKE_MODEL_TRIM = {
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
                            'trim': 'LIMITED'
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

