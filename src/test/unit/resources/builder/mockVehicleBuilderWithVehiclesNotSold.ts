const VEHICLES_SOLD_QUERY = [{
    'match': {
        'vehicleStatus.keyword': 'Sold'
    }
}, {
    'match': {
        'vehicleStatus.keyword': 'AMS Sold'
    }
}, {
    'match': {
        'vehicleStatus.keyword': 'Auction Hold'
    }
}, {
    'match': {
        'vehicleStatus.keyword': 'Repair Hold'
    }
}, {
    'match': {
        'vehicleStatus.keyword': 'Auction Hold - Awaiting Inspection'
    }
}, {
    'match': {
        'vehicleStatus.keyword': 'Auction Hold - Awaiting Pricing'
    }
}, {
    'match': {
        'vehicleStatus.keyword': 'Auction Hold - Manual'
    }
}, {
    'match': {
        'vehicleStatus.keyword': 'Auction Hold - Awaiting MBP'
    }
}, {
    'match': {
        'vehicleStatus.keyword': 'Auction Hold - Awaiting NGD MBP'
    }
}, {
    'match': {
        'vehicleStatus.keyword': 'Hold - Awaiting Location Assignment'
    }
}];
export const VEHICLE_WITH_DEFAULT_VEHICLE_NOT_SOLD = {
    'query': {
        'bool': {
            'must': {
                'query_string': {
                    'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
                    'query': true
                }
            },
            'must_not': VEHICLES_SOLD_QUERY
        }
    }
};


export const VEHICLE_WITH_MAKE_MODEL_VEHICLE_NOT_SOLD = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'Honda'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'Accord',
                                'operator': 'and'
                            }
                        }
                    }, {
                        'query_string': {
                            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
                            'query': true
                        }
                    }
                    ],
                    'must_not': VEHICLES_SOLD_QUERY
                }
            }
            ]
        }
    }
};
export const VEHICLE_WITH_MULTI_MAKE_MODEL_VEHICLE_NOT_SOLD = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'Honda'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'Accord',
                                'operator': 'and'
                            }
                        }
                    }, {
                        'query_string': {
                            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
                            'query': true
                        }
                    }
                    ],
                    'must_not': VEHICLES_SOLD_QUERY
                }
            }, {
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'Dodge'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'Caravan',
                                'operator': 'and'
                            }
                        }
                    }, {
                        'query_string': {
                            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
                            'query': true
                        }
                    }
                    ],
                    'must_not': VEHICLES_SOLD_QUERY
                }
            }
            ]
        }
    }
};
export const VEHICLE_WITH_VIN_VEHICLE_NOT_SOLD = {

    'query': {
        'bool': {
            'must': [{
                'match': {
                    'vin': '3vwjl7aj7am004439'
                }
            }, {
                'query_string': {
                    'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
                    'query': true
                }
            }
            ],
            'must_not': VEHICLES_SOLD_QUERY
        }
    }
};
export const VEHICLE_WITH_PARTIAL_VIN_VEHICLE_NOT_SOLD = {
    'query': {
        'bool': {
            'must': [{
                'wildcard': {
                    'vin': '*4439'
                }
            }, {
                'query_string': {
                    'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
                    'query': true
                }
            }
            ],
            'must_not': VEHICLES_SOLD_QUERY
        }
    }
};
