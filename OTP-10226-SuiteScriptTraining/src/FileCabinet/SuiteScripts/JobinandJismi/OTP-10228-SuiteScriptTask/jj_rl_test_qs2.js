/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(["N/log", "N/record"] /**
 * @param{log} log
 * @param{record} record
 */, (log, record) => {
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
    if (!requestBody.pid) {
      return {
        status: "error",
        message: "purchase order  id is required",
      };
    }
    try {
      record.submitFields({
        type: record.Type.PURCHASE_ORDER,
        id: requestBody.pid,
        values: {
          employee:requestBody.employee,
          memo: requestBody.memo,
          location: requestBody.location,
        },
      });
      return {
        status: "success",
        message: "Purchase order record updated successfully",
      };
    } catch (error) {
      log.debug(error.message);
    }
  };

  return { put };
});
