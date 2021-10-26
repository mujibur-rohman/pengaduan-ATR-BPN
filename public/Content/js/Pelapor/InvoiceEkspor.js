$(function () {
    var lookupJenisDP = {
        store: new DevExpress.data.CustomStore({
            key: "id_pel_jenis_dp",
            loadMode: "raw",
            load: function () {
                return $.getJSON(routeApi + "DokumenPendukung/JenisDP?group_id=3");
            }
        })
    };

    var lookupJnsTrx = {
        store: new DevExpress.data.CustomStore({
            key: "id_pel_jenis_trx",
            loadMode: "raw",
            load: function () {
                return $.getJSON(routeApi + "Invoice/getJenisTrx?jns_trx=10");
            }
        })
    };

    var lookupSandiReviewDP = {
        store: new DevExpress.data.CustomStore({
            key: "KD_DOK",
            loadMode: "raw",
            load: function () {
                return $.getJSON(routeApi + "Invoice/GetSandiReviewDP");
            }
        })
    };

    var PPEds = {
        store: new DevExpress.data.CustomStore({
            key: "id_pel_peb",
            load: function () {
                return $.getJSON(routeApi + "Invoice/PebOnDuty");
            },
            update: function (key, values) {
                values["id_pel_peb"] = key;
                values["tanggal_invoice_peb"] = '01/01/2001';
                values["action"] = 'ubah';
                values["tipe"] = 'ekspor';
                return publicActionRequestMethod(routeApi + "Invoice/CRUDPebOnDuty", "POST", values);
            },
            remove: function (key) {
                return publicActionRequestMethod(routeApi + "Invoice/CRUDPebOnDuty", "POST", {
                    action: 'hapus'
                    , tipe: 'ekspor'
                    , id_pel_peb: key
                    , tanggal_invoice_peb: '01/01/2001'
                });
            }
        })
    };

    var upData = getLocalStorage("dokupenDataEks") === "" ? [] : JSON.parse(getLocalStorage("dokupenDataEks"));
   
    $("#gridInvEksPEB").dxDataGrid({
        dataSource: PPEds,
        columnAutoWidth: true,
        columnFixing: { enabled: true },
        allowColumnResizing: true,
        showBorders: false,
        scrolling: {
            //useNative: true,
            columnRenderingMode: "virtual1"
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
                addRow: "Menambah Data",
                cancelAllChanges: "Batalkan Semua Perubahan",
                cancelRowChanges: " ",
                confirmDeleteMessage: "<center>Anda akan membatalkan PPE.<br>Apakah anda yakin?</center>",
                confirmDeleteTitle: "",
                deleteRow: "",
                editRow: "",
                saveAllChanges: "Simpan Perubahan",
                saveRowChanges: " ",
                undeleteRow: "Batalkan",
                validationCancelChanges: "Batalkan Perubahan"
            }
        },
        columns: [
            {
                caption: "PPE",
                alignment: "Center",
                columns: [
                    {
                        caption: "Nomor",
                        alignment: "left",
                        dataField: "no_peb",
                        allowEditing: false
                    },
                    {
                        caption: "Nomor KPBC",
                        alignment: "left",
                        dataField: "kpbc_peb",
                        allowEditing: false
                    },
                    {
                        caption: "Tanggal",
                        alignment: "right",
                        dataField: "tanggal_peb",
                        dataType: "date",
                        format: "dd-MM-yyyy",
                        allowEditing: false
                    },
                    {
                        caption: "Valuta",
                        alignment: "center",
                        dataField: "valuta_invoice_peb",
                        allowColumnResizing: true,
                        allowEditing: false
                    },
                    {
                        caption: "Nilai FOB",
                        alignment: "right",
                        dataField: "nilai_fob_peb",
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
                        caption: "Nilai Invoice",
                        alignment: "right",
                        dataField: "nilai_invoice_peb",
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
                        caption: "Nilai Invoice USD",
                        alignment: "right",
                        dataField: "nilai_invoice_usd_peb",
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
                        caption: "Status Selesai",
                        alignment: "left",
                        dataField: "id_status_selesai_peb",
                        lookup: {
                            dataSource: new DevExpress.data.CustomStore({
                                key: "kosta",
                                load: function () {
                                    return $.getJSON(routeApi + "Netting/ComboStatusPebPib?Type=10&NeedOutstanding=false");
                                }
                            }),
                            displayExpr: "nama",
                            valueExpr: "kosta"
                        },
                        allowEditing: false
                    },
                    {
                        caption: "Jumlah Set Invoice & Incoming",
                        visible: true,
                        alignment: "right",
                        dataField: "jumlah_invoice_peb"
                    }
                ],

            }
        ],
        summary: {
            totalItems: [
                {
                    column: "no_peb",
                    showInColumn: "no_peb",
                    displayFormat: "TOTAL"
                },
                {
                    name: "TOTAL_INVOICE_USD_PEB",
                    column: "nilai_invoice_usd_peb",
                    showInColumn: "nilai_invoice_usd_peb",
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
            }
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $edi = e.cellElement.find(".dx-link-edit");
                $edi.attr("title", "Ubah Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-edit">');
            }
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $save = e.cellElement.find(".dx-link-save");
                $save.attr("title", "Simpan Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-save">');
            }
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $cancel = e.cellElement.find(".dx-link-cancel");
                $cancel.attr("title", "Batal Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-revert">');
            }
        },
        onRowValidating: function (e) {
            if (e.isValid && e.newData.nilai_invoice_peb === 0) {
                e.isValid = false;
                e.errorText = "Nilai Invoice PPE tidak boleh Nol(Kosong)!";
            }

            if (e.isValid && e.newData.jumlah_invoice_peb > 100) {
                e.isValid = false;
                e.errorText = "Jumlah invoice melebihi batas maksimum (100)!";
            }

            if (e.isValid && e.newData.jumlah_invoice_peb < 1) {
                e.isValid = false;
                e.errorText = "Jumlah invoice minimum adalah 1!";
            }
        },
        onRowRemoving: function (e) {
            if (ViewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menghapus data", "warning", 5000);
                e.cancel = true;
            }
        },
        onRowUpdating: function (e) {
            if (ViewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk mengubah data", "warning", 5000);
                e.cancel = true;
            }
        }
    });

    $("#gridInvEksIncoming").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_inc",
            load: function () {
                return $.getJSON(routeApi + "Invoice/IncomingOnDuty");
            },
            remove: function (key) {
                return publicActionRequestMethod(routeApi + "Invoice/CRUDIncomingOnDuty", "POST", {
                      action: 'hapus'
                    , id_pel_inc: key
                });
            }
        }),
        columnAutoWidth: true,
        columnFixing: { enabled: true },
        allowColumnResizing: true,
        showBorders: true,
        scrolling: {
            //useNative: true,
            columnRenderingMode: "virtual1"
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
            texts: {
                addRow: "Menambah Data",
                cancelAllChanges: "Batalkan Semua Perubahan",
                cancelRowChanges: "Batalkan",
                confirmDeleteMessage: "<center>Anda akan membatalkan Incoming.<br>Apakah anda yakin?</center>",
                confirmDeleteTitle: "",
                deleteRow: "",
                editRow: "Sunting",
                saveAllChanges: "Simpan Perubahan",
                saveRowChanges: "Simpan",
                undeleteRow: "Batalkan",
                validationCancelChanges: "Batalkan Perubahan"
            }
        },
        columns: [
            {
                caption: "Incoming",
                alignment: "Center",
                columns: [
                    {
                        caption: "Nomor Rekening",
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
                        caption: "Nilai Invoice",
                        alignment: "right",
                        dataField: "nilai_inc",
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
                        caption: "Nilai Invoice USD",
                        alignment: "right",
                        dataField: "nilai_usd_inc",
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
                        caption: "Alokasi",
                        alignment: "right",
                        dataField: "alokasi_inc",
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
                        caption: "Sisa",
                        alignment: "right",
                        dataField: "nilai_sisa",
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
                        caption: "No. Referensi",
                        alignment: "left",
                        dataField: "no_ref_inc",
                        allowEditing: false
                    },
                    {
                        caption: "No. Dokumen",
                        alignment: "left",
                        dataField: "no_doc_inc",
                        allowEditing: false
                    },
                    {
                        caption: "Tanggal Incoming",
                        alignment: "right",
                        dataField: "tanggal_inc",
                        dataType: "date",
                        format: "dd-MM-yyyy"
                    },
                    {
                        caption: "Nama Pengirim",
                        alignment: "left",
                        dataField: "nama_pengirim_inc",
                        allowEditing: false
                    },
                    {
                        caption: "BDDN",
                        alignment: "left",
                        dataField: "nama_bank_inc",
                        allowEditing: false
                    }
                ]
            }
        ],
        summary: {
            totalItems: [
                {
                    column: "no_rek_inc",
                    showInColumn: "no_rek_inc",
                    displayFormat: "TOTAL"
                },
                {
                    name: "TOTAL_INCOMING_USD",
                    column: "nilai_usd_inc",
                    showInColumn: "nilai_usd_inc",
                    displayFormat: "{0}",
                    valueFormat: {
                        type: "fixedPoint",
                        precision: 2
                    },
                    summaryType: "sum"
                },
            ]
        },
        onCellPrepared: function (e) {
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $del = e.cellElement.find(".dx-link-delete");
                $del.attr("title", "Hapus Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-trash">');
            }
        },
        onContentReady: function (e) {
            if ($('#gridInvEksIncoming').dxDataGrid('getDataSource').totalCount() === 0) {
                $("#rowbtnSaveClear").css("display", "none");
                $("#gridUploadExportir").hide();
                //$('#rowbtnExcel').hide();
            }     
            else
            {
                $('#btnCariIncoming').removeAttr("disabled");
                $("#rowbtnSaveClear").css("display", "block");
                $("#gridUploadExportir").show();
                //$('#rowbtnExcel').show();
            }
                
        },
        onRowRemoving: function (e) {
            if (ViewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menghapus data", "warning", 5000);
                e.cancel = true;
            }
        }
    });

    $("#gridPEBxIncoming").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_inv",
            load: function () {
                return $.getJSON(routeApi + "Invoice/InvoiceMatch?modul=ekspor");
            },
            update: function (key, values) {
                values["id_pel_inv"] = key;
                values["tanggal_invoice_pib"] = null;
                values["action"] = 'ubah';
                values["tipe"] = 1;
                return publicActionRequestMethod(routeApi + "Invoice/CRUDInvoiceMatch", "POST", values);
            },
            remove: function (key) {
                return publicActionRequestMethod(routeApi + "Invoice/CRUDInvoiceMatch", "POST", {
                      id_pel_inv: key
                    , action: 'hapus'
                    , tipe: 1
                });
            },
        }),
        columnAutoWidth: true,
        columnFixing: { enabled: true },
        allowColumnResizing: true,
        showBorders: true,
        scrolling: {
            columnRenderingMode: "virtual1"
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
            //startEditAction: "click",
            texts: {
                addRow: "Menambah Data",
                cancelAllChanges: "Batalkan Perubahan",
                cancelRowChanges: "",
                confirmDeleteMessage: "<center>Anda akan membatalkan Invoice.<br>Apakah anda yakin?</center>",
                confirmDeleteTitle: "",
                deleteRow: "",
                editRow: "",
                saveAllChanges: "Simpan Perubahan",
                saveRowChanges: "",
                undeleteRow: "Batal",
                validationCancelChanges: "Batalkan Perubahan"
            },
            popup: {
                title: "Input Invoice",
                showTitle: true,
                width: 750,
                height: 525,
                position: {
                    my: "top",
                    at: "top",
                    of: window
                }
            },
            form: {
                items: [
                    {
                        itemType: "group",
                        colCount: 2,
                        colSpan: 2,
                        items: ["no_peb", "no_inv_peb", "tanggal_invoice_peb", "valuta_inv_peb", "final_inv_peb", "final_inv_usd_peb"]
                    },
                    {
                        itemType: "group",
                        colCount: 2,
                        colSpan: 2,
                        caption: "Incoming",
                        items: [
                            {
                                caption: "No. Referensi",
                                alignment: "left",
                                dataField: "id_pel_inc",
                                lookup: {
                                    dataSource: new DevExpress.data.CustomStore({
                                        load: function () {
                                            return $.getJSON(routeApi + "Invoice/IncomingOnDuty");
                                        },
                                        byKey: function (key) {
                                            return $.get(routeApi + 'Invoice/DHEGetInc?reftable=refincomingonduty&key=' + key);
                                        }
                                    }),
                                    displayExpr: "no_ref_inc",
                                    valueExpr: "id_pel_inc"
                                }
                            },
                            "no_inv_inc",
                            "no_rek_inc",
                            "valuta_inc",
                            {
                                caption: "Nilai Alokasi",
                                alignment: "right",
                                dataField: "alokasi_inc",
                                dataType: "number",
                                format: {
                                    type: "fixedPoint"
                                    , precision: 2
                                }
                                , editorOptions: {
                                    format: "#,##0.##"
                                }
                            },
                            "alokasi_inc_usd",
                            "nama_pengirim",
                            "bddn",
                            {
                                caption: "Peruntukan",
                                alignment: "left",
                                dataField: "id_pel_jenis_trx",
                                colSpan: 2,
                                lookup: {
                                    dataSource: lookupJnsTrx,
                                    displayExpr: "nama_trx",
                                    valueExpr: "id_pel_jenis_trx"
                                }
                            },
                            {
                                caption: "Jenis Transaksi",
                                alignment: "left",
                                dataField: "kd_dok",
                                colSpan: 2,
                                lookup: {
                                    dataSource: lookupSandiReviewDP,
                                    displayExpr: "KETERANGAN",
                                    valueExpr: "KD_DOK"
                                }
                            }
                        ]
                    }
                ]
            }
        },
        columns: [
            {
                caption: "PPE",
                alignment: "Center",
                columns: [
                    {
                        caption: "Invoice Final",
                        alignment: "Center",
                        columns: [
                            {
                                caption: "id",
                                alignment: "left",
                                dataField: "id_pel_inv",
                                visible: false,
                                allowEditing: false
                            },
                            {
                                caption: "Nomor PPE",
                                alignment: "left",
                                dataField: "no_peb",
                                groupIndex: 0,
                                allowEditing: false
                            },
                            {
                                caption: "No. Invoice",
                                alignment: "left",
                                dataField: "no_inv_peb",
                                editorOptions: {
                                    maxLength: 30
                                }
                            },
                            {
                                caption: "Tanggal",
                                alignment: "right",
                                dataField: "tanggal_invoice_peb",
                                dataType: "date",
                                format: "dd-MM-yyyy",
                            },
                            {
                                caption: "Valuta",
                                alignment: "center",
                                dataField: "valuta_inv_peb",
                                maxLength: 3,
                                minLength: 3,
                                lookup: {
                                    dataSource: new DevExpress.data.CustomStore({
                                        key: "KD_VAL",
                                        loadMode: "raw",
                                        load: function () {
                                            return $.getJSON(routeApi + "refValuta/GetRefValuta");
                                        },
                                        byKey: function (key) {
                                            return $.get(routeApi + 'refValuta/GetRefValutaById/' + key);
                                        }
                                    }),
                                    displayExpr: "KD_VAL",
                                    valueExpr: "KD_VAL",
                                    searchExpr: "KD_VAL"
                                }
                                , editorOptions: {
                                    maxLength: 3
                                }
                            },
                            {
                                caption: "Nilai Final",
                                alignment: "right",
                                dataField: "final_inv_peb",
                                dataType: "number",
                                format: {
                                    type: "fixedPoint",
                                    precision: 2
                                },
                                editorOptions: {
                                    format: "#,##0.##",
                                    min: 0
                                }
                            },
                            {
                                caption: "Nilai Final USD",
                                alignment: "right",
                                dataField: "final_inv_usd_peb",
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
                ]
            },
            {
                caption: "Incoming",
                alignment: "Center",
                columns: [
                    {
                        caption: "No. Referensi",
                        alignment: "left",
                        dataField: "id_pel_inc",
                        lookup: {
                            dataSource: new DevExpress.data.CustomStore({
                                load: function () {
                                    return $.getJSON(routeApi + "Invoice/IncomingOnDuty");
                                },
                                byKey: function (key) {
                                    return $.get(routeApi + 'Invoice/DHEGetInc?reftable=refincomingonduty&key=' + key);
                                }
                            }),
                            displayExpr: "no_ref_inc",
                            valueExpr: "id_pel_inc"
                        }
                    },
                    {
                        caption: "No. Dokumen",
                        alignment: "left",
                        dataField: "no_inv_inc",
                        editorOptions: {
                            maxLength: 30
                        }
                    },
                    {
                        caption: "No. Rekening",
                        alignment: "left",
                        dataField: "no_rek_inc",
                        allowEditing: false
                    },
                    {
                        caption: "Valuta",
                        alignment: "center",
                        dataField: "valuta_inc",
                        allowEditing: false
                    },
                    {
                        caption: "Nilai Alokasi",
                        alignment: "right",
                        dataField: "alokasi_inc",
                        dataType: "number",
                        format: {
                            type: "fixedPoint"
                          , precision: 2
                        },
                        editorOptions: {
                            format: "#,##0.##",
                            min: 0
                        }
                    },
                    {
                        caption: "Nilai Alokasi USD",
                        alignment: "right",
                        dataField: "alokasi_inc_usd",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        editorOptions: {
                            format: "#,##0.##",
                            min: 0
                        },
                        allowEditing: false
                    },
                    {
                        caption: "Nama Pengirim",
                        alignment: "left",
                        dataField: "nama_pengirim",
                        allowEditing: false
                    },
                    {
                        caption: "BDDN",
                        alignment: "left",
                        dataField: "bddn",
                        allowEditing: false
                    },
                    {
                        caption: "Peruntukan",
                        alignment: "left",
                        dataField: "id_pel_jenis_trx",
                        lookup: {
                            dataSource: lookupJnsTrx,
                            displayExpr: "nama_trx",
                            valueExpr: "id_pel_jenis_trx"
                        }
                    },
                    {
                        caption: "Jenis Transaksi",
                        alignment: "left",
                        dataField: "kd_dok",
                        lookup: {
                            dataSource: lookupSandiReviewDP,
                            displayExpr: "KETERANGAN",
                            valueExpr: "KD_DOK"
                        }
                    }
                ]
            }
        ],
        summary: {
            totalItems: [
                {
                    column: "no_inv_peb",
                    showInColumn: "no_inv_peb",
                    displayFormat: "TOTAL"
                },
                {
                    name: "TOTAL_FOB_USD",
                    column: "final_inv_usd_peb",
                    showInColumn: "final_inv_usd_peb",
                    displayFormat: "{0}",
                    valueFormat: {
                        type: "fixedPoint",
                        precision: 2
                    },
                    summaryType: "sum"
                },
                {
                    name: "TOTAL_ALOKASI_USD",
                    column: "alokasi_inc_usd",
                    showInColumn: "alokasi_inc_usd",
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
            }
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $edi = e.cellElement.find(".dx-link-edit");
                $edi.attr("title", "Ubah Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-edit">');
            }
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $save = e.cellElement.find(".dx-link-save");
                $save.attr("title", "Simpan Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-save">');
            }
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $cancel = e.cellElement.find(".dx-link-cancel");
                $cancel.attr("title", "Batal Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-revert">');
            }
        },
        onEditorPrepared: function (e) {
            if (e.dataField === "no_inv_peb" || e.dataField === "no_inv_inc") {
                $(e.editorElement).dxTextBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridPEBxIncoming").dxDataGrid("instance");
                    var index = e.row.rowIndex;

                    grid.cellValue(index, "no_inv_peb", args.value);
                    grid.cellValue(index, "no_inv_inc", args.value);
                });
            }

            if (e.dataField === "final_inv_peb") {
                $(e.editorElement).dxNumberBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridPEBxIncoming").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var valuta = e.row.data.valuta_inv_peb;
                    var id_pel_peb = e.row.data.id_pel_peb;

                    $.ajax({
                        url: routeApi + "Invoice/ConvertValutaOTF?type=PEB&value=" + args.value + "&valuta_from=" + valuta + "&valuta_to=USD&id=" + id_pel_peb,
                        type: "POST",
                        dataType: "json",
                        success: function (data) {
                            grid.cellValue(index, "final_inv_usd_peb", data);
                        },
                        timeout: 2000
                    });
                });
            }

            if (e.dataField === "valuta_inv_peb") {
                $(e.editorElement).dxSelectBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridPEBxIncoming").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var id_pel_peb = e.row.data.id_pel_peb;
                    var nilai = e.row.data.final_inv_peb;

                    $.ajax({
                        url: routeApi + "Invoice/ConvertValutaOTF?type=PEB&value=" + nilai + "&valuta_from=" + args.value + "&valuta_to=USD&id=" + id_pel_peb,
                        type: "POST",
                        dataType: "json",
                        success: function (data) {
                            grid.cellValue(index, "final_inv_usd_peb", data);
                        },
                        timeout: 2000
                    });
                });
            }

            if (e.dataField === "alokasi_inc") {
                $(e.editorElement).dxNumberBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridPEBxIncoming").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var valuta = e.row.data.valuta_inc;
                    var id_pel_peb = e.row.data.id_pel_peb;

                    if (e.row.data.id_pel_inc !== 0) {
                        $.ajax({
                            url: routeApi + "Invoice/ConvertValutaOTF?type=PEB&value=" + args.value + "&valuta_from=" + valuta + "&valuta_to=USD&id=" + id_pel_peb,
                            type: "POST",
                            dataType: "json",
                            success: function (data) {
                                grid.cellValue(index, "alokasi_inc_usd", data);
                            },
                            timeout: 2000
                        });
                    }
                });
            }

            if (e.dataField === "id_pel_inc") {
                $(e.editorElement).dxSelectBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridPEBxIncoming").dxDataGrid("instance");
                    var index = e.row.rowIndex;

                    if (args.value !== 0) {
                        $.ajax({
                            url: routeApi + "Invoice/DHEGetInc?reftable=refincomingonduty&key=" + args.value,
                            type: "GET",
                            success: function (data) {
                                grid.cellValue(index, "no_inv_inc", data.no_doc_inc);
                                grid.cellValue(index, "no_rek_inc", data.no_rek_inc);
                                grid.cellValue(index, "valuta_inc", data.valuta_inc);
                                grid.cellValue(index, "nama_pengirim", data.nama_pengirim_inc);
                                grid.cellValue(index, "bddn", data.nama_bank_inc);
                                if (e.row.cells[3].value === data.valuta_inc) {
                                    if (e.row.cells[4].value > data.nilai_sisa) {
                                        grid.cellValue(index, "alokasi_inc", data.nilai_sisa);
                                    } else {
                                        grid.cellValue(index, "alokasi_inc", e.row.cells[4].value);
                                    }
                                }
                            },
                            timeout: 2000
                        });
                    }
                });
            }
        },
        onRowRemoving: function (e) {
            if (ViewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menghapus data", "warning", 5000);
                e.cancel = true;
            }
        },
        onRowRemoved: function (e)
        {
            $("#gridInvEksIncoming").dxDataGrid("instance").refresh();
        },
        onRowUpdating: function (d) {
            if (ViewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk mengubah data", "warning", 5000);
                e.cancel = true;
            }
            else {
                var nil_alokasi = d.newData.alokasi_inc !== undefined ? d.newData.alokasi_inc : d.oldData.alokasi_inc;
                var nil_inv = d.newData.final_inv_peb !== undefined ? d.newData.final_inv_peb : d.oldData.final_inv_peb;
                var inv_incoming = d.newData.no_inv_inc !== undefined ? d.newData.no_inv_inc : d.oldData.no_inv_inc;

                if (nil_alokasi < 0 || nil_inv < 0) {
                    toast_notify('Nilai input tidak boleh minus', "error", 5000);
                    d.isValid = false;
                }
                else if ((inv_incoming !== undefined) && (inv_incoming !== null)) {
                    if (inv_incoming.length > 30) {
                        toast_notify('Maksimal input Invoice 30 karakter.', "error", 5000);
                        d.isValid = false;
                    } else if (inv_incoming.length === 0) {
                        toast_notify('Nomor Invoice wajib diinput.', "error", 5000);
                        d.isValid = false;
                    }
                }
                else {
                    d.isValid = true;
                }

                if (d.isValid == false) {
                    d.cancel = true;
                }
                else {
                    var data = d.oldData;
                    Object.assign(data, d.newData);
                    d.newData = data;
                }
            }
        }
    }).dxDataGrid("instance");

    $("#excelExportir").hide().dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_inv",
            load: function () {
                return $.getJSON(routeApi + "Invoice/InvoiceMatch?modul=ekspor");
            }
        }),
        columns: [
            {
                caption: "Nomor KPBC",
                alignment: "left",
                dataField: "",
                allowExporting: false
            },
            {
                caption: "Nomor PPE",
                alignment: "left",
                dataField: "no_peb"
            },
            {
                caption: "Tanggal Daftar",
                alignment: "right",
                dataField: "",
                dataType: "date",
                format: "dd-MM-yyyy",
                allowExporting: false
            },
            {
                caption: "Nomor Invoice",
                alignment: "left",
                dataField: "no_inv_peb",
                allowExporting: false
            },
            {
                caption: "Nomor Final Invoice",
                alignment: "left",
                dataField: "no_inv_peb"
            },
            {
                caption: "Tanggal Invoice",
                alignment: "right",
                dataField: "tanggal_invoice_peb",
                dataType: "date",
                format: "dd-MM-yyyy",
                allowExporting: false
            },
            {
                caption: "Tanggal Final Invoice",
                alignment: "right",
                dataField: "tanggal_invoice_peb",
                dataType: "date",
                format: "dd-MM-yyyy"
            },
            {
                caption: "Valuta Final Invoice",
                alignment: "center",
                dataField: "valuta_inv_peb"
            },
            {
                caption: "Nilai Invoice",
                alignment: "right",
                dataField: "final_inv_peb",
                allowExporting: false
            },
            {
                caption: "Nilai Final Invoice",
                alignment: "right",
                dataField: "final_inv_peb"
            },
            {
                caption: "Nomor Invoice Incoming",
                alignment: "left",
                dataField: "no_inv_inc"
            },
            {
                caption: "Nomor Final Invoice Incoming",
                alignment: "left",
                dataField: "no_inv_inc",
                allowExporting: false
            },
            {
                caption: "Nilai Alokasi Incoming",
                alignment: "right",
                dataField: "alokasi_inc"
            },
            {
                caption: "Nomor Referensi Incoming",
                alignment: "left",
                dataField: "id_pel_inc",
                //lookup: {
                //    dataSource: new DevExpress.data.CustomStore({
                //        load: function () {
                //            return $.getJSON(routeApi + "Invoice/IncomingOnDuty");
                //        },
                //        byKey: function (key) {
                //            return $.get(routeApi + "Invoice/DHEGetInc?reftable=refincomingonduty&key=' + key);
                //        }
                //    }),
                //    displayExpr: "no_ref_inc",
                //    valueExpr: "id_pel_inc"
                //}
            },
            {
                caption: "Peruntukan Sisa Incoming",
                alignment: "left",
                dataField: "id_pel_jenis_trx",
                //lookup: {
                //    dataSource: lookupSandiReviewDP,
                //    displayExpr: "KETERANGAN",
                //    valueExpr: "KD_DOK"
                //}
            },
            {
                caption: "Jenis Transaksi",
                alignment: "left",
                dataField: "kd_dok",
                //lookup: {
                //    dataSource: lookupSandiReviewDP,
                //    displayExpr: "KETERANGAN",
                //    valueExpr: "KD_DOK"
                //},
                allowExporting: false

            }
        ],
        export: {
            enabled: true,
            fileName: "Input Invoice Ekspor"
        }
    });

    $("#gridUploadExportir").hide().dxDataGrid({
        dataSource: upData,
        columnAutoWidth: false,
        scrolling: { useNative: true, columnRenderingMode: "virtual1" },
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
                                    return $.getJSON(routeApi + "DokumenPendukung/JenisDP?group_id=3");
                                }
                            }),
                            displayExpr: "jenis_dp",
                            valueExpr: "id_pel_jenis_dp"
                        },
                        validationRules: [
                            {
                                type: "required",
                                message: "Jenis Dokumen Wajib Diisi",
                                align: "right"
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
                            var ar = opt.value.split("/");
                            var arname = ar[ar.length - 1].split(".");
                            var ext = arname[arname.length - 1];

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
                $("#rowbtnSaveClear").css("display", "none");
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
                    $("#rowbtnSaveClear").css("display", "block");
                });
            }
        },
        onEditorPreparing: function (e) {
            if (e.parentType === "dataRow" && e.dataField === "path_file") {
                e.editorName = "dxFileUploader";
                e.editorOptions.allowCanceling = false,
                e.editorOptions.selectButtonText = "Pilih Dokumen",
                e.editorOptions.name = "ppe_file",
                e.editorOptions.labelText = "max 25Mb (.pdf .jpg .gif .png .bmp)",
                e.editorOptions.allowedFileExtensions = [".pdf", ".jpg", ".gif", ".png", ".bmp"],
                e.editorOptions.invalidFileExtensionMessage = "Jenis/Tipe dokumen tidak diperbolehkan!",
                e.editorOptions.maxFileSize = 25000000000,
                e.editorOptions.invalidMaxFileSizeMessage = "Ukuran dokumen melebihi batas kapasitas maksimal!",
                e.editorOptions.uploadedMessage = "Unggah dokumen berhasil ",
                e.editorOptions.uploadFailedMessage = "Unggah dokumen gagal!",
                e.editorOptions.readyToUploadMessage = "Dokumen siap untuk diunggah",
                e.editorOptions.uploadMode = ViewOnly ? "useForm" : "instantly";
                //e.editorOptions.uploadUrl = routeApi + "DokumenPendukung/UploadDokupen";
                e.editorOptions.onValueChanged = function (args) {
                    if (args.component._files[0].isValid()) {
                        $(".dx-fileuploader-button").hide(); //Edit Budi
                        args.component.option('uploadUrl', routeApi + 'DokumenPendukung/UploadDokupen');
                        e.setValue(args.value[0].name);
                        console.log('onValueChanged ' + args.value[0].name);
                    } else {
                        e.setValue(null);
                    }
                };
                e.editorOptions.onUploaded = function (args) {
                    var respon = JSON.parse(args.request.response)[0];
                    e.setValue(respon.Path);
                    console.log('onUploaded ' + respon.Path);
                };
                e.editorOptions.onUploadError = function (args) {
                    var xhttp = args.request;
                    if (xhttp.readyState === 4 && xhttp.status === 0) {
                        var msg = "Terjadi gangguan koneksi. Silahkan diulang kembali.";
                        toast_notify(msg, "error", 5000);
                        args.component.reset();
                    }
                };
            }
        },
        onRowInserting: function (e) {
            if (ViewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menambah DP", "warning", 5000);
                e.cancel = true;
            }
            else {
                console.log('onRowInserting ' + e.data["path_file"]);
                if (e.data["path_file"]) {
                    var file = e.data["path_file"].split("/").pop();
                    var arname = file.split("."); arname.pop();
                    e.data["nama_file"] = arname.join("");
                    console.log('onRowInserting ' + e.data["nama_file"]);
                }
            }
        },
        onRowInserted: function (e) {
            $("#rowbtnSaveClear").css("display", "block");
            setLocalStorage("dokupenDataInv", JSON.stringify(e.component.getDataSource()._items));
            console.log('onRowInserted ' + JSON.stringify(e.component.getDataSource()._items))
        },
        onRowRemoved: function (e) {
            setLocalStorage("dokupenDataInv", JSON.stringify(e.component.getDataSource()._items));
        }
    });

    $('#nav-InvoiceEkspor-tab').click(function () {
        $("#gridInvEksPEB").dxDataGrid("instance").refresh();
        $("#gridInvEksIncoming").dxDataGrid("instance").refresh();
        $("#gridPEBxIncoming").dxDataGrid("instance").refresh();
        $('#excelExportir').dxDataGrid('instance').refresh();
    });

    $('#btnCariPEB').dxButton({
        icon: "add",
        stylingMode: "outlined",
        text: "Tambahkan Data PPE",
        type: "default",
        elementAttr: {
            class: "btnAddPopUP"
        },
        onClick: function () {
            $('#nav-InvoiceEksporPEB-tab').click();
        }
    });

    $('#btnCariIncoming').dxButton({
        icon: "add",
        stylingMode: "outlined",
        text: "Tambahkan Data Incoming",
        type: "default",
        elementAttr: {
            class: "btnAddPopUP"
        },
        onClick: function () {
            $('#nav-InvoiceEksporIncoming-tab').click();
            $("#gridContainerIncoming").dxDataGrid("instance").refresh();
        }
    });

    $("#uploadEkspor").show().dxFileUploader({
        visible: false,
        multiple: false,
        accept: ".xls, .xlsx",
        allowedFileExtensions: [".xlsx", ".xls"],
        invalidMaxFileSizeMessage: "Dokumen melebihi batas maksimum",
        maxFileSize: 25000000000,
        uploadUrl: routeApp + "Pelapor/InvoiceEkspor",
        uploadMode: "instantly",
        onUploading: function (e)
        {
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
                if (parseInt(worksheet["!ref"].split(":")[1].substring(1,3)) === 1)
                {
                    toast_notify("Upload gagal. Tidak ada data yang diubah.", "warning", 5000);
                    return;
                }
                var xlsxJson = XLSX.utils.sheet_to_json(worksheet, { header: "A", raw: false, dateNF: 'YYYY-MM-DD'});

                var CountLoop = 0;
                var arrayTest = ["NOMOR PPE","NOMOR FINAL INVOICE","TANGGAL FINAL INVOICE","VALUTA FINAL INVOICE","NILAI FINAL INVOICE","NOMOR INVOICE INCOMING","NILAI ALOKASI INCOMING","NOMOR REFERENSI INCOMING","PERUNTUKAN SISA INCOMING"];
                for (var key in xlsxJson[0]) {
                    if (xlsxJson[0][key].toUpperCase() !== arrayTest[CountLoop]) {
                        toast_notify("Upload Gagal. Template tidak sesuai.", "warning", 5000);
                        return;
                    }
                    CountLoop += 1;
                }

                xlsxJson.shift();
                if (xlsxJson.length === 0)
                {
                    toast_notify("Upload gagal. Data tidak ditemukan.", "warning", 5000);
                    return;
                }

                jsData["xlsJson"] = JSON.stringify(xlsxJson);
                jsData["tipeInv"] = 1;
                formData.append('data', JSON.stringify(jsData));

                $.ajax({
                    url: routeApi + "Invoice/UploadEkspor",
                    type: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        if (result[0].resultStatus === 1) {
                            toast_notify("Berhasil upload Excel", "success", 5000);
                            $("#gridInvEksPEB").dxDataGrid("instance").refresh();
                            $("#gridInvEksIncoming").dxDataGrid("instance").refresh();
                            $("#gridPEBxIncoming").dxDataGrid("instance").refresh();
                            $("#excelExportir").dxDataGrid("instance").refresh();
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

    $('#btnDlExcel').dxButton({
        icon: "exportxlsx",
        stylingMode: "outlined",
        text: "Download Data",
        type: "success",
        elementAttr: {
            class: "btnMarginRight"
        },
        disabled: false,
        onClick: function () {
            $("#excelExportir").dxDataGrid("instance").exportToExcel();
        }
    });

    $('#btnUpExcel').dxButton({
        icon: "upload",
        stylingMode: "outlined",
        text: "Upload Data",
        type: "success",
        elementAttr: {
            class: "btnMarginRight"
        },
        disabled: false,
        onClick: function () {
            $.when(
                $("#uploadEkspor").dxFileUploader("instance").reset()
            ).done(function () {
                $("#uploadEkspor").dxFileUploader("instance")._isCustomClickEvent = true;
                $("#uploadEkspor").dxFileUploader("instance")._$fileInput.click();
            });
        }
    });

    $('#btnClearTrx').dxButton({
        icon: "clearformat",
        stylingMode: "outlined",
        text: "Batalkan Transaksi",
        type: "danger",
        elementAttr: {
            class: "btnMarginRight"
        },
        onClick: function () {
            $("#btnSaveInvoice").dxButton({
                icon: "fas fa-spin fa-spinner",
                disabled: true
            });
            $("#btnClearTrx").dxButton({
                disabled: true
            });

            var confirm = DevExpress.ui.dialog.confirm("<i>Anda akan membatalkan transaksi Invoice. Apakah anda yakin?</i>", "Konfirmasi Proses Data");
            confirm.done(function (result) {
                if (ViewOnly) {
                    toast_notify("Anda tidak memiliki wewenang untuk Batalkan transaksi Invoice", "warning", 5000);
                } else {
                    if (result) {
                        var formData = new FormData();
                        formData.append('data', JSON.stringify({ action: 'clear', tipe: 1 }))
                        var url = routeApi + "Invoice/CRUDInvoiceMatch";
                        var d = $.Deferred();
                        $.ajax(url, {
                            type: "POST",
                            data: formData,
                            contentType: false,
                            processData: false,
                            cache: false,
                            xhrFields: { withCredentials: true }
                        }).done(function (result) {
                            d.resolve(result);
                            if (result.resultStatus === 1) {
                                $('#nav-InvoiceEkspor-tab').click();
                                toast_notify("Proses berhasil!", "success", 5000);
                            } else {
                                toast_notify("Proses gagal!", "warning", 5000);
                            }
                        }).fail(function (xhr) {
                            d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);
                            });

                        $("#btnSaveInvoice").dxButton({
                            icon: "save",
                            disabled: false
                        });
                        $("#btnClearTrx").dxButton({
                            disabled: false
                        });
                    }
                }
            });
        }
    });

    $('#btnSaveInvoice').dxButton({
        icon: "save",
        stylingMode: "outlined",
        text: "Simpan & Selesaikan Transaksi",
        type: "default",
        onClick: function () {
            $("#btnSaveInvoice").dxButton({
                icon: "fas fa-spin fa-spinner",
                disabled: true
            });
            $("#btnClearTrx").dxButton({
                disabled: true
            });

            var confTit = "Simpan & Selesaikan Transaksi ?";
            var confMes = "Apakah Anda yakin ingin menyimpan transaksi ini ? ";

            var totalGridUpload = $("#gridUploadExportir").dxDataGrid("instance").totalCount();

            //if (totalGridUpload > 0) {
                var confRes = DevExpress.ui.dialog.confirm(confMes, confTit);
                confRes.done(function (dialogResult) {
                    if (ViewOnly) {
                        toast_notify("Anda tidak memiliki wewenang untuk menyimpan transaksi Invoice", "warning", 5000);
                    } else {
                        if (dialogResult) {
                            postSave()
                        } else {
                            $("#btnSaveInvoice").dxButton({
                                icon: "save",
                                disabled: false
                            });
                            $("#btnClearTrx").dxButton({
                                disabled: false
                            });
                        }
                    }
                });
        }
    });

    function publicActionRequestMethod(url, method, data) {
        var d = $.Deferred();
        var formData = new FormData();
        formData.append('data', JSON.stringify(data));
        console.log(formData);
        $.ajax(url, {
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            xhrFields: { withCredentials: true }
        }).done(function (result) {
            d.resolve(result);
            $('#nav-InvoiceEkspor-tab').click();
            if (result.resultStatus === 1) {
                toast_notify(result.msg_value, "success", 5000);
            } else {
                toast_notify(result.msg_value, "warning", 5000);
            }
        }).fail(function (xhr) {
            d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);
        });
        return d.promise();
    }

    function postSave() {
        var formData = new FormData();
        var datas = {};
        var upJSon = "";
        var url = routeApi + "Invoice/SaveInvoice";
        $("#gridUploadExportir").dxDataGrid("instance").option("dataSource").forEach(function (val, ix) {
            upJSon = upJSon + '{"id_pel_jenis":' + val.id_pel_jenis + ',"path_file":"' + val.path_file + '"},';
        });
        upJSon = "[" + upJSon.substring(0, upJSon.length - 1) + "]";
        datas["json_up"] = upJSon;
        datas["tipe_inv"] = 1;
        formData.append('data', JSON.stringify(datas));

        var d = $.Deferred();
        try {
            $.ajax(url, {
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                cache: false
            }).done(function (result) {
                var msg = result["msg_value"];
                if (msg === "OK") {
                    $("#btnSaveInvoice").dxButton({
                        icon: "save",
                        disabled: false
                    });
                    $("#btnClearTrx").dxButton({
                        disabled: false
                    });
                    toast_notify("Transaksi berhasil disimpan!", "success", 3000);
                    removeLocalStorage("dokupenDataEks");

                    setTimeout(function () {
                        window.location.reload();
                    }, 3000);
                }
                else {
                    $("#btnSaveInvoice").dxButton({
                        icon: "save",
                        disabled: false
                    });
                    $("#btnClearTrx").dxButton({
                        disabled: false
                    });
                    toast_notify(msg, "error", 5000);
                }
            }).fail(function (xhr) {
                d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);

                $("#btnSaveInvoice").dxButton({
                    icon: "save",
                    disabled: false
                });
                $("#btnClearTrx").dxButton({
                    disabled: false
                });

                window.location.reload();
            });
            return d.promise();
        } catch (e) {
            toast_notify(e.message, "error", 5000);
            $("#btnSaveInvoice").dxButton({
                icon: "save",
                disabled: false
            });
            $("#btnClearTrx").dxButton({
                disabled: false
            });
        }
    }
});