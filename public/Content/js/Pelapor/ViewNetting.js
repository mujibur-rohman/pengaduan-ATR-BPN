$(function () {
    var today = new Date(); 
    var date = today.toJSON().slice(0, 10);
    var nDate = date.slice(0, 4) +
        + date.slice(5, 7) +
        + date.slice(8, 10); 

    let upData = getLocalStorage("dokupenData") === "" ? [] : JSON.parse(getLocalStorage("dokupenData"));

    $("#gridNettingPeb").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_peb",
            load: function () {
                return $.getJSON(routeApi + "Netting/PPENettingView?id=" + netId);
            }
        }),
        columnAutoWidth: true,
        //columnFixing: { enabled: true },
        allowColumnResizing: true,
        showBorders: true,
        //wordWrapEnabled: true,
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

    $("#gridNettingPib").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_pib",
            load: function () {
                return $.getJSON(routeApi + "Netting/PPINettingView?id=" + netId);
            }
        }),
        columnAutoWidth: true,
        //columnFixing: { enabled: true },
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

    $("#gridNettingIncoming").hide().dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_inc",
            load: function () {
                return $.getJSON(routeApi + "Netting/IncomingNettingView?id=" + netId);
            }
        }),
        columnAutoWidth: true,
        //columnFixing: { enabled: true },
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
            //e.component.option("summary").totalItems[0].displayFormat = "";
            //e.component.option("summary").totalItems[0].column = "";
            //e.component.option('summary', null);  
        },
        onExported: function (e) {
            e.component.columnOption("nilai_usd_inc", "visible", true);
            e.component.columnOption("nama_pengirim_inc", "visible", true);
            e.component.columnOption("nama_bank_inc", "visible", true);
            e.component.columnOption("alokasi_usd_inc", "visible", true);
            e.component.columnOption("sisa_alokasi", "visible", true);
            //e.component.option("summary").totalItems[0].displayFormat = "Total";
            //e.component.option("summary").totalItems[0].column = "alokasi_pib";
            //e.component.option('summary', this.summary);  
            e.component.endUpdate();
        },
    });

    $("#gridNettingOutgoing").hide().dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_out",
            load: function () {
                return $.getJSON(routeApi + "Netting/OutgoingNettingView?id=" + netId);
            }
        }),
        columnAutoWidth: true,
        //columnFixing: { enabled: true },
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
        },
        onExported: function (e) {
            e.component.columnOption("nilai_usd_out", "visible", true);
            e.component.columnOption("nama_penerima_out", "visible", true);
            e.component.columnOption("nama_bank_out", "visible", true);
            e.component.columnOption("alokasi_usd_out", "visible", true);
            e.component.columnOption("sisa_alokasi", "visible", true);
            e.component.endUpdate();
        },
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
                            var uri = opt.value.substr(1, opt.value.length);
                            var link = '<a href="' + routeApp + '" target="_blank">Lihat Dokumen</a>';
                            /*
                            var ext = opt.value.split(".").pop();
                            var link = '<a href="' + opt.value + '" target="_blank">' +
                                (ext === "pdf" || ext === "PDF" ? "Unduh Dokumen" : "Lihat Dokumen") + '</a>';
                            */
                            container.append(link);
                        }
                    }
                ]
            }
        ],
        //onCellPrepared: function (e) {
        //    if (e.rowType === "detail") {
        
        //        $("#btnClearTrx").attr("disabled", true);
        //        $("#btnPostNetting").attr("disabled", true);
        //        var $save = e.cellElement.find(e.cellElement.find(".dx-datagrid-form-buttons-container").children()[0]);
        //        $save.dxButton({
        //            icon: "save",
        //            text: "Simpan",
        //            stylingMode: "outlined",
        //            type: "default"
        //        });

        //        var $cancel = e.cellElement.find(e.cellElement.find(".dx-datagrid-form-buttons-container").children()[1]);
        //        $cancel.dxButton({
        //            icon: "close",
        //            text: "Batalkan",
        //            stylingMode: "outlined",
        //            type: "danger"
        //        });

        //        $cancel.on("click",
        //            function () {
        //                $("#btnClearTrx").attr("disabled", false);
        //                //$("#btnPostNetting").attr("disabled", false);
        //            });
        //    }
        //},
        //onEditorPreparing: function (e) {
        //    if (e.parentType === "dataRow" && e.dataField === "path_file") {
        //        e.editorName = "dxFileUploader";
        //        e.editorOptions.allowCanceling = false,
        //            e.editorOptions.selectButtonText = "Pilih Dokumen",
        //            e.editorOptions.name = "peb_file",
        //            e.editorOptions.labelText = "max 25Mb (.pdf .jpg .gif .png .bmp)",
        //            e.editorOptions.allowedFileExtensions = [".pdf", ".jpg", ".gif", ".png", ".bmp"],
        //            e.editorOptions.invalidFileExtensionMessage = "Jenis/Tipe dokumen tidak diperbolehkan!",
        //            e.editorOptions.maxFileSize = 25000000,
        //            e.editorOptions.invalidMaxFileSizeMessage = "Ukuran dokumen melebihi batas kapasitas maksimal!",
        //            e.editorOptions.uploadedMessage = "Unggah dokumen berhasil ",
        //            e.editorOptions.uploadFailedMessage = "Unggah dokumen gagal!";
        //        e.editorOptions.onValueChanged = function (args) {
        //            if (args.component._files[0].isValid()) {
        //                args.component.option('uploadUrl', routeApi + 'DokumenPendukung/UploadDokupen');
        //                e.setValue(args.value[0].name);
        //            } else {
        //                e.setValue(null);
        //            }
        //        };
        //        e.editorOptions.onUploaded = function (args) {
        //            var respon = JSON.parse(args.request.response)[0];
        //            //args.element.find(".dx-fileuploader-file-name").text(respon.Name);
        //            e.setValue(respon.Path);
        //        };
        //        e.editorOptions.onUploadError = function (args) {
        //            var xhttp = args.request;
        //            if (xhttp.readyState === 4 && xhttp.status === 0) {
        //                var msg = "Terjadi gangguan koneksi. Silahkan diulang kembali.";
        //                toast_notify(msg, "error", 2000);
        //                args.component.reset();
        //            }
        //        };
        //    }
        //},
        //onRowInserting: function (e) {
        //    if (e.data["path_file"]) {
        //        var file = e.data["path_file"].split("/").pop();
        //        var arname = file.split("."); arname.pop();
        //        e.data["nama_file"] = arname.join("");
        //    }
        //},
        //onRowInserted: function (e) {
        //    //$("#btnClearTrx").attr("disabled", false);
        //    //$("#btnPostNetting").attr("disabled", false);
        //    setLocalStorage("dokupenData", JSON.stringify(e.component.getDataSource()._items));
        //    $("#btnClearTrx").attr("disabled", false);
        //    if ($("#gridUploadExportir").dxDataGrid("instance").totalCount() > 0) {
        
        //        $("#btnPostNetting").attr("disabled", false);
        //    } else 
        //        $("#btnPostNetting").attr("disabled", true);
        //},
        //onRowRemoved: function (e) {
        //    setLocalStorage("dokupenData", JSON.stringify(e.component.getDataSource()._items));

        //    $("#btnClearTrx").attr("disabled", false);
        //    if ($("#gridUploadExportir").dxDataGrid("instance").totalCount() > 0) {
        
        //        $("#btnPostNetting").attr("disabled", false);
        //    } else {
        //        $("#btnPostNetting").attr("disabled", true);
        //    }
        //},
        onInitialized: function (e) {
            $("#btnClearTrx").attr("disabled", false);
            if (e.component.option("dataSource").length > 0) {
                
                $("#btnPostNetting").attr("disabled", false);
            } else {
                $("#btnPostNetting").attr("disabled", true);
            }
        }
    });

    function setNettingStatus() {
        var totalPib = $("#gridNettingPib").dxDataGrid("instance").getTotalSummaryValue("total_pib");
        totalPib = totalPib ? totalPib : 0;
        var totalPeb = $("#gridNettingPeb").dxDataGrid("instance").getTotalSummaryValue("total_peb");
        totalPeb = totalPeb ? totalPeb : 0;

        var totalPibUSD = $("#gridNettingPib").dxDataGrid("instance").getTotalSummaryValue("total_alokasi_usd");
        totalPibUSD = totalPibUSD ? totalPibUSD : 0;
        var totalPebUSD = $("#gridNettingPeb").dxDataGrid("instance").getTotalSummaryValue("total_peb_usd");
        totalPebUSD = totalPebUSD ? totalPebUSD : 0;

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
                
            }
            else if (totalPibUSD < totalPebUSD) {
                setLocalStorage("nettingStatus", "incoming");
                
            } else {
                setLocalStorage("nettingStatus", "OK");
                
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
                $("#gridNettingIncoming").show();

                $("#gridNettingOutgoing").hide();
                
                //$("#gridUploadExportir").show();            
            }
            else {
                $("#gridNettingIncoming").show();

                $("#gridNettingOutgoing").hide();

                $("#gridUploadExportir").hide();
            }
        }
        else if (getLocalStorage("nettingStatus") === "outgoing") {
            if (getLocalStorage("setOff") !== "") {
                $("#gridNettingIncoming").hide();

                $("#gridNettingOutgoing").show();

                //$("#gridUploadExportir").show();
            }
            else {
                $("#gridNettingIncoming").hide();

                $("#gridNettingOutgoing").show();
           
                $("#gridUploadExportir").hide();
            }
        }
        else if (getLocalStorage("nettingStatus") === "OK") {
            $("#gridNettingIncoming").hide();

            $("#gridNettingOutgoing").hide();

            //$("#gridUploadExportir").show();            
        }
        else {
            $("#gridNettingIncoming").hide();

            $("#gridNettingOutgoing").hide();            

            $("#gridUploadExportir").hide();
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
});