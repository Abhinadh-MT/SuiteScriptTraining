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
   * Defines the function that is executed when a DELETE request is sent to a RESTlet.
   * @param {Object} requestParams - Parameters from HTTP request URL; parameters are passed as an Object (for all supported
   *     content types)
   * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
   *     Object when request Content-Type is 'application/json' or 'application/xml'
   * @since 2015.2
   */
  const doDelete = (requestParams) => {
    if (!requestParams.vendorId) {
      return {
        message: "vendor id required",
      };
    }
    try {
      record.delete({
        type: record.Type.VENDOR,
        id: requestParams.vendorId,
      });
      return {
        status: "done",
        message: "vendor deleted",
      };
    } catch (error) {
      return {
        status: "error",
        message: error.message,
      };
    }
  };

  return { delete: doDelete };
});
