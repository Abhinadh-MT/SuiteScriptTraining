/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/log', 'N/record'],
    /**
 * @param{log} log
 * @param{record} record
 */
    (log, record) => {
        
        /**
         * Defines the function that is executed when a POST request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body is passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const post = (requestBody) => {
            try{
                const newCustomer=record.create({
                    type:record.Type.CUSTOMER,
                    isDynamic:true
                })
                newCustomer.setValue({
                    fieldId:'companyname',
                    value:requestBody.companyname
                })
                 newCustomer.setValue({
                    fieldId:'subsidiary',
                    value:requestBody.subsidiary
                })
             const customerId = newCustomer.save();
             return{
                status:"done",
                cutomerid:customerId
             }
            }catch(error){
                log.debug(error.message)
                return({
                    status:"error",
                    message:error.message
                })
            }

        }

       

        return {post}

    });
