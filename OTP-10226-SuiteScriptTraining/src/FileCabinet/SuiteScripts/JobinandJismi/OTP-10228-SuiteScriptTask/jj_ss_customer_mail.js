/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/record', 'N/runtime', 'N/search'],
    /**
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (record, runtime, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
try{
 
    log.debug("Script Started","Sending emails to customers");
 
    // Create customer search
    const customerSearch = search.create({
        type: search.Type.CUSTOMER,
        filters: [
            ['subsidiary','anyof','1'],  
            'AND',
            ['entityid','startswith','XYZ']
        ],
        columns: [
            'entityid',
            'email'
        ]
    });
 
    customerSearch.run().each((result)=>{
 
        const customerName = result.getValue('entityid');
        const customerEmail = result.getValue('email');
 
        log.debug("Customer Found", customerName);
 
        if(customerEmail){
 
            email.send({
                author: 34, //employ internal id
                recipients: customerEmail,
                subject: 'Daily Notification',
                body: 'Hello ' + customerName + ', this is your daily email notification.'
            });
 
            log.debug("Email Sent To", customerEmail);
 
        }
 
        return true;
    });
 
}
catch(error){
 
    log.error("Error Occurred",error);
 
}
 
};

        return {execute}

    });
