var orders = [];
var products = [];
var ordersStore = [];
var data = [];
var datade = [];
//var ordersStore = new DevExpress.data.ArrayStore({
//    key: "NO_REFERENSI",
//    data: orders
//});

var productsStore = new DevExpress.data.ArrayStore({
    key: "NO_REFERENSI",
    data: products
});


function data_awal() {
    data = [
    ];

    datade = [
    ];
}

function isi_array() {
    var json_object = data;
    var json_objectde = datade;
    for (var i = 0; i < json_object.length; i++) {

        products.push({
            NO_REFERENSI: json_object[i].NO_REFERENSI, NO_KPPBC: json_object[i].KD_KANTOR, TGL_PPI: json_object[i].TGL_DAFTAR, NO_PPI: json_object[i].NO_PPI,
            VALUTA_FOB: json_object[i].VALUTA_FOB, NILAI_FINAL: json_object[i].NILAI_FOB, TOTAL_INVOICE: json_object[i].TOTAL_INVOICE
        });


    }

    for (var o = 0; o < json_objectde.length; o++) {
        ordersStore.push({
            NO_REFERENSI: json_objectde[o].NO_REFERENSI, TGL_INVOICE: json_objectde[o].TGL_INVOICE, NO_INVOICE: json_objectde[o].NO_INVOICE, VALUTA_INVOICE: "USD", NILAI_FINAL: json_objectde[o].NILAI_FINAL
        });

    }

}


function addOrder(products, ordersStore) {

    productsStore.push([{
        type: "update",
        key: ordersStore.NO_REFERENSI,
        data: {
            VALUTA_FOB: products.VALUTA_FOB,
            NILAI_FOB: products.NILAI_FOB + ordersStore.NILAI_FINAL
        }
    }]);
}

var Today = new Date();
var Day = new Date();
var LastTwoYear = Day.setFullYear(Day.getFullYear() - 2);

data_awal();
isi_array();
addOrder(products, ordersStore);
load_datagrid(productsStore, ordersStore);


