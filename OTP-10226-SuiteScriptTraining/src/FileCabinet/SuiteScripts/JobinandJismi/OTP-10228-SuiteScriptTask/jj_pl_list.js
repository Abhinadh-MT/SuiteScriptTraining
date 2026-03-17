/**
 * @NApiVersion 2.1
 * @NScriptType Portlet
 */
define(['N/format', 'N/search'],
    /**
 * @param{format} format
 * @param{search} search
 */
    function (format, search) {
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
 
        var portlet = params.portlet;
        portlet.title = "Staff Birthday Tracker";
 
        // Set column headers
        portlet.addColumn({
            id: 'name',
            label: 'Employee Name',
            type: 'text'
        });
 
        portlet.addColumn({
            id: 'department',
            label: 'Department',
            type: 'text'
        });
 
        portlet.addColumn({
            id: 'birthdate',
            label: 'Birthday Date',
            type: 'date'
        });
 
        // Get current month
        var currentMonth = new Date().getMonth() + 1;
 
        // Employee Search
        var employeeSearch = search.create({
            type: search.Type.EMPLOYEE,
            filters: [
                ["isinactive","is","F"]
            ],
            columns: [
                "entityid",
                "department",
                "birthdate"
            ]
        });
 
        employeeSearch.run().each(function(result){
 
            var birthdate = result.getValue("birthdate");
 
            if(birthdate){
 
                var date = new Date(birthdate);
                var month = date.getMonth() + 1;
 
                // Show only current month birthdays
                if(month == currentMonth){
 
                    portlet.addRow({
                        row: {
                            name: result.getValue("entityid"),
                            department: result.getText("department"),
                            birthdate: birthdate
                        }
                    });
 
                }
            }
 
            return true;
        });
 
    };
 
    return { render };
 
});