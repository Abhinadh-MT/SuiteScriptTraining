/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define(['N/currentRecord'], (currentRecord) => {
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
    
  }

    const submitFeedback = () => {

        const rec = currentRecord.get();

        const client = rec.getValue({
            fieldId: 'custpage_client_name'
        });

        const rating = rec.getValue({
            fieldId: 'custpage_rating'
        });

        const comments = rec.getValue({
            fieldId: 'custpage_comments'
        });

        alert(
            "Feedback Submitted\n" +
            "Client: " + client +
            "\nRating: " + rating +
            "\nComments: " + comments
        );
    };

    return {
        pageInit:pageInit,
        submitFeedback: submitFeedback
    };

});