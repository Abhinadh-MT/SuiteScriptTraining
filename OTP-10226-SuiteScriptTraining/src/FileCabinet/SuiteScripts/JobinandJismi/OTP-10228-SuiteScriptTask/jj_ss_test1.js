/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(["N/email", "N/search"] /**
 * @param{email} email
 * @param{search} search
 */, (email, search) => {
  /**
   * Defines the Scheduled script trigger point.
   * @param {Object} scriptContext
   * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
   * @since 2015.2
   */
  const execute = (scriptContext) => {
    try {
      let emailBody = "Open Invoice Report\n\n";
    
      const invoiceSearch = searchInvoice();
      invoiceSearch.run().each((result) => {
        let customerName = result.getText("entity");
        let invoiceNumber = result.getValue("tranid");

        emailBody +=
          "Customer: " + customerName + " | Invoice: " + invoiceNumber + "\n";

        return true;
      });

      log.debug("Email Body", emailBody);
      let adminId = -5;
      email.send({
        author: adminId,
        recipients: -5,
        subject: " Invoice Report",
        body: emailBody,
      });
    } catch (error) {
      log.debug(error);
    }
  };

  /**
   * @returns{object}- containing all the open invoices detials
   *
   */
  function searchInvoice() {
    try {
      const invoiceSearch = search.create({
        type: search.Type.INVOICE,
        filters: [
          ["status", "anyof", "CustInvc:A"], // Open invoices
        ],
        columns: ["entity", "tranid"],
      });
      return invoiceSearch;
    } catch (error) {
      log.debug(error.message);
    }
  }

  return { execute };
});
