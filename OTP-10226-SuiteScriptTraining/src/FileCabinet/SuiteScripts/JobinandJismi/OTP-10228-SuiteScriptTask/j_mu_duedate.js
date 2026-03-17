/**
 /**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */
define(["N/record"], /**
 * @param{record} record
 */
(record) => {
  /**
   * Defines the Mass Update trigger point.
   * @param {Object} params
   * @param {string} params.type - Record type of the record being processed
   * @param {number} params.id - ID of the record being processed
   * @since 2016.1
   */
  const each = (params) => {
    try {
      let invoiceRecord = record.load({
        type: record.Type.INVOICE,
        id: context.id,
      });

      let oldDueDate = invoiceRecord.getValue({
        fieldId: "duedate",
      });

      // Calculate new due date (example: extend by 7 days)
      let newDate = new Date();
      newDate.setDate(newDate.getDate() + 7);

      invoiceRecord.setValue({
        fieldId: "duedate",
        value: newDate,
      });

      invoiceRecord.save();

      log.debug("Updated Invoice", context.id);
    } catch (error) {
      log.error("Error updating invoice", error.message);
    }
  };

  return { each };
});
