/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(["N/log", "N/record"], /**
 * @param{log} log
 * @param{record} record
 */
(log, record) => {
  /**
   * Defines the function that is executed when a GET request is sent to a RESTlet.
   * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
   *     content types)
   * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
   *     Object when request Content-Type is 'application/json' or 'application/xml'
   * @since 2015.2
   */
  const get = (requestParams) => {

        try {

            const salesOrderId = requestParams.salesorderid;

            if (!salesOrderId) {
                return {
                    status: "error",
                    message: "Sales Order ID is required"
                };
            }

            const soRecord = record.load({
                type: record.Type.SALES_ORDER,
                id: salesOrderId
            });

            const lineCount = soRecord.getLineCount({
                sublistId: 'item'
            });

            let itemDetails = [];

            for (let i = 0; i < lineCount; i++) {

                itemDetails.push({
                    itemName: soRecord.getSublistText({
                        sublistId: 'item',
                        fieldId: 'item',
                        line: i
                    }),
                    quantity: soRecord.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'quantity',
                        line: i
                    }),
                    rate: soRecord.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'rate',
                        line: i
                    }),
                    amount: soRecord.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'amount',
                        line: i
                    })
                });

            }

            let response = {
                salesOrderId: salesOrderId,
                items: itemDetails
            };

            if (lineCount > 2) {
                response.message = "Sales order contains more than 2 items";
            }

            return response;

        } catch (error) {

            log.error({
                title: "Error fetching sales order",
                details: error
            });

            return {
                status: "error",
                message: error.message
            };

        }

    };

  return { get };
});
