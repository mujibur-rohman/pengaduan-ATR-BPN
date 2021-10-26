$(function () {
    var Today = new Date();
    var Day = new Date();
    let target = true;
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

    var PIB = {                   
        store: new DevExpress.data.CustomStore({
            loadMode: "raw",
            load: function () {
                // Returns an array of objects that have the following structure:
                // { id: 1, name: "John Doe" }
                return $.getJSON(routeApi + "DataPIB/GetPIB");
            }
        })
    };

    var BtnInput = $("#btnInput").dxButton({
        text: "Input",
        type: "default",
        stylingMode: "outlined",
        height: 34,
        width: 125,
        disabled: true,
        //onInitialized: function (e) {
        //    if (ViewOnly == 1) {
        //        e.component.option("visible",false);
        //    }
        //},
        onClick: function (e) {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk melakukan proses ini", "warning", 5000);
                e.cancel = true;
            } else {
                jQuery.ajax({
                    type: "POST",
                    url: routeApi + "DataPIB/PostOnDuty?ParamPIB=" + NoPIB + "&jenis=7",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",

                    success: function (data) {
                        window.location.href = routeApp + 'Pelapor/InputDPI';
                    },
                });
            }            
        }
    }).dxButton("instance");




    var dataGrid = $("#gridContainer1").dxDataGrid({
        rowAlternationEnabled: true,
        dataSource: PIB[0],
        selection: {
            mode: "multiple"
        },
        columnAutoWidth: true,
        showBorders: true,
        pager: {
            allowedPageSizes: [5, 8, 15, 30],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: {
            pageSize: 8
        },
        onSelectionChanged: function (selectedItems) {
            
            var data = selectedItems.selectedRowsData;
            BtnInput.option("disabled", !selectedItems.selectedRowsData.length);
            if (data.length > 0) {

                NoPIB = jQuery.map(data, function (value) {
                    return value.id_pel_pib;
                }).join(",");
            }
            
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
                    }, {
                        caption: "Nomor",
                        alignment: "left",
                        dataField: "no_pib",
                        // sortOrder: "asc"
                    }, {
                        caption: "Nomor Invoice",
                        alignment: "left",
                        dataField: "no_inv_pib"
                    }, {
                        caption: "Tanggal",
                        alignment: "right",
                        dataField: "tgl_pib",
                        dataType: "date",
                        format: "dd-MM-yyyy",
                        //  sortOrder: "desc"
                    }, {
                        caption: "Tgl Jatuh Tempo",
                        dataField: "tgl_jth_tempo_pib",
                        alignment: "right",
                        dataType: "date",
                        format: "dd-MM-yyyy"
                    }, {
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
                    }, {
                        caption: "Valuta",
                        alignment: "Center",
                        dataField: "val_pib"
                    }, {
                        caption: "Nilai PPI Asli",
                        alignment: "right",
                        dataField: "nilai_pib",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    }, {
                        caption: "Nilai Maklon",
                        dataField: "maklon_pib",
                    }
                ]
            }, {
                caption: "Outgoing",
                alignment: "Center",
                columns: [{
                    caption: "No Ref",
                    dataField: "no_ref_out"

                }, {
                    caption: "Valuta Outgoing",
                    dataField: "no_ref_out"


                }, {
                    caption: "Nilai Outgoing",
                    dataField: "nilai_out",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                }]
            }, {
                caption: "Status",
                alignment: "Center",
                columns: [{
                    caption: "Selesai PPI",
                    alignment: "left",
                    dataField: "status_selesai_pib",
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
                }]

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
                    caption: "Nilai Invoice PPI",
                    visible: false,
                    alignment: "right",
                    dataField: "nilai_inv_pib",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                }, {
                    caption: "PPI USD",
                    visible: false,
                    dataField: "nilai_usd_pib",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                }, {
                    caption: "PPI Rupiah",
                    visible: false,
                    dataField: "nilai_idr_pib",
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
                    dataField: "TGL_LC"
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
                    dataField: "tgl_out"
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

        ]
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
    $("#CmbStatusSelesaiPIB").dxSelectBox({
        dataSource: routeApi + "Netting/ComboStatusPib",
        searchEnabled: true,
        searchExpr: ["nama"],
        showDataBeforeSearch: true,
        valueExpr: "id",
        displayExpr: "nama",
        searchMode: "contains",
        searchTimeout: 10,
        minSearchLength: 0,
        showClearButton: true,
        showSpinButtons: true,
        placeholder: "Input Status untuk Mencari"
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

    $("#btnSearchPIB").dxButton({
        icon: "search",
        text: "Cari Data",
        type: "default",
        stylingMode: "outlined",
        onClick: function ( e) {
            if ($("#txtPerPIB2").dxDateBox("instance").option("value") == null || $("#txtSampaiPIB2").dxDateBox("instance").option("value") == null) {
                toast_notify("Tanggal Periode PIB tidak boleh kosong", "error");
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
                    var urlpib = routeApi + "DataPIB/DataPibOutstanding";
                    sendRequestPib(urlpib, method);
                }
            }
        }
    });

    $("#btnResetPIB").dxButton({
        icon: "revert",
        text: "Reset",
        type: "danger",
        stylingMode: "outlined",
        disabled: true,
        onClick: function (e) {
            $("#txtNoPIB").dxTextBox('instance').option('value', '');
            $("#txtSanKPBC").dxSelectBox('instance').option('value', '');
            $("#txtFlagSDA").dxSelectBox('instance').option('value', '');
            $("#txtNoInvoice").dxTextBox('instance').option('value', '');
            $("#txtSampaiPIB2").dxDateBox('instance').option('value', Today);
            $("#txtPerPIB2").dxDateBox('instance').option('value', LastTwoYear);
            $("#CmbStatusSelesaiPIB").dxSelectBox('instance').option('value', '');
            $("#CmbStatusJatuhTempoPIB").dxSelectBox('instance').option('value', '');
            $("#gridContainer1").dxDataGrid("instance").option("dataSource", '');
        },
        width: 120
    });

    $("#txtNoPIB").dxTextBox({
        placeholder: "Masukkan Nomor PPI..."
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
    $("#txtNoInvoice").dxTextBox({
        placeholder: "Masukkan  Nomor Invoice..."
    });

    $("#cxboutstanding").dxCheckBox({
        value: target,
        disabled: true,
        width: 300

    }).dxCheckBox("instance");



});

function sendRequestPib(url, method) {
    var kpbc = $("#txtSanKPBC").dxSelectBox("instance").option("value");
    var startDate = $("#txtPerPIB2").dxDateBox("instance").option("text");
    var endDate = $("#txtSampaiPIB2").dxDateBox("instance").option("text");
    var statusSelesai = $("#CmbStatusSelesaiPIB").dxSelectBox("instance").option("value");
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
            $("#gridContainer1").show().dxDataGrid({
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