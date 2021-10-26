var orders = [];
var products = [];
var ordersStore = [];
var data = [];
var datade = [];
//var ordersStore = new DevExpress.data.ArrayStore({
//    key: "NO_REFERENSI",
//    data: orders
//});  //by had

var productsStore = new DevExpress.data.ArrayStore({
    key: "NO_REFERENSI",
    data: products
});


function data_awal() {
    data = [];
    datade = [];
}


function isi_array() {
    var json_object = data;
    var json_objectde = datade;

    for (var i = 0; i < json_object.length; i++) {

        products.push({
            NO_REFERENSI: json_object[i].NO_REFERENSI, TGL_INCOMING: json_object[i].TGL_INCOMING, NO_REKENING: json_object[i].NO_REKENING, NO_DOKUMEN: json_object[i].NO_DOKUMEN, NM_PENGIRIM: json_object[i].NM_PENGIRIM, VALUTA_TRANSAKSI: json_object[i].VALUTA_TRANSAKSI,
            NILAI_TRANSAKSI: json_object[i].NILAI_TRANSAKSI, SISA_ALOKASI: json_object[i].SISA_ALOKASI, JUMLAH_INVOICE: json_object[i].JUMLAH_INVOICE
        });


    }


    for (var o = 0; o < json_objectde.length; o++) {
        ordersStore.push({
            NO_REFERENSI: json_objectde[o].NO_REFERENSI, NO_REKENING: json_objectde[o].NO_REKENING, NO_DOKUMEN: json_objectde[o].NO_DOKUMEN,
            TGL_INVOICE: json_objectde[o].TGL_INVOICE, NO_INVOICE: json_objectde[o].NO_INVOICE, VALUTA_INVOICE: json_objectde[o].VALUTA_INVOICE,
            NILAI_DOKUMEN: json_objectde[o].NILAI_DOKUMEN, NILAI_ALOKASI: json_objectde[o].NILAI_ALOKASI, NILAI_ALOKASI_IDR: json_objectde[o].NILAI_ALOKASI_IDR,
            NILAI_ALOKASI_USD: json_objectde[o].NILAI_ALOKASI_USD, JNS_IN_OUT: json_objectde[o].JNS_IN_OUT
        });

    }


}


function addOrder(products, ordersStore) {
    productsStore = new DevExpress.data.ArrayStore({
        key: "NO_REFERENSI",
        data: products
    });
}

var Today = new Date();
var Day = new Date();
var LastTwoYear = Day.setFullYear(Day.getFullYear() - 2);

