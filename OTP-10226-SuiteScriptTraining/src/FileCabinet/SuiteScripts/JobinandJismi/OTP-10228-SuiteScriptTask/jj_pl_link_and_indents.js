/**
 * @NApiVersion 2.1
 * @NScriptType Portlet
 */
define([],
    
    function () {
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
        portlet.title = "Finance Quick Access";

        // -------- REPORTS --------
        portlet.addLine({
            text: 'Reports',
            url: '/app/reporting/reportrunner.nl?cr=30'
           
        });

        // portlet.addIndentedLink({
        //     id: 'quarterly_revenue',
        //     title: 'Quarterly Revenue Report',
        //     url: '/app/reporting/reportrunner.nl?cr=30'
        // });

        // portlet.addIndentedLink({
        //     id: 'outstanding_invoices',
        //     title: 'Outstanding Invoices',
        //     url: '/app/reporting/reportrunner.nl?cr=30'
        // });

        // // -------- ANALYTICS --------
        // portlet.addLink({
        //     id: 'analytics',
        //     title: 'Analytics',
        //     url: '/app/reporting/reportrunner.nl?cr=30'
        // });

        // portlet.addIndentedLink({
        //     id: 'financial_dashboard',
        //     title: 'Financial Dashboard',
        //     url: '/app/reporting/reportrunner.nl?cr=30'
        // });

        // portlet.addIndentedLink({
        //     id: 'cashflow_analysis',
        //     title: 'Cash Flow Analysis',
        //     url: '/app/reporting/reportrunner.nl?cr=30'
        // });

        // // -------- QUICK ACTIONS --------
        // portlet.addLink({
        //     id: 'quick_actions',
        //     title: 'Quick Actions',
        //     url: '/app/reporting/reportrunner.nl?cr=30'
        // });

        // portlet.addIndentedLink({
        //     id: 'create_invoice',
        //     title: 'Create Invoice',
        //     url: '/app/accounting/transactions/custinvc.nl'
        // });

        // portlet.addIndentedLink({
        //     id: 'record_payment',
        //     title: 'Record Payment',
        //     url: '/app/accounting/transactions/customerpayment.nl'
        // });

    };

        return {render}

    });
