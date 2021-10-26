$(function () {
    var Today = new Date();
    var Day = new Date();
    var LastTwoYear = Day.setFullYear(Day.getFullYear() - 2);

    var SumberData = ["SWIFT", "BANK"];
    var KategoriRekening = ["UMUM", "KHUSUS"];

    $("#gridContainerOutgoing").dxDataGrid({
        dataSource: [],
        keyExpr: "id_pel_out",
        rowAlternationEnabled: true,
        columnAutoWidth: true,
        showBorders: true,
        filterRow: { visible: false },
        headerFilter: { visible: false },
        scrolling: { useNative: true, columnRenderingMode: "virtual1" },
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
                caption: "Nomor Rekening",
                alignment: "left",
                dataField: "no_rek_out"
            },
            {
                caption: "Valuta Outgoing",
                alignment: "center",
                dataField: "valuta_out"
            },
            {
                caption: "Nilai Invoice",
                alignment: "right",
                dataField: "nilai_out",
                format: {
                    type: "fixedPoint",
                    precision: 2
                }
            },
            {
                caption: "Nilai Invoice (USD)",
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
                caption: "No Referensi",
                alignment: "left",
                dataField: "no_ref_out"
            },
            {
                caption: "No. Dokumen",
                alignment: "left",
                dataField: "no_doc_out"
            },
            {
                caption: "Tanggal Outgoing",
                alignment: "right",
                dataField: "tanggal_out",
                dataType: "date",
                format: "dd-MM-yyyy"
            },
            {
                caption: "Nama Pembayar",
                alignment: "left",
                dataField: "nama_penerima_out"
            },
            {
                caption: "BDDN",
                alignment: "left",
                dataField: "nama_bank_out"
            }
            , {
                caption: "Kategori Rekening",
                alignment: "left",
                dataField: "kd_jenis_rek_out",
                lookup: {
                    dataSource: [
                        { id: "", text: "Semua" },
                        { id: "U", text: "UMUM" },
                        { id: "K", text: "KHUSUS" }
                    ],
                    displayExpr: 'text',
                    valueExpr: 'id'
                }
            }
            , {
                caption: "Sumber Data",
                alignment: "left",
                dataField: "kd_sumber_rek_out",
                lookup: {
                    dataSource: [
                        { id: "", text: "Semua" },
                        { id: "1", text: "SWIFT" },
                        { id: "2", text: "BANK" }
                    ],
                    displayExpr: 'text',
                    valueExpr: 'id',
                }
            }
        ],
        onSelectionChanged: function (selectedItems) {
            var selectedArray = selectedItems.selectedRowsData;
            var msg = (function () {
                for (var i = 0; i < selectedArray.length; i++) {
                    if (selectedArray[0].valuta_inc !== selectedArray[i].valuta_inc) {
                        return "VALUTA INVOICE TIDAK SAMA";
                    }
                }
                return "OK";
            })();

            if (msg === "OK" && selectedArray.length > 0) {
                $("#btnProsesOutgoing").show();
            } else if (msg === "OK" && selectedArray.length === 0) {
                $("#btnProsesOutgoing").hide();
            } else {
                $("#btnProsesOutgoing").hide();
                DevExpress.ui.notify(msg, "warning", 2000);
                selectedItems.component.deselectRows(selectedItems.currentSelectedRowKeys);
            }
            selectedItems.component.refresh();
        },
        summary: {
            totalItems: [
                {
                    column: "VALUTA_INCOMING",
                    showInColumn: "VALUTA_INCOMING",
                    displayFormat: "TOTAL :"
                },
                {
                    name: "SelectedTotalOutgoing",
                    showInColumn: "NILAI_INCOMING",
                    displayFormat: "{0}",
                    valueFormat: { type: "fixedPoint", precision: 2 },
                    summaryType: "custom"
                }
            ],
            calculateCustomSummary: function (IncSelect) {
                if (IncSelect.name === "SelectedTotalOutgoing") {
                    if (IncSelect.summaryProcess === "start") {
                        IncSelect.totalValue = 0;
                    }
                    if (IncSelect.summaryProcess === "calculate") {
                        if (IncSelect.component.isRowSelected(IncSelect.value.ID_PEL_INCOMING)) {
                            IncSelect.totalValue += IncSelect.value.NILAI_INCOMING;
                        }
                    }
                }
            }
        }
    });

    $("#cmbSumberData").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "1", text: "SWIFT" },
            { id: "2", text: "BANK" }
        ],
        displayExpr: 'text',
        valueExpr: 'id',
        value: ""
    });

    $("#txtPerOutgoing").dxDateBox({
        type: "date",
        value: LastTwoYear,
        //max: new Date(),
        min: new Date(1900, 0, 1),
        useMaskBehavior: true,
        displayFormat: "dd-MM-yyyy",
        placeholder: "dd-MM-yyyy",
        showClearButton: true

    });

    $("#txtSampaiOutgoing").dxDateBox({
        type: "date",
        value: Today,
        //max: new Date(),
        min: new Date(1900, 0, 1),
        useMaskBehavior: true,
        displayFormat: "dd-MM-yyyy",
        placeholder: "dd-MM-yyyy",
        showClearButton: true
    });

    $("#txtKategoriRek").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "U", text: "UMUM" },
            { id: "K", text: "KHUSUS" }
        ],
        displayExpr: 'text',
        valueExpr: 'id',
        value: ""
    });

    $("#txtNoRek").dxTextBox({
        placeholder: "Masukkan Nomor Rekening..."
    });

    $("#txtNoRek1").dxTextBox({
        placeholder: "Masukkan Nomor Rekening..."
    });

    $("#cancelOutgoing").dxButton({
        icon: "far fa-times-circle",
        text: "Batalkan",
        type: "danger",
        stylingMode: "outlined",
        onClick: function (e) {
            $('#nav-InvoiceImpor-tab').click();
            doResetForm();
        }
    });

    $("#btnProsesOutgoing").dxButton({
        icon: "far fa-check-circle",
        text: "Proses Data Terpilih",
        type: "default",
        stylingMode: "outlined",
        onClick: function (e) {
            $("#cancelOutgoing").dxButton("instance").option("disabled", true);
            e.component.option("disabled", true);
            e.component.option("text", "Proses Data...");
            e.component.option("icon", "fas fa-spin fa-spinner");
            insertOutgoingOnDuty();
        }
    });

    //$("#btnResetOutgoing").dxButton({
    //    text: "Reset",
    //    width: 120,
    //    type: "default",
    //    onClick: function (e) {
    //        doResetForm();
    //    }
    //});

    $("#btnResetOutgoing").dxButton({
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

    $("#btnSearchOutgoing").dxButton({
        icon: "search",
        text: "Cari Data",
        type: "default",
        stylingMode: "outlined",
        onClick: function (e) {
            e.component.option("disabled", true);
            e.component.option("text", "Mencari Data...");
            e.component.option("icon", "fas fa-spin fa-spinner");
            $("#btnResetOutgoing").dxButton("instance").option("disabled", true);
            sendRequest2(routeApi + "Invoice/OutgoingOutstanding", "GET");
        }
    });

    //$("#btnSearchOutgoing").dxButton({
    //    text: "Cari Data",
    //    width: 120,
    //    type: "default",
    //    onClick: function (s, e) {
    //        sendRequest2(routeApi + "Invoice/OutgoingOutstanding", "GET");
    //    }
    //});

    function sendRequest2(urlOutgoing, method) {
        var noRek = $("#txtNoRek").dxTextBox("instance").option("value");
        //var startDate = $("#txtPerOutgoing").dxDateBox("instance").option("text");
        //var endDate = $("#txtSampaiOutgoing").dxDateBox("instance").option("text");
        var sumberData = $("#cmbSumberData").dxSelectBox("instance").option("value");
        var kategoriRek = $("#txtKategoriRek").dxSelectBox("instance").option("value");

        var startOpt = $("#txtPerOutgoing").dxDateBox("instance").option();
        var startDate = startOpt.displayFormat === "dd-MM-yyyy" ? startOpt.text.split("-").reverse().join("-") : startOpt.text;
        var endOpt = $("#txtSampaiOutgoing").dxDateBox("instance").option();
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

        urlOutgoing = urlOutgoing + "?startDate=" + startDate +
            "&endDate=" + endDate +
            "&noRek=" + noRek +
            "&sumberData=" + sumberData +
            "&kategoriRek=" + kategoriRek;

        $.ajax({
            url: urlOutgoing,
            type: method,
            contentType: 'application/json; charset=utf-8',
            success: function (d) {
                $("#gridContainerOutgoing").dxDataGrid({ dataSource: d });
                $("#btnSearchOutgoing").dxButton({
                    icon: "search",
                    text: "Ubah Pencarian Data",
                    disabled: false
                });
                $("#btnResetOutgoing").dxButton("instance").option("disabled", false);
            }
        });
    }

    function insertOutgoingOnDuty() {

        if (ViewOnly) {
            toast_notify("Anda tidak memiliki wewenang untuk menambahkan data", "warning", 5000);
            return
        }

        var formData = new FormData();
        var datas = {}; 
        var url = routeApi + "Invoice/SaveSelected";
        var selectedRowKeys = $("#gridContainerOutgoing").dxDataGrid("instance").getSelectedRowKeys();
        datas["json_val"] = selectedRowKeys.toString();
        datas["modul"] = 'outgoing';
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

            $("#cancelOutgoing").dxButton({
                disabled: false
            });

            $("#btnProsesOutgoing").dxButton({
                icon: "far fa-check-circle",
                text: "Proses Data Terpilih",
                disabled: false
            });

            if (sta === "1") {
                doResetForm();
                DevExpress.ui.notify(result[0].msg_value.toString(), "success");
                //window.location.reload();
                setTimeout(function () {
                    $("#btnProsesOutgoing>i").removeClass().addClass("far fa-check-circle");
                    $("#gridInvImpOutgoing").dxDataGrid("instance").refresh();
                    $('#nav-InvoiceImpor-tab').click();
                    $("#btnProsesOutgoing").attr("disabled", false);
                }, 500);
            } else {
                DevExpress.ui.notify("Gagal Menyimpan Data", "warning");
                $("#btnProsesOutgoing>i").removeClass().addClass("far fa-check-circle");
                $("#btnProsesOutgoing").attr("disabled", false);
            }
        });
    }

    function doResetForm() {
        $("#cmbSumberData").dxSelectBox('instance').option('value', '');
        $("#txtKategoriRek").dxSelectBox('instance').option('value', '');
        $("#txtPerOutgoing").dxDateBox('instance').option('value', LastTwoYear);
        $("#txtSampaiOutgoing").dxDateBox('instance').option('value', Today);
        $("#txtNoRek").dxTextBox("instance").option('value', '');
        $("#gridContainerOutgoing").dxDataGrid("instance").option("dataSource", []);
        $("#btnSearchOutgoing").dxButton({ text: "Cari Data", disabled: false });
    }

});

