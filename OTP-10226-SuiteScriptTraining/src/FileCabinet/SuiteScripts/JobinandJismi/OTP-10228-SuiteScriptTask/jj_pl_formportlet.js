/**
 * @NApiVersion 2.1
 * @NScriptType Portlet
 */
define(['N/ui/serverWidget'],
    /**
 * @param{serverWidget} serverWidget

 */
    
    function (serverWidget) {
        /**
         * Defines the Portlet script trigger point.
         * @param {Object} params - The params parameter is a JavaScript object. It is automatically passed to the script entry
         *     point by NetSuite. The values for params are read-only.
         * @param {Portlet} params.portlet - The portlet object used for rendering
         * @param {string} params.column - Column index forthe portlet on the dashboard; left column (1), center column (2) or
         *     right column (3)
         * @param {string} params.entity - (For custom portlets only) references the customer ID for the selected customer
         * @since 2015.2
         */
        const render = (params) => {
            
         const portlet = params.portlet;
        portlet.title = "Sales Interaction Feedback";

        // attach client script
        portlet.clientScriptFileId = 49;

        portlet.addField({
            id: 'custpage_client_name',
            type: serverWidget.FieldType.TEXT,
            label: 'Client Name'
        });

        const rating = portlet.addField({
            id: 'custpage_rating',
            type: serverWidget.FieldType.SELECT,
            label: 'Interaction Rating'
        });

        rating.addSelectOption({ value: '1', text: '1 - Poor' });
        rating.addSelectOption({ value: '2', text: '2' });
        rating.addSelectOption({ value: '3', text: '3 - Average' });
        rating.addSelectOption({ value: '4', text: '4' });
        rating.addSelectOption({ value: '5', text: '5 - Excellent' });

        portlet.addField({
            id: 'custpage_comments',
            type: serverWidget.FieldType.TEXTAREA,
            label: 'Comments'
        });

        portlet.addButton({
            id: 'custpage_submit',
            label: 'Submit Feedback',
            functionName: 'submitFeedback'
        });

    };
        return {render}

    });
