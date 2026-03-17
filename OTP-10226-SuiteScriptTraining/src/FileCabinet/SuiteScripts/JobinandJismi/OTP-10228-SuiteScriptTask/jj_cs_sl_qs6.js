/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/search'],
/**
 * @param{search} search
 */
function(search) {
    
  

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

      try {
            const rec = scriptContext.currentRecord
 
           if (scriptContext.fieldId === 'custpage_subsidiary' || scriptContext.fieldId === 'custpage_customer') {

            const sub = rec.getValue('custpage_subsidiary') || '';
            const cust = rec.getValue('custpage_customer') || '';
            if (!sub && !cust) return;
            let url = window.location.href.split('?')[0];
            // url += '?custpage_subsidiary=' + sub + '&custpage_customer=' + cust;
            url += '?custpage_subsidiary=' + encodeURIComponent(sub) +
       '&custpage_customer=' + encodeURIComponent(cust);

            window.location.href = url;
        }
 
        } catch (error) {
            log.error({
                title: 'Client Script Error - fieldChanged',
                details: error
            });
 
            alert('An error occurred: ' + error.message);
        }
    };

   

    return {

        fieldChanged: fieldChanged,
      
    };
    
});