var L2y = new Date().getFullYear() - 2;
data_awal();
isi_array();
addOrder(products, ordersStore);
load_datagrid(productsStore, ordersStore);
var Nilai_In = 0;
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

            { caption: "NO REFERENSI", dataField: "NO_REFERENSI", dataType: "string" },
            { caption: "TGL OUTGOING", dataField: "TGL_OUTGOING", dataType: "date", format: "dd-MM-yyyy"},
            { caption: "NO REKENING", dataField: "NO_REKENING", dataType: "string" },
            { caption: "NILAI TRANSAKSI", dataField: "NILAI_TRANSAKSI", dataType: "number", allowSorting: true },
            { caption: "TOTAL DOKUMEN", dataField: "TOTAL_INVOICE", dataType: "number" }
        ],
        summary: {
            totalItems: [{
                summaryType: "count",
                column: "NO_REFERENSI"
            }, {
                summaryType: "sum",
                valueFormat: "currency",
                column: "NILAI_TRANSAKSI"
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
                    },
                    {
                        caption: "ID",
                        dataField: "ID_IN_OUT_DOK",
                        dataType: "string",
                        allowEditing: false,
                        visible: false
                    }, {
                        caption: "NO DOKUMEN",
                        dataField: "NO_DOKUMEN",
                        dataType: "string"


                    }, {
                        caption: "TGL INVOICE",
                        dataField: "TGL_INVOICE",
                        dataType: "date",
                        format: "dd-MM-yyyy"

                    }, {
                        caption: "VALUTA INVOICE",
                        dataField: "VALUTA_INVOICE",
                        dataType: "string",
                        allowEditing: false
                    }, {
                        caption: "NILAI INVOICE",
                        dataField: "NILAI_DOKUMEN",
                        dataType: "number"
                      
                    }, {
                        caption: "NILAI ALOKASI",
                        dataField: "NILAI_ALOKASI",
                        dataType: "number"
                        
                        }, {
                            caption: "SISA ALOKASI",
                            dataField: "SISA_ALOKASI",
                            dataType: "number",
                            allowEditing: false
                           
                        }, {
                            caption: "JENIS TRANSAKSI",
                            dataField: "JNS_IN_OUT",
                            dataType: "string"
                           
                        }],
                    summary: {
                        totalItems: [{
                            summaryType: "count",
                            column: "NO_DOKUMEN"
                        }, {
                            summaryType: "sum",
                            column: "NILAI_DOKUMEN"
                        }]
                    },
                  
                    onEditorPrepared: function (e) {
                        if (e.parentType == "dataRow") {
                            if (e.dataField == "NILAI_DOKUMEN") {
                                $(e.editorElement).attr("myattr", e.dataField + e.row.rowIndex);
                                $(e.editorElement).dxNumberBox("instance").on("valueChanged", function (args) {
                                    e.setValue(args.value);
                                    var nilai = e.editorElement
                                        .closest(".dx-data-row")
                                        .find("[myattr='NILAI_ALOKASI" + e.row.rowIndex + "']")
                                        .dxNumberBox("instance")
                                        .option("value");
                                    e.component.cellValue(e.row.rowIndex, "SISA_ALOKASI", args.value- nilai);
                                })
                            }

                            if (e.dataField == "NILAI_ALOKASI") {
                                $(e.editorElement).attr("myattr", e.dataField + e.row.rowIndex);
                                $(e.editorElement).dxNumberBox("instance").on("valueChanged", function (args) {
                                    e.setValue(args.value);
                                    var nilai = e.editorElement
                                        .closest(".dx-data-row")
                                        .find("[myattr='NILAI_DOKUMEN" + e.row.rowIndex + "']")
                                        .dxNumberBox("instance")
                                        .option("value");
                                    e.component.cellValue(e.row.rowIndex, "SISA_ALOKASI", nilai- args.value );
                                })
                            }
                        }
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
                            var $can = e.cellElement.find(".dx-link-cancel");
                            $can.attr("title", "Batal Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-revert">');
                        }
                    },
                    onRowValidating: function (e) {
                        if (e.isValid && e.newData.NILAI_DOKUMEN === 0) {
                            e.isValid = false;
                            e.errorText = "Nilai Invoice Incoming  tidak boleh Nol(Kosong)!";
                        }


                        if (e.isValid && e.newData.NILAI_DOKUMEN < 1) {
                            e.isValid = false;
                            e.errorText = "Jumlah invoice Incoming minimum adalah 1!";
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
                            var method = "POST"; var pebJSon = routeApi + "DataDHE/LoadUpdateInvoice_Outgoing";
                            var IDREF = options.key;
                            var TOT = 0;
                            var ID = e.data.ID_IN_OUT_DOK;
                            var NO_DOKUMEN = e.data.NO_DOKUMEN;
                            var TGL_INVOICE = e.data.TGL_INVOICE;
                            var NILAI_INVOICE_LAMA = 0;
                            var NILAI_INVOICE_BARU = 0;
                            var JNS_IN_OUT = "";
                            var IDKON = "D"; var IDR = "A";
                            var NILAI_ALOKASI = 0;
                            var SISA_ALOKASI = 0;
                            pebJSon = pebJSon + "?IDREF=" + IDREF + "&ID=" + ID + "&NO_DOKUMEN=" + NO_DOKUMEN + "&TGL_INVOICE=" + TGL_INVOICE + "&NILAI_INVOICE_LAMA=" + NILAI_INVOICE_LAMA + "&NILAI_INVOICE_BARU="
                                + NILAI_INVOICE_BARU + "&JNS_IN_OUT=" + JNS_IN_OUT + "&IDR=" + IDR + "&IDKON=" + IDKON + "&NILAI_ALOKASI=" + NILAI_ALOKASI + "&SISA_ALOKASI=" + SISA_ALOKASI;

                            $.ajax({
                                url: pebJSon,
                                type: method,
                                dataType: "json",
                                success: function (data) {

                                    if (data == 1)
                                        DevExpress.ui.notify("Anda berhasil menghapus data", "warning", 5000);
                                    else
                                        DevExpress.ui.notify("Anda Tidak berhasil menghapus ", "error", 5000);
                                },
                                timeout: 3000
                            });

                        }
                    },
                    onRowInserting: function (e) {
                        if (ViewOnly) {
                            toast_notify("Anda tidak memiliki wewenang untuk menambah data", "warning", 5000);
                            e.cancel = true;
                        } else {
                            var method = "POST"; var pebJSon = routeApi + "DataDHE/LoadUpdateInvoice_Outgoing";
                            var IDREF = options.key; //mengambil nilai noreferensi
                            var ID = 0;
                            var TOT = 0;
                            var NO_DOKUMEN = e.data.NO_DOKUMEN;
                            var TGL_INVOICE = e.data.TGL_INVOICE;
                            var NILAI_INVOICE_LAMA = 0;
                            var NILAI_INVOICE_BARU = e.data.NILAI_DOKUMEN;
                            var JNS_IN_OUT = e.data.JNS_IN_OUT;
                            var IDKON = "I"; var IDR = "A";
                            var NILAI_ALOKASI = e.data.NILAI_ALOKASI;
                            var SISA_ALOKASI =  e.data.SISA_ALOKASI ;
                            pebJSon = pebJSon + "?IDREF=" + IDREF + "&ID=" + ID + "&NO_DOKUMEN=" + NO_DOKUMEN + "&TGL_INVOICE=" + TGL_INVOICE + "&NILAI_INVOICE_LAMA=" + NILAI_INVOICE_LAMA + "&NILAI_INVOICE_BARU="
                                + NILAI_INVOICE_BARU + "&JNS_IN_OUT=" + JNS_IN_OUT + "&IDR=" + IDR + "&IDKON=" + IDKON + "&NILAI_ALOKASI=" + NILAI_ALOKASI + "&SISA_ALOKASI=" + SISA_ALOKASI;

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

                                    // $("#grid-container").dxDataGrid("instance").refresh();
                                },
                                // timeout: 3000
                            });
                        }


                    },

                    onRowUpdating: function (e) {

                        if (ViewOnly) {
                            toast_notify("Anda tidak memiliki wewenang untuk mengubah data", "warning", 5000);
                            e.cancel = true;
                        } else {
                            //menyimpan perubahan
                            var method = "POST"; var pebJSon = routeApi + "DataDHE/LoadUpdateInvoice_Outgoing";
                            var IDREF = options.key;
                            var TOT = e.newData.TOT !== undefined ? e.newData.TOT : e.oldData.TOT;
                            var ID = e.newData.ID_IN_OUT_DOK !== undefined ? e.newData.ID_IN_OUT_DOK : e.oldData.ID_IN_OUT_DOK;
                            var NO_DOKUMEN = e.newData.NO_DOKUMEN !== undefined ? e.newData.NO_DOKUMEN : e.oldData.NO_DOKUMEN;
                            var TGL_INVOICE = e.newData.TGL_INVOICE !== undefined ? e.newData.TGL_INVOICE : e.oldData.TGL_INVOICE;
                            var NILAI_INVOICE_LAMA = e.oldData.NILAI_DOKUMEN;
                            var NILAI_INVOICE_BARU = e.newData.NILAI_DOKUMEN !== undefined ? e.newData.NILAI_DOKUMEN : e.oldData.NILAI_DOKUMEN;
                            var JNS_IN_OUT = e.newData.JNS_IN_OUT !== undefined ? e.newData.JNS_IN_OUT : e.oldData.JNS_IN_OUT;
                            var IDKON = "U"; var IDR = "A";
                            var NILAI_ALOKASI = e.newData.NILAI_ALOKASI !== undefined ? e.newData.NILAI_ALOKASI : e.oldData.NILAI_ALOKASI;
                            var SISA_ALOKASI = e.newData.SISA_ALOKASI !== undefined ? e.newData.SISA_ALOKASI : e.oldData.SISA_ALOKASI;
                            pebJSon = pebJSon + "?IDREF=" + IDREF + "&ID=" + ID + "&NO_DOKUMEN=" + NO_DOKUMEN + "&TGL_INVOICE=" + TGL_INVOICE + "&NILAI_INVOICE_LAMA=" + NILAI_INVOICE_LAMA + "&NILAI_INVOICE_BARU="
                                + NILAI_INVOICE_BARU + "&JNS_IN_OUT=" + JNS_IN_OUT + "&IDR=" + IDR + "&IDKON=" + IDKON + "&NILAI_ALOKASI=" + NILAI_ALOKASI + "&SISA_ALOKASI=" + SISA_ALOKASI;
                         //   alert(pebJSon)
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

    $("#dateStart_inc").dxDateBox({
        type: "date",
        max: new Date(),
        min: LastTwoYear,
        displayFormat: "dd-MM-yyyy",
        placeholder: "Awal",
        useMaskBehavior: true,
        value: LastTwoYear
    });

    $("#dateEnd_inc").dxDateBox({
        type: "date",
        max: new Date(),
        min: LastTwoYear,
        displayFormat: "dd-MM-yyyy",
        placeholder: "Akhir",
        useMaskBehavior: true,
        value: Today
    });


} //end function load_datagrid


//proses upload
function isi_data_Excel(datade) {
    $("#excel_container").hide().dxDataGrid({
        dataSource: datade,
        allowColumnResizing: true,
        columnMinWidth: 100,
        columnAutoWidth: true,
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
            fileName: "Input Invoice Outgoing"
        }
    });
}
//end upload



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



