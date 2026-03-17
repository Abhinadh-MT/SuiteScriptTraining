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
      let salesOrderId = requestParams.salesOrderId;

      if (!salesOrderId) {
        return {
          status: "Error",
          message: "Sales Order is required",
        };
      }
      let soRecord = record.load({
        type: record.Type.SALES_ORDER,
        id: salesOrderId,
      });
      let salesOrderDetails = {
        id: soRecord.id,
        tranid: soRecord.getValue("tranid"),
        customer: soRecord.getText("entity"),
        date: soRecord.getValue("trandate"),
        total: soRecord.getValue("total"),
        status: soRecord.getText("status"),
      };
      return {
        status: "success",
        salesOrder: salesOrderDetails,
      };
    } catch (e) {
      log.error("Error", e.message);
      return {
        status: "Error",
        message: "Does not exist",
      };
    }
  };

  return { get };
});
