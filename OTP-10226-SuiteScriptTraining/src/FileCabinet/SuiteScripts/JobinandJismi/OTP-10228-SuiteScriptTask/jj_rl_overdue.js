/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(["N/log", "N/search"] /**
 * @param{log} log
 * @param{search} search
 */, (log, search) => {
  /**
   * Defines the function that is executed when a GET request is sent to a RESTlet.
   * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
   *     content types)
   * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
   *     Object when request Content-Type is 'application/json' or 'application/xml'
   * @since 2015.2
   */
  const get = (requestParams) => {
    const customerId = requestParams.customerid;

    if (!customerId) {
      return { message: "Customer ID is required" };
    }

    let overdueList = [];

    try {
      const invoiceSearch = search.create({
        type: search.Type.INVOICE,
        filters: [
          ["entity", "anyof", customerId],
          "AND",
          ["status", "anyof", "CustInvc:A"] ,
          "AND",
          ["duedate", "before", "today"],
        ],
        columns: ["entity", "duedate", "amountremaining"],
      });
     log.debug({
          title: "Customer Name",
          details:invoiceSearch ,
        });
      invoiceSearch.run().each((result) => {
        log.debug({
          title: "Customer Name",
          details: result.getText({ name: "entity" }),
        });
        overdueList.push({
          customerName: result.getText({ name: "entity" }),
          date: result.getValue({ name: "duedate" }),
          overdueBalance: result.getValue({ name: "amountremaining" }),
        });

        return true;
      });

      if (overdueList.length === 0) {
        return "No overdue";
      }

      return overdueList;
    } catch (error) {
      log.error({
        title: "Overdue Search Error",
        details: error,
      });

      return {
        message: error.message,
      };
    }
  };

  return { get };
});
