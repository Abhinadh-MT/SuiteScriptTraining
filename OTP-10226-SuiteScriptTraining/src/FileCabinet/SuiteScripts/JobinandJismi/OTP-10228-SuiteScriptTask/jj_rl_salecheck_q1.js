/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/log', 'N/search'],
    /**
 * @param{log} log
 * @param{search} search
 */
    (log, search) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {

        
        const salesId = requestParams.salesid;

      
        try {

            const result = search.lookupFields({
                type: search.Type.SALES_ORDER,
                id: salesId,
                columns: ['entity', 'total', 'status', 'trandate']
            });

            if (!result) {
                return {
                    message: "Does not exist"
                };
            }

            return {
                id: salesId,
                customer: result,
                total: result.total,
                status: result.status,
                date: result.trandate
            };

        } catch (e) {

            return {
                message: "Sales Order does not exist with ID: " + salesId,
                error: e.message
            };

        }

    };


      

        return {get}

    });
