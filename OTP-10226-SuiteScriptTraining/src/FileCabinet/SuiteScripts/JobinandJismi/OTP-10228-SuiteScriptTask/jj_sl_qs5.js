/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/search', 'N/ui/serverWidget'],
    /**
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (search, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
  try {
            if (scriptContext.request.method === 'GET') {
 
                // Create Form
                const form = serverWidget.createForm({
                    title: 'Sales Orders Pending Fulfilled / Billing'
                });
 
                // Create Sublist
                const sublist = form.addSublist({
                    id: 'custpage_salesorders',
                    type: serverWidget.SublistType.LIST,
                    label: 'Sales Orders'
                });
 
                // Add Fields to Sublist
                sublist.addField({
                    id: 'tranid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Order Number'
                });
 
                sublist.addField({
                    id: 'entity',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer'
                });
 
                sublist.addField({
                    id: 'status',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Status'
                });
 
                sublist.addField({
                    id: 'amount',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Amount'
                });
 
                // Create Search
                const salesOrderSearch = search.create({
                    type: search.Type.SALES_ORDER,
                    filters: [
                        ['mainline', 'is', 'T'],
                        'AND',
                        [
                            ['status', 'anyof', 'SalesOrd:D'], // Pending Fulfilled
                            'OR',
                            ['status', 'anyof', 'SalesOrd:G']  // Pending Billing
                        ]
                    ],
                    columns: [
                        'tranid',
                        'entity',
                        'statusref',
                        'amount'
                    ]
                });
 
                let line = 0;
 
                salesOrderSearch.run().each((result) => {
 
                    sublist.setSublistValue({
                        id: 'tranid',
                        line: line,
                        value: result.getValue('tranid') || ''
                    });
 
                    sublist.setSublistValue({
                        id: 'entity',
                        line: line,
                        value: result.getText('entity') || ''
                    });
 
                    sublist.setSublistValue({
                        id: 'status',
                        line: line,
                        value: result.getText('statusref') || ''
                    });
 
                    sublist.setSublistValue({
                        id: 'amount',
                        line: line,
                        value: result.getValue('amount') || '0'
                    });
 
                    line++;
                    return true;
                });
 
                // Display Form
                scriptContext.response.writePage(form);
            }
 
        } catch (error) {
            log.error({
                title: 'Error in Suitelet',
                details: error
            });
 
            scriptContext.response.write('An error occurred: ' + error.message);
        }
    };
 

        return {onRequest}

    });
