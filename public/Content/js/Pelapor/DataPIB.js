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
            title: "Detail Transaksi Outgoing",
            visible: false,
            dragEnabled: false,
            closeOnOutsideClick: false
        }).dxPopup("instance");
        popup.show();
    }

    $("#gridContainerPIB").dxDataGrid({
        keyExpr: "id_pel_pib",
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
            fileName: "DataPIBAll_" + now(),
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
                caption: "PPI",
                alignment: "Center",
                columns: [
                    {
                        caption: "Nomor KPBC",
                        alignment: "left",
                        dataField: "kpbc_pib"
                    },
                    {
                        caption: "Nomor",
                        alignment: "left",
                        dataField: "no_pib"
                    },
                    {
                        caption: "Nomor Invoice",
                        alignment: "left",
                        dataField: "no_inv_pib"
                    },
                    {
                        caption: "Nilai Invoice PPI",
                        //  visible: false,
                        alignment: "right",
                        dataField: "nilai_inv_pib",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Tanggal",
                        alignment: "right",
                        dataField: "tgl_pib",
                        dataType: "date",
                        format: "dd-MM-yyyy"
                        //  sortOrder: "desc"
                    },
                    {
                        caption: "Tgl Jatuh Tempo",
                        dataField: "tgl_jth_tempo_pib",
                        alignment: "right",
                        dataType: "date",
                        format: "dd-MM-yyyy"
                    },
                    {
                        caption: "Status Jatuh Tempo",
                        dataField: "status_jth_tempo_pib",
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
                        dataField: "val_pib"
                    },
                    {
                        caption: "Nilai PPI Asli",
                        alignment: "right",
                        dataField: "nilai_pib",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Nilai Maklon",
                        dataField: "maklon_pib",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    }
                ]
            },
            {
                caption: "Outgoing",
                alignment: "Center",
                columns: [
                    {
                        caption: "No Ref",
                        dataField: "no_ref_out"
                    },
                    {
                        caption: "Valuta Outgoing",
                        dataField: "val_out"
                    },
                    {
                        caption: "Nilai Outgoing",
                        dataField: "nilai_out",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Jumlah Transaksi Outgoing",
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
                        caption: "Selesai PPI",
                        alignment: "left",
                        dataField: "status_selesai_pib",
                        lookup: {
                            dataSource: new DevExpress.data.CustomStore({
                                key: "kosta",
                                load: function () {
                                    return $.getJSON(routeApi + "DataPEB/ComboStatusPebPib?Type=20&NeedOutstanding=false");
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
                        dataField: "sisa_alokasi_pib",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Status Selesai Invoice",
                        dataField: "status_selesai_inv_pib",
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
                caption: "Detail PPI",
                alignment: "Center",
                visible: false,
                columns: [{
                    caption: "No Aju",
                    dataField: "no_aju_pib",
                    visible: false,
                }, {
                    caption: "Tanggal Invoice",
                    visible: false,
                    alignment: "right",
                    dataField: "tgl_inv_pib",
                    dataType: "date",
                    format: "dd-MM-yyyy"
                }, {
                    caption: "Valuta Invoice PPI",
                    visible: false,
                    alignment: "Center",
                    dataField: "val_inv_pib"
                }, {
                    caption: "Nilai Invoice PPI USD",
                    visible: false,
                    dataField: "nilai_inv_usd_pib",
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
                    dataField: "flag_sda_pib",
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
                caption: "Detail Outgoing",
                alignment: "center",
                visible: false,
                columns: [{
                    caption: "No Rekening",
                    visible: false,
                    dataField: "no_rek_out"
                }, {
                    caption: "Tanggal Outgoing",
                    visible: false,
                    dataField: "tgl_out",
                    dataType: "date",
                    format: "dd-MM-yyyy"
                }, {
                    caption: "No Dokumen",
                    visible: false,
                    dataField: "no_doc_out"
                }, {
                    caption: "Nilai Alokasi Outgoing",
                    visible: false,
                    dataField: "nilai_out",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                }, {
                    caption: "Nama Pembayar DPI",
                    visible: false,
                    dataField: "nama_pembayar_dpi"
                }, {
                    caption: "NPWP Penerima DPI",
                    visible: false,
                    dataField: "npwp_penerima_dpi"
                }, {
                    caption: "Nama Penerima DPI",
                    visible: false,
                    dataField: "nama_penerima_dpi"
                }, {
                    caption: "Bank Devisa",
                    visible: false,
                    dataField: "nama_bank_out"
                }, {
                    caption: "Sumber Data",
                    visible: false,
                    dataField: "kd_sumber_data_out",
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
                    dataField: "kd_kategori_out",
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
                        var DataSource = $("#gridContainerPIB").dxDataGrid("instance").option("dataSource");
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
                        var selected = $("#gridContainerPIB").dxDataGrid("instance").option("selectedRowKeys").length;

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
                $("#okePIBInv").show();
            }
            else {
                $("#okePIBInv").hide();
            }
        }
    });

    $("#okePIBInv").click(function (e) {
        if (ViewOnly) {
            toast_notify("Anda tidak memiliki wewenang untuk memproses ini", "warning", 5000);
        }
        else {
            SaveSelectedPIBInv();
        }
    });

    $("#CmbStatusJatuhTempoPIB").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "0", text: "Belum Jatuh Tempo" },
            { id: "1", text: "Sudah Jatuh Tempo" }
        ],
        displayExpr: 'text',
        valueExpr: 'id',
        value: ""
    });

    $("#CmbStatusSelesaiPIB").dxTagBox({
        dataSource: routeApi + "DataPEB/ComboStatusPebPib?Type=20&NeedOutstanding=false",
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

    $("#txtPerPIB2").dxDateBox({
        type: "date",
        value: LastTwoYear,
        useMaskBehavior: true,
        displayFormat: "dd-MM-yyyy"
    });

    $("#txtSampaiPIB2").dxDateBox({
        type: "date",
        value: Today,
        useMaskBehavior: true,
        displayFormat: "dd-MM-yyyy"
    });

    $("#txtNoPIB").dxTextBox({
        placeholder: "Masukkan Nomor PPI..."
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

    $("#btnSearchPIB").dxButton({
        icon: "search",
        text: "Cari Data",
        type: "default",
        stylingMode: "outlined",
        onClick: function (e) {
            if ($("#txtPerPIB2").dxDateBox("instance").option("value") == null || $("#txtSampaiPIB2").dxDateBox("instance").option("value") == null) {
                toast_notify("Tanggal Periode PPI tidak boleh kosong", "error");
            }
            else {
                if ($("#txtPerPIB2").dxDateBox("instance").option("value") > $("#txtSampaiPIB2").dxDateBox("instance").option("value")) {
                    toast_notify("Tanggal awal tidak bisa lebih besar dari tanggal akhir", "error");
                }
                else {
                    e.component.option("disabled", true);
                    e.component.option("text", "Mencari Data...");
                    e.component.option("icon", "fas fa-spin fa-spinner");
                    $("#btnResetPIB").dxButton("instance").option("disabled", true);
                    var method = "GET";
                    var urlPIB = routeApi + "DataPIB/LoadPib";
                    sendRequestPib(urlPIB, method);
                }
            }
        }
    });

    $("#btnResetPIB").dxButton({
        icon: "revert",
        text: "Reset",
        type: "danger",
        stylingMode: "outlined",
        onClick: function (e) {
            $("#txtNoPIB").dxTextBox('instance').option('value', '');
            $("#txtSanKPBC").dxSelectBox('instance').option('value', '');
            $("#txtFlagSDA").dxSelectBox('instance').option('value', '');
            $("#txtNoInvoice").dxTextBox('instance').option('value', '');
            $("#txtSampaiPIB2").dxDateBox('instance').option('value', Today);
            $("#txtPerPIB2").dxDateBox('instance').option('value', LastTwoYear);
            $("#CmbStatusSelesaiPIB").dxTagBox('instance').option('value', '');
            $("#CmbStatusJatuhTempoPIB").dxSelectBox('instance').option('value', '');
            $("#gridContainerPIB").dxDataGrid("instance").option("dataSource", '');
        }
    });

    function sendRequestPib(url, method) {
        var kpbc = $("#txtSanKPBC").dxSelectBox("instance").option("value");
        var startDate = $("#txtPerPIB2").dxDateBox("instance").option("text");
        var endDate = $("#txtSampaiPIB2").dxDateBox("instance").option("text");
        var statusSelesai = $("#CmbStatusSelesaiPIB").dxTagBox("instance").option("value");
        var isJatuhTempo = $("#CmbStatusJatuhTempoPIB").dxSelectBox("instance").option("value");
        var noPib = $("#txtNoPIB").dxTextBox("instance").option("value");
        var noInvoice = $("#txtNoInvoice").dxTextBox("instance").option("value");
        var isSda = $("#txtFlagSDA").dxSelectBox("instance").option("value");

        url = url + "?kpbc=" + (kpbc === null ? "" : kpbc) +
            "&startDate=" + startDate +
            "&endDate=" + endDate +
            "&statusSelesai=" + (statusSelesai === null ? "" : statusSelesai) +
            "&isJatuhTempo=" + isJatuhTempo +
            "&noPib=" + noPib +
            "&noInv=" + noInvoice +
            "&isSDA=" + isSda;

        $.ajax({
            url: url,
            type: method,
            contentType: 'application/json; charset=utf-8',
            success: function (d) {
                $("#gridContainerPIB").show().dxDataGrid({
                    dataSource: d
                });
                $("#btnSearchPIB").dxButton({
                    icon: "search",
                    text: "Cari Data",
                    disabled: false
                });
                $("#btnResetPIB").dxButton({ disabled: false });
            }
        });
    }

    function SaveSelectedPIBInv() {
        if (ViewOnly) {
            toast_notify("Anda tidak memiliki wewenang untuk menambahkan data", "warning", 5000);
            return
        }

        var formData = new FormData();
        var datas = {};
        var url = routeApi + "Invoice/SaveSelected";
        var selectedRowKeys = $("#gridContainerPIB").dxDataGrid("instance").getSelectedRowKeys();
        var selectedRowsData = $("#gridContainerPIB").dxDataGrid("instance").getSelectedRowsData();
        datas["json_val"] = selectedRowKeys.toString();
        datas["modul"] = 'pib';
        datas["tipe"] = 'impor';
        formData.append('data', JSON.stringify(datas));

        var array_filter1 = filterByProperty(selectedRowsData, "id_status_selesai_pib", 9);
        var array_filter2 = filterByProperty(selectedRowsData, "id_status_selesai_pib", 16);

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
                window.location.href = routeApp + 'Pelapor/InvoiceImpor';
            } else {
                toast_notify(result[0].msg_value.toString(), "warning");
            }
        });
    }
});