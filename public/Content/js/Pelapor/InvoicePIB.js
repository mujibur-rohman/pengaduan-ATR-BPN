$(function () {
    var Today = new Date();
    var Day = new Date();
    var LastTwoYear = Day.setFullYear(Day.getFullYear() - 2);
    var pibCols = [
        {
            caption: "Data PPI",
            alignment: "Center",
            columns: [
                {
                    caption: "No. KPBC",
                    alignment: "left",
                    dataField: "kpbc_pib"
                }, {
                    caption: "No. PPI",
                    alignment: "left",
                    dataField: "no_pib"
                }, {
                    caption: "Tanggal PPI",
                    alignment: "right",
                    dataField: "tgl_pib",
                    dataType: "date",
                    format: "dd-MM-yyyy",
                    width: 103
                }, {
                    caption: "Tanggal Jatuh Tempo",
                    dataField: "tgl_jth_tempo_pib",
                    alignment: "right",
                    dataType: "date",
                    format: "dd-MM-yyyy",
                    width: 158
                }, {
                    caption: "Status Jatuh Tempo",
                    dataField: "status_jth_tempo_pib",
                    alignment: "left",
                    lookup: {
                        dataSource: [
                            { id: false, text: "Belum Jatuh Tempo" },
                            { id: true, text: "Sudah Jatuh Tempo" }
                        ],
                        displayExpr: "text",
                        valueExpr: "id"
                    }
                }
            ]
        },
        {
            caption: "Data CIF",
            alignment: "center",
            columns: [
                {
                    caption: "Valuta",
                    alignment: "center",
                    dataField: "val_pib",
                    width: 64
                }, {
                    caption: "Nilai",
                    alignment: "right",
                    dataField: "nilai_pib",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                }, {
                    caption: "Nilai USD",
                    alignment: "right",
                    dataField: "nilai_usd_pib",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                }
            ]
        },
        {
            caption: "Data Invoice",
            alignment: "Center",
            columns: [
                {
                    caption: "Nomor",
                    alignment: "left",
                    dataField: "no_inv_pib"
                }, {
                    caption: "Tanggal",
                    alignment: "right",
                    dataField: "tgl_inv_pib",
                    dataType: "date",
                    format: "dd-MM-yyyy"
                }, {
                    caption: "Valuta",
                    alignment: "center",
                    dataField: "val_inv_pib",
                    width: 64
                }, {
                    caption: "Nilai",
                    alignment: "right",
                    dataField: "nilai_inv_pib",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                }, {
                    caption: "Nilai USD",
                    alignment: "right",
                    dataField: "nilai_inv_usd_pib",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                }
            ]
        },
        {
            caption: "Status",
            alignment: "center",
            columns: [
                {
                    caption: "Flag SDA",
                    alignment: "left",
                    dataField: "flag_sda_pib",
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
                    caption: "Selesai PPI",
                    alignment: "left",
                    dataField: "status_selesai_pib",
                    lookup: {
                        dataSource: new DevExpress.data.CustomStore({
                            key: "kosta",
                            load: function () {
                                return $.getJSON(routeApi + "Netting/ComboStatusPebPib?Type=20&NeedOutstanding=true");
                            }
                        }),
                        displayExpr: "nama",
                        valueExpr: "kosta"
                    }
                }
            ]
        }
    ]; 

    $("#gridContainerPIB").dxDataGrid({
        dataSource: [],
        keyExpr: "id_pel_pib",
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnAutoWidth: true,
        showBorders: true,
        pager: {
            allowedPageSizes: [5, 10, 20],
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
        columns: pibCols,
        onSelectionChanged: function (selectedItems) {
            var selectedArray = selectedItems.selectedRowsData;

            if (selectedArray.length > 0) {
                $("#btnProsesPIB").show();
            } else {
                $("#btnProsesPIB").hide();
            }
            selectedItems.component.refresh();
        },
        summary: {
            totalItems: [
                {
                    column: "tanggal_invoice_pib",
                    showInColumn: "tanggal_invoice_pib",
                    displayFormat: "TOTAL TERPILIH"
                },
                {
                    name: "SelectedTotalInvoicePIB",
                    showInColumn: "nilai_invoice_pib",
                    displayFormat: "{0}",
                    valueFormat: { type: "fixedPoint", precision: 2 },
                    summaryType: "custom"
                }
            ],
            calculateCustomSummary: function (pibSelect) {
                if (pibSelect.name === "SelectedTotalInvoicePIB") {
                    if (pibSelect.summaryProcess === "start") {
                        pibSelect.totalValue = 0;
                    }
                    if (pibSelect.summaryProcess === "calculate") {
                        if (pibSelect.component.isRowSelected(pibSelect.value.id_pel_pib)) {
                            pibSelect.totalValue += pibSelect.value.nilai_invoice_pib;
                        }
                    }
                }
            }
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

    $("#CmbStatusSelesaiPIB").dxSelectBox({
        dataSource: routeApi + "Netting/ComboStatusPebPib?Type=20&NeedOutstanding=true",
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

    $("#txtPerPIB2").dxDateBox({
        type: "date",
        value: LastTwoYear,
        //max: new Date(),
        min: new Date(1900, 0, 1),
        displayFormat: "dd-MM-yyyy",
        placeholder: "dd-MM-yyyy",
        showClearButton: false,
        useMaskBehavior: true
    });

    $("#txtSampaiPIB2").dxDateBox({
        type: "date",
        value: Today,
        //max: new Date(),
        min: new Date(1900, 0, 1),
        displayFormat: "dd-MM-yyyy",
        placeholder: "dd-MM-yyyy",
        showClearButton: false,
        useMaskBehavior: true
    });

    $("#btnSearchPIB").dxButton({
        icon: "search",
        text: "Cari Data",
        type: "default",
        stylingMode: "outlined",
        onClick: function (e) {
            e.component.option("disabled", true);
            e.component.option("text", "Mencari Data...");
            e.component.option("icon", "fas fa-spin fa-spinner");
            $("#btnResetPIB").dxButton("instance").option("disabled", true);
            sendRequestPib(routeApi + "Invoice/PibOutstanding", "GET");
        }
    });

    //$("#btnSearchPIB").dxButton({
    //    text: "Cari Data",
    //    width: 120,
    //    type: "default",
    //    onClick: function (s, e) {
    //        sendRequestPib(routeApi + "Invoice/PibOutstanding", "GET");
    //    }
    //});

    $("#btnResetPIB").dxButton({
        icon: "revert",
        text: "Reset",
        type: "danger",
        stylingMode: "outlined",
        disabled: true,
        onClick: e => {
            e.component.option("disabled", true);
            doResetForm();
        }
    });

    //$("#btnResetPIB").dxButton({
    //    text: "Reset",
    //    width: 120,
    //    type: "default",
    //    onClick: function (e) {
    //        doResetForm();
    //    }
    //});

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
        displayExpr: function (item) { return !item ? "" : item.KD_KANTOR + " - " + item.NM_KANTOR; },
        searchMode: 'contains',
        searchTimeout: 10,
        minSearchLength: 0,
        showClearButton: true,
        showSpinButtons: true,
        placeholder: "Input Kode atau Nama Kantor untuk Mencari"
    });

    function getDisplayExpr(item) {
        if (!item) {
            return "";
        }

        return item.KD_KANTOR + "-" + item.NM_KANTOR;
    }

    function doResetForm(){
        $("#txtNoPIB").dxTextBox('instance').option('value', '');
        $("#txtSanKPBC").dxSelectBox('instance').option('value', null);
        $("#txtFlagSDA").dxSelectBox('instance').option('value', '');
        $("#txtNoInvoice").dxTextBox('instance').option('value', '');
        $("#txtSampaiPIB2").dxDateBox('instance').option('value', Today);
        $("#txtPerPIB2").dxDateBox('instance').option('value', LastTwoYear);
        $("#CmbStatusSelesaiPIB").dxSelectBox('instance').option('value', null);
        $("#CmbStatusJatuhTempoPIB").dxSelectBox('instance').option('value', '');
        $("#gridContainerPIB").dxDataGrid("instance").option("dataSource", []);
        $("#btnSearchPIB").dxButton("instance").option("text", "Cari Data");
    }

    $("#txtNoInvoice").dxTextBox({
        placeholder: "Masukkan  Nomor Invoice..."
    });

    $("#cancelPIB").dxButton({
        icon: "far fa-times-circle",
        text: "Batalkan",
        type: "danger",
        stylingMode: "outlined",
        onClick: function (e) {
            $('#nav-InvoiceImpor-tab').click();
        }
    });

    $("#btnProsesPIB").dxButton({
        icon: "far fa-check-circle",
        text: "Proses Data Terpilih",
        type: "default",
        stylingMode: "outlined",
        onClick: function (e) {
            $("#cancelPIB").dxButton("instance").option("disabled", true);
            e.component.option("disabled", true);
            e.component.option("text", "Proses Data...");
            e.component.option("icon", "fas fa-spin fa-spinner");
            insertPibOnDuty();
        }
    });

    function insertPibOnDuty() {

        if (ViewOnly) {
            toast_notify("Anda tidak memiliki wewenang untuk menambahkan data", "warning", 5000);
            return
        }

        var formData = new FormData();
        var datas = {}; 
        var url = routeApi + "Invoice/SaveSelected";
        var selectedRowKeys = $("#gridContainerPIB").dxDataGrid("instance").getSelectedRowKeys();
        datas["json_val"] = selectedRowKeys.toString();
        datas["modul"] = 'pib';
        datas["tipe"] = 'impor';
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

            $("#cancelPIB").dxButton({
                disabled: false
            });

            $("#btnProsesPIB").dxButton({
                icon: "far fa-check-circle",
                text: "Proses Data Terpilih",
                disabled: false
            });

            if (sta === "1") {
                doResetForm();
                DevExpress.ui.notify(result[0].msg_value.toString(), "success");
                setTimeout(function () {
                    $("#gridInvImpPIB").dxDataGrid("instance").refresh();
                    $("#gridPIBxOutgoing").dxDataGrid("instance").refresh();
                    $('#nav-InvoiceImpor-tab').click();
                }, 500);
            } else {
                DevExpress.ui.notify(result[0].msg_value.toString(), "warning");
            }
        });
    }

    $('#nav-InvImpPIB-tab').click(function () {
        $('#nav-InvoiceImpor-tab').click();
        $("#gridContainerPIB").dxDataGrid("instance").option("dataSource", []);
        $("#btnSearchPIB").dxButton({ text: "Cari Data", width: '120x' });
    });

    function sendRequestPib(urlpib, method) {
        var kpbc = $("#txtSanKPBC").dxSelectBox("instance").option("value");
        //var startDate = $("#txtPerPIB2").dxDateBox("instance").option("text");
        //var endDate = $("#txtSampaiPIB2").dxDateBox("instance").option("text");
        var statusSelesai = $("#CmbStatusSelesaiPIB").dxSelectBox("instance").option("value");
        var isJatuhTempo = $("#CmbStatusJatuhTempoPIB").dxSelectBox("instance").option("value");
        var noPib = $("#txtNoPIB").dxTextBox("instance").option("value");
        var noInvoice = $("#txtNoInvoice").dxTextBox("instance").option("value");
        var isSda = $("#txtFlagSDA").dxSelectBox("instance").option("value");

        var startOpt = $("#txtPerPIB2").dxDateBox("instance").option();
        var startDate = startOpt.displayFormat === "dd-MM-yyyy" ? startOpt.text.split("-").reverse().join("-") : startOpt.text;
        var endOpt = $("#txtSampaiPIB2").dxDateBox("instance").option();
        var endDate = endOpt.displayFormat === "dd-MM-yyyy" ? endOpt.text.split("-").reverse().join("-") : endOpt.text;

        if (startDate === "") {
            DevExpress.ui.notify("Tanggal awal kosong", "warning");
            return;
        }

        if (endDate === "") {
            DevExpress.ui.notify("Tanggal akhir kosong", "warning");
            return;
        }

        if (startDate > endDate) {
            DevExpress.ui.notify("Tanggal awal lebih besar dari tanggal akhir", "warning");
            return;
        }

        urlpib = urlpib + "?kpbc=" + (kpbc === null ? "" : kpbc) +
            "&startDate=" + startDate +
            "&endDate=" + endDate +
            "&statusSelesai=" + (statusSelesai === null ? "" : statusSelesai) +
            "&isJatuhTempo=" + isJatuhTempo +
            "&noPib=" + noPib +
            "&noInv=" + noInvoice +
            "&isSDA=" + isSda;

        $.ajax({
            url: urlpib,
            type: method,
            contentType: 'application/json; charset=utf-8',
            success: function (d) {
                $("#gridContainerPIB").show().dxDataGrid({
                    dataSource: d
                });
                $("#btnSearchPIB").dxButton({
                    icon: "search",
                    text: "Ubah Pencarian Data",
                    disabled: false
                });
                $("#btnResetPIB").dxButton({ disabled: false });
            }
        });
    }
});