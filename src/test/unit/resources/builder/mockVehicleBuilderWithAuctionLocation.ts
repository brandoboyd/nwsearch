export const VEHICLE_WITH_MAKE_MODEL_AUCTION_LOCATION = {
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
                                    'processingLocation.keyword': 'ADESA Ottawa'
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

export const VEHICLE_WITH_AUCTION_LOCATION = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'bool': {
                            'should': [{
                                'match': {
                                    'processingLocation.keyword': 'ADESA Ottawa'
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

export const VEHICLE_WITH_AUCTION_LOCATION_ALL_ADESA = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'bool': {
                            'should': [{
                                'match_phrase_prefix': {
                                    'processingLocation': 'ADESA'
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

export const VEHICLE_WITH_MAKE_AUCTION_LOCATION = {
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
                                    'processingLocation.keyword': 'ADESA Ottawa'
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

export const VEHICLE_WITH_MAKE_MODEL_TRIM_AUCTION_LOCATION = {
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
                                    'processingLocation.keyword': 'ADESA Ottawa'
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

export const VEHICLE_WITH_MAKE_MODEL_TRIM_COLOR_AUCTION_LOCATION = {
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
                            'exteriorColor': 'black'
                        }
                    }, {
                        'match': {
                            'trim': 'LIMITED'
                        }
                    }, {
                        'bool': {
                            'should': [{
                                'match': {
                                    'processingLocation.keyword': 'ADESA Ottawa'
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

export const MULTI_VEHICLE_WITH_MAKE_MODEL_AUCTION_LOCATION = {
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
                                    'processingLocation.keyword': 'ADESA Boston'
                                }
                            }, {
                                'match': {
                                    'processingLocation.keyword': 'ADESA Sacramento'
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
                                    'processingLocation.keyword': 'ADESA Boston'
                                }
                            }, {
                                'match': {
                                    'processingLocation.keyword': 'ADESA Sacramento'
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

export const MULTI_VEHICLE_SORT_AUCTION_LOCATION = {
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
                                    'processingLocation.keyword': 'ADESA Boston'
                                }
                            }, {
                                'match': {
                                    'processingLocation.keyword': 'ADESA Sacramento'
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
                                    'processingLocation.keyword': 'ADESA Boston'
                                }
                            }, {
                                'match': {
                                    'processingLocation.keyword': 'ADESA Sacramento'
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




