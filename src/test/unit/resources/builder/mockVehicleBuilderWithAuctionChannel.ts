export const VEHICLE_WITH_AUCTION_CHANNEL_ALL = {
    'query': {
        'query_string': {
            'fields': ['isLiveBlockSearchable', 'isDealerBlockSearchable', 'isRunBlockSearchable'],
            'query': true
        }
    }
};

export const VEHICLE_WITH_AUCTION_CHANNEL_DEALERBLOCK = {
    'query': {
        'query_string': {
            'fields': ['isDealerBlockSearchable'],
            'query': true
        }
    }
};

export const VEHICLE_WITH_AUCTION_CHANNEL_LIVEBLOCK_RUNLIST = {
    'query': {
        'query_string': {
            'fields': ['isLiveBlockSearchable', 'isRunBlockSearchable'],
            'query': true
        }
    }
};

export const VEHICLE_WITH_AUCTION_CHANNEL_DEALERBLOCK_RUNLIST = {
    'query': {
        'query_string': {
            'fields': ['isDealerBlockSearchable', 'isRunBlockSearchable'],
            'query': true
        }
    }
};

export const VEHICLE_WITH_AUCTION_CHANNEL_DEALERBLOCK_LIVEBLOCK = {
    'query': {
        'query_string': {
            'fields': ['isDealerBlockSearchable', 'isLiveBlockSearchable'],
            'query': true
        }
    }
};

export const VEHICLE_SORT_AUCTION_CHANNEL_DEALERBLOCK = {
    'sort': [{
        'isDealerBlockSearchable': {
            'order': 'desc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'query_string': {
            'fields': ['isDealerBlockSearchable'],
            'query': true
        }
    }
};

export const VEHICLE_SORT_AUCTION_CHANNEL_DEALER_RUN_BLOCK = {
    'sort': [{
        'isDealerBlockSearchable': {
            'order': 'desc',
            'missing': '_last'
        }
    }, {
        'isRunBlockSearchable': {
            'order': 'desc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'query_string': {
            'fields': ['isDealerBlockSearchable', 'isRunBlockSearchable'],
            'query': true
        }
    }
};

export const VEHICLE_SORT_AUCTION_CHANNEL_DEALER_RUN_LIVE_BLOCK = {
    'sort': [{
        'isDealerBlockSearchable': {
            'order': 'desc',
            'missing': '_last'
        }
    }, {
        'isRunBlockSearchable': {
            'order': 'desc',
            'missing': '_last'
        }
    }, {
        'isLiveBlockSearchable': {
            'order': 'desc',
            'missing': '_last'
        }
    }
    ],
    'query': {
        'query_string': {
            'fields': ['isDealerBlockSearchable', 'isRunBlockSearchable', 'isLiveBlockSearchable'],
            'query': true
        }
    }
};

export const VEHICLE_WITH_AUCTION_CHANNEL_DEALER_BLOCK = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'ford'
                        }
                    }, {
                        'query_string': {
                            'fields': ['isDealerBlockSearchable'],
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
