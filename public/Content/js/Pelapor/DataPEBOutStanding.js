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


    let target = true;
    //let URL = routeApi + "DataPEB/"; 
    //let gridDataSource = new DevExpress.data.DataSource({
    //    load: function (load) {
    //        let lUrl = URL + "GetPEB";
    //        return getGrid(lUrl);
    //    }
    //});

    $("#gridContainerPEB").dxDataGrid({
        keyExpr: "id_pel_peb",
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnAutoWidth: true,
        showBorders: true,
        scrolling: {
            columnRenderingMode: "virtual1",
            showScrollbar: "always"
        },
        "export": {
            enabled: true,
            fileName: "DataPEBOutstanding_" + now(),
            allowExportSelectedData: true
        },
        pager: {
            allowedPageSizes: [10, 20, 40],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: { pageSize: 10 },
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
            //  enabled: true,
            mode: "select",
            title: "Pemilah Kolom"
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
                    }, {
                        caption: "Nomor",
                        alignment: "left",
                        dataField: "no_peb",
                        // sortOrder: "asc"
                    }, {
                        caption: "Nomor Invoice",
                        alignment: "left",
                        dataField: "no_inv_peb"
                    }, {
                        caption: "Nilai Invoice PPE",
                        // visible: false,
                        alignment: "right",
                        dataField: "nilai_inv_peb",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    }, {
                        caption: "Tanggal",
                        alignment: "right",
                        dataField: "tgl_peb",
                        dataType: "date",
                        format: "dd-MM-yyyy",
                        //  sortOrder: "desc"
                    }, {
                        caption: "Tgl Jatuh Tempo",
                        dataField: "tgl_jth_tempo_peb",
                        alignment: "right",
                        dataType: "date",
                        format: "dd-MM-yyyy"
                    }, {
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
                    }, {
                        caption: "Valuta",
                        alignment: "Center",
                        dataField: "val_peb"
                    }, {
                        caption: "Nilai PPE Asli",
                        alignment: "right",
                        dataField: "nilai_peb",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    }, {
                        caption: "Nilai Maklon",
                        dataField: "maklon_peb",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    }
                ]
            }, {
                caption: "Incoming",
                alignment: "Center",
                columns: [{
                    caption: "No Ref",
                    dataField: "no_ref_inc"

                }, {
                    caption: "Valuta Incoming",
                    dataField: "val_inc"


                }, {
                    caption: "Nilai Incoming",
                    dataField: "nilai_inc",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                }]
            }, {
                caption: "Status",
                alignment: "Center",
                columns: [{
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
                }, {
                    caption: "Dokumen",
                    dataField: "kd_jns_dok_srt"
                }, {
                    caption: "Sisa Alokasi",
                    alignment: "right",
                    dataField: "sisa_alokasi_peb",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                }, {
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
                }]

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
                    caption: "PPE USD",
                    visible: false,
                    dataField: "nilai_usd_peb",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                }, {
                    caption: "PPE Rupiah",
                    visible: false,
                    dataField: "nilai_idr_peb",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }

                }, {
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
                    dataField: "nama_penerima_dhe_inc"
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
                    text: "unduh seluruh data yang ditampilkan",
                    icon: "exportxlsx",
                    onClick: function (e) {
                        var DataSource = $("#gridContainerPEB").dxDataGrid("instance").option("dataSource");
                        // var selected = $("#gridContainerPEB").dxDataGrid("instance").option("selectedRowKeys").length;
                        if (DataSource == null || DataSource == '') {
                            DevExpress.ui.notify("Data yang akan diekspor tidak ada", "error");
                            isExport = false;
                            //alert("Data yang akan diekspor tidak ada");


                        }

                    }
                },
                {
                    text: "unduh data terpilih",
                    exportSelected: true,
                    icon: "exportselected",
                    onClick: function (e) {
                        //var DataSource = $("#gridContainerPEB").dxDataGrid("instance").option("dataSource");
                        var selected = $("#gridContainerPEB").dxDataGrid("instance").option("selectedRowKeys").length;

                        if (selected == 0) {
                            DevExpress.ui.notify("Tidak ada data yang dipilih", "error");
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
                $("#okePEB").show();
            }
            else {
                $("#okePEBInv").hide();
                $("#okePEB").hide();
            }
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
        applyValueMode: "useButtons"
    });

    //$("#CmbStatusSelesaiPEB").dxSelectBox({
    //    dataSource: routeApi + "DataPEB/ComboStatusPebPib?Type=10&NeedOutstanding=true",
    //    searchEnabled: true,
    //    searchExpr: ["kosta", "nama"],
    //    showDataBeforeSearch: true,
    //    valueExpr: "kosta",
    //    displayExpr: function (item) { return !item ? "" : item.kosta + " - " + item.nama; },
    //    searchMode: "contains",
    //    searchTimeout: 10,
    //    minSearchLength: 2,
    //    showClearButton: true,
    //    showSpinButtons: true,
    //    placeholder: "Ketik nama status untuk mencari"
    //});


    $("#txtSampaiPEB2").dxDateBox({
        type: "date",
        value: Today,
        useMaskBehavior: true,
        displayFormat: "dd-MM-yyyy"
    });


    // var LastTwoYear = now.setFullYear(now.getFullYear() - 2);
    $("#txtPerPEB2").dxDateBox({
        type: "date",
        value: LastTwoYear,
        useMaskBehavior: true,
        displayFormat: "dd-MM-yyyy"
    });

    $("#btnSearchPEB").dxButton({
        icon: "search",
        text: "Cari Data",
        type: "default",
        stylingMode: "outlined",
        onClick: function (e) {
            if ($("#txtPerPEB2").dxDateBox("instance").option("value") == null || $("#txtSampaiPEB2").dxDateBox("instance").option("value") == null) {
                DevExpress.ui.notify("Tanggal Periode PPE tidak boleh kosong", "error");
            }
            else {
                if ($("#txtPerPEB2").dxDateBox("instance").option("value") > $("#txtSampaiPEB2").dxDateBox("instance").option("value")) {
                    DevExpress.ui.notify("Tanggal awal tidak bisa lebih besar dari tanggal akhir", "error");
                }
                else {
                    e.component.option("disabled", true);
                    e.component.option("text", "Mencari Data...");
                    e.component.option("icon", "fas fa-spin fa-spinner");
                    $("#btnResetPEB").dxButton("instance").option("disabled", true);
                    var method = "GET";
                    var urlPEB = routeApi + "DataPEB/LoadPEBOutStanding";
                    sendRequestPeb(urlPEB, method);
                }
            }

        }
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
        displayExpr: getDisplayExpr,
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


    $("#txtNoInvoice").dxTextBox({
        placeholder: "Masukkan  Nomor Invoice..."
    });

    $("#cxboutstanding").dxCheckBox({
        value: target,
        disabled: true,
        width: 300

    }).dxCheckBox("instance");



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

    $("#okePEB").click(function (e) {
        SaveSelectedPEB();
    });

    $("#okePEBInv").click(function (e) {
        SaveSelectedPEBInv();
    });

    function SaveSelectedPEB() {
        var formData = new FormData();
        var datas = {};
        var url = routeApi + "Netting/SaveSelectedPeb";
        var pebJSon = "";
        $("#gridContainerPEB").dxDataGrid("instance").getSelectedRowsData().forEach(function (val, ix) {
            pebJSon = pebJSon + '{"id_pel_peb":' + val.id_pel_peb + ',"nilai_invoice_peb":' + val.nilai_invoice_peb + '},';
        });
        pebJSon = "[" + pebJSon.substring(0, pebJSon.length - 1) + "]";
        datas["json_peb"] = pebJSon;
        formData.append('data', JSON.stringify(datas));
        //datas = JSON.stringify(datas);

        $.ajax(url, {
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            cache: false
        }).done(function (result) {
            var msg = result[0].msg_peb;
            if (msg === "OK") {
                DevExpress.ui.notify("Data Berhasil Disimpan", "success");
                window.location.href = routeApp + 'Pelapor/NettingExportir';
            } else {
                DevExpress.ui.notify("Proses gagal. Silahkan ulang kembali", "warning");
            }
        });
    }

    function SaveSelectedPEBInv() {
        var formData = new FormData();
        var datas = {};
        var url = routeApi + "Invoice/SaveSelected";
        var selectedRowKeys = $("#gridContainerPEB").dxDataGrid("instance").getSelectedRowKeys();
        datas["json_val"] = selectedRowKeys.toString();
        datas["modul"] = 'peb';
        datas["tipe"] = 'ekspor';
        formData.append('data', JSON.stringify(datas));

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
                DevExpress.ui.notify("Data Berhasil Disimpan", "success");
                window.location.href = routeApp + 'Pelapor/InvoiceEkspor';
            } else {
                DevExpress.ui.notify("Proses gagal", "warning");
            }
        });
    }




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

});
