$(function () {
    let upData = getLocalStorage("dokupenData") === "" ? [] : JSON.parse(getLocalStorage("dokupenData"));

    $("#gridNettingPib").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_pib",
            load: function () {
                return $.getJSON(routeApi + "Netting/PibOnDuty");
            },
            update: function (key, values) {
                values["id_pel_pib"] = key;
                values["tanggal_invoice_pib"] = '01/01/2001';
                return publicActionRequestMethod(routeApi + "Netting/SavePibOnDuty?action=update", "POST", values);
            },
            remove: function (key) {
                return publicActionRequestMethod(routeApi + "Netting/SavePibOnDuty?action=delete",
                    "POST",
                    {
                        id_pel_pib: key,
                        tanggal_invoice_pib: '01/01/2001'
                    });
            }
        }),
        columnAutoWidth: true,
        //allowColumnResizing: true,
        showBorders: true,
        scrolling: {
            columnRenderingMode: "virtual1",
            showScrollbar: "always"
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
                cancelRowChanges: "",
                confirmDeleteMessage: "",
                confirmDeleteTitle: "",
                deleteRow: "",
                editRow: "",
                saveRowChanges: "",
                undeleteRow: "",
                validationCancelChanges: "Batalkan Perubahan"
            }
        },
        //columnFixing: { enabled: true },
        columns: [
            {
                caption: "Data PPI",
                alignment: "Center",
                columns: [
                    {
                        caption: "No. PPI",
                        alignment: "left",
                        dataField: "no_pib",
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
                        caption: "No. Invoice",
                        alignment: "left",
                        dataField: "no_invoice_pib",
                        allowEditing: false
                    },
                    {
                        caption: "Valuta Inv.",
                        alignment: "center",
                        dataField: "valuta_invoice_pib",
                        width: 64,
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
                        }
                    },
                    {
                        caption: "Nilai Invoice (USD)",
                        alignment: "right",
                        dataField: "nilai_invoice_usd_pib",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        allowEditing: false
                    }
                ]
            }
        ],
        summary: {
            totalItems: [
                {
                    column: "no_pib",
                    showInColumn: "no_pib",
                    displayFormat: "Total"
                }, {
                    name: "total_pib",
                    column: "nilai_invoice_pib",
                    showInColumn: "nilai_invoice_pib",
                    displayFormat: "{0}",
                    valueFormat: {
                        type: "fixedPoint",
                        precision: 2
                    },
                    summaryType: "sum"
                }, {
                    name: "total_pib_usd",
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

                var $edit = e.cellElement.find(".dx-link-edit");
                $edit.attr("title", "Ubah Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-edit">');

                var $save = e.cellElement.find(".dx-link-save");
                $save.attr("title", "Simpan Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-save">');

                var $cancel = e.cellElement.find(".dx-link-cancel");
                $cancel.attr("title", "Batal Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-revert">');
            }
        },
        onInitialized: function (e) {
            if (getLocalStorage("nettingStatus") !== "" && getLocalStorage("setOff") !== "") {
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
        wordWrapEnabled: true
    });

    $("#gridNettingPeb").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_peb",
            load: function () {
                return $.getJSON(routeApi + "Netting/PebOnDuty");
            },
            update: function (key, values) {
                values["id_pel_peb"] = key;
                values["tanggal_invoice_peb"] = '01/01/2001';
                return publicActionRequestMethod(routeApi + "Netting/SavePebOnDuty?action=update", "POST", values);
            },
            remove: function (key) {
                return publicActionRequestMethod(routeApi + "Netting/SavePebOnDuty?action=delete", "POST", {
                    id_pel_peb: key,
                    tanggal_invoice_peb: '01/01/2001'
                });
            }
        }),
        columnAutoWidth: true,
        //allowColumnResizing: true,
        showBorders: true,
        scrolling: {
            columnRenderingMode: "virtual1",
            showScrollbar: "always"
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
                cancelRowChanges: "",
                confirmDeleteMessage: "",
                confirmDeleteTitle: "",
                deleteRow: "",
                editRow: "",
                saveRowChanges: "",
                undeleteRow: "",
                validationCancelChanges: "Batalkan Perubahan"
            }
        },
        //columnFixing: { enabled: true },
        columns: [
            {
                caption: "Data PPE",
                alignment: "Center",
                columns: [
                    {
                        caption: "No. PPE",
                        alignment: "left",
                        dataField: "no_peb",
                        allowEditing: false
                    },
                    {
                        caption: "Tanggal PPE",
                        alignment: "right",
                        dataField: "tanggal_peb",
                        dataType: "date",
                        format: "dd-MM-yyyy",
                        width: 110,
                        allowEditing: false
                    },

                    {
                        caption: "Valuta PPE",
                        alignment: "center",
                        dataField: "valuta_fob_peb",
                        width: 64,
                        allowEditing: false
                    },
                    {
                        caption: "Nilai PPE",
                        alignment: "right",
                        dataField: "nilai_fob_peb",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        allowEditing: false
                    },
                    {
                        caption: "No. Invoice",
                        alignment: "left",
                        dataField: "no_invoice_peb",
                        allowEditing: false
                    },
                    {
                        caption: "Valuta Inv.",
                        alignment: "center",
                        dataField: "valuta_invoice_peb",
                        width: 64,
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
                        }
                    },
                    {
                        caption: "Nilai Invoice (USD)",
                        alignment: "right",
                        dataField: "nilai_invoice_usd_peb",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        allowEditing: false
                    }
                ]
            }
        ],
        summary: {
            totalItems: [
                {
                    column: "no_peb",
                    showInColumn: "no_peb",
                    displayFormat: "Total"
                }, {
                    name: "total_peb",
                    column: "nilai_invoice_peb",
                    showInColumn: "nilai_invoice_peb",
                    displayFormat: "{0}",
                    valueFormat: {
                        type: "fixedPoint",
                        precision: 2
                    },
                    summaryType: "sum"
                }, {
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
            if (getLocalStorage("nettingStatus") !== "" && getLocalStorage("setOff") !== "") {
                e.component._options.editing.allowUpdating = false;
                e.component._options.editing.allowDeleting = false;
                e.component.columnOption("command:edit", "visible", false);
            }
        },
        onContentReady: function (content) {
            setNettingStatus();
        },
        onRowValidating: function (e) {
            if (e.isValid && e.newData.nilai_invoice_peb === 0) {
                e.isValid = false;
                e.errorText = "Nilai Invoice PPE tidak boleh Nol(Kosong)!";
            }
        },
        onDataErrorOccured(er) {
            alert(er);
        },
        wordWrapEnabled: true
    });

    $("#gridNettingIncoming").hide().dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_inc",
            load: function () {
                return $.getJSON(routeApi + "Netting/IncomingOnDuty");
            },
            remove: function (key) {
                return publicActionRequestMethod(routeApi + "Netting/SaveIncomingOnDuty?action=delete", "POST", {
                    id_pel_inc: key
                });
            }
        }),
        columnAutoWidth: true,
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
                caption: "Netting Terima",
                alignment: "Center",
                columns: [
                    {
                        caption: "No. Rekening",
                        alignment: "left",
                        dataField: "no_rek_inc"
                    },
                    {
                        caption: "Valuta Terima",
                        alignment: "center",
                        dataField: "valuta_inc"
                    },
                    {
                        caption: "Nilai Terima",
                        alignment: "right",
                        dataField: "nilai_inc",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Tanggal Terima",
                        alignment: "right",
                        dataField: "tanggal_inc",
                        dataType: "date",
                        format: "dd-MM-yyyy"
                    },
                    {
                        caption: "No. Referensi",
                        alignment: "left",
                        dataField: "no_ref_inc"
                    },
                    {
                        caption: "Nilai Invoice",
                        alignment: "right",
                        dataField: "nilai_inv_inc",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Invoice USD",
                        alignment: "right",
                        dataField: "nilai_inv_usd_inc",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Nama Pengirim",
                        alignment: "left",
                        dataField: "nama_pengirim_inc"
                    },
                    {
                        caption: "Nama Bank",
                        alignment: "left",
                        dataField: "nama_bank_inc"
                    }
                ]
            }
        ],
        summary: {
            totalItems: [
                {
                    column: "no_ref_inc",
                    showInColumn: "no_ref_inc",
                    displayFormat: "Total"
                },
                {
                    name: "total_inv_inc",
                    column: "nilai_inv_inc",
                    showInColumn: "nilai_inv_inc",
                    displayFormat: "{0}",
                    valueFormat: {
                        type: "fixedPoint",
                        precision: 2
                    },
                    summaryType: "sum"
                },
                {
                    name: "total_inv_usd_inc",
                    column: "nilai_inv_usd_inc",
                    showInColumn: "nilai_inv_usd_inc",
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
            mode: "cell",
            startEditAction: "click",
            texts: {
                addRow: "Menambah Data",
                cancelAllChanges: "Batalkan Semua Perubahan",
                cancelRowChanges: "Batalkan",
                confirmDeleteMessage: "",
                confirmDeleteTitle: "",
                deleteRow: "",
                editRow: "Sunting",
                saveAllChanges: "Simpan Perubahan",
                saveRowChanges: "Simpan",
                undeleteRow: "Batalkan",
                validationCancelChanges: "Batalkan Perubahan"
            }
        },
        onCellPrepared: function (e) {
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $del = e.cellElement.find(".dx-link-delete");
                $del.attr("title", "Hapus Data").attr("style", "padding:5px 7px; display:inline; border:none;").append('<i class="dx-icon dx-icon-trash">');
            }
        },
        onContentReady: function (c) {
            setNettingStatus();            
        }
    });

    $("#gridNettingOutgoing").hide().dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_out",
            load: function () {
                return $.getJSON(routeApi + "Netting/OutgoingOnDuty");
            },
            remove: function (key) {
                return publicActionRequestMethod(routeApi + "Netting/SaveOutgoingOnDuty?action=delete", "POST", {
                    id_pel_out: key
                });
            }
        }),
        columnAutoWidth: true,
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
                caption: "Netting Bayar",
                alignment: "Center",
                columns: [
                    {
                        caption: "No. Rekening",
                        alignment: "left",
                        dataField: "no_rek_out"
                    },
                    {
                        caption: "Valuta Bayar",
                        alignment: "center",
                        dataField: "valuta_out"
                    },
                    {
                        caption: "Nilai Bayar",
                        alignment: "right",
                        dataField: "nilai_out",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Tanggal Bayar",
                        alignment: "right",
                        dataField: "tanggal_out",
                        dataType: "date",
                        format: "dd-MM-yyyy"
                    },
                    {
                        caption: "No. Referensi",
                        alignment: "left",
                        dataField: "no_ref_out"
                    },
                    {
                        caption: "Nilai Invoice",
                        alignment: "right",
                        dataField: "nilai_inv_out",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Invoice USD",
                        alignment: "right",
                        dataField: "nilai_inv_usd_out",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Nama Penerima",
                        alignment: "left",
                        dataField: "nama_penerima_out"
                    },
                    {
                        caption: "Nama Bank",
                        alignment: "left",
                        dataField: "nama_bank_out"
                    }
                ]
            }
        ],
        summary: {
            totalItems: [
                {
                    column: "no_ref_out",
                    showInColumn: "no_ref_out",
                    displayFormat: "Total"
                },
                {
                    name: "total_inv_out",
                    column: "nilai_inv_out",
                    showInColumn: "nilai_inv_out",
                    displayFormat: "{0}",
                    valueFormat: {
                        type: "fixedPoint",
                        precision: 2
                    },
                    summaryType: "sum"
                },
                {
                    name: "total_inv_usd_out",
                    column: "nilai_inv_usd_out",
                    showInColumn: "nilai_inv_usd_out",
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
            mode: "cell",
            startEditAction: "click",
            texts: {
                addRow: "Menambah Data",
                cancelAllChanges: "Batalkan Semua Perubahan",
                cancelRowChanges: "Batalkan",
                confirmDeleteMessage: "",
                confirmDeleteTitle: "",
                deleteRow: "",
                editRow: "Sunting",
                saveAllChanges: "Simpan Perubahan",
                saveRowChanges: "Simpan",
                undeleteRow: "Batalkan",
                validationCancelChanges: "Batalkan Perubahan"
            }
        },
        onCellPrepared: function (e) {
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $del = e.cellElement.find(".dx-link-delete");
                $del.attr("title", "Hapus Data").attr("style", "padding:5px 7px; display:inline; border:none;").append('<i class="dx-icon dx-icon-trash">');
            }
        },
        onContentReady: function (content) {
            setNettingStatus();
        }
    });

    $("#gridUploadImportir").hide().dxDataGrid({
        dataSource: upData,
        columnAutoWidth: false,
        scrolling: { columnRenderingMode: "virtual1" },
        paging: { pageSize: 10 },
        columns: [
            {
                caption: "Dokumen Pendukung",
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
                                    return $.getJSON(routeApi + "SaveDataNetting/getDocTypes?group_id=1");
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
                            var link = '<a href="' + routeApp + uri + '" target="_blank">Lihat Dokumen</a>';
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
                        $("#btnPostNetting").attr("disabled", false);
                    });
            }
        },
        onEditorPreparing: function (e) {
            if (e.parentType === "dataRow" && e.dataField === "path_file") {
                e.editorName = "dxFileUploader";
                e.editorOptions.allowCanceling = false,
                    e.editorOptions.selectButtonText = "Pilih Dokumen",
                    e.editorOptions.name = "pib_file",
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
                        DevExpress.ui.notify(msg, "error", 2000);
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
            $("#btnClearTrx").attr("disabled", false);
            $("#btnPostNetting").attr("disabled", false);
            setLocalStorage("dokupenData", JSON.stringify(e.component.getDataSource()._items));
        },
        onRowRemoved: function (e) {
            setLocalStorage("dokupenData", JSON.stringify(e.component.getDataSource()._items));
        }
    });

    $('#nav-Netting-tab').click(function () {
        //window.location.reload();
    });

    $("#btnNetIncoming").click(function () {
        var msg = cekZeroInvoice();
        if (msg === "OK") {
            var confMes = "<strong><em>PPI & PPE anda akan terkunci setelah anda berhasil menambahkan data dari \"Netting Terima\"!</em></strong>" +
                " Apakah Anda yakin ingin melanjutkan prosedur ini ?";
            if (getLocalStorage("setOff") === "") {
                var confRes = DevExpress.ui.dialog.confirm(confMes, "Peringatan !");
                confRes.done(function (dialogResult) {
                    if (dialogResult) {
                        $("#nav-NettingIncoming-tab").click();
                    }
                });
            } else {
                $("#nav-NettingIncoming-tab").click();
            }
        } else {
            DevExpress.ui.notify(msg, "warning", 2000);
        }
    });

    $("#btnNetOutgoing").click(function () {
        var msg = cekZeroInvoice();
        if (msg === "OK") {
            var confMes = "<strong><em>PPI & PPE anda akan terkunci setelah anda berhasil menambahkan data dari \"Netting Bayar\"!</em></strong>" +
                " Apakah Anda yakin ingin melanjutkan prosedur ini ?";
            if (getLocalStorage("setOff") === "") {
                var confRes = DevExpress.ui.dialog.confirm(confMes, "Peringatan !");
                confRes.done(function (dialogResult) {
                    if (dialogResult) {
                        $("#nav-NettingOutgoing-tab").click();
                    }
                });
            } else {
                $("#nav-NettingOutgoing-tab").click();
            }
        } else {
            DevExpress.ui.notify(msg, "warning", 2000);
        }
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
            DevExpress.ui.notify(zeroMsg, "warning", 4000);
            $("#btnPostNetting").attr("disabled", false);
            $("#btnPostNetting>i").removeClass().addClass("far fa-save");
            $("#btnPostNetting").attr("disabled", false);
            return;
        }

        if ($("#gridUploadImportir").dxDataGrid("instance").totalCount() === 0) {
            DevExpress.ui.notify("Anda belum melampirkan dokumen pendukung", "warning", 2000);
            $("#btnPostNetting").attr("disabled", false);
            $("#btnPostNetting>i").removeClass().addClass("far fa-save");
            $("#btnPostNetting").attr("disabled", false);
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
                        $("#btnPostNetting").attr("disabled", false);
                    }, 500));
            } else {
                $("#btnPostNetting").attr("disabled", false);
                $("#btnPostNetting>i").removeClass().addClass("far fa-save");
                $("#btnPostNetting").attr("disabled", false);
            }
        });        
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
                if (method === "POST") DevExpress.ui.notify("Data Berhasil diproses", "success");
            } else {
                if (method === "POST") DevExpress.ui.notify("Gagal Proses Data", "warning");
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
            if (val.nilai_invoice_pib === 0) {
                msg = "Nilai Invoice tidak boleh kosong! PPI(No #" + val.no_pib + ")";
            }
        });
        peb.forEach(function (val, ix) {
            if (val.nilai_invoice_peb === 0) {
                msg = "Nilai Invoice tidak boleh kosong! PPE(No #" + val.no_peb + ")";
            }
        });
        return msg;
    }

    function setNettingStatus() {
        var totalPib = $("#gridNettingPib").dxDataGrid("instance").getTotalSummaryValue("total_pib");
        totalPib = totalPib ? totalPib : 0;
        var totalPeb = $("#gridNettingPeb").dxDataGrid("instance").getTotalSummaryValue("total_peb");
        totalPeb = totalPeb ? totalPeb : 0;

        var totalPibUSD = $("#gridNettingPib").dxDataGrid("instance").getTotalSummaryValue("total_pib_usd");
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
        } else {
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
        }
        nettingConfig();
    }

    function nettingConfig() {
        if (getLocalStorage("nettingStatus") === "incoming") {
            if (getLocalStorage("setOff") !== "") {
                $("#rowBtnSearch").hide();
                $("#gridNettingOutgoing").hide();
                $("#gridNettingIncoming").show();
                $("#gridUploadImportir").show();
                $("#btnClearTrx").show();
                $("#btnNetIncoming").show();
                $("#btnPostNetting").show();
            }
            else {
                $("#btnNetOutgoing").hide();
                $("#btnNetIncoming").show();
                $("#btnClearTrx").show();
                $("#gridNettingOutgoing").hide(); 
                $("#gridNettingIncoming").show();
                $("#gridUploadImportir").hide();
            }
        }
        else if (getLocalStorage("nettingStatus") === "outgoing") {
            if (getLocalStorage("setOff") !== "") {
                $("#rowBtnSearch").hide();
                $("#gridNettingIncoming").hide();
                $("#gridNettingOutgoing").show();
                $("#gridUploadImportir").show();
                $("#btnClearTrx").show();
                $("#btnNetOutgoing").show();
                $("#btnPostNetting").show();
            }
            else {
                $("#btnNetIncoming").hide();
                $("#btnNetOutgoing").show();
                $("#btnClearTrx").show();
                $("#gridNettingIncoming").hide();
                $("#gridNettingOutgoing").show(); 
                $("#gridUploadImportir").hide();
            }
        }
        else if (getLocalStorage("nettingStatus") === "OK") {
            $("#gridNettingIncoming").hide();
            $("#gridNettingOutgoing").hide();
            $("#btnClearTrx").show();
            $("#btnNetIncoming").hide();
            $("#btnNetOutgoing").hide();
            $("#btnPostNetting").show();
            $("#gridUploadImportir").show();
        }
        else {
            $("#gridNettingIncoming").hide();
            $("#gridNettingOutgoing").hide();
            $("#btnNetIncoming").hide();
            $("#btnNetOutgoing").hide();
            $("#gridUploadImportir").hide();
            $("#btnClearTrx").hide();
            $("#btnPostNetting").hide();
        }
    }

    function setKuota(kuotaNetting, kuotaNettingUSD) {
        var total = 0, totalUSD = 0;
        if (getLocalStorage("nettingStatus") === "incoming") {
            total = $("#gridNettingIncoming").dxDataGrid("instance").getTotalSummaryValue("total_inv_inc");
            totalUSD = $("#gridNettingIncoming").dxDataGrid("instance").getTotalSummaryValue("total_inv_usd_inc");
            if (totalUSD || totalUSD === 0) {
                if (totalUSD < kuotaNettingUSD) setLocalStorage("setOff", "minus");
                else setLocalStorage("setOff", "OK");
            }
        }
        if (getLocalStorage("nettingStatus") === "outgoing") {
            total = $("#gridNettingOutgoing").dxDataGrid("instance").getTotalSummaryValue("total_inv_out");
            totalUSD = $("#gridNettingOutgoing").dxDataGrid("instance").getTotalSummaryValue("total_inv_usd_out");
            if (totalUSD || totalUSD === 0) {
                if (totalUSD > kuotaNettingUSD) setLocalStorage("setOff", "plus");
                else setLocalStorage("setOff", "OK");
            }
        }
        var def = kuotaNetting - total;
        var usd = kuotaNettingUSD - totalUSD;
        setLocalStorage("nettingKuota", def);
        setLocalStorage("nettingKuotaUSD", usd);

        if (getLocalStorage("setOff") === "minus" && def && usd) {
            $("#kuotaNetting").text("-" + def.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $("#kuotaNettingUSD").text("-" + usd.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $("#setOffNetting").text("Devisa Kurang");
            $("#setOffID").show();
        }
        if (getLocalStorage("setOff") === "plus" && def && usd) {
            $("#kuotaNetting").text("+" + Math.abs(def).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $("#kuotaNettingUSD").text("+" + Math.abs(usd).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $("#setOffNetting").text("Devisa Lebih");
            $("#setOffID").show();
        }
        if (getLocalStorage("setOff") === "OK") {
            $("#kuotaNetting").text(def.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $("#kuotaNettingUSD").text(usd.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $("#setOffNetting").text("Devisa Sesuai");
            $("#setOffID").show();
        }
    }
    
    function postNetting() {
        var datas = {};
        var upJSon = "";
        $("#gridUploadImportir").dxDataGrid("instance").option("dataSource").forEach(function (val, ix) {
            upJSon = upJSon + '{"id_pel_jenis":' + val.id_pel_jenis + ',"path_file":"' + val.path_file + '"},';
        });
        upJSon = "[" + upJSon.substring(0, upJSon.length - 1) + "]";
        datas["json_up"] = upJSon;

        var netStat = getLocalStorage("nettingStatus");
        var setOff = netStat === "OK" ? "Devisa Sesuai" : getLocalStorage("setOff");
        setOff = setOff === "minus" ? "Devisa Kurang" : setOff;
        setOff = setOff === "plus" ? "Devisa Lebih" : setOff;
        setOff = setOff === "OK" ? "Devisa Sesuai" : setOff;

        datas = JSON.stringify(datas);

        var url = routeApi + "Netting/SaveAll?" +
            "netStatus=" + netStat +
            "&setOff=" + setOff +
            "&unique=" + Date.now();

        $.ajax(url, {
            method: "POST",
            data: datas,
            contentType: 'application/json; charset=utf-8',
            cache: false
        }).done(function (result) {
            var msg = result[0]["msg_net"];
            if (msg === "OK") {
                clearMyStorage();
                DevExpress.ui.notify("Transaksi berhasil disimpan!", "success", 1000);
                window.location.reload();
            }
            else {
                DevExpress.ui.notify(msg, "error", 2500);
            }
        });
    }

    function cancelNetting() {
        $.ajax(routeApi + "Netting/CancelAll", {
            method: "POST",
            cache: false
        }).done(function (result) {
            var msg = result[0]["msg_net"];
            if (msg === "OK") {
                clearMyStorage();
                DevExpress.ui.notify("Transaksi berhasil dibatalkan!", "success", 1000);
                window.location.reload();
            }
            else {
                DevExpress.ui.notify(msg, "error", 2500);
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