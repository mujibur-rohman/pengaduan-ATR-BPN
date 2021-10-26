
$(function () {
    function sendRequest2(urlpib, method) {
        var npwp = $("#formSearch").dxForm('instance').getEditor("NPWP").option("value");
        npwp = npwp ? npwp : "";
        var namaEksportirImportir = $("#formSearch").dxForm('instance').getEditor("NAMA_EKSPORTIR_IMPORTIR").option("value");
        namaEksportirImportir = namaEksportirImportir ? namaEksportirImportir : "";
        var tglDenda = $("input[name='TANGGAL_DENDA']").val();

        if (!tglDenda) {
            // DevExpress.ui.notify("Tanggal Denda wajib di isi..", "error");
            return;
        }
        $("#gridDetail").dxDataGrid("instance").option("dataSource", null);
        $("#gridContainer").dxDataGrid("instance").clearSelection();
        $("#gridContainer").dxDataGrid("instance").option("dataSource", getDataSource(urlpib + "?NPWP=" + npwp + "&NAMA_EKSPORTIR_IMPORTIR=" + namaEksportirImportir + "&TANGGAL_DENDA=" + tglDenda, "NPWP"));

        var kursUrl = routeApi + "PerhitunganRealisasiDenda/getKurs" + "?NPWP=" + npwp + "&NAMA_EKSPORTIR_IMPORTIR=" + namaEksportirImportir + "&TANGGAL_DENDA=" + tglDenda + "&Fpros=1";
        if (flagProses) {
            kursUrl = routeApi + "PerhitunganRealisasiDenda/getKurs" + "?NPWP=" + npwp + "&NAMA_EKSPORTIR_IMPORTIR=" + namaEksportirImportir + "&TANGGAL_DENDA=" + tglDenda + "&Fpros=0";
        }
        monGet(kursUrl, function (data) {
            $("#gridInfoKurs").dxDataGrid("instance").option("dataSource", data);
        });
    }

    var formSearch = $("#formSearch").dxForm({
        colCount: 1,
        labelLocation: "top",
        alignItemLabels: false,
        alignItemLabelsInAllGroups: false,
        onInitialized: function (e) {
            formInstance = e.component;
        },
        items: [
            {
                itemType: "group",
                colCount: 2,
                items: [
                    {
                        dataField: "f20",
                        name: "Sender Reference",
                        editorType: "dxTextBox",
                        editorOptions: {
                            placeholder: "Sender Reference",
                            showClearButton: true,
                            onValueChanged: function (d) {
                                if (d.value == "") {
                                    $("#formSearch").dxForm('instance').getEditor("f20").option("isValid", true);
                                }
                            }
                        },
                        label: {
                            text: "Sender Reference"
                        }
                    },
                    {
                        itemType: "group",
                        colCount: 2,
                        name: "TANGGAL",
                        items: [
                            {
                                dataField: "f32a_tanggal",
                                editorType: "dxDateBox",
                                editorOptions: {
                                    displayFormat: DATE_FORMAT,
                                    width: "100%",
                                    placeholder: "Dari",
                                    onValueChanged: function (e) {
                                        $("#formSearch").dxForm('instance').getEditor("f32a_tanggal").option("min", e.value);
                                    }
                                },
                                label: {
                                    text: "Tanggal Dari"
                                },

                            },
                            {
                                dataField: "f32a_tanggal",
                                editorType: "dxDateBox",
                                editorOptions: {
                                    displayFormat: DATE_FORMAT,
                                    width: "100%",
                                    placeholder: "Sampai",
                                    onValueChanged: function (e) {
                                        $("#formSearch").dxForm('instance').getEditor("f32a_tanggal").option("max", e.value);
                                    }
                                },
                                label: {
                                    text: "Tanggal Sampai",
                                }
                            }
                        ]
                    },
                    {
                        dataField: "f59_name",
                        name: "Beneficiary",
                        editorType: "dxTextBox",
                        editorOptions: {
                            placeholder: "Beneficiary",
                            showClearButton: true,
                            onValueChanged: function (d) {
                                if (d.value == "") {
                                    $("#formSearch").dxForm('instance').getEditor("f59_name").option("isValid", true);
                                }
                            }
                        },
                        label: {
                            text: "Beneficiary"
                        }
                    },
                    {
                        dataField: "f59_name",
                        name: "Beneficiary",
                        editorType: "dxTextBox",
                        editorOptions: {
                            placeholder: "Status Format",
                            showClearButton: true,
                            onValueChanged: function (d) {
                                if (d.value == "") {
                                    $("#formSearch").dxForm('instance').getEditor("f59_name").option("isValid", true);
                                }
                            }
                        },
                        label: {
                            text: "Status Format"
                        }
                    },
                    {
                        dataField: "f59_name",
                        name: "Beneficiary",
                        editorType: "dxTextBox",
                        editorOptions: {
                            placeholder: "Ordering Customer",
                            showClearButton: true,
                            onValueChanged: function (d) {
                                if (d.value == "") {
                                    $("#formSearch").dxForm('instance').getEditor("f59_name").option("isValid", true);
                                }
                            }
                        },
                        label: {
                            text: "Ordering Customer"
                        }
                    }                    
                ]
            },
            {
                itemType: "group",
                colCount: 3,
                items: [
                    {
                        itemType: "group",
                        colCount: 2,
                        items: [
                            {
                                dataField: "SubmitBut",
                                editorType: "dxButton",
                                cssClass: "buttonForm",
                                editorOptions: {
                                    text: "Search",
                                    type: "default",
                                    width: "60%",
                                    onClick: function (s, e) {
                                        var method = "GET";
                                        var urlpib = routeApi + "PerhitunganRealisasiDenda/getSanksiDenda";
                                        flagProses = false;
                                        sendRequest2(urlpib, method);
                                    }
                                },
                                label: {
                                    text: "Search",
                                    visible: false
                                }
                            },
                            {
                                dataField: "resetBut",
                                editorType: "dxButton",
                                editorOptions: {
                                    text: "Reset",
                                    width: "60%",
                                    type: "default",
                                    onClick: function (s, e) {
                                        window.location.reload();
                                    }
                                },
                                label: {
                                    text: ":-",
                                    visible: false
                                }
                            },
                        ]
                    }
                ]
            }
        ]
    }).dxForm("instance");

    $("#gridContainer").dxDataGrid({
        dataSource: pagingSource(routeApi + "RawDataCapturingPel/getSwfMT103"),
        showBorder: true,
        columnAutoWidth: true,
        paging: {
            pageSize: 10
        },
        remoteOperations: {
            filtering: true,
            sorting: true,
            paging: true
        },
        pager: {
            allowedPageSizes: [10, 15, 20],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        scrolling: {
            columnRenderingMode: "virtual1"
        },
        selection: {
            mode: "multiple"
        },
        groupPanel: {
            visible: false
        },

        onToolbarPreparing: function (e) {
            //var dataGrid = e.component;
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
                        var DataSource = $("#gridContainer").dxDataGrid("instance").option("dataSource");

                        // var selected = $("#gridContainerPEB").dxDataGrid("instance").option("selectedRowKeys").length;
                        if (DataSource == null || DataSource == '') {
                            notify_warning(DATA_EKSPOR_KOSONG_MESSAGE);
                            //  e.preventDefault();
                            //alert("Data yang akan diekspor tidak ada");

                        }

                    }
                },
                {
                    text: texts.exportSelectedRows,
                    exportSelected: true,
                    icon: "exportselected",
                    onClick: function (e) {
                        var selected = $("#gridContainer").dxDataGrid("instance").option("selectedRowKeys").length;

                        if (selected == 0) {
                            notify_error(PILIH_DATA_MESSAGE);
                            e.preventDefault();

                        }

                    }
                },

            ];
            var downloadBut = ({
                widget: "dxButton",
                options: {
                    text: 'Download',
                    icon: "exportxlsx",
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
                                e.component.exportToExcel(item.itemData.exportSelected);
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
            toolbarItems.splice(index, 0, downloadBut);
        },
        "export": {
            enabled: true,
            fileName: "RDC - Data SWIFT Hasil Olahan",
            allowExportSelectedData: true,
            //customizeExcelCell: e => {
            //    e.numberFormat = "#,###";
            //    if (e.gridCell.rowType === 'data' && e.gridCell.column.dataType === 'date') {
            //        e.numberFormat = 'dd/MM/yyyy;@';
            //    }
            //}

        },
        showColumnLines: true,
        showRowLines: true,
        //  rowAlternationEnabled: true,

        columns: [
            {
                dataField: "f32a_tanggal",
                caption: "Tanggal Transaksi",
                alignment: "right",
                dataType: "date",
                format: DATE_FORMAT,
            }, {
                dataField: "f20",
                caption: "Sender Reference"
            }, {
                dataField: "f59",
                caption: "Beneficiary"
            }, {
                dataField: "f50k",
                caption: "Ordering Customer"
            }, {
                dataField: "f70_plus",
                caption: "Remittance Information (field 70 MT103)"
            }, {
                dataField: "flag_format",
                caption: "Status Feedback"
            }, {
                dataField: "f59_account_number",
                caption: "Nomor Rekening"
            }
        ],

        searchPanel: {
            visible: false,
            width: 240,
            placeholder: "Search...",
            location: 'after'
        },
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        headerFilter: {
            visible: false
        },

    });

});