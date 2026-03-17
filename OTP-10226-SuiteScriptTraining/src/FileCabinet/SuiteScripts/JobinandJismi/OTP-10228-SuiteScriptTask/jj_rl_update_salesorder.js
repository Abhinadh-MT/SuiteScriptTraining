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
   * Defines the function that is executed when a PUT request is sent to a RESTlet.
   * @param {string | Object} requestBody - The HTTP request body; request body are passed as a string when request
   *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
   *     the body must be a valid JSON)
   * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
   *     Object when request Content-Type is 'application/json' or 'application/xml'
   * @since 2015.2
   */
  const put = (requestBody) => {
    if (!requestBody.salesorderid) {
      return {
        status: "error",
        message: "Sales Order ID is required",
      };
    }
    try {
      record.submitFields({
        type: record.Type.SALES_ORDER,
        id: requestBody.salesorderid,
        values: {
          memo: requestBody.memo,
          salesrep: requestBody.salesrep,
        },
      });
      return {
        status: "success",
        message: "Sales Order updated successfully",
      };
    } catch (error) {
      
            log.error({
                title: "Update Error",
                details: error
            });

            return {
                status: "error",
                message: error.message
            };
    }
  };

  return { put };
});
