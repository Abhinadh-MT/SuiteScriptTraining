/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(["N/log", "N/record"] /**
 * @param{log} log
 * @param{record} record
 */, (log, record) => {
  /**
   * Defines the function definition that is executed after record is submitted.
   * @param {Object} scriptContext
   * @param {Record} scriptContext.newRecord - New record
   * @param {Record} scriptContext.oldRecord - Old record
   * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
   * @since 2015.2
   */
  const beforeSubmit = (scriptContext) => {
    if (
      scriptContext.type !== scriptContext.UserEventType.CREATE
     
    ) {
      return;
    }
    const newRec = scriptContext.newRecord;
    try {
      const customerId = newRec.getValue({ fieldId: "entity" });
      const cutomerDetails = record.load({
        type: record.Type.CUSTOMER,
        id: customerId,
      });
      const salerep = cutomerDetails.getText({ fieldId: "salesrep" });
      log.debug(salerep);
      newRec.setValue({
        fieldId: "custbody_jj_customer_sales_rep",
        value: salerep,
      });
    } catch (error) {
      log.debug(error.message);
    }
  };

  return { beforeSubmit };
});
