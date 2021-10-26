$(function () {
    var L2y = new Date().getFullYear() - 2;
    var isExport = true;

    $("#gridIncoming").dxDataGrid({
        columnAutoWidth: true,
        export: {
            enabled: true,
            fileName: "DataIncoming" + Date.now(),
            allowExportSelectedData: true
        },
        showBorders: true,
        pager: {
            allowedPageSizes: [5, 10, 15, 30],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        selection: {
            mode: "multiple"
        },
        scrolling: {
            columnRenderingMode: "virtual1",
            showScrollbar: "always"
        },
        paging: {
            pageSize: 10
        },
        onToolbarPreparing: function (e) {
            var toolbarItems = e.toolbarOptions.items;

            var exportBtn;
            $.each(toolbarItems, function (_, item) {
                if (item.name === "exportButton") {
                    exportBtn = item;
                    return false;
                }
            });
            if (!exportBtn) {
                return;
            }
            var index = toolbarItems.indexOf(exportBtn);
            toolbarItems.splice(index, 1);
            var texts = e.component.option("export.texts");
            var menuItems = [
                {
                    text: texts.exportAll,
                    icon: "exportxlsx",
                    onClick: function (e) {
                        var DataSource = $("#gridIncoming").dxDataGrid("instance").option("dataSource");
                        
                        if (DataSource == null || DataSource == '') {
                            DevExpress.ui.notify("Data yang akan diekspor tidak ada", "error");
                            isExport = false;
                        }

                    }
                },
                {
                    text: texts.exportSelectedRows,
                    exportSelected: true,
                    icon: "exportselected",
                    onClick: function (e) {
                        
                        var selected = $("#gridIncoming").dxDataGrid("instance").option("selectedRowKeys").length;

                        if (selected == 0) {
                            DevExpress.ui.notify("Tidak ada data yang dipilih", "error");
                            isExport = false;

                        }

                    }
                },

            ];
            toolbarItems.push({
                widget: "dxButton",
                options: {
                    icon: "export-to",
                    hint: texts.exportTo,
                    elementAttr: {
                        class: "dx-datagrid-export-button"
                    },
                    onInitialized: function (args) {
                        $("#exportMenu").dxContextMenu({
                            showEvent: "dxclick",
                            items: menuItems,
                            cssClass: "dx-datagrid-export-menu",
                            onItemClick: function (item) {
                                if (isExport) {
                                    e.component.exportToExcel(item.itemData.exportSelected);
                                }
                                else {
                                    isExport = true;
                                    return false;
                                }
                            },
                            target: args.element,
                            position: {
                                at: "left bottom",
                                my: "left top",
                                offset: "0 3",
                                collision: "fit",
                                boundary: e.element,
                                boundaryOffset: "1 1"
                            }
                        });
                    },
                    onClick: function () { }
                },
                location: "after"
            });
        },
        columns: [
            {
                caption: "No. Rekening",
                alignment: "left",
                dataField: "no_rek_inc"
            }, {
                caption: "Tgl. Incoming",
                alignment: "right",
                dataField: "tanggal_inc",
                dataType: "date",
                format: "dd-MM-yyyy"
            }, {
                caption: "No. Dokumen",
                alignment: "left",
                dataField: "no_doc_inc"
            }, {
                caption: "No. Referensi",
                alignment: "left",
                dataField: "no_ref_inc"
            }, {
                caption: "Valuta",
                alignment: "center",
                dataField: "valuta_inc"
            }, {
                caption: "Nilai Incoming",    //Digantin menjadi Nilai Invoice
                alignment: "right",
                dataField: "nilai_inc",
                format: {
                    type: "fixedPoint",
                    precision: 2
                }
            }, {
                caption: "Alokasi Incoming",  //Digantin menjadi Nilai Alokasi Invoice
                alignment: "right",
                dataField: "alokasi_inv_inc",
                format: {
                    type: "fixedPoint",
                    precision: 2
                }
            }, {
                caption: "Sisa Incoming",
                alignment: "right",
                dataField: "sisa_inc",
                format: {
                    type: "fixedPoint",
                    precision: 2
                }
            }, {
                caption: "Nama Pengirim",
                alignment: "left",
                dataField: "nama_pengirim_inc"
            }
            , {
                caption: "Sumber Data",
                alignment: "left",
                dataField: "kd_sumber_rek_inc",
                lookup: {
                    dataSource: [
                        { id: "", text: "Semua" },
                        { id: "1", text: "Swift" },
                        { id: "2", text: "Bank" }
                    ],
                    displayExpr: 'text',
                    valueExpr: 'id'
                }
            }
            , {
                caption: "Nama Bank",
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
                        { id: "U", text: "Umum" },
                        { id: "K", text: "Khusus" }
                    ],
                    displayExpr: 'text',
                    valueExpr: 'id'
                }
            }
        ]
    });

    $("#dateStart_inc").dxDateBox({
        type: "date",
        //max: new Date(),
        //min: new Date(L2y, 0, 1),
        displayFormat: "dd-MM-yyyy",
        placeholder: "Awal",
        useMaskBehavior: true,
        value: new Date(L2y, 0, 1)
    });

    $("#dateEnd_inc").dxDateBox({
        type: "date",
        //max: new Date(),
        //min: new Date(L2y, 0, 1),
        displayFormat: "dd-MM-yyyy",
        placeholder: "Akhir",
        useMaskBehavior: true,
        value: new Date()
    });

    $("#cmbKategoriRek").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "U", text: "Umum" },
            { id: "K", text: "Khusus" }
        ],
        displayExpr: 'text',
        valueExpr: 'id',
        value: ""
    });

    $("#cmbSumberData").dxSelectBox({
        dataSource: [
            { id: "", text: "Semua" },
            { id: "1", text: "Swift" },
            { id: "2", text: "Bank" }
        ],
        displayExpr: 'text',
        valueExpr: 'id',
        value: ""
    });

    $("#txtNoRek").dxTextBox({
        placeholder: "Masukkan Nomor Rekening..."
    }).dxValidator({
        validationRules: [{
            type: "pattern",
            pattern: '^\\d+$',
            message: "Nomor Rekening harus angka"
        }]
        });

    $("#txtNoInvoice").dxTextBox({
        placeholder: "Masukkan  Nomor Dokumen..."
    });

    $("#txtNoRef").dxTextBox({
        placeholder: "Masukkan Nomor Referensi..."
    })

    $("#btnResetInc").dxButton({
        icon: "revert",
        text: "Reset",
        type: "danger",
        stylingMode: "outlined",
        disabled: true,
        onClick: function (e) {
            $("#dateStart_inc").dxDateBox('instance').option('value', new Date(L2y, 0, 1));
            $("#dateEnd_inc").dxDateBox('instance').option('value', new Date);
            $("#cmbKategoriRek").dxSelectBox('instance').option('value', '');
            $("#cmbSumberData").dxSelectBox('instance').option('value', '');
            $("#txtNoRek").dxTextBox("instance").option('value', '');
            $("#txtNoInvoice").dxTextBox("instance").option('value', '');
            $("#txtNoRef").dxTextBox("instance").option('value', '');
            $("#gridIncoming").dxDataGrid("instance").option('dataSource', []);
            e.component.option("disabled", true);
        }
    });

    $("#btnSearchInc").dxButton({
        icon: "search",
        text: "Cari Data",
        type: "default",
        stylingMode: "outlined",
        onClick: function (e) {
            if ($("#dateStart_inc").dxDateBox("instance").option("value") === null || $("#dateEnd_inc").dxDateBox("instance").option("value") === null) {
                toast_notify("Tanggal Periode Incoming tidak boleh kosong", "error");
            }
            else {
                if ($("#dateStart_inc").dxDateBox("instance").option("value") > $("#dateEnd_inc").dxDateBox("instance").option("value")) {
                    toast_notify("Tanggal awal tidak bisa lebih besar dari tanggal akhir", "error");
                }
                else {
                    e.component.option("disabled", true);
                    e.component.option("text", "Mencari Data...");
                    e.component.option("icon", "fas fa-spin fa-spinner");
                    $("#btnResetInc").dxButton("instance").option("disabled", true);
                    var method = "GET";
                    var urls = routeApi + "DataInOut/IncomingtanpaPPE";
                    sendRequest2(urls, method);
                }
            }
        }
    });

    function sendRequest2(urls, method) {
        var startOpt = $("#dateStart_inc").dxDateBox("instance").option();
        var startDate = startOpt.displayFormat === "dd-MM-yyyy" ? startOpt.text.split("-").reverse().join("-") : startOpt.text;
        var endOpt = $("#dateEnd_inc").dxDateBox("instance").option();
        var endDate = endOpt.displayFormat === "dd-MM-yyyy" ? endOpt.text.split("-").reverse().join("-") : endOpt.text;
        var jnsRek = $("#cmbKategoriRek").dxSelectBox("instance").option("value");
        var sumberData = $("#cmbSumberData").dxSelectBox("instance").option("value");
        var noRek = $("#txtNoRek").dxTextBox("instance").option("value");
        var noInv = $("#txtNoInvoice").dxTextBox("instance").option("value");
        var noRef = $("#txtNoRef").dxTextBox("instance").option("value");

        $.ajax({
            url: urls + "?startDate=" + startDate +
                "&endDate=" + endDate +
                "&jnsRek=" + jnsRek +
                "&sumberData=" + sumberData +
                "&noRek=" + noRek +
                "&noInv=" + noInv +
                "&noRef=" + noRef,
            type: method,
            contentType: 'application/json; charset=utf-8',
            success: function (d) {
                $("#gridIncoming").dxDataGrid({
                    keyExpr: "id_pel_inc",
                    dataSource: d
                });
                $("#btnSearchInc").dxButton({
                    icon: "search",
                    text: "Cari Data",
                    disabled: false
                });
                $("#btnResetInc").dxButton({ disabled: false });
            }
        });
    }

});