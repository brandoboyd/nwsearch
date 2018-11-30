
// 	Module:				_field.ts
// 	Description:		Field-level recognition engine
// 	Also-see:
// 	Tab-stops:			4
// 	Author:				DR
// 	Language:			js
// 	Creation Date:		04/02/2018
// 	Description:
// 	Revisions:
//
//
//

import {_global, FieldConverter} from '../FieldConverter';

const cleanseConfig = require('./cleanse/CleanseConfig.ts');
const cleanseLogicMap = cleanseConfig.cleanseMaps;
const defaultValueMaps = cleanseConfig.defaultValueMaps;
const _ = require('lodash');

export class DataCleanser extends FieldConverter {

    cleanseRow(data: any, eventName: string) {
        this.preProcess(data, eventName); // Any preprocess prep works - Currently none.
        function checkDefaultValue(fieldName: string, recognizedValue: boolean) {
            if (fieldName in defaultValueMaps) {
                // If the field has unrecognized value, set it to default value.
                if (!data[fieldName] || ['unknown', 'others', 'other'].includes(data[fieldName].toString().toLowerCase()) || !recognizedValue) {
                    data[fieldName] = defaultValueMaps[fieldName];

                    // Special rules
                    // If trim came in blank or missing then set it to Base.
                    if (fieldName === 'trim' && data.hasOwnProperty('origTrim') && !data['origTrim']) {
                        data[fieldName] = 'Base';
                    }
                }
            }
        }

        // Not eligible for cleansing because no vehicle specific data exist.
        if (data.hasOwnProperty('nwVehicleId')) {
            // Use CleanseConfig file as a control file to cleanse fields.
            cleanseLogicMap.forEach((fieldConfig) => {
                let fieldName: string = fieldConfig.fieldName;
                // Do not add any new properties to payload except below cases. There are cases where a payload contains nVehicleId only Ex: bo_accepted. In those cases do not add any new fields to payload.
                if (!this.hasOwnPropertyCaseInsensitive(data, fieldName)) {
                    // trim(when make & model exist) or etc...
                    if (fieldName.toLowerCase() === 'trim' && this.hasOwnPropertyCaseInsensitive(data, 'make') && this.hasOwnPropertyCaseInsensitive(data, 'model')) {
                        data['trim'] = '';
                        // Let it execute the flow
                    } else {
                        return; // Continue to next field.
                    }
                }
                let fieldValue: string = data[fieldName];
                let result = this.cleanseField(fieldName, fieldValue, fieldConfig, data);
                let tempFieldValue = result[0];
                let recognizedValue = result[1];
                if (fieldConfig.fieldType === 'numeric') {
                    data[fieldName] = (tempFieldValue === undefined || tempFieldValue === null) ? -1 : parseFloat(tempFieldValue);
                } else {
                    data[fieldName] = (tempFieldValue === undefined || tempFieldValue === null) ? '' : tempFieldValue;
                }
                // Capitalize first char to get a origFieldName.
                data['orig' + fieldName.charAt(0).toUpperCase() + fieldName.substr(1)] = (fieldValue === undefined || fieldValue === null) ? '' : fieldValue;
                checkDefaultValue(fieldName, recognizedValue);
            });

            if (data.make !== undefined && data.model !== undefined) { // Set body Type.
                let fieldName = 'bodyType';
                let recognizedValue = false;
                data.bodyType = _global.getBodyStylesForMakeModelTrim(data.make, data.model, data.trim);
                if (data.bodyType != null && data.bodyType !== undefined && data.bodyType !== '') {
                    recognizedValue = true;
                }
                checkDefaultValue(fieldName, recognizedValue);
            }
        }
        this.postProcess(data, eventName);
        return data;
    }

    private preProcess(data: any, eventName: string) {
    }

    private postProcess(data: any, eventName: string) {
        // Set default values for blank or missing fields.
        // Adesa Offsite vehicles
        if ((data.processingLocation === undefined || data.processingLocation === '')
            && (eventName === 'vehicle_added_inventory' || eventName === 'vehicle_updated_inventory')) {
            data.processingLocation = 'other';
            data.origProcessingLocation = '';
        }

        if (data.vehicleGrade !== undefined && data.vehicleGrade !== null && data.vehicleGrade !== '') {
            data.gradeType = 'vehicleGrade';
            data.gradeValue = parseFloat(data.vehicleGrade);
        }
        if (data.autoGradeValue !== undefined && data.autoGradeValue !== null && data.autoGradeValue !== '') {
            data.gradeType = 'autoGradeValue';
            data.gradeValue = parseFloat(data.autoGradeValue);
        }
        if (data.hasOwnProperty('autoGradeValue') || data.hasOwnProperty('vehicleGrade')) {
            if ((data.autoGradeValue === undefined || data.autoGradeValue === null || data.autoGradeValue === '') && (data.vehicleGrade === undefined || data.vehicleGrade === null || data.vehicleGrade === '')) {
                data.gradeType = '';
                data.gradeValue = null;
            }
        }

        // Modify viewAccessGroupList field to Array
        if (data.viewAccessGroupList && data.viewAccessGroupList !== 'undefined') {
            data.viewAccessGroupList = JSON.parse('[' + data.viewAccessGroupList.toString() + ']');
        }
        if (data.lbViewAccessGroupList) {
            data.lbViewAccessGroupList = JSON.parse('[' + data.lbViewAccessGroupList.toString() + ']');
        }
        if (data.rlViewAccessGroupList) {
            data.rlViewAccessGroupList = JSON.parse('[' + data.rlViewAccessGroupList.toString() + ']');
        }

    }

    private hasOwnPropertyCaseInsensitive(obj, property) {
        let props = [];
        for (let i in obj) if (obj.hasOwnProperty(i)) props.push(i);
        let prop;
        while (prop = props.pop()) if (prop.toLowerCase() === property.toLowerCase()) return true;
        return false;
    }
}



