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
    var currentRecord = scriptContext.currentRecord;

    if (scriptContext.fieldId === "custbody_jj_checkbox") {
      let checkboxValue = currentRecord.getValue({
        fieldId: "custbody_jj_checkbox",
      });

      if (checkboxValue) {
        currentRecord.setValue({
          fieldId: "custbody_jj_textarea",
          value: "passed",
        });
      } else {
        currentRecord.setValue({
          fieldId: "custbody_jj_textarea",
          value: "failed",
        });
      }
    }
  }

  return {
    pageInit: pageInit,
    fieldChanged: fieldChanged,
  };
});
