export const VEHICLE_WITH_ACCESS_GROUPS = {
    'query': {
        'bool': {
            'should': [{
                'bool': {
                    'must': [{
                        'bool': {
                            'should': [{
                                'match': {
                                    'viewAccessGroupList': '1'
                                }
                            }, {
                                'match': {
                                    'viewAccessGroupList': '385'
                                }
                            }, {
                                'match': {
                                    'viewAccessGroupList': '386'
                                }
                            }, {
                                'match': {
                                    'viewAccessGroupList': '387'
                                }
                            }, {
                                'match': {
                                    'lbViewAccessGroupList': '1'
                                }
                            }, {
                                'match': {
                                    'lbViewAccessGroupList': '385'
                                }
                            }, {
                                'match': {
                                    'lbViewAccessGroupList': '386'
                                }
                            }, {
                                'match': {
                                    'lbViewAccessGroupList': '387'
                                }
                            }, {
                                'match': {
                                    'rlViewAccessGroupList': '1'
                                }
                            }, {
                                'match': {
                                    'rlViewAccessGroupList': '385'
                                }
                            }, {
                                'match': {
                                    'rlViewAccessGroupList': '386'
                                }
                            }, {
                                'match': {
                                    'rlViewAccessGroupList': '387'
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

export const VEHICLE_WITH_ACCESS_GROUPS_AND_VIN = {
    'query': {
        'bool': {
            'must': [{
                'match': {
                    'vin': '1gykngrs8jz146936'
                }
            }, {
                'bool': {
                    'should': [{
                        'match': {
                            'viewAccessGroupList': '1'
                        }
                    }, {
                        'match': {
                            'viewAccessGroupList': '385'
                        }
                    }, {
                        'match': {
                            'viewAccessGroupList': '386'
                        }
                    }, {
                        'match': {
                            'viewAccessGroupList': '387'
                        }
                    }, {
                        'match': {
                            'lbViewAccessGroupList': '1'
                        }
                    }, {
                        'match': {
                            'lbViewAccessGroupList': '385'
                        }
                    }, {
                        'match': {
                            'lbViewAccessGroupList': '386'
                        }
                    }, {
                        'match': {
                            'lbViewAccessGroupList': '387'
                        }
                    }, {
                        'match': {
                            'rlViewAccessGroupList': '1'
                        }
                    }, {
                        'match': {
                            'rlViewAccessGroupList': '385'
                        }
                    }, {
                        'match': {
                            'rlViewAccessGroupList': '386'
                        }
                    }, {
                        'match': {
                            'rlViewAccessGroupList': '387'
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
};

export const VEHICLE_WITH_NO_ACCESS_GROUPS_AND_VIN = {
    'query': {
        'bool': {
            'must': [{
                'match': {
                    'vin': '1gykngrs8jz146936'
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
};

export const VEHICLE_WITH_ACCESS_GROUPS_AND_PARTIAL_VIN = {
    'query': {
        'bool': {
            'must': [{
                'wildcard': {
                    'vin': '*146936'
                }
            }, {
                'bool': {
                    'should': [{
                        'match': {
                            'viewAccessGroupList': '1'
                        }
                    }, {
                        'match': {
                            'viewAccessGroupList': '397'
                        }
                    }, {
                        'match': {
                            'viewAccessGroupList': '398'
                        }
                    }, {
                        'match': {
                            'viewAccessGroupList': '399'
                        }
                    }, {
                        'match': {
                            'lbViewAccessGroupList': '1'
                        }
                    }, {
                        'match': {
                            'lbViewAccessGroupList': '397'
                        }
                    }, {
                        'match': {
                            'lbViewAccessGroupList': '398'
                        }
                    }, {
                        'match': {
                            'lbViewAccessGroupList': '399'
                        }
                    }, {
                        'match': {
                            'rlViewAccessGroupList': '1'
                        }
                    }, {
                        'match': {
                            'rlViewAccessGroupList': '397'
                        }
                    }, {
                        'match': {
                            'rlViewAccessGroupList': '398'
                        }
                    }, {
                        'match': {
                            'rlViewAccessGroupList': '399'
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
};
export const VEHICLE_WITH_ACCESS_GROUPS_AND_MAKE_MODEL = {
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
                        'bool': {
                            'should': [{
                                'match': {
                                    'viewAccessGroupList': '1'
                                }
                            }, {
                                'match': {
                                    'viewAccessGroupList': '397'
                                }
                            }, {
                                'match': {
                                    'viewAccessGroupList': '398'
                                }
                            }, {
                                'match': {
                                    'viewAccessGroupList': '399'
                                }
                            }, {
                                'match': {
                                    'lbViewAccessGroupList': '1'
                                }
                            }, {
                                'match': {
                                    'lbViewAccessGroupList': '397'
                                }
                            }, {
                                'match': {
                                    'lbViewAccessGroupList': '398'
                                }
                            }, {
                                'match': {
                                    'lbViewAccessGroupList': '399'
                                }
                            }, {
                                'match': {
                                    'rlViewAccessGroupList': '1'
                                }
                            }, {
                                'match': {
                                    'rlViewAccessGroupList': '397'
                                }
                            }, {
                                'match': {
                                    'rlViewAccessGroupList': '398'
                                }
                            }, {
                                'match': {
                                    'rlViewAccessGroupList': '399'
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

export const VEHICLE_WITH_ONE_ACCESS_GROUP_AND_MAKE_MODEL = {
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
                        'bool': {
                            'should': [{
                                'match': {
                                    'viewAccessGroupList': '267'
                                }
                            }, {
                                'match': {
                                    'lbViewAccessGroupList': '267'
                                }
                            }, {
                                'match': {
                                    'rlViewAccessGroupList': '267'
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

