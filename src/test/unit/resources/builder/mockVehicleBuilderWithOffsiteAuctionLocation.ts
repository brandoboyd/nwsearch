export const VEHICLE_WITH_MAKE_MODEL_OFFSITE_AUCTION_LOCATION = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'Ford'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'escape',
                                'operator': 'and'
                            }
                        }
                    }, {
                        'bool': {
                            'should': [{
                                'match': {
                                    'processingLocation.keyword': 'other'
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

export const VEHICLE_WITH_OFFSITE_AUCTION_LOCATION = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'bool': {
                            'should': [{
                                'match': {
                                    'processingLocation.keyword': 'other'
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

export const VEHICLE_WITH_OFFSITE_AUCTION_LOCATION_AND_STATE = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'bool': {
                            'should': [{
                                'bool': {
                                    'must': [{
                                        'match': {
                                            'processingLocation.keyword': 'other'
                                        }
                                    }, {
                                        'bool': {
                                            'should': [{
                                                'match': {
                                                    'stateAbbreviation.keyword': 'CA'
                                                }
                                            }
                                            ]
                                        }
                                    }
                                    ]
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

export const VEHICLE_WITH_MAKE_OFFSITE_AUCTION_LOCATION = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'subaru'
                        }
                    }, {
                        'bool': {
                            'should': [{
                                'match': {
                                    'processingLocation.keyword': 'other'
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

export const VEHICLE_WITH_MAKE_OFFSITE_AUCTION_LOCATION_AND_STATE = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'subaru'
                        }
                    }, {
                        'bool': {
                            'should': [{
                                'bool': {
                                    'must': [{
                                        'match': {
                                            'processingLocation.keyword': 'other'
                                        }
                                    }, {
                                        'bool': {
                                            'should': [{
                                                'match': {
                                                    'stateAbbreviation.keyword': 'LA'
                                                }
                                            }
                                            ]
                                        }
                                    }
                                    ]
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

export const VEHICLE_WITH_MAKE_MODEL_TRIM_OFFSITE_AUCTION_LOCATION = {
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
                            'trim': 'LIMITED'
                        }
                    }, {
                        'bool': {
                            'should': [{
                                'match': {
                                    'processingLocation.keyword': 'other'
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


export const MULTI_VEHICLE_WITH_MAKE_MODEL_OFFSITE_AUCTION_LOCATION = {
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
                                'query': 'accord',
                                'operator': 'and'
                            }
                        }
                    }, {
                        'bool': {
                            'should': [{
                                'match': {
                                    'processingLocation.keyword': 'other'
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
            }, {
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'ford'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'escape',
                                'operator': 'and'
                            }
                        }
                    }, {
                        'bool': {
                            'should': [{
                                'match': {
                                    'processingLocation.keyword': 'other'
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

export const MULTI_VEHICLE_SORT_OFFSITE_AUCTION_LOCATION = {
    'sort': [{
        'processingLocation.keyword': {
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
                            'make': 'honda'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'accord',
                                'operator': 'and'
                            }
                        }
                    }, {
                        'bool': {
                            'should': [{
                                'match': {
                                    'processingLocation.keyword': 'other'
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
            }, {
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'ford'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'escape',
                                'operator': 'and'
                            }
                        }
                    }, {
                        'bool': {
                            'should': [{
                                'match': {
                                    'processingLocation.keyword': 'other'
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

export const VEHICLE_SORT_OFFSITE_AUCTION_LOCATION_AND_STATE = {
    'sort': [{
        'stateAbbreviation.keyword': {
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
                        'bool': {
                            'should': [{
                                'match': {
                                    'processingLocation.keyword': 'other'
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

export const VEHICLE_WITH_OFFSITE_AUCTION_LOCATION_AND_MULTI_STATE = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'bool': {
                            'should': [{
                                'bool': {
                                    'must': [{
                                        'match': {
                                            'processingLocation.keyword': 'other'
                                        }
                                    }, {
                                        'bool': {
                                            'should': [{
                                                'match': {
                                                    'stateAbbreviation.keyword': 'CA'
                                                }
                                            }, {
                                                'match': {
                                                    'stateAbbreviation.keyword': 'LA'
                                                }
                                            }
                                            ]
                                        }
                                    }
                                    ]
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

export const VEHICLE_SORT_OFFSITE_AUCTION_LOCATION_AND_MULTI_STATE = {
    'sort': [{
        'stateAbbreviation.keyword': {
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
                        'bool': {
                            'should': [{
                                'bool': {
                                    'must': [{
                                        'match': {
                                            'processingLocation.keyword': 'other'
                                        }
                                    }, {
                                        'bool': {
                                            'should': [{
                                                'match': {
                                                    'stateAbbreviation.keyword': 'CA'
                                                }
                                            }, {
                                                'match': {
                                                    'stateAbbreviation.keyword': 'TX'
                                                }
                                            }
                                            ]
                                        }
                                    }
                                    ]
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

export const VEHICLE_OFFSITE_AUCTION_LOCATION_WITH_MULTI_LOCATIONS = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'bool': {
                            'should': [{
                                'match': {
                                    'processingLocation.keyword': 'other'
                                }
                            }, {
                                'match': {
                                    'processingLocation.keyword': 'ADESA Indianapolis'
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