function load_datagrid(productsStore, ordersStore) {

    $("#grid-container").dxDataGrid({
        dataSource: {
            store: productsStore,
            reshapeOnPush: true
        },
        repaintChangesOnly: true,
        columnAutoWidth: true,
        showBorders: true,
        paging: {
            pageSize: 10
        },
        columns: [
            { caption: "NO KPPBC", dataField: "NO_KPPBC", dataType: "string" },
            { caption: "TGL PPI", dataField: "TGL_PPI", dataType: "date", displayFormat: "dd-MM-yyyy" },
            { caption: "NO PPI", dataField: "NO_PPI", dataType: "string" },
            { caption: "NILAI FOB", dataField: "NILAI_FINAL", dataType: "number", allowSorting: true },
            { caption: "TOTAL INVOICE", dataField: "TOTAL_INVOICE", dataType: "number", allowSorting: true }
        ],
        summary: {
            totalItems: [{
                summaryType: "count",
                column: "NO_KPPBC"
            }, {
                summaryType: "sum",
                column: "NILAI_FOB"
            }]
        },
        masterDetail: {
            enabled: true,
            template: function (container, options) {
                $("<div>").appendTo(container).dxDataGrid({
                    dataSource: {
                        store: ordersStore,
                        filter: ["NO_REFERENSI", "=", options.key],
                        reshapeOnPush: true
                    },
                    repaintChangesOnly: true,
                    columnAutoWidth: true,
                    showBorders: true,
                    paging: {
                        pageSize: 5
                    },
                    editing: {
                        allowDeleting: true,
                        allowUpdating: true,
                        allowAdding: true,
                        mode: "row",
                        startEditAction: "click",
                        texts: {
                            addRow: "Menambah Data",
                            cancelAllChanges: "Batalkan Semua Perubahan",
                            cancelRowChanges: " ",
                            confirmDeleteMessage: "<center>Apakah anda yakin?</center>",
                            confirmDeleteTitle: "",
                            deleteRow: "",
                            editRow: "",
                            saveAllChanges: "Simpan Perubahan",
                            saveRowChanges: " ",
                            undeleteRow: "Batalkan",
                            validationCancelChanges: "Batalkan Perubahan"
                        }
                    },
                    columns: [{
                        caption: "TOT",
                        dataField: "TOT",
                        dataType: "number",
                        allowEditing: false,
                        visible: false
                    }, {
                        caption: "ID",
                        dataField: "ID",
                        dataType: "string",
                        allowEditing: false,
                        visible: false
                    }, {
                        caption: "TGL INVOICE",
                        dataField: "TGL_INVOICE",
                        dataType: "date",
                        displayFormat: "dd-MM-yyyy"


                    }, {
                        caption: "NO INVOICE",
                        dataField: "NO_INVOICE",
                        dataType: "string"


                    }, {
                        caption: "NO PPI",
                        dataField: "NO_PPI",
                        dataType: "string",
                        allowEditing: false
                    }, {
                        caption: "VALUTA INVOICE",
                        dataField: "VALUTA_INVOICE",
                        dataType: "string",
                        allowEditing: false

                    }, {
                        caption: "NILAI FINAL",
                        dataField: "NILAI_FINAL",
                        dataType: "number"

                    }],
                    summary: {
                        totalItems: [{
                            summaryType: "count",
                            column: "NILAI_FINAL"
                        }, {
                            summaryType: "sum",
                            showInColumn: "NILAI_FINAL",
                            column: "NILAI_FINAL"
                        }]
                    },
                    onCellPrepared: function (e) {
                        if (e.column.type === "buttons" && e.rowType === "data") {
                            var $del = e.cellElement.find(".dx-link-delete");
                            $del.attr("title", "Hapus Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-trash">');
                        }
                        if (e.column.type === "buttons" && e.rowType === "data") {
                            $edi = e.cellElement.find(".dx-link-edit");
                            $edi.attr("title", "Ubah Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-edit">');
                        }
                        if (e.column.type === "buttons" && e.rowType === "data") {
                            var $sav = e.cellElement.find(".dx-link-save");
                            $sav.attr("title", "Simpan Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-save">');
                        }
                        if (e.column.type === "buttons" && e.rowType === "data") {
                            var $cal = e.cellElement.find(".dx-link-cancel");
                            $cal.attr("title", "Batal Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-revert">');
                        }
                    },

                    onRowValidating: function (e) {
                        if (e.isValid && e.newData.NILAI_FINAL === 0) {
                            e.isValid = false;

                            e.errorText = "Nilai Final tidak boleh Nol(Kosong)!";
                        }

                        if (e.isValid && e.newData.NILAI_FINAL > 10000000000) {
                            e.isValid = false;
                            e.errorText = "Jumlah NILAI FINAL melebihi batas maksimum (1000000000)!";
                        }

                        if (e.isValid && e.newData.NILAI_FINAL < 1) {
                            e.isValid = false;
                            e.errorText = "Jumlah NILAI FINAL minimum adalah 1!";
                        }
                    },
                    //onContentReady: function (e) {
                    //    //if ($("#gridInvEksPEB").dxDataGrid('getDataSource').totalCount() === 0)
                    //    //    $('#btnCariIncoming').attr('disabled', 'disabled');
                    //    //else
                    //    //    $('#btnCariIncoming').removeAttr("disabled");
                    //},
                    onRowRemoving: function (e) {
                        if (ViewOnly) {
                            toast_notify("Anda tidak memiliki wewenang untuk menghapus data", "warning", 5000);
                            e.cancel = true;
                        } else {
                            var method = "POST"; var pebJSon = routeApi + "DataDHE/LoadUpdateInvoice_PPI";
                            var IDREF = options.key;
                            var ID = e.data.ID;
                            var NO_DOKUMEN = e.data.NO_INVOICE;
                            var TGL_INVOICE = e.data.TGL_INVOICE;
                            var NILAI_INVOICE_LAMA = 0;
                            var NILAI_INVOICE_BARU = 0;
                            var IDKON = "D"; var IDR = "A";

                            pebJSon = pebJSon + "?IDREF=" + IDREF + "&ID=" + ID + "&NO_DOKUMEN=" + NO_DOKUMEN + "&TGL_INVOICE=" + TGL_INVOICE + "&NILAI_INVOICE_LAMA=" + NILAI_INVOICE_LAMA + "&NILAI_INVOICE_BARU=" + NILAI_INVOICE_BARU+ "&IDR=" + IDR + "&IDKON=" + IDKON;
                         
                            $.ajax({
                                url: pebJSon,
                                type: method,
                                dataType: "json",
                                success: function (data) {
                                    if (data == 1)
                                    { DevExpress.ui.notify("Anda berhasil menghapus data", "SUCCESS", 5000); }
                                    else
                                    { DevExpress.ui.notify("Anda gagal menghapus data", "error", 5000); }
                               
                                }
                                
                            });

                        }


                    },
                    onRowInserting: function (e) {
                        if (ViewOnly) {
                            toast_notify("Anda tidak memiliki wewenang untuk menambah data", "warning", 5000);
                            e.cancel = true;
                        } else {
                            var method = "POST"; var pebJSon = routeApi + "DataDHE/LoadUpdateInvoice_PPI";
                            var IDREF = options.key; //mengambil nilai noreferensi
                            var ID = 0;
                            var NO_DOKUMEN = e.data.NO_INVOICE;
                            var TGL_INVOICE = e.data.TGL_INVOICE;
                            var NILAI_INVOICE_LAMA = 0;
                            var NILAI_INVOICE_BARU = e.data.NILAI_FINAL;
                            var IDKON = "I"; var IDR = "A";
                            pebJSon = pebJSon + "?IDREF=" + IDREF + "&ID=" + ID + "&NO_DOKUMEN=" + NO_DOKUMEN + "&TGL_INVOICE=" + TGL_INVOICE + "&NILAI_INVOICE_LAMA=" + NILAI_INVOICE_LAMA + "&NILAI_INVOICE_BARU=" + NILAI_INVOICE_BARU + "&IDR=" + IDR + "&IDKON=" + IDKON;
                           
                            $.ajax({
                                url: pebJSon,
                                type: method,
                                dataType: "json",
                                success: function (data) {
                                    if (data == 1) {
                                        DevExpress.ui.notify("Anda berhasil menambah data", "SUCCESS", 5000);
                                        var dataGrid = $("#grid-container").dxDataGrid("instance");
                                        dataGrid.collapseAll(-1);
                                        clear();
                                    }
                                    else
                                        DevExpress.ui.notify("Nilai Invoice yang anda masukan terlalubesar ", "error", 5000);

                                },
                              //  timeout: 3000
                            });
                        }


                    },
                    onRowUpdating: function (e) {
                        if (ViewOnly) {
                            toast_notify("Anda tidak memiliki wewenang untuk mengubah data", "warning", 5000);
                            e.cancel = true;
                        } else {
                            //menyimpan perubahan

                            var method = "POST"; var pebJSon = routeApi + "DataDHE/LoadUpdateInvoice_PPI";
                            var IDREF = options.key;
                            var TOT = e.newData.TOT !== undefined ? e.newData.TOT : e.oldData.TOT;
                            var ID = e.newData.ID !== undefined ? e.newData.ID : e.oldData.ID;
                            var NO_DOKUMEN = e.newData.NO_INVOICE !== undefined ? e.newData.NO_INVOICE : e.oldData.NO_INVOICE;
                            var TGL_INVOICE = e.newData.TGL_INVOICE !== undefined ? e.newData.TGL_INVOICE : e.oldData.TGL_INVOICE;
                            var NILAI_INVOICE_LAMA = e.oldData.NILAI_FINAL;
                            var NILAI_INVOICE_BARU = e.newData.NILAI_FINAL !== undefined ? e.newData.NILAI_FINAL : e.oldData.NILAI_FINAL;
                            var IDKON = "U"; var IDR = "A";
                            pebJSon = pebJSon + "?IDREF=" + IDREF + "&ID=" + ID + "&NO_DOKUMEN=" + NO_DOKUMEN + "&TGL_INVOICE=" + TGL_INVOICE + "&NILAI_INVOICE_LAMA=" + NILAI_INVOICE_LAMA + "&NILAI_INVOICE_BARU=" + NILAI_INVOICE_BARU + "&IDR=" + IDR + "&IDKON=" + IDKON;
                            //  alert(pebJSon)


                            $.ajax({
                                url: pebJSon,
                                type: method,
                                dataType: "json",
                                success: function (data) {

                                    if (data == 1)
                                        DevExpress.ui.notify("Anda berhasil merubah data", "SUCCESS", 5000);
                                    else
                                        // e.oldData.NILAI_FINAL = NILAI_INVOICE_LAMA;
                                        DevExpress.ui.notify("Nilai Invoice yang anda masukan terlalubesar ", "error", 5000);
                                },
                                timeout: 3000
                            });


                        }
                    }
                });
            }
        }
    });

} //end function load_datagrid




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

        if ($("#txtPerPEB2").dxDateBox("instance").option("value") === null || $("#txtSampaiPEB2").dxDateBox("instance").option("value") === null) {
            DevExpress.ui.notify("Tanggal Periode PPI tidak boleh kosong", "error");
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
                var urlPEB = routeApi + "DataPEB/LoadInvoicePPI";
                var urlPEB2 = routeApi + "DataPEB/LoadInvoicePPI_GROUP";


                sendRequestPeb(urlPEB, urlPEB2, method);
            }
        }

    }
});

