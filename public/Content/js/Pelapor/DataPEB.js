$(function () {
    var Today = new Date();
    var Day = new Date();
    var LastTwoYear = Day.setFullYear(Day.getFullYear() - 2);
    var isExport = true;
    function now() {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();

        var output = (day < 10 ? '0' : '') + day +
            + (month < 10 ? '0' : '') + month +
            + d.getFullYear();

        return output;
    };

    var target = true;

    function popDetailTransaksi(id) {
        if (popup) $("#popup>div").remove();
        var $popupContainer = $("<div />").appendTo($("#popup"));
        var gridDokumen = $('<div id="gridDokupen_' + id + '"/>').dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
                key: "id_gen_in_out",
                load: function () {
                    return $.getJSON(routeApi + "DataPEB/GetDetailTransaksi?id=" + id);
                }
            }),
            loadPanel: { enabled: true },
            columnAutoWidth: true,
            scrolling: {
                columnRenderingMode: "virtual1",
                useNative: true
            },
            paging: { pageSize: 10 },
            searchPanel: {
                visible: true
            },
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
            pager: {
                allowedPageSizes: [10, 20, 40],
                showInfo: true,
                showNavigationButtons: true,
                showPageSizeSelector: true,
                visible: true
            },
            columns: [
                {
                    caption: "No. Rekening",
                    alignment: "left",
                    dataField: "no_rekening"
                },
                {
                    caption: "Valuta",
                    alignment: "left",
                    dataField: "valuta",
                    width: 64
                },
                {
                    caption: "Nilai Incoming",
                    dataField: "nilai_in_out",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                },
                {
                    caption: "Alokasi Incoming",
                    dataField: "alokasi_in_out",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                },
                {
                    caption: "No Referensi",
                    alignment: "left",
                    dataField: "no_referensi"
                },
                {
                    caption: "Tanggal Incoming",
                    alignment: "right",
                    dataField: "tgl_in_out",
                    dataType: "date",
                    format: "dd-MM-yyyy",
                    width: 110
                },
                {
                    caption: "Nama Pengirim",
                    alignment: "left",
                    dataField: "nama_in_out"
                },
                {
                    caption: "Sumber Data",
                    alignment: "left",
                    dataField: "sumber_data"
                },
                {
                    caption: "Nama Bank",
                    alignment: "left",
                    dataField: "nama_bank"
                },
                {
                    caption: "Kategori Rekening",
                    alignment: "left",
                    dataField: "kategori_rekening"
                },
            ]
        });

        popup = $popupContainer.dxPopup({
            contentTemplate: function () { return gridDokumen; },
            position: "top",
            showTitle: true,
            title: "Detail Transaksi Incoming",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: false
        }).dxPopup("instance");
        popup.show();
    }

    $("#gridContainerPEB").dxDataGrid({
        keyExpr: "id_pel_peb",
        allowColumnReordering: true,
        columnAutoWidth: true,
        showBorders: true,
        paging: { pageSize: 10 },
        pager: {
            allowedPageSizes: [10, 20, 40],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        scrolling: {
            userNative: true,
            columnRenderingMode: "virtual1",
            showScrollbar: "always"
        },
        export: {
            enabled: true,
            fileName: "DataPEBAll_" + now(),
            allowExportSelectedData: true
        },
        selection: { mode: "multiple" },
        groupPanel: {
            visible: true,
            emptyPanelText: "Geser kolom ke sini untuk mengelompokan data"
        },
        grouping: {
            autoExpandAll: false,
            expandMode: "rowClick"
        },
        columnChooser: {
            //enabled: true,
            mode: "select",
            title: "Pemilah Kolom",
            text: "Pemilah Kolom"
        },
        columns: [
            {
                caption: "PPE",
                alignment: "Center",
                columns: [
                    {
                        caption: "Nomor KPBC",
                        alignment: "left",
                        dataField: "kpbc_peb"
                    },
                    {
                        caption: "Nomor",
                        alignment: "left",
                        dataField: "no_peb"
                    },
                    {
                        caption: "Nomor Invoice",
                        alignment: "left",
                        dataField: "no_inv_peb"
                    },
                    {
                        caption: "Nilai Invoice PPE",
                        //  visible: false,
                        alignment: "right",
                        dataField: "nilai_inv_peb",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Tanggal",
                        alignment: "right",
                        dataField: "tgl_peb",
                        dataType: "date",
                        format: "dd-MM-yyyy"
                        //  sortOrder: "desc"
                    },
                    {
                        caption: "Tgl Jatuh Tempo",
                        dataField: "tgl_jth_tempo_peb",
                        alignment: "right",
                        dataType: "date",
                        format: "dd-MM-yyyy"
                    },
                    {
                        caption: "Status Jatuh Tempo",
                        dataField: "status_jth_tempo_peb",
                        alignment: "center",
                        lookup: {
                            dataSource: [
                                { id: false, text: "Belum Jatuh Tempo" },
                                { id: true, text: "Sudah Jatuh Tempo" }
                            ],
                            displayExpr: "text",
                            valueExpr: "id"
                        }
                    },
                    {
                        caption: "Valuta",
                        alignment: "Center",
                        dataField: "val_peb"
                    },
                    {
                        caption: "Nilai PPE Asli",
                        alignment: "right",
                        dataField: "nilai_peb",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Nilai Maklon",
                        dataField: "maklon_peb",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    }
                ]
            },
            {
                caption: "Incoming",
                alignment: "Center",
                columns: [
                    {
                        caption: "No Ref",
                        dataField: "no_ref_inc"
                    },
                    {
                        caption: "Valuta Incoming",
                        dataField: "val_inc"
                    },
                    {
                        caption: "Nilai Incoming",
                        dataField: "nilai_inc",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Jumlah Transaksi Incoming",
                        dataField: "count_alokasi",
                        alignment: 'center',
                        cellTemplate: function (container, options) {
                            if (options.value > 0) {
                                $('<a href=#detail\>').addClass('dx-link')
                                    .text(options.value + ' transaksi')
                                    .on('dxclick', function () {
                                        popDetailTransaksi(options.data.id_gen_in_out_group);
                                    }).appendTo(container);
                            }
                        }
                    }
                ]
            },
            {
                caption: "Status",
                alignment: "Center",
                columns: [
                    {
                        caption: "Selesai PPE",
                        alignment: "left",
                        dataField: "status_selesai_peb",
                        lookup: {
                            dataSource: new DevExpress.data.CustomStore({
                                key: "kosta",
                                load: function () {
                                    return $.getJSON(routeApi + "DataPEB/ComboStatusPebPib?Type=10&NeedOutstanding=false");
                                }
                            }),
                            displayExpr: "nama",
                            valueExpr: "kosta"
                        }
                    },
                    {
                        caption: "Dokumen",
                        dataField: "kd_jns_dok_srt"
                    },
                    {
                        caption: "Deviasi",
                        alignment: "right",
                        dataField: "sisa_alokasi_peb",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Status Selesai Invoice",
                        dataField: "status_selesai_inv_peb",
                        lookup: {
                            dataSource: new DevExpress.data.CustomStore({
                                key: "id_status_invoice",
                                load: function () {
                                    return $.getJSON(routeApi + "DataPEB/GetStatusInvoices");
                                }
                            }),
                            displayExpr: 'nama_status_invoice',
                            valueExpr: 'id_status_invoice',

                        }
                    }
                ]

            }, {
                caption: "Detail PPE",
                alignment: "Center",
                visible: false,
                columns: [{
                    caption: "No Aju",
                    dataField: "no_aju_peb",
                    visible: false,
                }, {
                    caption: "Tanggal Invoice",
                    visible: false,
                    alignment: "right",
                    dataField: "tgl_inv_peb",
                    dataType: "date",
                    format: "dd-MM-yyyy"
                }, {
                    caption: "Valuta Invoice PPE",
                    visible: false,
                    alignment: "Center",
                    dataField: "val_inv_peb"
                }, {
                    caption: "Nilai Invoice PPE USD",
                    visible: false,
                    dataField: "nilai_inv_usd_peb",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                },
                {
                    caption: "Nama Penerima",
                    visible: false,
                    dataField: "nama_penerima"
                }, {
                    caption: "Negara Penerima",
                    visible: false,
                    dataField: "negara_penerima"
                }, {
                    caption: "Nama Pembeli",
                    visible: false,
                    dataField: "nama_pembeli"
                }, {
                    caption: "Negara Pembeli",
                    visible: false,
                    dataField: "negara_pembeli"
                }, {
                    caption: "CP",
                    visible: false,
                    dataField: "cp"
                }, {
                    caption: "No LC",
                    visible: false,
                    dataField: "NO_LC"
                }, {
                    caption: "Tanggal LC",
                    visible: false,
                    dataField: "TGL_LC",
                    dataType: "date",
                    format: "dd-MM-yyyy"
                }, {
                    caption: "Flag SDA",
                    visible: false,
                    alignment: "center",
                    dataField: "flag_sda_peb",
                    lookup: {
                        dataSource: [
                            { id: false, text: "Non SDA" },
                            { id: true, text: "SDA" }
                        ],
                        displayExpr: "text",
                        valueExpr: "id"
                    }
                }]


            }, {
                caption: "Detail Incoming",
                alignment: "center",
                visible: false,
                columns: [{
                    caption: "No Rekening",
                    visible: false,
                    dataField: "no_rek_inc"
                }, {
                    caption: "Tanggal Incoming",
                    visible: false,
                    dataField: "tgl_inc",
                    dataType: "date",
                    format: "dd-MM-yyyy"
                }, {
                    caption: "No Dokumen",
                    visible: false,
                    dataField: "no_doc_inc"
                }, {
                    caption: "Nilai Alokasi Incoming",
                    visible: false,
                    dataField: "nilai_inc",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                }, {
                    caption: "Nama Pembayar DHE",
                    visible: false,
                    dataField: "nama_pembayar_dhe"
                }, {
                    caption: "NPWP Penerima DHE",
                    visible: false,
                    dataField: "npwp_penerima_dhe"
                }, {
                    caption: "Nama Penerima DHE",
                    visible: false,
                    dataField: "nama_penerima_dhe"
                }, {
                    caption: "Bank Devisa",
                    visible: false,
                    dataField: "nama_bank_inc"
                }, {
                    caption: "Sumber Data",
                    visible: false,
                    dataField: "kd_sumber_data_inc",
                    lookup: {
                        dataSource: [
                            // { id: "", text: "Semua" },
                            { id: 1, text: "SWIFT" },
                            { id: 2, text: "BANK" }
                        ],
                        displayExpr: 'text',
                        valueExpr: 'id'
                    }
                }, {
                    caption: "Kategori Rekening",
                    visible: false,
                    dataField: "kd_kategori_inc",
                    lookup: {
                        dataSource: [
                            { id: "", text: "Semua" },
                            { id: "U", text: "UMUM" },
                            { id: "K", text: "KHUSUS" }
                        ],
                        displayExpr: 'text',
                        valueExpr: 'id'
                    }
                }]

            }

        ],
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
                    text: "unduh seluruh data",
                    icon: "exportxlsx",
                    onClick: function (e) {
                        var DataSource = $("#gridContainerPEB").dxDataGrid("instance").option("dataSource");
                        if (DataSource == null || DataSource == '') {
                            toast_notify("Data yang akan diekspor tidak ada", "error");
                            isExport = false;
                        }
                    }
                },
                {
                    text: "unduh data terpilih",
                    exportSelected: true,
                    icon: "exportselected",
                    onClick: function (e) {
                        var selected = $("#gridContainerPEB").dxDataGrid("instance").option("selectedRowKeys").length;

                        if (selected == 0) {
                            toast_notify("Tidak ada data yang dipilih", "error");
                            isExport = false;
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
                                    e.component.exportToExcel(item.itemData.exportSelected);
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
            toolbarItems.push({
                widget: 'dxButton',
                showText: 'always',

                options: {


                    icon: 'columnchooser',
                    text: 'Pemilah Kolom',
                    onClick: function () {

                        e.component.showColumnChooser();
                    }
                },
                location: 'after'
            });
        },
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData;
            if (data.length > 0) {
                $("#okePEBInv").show();
            }
            else {
                $("#okePEBInv").hide();
            }
        }
    });

    $("#okePEBInv").click(function (e) {
        if (ViewOnly) {
            toast_notify("Anda tidak memiliki wewenang untuk memproses ini", "warning", 5000);
        }
        else {
            SaveSelectedPEBInv();
        }
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

    $("#CmbStatusSelesaiPEB").dxTagBox({
        dataSource: routeApi + "DataPEB/ComboStatusPebPib?Type=10&NeedOutstanding=false",
        searchEnabled: true,
        displayExpr: function (item) { return !item ? "" : item.kosta + " - " + item.nama; },
        searchExpr: ["kosta", "nama"],
        valueExpr: "kosta",
        placeholder: "Ketik nama status untuk mencari",
        showSelectionControls: true,
        applyValueMode: "useButtons",
        onContentReady: function (e) {
            e.component._list.option('showScrollbar', 'always');
        }
    });

    $("#txtSampaiPEB2").dxDateBox({
        type: "date",
        value: Today,
        useMaskBehavior: true,
        displayFormat: "dd-MM-yyyy"
    });

    $("#txtPerPEB2").dxDateBox({
        type: "date",
        value: LastTwoYear,
        useMaskBehavior: true,
        displayFormat: "dd-MM-yyyy"
    });

    $("#txtNoPEB").dxTextBox({
        placeholder: "Masukkan Nomor PPE..."
    });

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

    $("#txtSanKPBC").dxSelectBox({
        dataSource: routeApi + "DataKPBC/GetKPBC",
        searchEnabled: true,
        searchExpr: ["KD_KANTOR", "NM_KANTOR"],
        showDataBeforeSearch: true,
        valueExpr: "KD_KANTOR",
        displayExpr: item => {
            if (!item) return "";
            else return item.KD_KANTOR + "-" + item.NM_KANTOR;
        },
        searchMode: 'contains',
        searchTimeout: 500,
        minSearchLength: 2
    });

    $("#txtNoInvoice").dxTextBox({
        placeholder: "Masukkan  Nomor Invoice..."
    });

    $("#cxboutstanding").dxCheckBox({
        value: target,
        disabled: true,
        width: 300
    }).dxCheckBox("instance");

    $("#btnSearchPEB").dxButton({
        icon: "search",
        text: "Cari Data",
        type: "default",
        stylingMode: "outlined",
        onClick: function (e) {

            if ($("#txtPerPEB2").dxDateBox("instance").option("value") == null || $("#txtSampaiPEB2").dxDateBox("instance").option("value") == null) {
                toast_notify("Tanggal Periode PPE tidak boleh kosong", "error");
            }
            else {
                if ($("#txtPerPEB2").dxDateBox("instance").option("value") > $("#txtSampaiPEB2").dxDateBox("instance").option("value")) {
                    toast_notify("Tanggal awal tidak bisa lebih besar dari tanggal akhir", "error");
                }
                else {
                    e.component.option("disabled", true);
                    e.component.option("text", "Mencari Data...");
                    e.component.option("icon", "fas fa-spin fa-spinner");
                    $("#btnResetPEB").dxButton("instance").option("disabled", true);
                    var method = "GET";
                    var urlPEB = routeApi + "DataPEB/LoadPEBAll";
                    sendRequestPeb(urlPEB, method);
                }
            }
        }
    });

    $("#btnResetPEB").dxButton({
        icon: "revert",
        text: "Reset",
        type: "danger",
        stylingMode: "outlined",
        onClick: function (e) {
            $("#txtNoPEB").dxTextBox('instance').option('value', '');
            $("#txtSanKPBC").dxSelectBox('instance').option('value', '');
            $("#txtFlagSDA").dxSelectBox('instance').option('value', '');
            $("#txtNoInvoice").dxTextBox('instance').option('value', '');
            $("#txtSampaiPEB2").dxDateBox('instance').option('value', Today);
            $("#txtPerPEB2").dxDateBox('instance').option('value', LastTwoYear);
            $("#CmbStatusSelesaiPEB").dxTagBox('instance').option('value', '');
            $("#CmbStatusJatuhTempoPEB").dxSelectBox('instance').option('value', '');
            $("#gridContainerPEB").dxDataGrid("instance").option("dataSource", '');
        }
    });

    function sendRequestPeb(url, method) {
        var kpbc = $("#txtSanKPBC").dxSelectBox("instance").option("value");
        var startDate = $("#txtPerPEB2").dxDateBox("instance").option("text");
        var endDate = $("#txtSampaiPEB2").dxDateBox("instance").option("text");
        var statusSelesai = $("#CmbStatusSelesaiPEB").dxTagBox("instance").option("value");
        var isJatuhTempo = $("#CmbStatusJatuhTempoPEB").dxSelectBox("instance").option("value");
        var noPeb = $("#txtNoPEB").dxTextBox("instance").option("value");
        var noInvoice = $("#txtNoInvoice").dxTextBox("instance").option("value");
        var isSda = $("#txtFlagSDA").dxSelectBox("instance").option("value");

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
                    text: "Cari Data",
                    disabled: false
                });
                $("#btnResetPEB").dxButton({ disabled: false });
            }
        });
    }

    function SaveSelectedPEBInv() {
        if (ViewOnly) {
            toast_notify("Anda tidak memiliki wewenang untuk menambahkan data", "warning", 5000);
            return
        }

        var formData = new FormData();
        var datas = {};
        var url = routeApi + "Invoice/SaveSelected";
        var selectedRowKeys = $("#gridContainerPEB").dxDataGrid("instance").getSelectedRowKeys();
        var selectedRowsData = $("#gridContainerPEB").dxDataGrid("instance").getSelectedRowsData();
        datas["json_val"] = selectedRowKeys.toString();
        datas["modul"] = 'peb';
        datas["tipe"] = 'ekspor';
        formData.append('data', JSON.stringify(datas));

        var array_filter1 = filterByProperty(selectedRowsData, "id_status_selesai_peb", 1);
        var array_filter2 = filterByProperty(selectedRowsData, "id_status_selesai_peb", 8);

        if (array_filter1.length > 0 || array_filter2.length > 0) {
            var confTit = "Ubah data";
            var confMes = "Anda yakin akan merubah data yang sudah match ? ";
            var confRes = DevExpress.ui.dialog.confirm(confMes, confTit);
            confRes.done(function (dialogResult) {
                if (dialogResult) {
                    lakukanSimpan(formData, url);
                }
            });
        }
        else {
            lakukanSimpan(formData, url);
        }
    }

    function filterByProperty(array, prop, value) {
        var filtered = [];
        for (var i = 0; i < array.length; i++) {
            var obj = array[i];
            if (obj[prop] == value) {
                filtered.push(obj);
            }
        }
        return filtered;
    }

    function lakukanSimpan(formData, url) {
        $.ajax(url, {
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            xhrFields: { withCredentials: true }
        }).done(function (result) {
            var sta = result[0].resultStatus.toString();
            if (sta === "1") {
                toast_notify(result[0].msg_value.toString(), "success");
                window.location.href = routeApp + 'Pelapor/InvoiceEkspor';
            } else {
                toast_notify(result[0].msg_value.toString(), "warning");
            }
        });
    }
});