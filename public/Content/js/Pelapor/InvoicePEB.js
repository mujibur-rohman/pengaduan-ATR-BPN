$(function () {
    var Today = new Date();
    var Day = new Date();
    var LastTwoYear = Day.setFullYear(Day.getFullYear() - 2);
    var pebCols = [
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
                    dataField: "status_jth_tempo_peb",
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
            caption: "Data FOB",
            alignment: "center",
            columns: [
                {
                    caption: "Valuta",
                    alignment: "center",
                    dataField: "val_peb",
                    width: 64
                }, {
                    caption: "Nilai",
                    alignment: "right",
                    dataField: "nilai_peb",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                }, {
                    caption: "Nilai USD",
                    alignment: "right",
                    dataField: "nilai_usd_peb",
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
                    dataField: "no_inv_peb"
                }, {
                    caption: "Tanggal",
                    alignment: "right",
                    dataField: "tgl_inv_peb",
                    dataType: "date",
                    format: "dd-MM-yyyy"
                }, {
                    caption: "Valuta",
                    alignment: "center",
                    dataField: "val_inv_peb",
                    width: 64
                }, {
                    caption: "Nilai",
                    alignment: "right",
                    dataField: "nilai_inv_peb",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                }, {
                    caption: "Nilai USD",
                    alignment: "right",
                    dataField: "nilai_inv_usd_peb",
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
                                return $.getJSON(routeApi + "Netting/ComboStatusPebPib?Type=10&NeedOutstanding=true");
                            }
                        }),
                        displayExpr: "nama",
                        valueExpr: "kosta"
                    }
                }
            ]
        }
    ]; 

    $("#gridContainerPEB").dxDataGrid({
        dataSource: [],
        keyExpr: "id_pel_peb",
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnAutoWidth: true,
        showBorders: true,
        pager: {
            allowedPageSizes: [10, 20, 40],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: { pageSize: 10 },
        selection: { mode: "multiple" },
        scrolling: {
            useNative: true,
            columnRenderingMode: "virtual1",
            showScrollbar: "always"
        },
        groupPanel: {
            visible: true,
            emptyPanelText: "Geser kolom ke sini untuk mengelompokan data"
        },
        grouping: {
            autoExpandAll: false,
            expandMode: "rowClick"
        },
        columns: pebCols,
        onSelectionChanged: function (selectedItems) {
            var selectedArray = selectedItems.selectedRowsData;

            if (selectedArray.length > 0) {
                $("#btnProsesPEB").show();
            } else {
                $("#btnProsesPEB").hide();
            }
            selectedItems.component.refresh();
        },
        summary: {
            totalItems: [
                {
                    column: "tanggal_invoice_peb",
                    showInColumn: "tanggal_invoice_peb",
                    displayFormat: "TOTAL TERPILIH"
                },
                {
                    name: "SelectedTotalInvoicePEB",
                    showInColumn: "nilai_invoice_peb",
                    displayFormat: "{0}",
                    valueFormat: { type: "fixedPoint", precision: 2 },
                    summaryType: "custom"
                }
            ],
            calculateCustomSummary: function (pebSelect) {
                if (pebSelect.name === "SelectedTotalInvoicePEB") {
                    if (pebSelect.summaryProcess === "start") {
                        pebSelect.totalValue = 0;
                    }
                    if (pebSelect.summaryProcess === "calculate") {
                        if (pebSelect.component.isRowSelected(pebSelect.value.id_pel_peb)) {
                            pebSelect.totalValue += pebSelect.value.nilai_invoice_peb;
                        }
                    }
                }
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

    $("#CmbStatusSelesaiPEB").dxSelectBox({
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

    $("#txtPerPEB2").dxDateBox({
        type: "date",
        value: LastTwoYear,
        //max: new Date(),
        min: new Date(1900, 0, 1),
        displayFormat: "dd-MM-yyyy",
        placeholder: "dd-mm-yyyy",
        showClearButton: false,
        useMaskBehavior: true
    });

    $("#txtSampaiPEB2").dxDateBox({
        type: "date",
        value: Today,
        //max: new Date(),
        min: new Date(1900, 0, 1),
        displayFormat: "dd-MM-yyyy",
        placeholder: "dd-mm-yyyy",
        showClearButton: false,
        useMaskBehavior: true
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
            sendRequestPeb(routeApi + "Invoice/PebOutstanding", "GET");
        }
    });

    //$("#btnSearchPEB").dxButton({
    //    text: "Cari Data",
    //    width: 120,
    //    type: "default",
    //    onClick: function (s, e) {
    //        sendRequestPeb(routeApi + "Invoice/PebOutstanding", "GET");
    //    }
    //});

    $("#btnResetPEB").dxButton({
        icon: "revert",
        text: "Reset",
        type: "danger",
        stylingMode: "outlined",
        disabled: true,
        onClick: e => {
            e.component.option("disabled", true);
            doResetForm();

            //$("#cmbSanKPBC_peb").dxSelectBox("instance").reset();
            //$("#dateStart_peb").dxDateBox("instance").option("value", L2y);
            //$("#dateEnd_peb").dxDateBox("instance").option("value", new Date);
            //$("#cmbStatusSelesai_peb").dxSelectBox("instance").reset();
            //$("#cmbStatusJatuhTempo_peb").dxSelectBox("instance").option("value", "");
            //$("#txtNoPEB").dxTextBox("instance").reset();
            //$("#txtNoInvoice_peb").dxTextBox("instance").reset();
            //$("#txtFlagSDA_peb").dxSelectBox("instance").option("value", "");
            //$("#gridContainerPEB").dxDataGrid("instance").option("dataSource", []);
            //e.component.option("disabled", true);
            //$("#btnSearchPEB").dxButton("instance").option("text", "Cari Data");
        }
    });

    //$("#btnResetPEB").dxButton({
    //    text: "Reset",
    //    width: 120,
    //    type: "default",
    //    onClick: function (e) {
    //        doResetForm();
    //    }
    //});

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
        displayExpr: function (item) { return !item ? "" : item.KD_KANTOR + " - " + item.NM_KANTOR; },
        searchMode: 'contains',
        searchTimeout: 10,
        minSearchLength: 0,
        showClearButton: true,
        showSpinButtons: true,
        placeholder: "Ketik kode atau nama kantor untuk mencari"
    });

    function getDisplayExpr(item) {
        if (!item) {
            return "";
        }

        return item.KD_KANTOR + "-" + item.NM_KANTOR;
    }

    function doResetForm(){
        $("#txtNoPEB").dxTextBox('instance').option('value', '');
        $("#txtSanKPBC").dxSelectBox('instance').option('value', null);
        $("#txtFlagSDA").dxSelectBox('instance').option('value', '');
        $("#txtNoInvoice").dxTextBox('instance').option('value', '');
        $("#txtSampaiPEB2").dxDateBox('instance').option('value', Today);
        $("#txtPerPEB2").dxDateBox('instance').option('value', LastTwoYear);
        $("#CmbStatusSelesaiPEB").dxSelectBox('instance').option('value', null);
        $("#CmbStatusJatuhTempoPEB").dxSelectBox('instance').option('value', '');
        $("#gridContainerPEB").dxDataGrid("instance").option("dataSource", []);
        $("#btnSearchPEB").dxButton("instance").option("text", "Cari Data");
    }

    $("#txtNoInvoice").dxTextBox({
        placeholder: "Masukkan  Nomor Invoice..."
    });

    $("#cancelPEB").dxButton({
        icon: "far fa-times-circle",
        text: "Batalkan",
        type: "danger",
        stylingMode: "outlined",
        onClick: function (e) {
            $('#nav-InvoiceEkspor-tab').click();
        }
    });

    $("#btnProsesPEB").dxButton({
        icon: "far fa-check-circle",
        text: "Proses Data Terpilih",
        type: "default",
        stylingMode: "outlined",
        onClick: function (e) {
            $("#cancelPEB").dxButton("instance").option("disabled", true);
            e.component.option("disabled", true);
            e.component.option("text", "Proses Data...");
            e.component.option("icon", "fas fa-spin fa-spinner");
            insertPebOnDuty();
        }
    });

    function insertPebOnDuty() {

        if (ViewOnly) {
            toast_notify("Anda tidak memiliki wewenang untuk menambahkan data", "warning", 5000);
            return
        }

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

            $("#cancelPEB").dxButton({
                disabled: false
            });

            $("#btnProsesPEB").dxButton({
                icon: "far fa-check-circle",
                text: "Proses Data Terpilih",
                disabled: false
            });

            if (sta === "1") {
                doResetForm();
                DevExpress.ui.notify(result[0].msg_value.toString(), "success");
                setTimeout(function () {
                    $("#gridInvEksPEB").dxDataGrid("instance").refresh();
                    $("#gridPEBxIncoming").dxDataGrid("instance").refresh();
                    $('#nav-InvoiceEkspor-tab').click();
                }, 500);
            } else {
                DevExpress.ui.notify(result[0].msg_value.toString(), "warning");
            }
        });
    }

    $('#nav-InvEksPEB-tab').click(function () {
        $("#gridContainerPEB").dxDataGrid("instance").option("dataSource", []);
        $("#btnSearchPEB").dxButton({ text: "Cari Data", width: '120x'});
    });

    function sendRequestPeb(urlpeb, method) {
        var kpbc = $("#txtSanKPBC").dxSelectBox("instance").option("value");
        //var startDate = $("#txtPerPEB2").dxDateBox("instance").option("text");
        //var endDate = $("#txtSampaiPEB2").dxDateBox("instance").option("text");
        var statusSelesai = $("#CmbStatusSelesaiPEB").dxSelectBox("instance").option("value");
        var isJatuhTempo = $("#CmbStatusJatuhTempoPEB").dxSelectBox("instance").option("value");
        var noPeb = $("#txtNoPEB").dxTextBox("instance").option("value");
        var noInvoice = $("#txtNoInvoice").dxTextBox("instance").option("value");
        var isSda = $("#txtFlagSDA").dxSelectBox("instance").option("value");

        var startOpt = $("#txtPerPEB2").dxDateBox("instance").option();
        var startDate = startOpt.displayFormat === "dd-MM-yyyy" ? startOpt.text.split("-").reverse().join("-") : startOpt.text;
        var endOpt = $("#txtSampaiPEB2").dxDateBox("instance").option();
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

        urlpeb = urlpeb + "?kpbc=" + (kpbc === null ? "" : kpbc) +
            "&startDate=" + startDate +
            "&endDate=" + endDate +
            "&statusSelesai=" + (statusSelesai === null ? "" : statusSelesai) +
            "&isJatuhTempo=" + isJatuhTempo +
            "&noPeb=" + noPeb +
            "&noInv=" + noInvoice +
            "&isSDA=" + isSda;

        $.ajax({
            url: urlpeb,
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