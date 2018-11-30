export const VEHICLE_WITH_GRADE_RANGE = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'range': {
                            'gradeValue': {
                                'gte': '0',
                                'lte': '3',
                                'boost': 2
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

export const VEHICLE_WITH_GRADE_NO_RANGE = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'range': {
                            'gradeValue': {
                                'gte': '3',
                                'lte': '999999',
                                'boost': 2
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

export const VEHICLE_WITH_MAKE_MODEL_GRADE_RANGE = {
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
                        'range': {
                            'gradeValue': {
                                'gte': '0',
                                'lte': '3',
                                'boost': 2
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

export const VEHICLE_WITH_MAKE_MODEL_GRADE_NO_RANGE = {
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
                        'range': {
                            'gradeValue': {
                                'gte': '3',
                                'lte': '999999',
                                'boost': 2
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

export const VEHICLE_SORT_GRADE_RANGE = {
    'sort': [{
        'gradeValue': {
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
                        'range': {
                            'gradeValue': {
                                'gte': '0',
                                'lte': '3',
                                'boost': 2
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

