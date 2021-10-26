$(function () {
    var L2y = new Date().getFullYear() - 2;
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
        //columnChooser: {
        //    enabled: true,
        //    mode: "select", 
        //    title: "Pemilah Kolom"
        //},
        columns: pebCols,
        onSelectionChanged: function (selectedItems) {
            if (selectedItems.selectedRowsData.length > 0) $("#okePEB").show();
            else $("#okePEB").hide();

            //var selectedArray = selectedItems.selectedRowsData;
            //for (var i = 0; i < selectedArray.length; i++) {
            //    if (selectedArray[0].valuta_inv_peb !== selectedArray[i].valuta_inv_peb) {
            //        $("#gridContainerPEB").dxDataGrid("columnOption", "nilai_fob_peb", "visible", false);
            //        $("#gridContainerPEB").dxDataGrid("columnOption", "nilai_inv_peb", "visible", false);
            //        break;
            //    } else {
            //        $("#gridContainerPEB").dxDataGrid("columnOption", "nilai_fob_peb", "visible", true);
            //        $("#gridContainerPEB").dxDataGrid("columnOption", "nilai_inv_peb", "visible", true);
            //    }
            //}

            /* Requested By User
            var selectedArray = selectedItems.selectedRowsData;
            var msg = (function () {
                for (var i = 0; i < selectedArray.length; i++) {
                    if (selectedArray[0].valuta_inv_peb !== selectedArray[i].valuta_inv_peb) {
                        return "Valuta Invoice Tidak Sama";
                    }
                }
                return "OK";
            })();
            
            if (msg === "OK" && selectedArray.length > 0) {
                $("#okePEB").show();
            } else if (msg === "OK" && selectedArray.length === 0) {
                $("#okePEB").hide();
            } else {
                $("#okePEB").hide();
                toast_notify(msg, "warning", 2000);
                selectedItems.component.deselectRows(selectedItems.currentSelectedRowKeys);
            }
            */
            selectedItems.component.refresh();
        },
        summary: {
            totalItems: [
                {
                    column: "tanggal_inv_peb",
                    showInColumn: "tanggal_inv_peb",
                    displayFormat: "Total Terpilih"
                }, {
                    name: "SelectedTotalInvoicePEB",
                    showInColumn: "nilai_inv_peb",
                    displayFormat: "{0}",
                    valueFormat: { type: "fixedPoint", precision: 2 },
                    summaryType: "custom"
                }, {
                    name: "SelectedTotalInvoicePEBinUSD",
                    showInColumn: "nilai_inv_usd_peb",
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
                            pebSelect.totalValue += pebSelect.value.nilai_inv_peb;
                        }
                    }
                }
                if (pebSelect.name === "SelectedTotalInvoicePEBinUSD") {
                    if (pebSelect.summaryProcess === "start") {
                        pebSelect.totalValue = 0;
                    }
                    if (pebSelect.summaryProcess === "calculate") {
                        if (pebSelect.component.isRowSelected(pebSelect.value.id_pel_peb)) {
                            pebSelect.totalValue += pebSelect.value.nilai_inv_usd_peb;
                        }
                    }
                }
            }
        }
    });

    $("#cmbSanKPBC_peb").dxSelectBox({
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

    $("#dateStart_peb").dxDateBox({
        type: "date",
        //max: new Date(),
        //min: new Date(L2y, 0, 1),
        displayFormat: "dd-MM-yyyy",
        placeholder: "Awal",
        useMaskBehavior: true,
        value: new Date(L2y, 0, 1)
    });

    $("#dateEnd_peb").dxDateBox({
        type: "date",
        //max: new Date(),
        //min: new Date(L2y, 0, 1),
        displayFormat: "dd-MM-yyyy",
        placeholder: "Akhir",
        useMaskBehavior: true,
        value: new Date()
    });

    $("#cmbStatusSelesai_peb").dxSelectBox({
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

    $("#cmbStatusJatuhTempo_peb").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "0", text: "Belum Jatuh Tempo" },
            { id: "1", text: "Sudah Jatuh Tempo" }
        ],
        displayExpr: 'text',
        valueExpr: 'id',
        value: ""
    });

    $("#txtNoPEB").dxTextBox({
        type: "text",
        showClearButton: true,
        placeholder: "Masukkan Nomor PPE"
    });

    $("#txtNoInvoice_peb").dxTextBox({
        type: "text",
        showClearButton: true,
        placeholder: "Masukkan Nomor Invoice"
    });

    $("#txtFlagSDA_peb").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "0", text: "Non SDA" },
            { id: "1", text: "SDA" }
        ],
        displayExpr: 'text',
        valueExpr: 'id',
        value: ""
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
            sendRequestPeb(routeApi + "Netting/DataPebOutstanding", "GET");
        }
    });

    $("#btnResetPEB").dxButton({
        icon: "revert",
        text: "Reset",
        type: "danger",
        stylingMode: "outlined",
        disabled: true,
        onClick: e => {
            $("#cmbSanKPBC_peb").dxSelectBox("instance").reset();
            $("#dateStart_peb").dxDateBox("instance").option("value", L2y);
            $("#dateEnd_peb").dxDateBox("instance").option("value", new Date);
            $("#cmbStatusSelesai_peb").dxSelectBox("instance").reset();
            $("#cmbStatusJatuhTempo_peb").dxSelectBox("instance").option("value", "");
            $("#txtNoPEB").dxTextBox("instance").reset();
            $("#txtNoInvoice_peb").dxTextBox("instance").reset();
            $("#txtFlagSDA_peb").dxSelectBox("instance").option("value", "");
            $("#gridContainerPEB").dxDataGrid("instance").option("dataSource", []);
            e.component.option("disabled", true);
            $("#btnSearchPEB").dxButton("instance").option("text", "Cari Data");
        }
    });

    $("#cancelPEB").click(function (e) {
        $('#nav-Netting-tab').click();
    });

    $("#okePEB").click(function (e) {
        $("#okePEB").attr("disabled", true);
        $("#okePEB>i").removeClass().addClass("spinner-border spinner-border-sm");

        if (viewOnly) {
            toast_notify("Anda tidak memiliki wewenang untuk memproses data terpilih", "warning", 5000);
            setTimeout(function () {
                $("#okePEB").attr("disabled", false);
                $("#okePEB>i").removeClass().addClass("far fa-check-circle");
                $("#okePEB").attr("disabled", false);
            }, 500);
        } else {
            SaveSelectedPEB();
        }
        /**RequestedByUser
        var msg = ceKurs();
        if (msg !== "OK") {
            toast_notify("Valuta Invoice data tidak sama dengan peb terpilih", "error", 2000);
            setTimeout(function () {
                $("#okePEB").attr("disabled", false);
                $("#okePEB>i").removeClass().addClass("far fa-check-circle");
                $("#okePEB").attr("disabled", false);
            }, 500);
        } else {
            SaveSelectedPEB();
        }
        */
    });
    
    $('#nav-NettingPeb-tab').click(function () {
        $("#gridContainerPEB").dxDataGrid("instance").option("dataSource", []);
        $("#btnSearchPEB").dxButton({ text: "Cari Data" });
    });

    function sendRequestPeb(url, method) {
        var kpbc = $("#cmbSanKPBC_peb").dxSelectBox("instance").option("value");
        var startOpt = $("#dateStart_peb").dxDateBox("instance").option();
        var startDate = startOpt.displayFormat === "dd-MM-yyyy" ? startOpt.text.split("-").reverse().join("-") : startOpt.text;
        var endOpt = $("#dateEnd_peb").dxDateBox("instance").option();
        var endDate = endOpt.displayFormat === "dd-MM-yyyy" ? endOpt.text.split("-").reverse().join("-") : endOpt.text;
        var statusSelesai = $("#cmbStatusSelesai_peb").dxSelectBox("instance").option("value");
        var isJatuhTempo = $("#cmbStatusJatuhTempo_peb").dxSelectBox("instance").option("value");
        var noPeb = $("#txtNoPEB").dxTextBox("instance").option("value");
        var noInvoice = $("#txtNoInvoice_peb").dxTextBox("instance").option("value");
        var isSda = $("#txtFlagSDA_peb").dxSelectBox("instance").option("value");

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
                    text: "Ubah Pencarian Data",
                    disabled: false
                });
                $("#btnResetPEB").dxButton("instance").option("disabled", false);
            }
        });
    }

    function SaveSelectedPEB() {
        var datas = {};
        var url = routeApi + "Netting/SaveSelectedPeb";
        var pebJSon = "";
        $("#gridContainerPEB").dxDataGrid("instance").getSelectedRowsData().forEach(function (val, ix) {
            pebJSon = pebJSon + '{"id_pel_peb":' + val.id_pel_peb + ',"nilai_inv_peb":' + val.nilai_inv_peb + ',"id_netting":' + netId + '},';
        });
        pebJSon = "[" + pebJSon.substring(0, pebJSon.length - 1) + "]";
        datas["json_peb"] = pebJSon;

        var formData = new FormData();
        formData.append('data', JSON.stringify(datas));
        $.ajax(url, {
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            cache: false
        }).done(function (result) {
            var msg = result[0].msg_peb;
            if (msg === "OK") {
                toast_notify("Data Berhasil Disimpan", "success");
                setTimeout(function () {
                    $("#okePEB").attr("disabled", false);
                    $("#okePEB>i").removeClass().addClass("far fa-check-circle");
                    $("#gridNettingPeb").dxDataGrid("instance").refresh();
                    $('#nav-Netting-tab').click();
                    $("#okePEB").attr("disabled", false);
                }, 500);
            } else {
                toast_notify("Gagal Menyimpan Data", "warning");
                $("#okePEB>i").removeClass().addClass("far fa-check-circle");
                $("#okePEB").attr("disabled", false);
                $("#btnSearchPEB").click();
            }
        });
    }

    function ceKurs() {
        var pebKurs = $("#gridContainerPEB").dxDataGrid("instance").getSelectedRowsData()[0].valuta_inv_peb;
        var pibKurs = $("#gridNettingPib").dxDataGrid("instance").totalCount() > 0
            ? $("#gridNettingPib").dxDataGrid("instance").getDataSource()._items[0].valuta_invoice_pib
            : pebKurs;

        if (pebKurs !== pibKurs) {
            return "Valuta Invoice data tidak sama dengan PPE terpilih";
        } else {
            return "OK";
        }
    }
});