export const VEHICLE_WITH_MAKE_DEFAULT_SORT = {
    'sort': [{
        'auctionEndTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'scheduledStartTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'rlSaleDate': {
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

export const VEHICLE_WITH_MAKE_SORT_MAKE = {
    'sort': [{
        'make.keyword': {
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

export const VEHICLE_WITH_VIN_DEFAULT_SORT = {
    'sort': [{
        'auctionEndTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'scheduledStartTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'rlSaleDate': {
            'order': 'asc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'match': {
            'vin': '1gccs196068163410'
        }
    }
};

export const VEHICLE_WITH_PARTIAL_VIN_DEFAULT_SORT = {
    'sort': [{
        'auctionEndTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'scheduledStartTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'rlSaleDate': {
            'order': 'asc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'wildcard': {
            'vin': '*163410'
        }
    }
};

export const VEHICLE_WITH_2_DIGIT_VIN_SORT = {
    'sort': [{
        'auctionEndTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'scheduledStartTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'rlSaleDate': {
            'order': 'asc',
            'missing': '_last'
        }
    }
    ]
};

export const VEHICLE_DEFAULT_SORT = {
    'sort': [{
        'auctionEndTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'scheduledStartTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'rlSaleDate': {
            'order': 'asc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'query_string': {
            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
            'query': true
        }
    }
};
export const VEHICLE_SORT_WITH_ENDTIME = {
    'sort': [{
        'auctionEndTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'scheduledStartTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'rlSaleDate': {
            'order': 'asc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'query_string': {
            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
            'query': true
        }
    }
};

export const VEHICLE_SORT_WITH_ENDTIME_ORDER_ASC = {
    'sort': [{
        'auctionEndTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'scheduledStartTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'rlSaleDate': {
            'order': 'asc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'query_string': {
            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
            'query': true
        }
    }
};
export const VEHICLE_SORT_WITH_ENDTIME_ORDER_DESC = {
    'sort': [{
        'auctionEndTime': {
            'order': 'desc',
            'missing': '_last'
        }
    }, {
        'scheduledStartTime': {
            'order': 'desc',
            'missing': '_last'
        }
    }, {
        'rlSaleDate': {
            'order': 'desc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'query_string': {
            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
            'query': true
        }
    }
};
export const VEHICLE_SORT_WITH_MAKE_ENDTIME = {
    'sort': [{
        'make.keyword': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'auctionEndTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'scheduledStartTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'rlSaleDate': {
            'order': 'asc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'query_string': {
            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
            'query': true
        }
    }
};
export const VEHICLE_SORT_WITH_MAKE_ENDTIME_ORDER_ASC = {
    'sort': [{
        'make.keyword': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'auctionEndTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'scheduledStartTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'rlSaleDate': {
            'order': 'asc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'query_string': {
            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
            'query': true
        }
    }
};
export const VEHICLE_SORT_WITH_MAKE_ENDTIME_ORDER_DESC = {
    'sort': [{
        'make.keyword': {
            'order': 'desc',
            'missing': '_last'
        }
    }, {
        'auctionEndTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'scheduledStartTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'rlSaleDate': {
            'order': 'asc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'query_string': {
            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
            'query': true
        }
    }
};
export const VEHICLE_SORT_WITH_MAKE_ENDTIME_ORDER_ASC_DESC = {
    'sort': [{
        'make.keyword': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'auctionEndTime': {
            'order': 'desc',
            'missing': '_last'
        }
    }, {
        'scheduledStartTime': {
            'order': 'desc',
            'missing': '_last'
        }
    }, {
        'rlSaleDate': {
            'order': 'desc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'query_string': {
            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
            'query': true
        }
    }
};
export const VEHICLE_SORT_WITH_MAKE_ENDTIME_ORDER_ASC_ASC = {
    'sort': [{
        'make.keyword': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'auctionEndTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'scheduledStartTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'rlSaleDate': {
            'order': 'asc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'query_string': {
            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
            'query': true
        }
    }
};

export const VEHICLE_SORT_WITH_MAKE_ENDTIME_ORDER_DESC_DESC = {
    'sort': [{
        'make.keyword': {
            'order': 'desc',
            'missing': '_last'
        }
    }, {
        'auctionEndTime': {
            'order': 'desc',
            'missing': '_last'
        }
    }, {
        'scheduledStartTime': {
            'order': 'desc',
            'missing': '_last'
        }
    }, {
        'rlSaleDate': {
            'order': 'desc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'query_string': {
            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
            'query': true
        }
    }
};

export const VEHICLE_SORT_WITH_MAKE_ENDTIME_ORDER_DESC_ASC = {
    'sort': [{
        'make.keyword': {
            'order': 'desc',
            'missing': '_last'
        }
    }, {
        'auctionEndTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'scheduledStartTime': {
            'order': 'asc',
            'missing': '_last'
        }
    }, {
        'rlSaleDate': {
            'order': 'asc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'query_string': {
            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
            'query': true
        }
    }
};



