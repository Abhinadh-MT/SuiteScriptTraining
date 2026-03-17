/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/record'],
    /**
 * @param{log} log
 * @param{record} record
 */
    (log, record) => {
   

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {
            
 if (
            scriptContext.type !== scriptContext.UserEventType.CREATE &&
            scriptContext.type !== scriptContext.UserEventType.EDIT
        ) {
            return;
        }

        try {

            const rec = scriptContext.newRecord;

            // get customer name
            const name =
                rec.getValue({ fieldId: 'entityid' }) ||
                rec.getValue({ fieldId: 'companyname' });

            if (!name) return;

            // first 2 characters
            const firstTwo = name.substring(0, 2);

            // get created date
            const createdDate = rec.getValue({ fieldId: 'datecreated' });

            if (!createdDate) return;

            const month = new Date(createdDate).getMonth() + 1;

            const formattedMonth = month.toString().padStart(2, '0');

            const shortName = `${firstTwo}:${formattedMonth}`;

            // set short name
            rec.setValue({
                fieldId: 'custentity_jj_shortname',
                value: shortName
            });

        } catch (e) {

            log.error({
                title: 'Short Name Error',
                details: e
            });

        }
    };

        return { afterSubmit}

    });
