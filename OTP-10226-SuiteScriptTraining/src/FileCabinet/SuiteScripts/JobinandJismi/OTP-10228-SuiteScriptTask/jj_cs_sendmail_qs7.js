/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(["N/email", "N/log", "N/record", "N/runtime"], /**
 * @param{email} email
 * @param{log} log
 * @param{record} record
 * @param{runtime} runtime
 */
function (email, log, record, runtime) {
        /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {

    }

  /**
   * Function to be executed when field is changed.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @param {string} scriptContext.sublistId - Sublist name
   * @param {string} scriptContext.fieldId - Field name
   * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
   * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
   *
   * @since 2015.2
   */
  function fieldChanged(scriptContext) {
    let rec = scriptContext.currentRecord;
   
  
    if (
      scriptContext.sublistId === "item" &&
      scriptContext.fieldId === "quantity"
    ) {
        try{
       console.log(scriptContext.lineNum)
      let line = scriptContext.lineNum; 
      console.log('line item',line)
      log.debug(line)
      let itemId = rec.getSublistValue({
        sublistId: "item",
        fieldId: "item",
        line: line,
      });
      console.log(' item',itemId)

      let oldQuantity = scriptContext.oldRecord.getSublistValue({
        sublistId: "item",
        fieldId: "quantity",
        line: line,
      });

      let newQuantity = rec.getSublistValue({
        sublistId: "item",
        fieldId: "quantity",
        line: line,
      });

      // Check if the quantity has changed
      if (oldQuantity !== newQuantity) {
        // Get the item name
        let itemName = rec.getSublistText({
          sublistId: "item",
          fieldId: "item",
          line: line,
        });

        let poId = rec.id; 
        let vendorId = rec.getValue({ fieldId: "entity" });
        let vendorEmail = getVendorEmail(vendorId); 

        let subject = "The quantity updated in the PO: " + poId;
        let body =
          "Dear Vendor,\n\n" +
          "The quantity for item " +
          itemName +
          " has been updated in Purchase Order " +
          poId +
          ".\n" +
          "Old Quantity: " +
          oldQuantity +
          "\n" +
          "Updated Quantity: " +
          newQuantity +
          "\n\n" +
          "Best regards,\n" +
          "Your Company Name";

        // Send email to the vendor
        sendEmail(vendorEmail, subject, body);
      }
    }catch(error){
        log.debug(error.message)
    }
    }
  }

  /**
   * Fetch the vendor's email using the vendor's internal ID.
   *
   * @param {number} vendorId - Internal ID of the vendor.
   * @returns {string} - Vendor's email address.
   */
  function getVendorEmail(vendorId) {
    let vendorRecord = record.load({
      type: record.Type.VENDOR,
      id: vendorId,
    });

    return vendorRecord.getValue({ fieldId: "email" });
  }

  /**
   * Function to send the email.
   *
   * @param {string} recipient - Email address of the recipient.
   * @param {string} subject - Subject of the email.
   * @param {string} body - Body content of the email.
   */
  function sendEmail(recipient, subject, body) {
    try {
      email.send({
        author: runtime.getCurrentUser().id, // Sender: Admin (current user)
        recipients: recipient, // Recipient: Vendor email
        subject: subject,
        body: body,
      });
      log.debug("Email sent", "The email has been sent successfully.");
    } catch (error) {
      log.error("Error sending email", error.message);
    }
  }

  return {
    pageInit: pageInit,
    fieldChanged: fieldChanged,
  };
});