$("#btnResetInc").dxButton({
    icon: "revert",
    text: "Reset",
    type: "danger",
    stylingMode: "outlined",
    disabled: true,
    onClick: function (e) {
        $("#dateStart_inc").dxDateBox('instance').option('value', LastTwoYear);
        $("#dateEnd_inc").dxDateBox('instance').option('value', Today);
        $("#cmbKategoriRek").dxSelectBox('instance').option('value', '');
        $("#cmbSumberData").dxSelectBox('instance').option('value', '');
        $("#txtNoRek").dxTextBox("instance").option('value', '');
        $("#txtNoInvoice").dxTextBox("instance").option('value', '');
        $("#txtNoRef").dxTextBox("instance").option('value', '');
        $("#grid-container").dxDataGrid("instance").option('dataSource', []);
        e.component.option("disabled", true);
    }
});

$("#btnSearchInc").dxButton({
    icon: "search",
    text: "Cari Data",
    type: "default",
    stylingMode: "outlined",
    onClick: function (e) {

        if ($("#dateStart_inc").dxDateBox("instance").option("value") === null || $("#dateEnd_inc").dxDateBox("instance").option("value") === null) {
            toast_notify("Tanggal Periode Outgoing tidak boleh kosong", "error");
        }
        else {
            if ($("#dateStart_inc").dxDateBox("instance").option("value") > $("#dateEnd_inc").dxDateBox("instance").option("value")) {
                toast_notify("Tanggal awal tidak bisa lebih besar dari tanggal akhir", "error");
            }
            else {
                e.component.option("disabled", true);
                e.component.option("text", "Mencari Data...");
                e.component.option("icon", "fas fa-spin fa-spinner");
                $("#btnResetInc").dxButton("instance").option("disabled", true);
                var method = "GET";
                var urlPEB = routeApi + "DataPEB/LoadInvoiceOutgoing";
                var urlPEB2 = routeApi + "DataPEB/LoadInvoiceOutgoing_GROUP";


                sendRequestPeb(urlPEB, urlPEB2, method);
            }
        }
    }
});

