$(function () {
    var isExport = null;
    var downloadpar = null;
    var selectedpeb = null;





    // var Status = ["DHE belum diterima", "DHE Kurang"];
    var now = new Date();
    var NoPEB = [];

    var URL = routeApi + "DataPDKM/";

    var DatagridSPEB = new DevExpress.data.CustomStore({

        load: function () {
            return $.ajax({
                url: URL + "loadPDKM",
                type: "GET",
                success: function (data) {

                }
            })
        }
    });


    var gridDataSource = new DevExpress.data.CustomStore({
        load: function (load) {

            return $.ajax({
                url: URL + "loadPEBPDKM",//?ParamPEB=" + GetSelectedPEB(),
                type: "GET",
                success: function (data) {

                }
            })
        }
    });

    var Today = new Date();
    var Day = new Date();
    var LastTwoYear = Day.setFullYear(Day.getFullYear() - 2);

    function now() {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();

        var output = (day < 10 ? '0' : '') + day +
            + (month < 10 ? '0' : '') + month +
            + d.getFullYear();

        return output;
    };



    var PEB = {
        store: new DevExpress.data.CustomStore({
            loadMode: "raw",
            load: function () {
                // Returns an array of objects that have the following structure:
                // { id: 1, name: "John Doe" }

                return $.getJSON(routeApi + "DataPEB/GetPEB");
            }
        })
    };


    //var Status = ["DHE belum diterima", "DHE diterima"];
    var now = new Date();

    //let StatusApproval = new DevExpress.data.DataSource({
    //    load: function (load) {
    //        let lUrl = routeApi + "DataPDKM/getStatusApproval";
    //        return getGrid(lUrl);
    //    }
    //});

    $("#txtSanKPBC").dxSelectBox({
        dataSource: routeApi + "DataKPBC/GetKPBC",
        searchEnabled: true,
        searchExpr: ["KD_KANTOR", "NM_KANTOR"],
        showDataBeforeSearch: true,
        valueExpr: "KD_KANTOR",
        displayExpr: getDisplayExpr,
        searchMode: 'contains',
        searchTimeout: 500,
        minSearchLength: 2
    });

    $("#cmbsanmigas").dxSelectBox({
        dataSource: routeApi + "DataPDKM/LookupDHEMigas",
        searchEnabled: true,
        searchExpr: "keterangan",
        showDataBeforeSearch: true,
        valueExpr: "sandi_dhe_migas",
        displayExpr: getDisplayExpr2,
        searchMode: 'contains',
        searchTimeout: 500,
        minSearchLength: 2
    });


    function getDisplayExpr(item) {
        if (!item) {
            return "";
        }

        return item.KD_KANTOR + "-" + item.NM_KANTOR;
    }

    function getDisplayExpr2(item) {
        if (!item) {
            return "";
        }

        return item.sandi_dhe_migas + "-" + item.keterangan;
    }

    $("#txtFlagSDA").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "0", text: "Non SDA" },
            { id: "1", text: "SDA" }
        ],
        displayExpr: 'text',
        valueExpr: 'id',
        value: ""
    });


    $("#cmbNamaPDKM").dxTagBox({
        dataSource: URL + "ListPDKM",
        searchEnabled: true,
        displayExpr: function (item) { return !item ? "" : item.npwp + " - " + item.nama_perusahaan; },
        searchExpr: ["npwp", "nama_perusahaan"],
        valueExpr: "npwp",
        placeholder: "Ketik Nama/NPWP PDKM untuk mencari",
        //  showSelectionControls: true,
        //searchEnabled: true
    });



    $("#CmbStatusJatuhTempoPEB").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "0", text: "Belum Jatuh Tempo" },
            { id: "1", text: "Sudah Jatuh Tempo" }
        ],
        displayExpr: 'text',
        valueExpr: 'id',
        value: ""
    });
    $("#txtSampaiPEB2").dxDateBox({
        type: "date",
        value: Today,
        useMaskBehavior: true,
        displayFormat: "dd-MM-yyyy"
    });

    $("#btnSearchPEB").dxButton({
        icon: "search",
        text: "Cari Data",
        type: "default",
        stylingMode: "outlined",
        onClick: function (e) {
            e.component.option("disabled", true);
            e.component.option("text", "Mencari Data...");
            e.component.option("icon", "fas fa-spin fa-spinner");
            $("#btnResetPEB").dxButton("instance").option("disabled", true);
            var method = "GET";
            var urlPEB = URL + "loadViewPEBPDKM";
            sendRequestPeb(urlPEB, method);
        }
    });


    // var LastTwoYear = now.setFullYear(now.getFullYear() - 2);
    $("#txtPerPEB2").dxDateBox({
        type: "date",
        value: LastTwoYear,
        useMaskBehavior: true,
        displayFormat: "dd-MM-yyyy"
    });






    //var dataPEB2 = new DevExpress.data.ArrayStore({
    //    key: "NO_PEB",
    //    data: PEB
    //});


    $("#btnResetPEB").dxButton({
        icon: "revert",
        text: "Reset",
        type: "danger",
        stylingMode: "outlined",
        onClick: function (e) {
            $("#txtNoPEB").dxTextBox('instance').option('value', '');
            $("#txtSanKPBC").dxSelectBox('instance').option('value', '');
            $("#txtSampaiPEB2").dxDateBox('instance').option('value', Today);
            $("#txtPerPEB2").dxDateBox('instance').option('value', LastTwoYear);
            $("#gridContainer1").dxDataGrid("instance").option("dataSource", '');
            $("#gridContainer2").dxDataGrid("instance").option("dataSource", '');
            $("#gridContainer3").dxDataGrid("instance").option("dataSource", '');
            $("#cmbNamaPDKM").dxTagBox("instance").option("value", '');
        }

    });

    var dataGrid = $("#gridContainer1").dxDataGrid({
        //  rowAlternationEnabled: true,
        dataSource: "",
        columnAutoWidth: true,
        showBorders: true,
        allowColumnReordering: true,
        wordWrapEnabled: true,
        selection: { mode: "multiple" },
        //columnWidth: 150,

        scrolling: {
            columnRenderingMode: "virtual"
        },
        onToolbarPreparing: function (e) {
            var toolbarItems = e.toolbarOptions.items;

            var exportBtn;
            $.each(toolbarItems, function (_, item) {
                if (item.name === "exportButton") {
                    exportBtn = item;
                    return false;
                }
            });
            if (!exportBtn) {
                return;
            }
            var index = toolbarItems.indexOf(exportBtn);
            toolbarItems.splice(index, 1);
            var texts = e.component.option("export.texts");
            var menuItems = [
                {
                    text: "unduh seluruh data yang ditampilkan",
                    icon: "exportxlsx",
                    onClick: function (e) {
                        var DataSource = $("#gridContainer3").dxDataGrid("instance").option("dataSource");
                        // var selected = $("#gridContainerPEB").dxDataGrid("instance").option("selectedRowKeys").length;
                        if (DataSource == null || DataSource == '') {
                            DevExpress.ui.notify("Data yang akan diekspor tidak ada", "error");
                            isExport = false;
                            //alert("Data yang akan diekspor tidak ada");


                        }
                        else {
                            downloadpar = 1;
                            isExport = true;
                        }

                    }
                },
                {
                    text: "unduh data terpilih",
                    exportSelected: true,
                    icon: "exportselected",
                    onClick: function (e) {
                        //var DataSource = $("#gridContainerPEB").dxDataGrid("instance").option("dataSource");
                        var selected = $("#gridContainer1").dxDataGrid("instance").option("selectedRowKeys").length;

                        if (selected == 0) {
                            DevExpress.ui.notify("Tidak ada data yang dipilih", "error");
                            isExport = false;

                        }
                        else {
                            downloadpar = 2;
                            isExport = true;
                        }



                    }
                },

            ];
            toolbarItems.push({
                widget: "dxButton",
                options: {
                    icon: "export-to",
                    hint: texts.exportTo,
                    elementAttr: {
                        class: "dx-datagrid-export-button"
                    },
                    onInitialized: function (args) {
                        $("#exportMenu").dxContextMenu({
                            showEvent: "dxclick",
                            items: menuItems,
                            cssClass: "dx-datagrid-export-menu",
                            onItemClick: function (item) {
                                if (isExport) {
                                    if (downloadpar == 1) {
                                        $("#gridContainer3").dxDataGrid("instance").exportToExcel();
                                    }
                                    else {
                                        $("#gridContainer2").dxDataGrid("instance").exportToExcel();
                                    }

                                }
                                else {
                                    isExport = true;
                                    return false;
                                }

                            },
                            target: args.element,
                            position: {
                                at: "left bottom",
                                my: "left top",
                                offset: "0 3",
                                collision: "fit",
                                boundary: e.element,
                                boundaryOffset: "1 1"
                            }
                        });
                    },
                    onClick: function () { }
                },
                location: "after"
            });

        },
        "export": {
            enabled: true,
            fileName: "Detail PDKM",
            allowExportSelectedData: true
        },
        pager: {
            allowedPageSizes: [5, 8, 15, 30],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true

        },
        onInitialized: function (e) {
            dataGrid = e.component;
        },
        paging: {
            pageSize: 8,
        },
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData;



            if (data.length > 0)
                selectedpeb = $.map(data, function (value) {
                    return value.id_pel_peb
                }).join(",");

            if (data.length > 0) {
                $.ajax({
                    url: URL + "LoadDetailPDKM?ID_PEL_PEB=" + selectedpeb,
                    type: "GET",
                    contentType: 'application/json; charset=utf-8',
                    success: function (d) {
                        $("#gridContainer2").dxDataGrid({
                            dataSource: d
                        });


                    }
                });

            }
            else {
                $("#gridContainer2").dxDataGrid({
                    dataSource: ""
                });
            }

        },



        columns: [
            {
                caption: "ID PEL PEB",
                alignment: "center",
                dataField: "id_pel_peb",
                visible: false
            }, {
                caption: "Nomor",
                alignment: "left",
                dataField: "no_peb",
                allowEditing: false
            }, {
                caption: "Nomor KPBC",
                alignment: "left",
                dataField: "kpbc_peb",
                allowEditing: false
            },
            {
                caption: "Tanggal",
                alignment: "right",
                dataField: "tgl_peb",
                dataType: "date",
                format: "dd-MM-yyyy",
                allowEditing: false
            }, {
                caption: "Valuta",
                alignment: "Center",
                dataField: "val_peb",
                allowEditing: false
            }, {
                caption: "Nilai FOB",
                alignment: "right",
                dataField: "nilai_peb",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                allowEditing: false
            },
            {
                caption: "NPWP PDKM",
                alignment: "left",
                dataField: "npwp_pdkm",
                width: 500,
                allowEditing: false
            }, {
                caption: "Nama PDKM",
                alignment: "left",
                dataField: "nama_pdkm",
                width: 500,
                allowEditing: false
            }, {
                caption: "Kode Pihak",
                alignment: "left",
                dataField: "kd_migas",
                width: 500,
                allowEditing: false
            }, {
                caption: "Total Nilai Disbursment",
                alignment: "right",
                dataField: "disbursment_pdkm",
                dataType: "number",

                format: {

                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    min: 1,
                    format: "#,##0.##"
                },
                allowEditing: true,
                validationRules: [{ type: "required" }]
            }, {
                caption: "Status PDKM",
                alignment: "left",
                dataField: "flag_approval",
                allowEditing: false,
                lookup: {
                    dataSource: new DevExpress.data.CustomStore({
                        key: "id",
                        load: function () {
                            return $.getJSON(URL + "getStatusApproval");
                        }
                    }),
                    displayExpr: "status_name",
                    valueExpr: "status_approval_id"
                }
            }

        ],

        masterDetail: {
            enabled: true,
            template: function (container, options) {
                $("<div>")
                    .addClass("master-detail-caption")
                    .text("Detail PDKM")
                    .appendTo(container);

                $("<div>")
                    .dxDataGrid({
                        columnAutoWidth: true,
                        showBorders: true,
                        export: {
                            enabled: true,
                            fileName: "DetailPDKM_" + options.key.no_peb
                        },
                        columns: [
                            {
                                dataField: "id_pel_input_pdkm",
                                visible: false,

                            },
                            {
                                caption: "No PPE",
                                alignment: "left",
                                dataField: "no_peb"

                            }, {
                                caption: "NPWP PDKM",
                                dataField: "npwp_pdkm",

                            },
                            //{
                            //    caption: "Status",
                            //    alignment: "leff",
                            //    dataField: "flag_npwp_exist",
                            //    allowEditing: false,
                            //    lookup: {
                            //        dataSource: [
                            //            { id: 0, text: "NPWP Belum Terdaftar" },
                            //            { id: 1, text: "NPWP Sudah Terdaftar" }
                            //        ],
                            //        displayExpr: "text",
                            //        valueExpr: "id"
                            //    }

                            //},
                            {
                                caption: "Nama PDKM",
                                alignment: "left",
                                dataField: "pdkm",

                            }, {
                                caption: "Blok",
                                alignment: "center",
                                dataField: "blok",


                            }, {
                                caption: "Nomor DHE Migas",
                                alignment: "left",
                                dataField: "ket_dhe_migas",
                                dataType: "string",


                                //lookup: {
                                //    dataSource: new DevExpress.data.CustomStore({
                                //        key: "sandi_dhe_migas",
                                //        loadMode: "raw",
                                //        load: function () {
                                //            return $.getJSON(URL + "LookupDHEMigas");
                                //        }
                                //    }),
                                //    displayExpr: getDisplayExpr,
                                //    searchExpr: ["sandi_dhe_migas", "keterangan"],
                                //    valueExpr: "sandi_dhe_migas"
                                //}
                            }, {
                                caption: "Nilai Disbursement",
                                alignment: "right",

                                dataField: "nilai_disbursement_pdkm",
                                dataType: "number",
                                format: {
                                    type: "fixedPoint",
                                    precision: 2
                                },
                                editorOptions: {
                                    format: "#,##0.##"
                                }

                            }, {
                                caption: "Nilai konversi USD",
                                alignment: "center",
                                dataType: "number",
                                dataField: "nilai_disbursment_usd",
                                //visible: false,
                                //  allowEditing: false,
                                format: {
                                    type: "fixedPoint",
                                    precision: 2
                                },
                                editorOptions: {
                                    format: "#,##0.##"
                                }

                            }, {
                                caption: "Nomor Invoice",
                                alignment: "left",
                                dataField: "no_invoice"

                            }, {
                                caption: "Tanggal Invoice",
                                dataType: "date",
                                alignment: "right",
                                dataField: "tanggal_invoice",
                                format: 'dd/MM/yyyy',

                            }, {
                                caption: "Nilai Invoice",
                                alignment: "right",
                                dataField: "nilai_invoice",
                                allowEditing: false,
                                dataType: "number",
                                format: {
                                    type: "fixedPoint",
                                    precision: 2
                                },
                                editorOptions: {
                                    format: "#,##0.##"
                                }


                            }],
                        summary: {
                            recalculateWhileEditing: true,
                            totalItems: [{
                                column: "id_pel_peb",
                                showInColumn: "id_pel_peb",

                                displayFormat: "TOTAL"
                            },
                            {
                                column: "nilai_disbursment_usd",
                                summaryType: "sum",
                                displayFormat: "{0}",
                                valueFormat: {
                                    type: "fixedPoint",
                                    precision: 2
                                }

                            },
                            {
                                column: "nilai_disbursement_pdkm",
                                summaryType: "sum",
                                displayFormat: "{0}",
                                valueFormat: {
                                    type: "fixedPoint",
                                    precision: 2
                                }

                            },
                            {
                                column: "nilai_invoice",
                                summaryType: "sum",
                                displayFormat: "{0}",
                                valueFormat: {
                                    type: "fixedPoint",
                                    precision: 2
                                }

                            }]
                        },
                        dataSource: new DevExpress.data.DataSource({
                            load: function (load) {

                                return $.ajax({
                                    url: URL + "LoadDetailPDKM?ID_PEL_PEB=" + options.key.id_pel_peb,//?ParamPEB=" + GetSelectedPEB(),
                                    type: "GET",
                                    success: function (data) {

                                    }
                                })
                            },
                            filter: ["id_pel_peb", "=", options.key.id_pel_peb]
                        })
                    }).appendTo(container);
            }
        }
    }).dxDataGrid("instance");

    $("#gridContainer2").hide().dxDataGrid({
        //  rowAlternationEnabled: true,
        dataSource: "",
        columnAutoWidth: true,
        showBorders: true,
        allowColumnReordering: true,
        showBorders: true,
        "export": {
            enabled: true,
            fileName: "Detail PDKM",
            allowExportSelectedData: true
        },
        //columnWidth: 150,


        columns: [
            {
                dataField: "id_pel_input_pdkm",
                visible: false,

            },
            {
                caption: "No PPE",
                alignment: "left",
                dataField: "no_peb"

            },
            {
                caption: "Nomor KPPBC",
                alignment: "left",
                dataField: "sandi_kpbc"

            },
            {
                caption: "Tanggal PPE",
                dataType: "date",
                alignment: "right",
                dataField: "tanggal_peb",
                format: 'dd/MM/yyyy',

            },
            {
                caption: "Valuta FOB",
                dataField: "valuta_fob"
            },
            {
                caption: "Nilai FOB",
                alignment: "right",
                dataField: "nilai_fob",
                dataType: "number",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                }
            },
            {
                caption: "NPWP PDKM",
                dataField: "npwp_pdkm",

            },
            //{
            //    caption: "Status",
            //    alignment: "leff",
            //    dataField: "flag_npwp_exist",
            //    allowEditing: false,
            //    lookup: {
            //        dataSource: [
            //            { id: 0, text: "NPWP Belum Terdaftar" },
            //            { id: 1, text: "NPWP Sudah Terdaftar" }
            //        ],
            //        displayExpr: "text",
            //        valueExpr: "id"
            //    }

            //},
            {
                caption: "Nama PDKM",
                alignment: "left",
                dataField: "pdkm",

            }, {
                caption: "Blok",
                alignment: "center",
                dataField: "blok",
                //allowExporting: false

            }, {
                caption: "Kode Pihak",
                alignment: "left",
                dataField: "ket_dhe_migas",
                dataType: "string"

                //lookup: {
                //    dataSource: new DevExpress.data.CustomStore({
                //        key: "sandi_dhe_migas",
                //        loadMode: "raw",
                //        load: function () {
                //            return $.getJSON(URL + "LookupDHEMigas");
                //        }
                //    }),
                //    displayExpr: getDisplayExpr,
                //    searchExpr: ["sandi_dhe_migas", "keterangan"],
                //    valueExpr: "sandi_dhe_migas"
                //}
            }, {
                caption: "Nilai Disbursement",
                alignment: "right",

                dataField: "nilai_disbursement_pdkm",
                dataType: "number",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                }

            }, {
                caption: "Nilai konversi USD",
                alignment: "center",
                dataType: "number",
                dataField: "nilai_disbursment_usd",
                //visible: false,
                //  allowEditing: false,
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                },
                //allowExporting: false

            }, {
                caption: "Nomor Invoice",
                alignment: "left",
                dataField: "no_invoice",
                //allowExporting: false

            }, {
                caption: "Tanggal Invoice",
                dataType: "date",
                alignment: "right",
                dataField: "tanggal_invoice",
                format: 'dd/MM/yyyy',
                //allowExporting: false
            }, {
                caption: "Nilai Invoice",
                alignment: "right",
                dataField: "nilai_invoice",
                allowEditing: false,
                dataType: "number",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                },
                //allowExporting: false

            }, {
                caption: "Status Approval",
                alignment: "left",
                dataField: "flag_approval",
                allowEditing: false,
                lookup: {
                    dataSource: new DevExpress.data.CustomStore({
                        key: "id",
                        load: function () {
                            return $.getJSON(URL + "getStatusApproval");
                        }
                    }),
                    displayExpr: "status_name",
                    valueExpr: "status_approval_id"
                }
            }],
        summary: {
            recalculateWhileEditing: true,
            totalItems: [{
                column: "id_pel_peb",
                showInColumn: "id_pel_peb",

                displayFormat: "TOTAL"
            },
            {
                column: "nilai_disbursment_usd",
                summaryType: "sum",
                displayFormat: "{0}",
                valueFormat: {
                    type: "fixedPoint",
                    precision: 2
                },
                //allowExporting: false
            },
            {
                column: "nilai_disbursement_pdkm",
                summaryType: "sum",
                displayFormat: "{0}",
                valueFormat: {
                    type: "fixedPoint",
                    precision: 2
                }

            },
            {
                column: "nilai_invoice",
                summaryType: "sum",
                displayFormat: "{0}",
                valueFormat: {
                    type: "fixedPoint",
                    precision: 2
                },
                //allowExporting: false
            }]
        }
    }).dxDataGrid("instance");

    $("#gridContainer3").hide().dxDataGrid({
        //  rowAlternationEnabled: true,
        dataSource: "",
        columnAutoWidth: true,
        showBorders: true,
        allowColumnReordering: true,
        showBorders: true,
        "export": {
            enabled: true,
            fileName: "Detail PDKM",
            allowExportSelectedData: true
        },
        //columnWidth: 150,


        columns: [
            {
                dataField: "id_pel_input_pdkm",
                visible: false,

            },
            {
                caption: "No PPE",
                alignment: "left",
                dataField: "no_peb"

            },
            {
                caption: "Nomor KPPBC",
                alignment: "left",
                dataField: "sandi_kpbc"

            },
            {
                caption: "Tanggal PPE",
                dataType: "date",
                alignment: "right",
                dataField: "tanggal_peb",
                format: 'dd/MM/yyyy',

            },
            {
                caption: "Valuta FOB",
                dataField: "valuta_fob"
            },
            {
                caption: "Nilai FOB",
                alignment: "right",
                dataField: "nilai_fob",
                dataType: "number",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                }
            },
            {
                caption: "NPWP PDKM",
                dataField: "npwp_pdkm",

            },
            //{
            //    caption: "Status",
            //    alignment: "leff",
            //    dataField: "flag_npwp_exist",
            //    allowEditing: false,
            //    lookup: {
            //        dataSource: [
            //            { id: 0, text: "NPWP Belum Terdaftar" },
            //            { id: 1, text: "NPWP Sudah Terdaftar" }
            //        ],
            //        displayExpr: "text",
            //        valueExpr: "id"
            //    }

            //},
            {
                caption: "Nama PDKM",
                alignment: "left",
                dataField: "pdkm"

            }, {
                caption: "Blok",
                alignment: "center",
                dataField: "blok",
                //allowExporting: false

            }, {
                caption: "Kode Pihak",
                alignment: "left",
                dataField: "ket_dhe_migas",
                dataType: "string"

                //lookup: {
                //    dataSource: new DevExpress.data.CustomStore({
                //        key: "sandi_dhe_migas",
                //        loadMode: "raw",
                //        load: function () {
                //            return $.getJSON(URL + "LookupDHEMigas");
                //        }
                //    }),
                //    displayExpr: getDisplayExpr,
                //    searchExpr: ["sandi_dhe_migas", "keterangan"],
                //    valueExpr: "sandi_dhe_migas"
                //}
            }, {
                caption: "Nilai Disbursement",
                alignment: "right",

                dataField: "nilai_disbursement_pdkm",
                dataType: "number",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                }

            }, {
                caption: "Nilai konversi USD",
                alignment: "center",
                dataType: "number",
                dataField: "nilai_disbursment_usd",
                //visible: false,
                //  allowEditing: false,
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                },
                //allowExporting: false

            }, {
                caption: "Nomor Invoice",
                alignment: "left",
                dataField: "no_invoice",
                //allowExporting: false

            }, {
                caption: "Tanggal Invoice",
                dataType: "date",
                alignment: "right",
                dataField: "tanggal_invoice",
                format: 'dd/MM/yyyy',
                //allowExporting: false
            }, {
                caption: "Nilai Invoice",
                alignment: "right",
                dataField: "nilai_invoice",
                allowEditing: false,
                dataType: "number",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                },
                //allowExporting: false

            }, {
                caption: "Status Approval",
                alignment: "left",
                dataField: "flag_approval",
                allowEditing: false,
                lookup: {
                    dataSource: new DevExpress.data.CustomStore({
                        key: "id",
                        load: function () {
                            return $.getJSON(URL + "getStatusApproval");
                        }
                    }),
                    displayExpr: "status_name",
                    valueExpr: "status_approval_id"
                }
            }],
        summary: {
            recalculateWhileEditing: true,
            totalItems: [{
                column: "id_pel_peb",
                showInColumn: "id_pel_peb",

                displayFormat: "TOTAL"
            },
            {
                column: "nilai_disbursment_usd",
                summaryType: "sum",
                displayFormat: "{0}",
                valueFormat: {
                    type: "fixedPoint",
                    precision: 2
                },
                //allowExporting: false
            },
            {
                column: "nilai_disbursement_pdkm",
                summaryType: "sum",
                displayFormat: "{0}",
                valueFormat: {
                    type: "fixedPoint",
                    precision: 2
                }

            },
            {
                column: "nilai_invoice",
                summaryType: "sum",
                displayFormat: "{0}",
                valueFormat: {
                    type: "fixedPoint",
                    precision: 2
                },
                //allowExporting: false
            }]
        }
    }).dxDataGrid("instance");


    $("#txtNoPEB").dxTextBox({
        placeholder: "Masukkan Nomor PPE..."
    });
    $("#txtNoInvoice").dxTextBox({
        placeholder: "Masukkan  Nomor Invoice..."
    });




    function sendRequestPeb(url, method) {
        var kpbc = $("#txtSanKPBC").dxSelectBox("instance").option("value");
        var startDate = $("#txtPerPEB2").dxDateBox("instance").option("text");
        var endDate = $("#txtSampaiPEB2").dxDateBox("instance").option("text");
        var npwpPDKM = $("#cmbNamaPDKM").dxTagBox("instance").option("value");
        //var statusSelesai = null;// $("#CmbStatusSelesaiPEB").dxSelectBox("instance").option("value");
        //var isJatuhTempo = null;// $("#CmbStatusJatuhTempoPEB").dxSelectBox("instance").option("value");
        var noPeb = $("#txtNoPEB").dxTextBox("instance").option("value");
        var nodheMigas = $("#cmbsanmigas").dxSelectBox("instance").option("value");
        //var noInvoice = null;// $("#txtNoInvoice").dxTextBox("instance").option("value");
        //var isSda = null;// $("#txtFlagSDA").dxSelectBox("instance").option("value");

        url = url + "?kpbc=" + (kpbc === null ? "" : kpbc) +
            "&startDate=" + startDate +
            "&endDate=" + endDate +
            "&npwp_pdkm=" + npwpPDKM +
            //"&statusSelesai=" + (statusSelesai === null ? "" : statusSelesai) +
            // "&isJatuhTempo=" + isJatuhTempo +
            "&noPeb=" + noPeb +
            "&sanDHEMigas=" + (nodheMigas === null ? "" : nodheMigas);
        //"&noInv=" + noInvoice +
        // "&isSDA=" + isSda;

        $.ajax({
            url: url,
            type: method,
            contentType: 'application/json; charset=utf-8',
            success: function (d) {
                $("#gridContainer1").show().dxDataGrid({
                    dataSource: d
                });
                $("#btnSearchPEB").dxButton({
                    icon: "search",
                    text: "Cari Data",
                    disabled: false
                });
                $("#btnResetPEB").dxButton({ disabled: false });


                if (d.length > 0)
                    selectedpeb = $.map(d, function (value) {
                        return value.id_pel_peb
                    }).join(",");


                if (d.length > 0) {
                    $.ajax({
                        url: URL + "LoadDetailPDKM?ID_PEL_PEB=" + selectedpeb,
                        type: "GET",
                        contentType: 'application/json; charset=utf-8',
                        success: function (e) {
                            $("#gridContainer3").dxDataGrid({
                                dataSource: e
                            });


                        }
                    });

                    selectedpeb = null;


                }
                

              

            },
            
        });



    }

})

