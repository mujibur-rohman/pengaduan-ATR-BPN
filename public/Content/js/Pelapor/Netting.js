$(function () {
    $("#gridPelNetting").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_netting",
            load: function () {
                return $.getJSON(routeApi + "Netting/DataNetting");
            },
            remove: function (key) {
                return publicActionRequestMethod(routeApi + "Netting/RemoveNetting?id=" + key, "POST");
            }
        }),
        columnAutoWidth: true,
        showBorders: true,
        wordWrapEnabled: true,
        filterRow: { visible: true },
        scrolling: {
            columnRenderingMode: "virtual1",
            showScrollbar: "always"
        },
        pager: {
            allowedPageSizes: [10, 15, 25, 50],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: { pageSize: 10 },
        editing: {
            mode: "row",
            allowDeleting: true,
            useIcons: true,
            texts: {
                addRow: "",
                cancelRowChanges: "",
                confirmDeleteMessage: "Apakah anda ingin menghapus data ini?",
                confirmDeleteTitle: "",
                deleteRow: "",
                editRow: "",
                saveRowChanges: "",
                undeleteRow: "",
                validationCancelChanges: ""
            }
        },
        columns: [
            {
                caption: "Action",
                alignment: "center",
                type: "buttons",
                buttons: [
                    {
                        hint: "Lihat Detail Netting",
                        icon: "fas fa-eye",
                        visible: e => {
                            if ((e.row.data.id_status === 0 || e.row.data.id_status === 3) && !viewOnly) return false;
                            else return true;
                        },
                        onClick: e => {
                            window.location.href = "ViewNetting?id=" + e.row.data.id_pel_netting;
                        }
                    },
                    {
                        hint: "Edit Netting",
                        icon: "edit",
                        visible: e => {
                            if (e.row.data.id_status === 0 && !viewOnly) return true;
                            else if (e.row.data.id_status === 3 && !viewOnly) return true;
                            else return false;
                        },
                        onClick: e => {
                            window.location.href = "InputNetting?id=" + e.row.data.id_pel_netting;
                        }
                    },
                    {
                        hint: "Hapus Netting",
                        icon: "trash",
                        visible: e => {
                            if (e.row.data.id_status === 0 && !viewOnly) return true;
                            else if (e.row.data.id_status === 3 && !viewOnly) return true;
                            else return false;
                        },
                        onClick: e => {
                            $('#gridPelNetting').dxDataGrid('instance').deleteRow(e.row.rowIndex);
                        }
                    }
                ]
            },
            {
                caption: "Jenis Netting",
                dataField: "jenis_netting",
                alignment: "center",
                lookup: {
                    dataSource: [
                        { ref: "incoming" },
                        { ref: "outgoing" },
                        { ref: "OK" }
                    ],
                    displayExpr: "ref",
                    valueExpr: "ref"
                },
                width: 120
            },
            {
                caption: "Status Netting",
                dataField: "status_selesai_netting",
                alignment: "left",
                lookup: {
                    dataSource: [
                        { ref: "Devisa Kurang" },
                        { ref: "Devisa Lebih" },
                        { ref: "Devisa Sesuai" }
                    ],
                    displayExpr: "ref",
                    valueExpr: "ref"
                },
                width: 130
            },
            {
                caption: "Status Dokumen",
                alignment: "left",
                dataField: "id_status",
                lookup: {
                    dataSource: [
                        { id: 0, text: "Baru Dibuat" },
                        { id: 1, text: "Menunggu Review DP" },
                        { id: 2, text: "DP Sudah Disetujui" },
                        { id: 3, text: "DP Ditolak" }
                    ],
                    displayExpr: "text",
                    valueExpr: "id"
                },
                width: 200
            },
            {
                caption: "Alasan Ditolak",
                dataField: "comment"
            },
            {
                caption: "Dibuat Oleh",
                dataField: "created_user",
                width: 180
            },
            {
                caption: "Tanggal Dibuat",
                dataField: "created_date",
                dataType: "datetime",
                format: "dd-MM-yyyy HH:mm",
                width: 150
            }
        ],
        export: {
            enabled: false,
            fileName: "Laporan DHE Netting History",
            //allowExportSelectedData: true,
            customizeExcelCell: e => {
                e.numberFormat = "#,###";
                if (e.gridCell.rowType === 'data' && e.gridCell.column.dataType === 'date') {
                    e.numberFormat = 'dd/MM/yyyy;@';
                }
            }
        },
        //onExporting: function (e) {
        //    e.component.beginUpdate();
        //    e.component.columnOption("valuta_invoice_peb", "visible", false);
        //    e.component.columnOption("nilai_invoice_peb", "visible", false);
        //    e.component.columnOption("nilai_invoice_usd_peb", "visible", false);
        //},
        //onExported: function (e) {
        //    e.component.columnOption("valuta_invoice_peb", "visible", true);
        //    e.component.columnOption("nilai_invoice_peb", "visible", true);
        //    e.component.columnOption("nilai_invoice_usd_peb", "visible", true);
        //    e.component.endUpdate();
        //},
    });

    $("#NewNetting").dxButton({
        icon: "add",
        stylingMode: "outlined",
        text: "Buat Netting Baru",
        type: "default",
        onInitialized: e => viewOnly ? e.component.option("visible", false) : e.component.option("visible", true),
        onClick: e => {
            if (cekNew()) {
                e.component.option("disabled", true);
                e.component.option("icon", "fas fa-spin fa-spinner");
                e.component.option("text", "sedang diproses...");

                $.ajax(routeApi + "Netting/GetNewID", {
                    method: "POST",
                    contentType: 'application/json; charset=utf-8',
                    cache: false
                }).done(result => {
                    if (result[0].id_netting > 0) {
                        window.location.href = "InputNetting?id=" + result[0].id_netting;
                    } else {
                        toast_notify("Gagal membuat data baru", "warning", 5000);
                        setTimeout(function () {
                            e.component.option("disabled", false);
                            e.component.option("icon", "add");
                            e.component.option("text", "Buat Netting Baru");
                        }, 500);
                    }
                }).fail(result => {
                    toast_notify("Terjadi kesalahan pada saat memproses data", "error", 5000);
                    setTimeout(function () {
                        e.component.option("disabled", false);
                        e.component.option("icon", "add");
                        e.component.option("text", "Buat Netting Baru");
                    }, 500);
                });
            } else {
                toast_notify("Anda wajib menyelesaikan proses Netting yang \"Baru Dibuat\" sebelum membuat netting baru", "warning", 5000);
            }
        }
    });

    $('#btnDlExcelHis').dxButton({
        icon: "exportxlsx",
        stylingMode: "outlined",
        text: "Download Data",
        type: "success",
        elementAttr: {
            class: "btnMarginRight"
        },
        onClick: function () {
            $("#gridPelNetting").dxDataGrid("instance").exportToExcel();
        }
    });

    function cekNew() {
        var gridNet = $("#gridPelNetting").dxDataGrid("instance");
        var gridCount = gridNet.totalCount();
        var isOK = true;
        for (var i = 0; i < gridCount; i++) {
            if (gridNet.getDataSource().items()[i].id_status === 0) {
                isOK = false;
                break;
            }
        }
        return isOK;
    }

    function publicActionRequestMethod(url, method, data) {
        var d = $.Deferred();
        method = method || "GET";
        $.ajax(url, {
            method: method,
            data: data,
            cache: false,
            xhrFields: { withCredentials: true }
        }).done(function (result) {
            d.resolve(method === "GET" ? result.data : result);
            if (result === 1) {
                if (method === "POST") toast_notify("Data Berhasil diproses", "success");
            } else {
                if (method === "POST") toast_notify("Gagal Proses Data", "warning");
            }
        }).fail(function (xhr) {
            d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);
        });
        return d.promise();
    }

});