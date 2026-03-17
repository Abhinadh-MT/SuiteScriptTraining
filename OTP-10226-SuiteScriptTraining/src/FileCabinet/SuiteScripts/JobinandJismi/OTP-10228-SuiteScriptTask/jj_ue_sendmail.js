/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(["N/email", "N/log", "N/runtime"], /**
 * @param{email} email
 * @param{log} log
 * @param{runtime} runtime
 */
(email, log, runtime) => {
  /**
   * Defines the function definition that is executed after record is submitted.
   * @param {Object} scriptContext
   * @param {Record} scriptContext.newRecord - New record
   * @param {Record} scriptContext.oldRecord - Old record
   * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
   * @since 2015.2
   */
  const afterSubmit = (scriptContext) => {
    try {
      const rec = scriptContext.newRecord;
      const recType = rec.type;
      const recId = rec.id;

      const userId = runtime.getCurrentUser().id;

      let entityName = "";
      let subject = "";
      let body = "";

      // RECORD CREATED
      if (scriptContext.type === scriptContext.UserEventType.CREATE) {
        entityName = rec.getValue({ fieldId: "companyname" }) || "";
        log.debug({
            title:"Entity Name: ",
            details: entityName});

        subject = "Record Created";

        body =
          "Record created\n\n" +
          "Entity Type: " +
          recType +
          "\n" +
          "Internal ID: " +
          recId +
          "\n" +
          "Name: " +
          entityName;
      }

      // RECORD DELETED
      if (scriptContext.type === scriptContext.UserEventType.DELETE) {
        subject = "Record Deleted";

        body =
          "Record deleted\n\n" +
          "Entity Type: " +
          recType +
          "\n" +
          "Internal ID: " +
          recId;
            
      }

      if (subject) {
        email.send({
          author: 31, 
          recipients: userId,
          subject: subject,
          body: body,
        });
      }
    } catch (e) {
      log.error({
        title: "Email Error",
        details: e,
      });
    }
  };

  return {  afterSubmit };
});
