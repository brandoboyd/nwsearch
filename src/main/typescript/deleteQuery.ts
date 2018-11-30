let moment = require('moment');
export let timeStamp_30days = moment().subtract(1, 'months').valueOf();
export let timeStamp_31days = moment().subtract(1, 'months').subtract(1, 'days').valueOf();

export const DELETE_VEHICLE_STATUS = {
'query': {
    'bool': {
        'should': [{
            'bool': {
                'must': [{
                    'match': {
                        'vehicleStatus.keyword': 'Sold'
                    }
                },
                    { 'range': { 'originTimestamp': {  'gte': timeStamp_31days, 'lte' : timeStamp_30days }}}]
            }
        }, {
            'bool': {
                'must': [{
                    'match': {
                        'vehicleStatus.keyword': 'AMS Sold'
                    }
                },
                    { 'range': { 'originTimestamp': { 'gte': timeStamp_31days, 'lte' : timeStamp_30days  }}}]
            }
        }, {
            'bool': {
                'must': [{
                    'match': {
                        'vehicleStatus.keyword': 'Closed'
                    }
                },
                    { 'range': { 'originTimestamp': { 'gte': timeStamp_31days, 'lte' : timeStamp_30days  }}}]
            }
        }, {
            'bool': {
                'must': [{
                    'match': {
                        'vehicleStatus.keyword': 'Void'
                    }
                },
                    { 'range': { 'originTimestamp': {  'gte': timeStamp_31days, 'lte' : timeStamp_30days }}}]
            }
        }, {
            'bool': {
                'must': [{
                    'match': {
                        'vehicleStatus.keyword': 'AMS Void'
                    }
                },
                    { 'range': { 'originTimestamp': { 'gte': timeStamp_31days, 'lte' : timeStamp_30days  }}}]
            }
        }, {
            'bool': {
                'must': [{
                    'match': {
                        'vehicleStatus.keyword': 'AMS IF Sale'
                    }
                },
                    { 'range': { 'originTimestamp': { 'gte': timeStamp_31days, 'lte' : timeStamp_30days  }}}]
            }
        }, {
            'bool': {
                'must': [{
                    'match': {
                        'vehicleStatus.keyword': 'Seller removed vehicle'
                    }
                },
                    { 'range': { 'originTimestamp': {  'gte': timeStamp_31days, 'lte' : timeStamp_30days }}}]
            }
        }, {
            'bool': {
                'must': [{
                    'match': {
                        'vehicleStatus.keyword': 'OPENLANE removed vehicle'
                    }
                },
                    { 'range': { 'originTimestamp': { 'gte': timeStamp_31days, 'lte' : timeStamp_30days  }}}]
            }
        }, {
            'bool': {
                'must': [{
                    'match': {
                        'vehicleStatus.keyword': 'Auction roll off'
                    }
                },
                    { 'range': { 'originTimestamp': { 'gte': timeStamp_31days, 'lte' : timeStamp_30days  }}}]
            }
        }, {
            'bool': {
                'must': [{
                    'match': {
                        'vehicleStatus.keyword': 'Sold at physical auction'
                    }
                },
                    { 'range': { 'originTimestamp': { 'gte': timeStamp_31days, 'lte' : timeStamp_30days  }}}]
            }
        }]
    }
}
};
