/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/email', 'N/record', 'N/search'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{search} search
 */
    (email, record, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
           let salesOrderSearch = search.create({
        type: search.Type.SALES_ORDER,
        filters: [
            ['trandate','within','lastmonth']
        ],
        columns: [
            'trandate',
            'tranid',
            'salesrep',
            'total'
        ]
    });

    salesOrderSearch.run().each(result => {

        let soNumber = result.getValue({name:'tranid'});
        let soDate = result.getValue({name:'trandate'});
        let amount = result.getValue({name:'total'});
        let salesRepId = result.getValue({name:'salesrep'});

        // Load sales rep to get manager
        let salesRepRecord = record.load({
            type: record.Type.EMPLOYEE,
            id: salesRepId
        });

        let managerId = salesRepRecord.getValue({
            fieldId:'supervisor'
        });

        let body =
        "Sales Order Details (Previous Month)\n\n" +
        "Document Number : " + soNumber + "\n" +
        "Date : " + soDate + "\n" +
        "Amount : " + amount;

        email.send({
            author: salesRepId,      // sender = sales rep
            recipients: managerId || 31,   // recipient = sales manager
            subject: "Previous Month Sales Order : " + soNumber,
            body: body
        });

        return true;
    });
        }

        return {execute}

    });
