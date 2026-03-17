/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/log'],
 
function(log) {
   
/**
 * Function to be executed after page is initialized.
 *
 * @param {Object} scriptContext
 * @param {Record} scriptContext.currentRecord - Current form record
 * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
 *
 * @since 2015.2
 */
  const pageInit = (context) => {
        const rec = context.currentRecord;
 
        console.log('Page Init Triggered');
 
        const apply = rec.getValue({
            fieldId: 'custentity_jj_apply_coupan'
        });
 
        const couponField = rec.getField({
            fieldId: 'custentity_jj_coupon_code'
        });
 
        if (!apply) {
            console.log('Apply Coupon is unchecked → disabling Coupon Code');
            couponField.isDisabled = true;
        } else {
            console.log('Apply Coupon is checked → enabling Coupon Code');
            couponField.isDisabled = false;
        }
    };
 
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
 const fieldChanged = (scriptContext) => {
        const rec = scriptContext.currentRecord;
        const fieldId = scriptContext.fieldId;
 
        console.log('Field Changed Triggered:', fieldId);
 
        if (fieldId === 'custentity_jj_apply_coupon') {
 
            const apply = rec.getValue({
                fieldId: 'custentity_jj_apply_coupon'
            });
 
            console.log('Apply Coupon Value:', apply);
 
            const couponField = rec.getField({
                fieldId: 'custentity_jj_coupon_code'
            });
 
            if (apply) {
 
                console.log('Action: Enabling Coupon Code Field');
 
                couponField.isDisabled = false;
 
            } else {
 
                console.log('Action: Disabling Coupon Code Field and Clearing Value');
 
                rec.setValue({
                    fieldId: 'custentity_jj_coupon_code',
                    value: ''
                });
 
                couponField.isDisabled = true;
            }
        }
    };
 
 
    const saveRecord = (scriptContext) => {
 
        const rec = scriptContext.currentRecord;
 
        const apply = rec.getValue({
            fieldId: 'custentity_jj_apply_coupan'
        });
 
        const code = rec.getValue({
            fieldId: 'custentity_jj_coupon_code'
        });
 
        console.log('Save Record Triggered');
        console.log('Apply Coupon:', apply);
        console.log('Coupon Code:', code);
 
        if (apply && (!code || code.length !== 5)) {
 
            console.log('Validation Failed: Coupon code must be 5 characters');
 
            alert('Coupon Code must be exactly 5 characters!');
 
            return false;
        }
 
        console.log('Validation Passed: Record will be saved');
 
        return true;
    };
 
    return {
        fieldChanged,
        saveRecord,
        pageInit
    };
 
});