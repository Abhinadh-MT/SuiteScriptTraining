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
             const newSales=record.create({
                type:record.Type.SALES_ORDER,
                isDynamic:true
            })
            newSales.setValue({
                fieldId:'entity',
                value:requestBody.entityid
            })
             newSales.setValue({
                fieldId:'subsidiary',
                value:requestBody.subsidiary
            })
             newSales.setValue({
                fieldId:'location',
                value:requestBody.location
            })

          requestBody.lineItem.forEach(r=>{
            newSales.selectNewLine({
                sublistId:'item'
            })
            newSales.setCurrentSublistValue({sublistId:'item',fieldId:'item',value:r.itemId})
            newSales.setCurrentSublistValue({sublitId:'item',fieldId:'quantity',value:r.quantity})
            newSales.commitLine({sublistId:'item'})

          })
          const salesId=newSales.save()
          return `sales order id is ${salesId}`
        }catch(error){
            log.debug(error.message)
        }


        }

     

        return {post}

    });
