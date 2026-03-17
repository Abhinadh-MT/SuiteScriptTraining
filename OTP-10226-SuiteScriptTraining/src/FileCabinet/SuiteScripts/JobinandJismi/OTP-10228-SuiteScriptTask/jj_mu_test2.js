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
      let studentDetails = record.load({
        type: params.type,
        id: params.id,
      });
      log.debug('main obj',studentDetails)
      let classId= studentDetails.getValue({ fieldId: "custrecord_jj_class" })
      log.debug('class id',classId)
        if (classId===10) {
            log.debug('helo')
          studentDetails.setValue({ fieldId: "custrecord_jj_class", value: 11 });
        } else if(classId!==11) {

          studentDetails.setValue({ fieldId: "custrecord_jj_class", value: Number(classId) + 1 });
        }
        studentDetails.save();
  
    } catch (error) {
      log.debug(error.message);
    }
  };

  return { each };
});
