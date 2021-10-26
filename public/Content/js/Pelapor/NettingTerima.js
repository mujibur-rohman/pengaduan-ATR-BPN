$(function () {
    let L2y = new Date().getFullYear() - 2;

    $("#gridDataIncoming").dxDataGrid({
        dataSource: [],
        keyExpr: "id_pel_inc",
        columnAutoWidth: true,
        allowColumnResizing: true,
        showBorders: true,
        scrolling: { columnRenderingMode: "virtual1" },
        pager: {
            allowedPageSizes: [5, 10, 20],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: { pageSize: 10 },
        selection: { mode: "multiple" },
        wordWrapEnabled: true,
        columns: [
            {
                caption: "Netting Terima",
                alignment: "Center",
                columns: [
                    {
                        caption: "No. Rekening",
                        alignment: "left",
                        dataField: "no_rek_inc"
                    },
                    {
                        caption: "Tanggal Incoming",
                        alignment: "right",
                        dataField: "tanggal_inc",
                        dataType: "date",
                        format: "dd-MM-yyyy"
                    },
                    {
                        caption: "No. Document",
                        alignment: "left",
                        dataField: "no_doc_inc"
                    },
                    {
                        caption: "No. Referensi",
                        alignment: "left",
                        dataField: "no_ref_inc"
                    },
                    {
                        caption: "Valuta",
                        alignment: "center",
                        dataField: "valuta_inc"
                    },
                    {
                        caption: "Nilai Incoming",
                        alignment: "right",
                        dataField: "nilai_inc",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Nilai Incoming (USD)",
                        alignment: "right",
                        dataField: "nilai_usd_inc",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Alokasi Incoming",
                        alignment: "right",
                        dataField: "alokasi_inv_inc",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Alokasi Incoming (USD)",
                        alignment: "right",
                        dataField: "alokasi_inv_usd_inc",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Sisa Incoming",
                        alignment: "right",
                        dataField: "sisa_inc",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Sisa Incoming (USD)",
                        alignment: "right",
                        dataField: "sisa_usd_inc",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Nama Pengirim",
                        alignment: "left",
                        dataField: "nama_pengirim_inc"
                    },
                    {
                        caption: "Sumber Data",
                        alignment: "left",
                        dataField: "kd_sumber_rek_inc",
                        lookup: {
                            dataSource: [
                                { id: "", text: "Semua" },
                                { id: "1", text: "Swift" },
                                { id: "2", text: "Bank" }
                            ],
                            displayExpr: "text",
                            valueExpr: "id"
                        },
                        width: 85
                    },
                    {
                        caption: "Nama Bank",
                        alignment: "left",
                        dataField: "nama_bank_inc"
                    },
                    {
                        caption: "Kategori Rekening",
                        alignment: "left",
                        dataField: "kd_jenis_rek_inc",
                        lookup: {
                            dataSource: [
                                { id: "", text: "Semua" },
                                { id: "U", text: "Umum" },
                                { id: "K", text: "Khusus" }
                            ],
                            displayExpr: "text",
                            valueExpr: "id"
                        },
                        width: 85
                    }
                ]
            }
        ],
        onSelectionChanged: function (selectedItems) {
            var selectedArray = selectedItems.selectedRowsData;
            if (selectedArray.length > 0) $("#okeIncoming").show();
            else $("#okeIncoming").hide();
            /*RequestedBy: User Pelapor
            var msg = (function () {
                for (var i = 0; i < selectedArray.length; i++) {
                    if (selectedArray[0]["valuta_inc"] !== selectedArray[i]["valuta_inc"]) {
                        return "Valuta Invoice Tidak Sama";
                    }
                }
                return "OK";
            })();

            if (msg === "OK" && selectedArray.length > 0) {
                $("#okeIncoming").show();
            } else if (msg === "OK" && selectedArray.length === 0) {
                $("#okeIncomingPIB").hide();
            } else {
                $("#okeIncoming").hide();
                toast_notify(msg, "warning", 2000);
                selectedItems.component.deselectRows(selectedItems.currentSelectedRowKeys);
            }
            */
            selectedItems.component.refresh();
        },
        summary: {
            totalItems: [
                {
                    column: "no_ref_inc",
                    showInColumn: "no_ref_inc",
                    displayFormat: "Total Terpilih"
                },
                {
                    name: "SelectedSisaIncoming",
                    showInColumn: "sisa_inc",
                    displayFormat: "{0}",
                    valueFormat: { type: "fixedPoint", precision: 2 },
                    summaryType: "custom"
                },
                {
                    name: "SelectedSisaIncomingUSD",
                    showInColumn: "sisa_usd_inc",
                    displayFormat: "{0}",
                    valueFormat: { type: "fixedPoint", precision: 2 },
                    summaryType: "custom"
                }
            ],
            calculateCustomSummary: options => {
                if (options.name === "SelectedSisaIncoming") {
                    if (options.summaryProcess === "start") {
                        options.totalValue = 0;
                    }
                    if (options.summaryProcess === "calculate") {
                        if (options.component.isRowSelected(options.value.id_pel_inc)) {
                            options.totalValue += options.value.nilai_inc;
                        }
                    }
                }
                if (options.name === "SelectedSisaIncomingUSD") {
                    if (options.summaryProcess === "start") {
                        options.totalValue = 0;
                    }
                    if (options.summaryProcess === "calculate") {
                        if (options.component.isRowSelected(options.value.id_pel_inc)) {
                            options.totalValue += options.value.nilai_usd_inc;
                        }
                    }
                }
            }
        },
        onContentReady: function (content) {
            cekSetOff();
        },
    });

    $("#txtNoRek_inc").dxTextBox({
        type: "text",
        showClearButton: true,
        placeholder: "Masukkan Nomor Rekening"
    });

    $("#txtNoDoc_inc").dxTextBox({
        type: "text",
        showClearButton: true,
        placeholder: "Masukkan Nomor Dokumen"
    });

    $("#txtNoRef_inc").dxTextBox({
        type: "text",
        showClearButton: true,
        placeholder: "Masukkan Nomor Referensi"
    });

    $("#dateStart_inc").dxDateBox({
        type: "date",
        displayFormat: "dd-MM-yyyy",
        placeholder: "Awal",
        useMaskBehavior: true,
        value: new Date(L2y, 0, 1)
    });

    $("#dateEnd_inc").dxDateBox({
        type: "date",
        displayFormat: "dd-MM-yyyy",
        placeholder: "Akhir",
        useMaskBehavior: true,
        value: new Date()
    });

    $("#cmbSumberData_inc").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "1", text: "SWIFT" },
            { id: "2", text: "BANK" }
        ],
        displayExpr: "text",
        valueExpr: "id",
        value: ""
    });

    $("#cmbKategori_inc").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "U", text: "Umum" },
            { id: "K", text: "Khusus" }
        ],
        displayExpr: "text",
        valueExpr: "id",
        value: ""
    });
    
    $("#btnSearchInc").dxButton({
        icon: "search",
        text: "Cari Data",
        type: "default",
        stylingMode: "outlined",
        onClick: function (e) {
            e.component.option("disabled", true);
            e.component.option("text", "Mencari Data...");
            e.component.option("icon", "fas fa-spin fa-spinner");
            $("#btnResetInc").dxButton("instance").option("disabled", true);
            sendRequestTerima(routeApi + "Netting/DataIncoming", "GET");
        }
    });

    $("#btnResetInc").dxButton({
        icon: "revert",
        text: "Reset",
        type: "danger",
        stylingMode: "outlined",
        disabled: true,
        onClick: e => {
            $("#txtNoRek_inc").dxTextBox("instance").reset();
            //$("#txtNoDoc_inc").dxTextBox("instance").reset();
            //$("#txtNoRef_inc").dxTextBox("instance").reset();
            $("#dateStart_inc").dxDateBox("instance").option("value", L2y);
            $("#dateEnd_inc").dxDateBox("instance").option("value", new Date);
            $("#cmbSumberData_inc").dxSelectBox("instance").option("value", "");
            $("#cmbKategori_inc").dxSelectBox("instance").option("value", "");
            $("#gridDataIncoming").dxDataGrid("instance").option("dataSource", []);
            e.component.option("disabled", true);
            $("#btnSearchInc").dxButton("instance").option("text", "Cari Data");
        }
    });
    
    $("#nav-NettingIncoming-tab").click(function () {
        //$.ajax({
        //    url: routeApi + "Netting/DataIncoming",
        //    type: "GET",
        //    contentType: 'application/json; charset=utf-8',
        //    success: function (d) {
        //        $("#gridDataIncoming").dxDataGrid({
        //            dataSource: d
        //        });
        //    }
        //});
        if (getLocalStorage("setOff") !== "") $("#skipIncoming").hide();
        else $("#skipIncoming").show();
    });

    $("#cancelIncoming").click(function () {
        $("#nav-Netting-tab").click();
    });

    $("#skipIncoming").click(function () {
        $("#skipIncoming").attr("disabled", true);
        $("#skipIncoming>i").removeClass().addClass("spinner-border spinner-border-sm");

        var setOff = cekSetOff();

        if (setOff === "OK") {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk melakukan proses ini", "warning", 5000);
                $("#skipIncoming>i").removeClass().addClass("far fa-check-circle");
                $("#skipIncoming").attr("disabled", false);
            } else {
                setLocalStorage("setOff", setOff);
                window.location.reload();
            }
        }
        else {
            var confMes = "Apakah anda yakin ingin memproses transaksi ini ?";
            var confRes = DevExpress.ui.dialog.confirm(confMes, "Nilai Devisa Masih Kurang!");
            confRes.done(function (dialogResult) {
                if (dialogResult) {
                    if (viewOnly) {
                        toast_notify("Anda tidak memiliki wewenang untuk melakukan proses ini", "warning", 5000);
                        $("#skipIncoming>i").removeClass().addClass("far fa-check-circle");
                        $("#skipIncoming").attr("disabled", false);
                    } else {
                        setLocalStorage("setOff", setOff);
                        window.location.reload();
                    }
                } else {
                    $("#skipIncoming>i").removeClass().addClass("far fa-check-circle");
                    $("#skipIncoming").attr("disabled", false);
                }
            });
        }
    });

    $("#okeIncoming").click(function () {
        $("#okeIncoming").attr("disabled", true);
        $("#okeIncoming>i").removeClass().addClass("spinner-border spinner-border-sm");

        var msg = cekSetOff();
        if (msg === "OK") {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk memproses data terpilih", "warning", 5000);
                $("#okeIncoming>i").removeClass().addClass("far fa-check-circle");
                $("#okeIncoming").attr("disabled", false);
            } else {
                SaveSelectedIncoming(msg);
            }
        }
        else {
            var confMes = "Apakah anda yakin ingin memproses transaksi ini ?";
            var confRes = DevExpress.ui.dialog.confirm(confMes, "Nilai Devisa Masih Kurang!");
            confRes.done(function (dialogResult) {
                if (dialogResult) {
                    if (viewOnly) {
                        toast_notify("Anda tidak memiliki wewenang untuk memproses data terpilih", "warning", 5000);
                        $("#okeIncoming>i").removeClass().addClass("far fa-check-circle");
                        $("#okeIncoming").attr("disabled", false);
                    } else {
                        SaveSelectedIncoming(msg);
                    }
                } else {
                    $("#okeIncoming>i").removeClass().addClass("far fa-check-circle");
                    $("#okeIncoming").attr("disabled", false);
                }
            });
        }
    });

    function SaveSelectedIncoming(setOff) {
        var datas = {};
        var url = routeApi + "Netting/SaveSelectedIncoming";
        //var selectedRowKeys = $("#gridDataIncoming").dxDataGrid("instance").getSelectedRowKeys();
        //datas["json_inc"] = selectedRowKeys.toString();

        var incJSon = "";
        $("#gridDataIncoming").dxDataGrid("instance").getSelectedRowsData().forEach(function (val, ix) {
            incJSon = incJSon + '{"id_pel_inc":' + val.id_pel_inc + ',"id_netting":' + netId + '},';
        });
        incJSon = "[" + incJSon.substring(0, incJSon.length - 1) + "]";
        datas["json_inc"] = incJSon;

        var formData = new FormData();
        formData.append('data', JSON.stringify(datas));
        $.ajax(url, {
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            cache: false
        }).done(function (result) {
            var msg = result[0].msg_inc.toString();
            if (msg === "OK") {
                setLocalStorage("setOff", setOff);
                toast_notify("Data Berhasil Disimpan", "success");
                setTimeout(function () {
                    $("#okeIncoming>i").removeClass().addClass("far fa-check-circle");
                    $("#gridNettingIncoming").dxDataGrid("instance").refresh();
                    //$('#nav-Netting-tab').click();
                    window.location.reload();
                    $("#okeIncoming").attr("disabled", false);
                }, 500);
            } else {
                toast_notify("Gagal Menyimpan Data", "warning");
                $("#okeIncoming>i").removeClass().addClass("far fa-check-circle");
                $("#okeIncoming").attr("disabled", false);
                $("#nav-NettingIncoming-tab").click();
            }
        });
    }

    function cekSetOff() {
        var ttInc = $("#gridDataIncoming").dxDataGrid("instance").getTotalSummaryValue("SelectedSisaIncoming");
        var ttIncUSD = $("#gridDataIncoming").dxDataGrid("instance").getTotalSummaryValue("SelectedSisaIncomingUSD");
        var kuotaNetting = getLocalStorage("nettingKuota");
        var kuotaNettingUSD = getLocalStorage("nettingKuotaUSD");
        var selisih = (-kuotaNetting + ttInc).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var selisihUSD = (-kuotaNettingUSD + ttIncUSD).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var msg = "OK";

        $("#kuotaIncoming").text(selisih);
        $("#kuotaIncomingUSD").text(selisihUSD);
        if (kuotaNettingUSD > ttIncUSD) {
            $("#setOffIncoming").text("Devisa Kurang");
            msg = "minus";
        }
        else {
            $("#setOffIncoming").text("Devisa Sesuai");
        }
        return msg;
    }

    function sendRequestTerima(url, method) {
        var noRek = $("#txtNoRek_inc").dxTextBox("instance").option("value");
        //var noDoc = $("#txtNoDoc_inc").dxTextBox("instance").option("value");
        //var noRef = $("#txtNoRef_inc").dxTextBox("instance").option("value");
        var startOpt = $("#dateStart_inc").dxDateBox("instance").option();
        var startDate = startOpt.displayFormat === "dd-MM-yyyy" ? startOpt.text.split("-").reverse().join("-") : startOpt.text;
        var endOpt = $("#dateEnd_inc").dxDateBox("instance").option();
        var endDate = endOpt.displayFormat === "dd-MM-yyyy" ? endOpt.text.split("-").reverse().join("-") : endOpt.text;
        var sumberData = $("#cmbSumberData_inc").dxSelectBox("instance").option("value");
        var kategoriRek = $("#cmbKategori_inc").dxSelectBox("instance").option("value");

        url = url + "?startDate=" + startDate +
            "&endDate=" + endDate +
            "&jnsRek=" + kategoriRek +
            "&sumberData=" + sumberData +
            "&noRek=" + (noRek === null ? "" : noRek);

        $.ajax({
            url: url,
            type: method,
            contentType: 'application/json; charset=utf-8',
            success: function (d) {
                $("#gridDataIncoming").show().dxDataGrid({ dataSource: d });
                $("#btnSearchInc").dxButton({
                    icon: "search",
                    text: "Ubah Pencarian Data",
                    disabled: false
                });
                $("#btnResetInc").dxButton("instance").option("disabled", false);
            }
        });
    }

});