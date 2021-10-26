$(function () {
    var DownloadData = [];

    let gridDataSource = new DevExpress.data.CustomStore({
        load: function (loadOptions) {
            var deferred = $.Deferred(), datas = {};

            //Sorting option
            if (loadOptions.sort) {
                datas.orderby = loadOptions.sort[0].selector;
                if (loadOptions.sort[0].desc)
                    datas.orderby += " desc";
            }

            //Filtering option
            if (loadOptions.filter) {
                datas.filter = filteReader(loadOptions.filter);
            }

            //paging option
            datas.skip = loadOptions.skip;
            datas.take = loadOptions.take;

            if (DownloadData.length > 0) return DownloadData;
            else {
                $.ajax({
                    url: routeApi + "AuditTrail/GetAuditTrailJson",
                    dataType: "json",
                    data: datas,
                    success: function (result) {
                        if (result.length) {
                            var JsonItems = JSON.parse(result[0].items);
                            var tc = result[0].totalCount;

                            if (tc > 0) {
                                deferred.resolve(JsonItems, { totalCount: tc });
                                $("#exportData").dxButton("instance").option("disabled", false);
                            }
                            else {
                                deferred.resolve([], { totalCount: 0 });
                                $("#exportData").dxButton("instance").option("disabled", true);
                            }
                        }
                        else {
                            deferred.resolve([], { totalCount: 0 });
                            $("#exportData").dxButton("instance").option("disabled", true);
                        }
                        $("#exportSelected").dxButton("instance").option("disabled", true);
                    },
                    error: function () {
                        deferred.reject("Gagal Memuat Data");
                    },
                    timeout: 5000
                });
                return deferred.promise();
            }
        }
    });

    $("#gridAudiTrail").dxDataGrid({
        dataSource: gridDataSource,
        columnAutoWidth: true,
        loadPanel: { enabled: true, text: "Memuat Data..." },
        showBorders: true,
        filterRow: { visible: true },
        pager: {
            allowedPageSizes: [12, 24, 36, 48, 60],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: { pageSize: 12 },
        selection: { mode: "multiple" },
        remoteOperations: {
            filtering: true,
            sorting: true,
            paging: true
        },
        export: {
            enabled: true,
            fileName: "Data Audit Trail",
            allowExportSelectedData: true,
            texts: {
                exportAll: "Ekspor Data yang Tampil",
                exportSelectedRows: "Ekspor Data Terpilih",
                exportTo: "Ekspor ke Excel"
            }
        },
        onEditorPreparing: e => {
            if (e.parentType === 'headerRow' && e.command === 'select') { e.editorElement.remove(); }
        },
        onSelectionChanged: function (selectedItems) {
            if (selectedItems.selectedRowsData.length > 0)
                $("#exportSelected").dxButton("instance").option("disabled", false);
            else
                $("#exportSelected").dxButton("instance").option("disabled", true);
        },
        onToolbarPreparing: e => { e.toolbarOptions.visible = false; },
        columns: ["Username", "Module", "Menu",
            {
                dataField: "ActionType",
                lookup: {
                    dataSource: new DevExpress.data.CustomStore({
                        key: "id",
                        load: function () {
                            return $.getJSON(routeApi + "AuditTrail/GeTypes");
                        }
                    }),
                    displayExpr: "deskripsi",
                    valueExpr: "deco"
                }
            },
            {
                caption: "Status",
                dataField: "IsSuccess",
                lookup: {
                    dataSource: [
                        { id: true, text: "Berhasil" },
                        { id: false, text: "Gagal" }
                    ],
                    displayExpr: "text",
                    valueExpr: "id"
                }
            },
            //"DeviceName",
            "UserIP",
            {
                dataField: "LogDate",
                dataType: "datetime",
                format: "dd-MM-yyyy | HH:mm:ss"
            }
        ]
    });

    $('#exportData').dxButton({
        icon: "exportxlsx",
        stylingMode: "outlined",
        text: "Ekspor Data",
        type: "default",
        onClick: function () {
            DownloadData = $("#gridAudiTrail").dxDataGrid("instance").getDataSource().items();
            $("#gridAudiTrail").dxDataGrid("instance").exportToExcel();
        }
    });

    $('#exportSelected').dxButton({
        icon: "exportselected",
        stylingMode: "outlined",
        text: "Ekspor Data Terpilih",
        type: "default",
        onClick: function () {
            var data = $("#gridAudiTrail").dxDataGrid("instance").getSelectedRowsData();
            $("#gridAudiTrail").dxDataGrid("instance").exportToExcel(data);
        }
    });

    function filteReader(filters) {
        var result = [];
        if (typeof filters[0] === "string" && filters.length === 3) {
            return Querizing(filters[0], filters[1], filters[2]);
        } else {
            for (var i = 0; i < filters.length; i++) {
                if (typeof filters[i] === "string" && filters.length === 3) {
                    result.push(filters[i]);
                } else {
                    result.push(filteReader(filters[i]));
                }
            }
        }
        return "(" + result.join(" ") + ")";
    }

    function Querizing(ColName, Clause, Value) {
        var result = null;
        var valueString = Value.toString();

        switch (Clause) {
            case "contains":
                result = ColName + " like '%" + valueString + "%'";
                break;
            case "notcontains":
                result = ColName + " not like '%" + valueString + "%'";
                break;
            case "startswith":
                result = ColName + " like '" + valueString + "%'";
                break;
            case "endswith":
                result = ColName + " like '%" + valueString + "'";
                break;
            default:
                result = ColName + Clause + " '" + valueString + "'";
                break;
        }
        return result;
    }
});




