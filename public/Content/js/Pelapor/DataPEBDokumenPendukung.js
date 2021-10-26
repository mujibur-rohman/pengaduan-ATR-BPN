$(function () {
    let dpMulti = [];
    let L2y = new Date().getFullYear() - 2;
    let popup = null;
    let idFile;
    let pebCols = [
        {
            caption: "Dokumen",
            alignment: "center",
            type: "buttons",
            buttons: [
                {
                    hint: "Dokumen Pendukung",
                    icon: "folder",
                    onClick: function (e) {
                        popDokupen(e.row.data.id_pel_peb, e.row.data.no_peb);
                    }
                }
            ]
        },
        {
            caption: "Data PPE",
            alignment: "Center",
            columns: [
                {
                    caption: "No. KPBC",
                    alignment: "left",
                    dataField: "kpbc_peb"
                }, {
                    caption: "No. PPE",
                    alignment: "left",
                    dataField: "no_peb"
                }, {
                    caption: "Tanggal PPE",
                    alignment: "right",
                    dataField: "tgl_peb",
                    dataType: "date",
                    format: "dd-MM-yyyy",
                    width: 103
                }, {
                    caption: "Tanggal Jatuh Tempo",
                    dataField: "tgl_jth_tempo_peb",
                    alignment: "right",
                    dataType: "date",
                    format: "dd-MM-yyyy",
                    width: 158
                }, {
                    caption: "Status Jatuh Tempo",
                    alignment: "left",
                    dataField: "status_jth_tempo_peb",
                    lookup: {
                        dataSource: [
                            { id: false, text: "Belum Jatuh Tempo" },
                            { id: true, text: "Sudah Jatuh Tempo" }
                        ],
                        displayExpr: "text",
                        valueExpr: "id"
                    }
                }, {
                    caption: "Val",
                    alignment: "center",
                    dataField: "val_peb"
                }, {
                    caption: "Nilai FOB",
                    alignment: "right",
                    dataField: "nilai_peb",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                }
            ]
        },
        {
            caption: "Invoice PPE",
            alignment: "Center",
            columns: [
                {
                    caption: "Nomor",
                    alignment: "left",
                    dataField: "no_inv_peb"
                }, {
                    caption: "Tanggal",
                    alignment: "right",
                    dataField: "tgl_inv_peb",
                    dataType: "date",
                    format: "dd-MM-yyyy"
                }, {
                    caption: "Val",
                    alignment: "center",
                    dataField: "val_inv_peb"
                }, {
                    caption: "Nilai Invoice",
                    alignment: "right",
                    dataField: "nilai_inv_peb",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                }
            ]
        },
        {
            caption: "Incoming",
            alignment: "center",
            columns: [
                {
                    caption: "Valuta",
                    alignment: "center",
                    dataField: "val_inc"
                }, {
                    caption: "Tanggal",
                    alignment: "right",
                    dataField: "tgl_inc",
                    dataType: "date",
                    format: "dd-MM-yyyy",
                    width: 103
                }, {
                    caption: "Nilai",
                    alignment: "right",
                    dataField: "nilai_inc"
                }
            ]
        },
        {
            caption: "Status",
            alignment: "center",
            columns: [
                {
                    caption: "SDA",
                    alignment: "left",
                    dataField: "flag_sda_peb",
                    lookup: {
                        dataSource: [
                            { id: false, text: "Non SDA" },
                            { id: true, text: "SDA" }
                        ],
                        displayExpr: "text",
                        valueExpr: "id"
                    },
                    width: 85
                }, {
                    caption: "Selesai PPE",
                    alignment: "left",
                    dataField: "status_selesai_peb",
                    lookup: {
                        dataSource: new DevExpress.data.CustomStore({
                            key: "kosta",
                            load: function () {
                                return $.getJSON(routeApi + "Netting/ComboStatusPebPib?Type=10&NeedOutstanding=false");
                            }
                        }),
                        displayExpr: "nama",
                        valueExpr: "kosta"
                    }
                }
            ]
        }
    ];

    $("#gridContainerPEB").show().dxDataGrid({
        keyExpr: "id_pel_peb",
        loadPanel: { enabled: true },
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnAutoWidth: true,
        showBorders: true,
        scrolling: { columnRenderingMode: "virtual1" },
        selection: { mode: "multiple" },
        onSelectionChanged: selTem => {
            if (selTem.selectedRowsData.length > 1) $("#aaDP").show();
            else $("#aaDP").hide();
        },
        pager: {
            allowedPageSizes: [5, 10, 20, 50],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: { pageSize: 10 },
        groupPanel: {
            visible: true,
            emptyPanelText: "Geser kolom ke sini untuk mengelompokan data"
        },
        grouping: {
            autoExpandAll: false,
            expandMode: "rowClick"
        },
        columnChooser: {
            enabled: true,
            mode: "select",
            title: "Pemilah Kolom"
        },
        columns: pebCols,
        onCellPrepared: function (e) {
            if (e.column.type === 'buttons' && e.rowType === 'header') {
                e.cellElement[0].innerText = "Dokumen";
            }
        }
    });

    $("#cmbSanKPBC_peb").dxSelectBox({
        dataSource: routeApi + "DataKPBC/GetKPBC",
        searchEnabled: true,
        searchExpr: ["KD_KANTOR", "NM_KANTOR"],
        showDataBeforeSearch: true,
        valueExpr: "KD_KANTOR",
        displayExpr: function (item) { return !item ? "" : item.KD_KANTOR + " - " + item.NM_KANTOR; },
        searchMode: 'contains',
        searchTimeout: 10,
        minSearchLength: 0,
        showClearButton: true,
        showSpinButtons: true,
        placeholder: "Ketik kode atau nama kantor untuk mencari"
    });

    $("#dateStart_peb").dxDateBox({
        type: "date",
        //max: new Date(),
        //min: new Date(L2y, 0, 1),
        displayFormat: "dd-MM-yyyy",
        placeholder: "Awal",
        useMaskBehavior: true,
        value: new Date(L2y, 0, 1)
    });

    $("#dateEnd_peb").dxDateBox({
        type: "date",
        //max: new Date(),
        //min: new Date(L2y, 0, 1),
        displayFormat: "dd-MM-yyyy",
        placeholder: "Akhir",
        useMaskBehavior: true,
        value: new Date()
    });

    $("#cmbStatusSelesai_peb").dxSelectBox({
        dataSource: routeApi + "Netting/ComboStatusPebPib?Type=10&NeedOutstanding=true",
        searchEnabled: true,
        searchExpr: ["kosta", "nama"],
        showDataBeforeSearch: true,
        valueExpr: "kosta",
        displayExpr: function (item) { return !item ? "" : item.kosta + " - " + item.nama; },
        searchMode: "contains",
        searchTimeout: 10,
        minSearchLength: 2,
        showClearButton: true,
        showSpinButtons: true,
        placeholder: "Ketik nama status untuk mencari"
    });

    $("#cmbStatusJatuhTempo_peb").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "0", text: "Belum Jatuh Tempo" },
            { id: "1", text: "Sudah Jatuh Tempo" }
        ],
        displayExpr: 'text',
        valueExpr: 'id',
        value: ""
    });

    $("#txtNoPEB").dxTextBox({
        type: "text",
        showClearButton: true,
        placeholder: "Masukkan Nomor PPE"
    });

    $("#txtNoInvoice_peb").dxTextBox({
        type: "text",
        showClearButton: true,
        placeholder: "Masukkan Nomor Invoice"
    });

    $("#txtFlagSDA_peb").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "0", text: "Non SDA" },
            { id: "1", text: "SDA" }
        ],
        displayExpr: 'text',
        valueExpr: 'id',
        value: ""
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
            sendRequestPeb(routeApi + "DokumenPendukung/DataPeb", "GET");
        }
    });

    $("#btnResetPEB").dxButton({
        icon: "revert",
        text: "Reset",
        type: "danger",
        stylingMode: "outlined",
        disabled: true,
        onClick: e => {
            $("#cmbSanKPBC_peb").dxSelectBox("instance").reset();
            $("#dateStart_peb").dxDateBox("instance").option("value", L2y);
            $("#dateEnd_peb").dxDateBox("instance").option("value", new Date);
            $("#cmbStatusSelesai_peb").dxSelectBox("instance").reset();
            $("#cmbStatusJatuhTempo_peb").dxSelectBox("instance").option("value", "");
            $("#txtNoPEB").dxTextBox("instance").reset();
            $("#txtNoInvoice_peb").dxTextBox("instance").reset();
            $("#txtFlagSDA_peb").dxSelectBox("instance").option("value", "");
            $("#gridContainerPEB").dxDataGrid("instance").option("dataSource", []);
            e.component.option("disabled", true);
            $("#btnSearchPEB").dxButton("instance").option("text", "Cari Data");
        }
    });
    
    $('#aaDP').hide().dxButton({
        icon: "add",
        stylingMode: "outlined",
        text: "Tambahkan DP ke semua PPE yang dipilih",
        type: "default",
        onClick: function () {
            var selTem = $("#gridContainerPEB").dxDataGrid("instance").getSelectedRowKeys();
            var nomer = $("#gridContainerPEB").dxDataGrid("instance").getSelectedRowsData().map(v => v.no_peb).join(", ");
            popDokupenMulti(selTem, nomer);
        }
    });
    
    function popDokupen(id, nomer) {
        if (popup) $("#popup>div").remove();
        var $popupContainer = $("<div />").appendTo($("#popup"));
        var gridDokumen = $('<div id="gridDokupen_' + id + '"/>').dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "id_pel_upload_dp",
                load: function () {
                    return $.getJSON(routeApi + "DokumenPendukung/GetDataPeb?pebid=" + id);
                },
                insert: function (values) {
                    if (id) values["id_pel_peb"] = id;
                    return dokuRequest(routeApi + "DokumenPendukung/SimpaninPeb", "POST", values);
                },
                remove: function (key) {
                    return dokuRequest(routeApi + "DokumenPendukung/Deletin", "POST", {
                        id_pel_upload_dp: key
                    });
                }
            }),
            loadPanel: { enabled: true },
            columnAutoWidth: true,
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
                                //var ar = opt.value.split("/");
                                //var arname = ar[ar.length - 1].split(".");
                                //var ext = arname[arname.length - 1];
                                //var link;
                                //if (ext === "pdf") link = '<a href="' + opt.value + '" target="_blank">Unduh Dokumen</a>';
                                //else link = '<a href="' + opt.value + '" target="_blank">Lihat Gambar</a>';
                                var uri = opt.value.substr(1, opt.value.length);
                                var link = '<a href="' + routeApp + uri + '" target="_blank">Lihat Dokumen</a>';
                                container.append(link);
                            }
                        },
                        {
                            caption: "Proses Terkait",
                            dataField: "id_pel_status",
                            lookup: {
                                dataSource: new DevExpress.data.CustomStore({
                                    key: "id_pel_status",
                                    loadMode: "raw",
                                    load: function () {
                                        return $.getJSON(routeApi + "DokumenPendukung/StatusPel?def=peb");
                                    }
                                }),
                                displayExpr: "status_name",
                                valueExpr: "id_pel_status"
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
                form: {
                    items: ["id_pel_jenis", "path_file"],
                    labelLocation: "top"
                },
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
                    var $save = e.cellElement.find(e.cellElement.find(".dx-datagrid-form-buttons-container").children()[0]);
                    $save.dxButton({
                        icon: "save",
                        text: "Simpan",
                        stylingMode: "outlined",
                        type: "default",
                        disabled: "true"
                    });

                    var $cancel = e.cellElement.find(e.cellElement.find(".dx-datagrid-form-buttons-container").children()[1]);
                    $cancel.dxButton({
                        icon: "close",
                        text: "Batalkan",
                        stylingMode: "outlined",
                        type: "danger"
                    });
                }
            },
            onEditorPreparing: function (e) {
                if (e.parentType === "dataRow" && e.dataField === "path_file") {
                    e.editorName = "dxFileUploader";
                    e.editorOptions.allowCanceling = false,
                        e.editorOptions.name = "peb_file",
                        e.editorOptions.selectButtonText = "Pilih Dokumen",
                        e.editorOptions.labelText = "max 25Mb (.pdf .jpg .gif .png .bmp)",
                        e.editorOptions.allowedFileExtensions = [".pdf", ".jpg", ".gif", ".png", ".bmp"],
                        e.editorOptions.invalidFileExtensionMessage = "Jenis/Tipe dokumen tidak diperbolehkan!",
                        e.editorOptions.maxFileSize = 25000000,
                        e.editorOptions.invalidMaxFileSizeMessage = "Ukuran dokumen melebihi batas kapasitas maksimal!",
                        e.editorOptions.uploadedMessage = "Unggah dokumen berhasil ",
                        e.editorOptions.uploadFailedMessage = "Unggah dokumen gagal!",
                        e.editorOptions.readyToUploadMessage = "Dokumen siap untuk diunggah",
                        e.editorOptions.uploadMode = viewOnly ? "useForm" : "instantly";
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
                        idFile = respon.id;

                        var $save = e.row.cells[0].cellElement.find(e.row.cells[0].cellElement.find(".dx-datagrid-form-buttons-container").children()[0]);
                        $save.removeClass("dx-state-disabled");
                        $save.dxButton({
                            icon: "save",
                            text: "Simpan",
                            stylingMode: "outlined",
                            type: "default"
                        });
                    };
                    e.editorOptions.onUploadError = function (args) {
                        var xhttp = args.request;
                        if (xhttp.readyState === 4 && xhttp.status === 0) {
                            var msg = "Terjadi gangguan koneksi. Silahkan diulang kembali.";
                            toast_notify(msg, "error", 4000);
                            args.component.reset();
                        }
                    };
                }
            },
            onRowInserting: function (e) {
                if (viewOnly) {
                    toast_notify("Anda tidak memiliki wewenang untuk menambah DP", "warning", 5000);
                    e.cancel = true;
                } else {
                    if (e.data["path_file"]) {
                        var file = e.data["path_file"].split("/").pop();
                        var arname = file.split("."); arname.pop();
                        e.data["nama_file"] = arname.join("");
                        e.data["id_file"] = idFile;
                    }
                }
            },
            onRowRemoving: function (e) {
                if (viewOnly) {
                    toast_notify("Anda tidak memiliki wewenang untuk menghapus data", "warning", 5000);
                    e.cancel = true;
                } else {
                    if (e.data.id_pel_status > 0) {
                        toast_notify("Dokumen terkait selain \"PPE\" tidak dapat dihapus", "warning", 5000);
                        e.cancel = true;
                    }
                }
            }
        });

        popup = $popupContainer.dxPopup({
            contentTemplate: function () { return gridDokumen; },
            position: "top",
            showTitle: true,
            title: "Daftar Dokumen Pendukung (No. PPE: " + nomer + ")",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: false
        }).dxPopup("instance");
        popup.show();
    }

    function popDokupenMulti(ids, nomers) {
        if (popup) $("#popup>div").remove();
        var $popupContainer = $("<div/>").appendTo($("#popup"));
        var gridDokumen = $('<div id="gridDokupenMulti' + ids.join("") + '"/>').dxDataGrid({
            dataSource: dpMulti,
            loadPanel: { enabled: true },
            columnAutoWidth: true,
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
                                var uri = opt.value.substr(1, opt.value.length);
                                var link = '<a href="' + routeApp + uri + '" target="_blank">Lihat Dokumen</a>';
                                container.append(link);
                            }
                        },
                        {
                            caption: "Proses Terkait",
                            dataField: "id_pel_status",
                            lookup: {
                                dataSource: new DevExpress.data.CustomStore({
                                    key: "id_pel_status",
                                    loadMode: "raw",
                                    load: function () {
                                        return $.getJSON(routeApi + "DokumenPendukung/StatusPel?def=peb");
                                    }
                                }),
                                displayExpr: "status_name",
                                valueExpr: "id_pel_status"
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
                form: {
                    items: ["id_pel_jenis", "path_file"],
                    labelLocation: "top"
                },
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
                    $("#btnCancelMulti").dxButton("instance").option("disabled", true);
                    if (!$("#btnSaveMulti").dxButton("instance").option("disabled")) $("#btnSaveMulti").dxButton("instance").option("disabled", true);

                    var $save = e.cellElement.find(e.cellElement.find(".dx-datagrid-form-buttons-container").children()[0]);
                    $save.dxButton({
                        icon: "save",
                        text: "Simpan",
                        stylingMode: "outlined",
                        type: "default",
                        disabled: "true"
                    });
                    $save.on("click",
                        function (c) {
                            $("#btnCancelMulti").dxButton("instance").option("disabled", false);
                            if (e.component.getDataSource().items().length === 0) {
                                $("#btnSaveMulti").dxButton("instance").option("disabled", true);
                            } else {
                                $("#btnSaveMulti").dxButton("instance").option("disabled", false);
                            }
                        });

                    var $cancel = e.cellElement.find(e.cellElement.find(".dx-datagrid-form-buttons-container").children()[1]);
                    $cancel.dxButton({
                        icon: "close",
                        text: "Batalkan",
                        stylingMode: "outlined",
                        type: "danger"
                    });
                    $cancel.on("click",
                        function (c) {
                            $("#btnCancelMulti").dxButton("instance").option("disabled", false);
                            if (e.component.getDataSource().items().length === 0) {
                                $("#btnSaveMulti").dxButton("instance").option("disabled", true);
                            } else {
                                $("#btnSaveMulti").dxButton("instance").option("disabled", false);
                            }
                        });
                }
            },
            onEditorPreparing: function (e) {
                if (e.parentType === "dataRow" && e.dataField === "path_file") {
                    e.editorName = "dxFileUploader";
                    e.editorOptions.allowCanceling = false,
                        e.editorOptions.name = "peb_file",
                        e.editorOptions.selectButtonText = "Pilih Dokumen",
                        e.editorOptions.labelText = "max 25Mb (.pdf .jpg .gif .png .bmp)",
                        e.editorOptions.allowedFileExtensions = [".pdf", ".jpg", ".gif", ".png", ".bmp"],
                        e.editorOptions.invalidFileExtensionMessage = "Jenis/Tipe dokumen tidak diperbolehkan!",
                        e.editorOptions.maxFileSize = 25000000,
                        e.editorOptions.invalidMaxFileSizeMessage = "Ukuran dokumen melebihi batas kapasitas maksimal!",
                        e.editorOptions.uploadedMessage = "Unggah dokumen berhasil ",
                        e.editorOptions.uploadFailedMessage = "Unggah dokumen gagal!",
                        e.editorOptions.readyToUploadMessage = "Dokumen siap untuk diunggah",
                        e.editorOptions.uploadMode = viewOnly ? "useForm" : "instantly";
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
                        e.setValue(respon.Path);
                        idFile = respon.id;

                        var $save = e.row.cells[0].cellElement.find(e.row.cells[0].cellElement.find(".dx-datagrid-form-buttons-container").children()[0]);
                        $save.removeClass("dx-state-disabled");
                        $save.dxButton({
                            icon: "save",
                            text: "Simpan",
                            stylingMode: "outlined",
                            type: "default"
                        });
                    };
                    e.editorOptions.onUploadError = function (args) {
                        var xhttp = args.request;
                        if (xhttp.readyState === 4 && xhttp.status === 0) {
                            var msg = "Terjadi gangguan koneksi. Silahkan diulang kembali.";
                            toast_notify(msg, "error", 4000);
                            args.component.reset();
                        }
                    };
                }
            },
            onRowInserting: function (e) {
                if (viewOnly) {
                    toast_notify("Anda tidak memiliki wewenang untuk menambah DP", "warning", 5000);
                    e.cancel = true;
                } else {
                    if (e.data["path_file"]) {
                        var file = e.data["path_file"].split("/").pop();
                        var arname = file.split("."); arname.pop();
                        e.data["nama_file"] = arname.join("");
                        e.data["id_pel_status"] = 0;
                        e.data["id_file"] = idFile;
                    }
                }
            },
            onRowInserted: e => {
                $("#btnSaveMulti").dxButton("instance").option("disabled", false);
            },
            onRowRemoving: function (e) {
                if (viewOnly) {
                    toast_notify("Anda tidak memiliki wewenang untuk menghapus data!", "warning", 5000);
                    e.cancel = true;
                } else {
                    if (e.data.id_pel_status > 0) {
                        toast_notify("Dokumen terkait selain \"PPE\" tidak dapat dihapus", "warning");
                        e.cancel = true;
                    }
                }
            }, 
            onRowRemoved: e => {
                if (e.component.getDataSource().items().length === 0) {
                    $("#btnSaveMulti").dxButton("instance").option("disabled", true);
                }
            }
        });

        popup = $popupContainer.dxPopup({
            contentTemplate: function (ct) {     
                var $konten = $("<div />").append(gridDokumen);
                $konten.append("<div style=\"margin-top:15px;\"><div id=\"btnCancelMulti\" /> &nbsp; <div id=\"btnSaveMulti\" /></div>");
                return $konten;
            },
            position: "top",
            showTitle: true,
            showCloseButton: false,
            closeOnBackButton: false,
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: false,
            toolbarItems: [
                {
                    html: "<p style=\"margin-bottom:5px; padding-bottom:5px; border-bottom: 2px solid black;\">Unggah Dokumen Pendukung PPE</p><span>(No. PPE: <small>" + nomers + "</small>)</span>",
                    location: "before"
                }
            ],
            onHiding: h => {
                h.cancel = true;
                if (dpMulti.length) {
                    var confMes = "Dokumen yang sudah anda unggah secara otomatis akan dihapus oleh sistem. Apakah anda yakin ingin melanjutkan proses ini ?";
                    var confRes = DevExpress.ui.dialog.confirm(confMes, "Konfirmasi Pembatalan DP");
                    confRes.done(function (dialogResult) {
                        if (dialogResult) {
                            dpMulti = [];
                            popup.hide();
                            h.cancel = false;
                        }
                    });
                } else {
                    h.cancel = false;
                }
            }
        }).dxPopup("instance");

        popup.show();

        $('#btnCancelMulti').dxButton({
            icon: "close",
            stylingMode: "outlined",
            text: "Batalkan Penambahan DP",
            type: "danger",
            onClick: function () {               
                popup.hide();
            }
        });

        $('#btnSaveMulti').dxButton({
            icon: "save",
            stylingMode: "outlined",
            text: "Simpan Data DP",
            type: "default",
            disabled: true,
            onClick: function () {
                var datas = {}; 
                datas["id_trx"] = 10;   //10 -> PEB
                datas["id_multi"] = ids.join();
                datas["json_dp"] = JSON.stringify(dpMulti);

                var formData = new FormData();
                formData.append("data", JSON.stringify(datas));

                $.ajax(routeApi + "DokumenPendukung/SaveMultiDP", {
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    cache: false
                }).done(function (result) {
                    var msg = result[0]["msg_dp"];
                    if (msg === "OK") {
                        toast_notify("Transaksi berhasil disimpan!", "success", 3000);
                        dpMulti = [];
                        $("#gridDokupenMulti" + ids.join("")).dxDataGrid({ dataSource: dpMulti });
                        popup.hide();
                        $("#gridContainerPEB").dxDataGrid("instance").clearSelection();
                    }
                    else {
                        toast_notify(msg, "error", 4000);
                    }
                });
            }
        });
    }

    function dokuRequest(url, method, data) {
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

    function sendRequestPeb(url, method) {
        var kpbc = $("#cmbSanKPBC_peb").dxSelectBox("instance").option("value");
        var startOpt = $("#dateStart_peb").dxDateBox("instance").option();
        var startDate = startOpt.displayFormat === "dd-MM-yyyy" ? startOpt.text.split("-").reverse().join("-") : startOpt.text;
        var endOpt = $("#dateEnd_peb").dxDateBox("instance").option();
        var endDate = endOpt.displayFormat === "dd-MM-yyyy" ? endOpt.text.split("-").reverse().join("-") : endOpt.text;
        var statusSelesai = $("#cmbStatusSelesai_peb").dxSelectBox("instance").option("value");
        var isJatuhTempo = $("#cmbStatusJatuhTempo_peb").dxSelectBox("instance").option("value");
        var noPeb = $("#txtNoPEB").dxTextBox("instance").option("value");
        var noInvoice = $("#txtNoInvoice_peb").dxTextBox("instance").option("value");
        var isSda = $("#txtFlagSDA_peb").dxSelectBox("instance").option("value");

        url = url + "?kpbc=" + (kpbc === null ? "" : kpbc) +
            "&startDate=" + startDate +
            "&endDate=" + endDate +
            "&statusSelesai=" + (statusSelesai === null ? "" : statusSelesai) +
            "&isJatuhTempo=" + isJatuhTempo +
            "&noPeb=" + noPeb +
            "&noInv=" + noInvoice +
            "&isSDA=" + isSda;

        $.ajax({
            url: url,
            type: method,
            contentType: 'application/json; charset=utf-8',
            success: function (d) {
                $("#gridContainerPEB").show().dxDataGrid({
                    dataSource: d
                });
                $("#btnSearchPEB").dxButton({
                    icon: "search",
                    text: "Ubah Pencarian Data",
                    disabled: false
                });
                $("#btnResetPEB").dxButton("instance").option("disabled", false);
            }
        });
    }

});