//$("#dateStart_inc").dxDateBox({
//    type: "date",
//    //max: new Date(),
//    //min: new Date(L2y, 0, 1),
//    displayFormat: "dd-MM-yyyy",
//    placeholder: "Awal",
//    useMaskBehavior: true,
//    value: LastTwoYear
//});

//$("#dateEnd_inc").dxDateBox({
//    type: "date",
//    //max: new Date(),
//    //min: new Date(L2y, 0, 1),
//    displayFormat: "dd-MM-yyyy",
//    placeholder: "Akhir",
//    useMaskBehavior: true,
//    value: Today
//});

$("#cmbKategoriRek").dxSelectBox({
    dataSource: [
        { id: "", text: "Semua" },
        { id: "U", text: "Umum" },
        { id: "K", text: "Khusus" }
    ],
    displayExpr: 'text',
    valueExpr: 'id',
    value: ""
});

$("#cmbSumberData").dxSelectBox({
    dataSource: [
        { id: "", text: "Semua" },
        { id: "1", text: "Swift" },
        { id: "2", text: "Bank" }
    ],
    displayExpr: 'text',
    valueExpr: 'id',
    value: ""
});

$("#txtNoRek").dxTextBox({
    placeholder: "Masukkan Nomor Rekening..."
}).dxValidator({
    validationRules: [{
        type: "pattern",
        pattern: '^\\d+$',
        message: "Nomor Rekening harus angka"
    }]
});

