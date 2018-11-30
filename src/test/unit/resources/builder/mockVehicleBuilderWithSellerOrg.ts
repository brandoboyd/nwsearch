export const VEHICLE_WITH_SELLER_ORG = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'match': {
                            'sellerOrganizationName.keyword': 'JPMORGAN CHASE BANK, N.A.'
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

export const VEHICLE_WITH_MULTIPLE_SELLER_ORG = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'bool': {
                            'should': [{
                                'match': {
                                    'sellerOrganizationName.keyword': 'JPMORGAN CHASE BANK, N.A.'
                                }
                            }, {
                                'match': {
                                    'sellerOrganizationName.keyword': 'SUBARU OF AMERICA INC.'
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

export const VEHICLE_WITH_MAKE_MODEL_SELLER_ORG = {
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
                                'query': 'outback',
                                'operator': 'and'
                            }
                        }
                    }, {
                        'match': {
                            'sellerOrganizationName.keyword': 'JPMORGAN CHASE BANK, N.A.'
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
export const VEHICLE_WITH_MAKE_MODEL_MULTIPLE_SELLER_ORG = {
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
                            'model': {
                                'query': 'escape',
                                'operator': 'and'
                            }
                        }
                    }, {
                        'bool': {
                            'should': [{
                                'match': {
                                    'sellerOrganizationName.keyword': 'FORD CREDIT'
                                }
                            }, {
                                'match': {
                                    'sellerOrganizationName.keyword': 'Ford Motor Company of Canada'
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

export const VEHICLE_WITH_MULTIPLE_MAKE_MODEL_MULTIPLE_SELLER_ORG_SORT = {
    'sort': [{
        'sellerOrganizationName.keyword': {
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
                            'make': 'subaru'
                        }
                    }, {
                        'match': {
                            'model': {
                                'query': 'outback',
                                'operator': 'and'
                            }
                        }
                    }, {
                        'bool': {
                            'should': [{
                                'match': {
                                    'sellerOrganizationName.keyword': 'FORD CREDIT'
                                }
                            }, {
                                'match': {
                                    'sellerOrganizationName.keyword': 'JPMORGAN CHASE BANK, N.A.'
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
                                    'sellerOrganizationName.keyword': 'FORD CREDIT'
                                }
                            }, {
                                'match': {
                                    'sellerOrganizationName.keyword': 'JPMORGAN CHASE BANK, N.A.'
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


