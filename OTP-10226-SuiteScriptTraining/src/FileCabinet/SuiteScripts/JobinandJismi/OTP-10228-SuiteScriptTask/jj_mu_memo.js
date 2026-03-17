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

        try {
 
            var salesOrder = record.load({
                type: record.Type.SALES_ORDER,
                id: params.id
            });
 
            salesOrder.setValue({
                fieldId: 'memo',
                value: 'Sales Orders Memo updated'
            });
 
            salesOrder.save();
 
            log.debug('Updated Sales Order', params.id);
 
        } catch (e) {
 
            log.error('Error updating record', e);
        }
    }

        return {each}

    });
