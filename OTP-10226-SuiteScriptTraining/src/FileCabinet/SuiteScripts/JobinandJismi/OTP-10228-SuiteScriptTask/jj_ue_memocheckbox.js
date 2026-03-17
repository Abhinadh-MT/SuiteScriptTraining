/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(["N/log", "N/record"], /**
 * @param{log} log
 * @param{record} record
 */
(log, record) => {
  /**
   * Defines the function definition that is executed before record is submitted.
   * @param {Object} scriptContext
   * @param {Record} scriptContext.newRecord - New record
   * @param {Record} scriptContext.oldRecord - Old record
   * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
   * @since 2015.2
   */
  const beforeSubmit = (scriptContext) => {
    if (
      scriptContext.type !== scriptContext.UserEventType.CREATE &&
      scriptContext.type !== scriptContext.UserEventType.EDIT
    ) {
      return;
    }
    const newRec = scriptContext.newRecord;
    const recType = newRec.type;
    try {
      if (recType === record.Type.SALES_ORDER) {
        if (newRec.getValue({ fieldId: "custbody_jj_memoupdated" })) {
          newRec.setValue({ fieldId: "memo", value: "memo updated" });
        }
      }
    } catch (error) {
      log.debug(error.message);
    }
  };

  return { beforeSubmit };
});
