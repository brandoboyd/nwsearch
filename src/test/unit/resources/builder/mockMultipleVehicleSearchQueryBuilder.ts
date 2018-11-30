export const MULTIPLE_MAKES = {
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
            }, {
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'bentley'
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
export const MULTIPLE_MAKE_MODEL = {
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

export const MULTIPLE_MAKE_MODEL_STATE = {
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
            }, {
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'bentley'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'CONTINENTAL GT',
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
export const MULTIPLE_MAKE_MODEL_YEAR = {
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
            }, {
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'bentley'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'CONTINENTAL GT',
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
export const MULTIPLE_MAKE_MODEL_YEAR_RANGE = {
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
            }, {
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'bentley'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'CONTINENTAL GT',
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
export const MULTIPLE_MAKE_MODEL_ODOMETER = {
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
            }, {
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'bentley'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'CONTINENTAL GT',
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
export const MULTIPLE_MAKE_MODEL_ODOMETER_RANGE = {
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
            }, {
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'bentley'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'CONTINENTAL GT',
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
export const MULTIPLE_MAKE_MODEL_DRIVE_TRAIN = {
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
                            'driveTrain': 'AWD'
                        }
                    }
                    ]
                }
            }, {
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'bentley'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'CONTINENTAL GT',
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
export const MULTIPLE_MAKE_MODEL_TRANSMISSION = {
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
            }, {
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
export const MULTIPLE_MAKE_MODEL_MMF = {
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
                        'multi_match': {
                            'query': 'subaru',
                            'type': 'phrase_prefix',
                            'lenient': 'true',
                            'fields': ['make', 'model']
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
                            'make': 'subaru'
                        }
                    }, {
                        'multi_match': {
                            'query': 'subaru',
                            'type': 'phrase_prefix',
                            'lenient': 'true',
                            'fields': ['make', 'model']
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
export const MULTIPLE_MMF = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'multi_match': {
                            'query': 'subaru',
                            'type': 'phrase_prefix',
                            'lenient': 'true',
                            'fields': ['make', 'model']
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

export const MULTIPLE_MAKE_MODEL_WITH_MODELS_COMMA_DELIMITED = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'ford'
                        }
                    }, {
                        'bool': {
                            'should': [{
                                'match': {
                                    'model': {
                                        'query': 'fusion',
                                        'operator': 'and'
                                    }
                                }
                            }, {
                                'match': {
                                    'model': {
                                        'query': 'escape',
                                        'operator': 'and'
                                    }
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

export const MULTIPLE_MAKES_MODELS_BOTH_COMMA_DELIMITED = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'make': 'ford'
                        }
                    }, {
                        'bool': {
                            'should': [{
                                'match': {
                                    'model': {
                                        'query': 'fusion',
                                        'operator': 'and'
                                    }
                                }
                            }, {
                                'match': {
                                    'model': {
                                        'query': 'escape',
                                        'operator': 'and'
                                    }
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
                            'make': 'honda'
                        }
                    }, {
                        'bool': {
                            'should': [{
                                'match': {
                                    'model': {
                                        'query': 'accord',
                                        'operator': 'and'
                                    }
                                }
                            }, {
                                'match': {
                                    'model': {
                                        'query': 'civic',
                                        'operator': 'and'
                                    }
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
