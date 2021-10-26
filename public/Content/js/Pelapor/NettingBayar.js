$(function () {
    let L2y = new Date().getFullYear() - 2;

    $("#gridDataOutgoing").dxDataGrid({
        dataSource: [],
        keyExpr: "id_pel_out",
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
                caption: "Netting Bayar",
                alignment: "Center",
                columns: [
                    {
                        caption: "No. Rekening",
                        alignment: "left",
                        dataField: "no_rek_out"
                    },
                    {
                        caption: "Tanggal Outgoing",
                        alignment: "right",
                        dataField: "tanggal_out",
                        dataType: "date",
                        format: "dd-MM-yyyy"
                    },
                    {
                        caption: "No. Dokumen",
                        alignment: "left",
                        dataField: "no_doc_out"
                    },
                    {
                        caption: "No. Referensi",
                        alignment: "left",
                        dataField: "no_ref_out"
                    },
                    {
                        caption: "Valuta",
                        alignment: "center",
                        dataField: "valuta_out"
                    },
                    {
                        caption: "Nilai Outgoing",
                        alignment: "right",
                        dataField: "nilai_out",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Nilai Outgoing (USD)",
                        alignment: "right",
                        dataField: "nilai_usd_out",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Alokasi Outgoing",
                        alignment: "right",
                        dataField: "alokasi_inv_out",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Alokasi Outgoing (USD)",
                        alignment: "right",
                        dataField: "alokasi_inv_usd_out",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Sisa Outgoing",
                        alignment: "right",
                        dataField: "sisa_out",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Sisa Outgoing (USD)",
                        alignment: "right",
                        dataField: "sisa_usd_out",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Nama Penerima",
                        alignment: "left",
                        dataField: "nama_penerima_out"
                    },
                    {
                        caption: "Sumber Data",
                        alignment: "left",
                        dataField: "kd_sumber_rek_out",
                        lookup: {
                            dataSource: [
                                { id: "", text: "Semua" },
                                { id: "1", text: "Swift" },
                                { id: "2", text: "Bank" }
                            ],
                            displayExpr: 'text',
                            valueExpr: 'id'
                        },
                        width: 85
                    },
                    {
                        caption: "Nama Bank",
                        alignment: "left",
                        dataField: "nama_bank_out"
                    },
                    {
                        caption: "Kategori Rekening",
                        alignment: "left",
                        dataField: "kd_jenis_rek_out",
                        lookup: {
                            dataSource: [
                                { id: "", text: "Semua" },
                                { id: "U", text: "Umum" },
                                { id: "K", text: "Khusus" }
                            ],
                            displayExpr: 'text',
                            valueExpr: 'id'
                        },
                        width: 85
                    }
                ]
            }
        ],
        onSelectionChanged: function (selectedItems) {
            var selectedArray = selectedItems.selectedRowsData;
            if (selectedArray.length > 0) $("#okeOutgoing").show();
            else $("#okeOutgoing").hide();
            /*RequestedBy: User Pelapor
            var msg = (function () {
                for (var i = 0; i < selectedArray.length; i++) {
                    if (selectedArray[0]["valuta_out"] !== selectedArray[i]["valuta_out"]) {
                        return "Valuta Invoice Tidak Sama";
                    }
                }
                return "OK";
            })();

            if (msg === "OK" && selectedArray.length > 0) {
                $("#okeOutgoing").show();
            } else if (msg === "OK" && selectedArray.length === 0) {
                $("#okePokeOutgoingIB").hide();
            } else {
                $("#okeOutgoing").hide();
                toast_notify(msg, "warning", 2000);
                selectedItems.component.deselectRows(selectedItems.currentSelectedRowKeys);
            }
            */
            selectedItems.component.refresh();
        },
        summary: {
            totalItems: [
                {
                    column: "no_ref_out",
                    showInColumn: "no_ref_out",
                    displayFormat: "Total Terpilih"
                },
                {
                    name: "SelectedSisaOutgoing",
                    showInColumn: "sisa_out",
                    displayFormat: "{0}",
                    valueFormat: { type: "fixedPoint", precision: 2 },
                    summaryType: "custom"
                },
                {
                    name: "SelectedSisaOutgoingUSD",
                    showInColumn: "sisa_usd_out",
                    displayFormat: "{0}",
                    valueFormat: { type: "fixedPoint", precision: 2 },
                    summaryType: "custom"
                }
            ],
            calculateCustomSummary: options => {
                if (options.name === "SelectedSisaOutgoing") {
                    if (options.summaryProcess === "start") {
                        options.totalValue = 0;
                    }
                    if (options.summaryProcess === "calculate") {
                        if (options.component.isRowSelected(options.value.id_pel_out)) {
                            options.totalValue += options.value.nilai_out;
                        }
                    }
                }
                if (options.name === "SelectedSisaOutgoingUSD") {
                    if (options.summaryProcess === "start") {
                        options.totalValue = 0;
                    }
                    if (options.summaryProcess === "calculate") {
                        if (options.component.isRowSelected(options.value.id_pel_out)) {
                            options.totalValue += options.value.nilai_usd_out;
                        }
                    }
                }
            }
        },
        onContentReady: function (content) {
            cekSetOff();
        },
    });

    $("#txtNoRek_out").dxTextBox({
        type: "text",
        showClearButton: true,
        placeholder: "Masukkan Nomor Rekening"
    });

    $("#txtNoDoc_out").dxTextBox({
        type: "text",
        showClearButton: true,
        placeholder: "Masukkan Nomor Dokumen"
    });

    $("#txtNoRef_out").dxTextBox({
        type: "text",
        showClearButton: true,
        placeholder: "Masukkan Nomor Referensi"
    });

    $("#dateStart_out").dxDateBox({
        type: "date",
        displayFormat: "dd-MM-yyyy",
        placeholder: "Awal",
        useMaskBehavior: true,
        value: new Date(L2y, 0, 1)
    });

    $("#dateEnd_out").dxDateBox({
        type: "date",
        displayFormat: "dd-MM-yyyy",
        placeholder: "Akhir",
        useMaskBehavior: true,
        value: new Date()
    });

    $("#cmbSumberData_out").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "1", text: "Swift" },
            { id: "2", text: "Bank" }
        ],
        displayExpr: "text",
        valueExpr: "id",
        value: ""
    });

    $("#cmbKategori_out").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "U", text: "Umum" },
            { id: "K", text: "Khusus" }
        ],
        displayExpr: "text",
        valueExpr: "id",
        value: ""
    });

    $("#btnSearchOut").dxButton({
        icon: "search",
        text: "Cari Data",
        type: "default",
        stylingMode: "outlined",
        onClick: function (e) {
            e.component.option("disabled", true);
            e.component.option("text", "Mencari Data...");
            e.component.option("icon", "fas fa-spin fa-spinner");
            $("#btnResetOut").dxButton("instance").option("disabled", true);
            sendRequestBayar(routeApi + "Netting/DataOutgoing", "GET");
        }
    });

    $("#btnResetOut").dxButton({
        icon: "revert",
        text: "Reset",
        type: "danger",
        stylingMode: "outlined",
        disabled: true,
        onClick: e => {
            $("#txtNoRek_out").dxTextBox("instance").reset();
            //$("#txtNoDoc_out").dxTextBox("instance").reset();
            //$("#txtNoRef_out").dxTextBox("instance").reset();
            $("#dateStart_out").dxDateBox("instance").option("value", L2y);
            $("#dateEnd_out").dxDateBox("instance").option("value", new Date);
            //$("#cmbSumberData_out").dxSelectBox("instance").option("value", "");
            $("#cmbKategori_out").dxSelectBox("instance").option("value", "");
            $("#gridDataOutgoing").dxDataGrid("instance").option("dataSource", []);
            e.component.option("disabled", true);
            $("#btnSearchOut").dxButton("instance").option("text", "Cari Data");
        }
    });

    $("#nav-NettingOutgoing-tab").click(function () {
        //$.ajax({
        //    url: routeApi + "Netting/DataOutgoing",
        //    type: "GET",
        //    contentType: 'application/json; charset=utf-8',
        //    success: function (d) {
        //        $("#gridDataOutgoing").dxDataGrid({
        //            dataSource: d
        //        });
        //    }
        //});
        if (getLocalStorage("setOff") !== "") $("#skipOutgoing").hide();
        else $("#skipOutgoing").show();
    });

    $("#cancelOutgoing").click(function () {
        $("#nav-Netting-tab").click();
    });

    $("#skipOutgoing").click(function () {
        $("#skipOutgoing").attr("disabled", true);
        $("#skipOutgoing>i").removeClass().addClass("spinner-border spinner-border-sm");

        var setOff = cekSetOff();

        if (setOff === "OK") {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk melakukan proses ini", "warning", 5000);
                $("#skipOutgoing>i").removeClass().addClass("far fa-check-circle");
                $("#skipOutgoing").attr("disabled", false);
            } else {
                setLocalStorage("setOff", setOff);
                window.location.reload();
            }
        }
        else {
            var confMes = "Apakah anda yakin ingin memproses transaksi ini ?";
            var confRes = DevExpress.ui.dialog.confirm(confMes, "Nilai Devisa Berlebih!");
            confRes.done(function (dialogResult) {
                if (dialogResult) {
                    if (viewOnly) {
                        toast_notify("Anda tidak memiliki wewenang untuk melakukan proses ini", "warning", 5000);
                        $("#skipOutgoing>i").removeClass().addClass("far fa-check-circle");
                        $("#skipOutgoing").attr("disabled", false);
                    } else {
                        setLocalStorage("setOff", setOff);
                        window.location.reload();
                    }
                } else {
                    $("#skipOutgoing>i").removeClass().addClass("far fa-check-circle");
                    $("#skipOutgoing").attr("disabled", false);
                }
            });
        }
    });

    $("#okeOutgoing").click(function () {
        $("#okeOutgoing").attr("disabled", true);
        $("#okeOutgoing>i").removeClass().addClass("spinner-border spinner-border-sm");

        var msg = cekSetOff();
        if (msg === "OK") {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk memproses data terpilih", "warning", 5000);
                $("#okeOutgoing>i").removeClass().addClass("far fa-check-circle");
                $("#okeOutgoing").attr("disabled", false);
            } else {
                SaveSelectedOutgoing(msg);
            }
        }
        else {
            var confMes = "Apakah anda yakin ingin memproses transaksi ini ?";
            var confRes = DevExpress.ui.dialog.confirm(confMes, "Nilai Devisa Berlebih!");
            confRes.done(function (dialogResult) {
                if (dialogResult) {
                    if (viewOnly) {
                        toast_notify("Anda tidak memiliki wewenang untuk memproses data terpilih", "warning", 5000);
                        $("#okeOutgoing>i").removeClass().addClass("far fa-check-circle");
                        $("#okeOutgoing").attr("disabled", false);
                    } else {
                        SaveSelectedOutgoing(msg);
                    }
                } else {
                    $("#okeOutgoing>i").removeClass().addClass("far fa-check-circle");
                    $("#okeOutgoing").attr("disabled", false);
                }
            });
        }
    });

    function SaveSelectedOutgoing(setOff) {
        var datas = {};
        var url = routeApi + "Netting/SaveSelectedOutgoing";
        //var selectedRowKeys = $("#gridDataOutgoing").dxDataGrid("instance").getSelectedRowKeys();
        //datas["json_out"] = selectedRowKeys.toString();

        var outJSon = "";
        $("#gridDataOutgoing").dxDataGrid("instance").getSelectedRowsData().forEach(function (val, ix) {
            outJSon = outJSon + '{"id_pel_out":' + val.id_pel_out + ',"id_netting":' + netId + '},';
        });
        outJSon = "[" + outJSon.substring(0, outJSon.length - 1) + "]";
        datas["json_out"] = outJSon;

        var formData = new FormData();
        formData.append('data', JSON.stringify(datas));
        $.ajax(url, {
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            cache: false
        }).done(function (result) {
            var msg = result[0].msg_out.toString();
            if (msg === "OK") {
                setLocalStorage("setOff", setOff);
                toast_notify("Data Berhasil Disimpan", "success");
                setTimeout(function() {
                    $("#okeOutgoing>i").removeClass().addClass("far fa-check-circle");
                    $("#gridNettingOutgoing").dxDataGrid("instance").refresh();
                    //$('#nav-Netting-tab').click();
                    window.location.reload();
                    $("#okeOutgoing").attr("disabled", false);
                }, 500);
            } else {
                toast_notify("Gagal Menyimpan Data", "warning");
                $("#okeOutgoing>i").removeClass().addClass("far fa-check-circle");
                $("#okeOutgoing").attr("disabled", false);
                $("#nav-NettingOutgoing-tab").click();
            }
        });
    }

    function cekSetOff() {
        var ttOut = $("#gridDataOutgoing").dxDataGrid("instance").getTotalSummaryValue("SelectedSisaOutgoing");
        var ttOutUSD = $("#gridDataOutgoing").dxDataGrid("instance").getTotalSummaryValue("SelectedSisaOutgoingUSD");
        var kuotaNetting = getLocalStorage("nettingKuota");
        var kuotaNettingUSD = getLocalStorage("nettingKuotaUSD");
        var selisih = "+" + Math.abs(kuotaNetting - ttOut).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var selisihUSD = "+" + Math.abs(kuotaNettingUSD - ttOutUSD).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var msg = "OK";

        $("#kuotaOutgoing").text(selisih);
        $("#kuotaOutgoingUSD").text(selisihUSD);
        if (kuotaNettingUSD < ttOutUSD) {
            $("#setOffOutgoing").text("Devisa Lebih");
            msg = "plus";
        }
        else {
            $("#setOffOutgoing").text("Devisa Sesuai");
        }
        return msg;
    }

    function sendRequestBayar(url, method) {
        var noRek = $("#txtNoRek_out").dxTextBox("instance").option("value");
        //var noDoc = $("#txtNoDoc_out").dxTextBox("instance").option("value");
        //var noRef = $("#txtNoRef_out").dxTextBox("instance").option("value");
        var startOpt = $("#dateStart_out").dxDateBox("instance").option();
        var startDate = startOpt.displayFormat === "dd-MM-yyyy" ? startOpt.text.split("-").reverse().join("-") : startOpt.text;
        var endOpt = $("#dateEnd_out").dxDateBox("instance").option();
        var endDate = endOpt.displayFormat === "dd-MM-yyyy" ? endOpt.text.split("-").reverse().join("-") : endOpt.text;
        var sumberData = $("#cmbSumberData_out").dxSelectBox("instance").option("value");
        var kategoriRek = $("#cmbKategori_out").dxSelectBox("instance").option("value");

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
                $("#gridDataOutgoing").show().dxDataGrid({ dataSource: d });
                $("#btnSearchOut").dxButton({
                    icon: "search",
                    text: "Ubah Pencarian Data",
                    disabled: false
                });
                $("#btnResetOut").dxButton("instance").option("disabled", false);
            }
        });
    }

});