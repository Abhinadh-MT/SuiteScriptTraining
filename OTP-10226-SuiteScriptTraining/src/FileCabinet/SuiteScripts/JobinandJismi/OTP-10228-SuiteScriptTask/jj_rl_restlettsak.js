/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {
            try{
                let getSales=record.load({
                    type:record.Type.SALES_ORDER,
                    id:requestParams.salesid
                })
                let details ={}
                if(getSales){
                 details = {
                id: getSales.id,
                customer: getSales.getText({ fieldId: 'entity' }),
                total: getSales.getValue({ fieldId: 'total' }),
                status: getSales.getText({ fieldId: 'status' }),
                date: getSales.getValue({ fieldId: 'trandate' })
            };
                }
               
                return details
            }
            catch(error){
                return "Does not exist";
            }

        }

        

        return {get}

    });
