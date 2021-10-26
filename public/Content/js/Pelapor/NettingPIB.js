$(function () {
    var L2y = new Date().getFullYear() - 2;
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
        //columnChooser: {
        //    enabled: true,
        //    mode: "select",
        //    title: "Pemilah Kolom"
        //},
        columns: pibCols,
        onSelectionChanged: function (selectedItems) {
            if (selectedItems.selectedRowsData.length > 0) $("#okePIB").show();
            else $("#okePIB").hide();

            /* Requested By User
            var selectedArray = selectedItems.selectedRowsData;
            var msg = (function () {
                for (var i = 0; i < selectedArray.length; i++) {
                    if (selectedArray[0].valuta_inv_pib !== selectedArray[i].valuta_inv_pib) {
                        return "Valuta Invoice Tidak Sama";
                    }
                }
                return "OK";
            })();

            if (msg === "OK" && selectedArray.length > 0) {
                $("#okePIB").show();
            } else if (msg === "OK" && selectedArray.length === 0) {
                $("#okePIB").hide();
            } else {
                $("#okePIB").hide();
                toast_notify(msg, "warning", 2000);
                selectedItems.component.deselectRows(selectedItems.currentSelectedRowKeys);
            }
            */
            selectedItems.component.refresh();
        },
        summary: {
            totalItems: [
                {
                    column: "tanggal_inv_pib",
                    showInColumn: "tanggal_inv_pib",
                    displayFormat: "Total Terpilih"
                },
                {
                    name: "SelectedTotalInvoicePIB",
                    showInColumn: "nilai_inv_pib",
                    displayFormat: "{0}",
                    valueFormat: { type: "fixedPoint", precision: 2 },
                    summaryType: "custom"
                },
                {
                    name: "SelectedTotalInvoicePIBinUSD",
                    showInColumn: "nilai_inv_usd_pib",
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
                            pibSelect.totalValue += pibSelect.value.nilai_inv_pib;
                        }
                    }
                }
                if (pibSelect.name === "SelectedTotalInvoicePIBinUSD") {
                    if (pibSelect.summaryProcess === "start") {
                        pibSelect.totalValue = 0;
                    }
                    if (pibSelect.summaryProcess === "calculate") {
                        if (pibSelect.component.isRowSelected(pibSelect.value.id_pel_pib)) {
                            pibSelect.totalValue += pibSelect.value.nilai_inv_usd_pib;
                        }
                    }
                }
            }
        }
    });

    $("#cmbSanKPBC_pib").dxSelectBox({
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

    $("#dateStart_pib").dxDateBox({
        type: "date",
        //max: new Date(),
        //min: new Date(L2y, 0, 1),
        displayFormat: "dd-MM-yyyy",
        placeholder: "Awal",
        useMaskBehavior: true,
        value: new Date(L2y, 0, 1)
    });

    $("#dateEnd_pib").dxDateBox({
        type: "date",
        //max: new Date(),
        //min: new Date(L2y, 0, 1),
        displayFormat: "dd-MM-yyyy",
        placeholder: "Akhir",
        useMaskBehavior: true,
        value: new Date()
    });

    $("#cmbStatusSelesai_pib").dxSelectBox({
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

    $("#cmbStatusJatuhTempo_pib").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "0", text: "Belum Jatuh Tempo" },
            { id: "1", text: "Sudah Jatuh Tempo" }
        ],
        displayExpr: 'text',
        valueExpr: 'id',
        value: ""
    });

    $("#txtNoPIB").dxTextBox({
        type: "text",
        showClearButton: true,
        placeholder: "Masukkan Nomor PPI"
    });

    $("#txtNoInvoice_pib").dxTextBox({
        type: "text",
        showClearButton: true,
        placeholder: "Masukkan Nomor Invoice"
    });

    $("#txtFlagSDA_pib").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "0", text: "Non SDA" },
            { id: "1", text: "SDA" }
        ],
        displayExpr: 'text',
        valueExpr: 'id',
        value: ""
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
            sendRequestPib(routeApi + "Netting/DataPibOutstanding", "GET");
        }
    });

    $("#btnResetPIB").dxButton({
        icon: "revert",
        text: "Reset",
        type: "danger",
        stylingMode: "outlined",
        disabled: true,
        onClick: e => {
            $("#cmbSanKPBC_pib").dxSelectBox("instance").reset();
            $("#dateStart_pib").dxDateBox("instance").option("value", L2y);
            $("#dateEnd_pib").dxDateBox("instance").option("value", new Date);
            $("#cmbStatusSelesai_pib").dxSelectBox("instance").reset();
            $("#cmbStatusJatuhTempo_pib").dxSelectBox("instance").option("value", "");
            $("#txtNoPIB").dxTextBox("instance").reset();
            $("#txtNoInvoice_pib").dxTextBox("instance").reset();
            $("#txtFlagSDA_pib").dxSelectBox("instance").option("value", "");
            $("#gridContainerPIB").dxDataGrid("instance").option("dataSource", []);
            e.component.option("disabled", true);
            $("#btnSearchPIB").dxButton("instance").option("text", "Cari Data");
        }
    });

    $("#cancelPIB").click(function (e) {
        $('#nav-Netting-tab').click();
    });

    $("#okePIB").click(function (e) {
        $("#okePIB").attr("disabled", true);
        $("#okePIB>i").removeClass().addClass("spinner-border spinner-border-sm");

        if (viewOnly) {
            toast_notify("Anda tidak memiliki wewenang untuk memproses data terpilih", "warning", 5000);
            setTimeout(function () {
                $("#okePIB").attr("disabled", false);
                $("#okePIB>i").removeClass().addClass("far fa-check-circle");
                $("#okePIB").attr("disabled", false);
            }, 500);
        } else {
            SaveSelectedPIB();
        }
        /**Requested By User
        var msg = ceKurs();
        if (msg !== "OK") {
            toast_notify("Valuta Invoice data tidak sama dengan PEB terpilih", "error", 2000);
            setTimeout(function () {
                $("#okePIB").attr("disabled", false);
                $("#okePIB>i").removeClass().addClass("far fa-check-circle");
                $("#okePIB").attr("disabled", false);
            }, 500);
        } else {
            SaveSelectedPIB();
        }
        */
    });

    $('#nav-NettingPib-tab').click(function () {
        $("#gridContainerPIB").dxDataGrid("instance").option("dataSource", []);
        $("#btnSearchPIB").dxButton({ text: "Cari Data" });
    });

    function sendRequestPib(url, method) {
        var kpbc = $("#cmbSanKPBC_pib").dxSelectBox("instance").option("value");
        var startOpt = $("#dateStart_pib").dxDateBox("instance").option();
        var startDate = startOpt.displayFormat === "dd-MM-yyyy" ? startOpt.text.split("-").reverse().join("-") : startOpt.text;
        var endOpt = $("#dateEnd_pib").dxDateBox("instance").option();
        var endDate = endOpt.displayFormat === "dd-MM-yyyy" ? endOpt.text.split("-").reverse().join("-") : endOpt.text;
        var statusSelesai = $("#cmbStatusSelesai_pib").dxSelectBox("instance").option("value");
        var isJatuhTempo = $("#cmbStatusJatuhTempo_pib").dxSelectBox("instance").option("value");
        var noPib = $("#txtNoPIB").dxTextBox("instance").option("value");
        var noInvoice = $("#txtNoInvoice_pib").dxTextBox("instance").option("value");
        var isSda = $("#txtFlagSDA_pib").dxSelectBox("instance").option("value");

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
                    text: "Ubah Pencarian Data",
                    disabled: false
                });
                $("#btnResetPIB").dxButton({ disabled: false });
            }
        });
    }

    function SaveSelectedPIB() {
        var datas = {};
        var url = routeApi + "Netting/SaveSelectedPib";
        var pibJSon = "";
        $("#gridContainerPIB").dxDataGrid("instance").getSelectedRowsData().forEach(function (val, ix) {
            pibJSon = pibJSon + '{"id_pel_pib":' + val.id_pel_pib + ',"nilai_inv_pib":' + val.nilai_inv_pib + ',"id_netting":' + netId +' },';
        });
        pibJSon = "[" + pibJSon.substring(0, pibJSon.length - 1) + "]";
        datas["json_pib"] = pibJSon;

        var formData = new FormData();
        formData.append("data", JSON.stringify(datas));
        $.ajax(url, {
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            cache: false
        }).done(function (result) {
            var msg = result[0].msg_pib;
            if (msg === "OK") {
                toast_notify("Data Berhasil Disimpan", "success");
                setTimeout(function () {
                    $("#okePIB").attr("disabled", false);
                    $("#okePIB>i").removeClass().addClass("far fa-check-circle");
                    $("#gridNettingPib").dxDataGrid("instance").refresh();
                    $('#nav-Netting-tab').click();
                    $("#okePIB").attr("disabled", false);
                }, 500);
            } else {
                toast_notify("Gagal Menyimpan Data", "warning");
                $("#okePIB>i").removeClass().addClass("far fa-check-circle");
                $("#okePIB").attr("disabled", false);
                $("#btnSearchPIB").click();
            }            
        });
    }

    function ceKurs() {
        var pibKurs = $("#gridContainerPIB").dxDataGrid("instance").getSelectedRowsData()[0].valuta_inv_pib;
        var pebKurs = $("#gridNettingPeb").dxDataGrid("instance").totalCount() > 0
            ? $("#gridNettingPeb").dxDataGrid("instance").getDataSource()._items[0].valuta_invoice_peb
            : pibKurs;

        if (pibKurs !== pebKurs) {
            return "Valuta Invoice data tidak sama dengan PPI terpilih";
        } else {
            return "OK";
        }
    }
});