module.exports = {
    validateData: function(data) {
        return true;
        // Check if the event has originVehicleId field. This will be changed to nwVehicleID.
        // return data.originVehicleId !== null
        //     && data.originVehicleId !== undefined
        //     && data.originVehicleId !== '';
    }
};