$("#txtNoInvoice").dxTextBox({
    placeholder: "Masukkan  Nomor Dokumen..."
});

$("#txtNoRef").dxTextBox({
    placeholder: "Masukkan Nomor Referensi..."
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
    uploadUrl: routeApp + "Pelapor/Invoice_Outgoing",
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
            var arrayTest = ["ID", "NPWP", "NO REFERENSI", "NO REKENING", "JNS TRX", "NO DOKUMEN", "TGL INVOICE",
                "VALUTA INVOICE", "NILAI INVOICE", "NILAI ALOKASI", "SISA ALOKASI", "JENIS TRANSAKSI", "NM PENGIRIM", "ID GEN IN OUT"];

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
            jsData["xlsTipe"] = "ppe";
            formData.append('data', JSON.stringify(jsData));

            $.ajax({
                url: routeApi + "Netting/UploadInvoice_Outgoing",
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

function SaveSelectedPPE(pebJSon, method) {
    DevExpress.ui.notify("Anda 1" + pebJSon, "warning", 5000);
    $.ajax({
        url: pebJSon,
        type: method,
        dataType: "json",
        success: function (k) {

            DevExpress.ui.notify("Anda berhasil merubah data", "warning", 5000);
        }
    });

}

function DeleteSelectedPPE(pebJSon, method) {

    $.ajax({
        url: pebJSon,
        type: method,
        contentType: 'application/json; charset=utf-8',
        success: function (k) {

            DevExpress.ui.notify("Anda berhasil menghapus data", "warning", 5000);
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

    var startOpt = $("#dateStart_inc").dxDateBox("instance").option();
    var startDate = startOpt.displayFormat === "dd-MM-yyyy" ? startOpt.text.split("-").reverse().join("-") : startOpt.text;
    var endOpt = $("#dateEnd_inc").dxDateBox("instance").option();
    var endDate = endOpt.displayFormat === "dd-MM-yyyy" ? endOpt.text.split("-").reverse().join("-") : endOpt.text;
    var jnsRek = $("#cmbKategoriRek").dxSelectBox("instance").option("value");
    var sumberData = $("#cmbSumberData").dxSelectBox("instance").option("value");
    var noRek = $("#txtNoRek").dxTextBox("instance").option("value");
    var noInv = $("#txtNoInvoice").dxTextBox("instance").option("value");
    var noRef = $("#txtNoRef").dxTextBox("instance").option("value");

    var url3 = "?startDate=" + startDate +
        "&endDate=" + endDate +
        "&jnsRek=" + jnsRek +
        "&sumberData=" + sumberData +
        "&noRek=" + noRek +
        "&noInv=" + noInv +
        "&noRef=" + noRef;
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
        success: function (k) {

            var json_object2 = k; //JSON.parse(data_gr);

            for (var i = 0; i < json_object2.length; i++) {

                //  alert("group" + json_object2[i].NO_REFERENSI + "->" + json_object2[i].TGL_INCOMING + "->" + json_object2[i].NO_REKENING + "->" + json_object2[i].NO_DOKUMEN + "->" + json_object2[i].NM_PENGIRIM + "->" + json_object2[i].VALUTA_TRANSAKSI + "->" + json_object2[i].TOTAL_INVOICE)

                products.push({
                    NO_REFERENSI: json_object2[i].NO_REFERENSI,TGL_OUTGOING: json_object2[i].TGL_OUTGOING,NO_REKENING: json_object2[i].NO_REKENING,NO_DOKUMEN: json_object2[i].NO_DOKUMEN,
                    NILAI_TRANSAKSI: json_object2[i].NILAI_TRANSAKSI, TOTAL_INVOICE: json_object2[i].TOTAL_INVOICE
                });


            }


            $.ajax({
                url: url,
                type: method,
                contentType: 'application/json; charset=utf-8',
                success: function (d) {
                    //  alert("kita" + url + "===>" + url2)
                    isi_data_Excel(d);
                    var json_object3 = d;
                    for (var x = 0; x < json_object3.length; x++) {
                        //      alert("detail " + json_object3[x].NO_REFERENSI + "->" + json_object3[x].NO_DOKUMEN + "->" + json_object3[x].TGL_INVOICE + "->" + json_object3[x].NO_INVOICE + "->" + json_object3[x].VALUTA_INVOICE + "->" + json_object3[x].NILAI_DOKUMEN )
                        ordersStore.push({
                            ID_IN_OUT_DOK: json_object3[x].ID_IN_OUT_DOK, NPWP: json_object3[x].NPWP, NO_REFERENSI: json_object3[x].NO_REFERENSI, NO_REKENING: json_object3[x].NO_REKENING, NO_DOKUMEN: json_object3[x].NO_DOKUMEN,
                            TGL_INVOICE: json_object3[x].TGL_INVOICE, NO_INVOICE: json_object3[x].NO_INVOICE, VALUTA_INVOICE: json_object3[x].VALUTA_INVOICE,
                            NILAI_DOKUMEN: json_object3[x].NILAI_DOKUMEN, NILAI_ALOKASI: json_object3[x].NILAI_ALOKASI, SISA_ALOKASI: json_object3[x].SISA_LOKASI,
                            NILAI_ALOKASI_USD: json_object3[x].NILAI_ALOKASI_USD, JNS_IN_OUT: json_object3[x].JNS_IN_OUT
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


    $("#btnSearchInc").dxButton({
        icon: "search",
        text: "Cari Data",
        disabled: false
    });
    $("#btnResetInc").dxButton({ disabled: false });



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
        columns: [
            {
                caption: "ID",
                dataField: "ID_IN_OUT_DOK",
                dataType: "string"

            }, {
                caption: "NPWP",
                dataField: "NPWP",
                dataType: "string"

            }, {
                caption: "NO REFERENSI",
                dataField: "NO_REFERENSI",
                dataType: "string"

            }, {
                caption: "NO REKENING",
                dataField: "NO_REKENING",
                dataType: "string"

            }, {
                caption: "JNS TRX",
                dataField: "JNS_TRX",
                dataType: "string"

            }, {
                caption: "NO DOKUMEN",
                dataField: "NO_DOKUMEN",
                dataType: "string"


            }, {
                caption: "TGL INVOICE",
                dataField: "TGL_INVOICE",
                dataType: "date",
                format: "dd-MM-yyyy"

            }, {
                caption: "VALUTA INVOICE",
                dataField: "VALUTA_INVOICE",
                dataType: "string"
            }, {
                caption: "NILAI INVOICE",
                dataField: "NILAI_DOKUMEN",
                dataType: "number",
                allowSorting: true
            }, {
                caption: "NILAI ALOKASI",
                dataField: "NILAI_ALOKASI",
                dataType: "number",
                allowSorting: true

            }, {
                caption: "SISA ALOKASI",
                dataField: "SISA_LOKASI",
                dataType: "number",
                allowSorting: true

            }, {
                caption: "JENIS TRANSAKSI",
                dataField: "JNS_IN_OUT",
                dataType: "string"

            }, {
                caption: "NM PENGIRIM",
                dataField: "NM_PENGIRIM",
                dataType: "string"

            }, {
                caption: "ID GEN IN OUT",
                dataField: "ID_GEN_IN_OUT",
                dataType: "string"

            }],        onCellPrepared: function (e) {
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
            fileName: "Input Invoice Outgoing"
        }
    });
}
//end upload

function clear() {
    var method = "GET";
    var urlPEB = routeApi + "DataPEB/LoadInvoiceOutgoing";
    var urlPEB2 = routeApi + "DataPEB/LoadInvoiceOutgoing_GROUP";


    sendRequestPeb(urlPEB, urlPEB2, method);
}

