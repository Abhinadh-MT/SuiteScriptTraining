/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(["N/log"], /**
 * @param{log} log
 */
function (log) {
  /**
   * Function to be executed after page is initialized.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
   *
   * @since 2015.2
   */
  function pageInit(scriptContext) {}

  /**
   * Function to be executed after line is selected.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @param {string} scriptContext.sublistId - Sublist name
   *
   * @since 2015.2
   */
  function lineInit(scriptContext) {
    try {
        if (scriptContext.sublistId !== "item") {
        return true;
      }
      console.log('lineint')
      let rec = scriptContext.currentRecord;
      let checked = rec.getCurrentSublistValue({
        sublistId: "item",
        fieldId: "custcol_jj_amount_calculation",
      });
       log.debug({
        title: "line init",
        details:checked ,
      });
      let rate = rec.getCurrentSublistValue({
        sublistId: "item",
        fieldId: "rate",
      });
      let quantity = rec.getCurrentSublistValue({
        sublistId: "item",
        fieldId: "quantity",
      });
      if (checked) {
        let amountValue = rate * quantity;
        rec.setCurrentSublistValue({
          sublistId: "item",
          fieldId: "amount",
          value: amountValue,
        });
      } else {
        let amountValue = (rate * quantity) / 2;
        rec.setCurrentSublistValue({
          sublistId: "item",
          fieldId: "amount",
          value: amountValue,
        });
      }
    } catch (error) {
      log.debug({
        title: "Error in line",
        details: error.message,
      });
    }
  }

  /**
   * Validation function to be executed when sublist line is committed.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @param {string} scriptContext.sublistId - Sublist name
   *
   * @returns {boolean} Return true if sublist line is valid
   *
   * @since 2015.2
   */
  function validateLine(scriptContext) {
    try {
      if (scriptContext.sublistId !== "item") {
        return true;
      }
      let rec = scriptContext.currentRecord;
      let checked = rec.getCurrentSublistValue({
        sublistId: "item",
        fieldId: "custcol_jj_amount_calculation",
      });
    
      let rate = rec.getCurrentSublistValue({
        sublistId: "item",
        fieldId: "rate",
      });
      let quantity = rec.getCurrentSublistValue({
        sublistId: "item",
        fieldId: "quantity",
      });
      if (checked) {
        let amountValue = (rate * quantity) / 2;
        rec.setCurrentSublistValue({
          sublistId: "item",
          fieldId: "amount",
          value: amountValue,
        });
      
      } else {
      
          let amountValue = rate * quantity;
        rec.setCurrentSublistValue({
          sublistId: "item",
          fieldId: "amount",
          value: amountValue,
        });
      }

      return true;
    } catch (error) {
      log.debug({
        title: "Error in validateLine",
        details: error.message,
      });
      return false;
    }
  }

  return {
    pageInit: pageInit,
    lineInit: lineInit,
    validateLine: validateLine,
  };
});
