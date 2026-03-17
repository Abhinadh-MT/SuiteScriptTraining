/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/email', 'N/record'],
    /**
 * @param{email} email
 * @param{record} record
 */
    (email, record) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            try{
                 let body = "Open Invoice Details\n\n";

    let invoiceSearch = search.create({
        type: search.Type.INVOICE,
        filters:[
            ['status','anyof','CustInvc:A'] // Open invoices
        ],
        columns:[
            'entity',
            'tranid'
        ]
    });

    invoiceSearch.run().each(result=>{

        let customer = result.getText({name:'entity'});
        let invoiceNo = result.getValue({name:'tranid'});

        body += "Customer : " + customer + "\n";
        body += "Invoice Number : " + invoiceNo + "\n\n";

        return true;
    });

    // Administrator id (usually 3 in many accounts)
    // let adminId = runtime.getCurrentUser().id;

    email.send({
        author: -5,
        recipients: -5,
        subject: "Open Invoice Report",
        body: body
    });

    log.debug("Email Sent","Open invoice report sent to Administrator");



            }catch(error){
                log.debug(error)
            }
        }

        return {execute}

    });
