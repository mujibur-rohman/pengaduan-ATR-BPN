$(function () {
    var now = new Date();
    var NoPIB = [];

    var Today = new Date();
    var Day = new Date();
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

    var now = new Date();

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
            var urlPEB = routeApi + "DataPIB/LoadPIBPJT";
            sendRequestPeb(urlPEB, method);
        }
    });

    $("#txtPerPEB2").dxDateBox({
        type: "date",
        value: LastTwoYear,
        useMaskBehavior: true,
        displayFormat: "dd-MM-yyyy"
    });

    var BtnInput = $("#btnInput").dxButton({
        text: "Input",
        height: 34,
        width: 125,
        type: "default",
        stylingMode: "outlined",
        disabled: true,
        //onInitialized: function (e) {
        //    if (ViewOnly == 1) {
        //        e.component.option("visible", false);
        //    }
        //},
        onClick: function () {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk melakukan proses ini", "warning", 5000);
            }
            else {
                jQuery.ajax({
                    type: "POST",
                    url: routeApi + "DataPIB/PostOnDuty?ParamPIB=" + NoPIB + "&jenis=9",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",

                    success: function (data) {
                        window.location.href = routeApp + "Pelapor/InputPJTI";
                    },

                });
            }
        }
    }).dxButton("instance");

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
            $("#CmbStatusSelesaiPIB").dxTagBox('instance').option('value', '');
            $("#CmbStatusJatuhTempoPEB").dxSelectBox('instance').option('value', '');
            $("#gridContainer1").dxDataGrid("instance").option("dataSource", '');
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
        onClick: function () {
            $("#gridContainer1").dxDataGrid("instance").exportToExcel();
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
        onClick: function (e) {
            $.when(
                $("#uploadExcel").dxFileUploader("instance").reset()
            ).done(function () {
                $("#uploadExcel").dxFileUploader("instance")._isCustomClickEvent = true;
                $("#uploadExcel").dxFileUploader("instance")._$fileInput.click();
            });
        }
    });

    $("#uploadExcel").show().dxFileUploader({
        visible: false,
        multiple: false,
        accept: ".xls, .xlsx",
        allowedFileExtensions: [".xlsx", ".xls"],
        invalidMaxFileSizeMessage: "Dokumen melebihi batas maksimum",
        maxFileSize: 25000000000,
        uploadUrl: routeApp + "Pelapor/PIBPJT",
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
                var xlsxJson = XLSX.utils.sheet_to_json(worksheet, { header: "A", raw: false, dateNF: 'YYYY-MM-DD' });

                var CountLoop = 0;
                var arrayTest = ["NO PPI","NO KPPBC","TANGGAL PPI","NPWP PEMILIK BARANG","NAMA PEMILIK BARANG","NOMOR INVOICE","TANGGAL INVOICE","NILAI INVOICE","VALUTA BARANG","NILAI BARANG"];
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
                jsData["xlsTipe"] = "impor";
                jsData["xlsJenis"] = 9;
                formData.append('data', JSON.stringify(jsData));

                $.ajax({
                    url: routeApi + "DataPJT/UploadPJT",
                    type: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        if (result[0].resultStatus === 1) {
                            toast_notify("Upload Berhasil.", "success", 2000);

                            setTimeout(function () {
                                window.location.href = result[0].msg_value;
                            }, 2000)
                        }
                        else
                            toast_notify(result[0].msg_value, "error", 5000);
                    }
                });
            };
            reader.onerror = function (ex) {
                toast_notify("Upload failed", "error", 5000);
            };
            reader.readAsBinaryString(d.file);
        }
    }).dxFileUploader("instance");

    var dataGrid = $("#gridContainer1").dxDataGrid({
        //  rowAlternationEnabled: true,
        dataSource: "",
        columnAutoWidth: true,
        showBorders: true,
        allowColumnReordering: true,
        showBorders: true,
        columnMinWidth: 100,
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
            mode: "multiple",
            showCheckBoxesMode: "always"
        },
        onCellPrepared: function (e) {
            if (e.rowType === "data" & e.column.command === 'select' && (e.data.flag_approval != 5 && e.data.flag_approval != 4)) {
                e.cellElement.find('.dx-select-checkbox').dxCheckBox("instance").option("disabled", true);
                e.cellElement.off();
            }
        },
        onEditorPreparing: e => {
            if (e.parentType === 'headerRow' && e.command === 'select') { e.editorElement.remove(); }
        },
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData;
            if (data.length > 0) {
                BtnInput.option("disabled", !selectedItems.selectedRowsData.length);
                NoPIB = jQuery.map(data, function (value) {
                    return value.id_pel_pib;
                }).join(",");
            }
            else {

                BtnInput.option("disabled", true);
            }
        },
        columns: [
            {
                caption: "NPWP",
                alignment: "left",
                dataField: "npwp_pelapor",
                allowExporting: false
            }, {
                caption: "Nama Eksportir",
                alignment: "left",
                dataField: "nm_eks_imp",
                allowExporting: false
            }, {
                caption: "No PPI",
                alignment: "left",
                dataField: "no_pib"
            }, {
                caption: "No KPPBC",
                alignment: "left",
                dataField: "kpbc_pib"
            }, {
                caption: "Tanggal PPI",
                dataField: "tgl_pib",
                alignment: "right",
                dataType: "date",
                format: "dd-MM-yyyy"
            }, {
                caption: "NPWP Pemilik Barang",
                alignment: "left",
                dataField: "npwp_pemilik_barang",
                visible: false
            }, {
                caption: "Nama Pemilik Barang",
                alignment: "left",
                dataField: "nama_pemilik_barang",
                visible: false
            }, {
                caption: "Nomor Invoice",
                alignment: "left",
                dataField: "nomor_invoice",
                visible: false
            }, {
                caption: "Tanggal Invoice",
                dataField: "tanggal_invoice",
                alignment: "right",
                dataType: "date",
                format: "dd-MM-yyyy",
                visible: false
            }, {
                caption: "Nilai Invoice",
                alignment: "right",
                dataField: "nilai_invoice",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                visible: false
            }, {
                caption: "Valuta CIF",
                alignment: "Center",
                dataField: "val_pib",
                allowExporting: false
            }, {
                caption: "Valuta Barang",
                alignment: "Center",
                dataField: "valuta_barang",
                visible: false
            }, {
                caption: "Nilai CIF",
                alignment: "right",
                dataField: "nilai_pib",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                allowExporting: false
            }, {
                caption: "Nilai Barang",
                alignment: "right",
                dataField: "nilai_barang",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                visible: false
            }
        ],
        export: {
            allowExportSelectedData: true,
            fileName: "Daftar PPI Input PJT Impor"
        },
        onExporting: function (e) {
            e.component.beginUpdate();
            e.component.columnOption("npwp_pemilik_barang", "visible", true);
            e.component.columnOption("nama_pemilik_barang", "visible", true);
            e.component.columnOption("nomor_invoice", "visible", true);
            e.component.columnOption("tanggal_invoice", "visible", true);
            e.component.columnOption("nilai_invoice", "visible", true);
            e.component.columnOption("valuta_barang", "visible", true);
            e.component.columnOption("nilai_barang", "visible", true);

        },
        onExported: function (e) {
            e.component.columnOption("npwp_pemilik_barang", "visible", false);
            e.component.columnOption("nama_pemilik_barang", "visible", false);
            e.component.columnOption("nomor_invoice", "visible", false);
            e.component.columnOption("tanggal_invoice", "visible", false);
            e.component.columnOption("nilai_invoice", "visible", false);
            e.component.columnOption("valuta_barang", "visible", false);
            e.component.columnOption("nilai_barang", "visible", false);
            e.component.endUpdate();
        }

    }).dxDataGrid("instance");

    $("#txtNoPEB").dxTextBox({
        placeholder: "Masukkan Nomor PPI..."
    });
    $("#txtNoInvoice").dxTextBox({
        placeholder: "Masukkan  Nomor Invoice..."
    });
});

function sendRequestPeb(url, method) {
    var kpbc = $("#txtSanKPBC").dxSelectBox("instance").option("value");
    var startDate = $("#txtPerPEB2").dxDateBox("instance").option("text");
    var endDate = $("#txtSampaiPEB2").dxDateBox("instance").option("text");
    var statusSelesai = $("#CmbStatusSelesaiPIB").dxTagBox("instance").option("value");
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