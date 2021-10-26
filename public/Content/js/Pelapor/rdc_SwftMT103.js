
$(function () {

    //var formSearch = $("#formSearch").dxForm({
    //    colCount: 1,
    //    labelLocation: "top",
    //    alignItemLabels: false,
    //    alignItemLabelsInAllGroups: false,
    //    onInitialized: function (e) {
    //        formInstance = e.component;
    //    },
    //    items: [
    //        {
    //            itemType: "group",
    //            colCount: 2,
    //            items: [
    //                {
    //                    dataField: "f20",
    //                    name: "Sender Reference",
    //                    editorType: "dxTextBox",
    //                    editorOptions: {
    //                        placeholder: "Sender Reference",
    //                        showClearButton: true,
    //                        onValueChanged: function (d) {
    //                            if (d.value == "") {
    //                                $("#formSearch").dxForm('instance').getEditor("f20").option("isValid", true);
    //                            }
    //                        }
    //                    },
    //                    label: {
    //                        text: "Sender Reference"
    //                    }
    //                },
    //                {
    //                    dataField: "nama_bank",
    //                    name: "Nama Bank",
    //                    editorType: "dxTextBox",
    //                    editorOptions: {
    //                        readOnly:true,
    //                        showClearButton: true,
    //                        onValueChanged: function (d) {
    //                            if (d.value == "") {
    //                                $("#formSearch").dxForm('instance').getEditor("f20").option("isValid", true);
    //                            }
    //                        }
    //                    },
    //                    label: {
    //                        text: "Nama Bank"
    //                    }
    //                },
    //                {
    //                    dataField: "f59",
    //                    name: "Beneficiary",
    //                    editorType: "dxTextBox",
    //                    editorOptions: {
    //                        placeholder: "Beneficiary",
    //                        showClearButton: true,
    //                        onValueChanged: function (d) {
    //                            if (d.value == "") {
    //                                $("#formSearch").dxForm('instance').getEditor("f59").option("isValid", true);
    //                            }
    //                        }
    //                    },
    //                    label: {
    //                        text: "Beneficiary"
    //                    }
    //                },
    //                {
    //                    itemType: "group",
    //                    colCount: 2,
    //                    name: "TANGGAL",
    //                    items: [
    //                        {
    //                            dataField: "f32a_tanggal",
    //                            editorType: "dxDateBox",
    //                            editorOptions: {
    //                                displayFormat: DATE_FORMAT,
    //                                width: "100%",
    //                                placeholder: "Dari",
    //                                onValueChanged: function (e) {
    //                                    $("#formSearch").dxForm('instance').getEditor("f32a_tanggal").option("min", e.value);
    //                                }
    //                            },
    //                            label: {
    //                                text: "Tanggal Dari"
    //                            },

    //                        },
    //                        {
    //                            dataField: "f32a_tanggal",
    //                            editorType: "dxDateBox",
    //                            editorOptions: {
    //                                displayFormat: DATE_FORMAT,
    //                                width: "100%",
    //                                placeholder: "Sampai",
    //                                onValueChanged: function (e) {
    //                                    $("#formSearch").dxForm('instance').getEditor("f32a_tanggal").option("max", e.value);
    //                                }
    //                            },
    //                            label: {
    //                                text: "Tanggal Sampai",
    //                            }
    //                        }
    //                    ]
    //                },
    //                {
    //                    dataField: "f50k",
    //                    name: "Ordering Customer",
    //                    editorType: "dxTextBox",
    //                    editorOptions: {
    //                        placeholder: "Ordering Customer",
    //                        showClearButton: true,
    //                        onValueChanged: function (d) {
    //                            if (d.value == "") {
    //                                $("#formSearch").dxForm('instance').getEditor("f50k").option("isValid", true);
    //                            }
    //                        }
    //                    },
    //                    label: {
    //                        text: "Ordering Customer"
    //                    }
    //                },
    //                {
    //                    dataField: "flag_format",
    //                    name: "Status Format",
    //                    editorType: "dxTextBox",
    //                    editorOptions: {
    //                        placeholder: "Status Format",
    //                        showClearButton: true,
    //                        onValueChanged: function (d) {
    //                            if (d.value == "") {
    //                                $("#formSearch").dxForm('instance').getEditor("flag_format").option("isValid", true);
    //                            }
    //                        }
    //                    },
    //                    label: {
    //                        text: "Status Format"
    //                    }
    //                }
    //            ]
    //        },
    //        {
    //            itemType: "group",
    //            colCount: 3,
    //            items: [
    //                {
    //                    itemType: "group",
    //                    colCount: 2,
    //                    items: [
    //                        {
    //                            dataField: "SubmitBut",
    //                            editorType: "dxButton",
    //                            cssClass: "buttonForm",
    //                            editorOptions: {
    //                                text: "Search",
    //                                type: "default",
    //                                width: "60%",
    //                                onClick: function (s, e) {
    //                                    var f20 = $("#formSearch").dxForm('instance').getEditor("f20").option("value");
    //                                    f20 = f20 ? f20 : "";
    //                                    var f59 = $("#formSearch").dxForm('instance').getEditor("f59").option("value");
    //                                    f59 = f59 ? f59 : "";
    //                                    var f50k = $("#formSearch").dxForm('instance').getEditor("f50k").option("value");
    //                                    f50k = f50k ? f50k : "";
    //                                    var format = $("#formSearch").dxForm('instance').getEditor("flag_format").option("value");
    //                                    format = format ? format : "";
    //                                    $("#gridContainer").dxDataGrid("filter", [
    //                                        ["f20", "=", f20],
    //                                        "and",
    //                                        ["f59", "=", f59],
    //                                        "and",
    //                                        ["f50k", "=", f50k],
    //                                        "and",
    //                                        ["flag_format", "=", format]
    //                                    ]);
    //                                }
    //                            },
    //                            label: {
    //                                text: "Search",
    //                                visible: false
    //                            }
    //                        },
    //                        {
    //                            dataField: "resetBut",
    //                            editorType: "dxButton",
    //                            editorOptions: {
    //                                text: "Reset",
    //                                width: "60%",
    //                                type: "default",
    //                                onClick: function (s, e) {
    //                                    window.location.reload();
    //                                }
    //                            },
    //                            label: {
    //                                text: ":-",
    //                                visible: false
    //                            }
    //                        }
    //                    ]
    //                }
    //            ]
    //        }
    //    ]
    //}).dxForm("instance");

    $("#gridContainer").dxDataGrid({
        dataSource: pagingSource(routeApi + "RawDataCapturingPel/getSwfMT103"),
        showBorder: true,
        columnAutoWidth: true,
        paging: {
            pageSize: 10
        },
        remoteOperations: {
            filtering: true,
            sorting: false,
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
                        
                        if (DataSource == null || DataSource == '') {
                            notify_warning(DATA_EKSPOR_KOSONG_MESSAGE);
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
                }
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
            allowExportSelectedData: true
        },
        showColumnLines: true,
        showRowLines: true,
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
                caption: "Status Format"
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
        headerFilter: {
            visible: false
        },

    });

    $("#txtSdrRef").dxTextBox({
        placeholder: "Sender Reference"
    });

    $("#txtBeneficiary").dxTextBox({
        placeholder: "Beneficiary"
    });

    $("#txtOdrCus").dxTextBox({
        placeholder: "Ordering Customer"
    });

    $("#txtStsFrmt").dxTextBox({
        placeholder: "Status Format"
    });

    $("#btnSearch").dxButton({
        icon: "search",
        text: "Cari Data",
        type: "default",
        stylingMode: "outlined",
        onClick: function (Sdr1,Bnfcr1,Odr1,Frmt1) {
            var Sdr = $("#txtSdrRef").dxTextBox("instance").option("value");
            Sdr1 = "?f20=" + Sdr;
            var Bnfcr = $("#txtBeneficiary").dxTextBox("instance").option("value");
            Bnfcr1 = "?f59=" + Bnfcr;
            var Odr = $("#txtOdrCus").dxTextBox("instance").option("value");
            Odr1 = "?f50k=" + Odr;
            var Frmt = $("#txtStsFrmt").dxTextBox("instance").option("value");
            Frmt1 = "?flag_format=" + Frmt;

            $("#gridContainer").dxDataGrid("filter", [
                ["f20", "=", Sdr],
                "and",
                ["f59", "=", Bnfcr],
                "and",
                ["f50k", "=", Odr],
                "and",
                ["flag_format", "=", Frmt]
            ]);
        }
    });

    $("#btnReset").dxButton({
        icon: "revert",
        text: "Reset",
        type: "danger",
        stylingMode: "outlined",
        onClick: function (e) {
            $("#txtSdrRef").dxTextBox('instance').option('value', '');
            $("#txtBeneficiary").dxTextBox('instance').option('value', '');
            $("#txtOdrCus").dxTextBox('instance').option('value', '');
            $("#txtStsFrmt").dxTextBox('instance').option('value', '');
        }
    });

});