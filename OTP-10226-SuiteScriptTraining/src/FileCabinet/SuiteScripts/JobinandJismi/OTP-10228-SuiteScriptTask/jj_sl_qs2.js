/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/record'], (serverWidget, record) => {

    const onRequest = (context) => {
        try{
        if (context.request.method === 'GET') {

         
            const form = serverWidget.createForm({
                title: 'Customer Information Form'
            });


            const name = form.addField({
                id: 'custpage_name',
                type: serverWidget.FieldType.TEXT,
                label: 'Name'
            });
                form.addField({
                id: 'custpage_email',
                type: serverWidget.FieldType.EMAIL,
                label: 'Email'
            });

                form.addField({
                id: 'custpage_phone',
                type: serverWidget.FieldType.PHONE,
                label: 'Phone'
            });

                form.addField({
                id: 'custpage_salesrep',
                type: serverWidget.FieldType.SELECT,
                label: 'Sales Rep',
                source: 'employee'
            });

                form.addField({
                id: 'custpage_subsidiary',
                type: serverWidget.FieldType.SELECT,
                label: 'Subsidiary',
                source: 'subsidiary'
            });

            // Submit Button
            form.addSubmitButton({
                label: 'Submit'
            });

            context.response.writePage(form);

        } else {

            // Get values from form
            const name = context.request.parameters.custpage_name;
            const email = context.request.parameters.custpage_email;
            const phone = context.request.parameters.custpage_phone;
            const salesrep = context.request.parameters.custpage_salesrep;
            const subsidiary = context.request.parameters.custpage_subsidiary;

            // Create Customer Record
            const customerRec = record.create({
                type: record.Type.CUSTOMER,
                isDynamic: true
            });

            customerRec.setValue({
                fieldId: 'companyname',
                value: name
            });

            customerRec.setValue({
                fieldId: 'email',
                value: email
            });

            customerRec.setValue({
                fieldId: 'phone',
                value: phone
            });

            customerRec.setValue({
                fieldId: 'salesrep',
                value: salesrep
            });

            customerRec.setValue({
                fieldId: 'subsidiary',
                value: subsidiary
            });

            const customerId = customerRec.save();

            // Display Entered Details
            const form = serverWidget.createForm({
                title: 'Customer Created Successfully'
            });

            const message = form.addField({
                id: 'custpage_message',
                type: serverWidget.FieldType.INLINEHTML,
                label: 'Message'
            });

            message.defaultValue = `
                <h3>Customer Record Created</h3>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Phone:</b> ${phone}</p>
                <p><b>Sales Rep:</b> ${salesrep}</p>
                <p><b>Subsidiary:</b> ${subsidiary}</p>
                <p><b>Customer ID:</b> ${customerId}</p>
            `;

            context.response.writePage(form);
        }
    }
    catch(error){
        log.debug(error.message)
    }
    };

    return { onRequest };
});