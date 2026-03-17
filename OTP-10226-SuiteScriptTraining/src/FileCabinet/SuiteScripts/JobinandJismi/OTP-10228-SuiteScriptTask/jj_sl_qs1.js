/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'],
    /**
 * @param{serverWidget} serverWidget
 */
    (serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
 
        if (scriptContext.request.method === 'GET') {
 
            // Create Form
            var form = serverWidget.createForm({
                title: 'Student Registration Form'
            });
 
            // Name
            form.addField({
                id: 'custpage_name',
                type: serverWidget.FieldType.TEXT,
                label: 'Name'
            });
 
            // Age
            form.addField({
                id: 'custpage_age',
                type: serverWidget.FieldType.INTEGER,
                label: 'Age'
            });
 
            // Phone Number
            form.addField({
                id: 'custpage_phone',
                type: serverWidget.FieldType.PHONE,
                label: 'Phone Number'
            });
 
            // Email
            form.addField({
                id: 'custpage_email',
                type: serverWidget.FieldType.EMAIL,
                label: 'Email'
            });
 
            // Father's Name
            form.addField({
                id: 'custpage_fathername',
                type: serverWidget.FieldType.TEXT,
                label: "Father's Name"
            });
 
            // Address
            form.addField({
                id: 'custpage_address',
                type: serverWidget.FieldType.TEXTAREA,
                label: 'Address'
            });
 
            // Submit Button
            form.addSubmitButton({
                label: 'Submit'
            });
 
            scriptContext.response.writePage(form);
 
        } else {
 
            // Get Submitted Values
            var name = scriptContext.request.parameters.custpage_name;
            var age = scriptContext.request.parameters.custpage_age;
            var phone = scriptContext.request.parameters.custpage_phone;
            var email = scriptContext.request.parameters.custpage_email;
            var father = scriptContext.request.parameters.custpage_fathername;
            var address = scriptContext.request.parameters.custpage_address;
 
            // Result Form
            var resultForm = serverWidget.createForm({
                title: 'Registration Successful'
            });
 
            resultForm.addField({
                id: 'custpage_result',
                type: serverWidget.FieldType.INLINEHTML,
                label: 'Result'
            }).defaultValue =
                '<h3>Registration Details</h3>' +
                '<p><b>Name:</b> ' + name + '</p>' +
                '<p><b>Age:</b> ' + age + '</p>' +
                '<p><b>Phone:</b> ' + phone + '</p>' +
                '<p><b>Email:</b> ' + email + '</p>' +
                '<p><b>Father Name:</b> ' + father + '</p>' +
                '<p><b>Address:</b> ' + address + '</p>';
 
            scriptContext.response.writePage(resultForm);
        }
    };
 
    return { onRequest };
 
});