$(function () {
    $("#gridDataOutgoing").dxDataGrid({
        dataSource: [],
        keyExpr: "ID_PEL_OUT",
        rowAlternationEnabled: true,
        columnAutoWidth: true,
        showBorders: true,
        filterRow: { visible: true },
        headerFilter: { visible: true },
        scrolling: { columnRenderingMode: "virtual1" },
        pager: {
            allowedPageSizes: [5, 10, 15, 30],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: { pageSize: 10 },
        selection: { mode: "multiple" },
        columns: [
            {
                caption: "NETTING BAYAR",
                alignment: "Center",
                columns: [
                    {
                        caption: "No Rekening",
                        alignment: "right",
                        dataField: "NO_REK_OUT"
                    },
                    {
                        caption: "Valuta",
                        alignment: "right",
                        dataField: "VALUTA_OUT"
                    },
                    {
                        caption: "Nilai",
                        alignment: "right",
                        dataField: "NILAI_OUT",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Tanggal",
                        alignment: "right",
                        dataField: "TANGGAL_OUT",
                        dataType: "date",
                        format: "yyyy-MM-dd"
                    },
                    {
                        caption: "No Referensi",
                        alignment: "right",
                        dataField: "NO_REF_OUT"
                    },
                    {
                        caption: "Nilai Invoice",
                        alignment: "right",
                        dataField: "NILAI_INV_OUT",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Nama Pengirim",
                        alignment: "left",
                        dataField: "NAMA_PENERIMA"
                    },
                    {
                        caption: "Nama Bank",
                        alignment: "left",
                        dataField: "NAMA_BANK_OUT"
                    }
                ]
            }
        ],
        onSelectionChanged: function (selectedItems) {
            var selectedArray = selectedItems.selectedRowsData;
            var msg = (function () {
                for (var i = 0; i < selectedArray.length; i++) {
                    if (selectedArray[0]["VALUTA_OUT"] !== selectedArray[i]["VALUTA_OUT"]) {
                        return "VALUTA INVOICE TIDAK SAMA";
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
                DevExpress.ui.notify(msg, "warning", 2000);
                selectedItems.component.deselectRows(selectedItems.currentSelectedRowKeys);
            }
            selectedItems.component.refresh(true);
        },
        summary: {
            totalItems: [
                {
                    column: "NO_REF_OUT",
                    showInColumn: "NO_REF_OUT",
                    displayFormat: "TOTAL TERPILIH"
                },
                {
                    name: "SelectedTotalInvoiceOutgoing",
                    showInColumn: "NILAI_INV_OUT",
                    displayFormat: "{0}",
                    valueFormat: { type: "fixedPoint", precision: 2 },
                    summaryType: "custom"
                }
            ],
            calculateCustomSummary: function (options) {
                if (options.name === "SelectedTotalInvoiceOutgoing") {
                    if (options.summaryProcess === "start") {
                        options.totalValue = 0;
                    }
                    if (options.summaryProcess === "calculate") {
                        if (options.component.isRowSelected(options.value.ID_PEL_OUT)) {
                            options.totalValue += options.value.NILAI_INV_OUT;
                        }
                    }
                }
            }
        },
        onContentReady: function (content) {
            cekSetOff();
        }
    });

    $("#nav-NettingOutgoing-tab").click(function () {
        $.ajax({
            url: routeApi + "DataOutgoing/GetOutgoing",
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            success: function (d) {
                $("#gridDataOutgoing").dxDataGrid({
                    dataSource: d,
                    selectedRowKeys: getLocalStorage("outgoingSelectedRowKeys") === ""
                        ? [] : JSON.parse(getLocalStorage("outgoingSelectedRowKeys"))
                });
            }
        });

    });

    $("#cancelOutgoing").click(function () {
        $("#nav-Netting-tab").click();
    });

    $("#okeOutgoing").click(function () {
        $("#okeOutgoing").attr("disabled", true);
        $("#okeOutgoing>i").removeClass().addClass("spinner-border spinner-border-sm");

        var msg = cekSetOff();
        var selectedRowKeys = $("#gridDataOutgoing").dxDataGrid("instance").getSelectedRowKeys();
        var selectedRowsData = $("#gridDataOutgoing").dxDataGrid("instance").getSelectedRowsData();

        if (msg === "OK") {
            setTimeout(function () {
                setLocalStorage("outgoingSelectedRowKeys", JSON.stringify(selectedRowKeys));
                setLocalStorage("outgoingSelectedRowsData", JSON.stringify(selectedRowsData));
                setLocalStorage("setOff", msg);
                $("#okeOutgoing>i").removeClass().addClass("far fa-check-circle");
                $('#nav-Netting-tab').click();
                $("#okeOutgoing").attr("disabled", false);
            }, 500);
        }
        else {
            var confMes = "Apakah anda yakin ingin memproses transaksi ini ?";
            var confRes = DevExpress.ui.dialog.confirm(confMes, "Nilai Devisa Berlebih!");
            confRes.done(function (dialogResult) {
                if (dialogResult) {
                    setTimeout(function () {
                        setLocalStorage("outgoingSelectedRowKeys", JSON.stringify(selectedRowKeys));
                        setLocalStorage("outgoingSelectedRowsData", JSON.stringify(selectedRowsData));
                        setLocalStorage("setOff", msg);
                        $("#okeOutgoing>i").removeClass().addClass("far fa-check-circle");
                        $('#nav-Netting-tab').click();
                        $("#okeOutgoing").attr("disabled", false);
                    }, 500);
                } else {
                    $("#okeOutgoing>i").removeClass().addClass("far fa-check-circle");
                    $("#okeOutgoing").attr("disabled", false);
                }
            });
        }
    });

    function cekSetOff() {
        var totalOutgoing = $("#gridDataOutgoing").dxDataGrid("instance").getTotalSummaryValue("SelectedTotalInvoiceOutgoing");
        var kuotaNetting = getLocalStorage("nettingKuota");
        var selisih = (kuotaNetting - totalOutgoing).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var msg = "OK";
        if (kuotaNetting < totalOutgoing) {
            $("#kuotaOutgoing").text(selisih + " (Devisa Lebih)");
            msg = "plus";
        }
        else {
            $("#kuotaOutgoing").text(selisih + " (Devisa Sesuai)");
        }
        return msg;
    }
});