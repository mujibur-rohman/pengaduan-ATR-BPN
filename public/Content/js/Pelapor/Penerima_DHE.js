var Status = ["DHE  Diterima", "DHE > 10 %", "DHE Belum Diterima", "DHE Diterima", "DHE Kurang", "Matched by Review DP", "Matched by RTE", "PPE selesai"];
var Today = new Date();
var Day = new Date();
var LastTwoYear = Day.setFullYear(Day.getFullYear() - 2);
var NoPEB = [];
$(function () {
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

    $("#CmbStatusSelesaiPEB").dxSelectBox({
        dataSource: routeApi + "DataPEB/ComboStatusPeb",
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
    $("#txtSampaiPEB2").dxDateBox({
        type: "date",
        value: Today,
        useMaskBehavior: true,
        displayFormat: "dd-MM-yyyy"
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
            $("#btnResetPEB").dxButton("instance").option("disabled", true);
            var method = "GET";
            var urlPEB = routeApi + "DataPEB/LoadPEBOutStanding";
            sendRequestPeb(urlPEB, method);
        }
    });


    // var LastTwoYear = now.setFullYear(now.getFullYear() - 2);
    $("#txtPerPEB2").dxDateBox({
        type: "date",
        value: LastTwoYear,
        useMaskBehavior: true,
        displayFormat: "dd-MM-yyyy"
    });
    //$("#gridPDKM").dxDataGrid({
    //    dataSource: '',
    //    //editing: {
    //    //    mode: "batch",
    //    //    allowUpdating: true,
    //    //    allowDeleting: true,
    //    //    allowAdding: true
    //    //},
    //    showBorders: true,
    //    columnWidth: 200,
    //    scrolling: {
    //        columnRenderingMode: "virtual"
    //    },
    //    pager: {
    //        allowedPageSizes: [5, 8, 15, 30],
    //        showInfo: true,
    //        showNavigationButtons: true,
    //        showPageSizeSelector: true,
    //        visible: true
    //    },
    //    paging: {
    //        pageSize: 8
    //    },
    //    columns: [{
    //       // allowGrouping: false,
    //        dataField: "NPWP",
    //        alignment: "center",
    //        caption: "NPWP"
    //    }, {
    //        caption: "Nama Eksportir",
    //        alignment: "center",
    //        dataField: "Nama_eksportir"
    //    }, {
    //        caption: "No PPE",
    //        alignment: "center",
    //        dataField: "No_PEB"
    //    }, {
    //        caption: "No KPBC",
    //        alignment: "center",
    //        dataField: "NO_KPBC"
    //    }, {
    //        caption: "Tangal PPE",
    //        alignment: "center",
    //        dataField: "Tangal_PEB"
    //    }, {
    //        caption: "Valuta PPE",
    //        alignment: "center",
    //        dataField: "Valuta_PEB"
    //    }, {
    //        caption: "Nilai FOB",
    //        alignment: "center",
    //        dataField: "Nilai_FOB"
    //    }, {
    //        caption: "valuta",
    //        alignment: "center",
    //        dataField: "valuta_FOB"
    //    }, {
    //        caption: "Jumlah Disbursement",
    //        alignment: "center",
    //        dataField: "jml_disbursement"
    //    }, {
    //        caption: "Valuta Disbursment",
    //        alignment: "center",
    //        dataField: "valuta_disbursment"
    //    }, {
    //        caption: "Nilai Disbursement Migas",
    //        alignment: "center",
    //        dataField: "nilai_disbursement_migas"
    //    }, {
    //        caption: "Valuta Disburment Migas",
    //        alignment: "center",
    //        dataField: "valuta_disburment_migas"
    //    }, {
    //        caption: "Jumlah Nilai Disbursment",
    //        alignment: "center",
    //        dataField: "jml_nilaI_DISBURSEMENT"
    //    }, {
    //        caption: "Pihak Dalam Kontrak Migas",
    //        alignment: "center",
    //        dataField: "Pihak_dml_kon_migas"
    //    }, {
    //        caption: "Sandi DHE Migas",
    //        alignment: "center",
    //        dataField: "sandi_DHE_migas"
    //    }, {
    //        caption: "NPWP Kontrak Migas",
    //        alignment: "center",
    //        dataField: "NPWP_Kon_migas"
    //    }, {
    //        caption: "Nomor Invoice",
    //        alignment: "center",
    //        dataField: "Nomor_Invoice"
    //    }, {
    //        caption: "Tanggal Invoice",
    //        alignment: "center",
    //        dataField: "tanggal_ivoice"
    //    }, {
    //        caption: "Valuta Ivoice",
    //        alignment: "center",
    //        dataField: "valuta_ivoice"
    //    }, {
    //        caption: "Nilai Invoice",
    //        alignment: "center",
    //        dataField: "Nilai_Invoice"
    //    }]
    //});



   
    var BtnInput = $("#btnInput").dxButton({
        text: "Input",
        type: "default",
        stylingMode: "outlined",
        height: 34,
        width: 125,
        disabled: true,
        //onInitialized: function (e) {
        //    if (ViewOnly == 1) {
        //        e.component.option("visible", false);
        //    }
        //},
        onClick: function () {
            //alert(JSON.stringify(dataGrid.getSelectedRowKeys()));
            //alert(NoPEB);
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk melakukan proses ini", "warning", 5000);
            } else {
                jQuery.ajax({
                    type: "POST",
                    url: routeApi + "DataPEB/PostOnDuty?ParamPEB=" + NoPEB + "&jenis=6",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",

                    success: function (data) {
                        window.location.href = routeApp + "Pelapor/InputDHE";
                    },

                });
            }
           

           
            //  var array = JSON.stringify(dataGrid.getSelectedRowsData());
            // jQuery.get("/Pelapor/PDKM", { input: NoPEB });
            ////  alert(array);

            //jQuery.ajax({
            //    type: "POST",
            //    url: routeApp + "Pelapor/PDKM",
            //    dataType: "json",
            //    contentType: "application/json; charset=utf-8",
            //    data: array,
            //    success: function (data) { alert(data); },
            //    failure: function (errMsg) {
            //        alert(errMsg);
            //    }
            //});

            //window.location.href = '/Pelapor/PDKM'
            //alert("anda akan proses input ")
            //$.each(dataGrid.getSelectedRowKeys(), function () {
            //   dataPEB2.remove(this);
            //});
            //dataGrid.refresh();
        }
    }).dxButton("instance");

    //var PEB = {
    //    store: new DevExpress.data.CustomStore({
    //        loadMode: "raw",
    //        load: function () {
    //            return $.getJSON(routeApi + "DataPEB/GetPEB");
    //        }
    //    })
    //};

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
            $("#CmbStatusSelesaiPEB").dxSelectBox('instance').option('value', '');
            $("#CmbStatusJatuhTempoPEB").dxSelectBox('instance').option('value', '');
            $("#gridContainer1").dxDataGrid("instance").option("dataSource", '');
        }

    });





    var dataGrid = $("#gridContainer1").dxDataGrid({
       // rowAlternationEnabled: true,
        dataSource: "",
        columnAutoWidth: false,
        showBorders: true,
        allowColumnReordering: true,
        showBorders: true,
        columnWidth: 150,
        scrolling: {
            columnRenderingMode: "virtual"
        },
        pager: {
            allowedPageSizes: [5, 8, 15, 30],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true

        },
        onInitialized: function (e) {
            dataGrid = e.component;
        },
        paging: {
            pageSize: 8,
        },
        selection: {
            mode: "multiple"
        },
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData;
            BtnInput.option("disabled", !selectedItems.selectedRowsData.length);

            if (data.length > 0) {

                NoPEB = jQuery.map(data, function (value) {
                    return value.id_pel_peb;
                }).join(",");
            }

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
                    caption: "Nilai Invoice PPE",
                    visible: false,
                    alignment: "right",
                    dataField: "nilai_inv_peb",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
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
                    dataField: "TGL_LC"
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
                    dataField: "tgl_inc"
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

        ]
    }).dxDataGrid("instance");
    $("#btnSearh").dxButton({
        type: "success",
        text: "Search",
        onClick: function (s, e) {
            var method = "GET";
            var urlPEB = routeApi + "DataPEB/LoadPEBOutStanding";
            sendRequestPeb(urlPEB, method);
        }
    });


    $("#txtNoPEB").dxTextBox({
        placeholder: "Masukkan Nomor PPE..."
    });
    $("#txtNoInvoice").dxTextBox({
        placeholder: "Masukkan  Nomor Invoice..."
    });



    function sendRequestPeb(url, method) {
        var kpbc = $("#txtSanKPBC").dxSelectBox("instance").option("value");
        var startDate = $("#txtPerPEB2").dxDateBox("instance").option("text");
        var endDate = $("#txtSampaiPEB2").dxDateBox("instance").option("text");
        var statusSelesai = $("#CmbStatusSelesaiPEB").dxSelectBox("instance").option("value");
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
                $("#gridContainer1").show().dxDataGrid({
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