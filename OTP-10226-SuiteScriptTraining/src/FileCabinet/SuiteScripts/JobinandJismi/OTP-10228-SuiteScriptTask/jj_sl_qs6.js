/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(["N/search", "N/ui/serverWidget"], /**
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
      if (scriptContext.request.method === "GET") {
        const request = scriptContext.request;

        const subsidiary = request.parameters.custpage_subsidiary || "";
        const customer = request.parameters.custpage_customer || "";

        // ---------------- FORM ----------------
        const form = serverWidget.createForm({
          title: "Sales Orders - Pending Fulfillment / Billing",
        });

        form.clientScriptFileId = 56;

        // ---------------- FILTERS ----------------
        const subField = form.addField({
          id: "custpage_subsidiary",
          type: serverWidget.FieldType.SELECT,
          label: "Subsidiary",
          source: "subsidiary",
        });
        subField.defaultValue = subsidiary;

        const custField = form.addField({
          id: "custpage_customer",
          type: serverWidget.FieldType.SELECT,
          label: "Customer",
          source: "customer",
        });
        custField.defaultValue = customer;

        form.addSubmitButton({ label: "Filter" });

        // ---------------- SUBLIST ----------------
        const sublist = form.addSublist({
          id: "custpage_list",
          type: serverWidget.SublistType.LIST,
          label: "Sales Orders",
        });

        const columns = [
          { id: "internalid", label: "Internal ID" },
          { id: "tranid", label: "Document Number" },
          { id: "trandate", label: "Date" },
          { id: "status", label: "Status" },
          { id: "entity", label: "Customer Name" },
          { id: "subsidiary", label: "Subsidiary" },
          { id: "department", label: "Department" },
          { id: "class", label: "Class" },
          { id: "line", label: "Line Number" },
          { id: "subtotal", label: "Subtotal" },
          { id: "tax", label: "Tax" },
          { id: "total", label: "Total" },
        ];

        columns.forEach((col) => {
          sublist.addField({
            id: col.id,
            type: serverWidget.FieldType.TEXT,
            label: col.label,
          });
        });

        // ---------------- SEARCH ----------------

        const filters = [
          ["mainline", "is", "F"],
          "AND",
          [
            ["status", "anyof", "SalesOrd:B"], // Pending Fulfillment
            "OR",
            ["status", "anyof", "SalesOrd:D"], // Pending Billing
          ],
        ];

        if (subsidiary) {
          filters.push("AND", ["subsidiary", "anyof", subsidiary]);
        }

        if (customer) {
          filters.push("AND", ["entity", "anyof", customer]);
        }

        const soSearch = search.create({
          type: search.Type.SALES_ORDER,
          filters: filters,
          columns: [
            "internalid",
            "tranid",
            "trandate",
            "statusref",
            "entity",
            "subsidiary",
            "department",
            "class",
            "linesequencenumber",
            "amount", // line subtotal
            "taxamount",
            "grossamount",
          ],
        });

        let i = 0;

        soSearch.run().each((result) => {
          const setVal = (id, val) => {
            if (val !== null && val !== "") {
              sublist.setSublistValue({
                id: id,
                line: i,
                value: val.toString(),
              });
            }
          };

          setVal("internalid", result.getValue("internalid"));
          setVal("tranid", result.getValue("tranid"));
          setVal("trandate", result.getValue("trandate"));
          setVal("status", result.getText("statusref"));
          setVal("entity", result.getText("entity"));
          setVal("subsidiary", result.getText("subsidiary"));
          setVal("department", result.getText("department"));
          setVal("class", result.getText("class"));
          setVal("line", result.getValue("linesequencenumber"));

          // mapped correctly (no error now)
          setVal("subtotal", result.getValue("amount"));
          setVal("tax", result.getValue("taxamount"));
          setVal("total", result.getValue("grossamount"));

          i++;
          return true;
        });

        scriptContext.response.writePage(form);
      }
    } catch (e) {
      log.debug(e.message);
    }
  };

  return { onRequest };
});
