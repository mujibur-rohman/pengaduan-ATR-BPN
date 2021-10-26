$(function () {
    var lookupJenisDP = {
        store: new DevExpress.data.CustomStore({
            key: "id_pel_jenis_dp",
            loadMode: "raw",
            load: function () {
                return $.getJSON(routeApi + "DokumenPendukung/JenisDP?group_id=1");
            }
        })
    };

    var lookupJnsTrx = {
        store: new DevExpress.data.CustomStore({
            key: "id_pel_jenis_trx",
            loadMode: "raw",
            load: function () {
                return $.getJSON(routeApi + "Invoice/getJenisTrx?jns_trx=20");
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

    var PPIds = {
        store: new DevExpress.data.CustomStore({
            key: "id_pel_pib",
            load: function () {
                return $.getJSON(routeApi + "Invoice/PibOnDuty");
            },
            update: function (key, values) {
                values["id_pel_pib"] = key;
                values["tanggal_invoice_pib"] = '01/01/2001';
                values["action"] = 'ubah';
                values["tipe"] = 'impor';
                return publicActionRequestMethod(routeApi + "Invoice/CRUDPibOnDuty", "POST", values);
            },
            remove: function (key) {
                return publicActionRequestMethod(routeApi + "Invoice/CRUDPibOnDuty", "POST", {
                    action: 'hapus'
                    , tipe: 'impor'
                    , id_pel_pib: key
                    , tanggal_invoice_pib: '01/01/2001'
                });
            }
        })
    };

    var upData = getLocalStorage("dokupenDataImp") === "" ? [] : JSON.parse(getLocalStorage("dokupenDataImp"));
   
    $("#gridInvImpPIB").dxDataGrid({
        dataSource: PPIds,
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
                confirmDeleteMessage: "<center>Anda akan membatalkan PPI.<br>Apakah anda yakin?</center>",
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
                caption: "PPI",
                alignment: "Center",
                columns: [
                    {
                        caption: "Nomor",
                        alignment: "left",
                        dataField: "no_pib",
                        allowEditing: false
                    },
                    {
                        caption: "Nomor KPBC",
                        alignment: "left",
                        dataField: "kpbc_pib",
                        allowEditing: false
                    },
                    {
                        caption: "Tanggal",
                        alignment: "right",
                        dataField: "tanggal_pib",
                        dataType: "date",
                        format: "dd-MM-yyyy",
                        allowEditing: false
                    },
                    {
                        caption: "Valuta",
                        alignment: "center",
                        dataField: "valuta_invoice_pib",
                        allowColumnResizing: true,
                        allowEditing: false
                    },
                    {
                        caption: "Nilai CIF",
                        alignment: "right",
                        dataField: "nilai_cif_pib",
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
                        dataField: "nilai_invoice_pib",
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
                        dataField: "nilai_invoice_usd_pib",
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
                        dataField: "id_status_selesai_pib",
                        lookup: {
                            dataSource: new DevExpress.data.CustomStore({
                                key: "kosta",
                                load: function () {
                                    return $.getJSON(routeApi + "Netting/ComboStatusPebPib?Type=20&NeedOutstanding=false");
                                }
                            }),
                            displayExpr: "nama",
                            valueExpr: "kosta"
                        },
                        allowEditing: false
                    },
                    {
                        caption: "Jumlah Set Invoice & Outgoing",
                        visible: true,
                        alignment: "right",
                        dataField: "jumlah_invoice_pib"
                    }
                ],

            }
        ],
        summary: {
            totalItems: [
                {
                    column: "no_pib",
                    showInColumn: "no_pib",
                    displayFormat: "TOTAL"
                },
                {
                    name: "TOTAL_INVOICE_USD_PIB",
                    column: "nilai_invoice_usd_pib",
                    showInColumn: "nilai_invoice_usd_pib",
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
            if (e.isValid && e.newData.nilai_invoice_pib === 0) {
                e.isValid = false;
                e.errorText = "Nilai Invoice PPI tidak boleh Nol(Kosong)!";
            }

            if (e.isValid && e.newData.jumlah_invoice_pib > 100) {
                e.isValid = false;
                e.errorText = "Jumlah invoice melebihi batas maksimum (100)!";
            }

            if (e.isValid && e.newData.jumlah_invoice_pib < 1) {
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

    $("#gridInvImpOutgoing").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_out",
            load: function () {
                return $.getJSON(routeApi + "Invoice/OutgoingOnDuty");
            },
            remove: function (key) {
                return publicActionRequestMethod(routeApi + "Invoice/CRUDOutgoingOnDuty", "POST", {
                      action: 'hapus'
                    , id_pel_out: key
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
                confirmDeleteMessage: "<center>Anda akan membatalkan Outgoing.<br>Apakah anda yakin?</center>",
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
                caption: "Outgoing",
                alignment: "Center",
                columns: [
                    {
                        caption: "Nomor Rekening",
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
                        caption: "Nilai Invoice",
                        alignment: "right",
                        dataField: "nilai_out",
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
                        dataField: "nilai_usd_out",
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
                        dataField: "alokasi_out",
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
                        dataField: "no_ref_out",
                        allowEditing: false
                    },
                    {
                        caption: "No. Dokumen",
                        alignment: "left",
                        dataField: "no_doc_out",
                        allowEditing: false
                    },
                    {
                        caption: "Tanggal Outgoing",
                        alignment: "right",
                        dataField: "tanggal_out",
                        dataType: "date",
                        format: "dd-MM-yyyy"
                    },
                    {
                        caption: "Nama Pembayar",
                        alignment: "left",
                        dataField: "nama_penerima_out",
                        allowEditing: false
                    },
                    {
                        caption: "BDDN",
                        alignment: "left",
                        dataField: "nama_bank_out",
                        allowEditing: false
                    }
                ]
            }
        ],
        summary: {
            totalItems: [
                {
                    column: "no_rek_out",
                    showInColumn: "no_rek_out",
                    displayFormat: "TOTAL"
                },
                {
                    name: "TOTAL_OUTGOING_USD",
                    column: "nilai_usd_out",
                    showInColumn: "nilai_usd_out",
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
            if ($('#gridInvImpOutgoing').dxDataGrid('getDataSource').totalCount() === 0) {
                $("#rowbtnSaveClear").css("display", "none");
                $("#gridUploadImportir").hide();
                //$('#rowbtnExcel').hide();
            }     
            else
            {
                $('#btnCariOutgoing').removeAttr("disabled");
                $("#rowbtnSaveClear").css("display", "block");
                $("#gridUploadImportir").show();
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

    $("#gridPIBxOutgoing").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_inv",
            load: function () {
                return $.getJSON(routeApi + "Invoice/InvoiceMatch?modul=impor");
            },
            update: function (key, values) {
                values["id_pel_inv"] = key;
                values["tanggal_invoice_peb"] = null;
                values["action"] = 'ubah';
                values["tipe"] = 2;
                return publicActionRequestMethod(routeApi + "Invoice/CRUDInvoiceMatch", "POST", values);
            },
            remove: function (key) {
                return publicActionRequestMethod(routeApi + "Invoice/CRUDInvoiceMatch", "POST", {
                      id_pel_inv: key
                    , action: 'hapus'
                    , tipe: 2
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
                        items: ["no_pib", "no_inv_pib", "tanggal_invoice_pib", "valuta_inv_pib", "final_inv_pib", "final_inv_usd_pib"]
                    },
                    {
                        itemType: "group",
                        colCount: 2,
                        colSpan: 2,
                        caption: "Outgoing",
                        items: [
                            {
                                caption: "No. Referensi",
                                alignment: "left",
                                dataField: "id_pel_out",
                                lookup: {
                                    dataSource: new DevExpress.data.CustomStore({
                                        load: function () {
                                            return $.getJSON(routeApi + "Invoice/OutgoingOnDuty");
                                        },
                                        byKey: function (key) {
                                            return $.get(routeApi + 'Invoice/DHEGetOut?reftable=refoutgoingonduty&key=' + key);
                                        }
                                    }),
                                    displayExpr: "no_ref_out",
                                    valueExpr: "id_pel_out"
                                }
                            },
                            "no_inv_out",
                            "no_rek_out",
                            "valuta_cif",
                            {
                                caption: "Nilai Alokasi",
                                alignment: "right",
                                dataField: "alokasi_out",
                                dataType: "number",
                                format: {
                                    type: "fixedPoint"
                                    , precision: 2
                                }
                                , editorOptions: {
                                    format: "#,##0.##"
                                }
                            },
                            "alokasi_out_usd",
                            "nama_penerima",
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
                caption: "PPI",
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
                                caption: "Nomor PPI",
                                alignment: "left",
                                dataField: "no_pib",
                                groupIndex: 0,
                                allowEditing: false
                            },
                            {
                                caption: "No. Invoice",
                                alignment: "left",
                                dataField: "no_inv_pib",
                                editorOptions: {
                                    maxLength: 30
                                }
                            },
                            {
                                caption: "Tanggal",
                                alignment: "right",
                                dataField: "tanggal_invoice_pib",
                                dataType: "date",
                                format: "dd-MM-yyyy",
                            },
                            {
                                caption: "Valuta",
                                alignment: "center",
                                dataField: "valuta_inv_pib",
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
                                dataField: "final_inv_pib",
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
                                dataField: "final_inv_usd_pib",
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
                caption: "Outgoing",
                alignment: "Center",
                columns: [
                    {
                        caption: "No. Referensi",
                        alignment: "left",
                        dataField: "id_pel_out",
                        lookup: {
                            dataSource: new DevExpress.data.CustomStore({
                                load: function () {
                                    return $.getJSON(routeApi + "Invoice/OutgoingOnDuty");
                                },
                                byKey: function (key) {
                                    return $.get(routeApi + 'Invoice/DHEGetOut?reftable=refoutgoingonduty&key=' + key);
                                }
                            }),
                            displayExpr: "no_ref_out",
                            valueExpr: "id_pel_out"
                        }
                    },
                    {
                        caption: "No. Dokumen",
                        alignment: "left",
                        dataField: "no_inv_out",
                        editorOptions: {
                            maxLength: 30
                        }
                    },
                    {
                        caption: "No. Rekening",
                        alignment: "left",
                        dataField: "no_rek_out",
                        allowEditing: false
                    },
                    {
                        caption: "Valuta",
                        alignment: "center",
                        dataField: "valuta_cif",
                        allowEditing: false
                    },
                    {
                        caption: "Nilai Alokasi",
                        alignment: "right",
                        dataField: "alokasi_out",
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
                        dataField: "alokasi_out_usd",
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
                        caption: "Nama Penerima",
                        alignment: "left",
                        dataField: "nama_penerima",
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
                    column: "no_inv_pib",
                    showInColumn: "no_inv_pib",
                    displayFormat: "TOTAL"
                },
                {
                    name: "TOTAL_CIF_USD",
                    column: "final_inv_usd_pib",
                    showInColumn: "final_inv_usd_pib",
                    displayFormat: "{0}",
                    valueFormat: {
                        type: "fixedPoint",
                        precision: 2
                    },
                    summaryType: "sum"
                },
                {
                    name: "TOTAL_ALOKASI_USD",
                    column: "alokasi_out_usd",
                    showInColumn: "alokasi_out_usd",
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
            if (e.dataField === "no_inv_pib" || e.dataField === "no_inv_out") {
                $(e.editorElement).dxTextBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridPIBxOutgoing").dxDataGrid("instance");
                    var index = e.row.rowIndex;

                    grid.cellValue(index, "no_inv_pib", args.value);
                    grid.cellValue(index, "no_inv_out", args.value);
                });
            }

            if (e.dataField === "final_inv_pib") {
                $(e.editorElement).dxNumberBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridPIBxOutgoing").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var valuta = e.row.data.valuta_inv_pib;
                    var id_pel_pib = e.row.data.id_pel_pib;

                    $.ajax({
                        url: routeApi + "Invoice/ConvertValutaOTF?type=PIB&value=" + args.value + "&valuta_from=" + valuta + "&valuta_to=USD&id=" + id_pel_pib,
                        type: "POST",
                        dataType: "json",
                        success: function (data) {
                            grid.cellValue(index, "final_inv_usd_pib", data);
                        },
                        timeout: 2000
                    });
                });
            }

            if (e.dataField === "valuta_inv_pib") {
                $(e.editorElement).dxSelectBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridPIBxOutgoing").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var id_pel_pib = e.row.data.id_pel_pib;
                    var nilai = e.row.data.final_inv_pib;

                    $.ajax({
                        url: routeApi + "Invoice/ConvertValutaOTF?type=PIB&value=" + nilai + "&valuta_from=" + args.value + "&valuta_to=USD&id=" + id_pel_pib,
                        type: "POST",
                        dataType: "json",
                        success: function (data) {
                            grid.cellValue(index, "final_inv_usd_pib", data);
                        },
                        timeout: 2000
                    });
                });
            }

            if (e.dataField === "alokasi_out") {
                $(e.editorElement).dxNumberBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridPIBxOutgoing").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var valuta = e.row.data.valuta_cif;
                    var id_pel_pib = e.row.data.id_pel_pib;

                    if (e.row.data.id_pel_out !== 0) {
                        $.ajax({
                            url: routeApi + "Invoice/ConvertValutaOTF?type=PIB&value=" + args.value + "&valuta_from=" + valuta + "&valuta_to=USD&id=" + id_pel_pib,
                            type: "POST",
                            dataType: "json",
                            success: function (data) {
                                grid.cellValue(index, "alokasi_out_usd", data);
                            },
                            timeout: 2000
                        });
                    }
                });
            }

            if (e.dataField === "id_pel_out") {
                $(e.editorElement).dxSelectBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridPIBxOutgoing").dxDataGrid("instance");
                    var index = e.row.rowIndex;

                    if (args.value !== 0) {
                        $.ajax({
                            url: routeApi + "Invoice/DHEGetOut?reftable=refoutgoingonduty&key=" + args.value,
                            type: "GET",
                            success: function (data) {
                                grid.cellValue(index, "no_inv_out", data.no_doc_out);
                                grid.cellValue(index, "no_rek_out", data.no_rek_out);
                                grid.cellValue(index, "valuta_cif", data.valuta_out);
                                grid.cellValue(index, "nama_penerima", data.nama_penerima_out);
                                grid.cellValue(index, "bddn", data.nama_bank_out);
                                if (e.row.cells[3].value === data.valuta_out) {
                                    if (e.row.cells[4].value > data.nilai_sisa) {
                                        grid.cellValue(index, "alokasi_out", data.nilai_sisa);
                                    } else {
                                        grid.cellValue(index, "alokasi_out", e.row.cells[4].value);
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
            $("#gridInvImpOutgoing").dxDataGrid("instance").refresh();
        },
        onRowUpdating: function (d) {
            if (ViewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk mengubah data", "warning", 5000);
                e.cancel = true;
            }
            else {
                var nil_alokasi = d.newData.alokasi_out !== undefined ? d.newData.alokasi_out : d.oldData.alokasi_out;
                var nil_inv = d.newData.final_inv_pib !== undefined ? d.newData.final_inv_pib : d.oldData.final_inv_pib;
                var inv_outgoing = d.newData.no_inv_out !== undefined ? d.newData.no_inv_out : d.oldData.no_inv_out;

                if (nil_alokasi < 0 || nil_inv < 0) {
                    toast_notify('Nilai input tidak boleh minus', "error", 5000);
                    d.isValid = false;
                }
                else if ((inv_outgoing !== undefined) && (inv_outgoing !== null)) {
                    if (inv_outgoing.length > 30) {
                        toast_notify('Maksimal input Invoice 30 karakter.', "error", 5000);
                        d.isValid = false;
                    } else if (inv_outgoing.length === 0) {
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

    $("#excelImportir").hide().dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_inv",
            load: function () {
                return $.getJSON(routeApi + "Invoice/InvoiceMatch?modul=impor");
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
                caption: "Nomor PPI",
                alignment: "left",
                dataField: "no_pib"
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
                dataField: "no_inv_pib",
                allowExporting: false
            },
            {
                caption: "Nomor Final Invoice",
                alignment: "left",
                dataField: "no_inv_pib"
            },
            {
                caption: "Tanggal Invoice",
                alignment: "right",
                dataField: "tanggal_invoice_pib",
                dataType: "date",
                format: "dd-MM-yyyy",
                allowExporting: false
            },
            {
                caption: "Tanggal Final Invoice",
                alignment: "right",
                dataField: "tanggal_invoice_pib",
                dataType: "date",
                format: "dd-MM-yyyy"
            },
            {
                caption: "Valuta Final Invoice",
                alignment: "center",
                dataField: "valuta_inv_pib"
            },
            {
                caption: "Nilai Invoice",
                alignment: "right",
                dataField: "final_inv_pib",
                allowExporting: false
            },
            {
                caption: "Nilai Final Invoice",
                alignment: "right",
                dataField: "final_inv_pib"
            },
            {
                caption: "Nomor Invoice Outgoing",
                alignment: "right",
                dataField: "no_inv_out"
            },
            {
                caption: "Nomor Final Invoice Outgoing",
                alignment: "left",
                dataField: "no_inv_out",
                allowExporting: false
            },
            {
                caption: "Nilai Alokasi Outgoing",
                alignment: "right",
                dataField: "alokasi_out"
            },
            {
                caption: "Nomor Referensi Outgoing",
                alignment: "left",
                dataField: "id_pel_out",
                //lookup: {
                //    dataSource: new DevExpress.data.CustomStore({
                //        load: function () {
                //            return $.getJSON(routeApi + "Invoice/OutgoingOnDuty");
                //        },
                //        byKey: function (key) {
                //            return $.get(routeApi + 'Invoice/DHEGetOut?reftable=refoutgoingonduty&key=' + key);
                //        }
                //    }),
                //    displayExpr: "no_ref_out",
                //    valueExpr: "id_pel_out"
                //}
            },
            {
                caption: "Peruntukan Sisa Outgoing",
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
            fileName: "Input Invoice Impor"
        }
    });

    $("#gridUploadImportir").hide().dxDataGrid({
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
                                    return $.getJSON(routeApi + "DokumenPendukung/JenisDP?group_id=1");
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
                            link = '<a href="' + routeApp + uri + '" target="_blank">View File</a>';

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
                e.editorOptions.name = "ppi_file",
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
                    } else {
                        e.setValue(null);
                    }
                };
                e.editorOptions.onUploaded = function (args) {
                    var respon = JSON.parse(args.request.response)[0];
                    e.setValue(respon.Path);
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
                if (e.data["path_file"]) {
                    var file = e.data["path_file"].split("/").pop();
                    var arname = file.split("."); arname.pop();
                    e.data["nama_file"] = arname.join("");
                }
            }
        },
        onRowInserted: function (e) {
            $("#rowbtnSaveClear").css("display", "block");
            setLocalStorage("dokupenDataImp", JSON.stringify(e.component.getDataSource()._items));
        },
        onRowRemoved: function (e) {
            setLocalStorage("dokupenDataImp", JSON.stringify(e.component.getDataSource()._items));
        }
    });

    $('#nav-InvoiceImpor-tab').click(function () {
        $("#gridInvImpPIB").dxDataGrid("instance").refresh();
        $("#gridInvImpOutgoing").dxDataGrid("instance").refresh();
        $("#gridPIBxOutgoing").dxDataGrid("instance").refresh();
        $('#excelImportir').dxDataGrid('instance').refresh();
    });

    $('#btnCariPIB').dxButton({
        icon: "add",
        stylingMode: "outlined",
        text: "Tambahkan Data PPI",
        type: "default",
        elementAttr: {
            class: "btnAddPopUP"
        },
        onClick: function () {
            $('#nav-InvoiceImporPIB-tab').click();
        }
    });

    $('#btnCariOutgoing').dxButton({
        icon: "add",
        stylingMode: "outlined",
        text: "Tambahkan Data Outgoing",
        type: "default",
        elementAttr: {
            class: "btnAddPopUP"
        },
        onClick: function () {
            $('#nav-InvoiceImporOutgoing-tab').click();
            $("#gridContainerOutgoing").dxDataGrid("instance").refresh();
        }
    });

    $("#uploadImpor").show().dxFileUploader({
        visible: false,
        multiple: false,
        accept: ".xls, .xlsx",
        allowedFileExtensions: [".xlsx", ".xls"],
        invalidMaxFileSizeMessage: "Dokumen melebihi batas maksimum",
        maxFileSize: 25000000000,
        uploadUrl: routeApp + "Pelapor/InvoiceImpor",
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
                var arrayTest = ["NOMOR PPI", "NOMOR FINAL INVOICE", "TANGGAL FINAL INVOICE", "VALUTA FINAL INVOICE", "NILAI FINAL INVOICE", "NOMOR INVOICE OUTGOING", "NILAI ALOKASI OUTGOING", "NOMOR REFERENSI OUTGOING", "PERUNTUKAN SISA OUTGOING"];
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
                jsData["tipeInv"] = 2;
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
                            $("#gridInvImpPIB").dxDataGrid("instance").refresh();
                            $("#gridInvImpOutgoing").dxDataGrid("instance").refresh();
                            $("#gridPIBxOutgoing").dxDataGrid("instance").refresh();
                            $("#excelImportir").dxDataGrid("instance").refresh();
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
            $("#excelImportir").dxDataGrid("instance").exportToExcel();
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
                $("#uploadImpor").dxFileUploader("instance").reset()
            ).done(function () {
                $("#uploadImpor").dxFileUploader("instance")._isCustomClickEvent = true;
                $("#uploadImpor").dxFileUploader("instance")._$fileInput.click();
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
                        formData.append('data', JSON.stringify({ action: 'clear', tipe: 2 }))
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
                                $('#nav-InvoiceImpor-tab').click();
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

            var totalGridUpload = $("#gridUploadImportir").dxDataGrid("instance").totalCount();

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
        $.ajax(url, {
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            xhrFields: { withCredentials: true }
        }).done(function (result) {
            d.resolve(result);
            $('#nav-InvoiceImpor-tab').click();
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
        $("#gridUploadImportir").dxDataGrid("instance").option("dataSource").forEach(function (val, ix) {
            upJSon = upJSon + '{"id_pel_jenis":' + val.id_pel_jenis + ',"path_file":"' + val.path_file + '"},';
        });
        upJSon = "[" + upJSon.substring(0, upJSon.length - 1) + "]";
        datas["json_up"] = upJSon;
        datas["tipe_inv"] = 2;
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
                    removeLocalStorage("dokupenDataImp");

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