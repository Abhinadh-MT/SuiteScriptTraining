/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(["N/log", "N/search"] /**
 * @param{log} log
 * @param{search} search
 */, function (log, search) {
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
    log.debug("this is debug");
    console.log("he there");
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
      let itemId = rec.getCurrentSublistValue({
        sublistId: "item",
        fieldId: "item",
      });
      let itemValue = search.lookupFields({
    type: search.Type.INVENTORY_ITEM,
    id: itemId, 
    columns: [
        'custitem_jj_length',
        'custitem_jj_breadth',
        'custitem_jj_height'
    ]
});
     
      log.debug("itemValue", itemValue);
      console.log("itemValue", itemValue);
      let length = itemValue.custitem_jj_length;
      let breadth = itemValue.custitem_jj_breadth;
      let height = itemValue.custitem_jj_height;

        let containerBox = length * breadth * height;
        rec.setCurrentSublistValue({
          sublistId: "item",
          fieldId: "custcol_jj_container_box",
          value: containerBox,
        });
        let rate = rec.getCurrentSublistValue({
          sublistId: "item",
          fieldId: "rate",
        });

        let amount = rec.getCurrentSublistValue({
          sublistId: "item",
          fieldId: "amount",
        });
        if (amount !== rate * containerBox) {
          alert("Amount must be Rate x Container Box");
          return false;
        }
      return true;
    } catch (error) {
      log.debug(error.message);
    }
  }

  return {
    pageInit: pageInit,
    validateLine: validateLine,
  };
});
