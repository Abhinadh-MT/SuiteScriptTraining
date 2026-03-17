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
 
        var form = serverWidget.createForm({
            title: 'Sales Order List'
        });
 
        // Create Sublist
        var sublist = form.addSublist({
            id: 'custpage_salesorder_sublist',
            type: serverWidget.SublistType.LIST,
            label: 'Sales Orders'
        });
 
        // Sublist Fields
        sublist.addField({
            id: 'custpage_docnum',
            type: serverWidget.FieldType.TEXT,
            label: 'Document Number'
        });
 
        sublist.addField({
            id: 'custpage_customer',
            type: serverWidget.FieldType.TEXT,
            label: 'Customer Name'
        });
 
        sublist.addField({
            id: 'custpage_subsidiary',
            type: serverWidget.FieldType.TEXT,
            label: 'Subsidiary'
        });
 
        sublist.addField({
            id: 'custpage_orderdate',
            type: serverWidget.FieldType.DATE,
            label: 'Order Date'
        });
 
        // Sales Order Search
        var salesOrderSearch = search.create({
            type: search.Type.SALES_ORDER,
            filters: [
                ['mainline', 'is', 'T']
            ],
            columns: [
                'tranid',
                'entity',
                'subsidiary',
                'trandate'
            ]
        });
 
    //     var searchResult = salesOrderSearch.run().getRange({
    //         start: 0,
    //         end: 100
    //     });
 
    //     // Set Values in Sublist
    //     for (let i = 0; i < searchResult.length; i++) {
 
    // let docNum = searchResult[i].getValue('tranid');
    // let customer = searchResult[i].getText('entity');
    // let subsidiary = searchResult[i].getText('subsidiary');
    // let orderDate = searchResult[i].getValue('trandate');
    let i =0;
   salesOrderSearch.run().each((r)=>{
    let docNum = r.getValue('tranid');
    let customer = r.getText('entity');
    let subsidiary =r.getText('subsidiary');
    let orderDate = r.getValue('trandate');
    if (docNum) {
        sublist.setSublistValue({
            id: 'custpage_docnum',
            line: i,
            value: docNum
        });
    }
 
    if (customer) {
        sublist.setSublistValue({
            id: 'custpage_customer',
            line: i,
            value: customer
        });
    }
 
    if (subsidiary) {
        sublist.setSublistValue({
            id: 'custpage_subsidiary',
            line: i,
            value: subsidiary
        });
    }
 
    if (orderDate) {
        sublist.setSublistValue({
            id: 'custpage_orderdate',
            line: i,
            value: orderDate
        });
    }
    i++;
    log.debug('line value',i)
    return true;
})
 
        scriptContext.response.writePage(form);
    };
 
    return { onRequest };
 
});