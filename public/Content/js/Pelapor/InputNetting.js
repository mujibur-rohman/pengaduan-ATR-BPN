$(function () {
    var today = new Date(); 
    var date = today.toJSON().slice(0, 10);
    var nDate = date.slice(0, 4) +
        + date.slice(5, 7) +
        + date.slice(8, 10); 

    let upData = getLocalStorage("dokupenData") === "" ? [] : JSON.parse(getLocalStorage("dokupenData"));

    if (hanyaLihat()) $("#rowBtnSearch").hide();

    $("#gridNettingPeb").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_peb",
            load: function () {
                return $.getJSON(routeApi + "Netting/PPENetting?id=" + netId);
            },
            remove: function (key) {
                return publicActionRequestMethod(routeApi + "Netting/SavePebOnDuty?action=hapus", "POST", {
                    id_pel_peb: key,
                    tanggal_invoice_peb: '01/01/2001'
                });
            }
        }),
        columnAutoWidth: true,
        columnFixing: { enabled: true },
        allowColumnResizing: true,
        showBorders: true,
        //wordWrapEnabled: true,
        editing: {
            allowDeleting: true,
            texts: {
                addRow: "",
                cancelRowChanges: "",
                confirmDeleteMessage: "",
                confirmDeleteTitle: "",
                deleteRow: "",
                editRow: "",
                saveRowChanges: "",
                undeleteRow: "",
                validationCancelChanges: ""
            }
        },
        scrolling: {
            columnRenderingMode: "virtual1",
            //showScrollbar: "always"
        },
        paging: { pageSize: 10 },
        pager: {
            allowedPageSizes: [5, 10, 20],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: false,
            visible: true
        },
        columns: [
            {
                caption: "Data PPE",
                alignment: "Center",
                columns: [
                    {
                        caption: "No PPE",
                        alignment: "left",
                        dataField: "no_peb",
                        //groupIndex: 0
                    },
                    {
                        caption: "No KPBC",
                        alignment: "left",
                        dataField: "kpbc_peb",
                    },
                    {
                        caption: "Tanggal PPE",
                        alignment: "right",
                        dataField: "tanggal_peb",
                        dataType: "date",
                        format: "dd-MM-yyyy",
                        width: 110,
                    },
                    {
                        caption: "Valuta PPE",
                        alignment: "center",
                        dataField: "valuta_fob_peb",
                        width: 64,
                    },
                    {
                        caption: "Nilai PPE",
                        alignment: "right",
                        dataField: "nilai_fob_peb",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                    },
                    {
                        caption: "Nomor Invoice",
                        alignment: "left",
                        dataField: "no_invoice_peb",
                    },
                    {
                        caption: "Valuta Invoice",
                        alignment: "center",
                        dataField: "valuta_invoice_peb",
                    },
                    {
                        caption: "Nilai Invoice",
                        alignment: "right",
                        dataField: "nilai_invoice_peb",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                    },
                    {
                        caption: "Nilai Invoice (USD)",
                        alignment: "right",
                        dataField: "nilai_invoice_usd_peb",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                    },
                ]
            }
        ],
        summary: {
            totalItems: [
                {
                    column: "nilai_invoice_peb",
                    showInColumn: "nilai_invoice_peb",
                    displayFormat: "Total"
                },
                {
                    name: "total_peb_usd",
                    column: "nilai_invoice_usd_peb",
                    showInColumn: "nilai_invoic_usd_peb",
                    displayFormat: "{0}",
                    valueFormat: {
                        type: "fixedPoint",
                        precision: 2
                    },
                    summaryType: "sum"
                }
            ]
        },
        onCellPrepared: function (e) {
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $del = e.cellElement.find(".dx-link-delete");
                $del.attr("title", "Hapus Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-trash">');

                var $edit = e.cellElement.find(".dx-link-edit");
                $edit.attr("title", "Ubah Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-edit">');

                var $save = e.cellElement.find(".dx-link-save");
                $save.attr("title", "Simpan Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-save">');

                var $cancel = e.cellElement.find(".dx-link-cancel");
                $cancel.attr("title", "Batal Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-revert">');
            }
        },
        onInitialized: function (e) {
            if (hanyaLihat() || (getLocalStorage("nettingStatus") !== "" && getLocalStorage("setOff") !== "")) {
                e.component._options.editing.allowUpdating = false;
                e.component._options.editing.allowDeleting = false;
                e.component.columnOption("command:edit", "visible", false);
            }
        },
        onContentReady: function (e) {
            setNettingStatus();
        },
        export: {
            enabled: false,
            fileName: "Laporan DHE Netting - Data PPE",
            //allowExportSelectedData: true,
            customizeExcelCell: e => {
                e.numberFormat = "#,###";
                if (e.gridCell.rowType === 'data' && e.gridCell.column.dataType === 'date') {
                    e.numberFormat = 'dd/MM/yyyy;@';
                }
            }
        },
        onExporting: function (e) {
            e.component.beginUpdate();
            e.component.columnOption("valuta_invoice_peb", "visible", false);
            e.component.columnOption("nilai_invoice_peb", "visible", false);
            e.component.columnOption("nilai_invoice_usd_peb", "visible", false);
        },
        onExported: function (e) {
            e.component.columnOption("valuta_invoice_peb", "visible", true);
            e.component.columnOption("nilai_invoice_peb", "visible", true);
            e.component.columnOption("nilai_invoice_usd_peb", "visible", true);
            e.component.endUpdate();
        },
    });

    $("#gridExcelPPE").hide().dxDataGrid({
        dataSource: [],
        columns: [
            {
                caption: "Kode Kantor"
            },
            {
                caption: "No Daftar",
            },
            {
                caption: "Tgl Daftar",
            },
            {
                caption: "Valuta",
            },
            {
                caption: "FOB",
            },
        ],
        export: {
            enabled: false,
            fileName: "Laporan DHE Netting - Data PPE",
            //customizeExcelCell: e => {
            //    e.numberFormat = "#,###";
            //    if (e.gridCell.rowType === 'data' && e.gridCell.column.dataType === 'date') {
            //        e.numberFormat = 'dd/MM/yyyy;@';
            //    }
            //}
        },
    });

    $("#gridNettingPib").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_pib",
            load: function () {
                return $.getJSON(routeApi + "Netting/PPINetting?id=" + netId);
            },
            update: function (key, values) {
                values["id_pel_pib"] = key;
                values["tanggal_invoice_pib"] = '01/01/2001';
                return publicActionRequestMethod(routeApi + "Netting/SavePibOnDuty?action=ubah", "POST", values);
            },
            remove: function (key) {
                return publicActionRequestMethod(routeApi + "Netting/SavePibOnDuty?action=hapus",
                    "POST",
                    {
                        id_pel_pib: key,
                        tanggal_invoice_pib: '01/01/2001'
                    });
            }
        }),
        columnAutoWidth: true,
        columnFixing: { enabled: true },
        allowColumnResizing: true,
        showBorders: true,
        scrolling: {
            columnRenderingMode: "virtual1",
            //showScrollbar: "always"
        },
        paging: { pageSize: 10 },
        pager: {
            allowedPageSizes: [5, 10, 20],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: false,
            visible: true
        },
        editing: {
            allowDeleting: true,
            allowUpdating: true,
            mode: "row",
            startEditAction: "click",
            texts: {
                addRow: "",
                cancelRowChanges: "",
                confirmDeleteMessage: "",
                confirmDeleteTitle: "",
                deleteRow: "",
                editRow: "",
                saveRowChanges: "",
                undeleteRow: "",
                validationCancelChanges: ""
            }
        },
        columns: [
            {
                caption: "Data PPI",
                alignment: "Center",
                columns: [
                    {
                        caption: "No PPI",
                        alignment: "left",
                        dataField: "no_pib",
                        allowEditing: false
                    },
                    {
                        caption: "No KPBC",
                        alignment: "left",
                        dataField: "kpbc_pib",
                        allowEditing: false
                    },
                    {
                        caption: "Tanggal PPI",
                        alignment: "right",
                        dataField: "tanggal_pib",
                        dataType: "date",
                        format: "dd-MM-yyyy",
                        width: 110,
                        allowEditing: false
                    },
                    {
                        caption: "Valuta PPI",
                        alignment: "center",
                        dataField: "valuta_cif_pib",
                        width: 64,
                        allowEditing: false
                    },
                    {
                        caption: "Nilai PPI",
                        alignment: "right",
                        dataField: "nilai_cif_pib",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        allowEditing: false
                    },
                    {
                        caption: "Nomor Invoice",
                        alignment: "left",
                        dataField: "no_invoice_pib",
                        allowEditing: false
                    },
                    {
                        caption: "Valuta Invoice",
                        alignment: "center",
                        dataField: "valuta_invoice_pib",
                        width: 64,
                        allowEditing: false
                    },
                    {
                        caption: "Nilai Netting (alokasi)",
                        alignment: "right",
                        dataField: "alokasi_pib",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        editorOptions: {
                            format: "#,##0.##", min: 0
                        }
                    },
                    {
                        caption: "Nilai Netting (USD)",
                        alignment: "right",
                        dataField: "alokasi_usd_pib",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        allowEditing: false
                    },
                    {
                        caption: "Sisa Alokasi",
                        alignment: "right",
                        dataField: "sisa_alokasi",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        editorOptions: {
                            format: "#,##0.##", min: 0
                        },
                        allowEditing: false
                    }
                ]
            }
        ],
        summary: {
            totalItems: [
                {
                    column: "alokasi_pib",
                    showInColumn: "alokasi_pib",
                    displayFormat: "Total"
                },
                {
                    name: "total_alokasi_usd",
                    column: "alokasi_usd_pib",
                    showInColumn: "alokasi_usd_pib",
                    displayFormat: "{0}",
                    valueFormat: {
                        type: "fixedPoint",
                        precision: 2
                    },
                    summaryType: "sum"
                }
            ]
        },
        onCellPrepared: function (e) {
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $del = e.cellElement.find(".dx-link-delete");
                $del.attr("title", "Hapus Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-trash">');

                var $edit = e.cellElement.find(".dx-link-edit");
                $edit.attr("title", "Ubah Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-edit">');

                var $save = e.cellElement.find(".dx-link-save");
                $save.attr("title", "Simpan Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-save">');

                var $cancel = e.cellElement.find(".dx-link-cancel");
                $cancel.attr("title", "Batal Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-revert">');
            }
        },
        onInitialized: function (e) {
            if (hanyaLihat() || (getLocalStorage("nettingStatus") !== "" && getLocalStorage("setOff") !== "")) {
                e.component._options.editing.allowUpdating = false;
                e.component._options.editing.allowDeleting = false;
                e.component.columnOption("command:edit", "visible", false);
            }
        },
        onContentReady: function (cr) {
            setNettingStatus();
        },
        onRowValidating: function (e) {
            if (e.isValid && e.newData.nilai_invoice_pib === 0) {
                e.isValid = false;
                e.errorText = "Nilai Invoice PPI tidak boleh Nol(Kosong)!";
            }
        },
        onRowUpdated: function (e) {
            setNettingStatus();
        },
        //onEditorPrepared: function(e){
        //    if (e.dataField === "alokasi_pib") {
        //        $(e.editorElement).dxNumberBox("instance").on("valueChanged", function (args) {
        //            var grid = $("#gridNettingPib").dxDataGrid("instance");
        //            var index = e.row.rowIndex;
        //            var alokasi = e.row.data.alokasi_pib;

        //            grid.cellValue(index, "alokasi_usd_pib", alokasi);
        //        });
        //    }
        //},
        export: {
            enabled: false,
            fileName: "Laporan DHE Netting - Data PPI",
            //allowExportSelectedData: true,
            //customizeExcelCell: e => {
            //    e.numberFormat = "#,###";
            //    if (e.gridCell.rowType === 'data' && e.gridCell.column.dataType === 'date') {
            //        e.numberFormat = 'dd/MM/yyyy;@';
            //    }
            //}
        },
        onExporting: function (e) {
            e.component.beginUpdate();
            e.component.columnOption("valuta_invoice_pib", "visible", false);
            e.component.columnOption("alokasi_usd_pib", "visible", false);
            e.component.columnOption("sisa_alokasi", "visible", false);
            e.component.option("summary").totalItems[0].displayFormat = "";
            e.component.option("summary").totalItems[0].column = "";
            //e.component.option('summary', null);  
        },
        onExported: function (e) {
            e.component.columnOption("valuta_invoice_pib", "visible", true);
            e.component.columnOption("alokasi_usd_pib", "visible", true);
            e.component.columnOption("sisa_alokasi", "visible", true);
            e.component.option("summary").totalItems[0].displayFormat = "Total";
            e.component.option("summary").totalItems[0].column = "alokasi_pib";
            //e.component.option('summary', this.summary);  
            e.component.endUpdate();
        },
    });

    $("#gridExcelPPI").hide().dxDataGrid({
        dataSource: [],
        columns: [
            {
                caption: "Kode Kantor",
            },
            {
                caption: "No Daftar",
            },
            {
                caption: "No Invoice",
            },
            {
                caption: "Tgl Daftar",
            },
            {
                caption: "Valuta",
            },
            {
                caption: "CIF",
            },
            {
                caption: "Alokasi Netting",
            },
        ],
        export: {
            enabled: false,
            fileName: "Laporan DHE Netting - Data PPI",
            //allowExportSelectedData: true,
            //customizeExcelCell: e => {
            //    e.numberFormat = "#,###";
            //    if (e.gridCell.rowType === 'data' && e.gridCell.column.dataType === 'date') {
            //        e.numberFormat = 'dd/MM/yyyy;@';
            //    }
            //}
        }
    });

    $("#gridNettingIncoming").hide().dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_inc",
            load: function () {
                return $.getJSON(routeApi + "Netting/IncomingNetting?id=" + netId);
            },
            update: function (key, values) {
                values["id_pel_inc"] = key;
                values["tanggal_inc"] = '01/01/2001';
                return publicActionRequestMethod(routeApi + "Netting/SaveIncomingOnDuty?action=ubah", "POST", values);
            },
            remove: function (key) {
                return publicActionRequestMethod(routeApi + "Netting/SaveIncomingOnDuty?action=hapus", "POST", {
                    id_pel_inc: key
                });
            }
        }),
        columnAutoWidth: true,
        columnFixing: { enabled: true },
        allowColumnResizing: true,
        scrolling: { columnRenderingMode: "virtual1" },
        pager: {
            allowedPageSizes: [5, 10, 20],
            showInfo: true,
            showNavigationButtons: true,
            visible: true
        },
        paging: { pageSize: 10 },
        columns: [
            {
                caption: "Incoming",
                alignment: "Center",
                columns: [
                    {
                        caption: "No. Rekening",
                        alignment: "left",
                        dataField: "no_rek_inc",
                        allowEditing: false
                    },
                    {
                        caption: "Valuta Incoming",
                        alignment: "center",
                        dataField: "valuta_inc",
                        allowEditing: false
                    },
                    {
                        caption: "Nilai Incoming",
                        alignment: "right",
                        dataField: "nilai_inc",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        allowEditing: false
                    },
                    {
                        caption: "Nilai Incoming (USD)",
                        alignment: "right",
                        dataField: "nilai_usd_inc",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        allowEditing: false
                    },
                    {
                        caption: "Tanggal Incoming",
                        alignment: "right",
                        dataField: "tanggal_inc",
                        dataType: "date",
                        format: "dd-MM-yyyy",
                        allowEditing: false
                    },
                    {
                        caption: "No. Referensi",
                        alignment: "left",
                        dataField: "no_ref_inc",
                        allowEditing: false
                    },
                    {
                        caption: "Nama Pengirim",
                        alignment: "left",
                        dataField: "nama_pengirim_inc",
                        allowEditing: false
                    },
                    {
                        caption: "Nama Bank",
                        alignment: "left",
                        dataField: "nama_bank_inc",
                        allowEditing: false
                    },
                    {
                        caption: "Nilai Alokasi",
                        alignment: "right",
                        dataField: "alokasi_inc",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        editorOptions: {
                            format: "#,##0.##", min: 0
                        }
                    },
                    {
                        caption: "Nilai Alokasi (USD)",
                        alignment: "right",
                        dataField: "alokasi_usd_inc",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        editorOptions: {
                            format: "#,##0.##", min: 0
                        },
                        allowEditing: false
                    },
                    {
                        caption: "Sisa Alokasi",
                        alignment: "right",
                        dataField: "sisa_alokasi",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        editorOptions: {
                            format: "#,##0.##", min: 0
                        },
                        allowEditing: false
                    },
                ]
            }
        ],
        summary: {
            totalItems: [
                {
                    column: "nilai_inc",
                    showInColumn: "nilai_inc",
                    displayFormat: "Total"
                },
                {
                    name: "total_usd_inc",
                    column: "nilai_usd_inc",
                    showInColumn: "nilai_usd_inc",
                    displayFormat: "{0}",
                    valueFormat: {
                        type: "fixedPoint",
                        precision: 2
                    },
                    summaryType: "sum"
                },
                {
                    name: "total_usd_alokasi",
                    column: "alokasi_usd_inc",
                    showInColumn: "alokasi_usd_inc",
                    displayFormat: "{0}",
                    valueFormat: {
                        type: "fixedPoint",
                        precision: 2
                    },
                    summaryType: "sum"
                },
            ]
        },
        editing: {
            allowDeleting: true,
            allowUpdating: true,
            mode: "row",
            startEditAction: "click",
            texts: {
                addRow: "",
                cancelRowChanges: "",
                confirmDeleteMessage: "",
                confirmDeleteTitle: "",
                deleteRow: "",
                editRow: "",
                saveRowChanges: "",
                undeleteRow: "",
                validationCancelChanges: ""
            }
        },
        onCellPrepared: function (e) {
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $del = e.cellElement.find(".dx-link-delete");
                $del.attr("title", "Hapus Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-trash">');

                var $edit = e.cellElement.find(".dx-link-edit");
                $edit.attr("title", "Ubah Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-edit">');

                var $save = e.cellElement.find(".dx-link-save");
                $save.attr("title", "Simpan Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-save">');

                var $cancel = e.cellElement.find(".dx-link-cancel");
                $cancel.attr("title", "Batal Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-revert">');
            }
        },
        onContentReady: function (c) {
            setNettingStatus();
        },
        export: {
            enabled: false,
            fileName: "Laporan DHE Netting - Data Incoming",
            customizeExcelCell: e => {
                e.numberFormat = "#,###";
                if (e.gridCell.rowType === 'data' && e.gridCell.column.dataType === 'date') {
                    e.numberFormat = 'dd/MM/yyyy;@';
                }
            }
        },
        onExporting: function (e) {
            e.component.beginUpdate();
            e.component.columnOption("nilai_usd_inc", "visible", false);
            e.component.columnOption("nama_pengirim_inc", "visible", false);
            e.component.columnOption("nama_bank_inc", "visible", false);
            e.component.columnOption("alokasi_usd_inc", "visible", false);
            e.component.columnOption("sisa_alokasi", "visible", false);
        },
        onExported: function (e) {
            e.component.columnOption("nilai_usd_inc", "visible", true);
            e.component.columnOption("nama_pengirim_inc", "visible", true);
            e.component.columnOption("nama_bank_inc", "visible", true);
            e.component.columnOption("alokasi_usd_inc", "visible", true);
            e.component.columnOption("sisa_alokasi", "visible", true);
            e.component.endUpdate();
        },
    });

    $("#gridExcelIncoming").hide().dxDataGrid({
        dataSource: [],
        columns: [
            {
                caption: "No Ref",
            },
            {
                caption: "No Invoice",
            },
            {
                caption: "Alokasi Invoice",
            },
            {
                caption: "Valuta",
            },
            {
                caption: "Alokasi Netting",
            },
        ],
        export: {
            enabled: false,
            fileName: "Laporan DHE Netting - Data Incoming",
            //customizeExcelCell: e => {
            //    e.numberFormat = "#,###";
            //    if (e.gridCell.rowType === 'data' && e.gridCell.column.dataType === 'date') {
            //        e.numberFormat = 'dd/MM/yyyy;@';
            //    }
            //}
        }
    });

    $("#gridNettingOutgoing").hide().dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_out",
            load: function () {
                return $.getJSON(routeApi + "Netting/OutgoingNetting?id=" + netId);
            },
            update: function (key, values) {
                values["id_pel_out"] = key;
                values["tanggal_out"] = '01/01/2001';
                return publicActionRequestMethod(routeApi + "Netting/SaveOutgoingOnDuty?action=ubah", "POST", values);
            },
            remove: function (key) {
                return publicActionRequestMethod(routeApi + "Netting/SaveOutgoingOnDuty?action=hapus", "POST", {
                    id_pel_out: key
                });
            }
        }),
        columnAutoWidth: true,
        columnFixing: { enabled: true },
        allowColumnResizing: true,
        scrolling: { columnRenderingMode: "virtual1" },
        pager: {
            allowedPageSizes: [5, 10, 20],
            showInfo: true,
            showNavigationButtons: true,
            visible: true
        },
        paging: { pageSize: 10 },
        columns: [
            {
                caption: "Outgoing",
                alignment: "Center",
                columns: [
                    {
                        caption: "No. Rekening",
                        alignment: "left",
                        dataField: "no_rek_out",
                        allowEditing: false
                    },
                    {
                        caption: "Valuta Outgoing",
                        alignment: "center",
                        dataField: "valuta_out",
                        allowEditing: false
                    },
                    {
                        caption: "Nilai Outgoing",
                        alignment: "right",
                        dataField: "nilai_out",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        allowEditing: false
                    },
                    {
                        caption: "Nilai Outgoing (USD)",
                        alignment: "right",
                        dataField: "nilai_usd_out",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        allowEditing: false
                    },
                    {
                        caption: "Tanggal Outgoing",
                        alignment: "right",
                        dataField: "tanggal_out",
                        dataType: "date",
                        format: "dd-MM-yyyy",
                        allowEditing: false
                    },
                    {
                        caption: "No. Referensi",
                        alignment: "left",
                        dataField: "no_ref_out",
                        allowEditing: false
                    },
                    {
                        caption: "Nama Penerima",
                        alignment: "left",
                        dataField: "nama_penerima_out",
                        allowEditing: false
                    },
                    {
                        caption: "Nama Bank",
                        alignment: "left",
                        dataField: "nama_bank_out",
                        allowEditing: false
                    },
                    {
                        caption: "Nilai Alokasi",
                        alignment: "right",
                        dataField: "alokasi_out",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        editorOptions: {
                            format: "#,##0.##", min: 0
                        }
                    },
                    {
                        caption: "Nilai Alokasi (USD)",
                        alignment: "right",
                        dataField: "alokasi_usd_out",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        editorOptions: {
                            format: "#,##0.##", min: 0
                        },
                        allowEditing: false
                    },
                    {
                        caption: "Sisa Alokasi",
                        alignment: "right",
                        dataField: "sisa_alokasi",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        editorOptions: {
                            format: "#,##0.##", min: 0
                        },
                        allowEditing: false
                    },
                ]
            }
        ],
        summary: {
            totalItems: [
                {
                    column: "nilai_out",
                    showInColumn: "nilai_out",
                    displayFormat: "Total"
                },
                {
                    name: "total_usd_inc",
                    column: "nilai_usd_out",
                    showInColumn: "nilai_usd_out",
                    displayFormat: "{0}",
                    valueFormat: {
                        type: "fixedPoint",
                        precision: 2
                    },
                    summaryType: "sum"
                },
                {
                    name: "total_usd_alokasi",
                    column: "alokasi_usd_out",
                    showInColumn: "alokasi_usd_out",
                    displayFormat: "{0}",
                    valueFormat: {
                        type: "fixedPoint",
                        precision: 2
                    },
                    summaryType: "sum"
                }
            ]
        },
        editing: {
            allowDeleting: true,
            allowUpdating: true,
            mode: "row",
            startEditAction: "click",
            texts: {
                addRow: "",
                cancelRowChanges: "",
                confirmDeleteMessage: "",
                confirmDeleteTitle: "",
                deleteRow: "",
                editRow: "",
                saveRowChanges: "",
                undeleteRow: "",
                validationCancelChanges: ""
            }
        },
        onCellPrepared: function (e) {
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $del = e.cellElement.find(".dx-link-delete");
                $del.attr("title", "Hapus Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-trash">');

                var $edit = e.cellElement.find(".dx-link-edit");
                $edit.attr("title", "Ubah Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-edit">');

                var $save = e.cellElement.find(".dx-link-save");
                $save.attr("title", "Simpan Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-save">');

                var $cancel = e.cellElement.find(".dx-link-cancel");
                $cancel.attr("title", "Batal Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-revert">');
            }
        },
        onContentReady: function (content) {
            setNettingStatus();
        },
        export: {
            enabled: false,
            fileName: "Laporan DHE Netting - Data Incoming",
            customizeExcelCell: e => {
                e.numberFormat = "#,###";
                if (e.gridCell.rowType === 'data' && e.gridCell.column.dataType === 'date') {
                    e.numberFormat = 'dd/MM/yyyy;@';
                }
            }
        },
        onExporting: function (e) {
            e.component.beginUpdate();
            e.component.columnOption("nilai_usd_out", "visible", false);
            e.component.columnOption("nama_penerima_out", "visible", false);
            e.component.columnOption("nama_bank_out", "visible", false);
            e.component.columnOption("alokasi_usd_out", "visible", false);
            e.component.columnOption("sisa_alokasi", "visible", false);
            //e.component.option("summary").totalItems[0].displayFormat = "";
            //e.component.option("summary").totalItems[0].column = "";
            //e.component.option('summary', null);  
        },
        onExported: function (e) {
            e.component.columnOption("nilai_usd_out", "visible", true);
            e.component.columnOption("nama_penerima_out", "visible", true);
            e.component.columnOption("nama_bank_out", "visible", true);
            e.component.columnOption("alokasi_usd_out", "visible", true);
            e.component.columnOption("sisa_alokasi", "visible", true);
            //e.component.option("summary").totalItems[0].displayFormat = "Total";
            //e.component.option("summary").totalItems[0].column = "alokasi_pib";
            //e.component.option('summary', this.summary);  
            e.component.endUpdate();
        },
    });

    $("#gridExcelOutgoing").hide().dxDataGrid({
        dataSource: [],
        columns: [
            {
                caption: "No Ref",
            },
            {
                caption: "No Invoice",
            },
            {
                caption: "Alokasi Invoice",
            },
            {
                caption: "Valuta",
            },
            {
                caption: "Alokasi Netting",
            },
        ],
        export: {
            enabled: false,
            fileName: "Laporan DHE Netting - Data Outgoing",
            //customizeExcelCell: e => {
            //    e.numberFormat = "#,###";
            //    if (e.gridCell.rowType === 'data' && e.gridCell.column.dataType === 'date') {
            //        e.numberFormat = 'dd/MM/yyyy;@';
            //    }
            //}
        }
    });

    $("#gridUploadExportir").hide().dxDataGrid({
        dataSource: upData,
        columnAutoWidth: false,
        scrolling: { columnRenderingMode: "virtual1" },
        paging: { pageSize: 10 },
        columns: [
            {
                caption: "DOKUMEN PENDUKUNG",
                alignment: "Center",
                columns: [
                    {
                        caption: "Nama File",
                        alignment: "left",
                        dataField: "nama_file"
                    },
                    {
                        caption: "Jenis Dokumen",
                        alignment: "left",
                        dataField: "id_pel_jenis",
                        lookup: {
                            dataSource: new DevExpress.data.CustomStore({
                                key: "id_pel_jenis_dp",
                                loadMode: "raw",
                                load: function () {
                                    return $.getJSON(routeApi + "SaveDataNetting/getDocTypes?group_id=3");
                                }
                            }),
                            displayExpr: "jenis_dp",
                            valueExpr: "id_pel_jenis_dp"
                        },
                        validationRules: [
                            {
                                type: "required",
                                message: "Jenis Dokumen Wajib Diisi"
                            }
                        ]
                    },
                    {
                        caption: "Lampiran Dokumen",
                        dataField: "path_file",
                        validationRules: [
                            {
                                type: "required",
                                message: "Wajib Mengunggah Dokumen"
                            }
                        ],
                        cellTemplate: function (container, opt) {
                            var link;
                            var uri = opt.value.substr(1, opt.value.length);
                            link = '<a href="' + routeApp + uri + '" target="_blank">Lihat Dokumen</a>';

                            container.append(link);
                        }
                    }
                ]
            }
        ],
        editing: {
            allowAdding: true,
            allowUpdating: false,
            allowDeleting: true,
            mode: "form",
            form: { items: ["id_pel_jenis", "path_file"], labelLocation: "top" },
            texts: {
                addRow: "Menambah Data",
                cancelAllChanges: "Batalkan Semua Perubahan",
                cancelRowChanges: "Batalkan",
                confirmDeleteMessage: "Apakah anda ingin menghapus dokumen ini?",
                confirmDeleteTitle: "Hapus Dokumen Pendukung",
                deleteRow: "Hapus",
                editRow: "Sunting",
                saveAllChanges: "Simpan Perubahan",
                saveRowChanges: "Simpan",
                undeleteRow: "Batalkan",
                validationCancelChanges: "Batalkan Perubahan"
            }
        },
        onCellPrepared: function (e) {
            if (e.rowType === "detail") {
                console.log('edit');
                $("#btnClearTrx").attr("disabled", true);
                $("#btnPostNetting").attr("disabled", true);
                var $save = e.cellElement.find(e.cellElement.find(".dx-datagrid-form-buttons-container").children()[0]);
                $save.dxButton({
                    icon: "save",
                    text: "Simpan",
                    stylingMode: "outlined",
                    type: "default"
                });

                var $cancel = e.cellElement.find(e.cellElement.find(".dx-datagrid-form-buttons-container").children()[1]);
                $cancel.dxButton({
                    icon: "close",
                    text: "Batalkan",
                    stylingMode: "outlined",
                    type: "danger"
                });

                $cancel.on("click",
                    function () {
                        $("#btnClearTrx").attr("disabled", false);
                        //$("#btnPostNetting").attr("disabled", false);
                    });
            }
        },
        onEditorPreparing: function (e) {
            if (e.parentType === "dataRow" && e.dataField === "path_file") {
                e.editorName = "dxFileUploader";
                e.editorOptions.allowCanceling = false,
                    e.editorOptions.selectButtonText = "Pilih Dokumen",
                    e.editorOptions.name = "peb_file",
                    e.editorOptions.labelText = "max 25Mb (.pdf .jpg .gif .png .bmp)",
                    e.editorOptions.allowedFileExtensions = [".pdf", ".jpg", ".gif", ".png", ".bmp"],
                    e.editorOptions.invalidFileExtensionMessage = "Jenis/Tipe dokumen tidak diperbolehkan!",
                    e.editorOptions.maxFileSize = 25000000,
                    e.editorOptions.invalidMaxFileSizeMessage = "Ukuran dokumen melebihi batas kapasitas maksimal!",
                    e.editorOptions.uploadedMessage = "Unggah dokumen berhasil ",
                    e.editorOptions.uploadFailedMessage = "Unggah dokumen gagal!";
                e.editorOptions.onValueChanged = function (args) {
                    if (args.component._files[0].isValid()) {
                        args.component.option('uploadUrl', routeApi + 'DokumenPendukung/UploadDokupen');
                        e.setValue(args.value[0].name);
                    } else {
                        e.setValue(null);
                    }
                };
                e.editorOptions.onUploaded = function (args) {
                    var respon = JSON.parse(args.request.response)[0];
                    //args.element.find(".dx-fileuploader-file-name").text(respon.Name);
                    e.setValue(respon.Path);
                };
                e.editorOptions.onUploadError = function (args) {
                    var xhttp = args.request;
                    if (xhttp.readyState === 4 && xhttp.status === 0) {
                        var msg = "Terjadi gangguan koneksi. Silahkan diulang kembali.";
                        toast_notify(msg, "error", 2000);
                        args.component.reset();
                    }
                };
            }
        },
        onRowInserting: function (e) {
            if (e.data["path_file"]) {
                var file = e.data["path_file"].split("/").pop();
                var arname = file.split("."); arname.pop();
                e.data["nama_file"] = arname.join("");
            }
        },
        onRowInserted: function (e) {
            //$("#btnClearTrx").attr("disabled", false);
            //$("#btnPostNetting").attr("disabled", false);
            setLocalStorage("dokupenData", JSON.stringify(e.component.getDataSource()._items));
            $("#btnClearTrx").attr("disabled", false);
            if ($("#gridUploadExportir").dxDataGrid("instance").totalCount() > 0) {
                console.log('bisa kirim');
                $("#btnPostNetting").attr("disabled", false);
            } else 
                $("#btnPostNetting").attr("disabled", true);
        },
        onRowRemoved: function (e) {
            setLocalStorage("dokupenData", JSON.stringify(e.component.getDataSource()._items));

            $("#btnClearTrx").attr("disabled", false);
            if ($("#gridUploadExportir").dxDataGrid("instance").totalCount() > 0) {
                console.log('bisa kirim');
                $("#btnPostNetting").attr("disabled", false);
            } else {
                $("#btnPostNetting").attr("disabled", true);
            }
        },
        onInitialized: function (e) {
            $("#btnClearTrx").attr("disabled", false);
            if (e.component.option("dataSource").length > 0) {
                console.log('bisa kirim');
                $("#btnPostNetting").attr("disabled", false);
            } else {
                $("#btnPostNetting").attr("disabled", true);
            }
        }
    });

    $('#nav-Netting-tab').click(function () {
        //window.location.reload();
    });

    $("#btnClearTrx").click(function () {
        var confMes = "Apakah Anda yakin ingin membatalkan transaksi ini ? " +
            "<strong><em>Prosedur ini tidak akan menghapus data secara permanen!</em></strong>";
        var confRes = DevExpress.ui.dialog.confirm(confMes, "Batalkan Transaksi ?");
        confRes.done(function (dialogResult) {
            if (dialogResult) {
                cancelNetting();
            }
        });
    });

    $("#btnPostNetting").click(function () {
        $("#btnPostNetting").attr("disabled", true);
        $("#btnPostNetting>i").removeClass().addClass("spinner-border spinner-border-sm");

        var zeroMsg = cekZeroInvoice();
        if (zeroMsg !== "OK") {
            toast_notify(zeroMsg, "warning", 4000);
            $("#btnPostNetting").attr("disabled", false);
            $("#btnPostNetting>i").removeClass().addClass("far fa-save");
            return;
        }

        if ($("#gridUploadExportir").dxDataGrid("instance").totalCount() === 0) {
            toast_notify("Anda belum melampirkan dokumen pendukung", "warning", 2000);
            $("#btnPostNetting").attr("disabled", false);
            $("#btnPostNetting>i").removeClass().addClass("far fa-save");
            return;
        }

        var confTit = "Simpan & Selesaikan Transaksi ?";
        var confMes = "Apakah Anda yakin ingin menyimpan transaksi ini ? " +
            "<strong><em>Anda tidak dapat menghapus transaksi yang sudah tersimpan!</em></strong>";
        if (getLocalStorage("setOff") === "minus") confTit = "Nilai Devisa Kurang!";
        if (getLocalStorage("setOff") === "plus") confTit = "Nilai Devisa Berlebih!";
        var confRes = DevExpress.ui.dialog.confirm(confMes, confTit);
        confRes.done(function (dialogResult) {
            if (dialogResult) {
                $.when(postNetting()).done(
                    setTimeout(function () {
                        $("#btnPostNetting").attr("disabled", false);
                        $("#btnPostNetting>i").removeClass().addClass("far fa-save");
                    }, 500));
            } else {
                $("#btnPostNetting").attr("disabled", false);
                $("#btnPostNetting>i").removeClass().addClass("far fa-save");
            }
        });
    });

    $('#btnCariPPE').dxButton({
        icon: "add",
        stylingMode: "outlined",
        text: "Tambahkan Data PPE",
        type: "default",
        elementAttr: {
            class: "btnMarginRight"
        },
        onClick: function () {
            $('#nav-NettingPeb-tab').click();
        }
    });

    $('#btnCariPPI').dxButton({
        icon: "add",
        stylingMode: "outlined",
        text: "Tambahkan Data PPI",
        type: "default",
        elementAttr: {
            class: "btnMarginRight"
        },
        onClick: function () {
            $('#nav-NettingPib-tab').click();
        }
    });

    $("#uploadPPE").show().dxFileUploader({
        visible: false,
        multiple: false,
        accept: ".xls, .xlsx",
        allowedFileExtensions: [".xlsx", ".xls"],
        invalidMaxFileSizeMessage: "Dokumen melebihi batas maksimum",
        maxFileSize: 25000000000,
        uploadUrl: routeApp + "Pelapor/InputNetting",
        uploadMode: "instantly",
        onUploading: function (e) {
            if (ViewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk upload excel", "warning", 5000);
                e.cancel = true;
            }
        },
        onUploaded: function (d) {
            var result = {};
            var reader = new FileReader();
            reader.onloadend = function (dt) {
                var formData = new FormData();
                var jsData = {};
                var workbook = XLSX.read(dt.target.result, { type: 'binary', cellNF: false, cellDates: true, cellText: false });
                var sheetName = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[sheetName];
                if (parseInt(worksheet["!ref"].split(":")[1].substring(1, 3)) === 1) {
                    toast_notify("Upload gagal. Tidak ada data yang diubah.", "warning", 5000);
                    return;
                }
                var xlsxJson = XLSX.utils.sheet_to_json(worksheet, { header: "A", raw: false, dateNF: 'YYYY-MM-DD' });

                var CountLoop = 0;
                var arrayTest = ["KODE KANTOR", "NO DAFTAR", "TGL DAFTAR", "VALUTA", "FOB"];
                for (var key in xlsxJson[0]) {
                    if (xlsxJson[0][key].toUpperCase() !== arrayTest[CountLoop]) {
                        toast_notify("Upload Gagal. Template tidak sesuai.", "warning", 5000);
                        return;
                    }
                    CountLoop += 1;
                }

                xlsxJson.shift();
                if (xlsxJson.length === 0) {
                    toast_notify("Upload gagal. Data tidak ditemukan.", "warning", 5000);
                    return;
                }

                jsData["xlsJson"] = JSON.stringify(xlsxJson);
                jsData["xlsTipe"] = "ppe";
                jsData["id_netting"] = netId;
                formData.append('data', JSON.stringify(jsData));

                $.ajax({
                    url: routeApi + "Netting/UploadEkspor",
                    type: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        if (result[0].resultStatus === 1) {
                            toast_notify("Berhasil upload Excel", "success", 5000);
                            $("#gridNettingPeb").dxDataGrid("instance").refresh();
                        }
                        else
                            alert(result[0].msg_value);
                    }
                });
            };
            reader.onerror = function (ex) {
                toast_notify("Upload failed", "error", 5000);
            };
            reader.readAsBinaryString(d.file);
        }
    }).dxFileUploader("instance");

    $("#uploadPPI").show().dxFileUploader({
        visible: false,
        multiple: false,
        accept: ".xls, .xlsx",
        allowedFileExtensions: [".xlsx", ".xls"],
        invalidMaxFileSizeMessage: "Dokumen melebihi batas maksimum",
        maxFileSize: 25000000000,
        uploadUrl: routeApp + "Pelapor/InputNetting",
        uploadMode: "instantly",
        onUploading: function (e) {
            if (ViewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk upload excel", "warning", 5000);
                e.cancel = true;
            }
        },
        onUploaded: function (d) {
            var result = {};
            var reader = new FileReader();
            reader.onloadend = function (dt) {
                var formData = new FormData();
                var jsData = {};
                var workbook = XLSX.read(dt.target.result, { type: 'binary', cellNF: false, cellDates: true, cellText: false });
                var sheetName = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[sheetName];
                if (parseInt(worksheet["!ref"].split(":")[1].substring(1, 3)) === 1) {
                    toast_notify("Upload gagal. Tidak ada data yang diubah.", "warning", 5000);
                    return;
                }
                var xlsxJson = XLSX.utils.sheet_to_json(worksheet, { header: "A", raw: false, dateNF: 'YYYY-MM-DD' });

                var CountLoop = 0;
                var arrayTest = ["KODE KANTOR", "NO DAFTAR", "NO INVOICE", "TGL DAFTAR", "VALUTA", "CIF", "ALOKASI NETTING"];
                for (var key in xlsxJson[0]) {
                    if (xlsxJson[0][key].toUpperCase() !== arrayTest[CountLoop]) {
                        toast_notify("Upload Gagal. Template tidak sesuai.", "warning", 5000);
                        return;
                    }
                    CountLoop += 1;
                }

                xlsxJson.shift();
                if (xlsxJson.length === 0) {
                    toast_notify("Upload gagal. Data tidak ditemukan.", "warning", 5000);
                    return;
                }

                jsData["xlsJson"] = JSON.stringify(xlsxJson);
                jsData["xlsTipe"] = "ppi";
                jsData["id_netting"] = netId;
                formData.append('data', JSON.stringify(jsData));

                $.ajax({
                    url: routeApi + "Netting/UploadEkspor",
                    type: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        if (result[0].resultStatus === 1) {
                            toast_notify("Berhasil upload Excel", "success", 5000);
                            $("#gridNettingPib").dxDataGrid("instance").refresh();
                        }
                        else
                            alert(result[0].msg_value);
                    }
                });
            };
            reader.onerror = function (ex) {
                toast_notify("Upload failed", "error", 5000);
            };
            reader.readAsBinaryString(d.file);
        }
    });

    $("#uploadIncoming").show().dxFileUploader({
        visible: false,
        multiple: false,
        accept: ".xls, .xlsx",
        allowedFileExtensions: [".xlsx", ".xls"],
        invalidMaxFileSizeMessage: "Dokumen melebihi batas maksimum",
        maxFileSize: 25000000000,
        uploadUrl: routeApp + "Pelapor/InputNetting",
        uploadMode: "instantly",
        onUploading: function (e) {
            if (ViewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk upload excel", "warning", 5000);
                e.cancel = true;
            }
        },
        onUploaded: function (d) {
            var result = {};
            var reader = new FileReader();
            reader.onloadend = function (dt) {
                var formData = new FormData();
                var jsData = {};
                var workbook = XLSX.read(dt.target.result, { type: 'binary', cellNF: false, cellDates: true, cellText: false });
                var sheetName = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[sheetName];
                if (parseInt(worksheet["!ref"].split(":")[1].substring(1, 3)) === 1) {
                    toast_notify("Upload gagal. Tidak ada data yang diubah.", "warning", 5000);
                    return;
                }
                var xlsxJson = XLSX.utils.sheet_to_json(worksheet, { header: "A", raw: false, dateNF: 'YYYY-MM-DD' });

                var CountLoop = 0;
                var arrayTest = ["NO REF", "NO INVOICE", "ALOKASI INVOICE", "VALUTA", "ALOKASI NETTING"];
                for (var key in xlsxJson[0]) {
                    if (xlsxJson[0][key].toUpperCase() !== arrayTest[CountLoop]) {
                        toast_notify("Upload Gagal. Template tidak sesuai.", "warning", 5000);
                        return;
                    }
                    CountLoop += 1;
                }

                xlsxJson.shift();
                if (xlsxJson.length === 0) {
                    toast_notify("Upload gagal. Data tidak ditemukan.", "warning", 5000);
                    return;
                }

                jsData["xlsJson"] = JSON.stringify(xlsxJson);
                jsData["xlsTipe"] = "incoming";
                jsData["id_netting"] = netId;
                formData.append('data', JSON.stringify(jsData));

                $.ajax({
                    url: routeApi + "Netting/UploadEkspor",
                    type: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        if (result[0].resultStatus === 1) {
                            //$("#rowBtnSearchPPE").hide();
                            //$("#rowBtnSearchPPI").hide();
                            setLocalStorage("setOff", "OK");

                            toast_notify("Berhasil upload Excel", "success", 1000);
                            setTimeout(function () { window.location.reload();}, 1000)
                            //$("#gridNettingIncoming").dxDataGrid("instance").refresh();
                        }
                        else
                            alert(result[0].msg_value);
                    }
                });
            };
            reader.onerror = function (ex) {
                toast_notify("Upload failed", "error", 5000);
            };
            reader.readAsBinaryString(d.file);
        }
    });

    $("#uploadOutgoing").show().dxFileUploader({
        visible: false,
        multiple: false,
        accept: ".xls, .xlsx",
        allowedFileExtensions: [".xlsx", ".xls"],
        invalidMaxFileSizeMessage: "Dokumen melebihi batas maksimum",
        maxFileSize: 25000000000,
        uploadUrl: routeApp + "Pelapor/InputNetting",
        uploadMode: "instantly",
        onUploading: function (e) {
            if (ViewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk upload excel", "warning", 5000);
                e.cancel = true;
            }
        },
        onUploaded: function (d) {
            var result = {};
            var reader = new FileReader();
            reader.onloadend = function (dt) {
                var formData = new FormData();
                var jsData = {};
                var workbook = XLSX.read(dt.target.result, { type: 'binary', cellNF: false, cellDates: true, cellText: false });
                var sheetName = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[sheetName];
                if (parseInt(worksheet["!ref"].split(":")[1].substring(1, 3)) === 1) {
                    toast_notify("Upload gagal. Tidak ada data yang diubah.", "warning", 5000);
                    return;
                }
                var xlsxJson = XLSX.utils.sheet_to_json(worksheet, { header: "A", raw: false, dateNF: 'YYYY-MM-DD' });

                var CountLoop = 0;
                var arrayTest = ["NO REF", "NO INVOICE", "ALOKASI INVOICE", "VALUTA", "ALOKASI NETTING"];
                for (var key in xlsxJson[0]) {
                    if (xlsxJson[0][key].toUpperCase() !== arrayTest[CountLoop]) {
                        toast_notify("Upload Gagal. Template tidak sesuai.", "warning", 5000);
                        return;
                    }
                    CountLoop += 1;
                }

                xlsxJson.shift();
                if (xlsxJson.length === 0) {
                    toast_notify("Upload gagal. Data tidak ditemukan.", "warning", 5000);
                    return;
                }

                jsData["xlsJson"] = JSON.stringify(xlsxJson);
                jsData["xlsTipe"] = "outgoing";
                jsData["id_netting"] = netId;
                formData.append('data', JSON.stringify(jsData));

                $.ajax({
                    url: routeApi + "Netting/UploadEkspor",
                    type: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        if (result[0].resultStatus === 1) {
                            //$("#rowBtnSearchPPE").hide();
                            //$("#rowBtnSearchPPI").hide();
                            setLocalStorage("setOff", "OK");

                            toast_notify("Berhasil upload Excel", "success", 1000);
                            setTimeout(function () { window.location.reload(); }, 1000)
                            //$("#gridNettingOutgoing").dxDataGrid("instance").refresh();
                        }
                        else
                            alert(result[0].msg_value);
                    }
                });
            };
            reader.onerror = function (ex) {
                toast_notify("Upload failed", "error", 5000);
            };
            reader.readAsBinaryString(d.file);
        }
    });

    $('#btnDlExcelPPE').dxButton({
        icon: "exportxlsx",
        stylingMode: "outlined",
        text: "Download Template",
        type: "success",
        elementAttr: {
            class: "btnMarginRight"
        },
        onClick: function () {
            $("#gridExcelPPE").dxDataGrid("instance").exportToExcel();
        }
    });

    $('#btnUpExcelPPE').dxButton({
        icon: "upload",
        stylingMode: "outlined",
        text: "Upload Data2",
        type: "success",
        elementAttr: {
            class: "btnMarginRight"
        },
        onClick: function (e) {
            $.when(
                $("#uploadPPE").dxFileUploader("instance").reset()
            ).done(function () {
                $("#uploadPPE").dxFileUploader("instance")._isCustomClickEvent = true;
                $("#uploadPPE").dxFileUploader("instance")._$fileInput.click();
            });
        }
    });

    $('#btnDlExcelPPI').dxButton({
        icon: "exportxlsx",
        stylingMode: "outlined",
        text: "Download Template",
        type: "success",
        elementAttr: {
            class: "btnMarginRight"
        },
        onClick: function () {
            $("#gridExcelPPI").dxDataGrid("instance").exportToExcel();
        }
    });

    $('#btnUpExcelPPI').dxButton({
        icon: "upload",
        stylingMode: "outlined",
        text: "Upload Data",
        type: "success",
        elementAttr: {
            class: "btnMarginRight"
        },
        onClick: function (e) {
            $.when(
                $("#uploadPPI").dxFileUploader("instance").reset()
            ).done(function () {
                $("#uploadPPI").dxFileUploader("instance")._isCustomClickEvent = true;
                $("#uploadPPI").dxFileUploader("instance")._$fileInput.click();
            });
        }
    });

    $('#btnDlExcelInc').dxButton({
        icon: "exportxlsx",
        stylingMode: "outlined",
        text: "Download Template",
        type: "success",
        elementAttr: {
            class: "btnMarginRight"
        },
        onClick: function () {
            $("#gridExcelIncoming").dxDataGrid("instance").exportToExcel();
        }
    });

    $('#btnUpExcelInc').dxButton({
        icon: "upload",
        stylingMode: "outlined",
        text: "Upload Data",
        type: "success",
        elementAttr: {
            class: "btnMarginRight"
        },
        onClick: function (e) {
            $.when(
                $("#uploadIncoming").dxFileUploader("instance").reset()
            ).done(function () {
                $("#uploadIncoming").dxFileUploader("instance")._isCustomClickEvent = true;
                $("#uploadIncoming").dxFileUploader("instance")._$fileInput.click();
            });
        }
    });

    $('#btnDlExcelOut').dxButton({
        icon: "exportxlsx",
        stylingMode: "outlined",
        text: "Download Template",
        type: "success",
        elementAttr: {
            class: "btnMarginRight"
        },
        onClick: function () {
            $("#gridExcelOutgoing").dxDataGrid("instance").exportToExcel();
        }
    });

    $('#btnUpExcelOut').dxButton({
        icon: "upload",
        stylingMode: "outlined",
        text: "Upload Data",
        type: "success",
        elementAttr: {
            class: "btnMarginRight"
        },
        onClick: function (e) {
            $.when(
                $("#uploadOutgoing").dxFileUploader("instance").reset()
            ).done(function () {
                $("#uploadOutgoing").dxFileUploader("instance")._isCustomClickEvent = true;
                $("#uploadOutgoing").dxFileUploader("instance")._$fileInput.click();
            });
        }
    });

    $('#btnNetIncoming').dxButton({
        icon: "add",
        stylingMode: "outlined",
        text: "Netting Terima, Tambahkan Incoming",
        type: "default",
        elementAttr: {
            class: "btnMarginRight"
        },
        onClick: function (e) {
            var msg = cekZeroInvoice();
            if (msg === "OK") {
                var confMes = "<strong><em>PPE & PPI anda akan terkunci setelah anda berhasil menambahkan data dari \"Netting Terima\"!</em></strong>" +
                    " Apakah Anda yakin ingin melanjutkan prosedur ini ?";
                if (getLocalStorage("setOff") === "") {
                    var confRes = DevExpress.ui.dialog.confirm(confMes, "Peringatan !");
                    confRes.done(function (dialogResult) {
                        if (dialogResult) {
                            $("#rowBtnSearchPPE").hide();
                            $("#rowBtnSearchPPI").hide();
                            $("#nav-NettingIncoming-tab").click();
                        }
                    });
                } else {
                    $("#nav-NettingIncoming-tab").click();
                }
            } else {
                toast_notify(msg, "warning", 2000);
            }
        }
    });

    $('#btnNetOutgoing').dxButton({
        icon: "add",
        stylingMode: "outlined",
        text: "Netting Bayar, Tambahkan Outgoing",
        type: "default",
        elementAttr: {
            class: "btnMarginRight"
        },
        onClick: function (e) {
            var msg = cekZeroInvoice();
            if (msg === "OK") {
                var confMes = "<strong><em>PPE & PPI anda akan terkunci setelah anda berhasil menambahkan data dari \"Netting Bayar\"!</em></strong>" +
                    " Apakah Anda yakin ingin melanjutkan prosedur ini ?";
                if (getLocalStorage("setOff") === "") {
                    var confRes = DevExpress.ui.dialog.confirm(confMes, "Peringatan !");
                    confRes.done(function (dialogResult) {
                        if (dialogResult) {
                            $("#rowBtnSearchPPE").hide();
                            $("#rowBtnSearchPPI").hide();
                            $("#nav-NettingOutgoing-tab").click();
                        }
                    });
                } else {
                    $("#nav-NettingOutgoing-tab").click();
                }
            } else {
                toast_notify(msg, "warning", 2000);
            }
        }
    });

    function publicActionRequestMethod(url, method, data) {
        var d = $.Deferred();
        method = method || "GET";
        $.ajax(url, {
            method: method,
            data: data,
            cache: false,
            xhrFields: { withCredentials: true }
        }).done(function (result) {
            d.resolve(method === "GET" ? result.data : result);
            if (result === 1) {
                if (method === "POST") toast_notify("Data Berhasil diproses", "success");
            } else {
                if (method === "POST") toast_notify("Gagal Proses Data", "warning");
            }
        }).fail(function (xhr) {
            d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);
        });
        return d.promise();
    }

    function cekZeroInvoice() {
        var pib = $("#gridNettingPib").dxDataGrid("instance").getDataSource().items();
        var peb = $("#gridNettingPeb").dxDataGrid("instance").getDataSource().items();
        var msg = "OK";

        pib.forEach(function (val, ix) {
            if (val.alokasi_pib === 0) {
                msg = "Nilai Alokasi tidak boleh kosong! PPI(No #" + val.no_pib + ")";
            }
        });
        //peb.forEach(function (val, ix) {
        //    if (val.nilai_invoice_peb === 0) {
        //        msg = "Nilai Invoice tidak boleh kosong! PPE(No #" + val.no_peb + ")";
        //    }
        //});
        return msg;
    }

    function setNettingStatus() {
        var totalPib = $("#gridNettingPib").dxDataGrid("instance").getTotalSummaryValue("total_pib");
        totalPib = totalPib ? totalPib : 0;
        var totalPeb = $("#gridNettingPeb").dxDataGrid("instance").getTotalSummaryValue("total_peb");
        totalPeb = totalPeb ? totalPeb : 0;

        var totalPibUSD = $("#gridNettingPib").dxDataGrid("instance").getTotalSummaryValue("total_alokasi_usd");
        totalPibUSD = totalPibUSD ? totalPibUSD : 0;
        var totalPebUSD = $("#gridNettingPeb").dxDataGrid("instance").getTotalSummaryValue("total_peb_usd");
        totalPebUSD = totalPebUSD ? totalPebUSD : 0;

        console.log('totalPibUSD ' + totalPibUSD);
        console.log('totalPebUSD ' + totalPebUSD);

        var isExists = $("#gridNettingPib").dxDataGrid("instance").totalCount() > 0 &&
            $("#gridNettingPeb").dxDataGrid("instance").totalCount() > 0
            ? true
            : false;

        if (!isExists) {
            removeLocalStorage("nettingStatus");
            removeLocalStorage("nettingKuota");
            removeLocalStorage("nettingKuotaUSD");
        } else if (totalPibUSD > 0) {
            if (totalPibUSD > totalPebUSD) {
                setLocalStorage("nettingStatus", "outgoing");
                console.log("nettingStatus outgoing");
            }
            else if (totalPibUSD < totalPebUSD) {
                setLocalStorage("nettingStatus", "incoming");
                console.log("nettingStatus incoming");
            } else {
                setLocalStorage("nettingStatus", "OK");
                console.log("nettingStatus OK");
            }
            var kuota = Math.abs(totalPib - totalPeb).toFixed(2);
            var kuotaUSD = Math.abs(totalPibUSD - totalPebUSD).toFixed(2);
            setKuota(kuota, kuotaUSD);
        } else if (totalPibUSD == 0) removeLocalStorage("nettingStatus");
        nettingConfig();
    }

    function nettingConfig() {
        if (getLocalStorage("nettingStatus") === "incoming") {
            if (getLocalStorage("setOff") !== "") {
                $("#rowBtnSearchPPE").hide();
                $("#rowBtnSearchPPI").hide();

                $("#rowBtnSearchInc").show();
                $("#gridNettingIncoming").show();

                $("#gridNettingOutgoing").hide();
                $("#rowBtnSearchOut").hide();
                
                $("#gridUploadExportir").show();
                $("#btnClearTrx").show();
                $("#btnPostNetting").show();                
            }
            else {
                $("#rowBtnSearchPPE").show();
                $("#rowBtnSearchPPI").show();

                $("#rowBtnSearchInc").show();
                $("#gridNettingIncoming").show();

                $("#rowBtnSearchOut").hide();
                $("#gridNettingOutgoing").hide();

                $("#btnClearTrx").show();
                $("#gridUploadExportir").hide();
            }
        }
        else if (getLocalStorage("nettingStatus") === "outgoing") {
            if (getLocalStorage("setOff") !== "") {
                $("#rowBtnSearchPPE").hide();
                $("#rowBtnSearchPPI").hide();

                $("#rowBtnSearchInc").hide();
                $("#gridNettingIncoming").hide();

                $("#rowBtnSearchOut").show();
                $("#gridNettingOutgoing").show();

                $("#gridUploadExportir").show();
                $("#btnClearTrx").show();
                $("#btnPostNetting").show();
            }
            else {
                $("#rowBtnSearchPPE").show();
                $("#rowBtnSearchPPI").show();

                $("#rowBtnSearchInc").hide();
                $("#gridNettingIncoming").hide();

                $("#rowBtnSearchOut").show();
                $("#gridNettingOutgoing").show();

                $("#btnClearTrx").show();                
                $("#gridUploadExportir").hide();
            }
        }
        else if (getLocalStorage("nettingStatus") === "OK") {
            $("#rowBtnSearchPPE").show();
            $("#rowBtnSearchPPI").show();

            $("#rowBtnSearchInc").hide();
            $("#gridNettingIncoming").hide();

            $("#rowBtnSearchOut").hide();
            $("#gridNettingOutgoing").hide();

            $("#btnClearTrx").show();
            $("#btnPostNetting").show();
            $("#gridUploadExportir").show();            
        }
        else {
            $("#rowBtnSearchPPE").show();
            $("#rowBtnSearchPPI").show();

            $("#rowBtnSearchInc").hide();
            $("#gridNettingIncoming").hide();

            $("#rowBtnSearchOut").hide();
            $("#gridNettingOutgoing").hide();            

            $("#gridUploadExportir").hide();
            $("#btnClearTrx").hide();
            $("#btnPostNetting").hide();
        }
    }

    function setKuota(kuotaNetting, kuotaNettingUSD) {
        var total = 0, totalUSD = 0;
        if (getLocalStorage("nettingStatus") === "incoming") {
            total = $("#gridNettingIncoming").dxDataGrid("instance").getTotalSummaryValue("total_inc");
            totalUSD = $("#gridNettingIncoming").dxDataGrid("instance").getTotalSummaryValue("total_usd_alokasi");
            if (totalUSD || getLocalStorage("setOff")) {
                if (totalUSD < kuotaNettingUSD) setLocalStorage("setOff", "minus");
                else setLocalStorage("setOff", "OK");
            }
        }
        if (getLocalStorage("nettingStatus") === "outgoing") {
            total = $("#gridNettingOutgoing").dxDataGrid("instance").getTotalSummaryValue("total_out");
            totalUSD = $("#gridNettingOutgoing").dxDataGrid("instance").getTotalSummaryValue("total_usd_alokasi");
            if (totalUSD || getLocalStorage("setOff")) {
                if (totalUSD > kuotaNettingUSD) setLocalStorage("setOff", "plus");
                else setLocalStorage("setOff", "OK");
            }
        }
        var def = kuotaNetting - total;
        var usd = kuotaNettingUSD - totalUSD;
        setLocalStorage("nettingKuota", def);
        setLocalStorage("nettingKuotaUSD", usd);

        console.log('kuotaNettingUSD ' + kuotaNettingUSD);
        console.log('totalUSD ' + totalUSD);

        if (getLocalStorage("setOff") === "minus" && usd) {
            $("#kuotaNetting").text("-" + def.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $("#kuotaNettingUSD").text("-" + usd.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $("#setOffNetting").text("Devisa Kurang");
            $("#setOffID").show();
        }
        if (getLocalStorage("setOff") === "plus" && usd) {
            $("#kuotaNetting").text("+" + Math.abs(def).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $("#kuotaNettingUSD").text("+" + Math.abs(usd).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $("#setOffNetting").text("Devisa Lebih");
            $("#setOffID").show();
        }
        if (getLocalStorage("setOff") === "OK") {
            $("#kuotaNetting").text(Math.abs(def).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $("#kuotaNettingUSD").text(Math.abs(usd).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $("#setOffNetting").text("Devisa Sesuai");
            $("#setOffID").show();
        }
    }

    function postNetting() {
        var datas = {};
        var upJSon = "";
        $("#gridUploadExportir").dxDataGrid("instance").option("dataSource").forEach(function (val, ix) {
            upJSon = upJSon + '{"id_pel_jenis":' + val.id_pel_jenis + ',"path_file":"' + val.path_file + '"},';
        });
        upJSon = "[" + upJSon.substring(0, upJSon.length - 1) + "]";
        var netStat = getLocalStorage("nettingStatus");
        var setOff = netStat === "OK" ? "Devisa Sesuai" : getLocalStorage("setOff");
        setOff = setOff === "minus" ? "Devisa Kurang" : setOff;
        setOff = setOff === "plus" ? "Devisa Lebih" : setOff;
        setOff = setOff === "OK" ? "Devisa Sesuai" : setOff;

        datas["netStatus"] = getLocalStorage("nettingStatus");
        datas["setOff"] = setOff;
        datas["json_up"] = upJSon;
        datas["id_netting"] = netId;

        var formData = new FormData();
        formData.append("data", JSON.stringify(datas));

        var url = routeApi + "Netting/SaveAll";

        try {
            $.ajax(url, {
                method: "POST",
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                xhrFields: { withCredentials: true }
            }).done(function (result) {
                var msg = result[0]["msg_net"];
                if (msg === "OK") {
                    clearMyStorage();
                    toast_notify("Transaksi berhasil disimpan!", "success", 2500);

                    setTimeout(function () {
                        window.location.href = "Netting";
                    }, 2000)
                }
                else {
                    toast_notify(msg, "error", 2500);
                }
            });
        } catch (e) {
            toast_notify(e.message, "error");
            elm.disabled = false;
            elm.firstElementChild.className = "dx-icon dx-icon-check";
        }
    }

    function cancelNetting() {
        $.ajax(routeApi + "Netting/CancelAll", {
            method: "POST",
            cache: false
        }).done(function (result) {
            var msg = result[0]["msg_net"];
            if (msg === "OK") {
                clearMyStorage();
                toast_notify("Transaksi berhasil dibatalkan!", "success", 1000);
                $("#btnPostNetting").attr("disabled", false);
                $("#btnPostNetting>i").removeClass().addClass("far fa-save");

                window.location.reload();
            }
            else {
                toast_notify(msg, "error", 2500);
                $("#btnPostNetting").attr("disabled", false);
                $("#btnPostNetting>i").removeClass().addClass("far fa-save");
            }
        });
    }

    function clearMyStorage() {
        removeLocalStorage("setOff");
        removeLocalStorage("nettingStatus");
        removeLocalStorage("nettingKuota");
        removeLocalStorage("nettingKuotaUSD");
        removeLocalStorage("dokupenData");
    }

});