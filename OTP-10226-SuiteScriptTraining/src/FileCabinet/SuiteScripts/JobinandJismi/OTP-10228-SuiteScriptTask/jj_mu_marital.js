/**
 /**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the Mass Update trigger point.
         * @param {Object} params
         * @param {string} params.type - Record type of the record being processed
         * @param {number} params.id - ID of the record being processed
         * @since 2016.1
         */
        const each = (params) => {
            let merital=record.load({
                type:params.type,
                id:params.id 
            })
               merital.setValue({
                fieldId: 'custrecord_jj_maritalstatus',
                value: 2
            });
 
            merital.save();

        }

        return {each}

    });
