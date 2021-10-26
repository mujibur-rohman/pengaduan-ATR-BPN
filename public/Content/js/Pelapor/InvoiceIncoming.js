$(function () {
    var Today = new Date();
    var Day = new Date();
    var LastTwoYear = Day.setFullYear(Day.getFullYear() - 2);

    //var SumberData = ["SWIFT", "BANK"];
    //var KategoriRekening = ["UMUM", "KHUSUS"];

    $("#gridContainerIncoming").dxDataGrid({
        dataSource: [],
        keyExpr: "id_pel_inc",
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
                dataField: "no_rek_inc"
            },
            {
                caption: "Valuta Incoming",
                alignment: "center",
                dataField: "valuta_inc"
            },
            {
                caption: "Nilai Invoice",
                alignment: "right",
                dataField: "nilai_inc",
                format: {
                    type: "fixedPoint",
                    precision: 2
                }
            },
            {
                caption: "Nilai Invoice (USD)",
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
                caption: "No. Referensi",
                alignment: "left",
                dataField: "no_ref_inc"
            },
            {
                caption: "No. Dokumen",
                alignment: "left",
                dataField: "no_doc_inc"
            },
            {
                caption: "Tanggal Incoming",
                alignment: "right",
                dataField: "tanggal_inc",
                dataType: "date",
                format: "dd-MM-yyyy"
            },
            {
                caption: "Nama Pengirim",
                alignment: "left",
                dataField: "nama_pengirim_inc"
            },
            {
                caption: "BDDN",
                alignment: "left",
                dataField: "nama_bank_inc"
            }
            , {
                caption: "Kategori Rekening",
                alignment: "left",
                dataField: "kd_jenis_rek_inc",
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
                dataField: "kd_sumber_rek_inc",
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
                $("#btnProsesIncoming").show();
            } else if (msg === "OK" && selectedArray.length === 0) {
                $("#btnProsesIncoming").hide();
            } else {
                $("#btnProsesIncoming").hide();
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
                    name: "SelectedTotalIncoming",
                    showInColumn: "NILAI_INCOMING",
                    displayFormat: "{0}",
                    valueFormat: { type: "fixedPoint", precision: 2 },
                    summaryType: "custom"
                }
            ],
            calculateCustomSummary: function (IncSelect) {
                if (IncSelect.name === "SelectedTotalIncoming") {
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

    $("#txtPerIncoming").dxDateBox({
        type: "date",
        value: LastTwoYear,
        //max: new Date(),
        min: new Date(1900, 0, 1),
        useMaskBehavior: true,
        displayFormat: "dd-MM-yyyy",
        placeholder: "dd-MM-yyyy",
        showClearButton: true

    });

    $("#txtSampaiIncoming").dxDateBox({
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

    $("#cancelIncoming").dxButton({
        icon: "far fa-times-circle",
        text: "Batalkan",
        type: "danger",
        stylingMode: "outlined",
        onClick: function (e) {
            $('#nav-InvoiceEkspor-tab').click();
            doResetForm();
        }
    });

    $("#btnProsesIncoming").dxButton({
        icon: "far fa-check-circle",
        text: "Proses Data Terpilih",
        type: "default",
        stylingMode: "outlined",
        onClick: function (e) {
            $("#cancelIncoming").dxButton("instance").option("disabled", true);
            e.component.option("disabled", true);
            e.component.option("text", "Proses Data...");
            e.component.option("icon", "fas fa-spin fa-spinner");
            insertIncomingOnDuty();
        }
    });

    $("#btnResetIncoming").dxButton({
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

    $("#btnSearchIncoming").dxButton({
        icon: "search",
        text: "Cari Data",
        type: "default",
        stylingMode: "outlined",
        onClick: function (e) {
            e.component.option("disabled", true);
            e.component.option("text", "Mencari Data...");
            e.component.option("icon", "fas fa-spin fa-spinner");
            $("#btnResetIncoming").dxButton("instance").option("disabled", true);
            sendRequest2(routeApi + "Invoice/IncomingOutstanding", "GET");
        }
    });

    function sendRequest2(urlIncoming, method) {
        var noRek = $("#txtNoRek").dxTextBox("instance").option("value");
        //var startDate = $("#txtPerIncoming").dxDateBox("instance").option("text");
        //var endDate = $("#txtSampaiIncoming").dxDateBox("instance").option("text");
        var sumberData = $("#cmbSumberData").dxSelectBox("instance").option("value");
        var kategoriRek = $("#txtKategoriRek").dxSelectBox("instance").option("value");

        var startOpt = $("#txtPerIncoming").dxDateBox("instance").option();
        var startDate = startOpt.displayFormat === "dd-MM-yyyy" ? startOpt.text.split("-").reverse().join("-") : startOpt.text;
        var endOpt = $("#txtSampaiIncoming").dxDateBox("instance").option();
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

        urlIncoming = urlIncoming + "?startDate=" + startDate +
            "&endDate=" + endDate +
            "&noRek=" + noRek +
            "&sumberData=" + sumberData +
            "&kategoriRek=" + kategoriRek;

        $.ajax({
            url: urlIncoming,
            type: method,
            contentType: 'application/json; charset=utf-8',
            success: function (d) {
                $("#gridContainerIncoming").dxDataGrid({ dataSource: d });
                $("#btnSearchIncoming").dxButton({
                    icon: "search",
                    text: "Ubah Pencarian Data",
                    disabled: false
                });
                $("#btnResetIncoming").dxButton("instance").option("disabled", false);
            }
        });
    }

    function insertIncomingOnDuty() {

        if (ViewOnly) {
            toast_notify("Anda tidak memiliki wewenang untuk menambahkan data", "warning", 5000);
            return
        }

        var formData = new FormData();
        var datas = {}; 
        var url = routeApi + "Invoice/SaveSelected";
        var selectedRowKeys = $("#gridContainerIncoming").dxDataGrid("instance").getSelectedRowKeys();
        datas["json_val"] = selectedRowKeys.toString();
        datas["modul"] = 'incoming';
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

            $("#cancelIncoming").dxButton({
                disabled: false
            });

            $("#btnProsesIncoming").dxButton({
                icon: "far fa-check-circle",
                text: "Proses Data Terpilih",
                disabled: false
            });

            if (sta === "1") {
                doResetForm();
                DevExpress.ui.notify(result[0].msg_value.toString(), "success");
                //window.location.reload();
                setTimeout(function () {
                    $("#btnProsesIncoming>i").removeClass().addClass("far fa-check-circle");
                    $("#gridInvEksIncoming").dxDataGrid("instance").refresh();
                    $('#nav-InvoiceEkspor-tab').click();
                    $("#btnProsesIncoming").attr("disabled", false);
                }, 500);
            } else {
                DevExpress.ui.notify("Gagal Menyimpan Data", "warning");
                $("#btnProsesIncoming>i").removeClass().addClass("far fa-check-circle");
                $("#btnProsesIncoming").attr("disabled", false);
            }
        });
    }

    function doResetForm() {
        $("#txtNoRek").dxTextBox("instance").option('value', '');
        $("#txtPerIncoming").dxDateBox('instance').option('value', LastTwoYear);
        $("#txtSampaiIncoming").dxDateBox('instance').option('value', Today);
        $("#cmbSumberData").dxSelectBox('instance').option('value', '');
        $("#txtKategoriRek").dxSelectBox('instance').option('value', '');
        $("#gridContainerIncoming").dxDataGrid("instance").option("dataSource", []);
        $("#btnSearchIncoming").dxButton({ text: "Cari Data", disabled: false });
    }

});