$("#txtNoPEB").dxTextBox({
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
        $("#grid-container").dxDataGrid("instance").option("dataSource", '');
    }

});

$("#okePEB").click(function (e) {
    SaveSelectedPEB();
});

$("#okePEBInv").click(function (e) {
    SaveSelectedPEBInv();
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
        $("#excel_container").dxDataGrid("instance").exportToExcel();
    }
});

$("#uploadEkspor").show().dxFileUploader({
    visible: false,
    multiple: false,
    accept: ".xls, .xlsx",
    allowedFileExtensions: [".xlsx", ".xls"],
    invalidMaxFileSizeMessage: "Dokumen melebihi batas maksimum",
    maxFileSize: 25000000000,
    uploadUrl: routeApp + "Pelapor/Invoice_PPI",
    uploadMode: "instantly",
    onUploading: function (e) {
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
            if (parseInt(worksheet["!ref"].split(":")[1].substring(1, 3)) === 1) {
                toast_notify("Upload gagal. Tidak ada data yang diubah.", "warning", 5000);
                return;
            }
            var xlsxJson = XLSX.utils.sheet_to_json(worksheet, { header: "A", raw: false });
            var countxls = xlsxJson.length - 1;
            var CountLoop = 0;
            
            var arrayTest = ["ID", "NO REFERENSI", "NPWP", "KD KANTOR", "NO DAFTAR", "JNS TRX", "TGL INVOICE", "NO PPI", "NO INVOICE", "VALUTA INVOICE", "NILAI FINAL", "ID SEQ","ID STATUS INVOICE"]


            for (var key in xlsxJson[0]) {
                if (xlsxJson[0][key].toUpperCase() !== arrayTest[CountLoop]) {
                    toast_notify("Upload Gagal. Template tidak sesuai.", "warning", 5000);
                    return;
                }
                CountLoop += 1;
            }

            xlsxJson.shift();

            if (xlsxJson.length === 0) {
                toast_notify("Upload gagal. Data tidak ditemukan.", "warning", 5000);
                return;
            }

            jsData["xlsJson"] = JSON.stringify(xlsxJson);
            jsData["xlsTipe"] = "ppi";
            formData.append('data', JSON.stringify(jsData));

            $.ajax({
                url: routeApi + "Netting/UploadInvoice_PPI",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (result) {
                    if (result[0].resultStatus === 1) {
                        toast_notify("Berhasil upload Excel", "success", 5000);
                        $("#grid-container").dxDataGrid("instance").refresh();
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
}).dxFileUploader("instance");


$('#btnUpExcel').dxButton({
    icon: "upload",
    stylingMode: "outlined",
    text: "Upload Data",
    type: "success",
    elementAttr: {
        class: "btnMarginRight"
    },
    disabled: false,
    onClick: function (e) {
        $.when(
            $("#uploadEkspor").dxFileUploader("instance").reset()
        ).done(function () {
            $("#uploadEkspor").dxFileUploader("instance")._isCustomClickEvent = true;
            $("#uploadEkspor").dxFileUploader("instance")._$fileInput.click();
        });
    }
});

function SaveSelectedPEB() {
    var formData = new FormData();
    var datas = {};
    var url = routeApi + "Netting/SaveSelectedPeb";
    var pebJSon = "";
    $("#grid-container").dxDataGrid("instance").getSelectedRowsData().forEach(function (val, ix) {
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
    var selectedRowKeys = $("#grid-container").dxDataGrid("instance").getSelectedRowKeys();
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


function sendRequestPeb(url, url2, method) {

    var kpbc = $("#txtSanKPBC").dxSelectBox("instance").option("value");
    var startDate = $("#txtPerPEB2").dxDateBox("instance").option("text");
    var endDate = $("#txtSampaiPEB2").dxDateBox("instance").option("text");
    var statusSelesai = $("#CmbStatusSelesaiPEB").dxTagBox("instance").option("value");
    var isJatuhTempo = $("#CmbStatusJatuhTempoPEB").dxSelectBox("instance").option("value");
    var noPeb = $("#txtNoPEB").dxTextBox("instance").option("value");
    var noInvoice = $("#txtNoInvoice").dxTextBox("instance").option("value");
    var isSda = $("#txtFlagSDA").dxSelectBox("instance").option("value");
    var url3 = "?kpbc=" + (kpbc === null ? "" : kpbc) +
        "&startDate=" + startDate +
        "&endDate=" + endDate +
        "&statusSelesai=" + (statusSelesai === null ? "" : statusSelesai) +
        "&isJatuhTempo=" + isJatuhTempo +
        "&noPeb=" + noPeb +
        "&noInv=" + noInvoice +
        "&isSDA=" + isSda;
    url = url + url3;
    url2 = url2 + url3;

    orders = [];
    products = [];
    ordersStore = [];
    productsStore = [];


    $.ajax({
        url: url2,
        type: method,
        contentType: 'application/json; charset=utf-8',
        success: function (e) {
            var json_object2 = e; //JSON.parse(data_gr);
            for (var i = 0; i < json_object2.length; i++) {
                //   alert("group" + json_object2[i].NO_REFERENSI + "->" + json_object2[i].KD_KANTOR + "->" + json_object2[i].TGL_DAFTAR + "->" + json_object2[i].THN + "->" + json_object2[i].NO_PPE + "->" + json_object2[i].NILAI_FOB + "->" + json_object2[i].TOTAL_INVOICE)
                products.push({
                    NO_REFERENSI: json_object2[i].NO_REFERENSI, NO_KPPBC: json_object2[i].KD_KANTOR, TGL_PPI: json_object2[i].TGL_DAFTAR, NO_PPI: json_object2[i].NO_DAFTAR, NILAI_FOB: 0,
                    VALUTA_FOB: json_object2[i].KD_VAL, NILAI_FINAL: json_object2[i].NILAI_FOB, TOTAL_INVOICE: json_object2[i].TOTAL_INVOICE
                });

            }


            $.ajax({
                url: url,
                type: method,
                contentType: 'application/json; charset=utf-8',
                success: function (d) {
                    var json_objectde = d;

                    isi_data_Excel(d);
                    var json_object3 = d;
                    for (var x = 0; x < json_object3.length; x++) {
                        //  alert("detail " + json_object3[x].NO_REFERENSI + "->" + json_object3[x].TGL_DAFTAR + "->" + json_object3[x].TGL_DOK + "->" + json_object3[x].KD_VAL + "->" + json_object3[x].FOB_CIF )
                        ordersStore.push({
                            TOT: json_object3[x].TOT, ID: json_object3[x].ID_PPE_PPI_DOK, NO_REFERENSI: json_object3[x].NO_REFERENSI, TGL_INVOICE: json_object3[x].TGL_DOK, NO_INVOICE: json_object3[x].NO_DOKUMEN, NO_PPI: json_object3[x].NO_DAFTAR, VALUTA_INVOICE: json_object3[x].KD_VAL, NILAI_FINAL: json_object3[x].FOB_CIF

                        });

                    }
                }

            });

            var productsStore = new DevExpress.data.ArrayStore({
                key: "NO_REFERENSI",
                data: products
            });


            run_datagridtree(products, ordersStore, productsStore);

        }


    });



    $("#btnSearchPEB").dxButton({
        icon: "search",
        text: "Cari Data",
        disabled: false
    });
    $("#btnResetPEB").dxButton({ disabled: false });



}


function run_datagridtree(products, ordersStore, productsStore) {

    addOrder(products, ordersStore);
    load_datagrid(productsStore, ordersStore);
}

//proses upload
function isi_data_Excel(datade) {
    $("#excel_container").hide().dxDataGrid({
        dataSource: datade,
        allowColumnResizing: true,
        columnMinWidth: 100,
        columnAutoWidth: true,

        columns: [ {
            caption: "ID",
            dataField: "ID_PPE_PPI_DOK",
            dataType: "number"
          
            }, {
                caption: "NO REFERENSI",
                dataField: "NO_REFERENSI",
                dataType: "string"
               
            }, {
                caption: "NPWP",
                dataField: "NPWP",
                dataType: "string"
             
            }, {
                caption: "KD KANTOR",
                dataField: "KD_KANTOR",
                dataType: "string"
               
            }, {
                caption: "NO DAFTAR",
                dataField: "NO_DAFTAR",
                dataType: "string"
              
            }, {
                caption: "JNS TRX",
                dataField: "JNS_TRX",
                dataType: "string"
                        }, {
            caption: "TGL INVOICE",
            dataField: "TGL_DOK",
            dataType: "date",
            displayFormat: "dd-MM-yyyy"
            
        },  {
            caption: "NO PPI",
            dataField: "NO_DAFTAR",
            dataType: "string"
            
        }, {
            caption: "NO INVOICE",
            dataField: "NO_DOKUMEN",
            dataType: "string"
            
        }, {
            caption: "VALUTA INVOICE",
            dataField: "KD_VAL",
            dataType: "string"
            
        }, {
            caption: "NILAI FINAL",
            dataField: "FOB_CIF",
            dataType: "number"
            
        }, {
            caption: "ID SEQ",
            dataField: "ID_SEQ",
            dataType: "string"
            
        }, {
            caption: " ID STATUS INVOICE",
            dataField: " ID_STATUS_INVOICE",
            dataType: "string"
            
        }],
        onCellPrepared: function (e) {
            if (e.rowType === "header") {
                e.cellElement.css("text-align", "center");
            }
            if (e.rowType === "data")
                e.cellElement.css("text-align", "left");
        },
        noDataText: "Tidak Ada Data",
        showBorders: false,
        export: {
            enabled: true,
            fileName: "Input Invoice PPI"
        }
    });
}
//end upload
function clear() {
    var method = "GET";
    var urlPEB = routeApi + "DataPEB/LoadInvoicePPI";
    var urlPEB2 = routeApi + "DataPEB/LoadInvoicePPI_GROUP";


    sendRequestPeb(urlPEB, urlPEB2, method);
}