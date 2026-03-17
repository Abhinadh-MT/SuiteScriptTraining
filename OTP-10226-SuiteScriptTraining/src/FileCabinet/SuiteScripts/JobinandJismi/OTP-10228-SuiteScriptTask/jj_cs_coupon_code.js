/**
 * @NApiVersion 2.X
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/log', 'N/record'],
/**
 * @param{log} log
 * @param{record} record
 */
function(log, record) {
    
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
        console.log("Testing")
        log.debug('feild id'+scriptContext.fieldId)
        if (scriptContext.fieldId === "custentity_jj_apply_coupon") {
            console.log('entered the if stmt')

        let cutRec = scriptContext.currentRecord;
        try {
        let check = cutRec.getValue({ fieldId: "custentity_jj_apply_coupon" });
        console.log("feild value" + check);
        let coupon = cutRec.getField({ fieldId: "custentity_jj_coupon_code" });
         log.debug('feild id'+check)
        if (check) {
            coupon.isDisabled = false;
        } else {
            coupon.isDisabled = true;
        }
        cutRec.setValue({
            fieldId: "custentity_jj_coupon_code",
            value: "",
        });
        } catch (error) {
        log.debug(error.message);
       }
   }

    }

    /**
     * Validation function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @returns {boolean} Return true if field is valid
     *
     * @since 2015.2
     */
    function validateField(scriptContext) {
      

return true

    }

    

    return {
        fieldChanged: fieldChanged,
   
      //  validateField: validateField,
       
    };
    
});
