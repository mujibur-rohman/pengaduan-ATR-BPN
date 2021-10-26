$(function () {
    $("#gridDataIncoming").dxDataGrid({
        dataSource: [],
        keyExpr: "ID_PEL_INC",
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
                caption: "NETTING TERIMA",
                alignment: "Center",
                columns: [
                    {
                        caption: "No Rekening",
                        alignment: "right",
                        dataField: "NO_REK_INC"
                    },
                    {
                        caption: "Valuta",
                        alignment: "right",
                        dataField: "VALUTA_INC"
                    },
                    {
                        caption: "Nilai",
                        alignment: "right",
                        dataField: "NILAI_INC",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Tanggal",
                        alignment: "right",
                        dataField: "TANGGAL_INC",
                        dataType: "date",
                        format: "yyyy-MM-dd"
                    },
                    {
                        caption: "No Referensi",
                        alignment: "right",
                        dataField: "NO_REF_INC"
                    },
                    {
                        caption: "Nilai Invoice",
                        alignment: "right",
                        dataField: "NILAI_INV_INC",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        }
                    },
                    {
                        caption: "Nama Pengirim",
                        alignment: "left",
                        dataField: "NAMA_PENGIRIM"
                    },
                    {
                        caption: "Nama Bank",
                        alignment: "left",
                        dataField: "NAMA_BANK_INC"
                    }
                ]
            }
        ],
        onSelectionChanged: function (selectedItems) {     
            var selectedArray = selectedItems.selectedRowsData;
            var msg = (function () {
                for (var i = 0; i < selectedArray.length; i++) {
                    if (selectedArray[0]["VALUTA_INC"] !== selectedArray[i]["VALUTA_INC"]) {
                        return "VALUTA INVOICE TIDAK SAMA";
                    }
                }
                return "OK";
            })();

            if (msg === "OK" && selectedArray.length > 0) {
                $("#okeIncoming").show();
            } else if (msg === "OK" && selectedArray.length === 0) {
                $("#okePokeIncomingIB").hide();
            } else {
                $("#okeIncoming").hide();
                DevExpress.ui.notify(msg, "warning", 2000);                
                selectedItems.component.deselectRows(selectedItems.currentSelectedRowKeys);
            }
            selectedItems.component.refresh(true);
        },
        summary: {
            totalItems: [
                {
                    column: "NO_REF_INC",
                    showInColumn: "NO_REF_INC",
                    displayFormat: "TOTAL TERPILIH"
                },
                {
                    name: "SelectedTotalInvoiceIncoming",
                    showInColumn: "NILAI_INV_INC",
                    displayFormat: "{0}",
                    valueFormat: { type: "fixedPoint", precision: 2 },
                    summaryType: "custom"
                }
            ],
            calculateCustomSummary: function (options) {
                if (options.name === "SelectedTotalInvoiceIncoming") {
                    if (options.summaryProcess === "start") {
                        options.totalValue = 0;
                    }
                    if (options.summaryProcess === "calculate") {
                        if (options.component.isRowSelected(options.value.ID_PEL_INC)) {
                            options.totalValue += options.value.NILAI_INV_INC;
                        }
                    }
                }
            }
        },
        onContentReady: function(content) {
            cekSetOff();
        }
    });

    $("#nav-NettingIncoming-tab").click(function () {
        $.ajax({
            url: routeApi + "DataIncoming/GetIncoming",
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            success: function (d) {
                $("#gridDataIncoming").dxDataGrid({
                    dataSource: d,
                    selectedRowKeys: getLocalStorage("incomingSelectedRowKeys") === ""
                        ? [] : JSON.parse(getLocalStorage("incomingSelectedRowKeys"))
                });
            }
        });

    });

    $("#cancelIncoming").click(function () {
        $("#nav-Netting-tab").click();
    });

    $("#okeIncoming").click(function () {
        $("#okeIncoming").attr("disabled", true);
        $("#okeIncoming>i").removeClass().addClass("spinner-border spinner-border-sm");

        var selectedRowKeys = $("#gridDataIncoming").dxDataGrid("instance").getSelectedRowKeys();
        var selectedRowsData = $("#gridDataIncoming").dxDataGrid("instance").getSelectedRowsData();
        var msg = cekSetOff();

        if (msg === "OK") {
            setTimeout(function () {
                setLocalStorage("incomingSelectedRowKeys", JSON.stringify(selectedRowKeys));
                setLocalStorage("incomingSelectedRowsData", JSON.stringify(selectedRowsData));
                setLocalStorage("setOff", msg);
                $("#okeIncoming>i").removeClass().addClass("far fa-check-circle");
                $('#nav-Netting-tab').click();
                $("#okeIncoming").attr("disabled", false);
            }, 500);
        }
        else {
            var confMes = "Apakah anda yakin ingin memproses transaksi ini ?";
            var confRes = DevExpress.ui.dialog.confirm(confMes, "Nilai Devisa Masih Kurang!");
            confRes.done(function (dialogResult) {
                if (dialogResult) {
                    setTimeout(function () {
                        setLocalStorage("incomingSelectedRowKeys", JSON.stringify(selectedRowKeys));
                        setLocalStorage("incomingSelectedRowsData", JSON.stringify(selectedRowsData));
                        setLocalStorage("setOff", msg);
                        $("#okeIncoming>i").removeClass().addClass("far fa-check-circle");
                        $('#nav-Netting-tab').click();
                        $("#okeIncoming").attr("disabled", false);
                    }, 500);
                } else {
                    $("#okeIncoming>i").removeClass().addClass("far fa-check-circle");
                    $("#okeIncoming").attr("disabled", false);
                }
            });
        }
    });

    function cekSetOff() {
        var totalIncoming = $("#gridDataIncoming").dxDataGrid("instance").getTotalSummaryValue("SelectedTotalInvoiceIncoming");
        var kuotaNetting = getLocalStorage("nettingKuota");
        var selisih = (-kuotaNetting + totalIncoming).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var msg = "OK";
        if (kuotaNetting > totalIncoming) {
            $("#kuotaIncoming").text(selisih + " (Devisa Kurang)");
            msg = "minus";
        }
        else {
            $("#kuotaIncoming").text(selisih + " (Devisa Sesuai)");           
        }
        return msg;
    }
});