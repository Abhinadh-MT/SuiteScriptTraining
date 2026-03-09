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
  const afterSubmit = (scriptContext) => {
    if (scriptContext.type !== scriptContext.UserEventType.CREATE) {
      return;
    }

    const newRec = scriptContext.newRecord;
    const recType = newRec.type;

    log.debug({
      title: "Transaction Type",
      details: recType,
    });

    try {
      if (recType === record.Type.SALES_ORDER) {
        const customerId = newRec.getValue({ fieldId: "entity" });

        log.debug({
          title: "Customer ID",
          details: customerId,
        });

        if (customerId) {
          record.submitFields({
            type: record.Type.CUSTOMER,
            id: customerId,
            values: {
               custentity_jj_sales_order: true,
            },
            options: {
              enableSourcing: false,
              ignoreMandatoryFields: true,
            },
          });
        }
      }
      if (recType === record.Type.PURCHASE_ORDER) {
        const vendorId = newRec.getValue({ fieldId: "entity" });

        log.debug({
          title: "Vendor ID",
          details: vendorId,
        });

        if (vendorId) {
          record.submitFields({
            type: record.Type.VENDOR,
            id: vendorId,
            values: {
              custentity_jj_purchase_order: true,
            },
            options: {
              enableSourcing: false,
              ignoreMandatoryFields: true,
            },
          });
        }
      }
    } catch (e) {
      log.error({
        title: "Error Updating Entity",
        details: e,
      });
    }
  };

  return { afterSubmit };
});
