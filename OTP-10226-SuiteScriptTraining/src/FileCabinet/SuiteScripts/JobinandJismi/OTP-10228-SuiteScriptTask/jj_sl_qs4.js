/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(["N/record", "N/ui/serverWidget"] /**
 * @param{record} record
 * @param{serverWidget} serverWidget
 */, (record, serverWidget) => {
  /**
   * Defines the Suitelet script trigger point.
   * @param {Object} scriptContext
   * @param {ServerRequest} scriptContext.request - Incoming request
   * @param {ServerResponse} scriptContext.response - Suitelet response
   * @since 2015.2
   */
  const onRequest = (scriptContext) => {
    try {
      if (scriptContext.request.method === "GET") {
        // Create form
        const form = serverWidget.createForm({
          title: "Patient Registration Form",
        });

        // Name
        const name = form.addField({
          id: "custpage_name",
          type: serverWidget.FieldType.TEXT,
          label: "Name",
        });
        name.isMandatory = true;

        // Age
        const age = form.addField({
          id: "custpage_age",
          type: serverWidget.FieldType.INTEGER,
          label: "Age",
        });
        age.isMandatory = true;

        // Sex
        const sex = form.addField({
          id: "custpage_sex",
          type: serverWidget.FieldType.SELECT,
          label: "Sex",
        });
        sex.addSelectOption({ value: "", text: "" });
        sex.addSelectOption({ value: 1, text: "Male" });
        sex.addSelectOption({ value: 2, text: "Female" });
        sex.addSelectOption({ value: 3, text: "Others" });
        sex.isMandatory = true;

        // Address
        const address = form.addField({
          id: "custpage_address",
          type: serverWidget.FieldType.TEXTAREA,
          label: "Address",
        });
        address.isMandatory = true;

        // Submit Button
        form.addSubmitButton({
          label: "Submit",
        });

        scriptContext.response.writePage(form);
      } else {
        // Get submitted values
        const name = scriptContext.request.parameters.custpage_name;
        const age = scriptContext.request.parameters.custpage_age;
        const sex = scriptContext.request.parameters.custpage_sex;
        const address = scriptContext.request.parameters.custpage_address;

        // Create custom patient record
        const patientRec = record.create({
          type: "customrecord_jj_patient_record",
          isDynamic: true,
        });
        patientRec.setValue({
          fieldId: "custrecord_jj_patient_name",
          value: name,
        });

        patientRec.setValue({
          fieldId: "custrecord_jj_patient_age",
          value: age,
        });

        patientRec.setValue({
          fieldId: "custrecord_jj_patient_sex",
          value: sex,
        });

        patientRec.setValue({
          fieldId: "custrecord_jj_address",
          value: address,
        });

        const recordId = patientRec.save();

        // Return response
        scriptContext.response.write({
          output: JSON.stringify({
            message: "Patient record created successfully",
            internalId: recordId,
          }),
        });
      }
    } catch (error) {
      log.debug(error.message);
    }
  };
  return { onRequest };
});
