$(function () {
    let idTipe, inData;
    var getSelectedItemsKeys = function (items) {
        var result = [];
        items.forEach(function (item) {
            if (item.selected) {
                result.push(item.key);
            }
            if (item.items.length) {
                result = result.concat(getSelectedItemsKeys(item.items));
            }
        });
        return result;
    };

    $("#gridBox1").dxDropDownBox({
        deferRendering: false,
        valueExpr: "id_pel_pib",
        placeholder: "Pilih PPI",
        displayExpr: "no_pib",
        dataSource: new DevExpress.data.CustomStore({
            loadMode: "raw",
            key: "id_pel_pib",
            load: function () {
                return $.getJSON(routeApi + "DataChange/ComboPib1");
            }
        }),
        showClearButton: true,
        contentTemplate: function (e) {
            var $dataGrid1 = $("<div id=\"gb1DataGrid\">").dxDataGrid({
                dataSource: e.component.option("dataSource"),
                columns: [
                    {
                        caption: "Nomor PPI",
                        alignment: "left",
                        dataField: "no_pib"
                    }, {
                        caption: "Tanggal PPI",
                        alignment: "right",
                        dataField: "tanggal_pib",
                        dataType: "date",
                        format: "dd-MM-yyyy"
                    }, {
                        caption: "Nomor Invoice PPI",
                        alignment: "left",
                        dataField: "no_invoice_pib"
                    }
                ],
                hoverStateEnabled: true,
                paging: { enabled: true, pageSize: 10 },
                filterRow: { visible: true },
                scrolling: { mode: "infinite" },
                selection: { mode: "multiple" },
                height: 400,
                onSelectionChanged: function (selectedItems) {
                    var keys = selectedItems.selectedRowKeys,
                        hasSelection = keys.length;
                    e.component.option("value", hasSelection ? keys : null);
                    //e.component.close();
                }
            });
            dataGrid1 = $dataGrid1.dxDataGrid("instance");
            e.component.on("valueChanged", function (args) {
                dataGrid1.selectRows(args.value, false);
                changeSetting();
            });
            return $dataGrid1;
        },
        onOpened: function (e) {
            e.component.getDataSource().reload();
            $("#gb1DataGrid").dxDataGrid("instance").refresh();
        }

    });

    $("#gridBox2").dxDropDownBox({
        deferRendering: false,
        valueExpr: "id_pel_pib",
        placeholder: "Pilih PPI",
        displayExpr: "no_pib",
        dataSource: new DevExpress.data.CustomStore({
            loadMode: "raw",
            key: "id_pel_pib",
            load: function () {
                return $.getJSON(routeApi + "DataChange/ComboPib2");
            }
        }),
        showClearButton: true,
        contentTemplate: function (e) {
            var $dataGrid2 = $("<div id=\"gb2DataGrid\">").dxDataGrid({
                dataSource: e.component.option("dataSource"),
                columns: [
                    {
                        caption: "Nomor PPI",
                        alignment: "left",
                        dataField: "no_pib"
                    },
                    {
                        caption: "Tanggal Jatuh Tempo PPI",
                        alignment: "right",
                        dataField: "tanggal_jatuh_tempo_pib",
                        dataType: "date",
                        format: "dd-MM-yyyy"
                    },
                    {
                        caption: "Nomor Invoice PPI",
                        alignment: "left",
                        dataField: "no_invoice_pib"
                    }
                ],
                hoverStateEnabled: true,
                paging: { enabled: true, pageSize: 10 },
                filterRow: { visible: true },
                scrolling: { mode: "infinite" },
                selection: { mode: "multiple" },
                height: 400,
                onSelectionChanged: function (selectedItems) {
                    var keys = selectedItems.selectedRowKeys,
                        hasSelection = keys.length;
                    e.component.option("value", hasSelection ? keys : null);
                    //e.component.close();
                }
            });
            dataGrid2 = $dataGrid2.dxDataGrid("instance");
            e.component.on("valueChanged", function (args) {
                dataGrid2.selectRows(args.value, false);
                changeSetting();
            });
            return $dataGrid2;
        },
        onOpened: function (e) {
            e.component.getDataSource().reload();
            $("#gb2DataGrid").dxDataGrid("instance").refresh();
        }
    });

    $("#gridDataChange").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id_pel_pib_change",
            load: function () {
                return $.getJSON(routeApi + "DataChange/GetPib");
            },
            remove: function (key) {
                return publicActionRequestMethod(routeApi + "DataChange/DeletePib?id=" + key, "POST");
            }
        }),
        columnAutoWidth: true,
        showBorders: true,
        filterRow: { visible: true },
        pager: {
            allowedPageSizes: [5, 10, 20],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: { pageSize: 10 },
        columns: [
            {
                caption: "Status Perubahan",
                alignment: "left",
                dataField: "id_pel_change_pib", 
                lookup: {
                    dataSource: new DevExpress.data.CustomStore({
                        key: "id_pel_change",
                        load: function () {
                            return $.getJSON(routeApi + "DataChange/ComboPib3");
                        }
                    }),
                    displayExpr: "change_desc",
                    valueExpr: "id_pel_change"
                },
                width: 140
            }, {
                caption: "Nomor PPI",
                alignment: "left",
                dataField: "no_pib"
            }, {
                caption: "Jatuh Tempo Sebelum",
                alignment: "center",
                dataField: "old_due_date_pib",
                dataType: "date",
                format: "dd-MM-yyyy",
                width: 140
            }, {
                caption: "Jatuh Tempo Sesudah",
                dataField: "new_due_date_pib",
                alignment: "center",
                dataType: "date",
                format: "dd-MM-yyyy",
                width: 140
            }, {
                caption: "Tanggal Pengajuan",
                dataField: "req_date_pib",
                alignment: "center",
                dataType: "date",
                format: "dd-MM-yyyy",
                sortIndex: 0,
                sortOrder: "desc",
                width: 140
            }, {
                caption: "Lampiran Dokumen",
                dataField: "path_file_pib",
                alignment: "center",
                cellTemplate: function (container, opt) {
                    var uri = opt.value.substr(1, opt.value.length);
                    var link = '<a href="' + routeApp + uri + '" target="_blank">Lihat Dokumen</a>';
                    container.append(link);
                },
                width: 100
            }, {
                caption: "Status Dokumen",
                dataField: "status_pib",
                lookup: {
                    dataSource: [
                        { id: 0, text: "Menunggu Pengesahan" },
                        { id: 1, text: "Pengajuan Diterima" },
                        { id: 2, text: "Pengajuan Ditolak" }
                    ],
                    displayExpr: "text",
                    valueExpr: "id"
                },
                width: 170
            }, {
                caption: "Alasan Ditolak",
                dataField: "remark_pib"
            }
        ],
        wordWrapEnabled: true,
        editing: {
            allowDeleting: true,
            texts: {
                addRow: "Menambah Data",
                cancelAllChanges: "Batalkan Semua Perubahan",
                cancelRowChanges: "Batalkan",
                confirmDeleteMessage: "Apakah anda yakin ingin membatalkan pengajuan ini ?",
                confirmDeleteTitle: "Batalkan Pengajuan",
                deleteRow: "",
                editRow: "Sunting",
                saveAllChanges: "Simpan Perubahan",
                saveRowChanges: "Simpan",
                undeleteRow: "Batalkan",
                validationCancelChanges: "Batalkan Perubahan"
            }
        },
        onCellPrepared: function (e) {
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $del = e.cellElement.find(".dx-link-delete");
                $del.attr("title", "Batalkan Pengajuan").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-revert">');

                if (e.data.status_pib !== 0) $del.hide();
            }
        },
        export: {
            enabled: true,
            fileName: "Daftar Perubahan Data PPI"
        },
        onExporting: exp => {
            if ($("#gridDataChange").dxDataGrid('instance').getDataSource().items().length === 0) {
                toast_notify("Tidak Ada Data!", "warning");
                exp.cancel = true;
            }
        },
        onRowRemoving: r => {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk membatalkan data ini", "warning", 5000);
                e.cancel = true;
            }
        }
    });

    $("#dateDues").dxDateBox({
        type: "date",
        //max: new Date(),
        min: new Date(),
        displayFormat: "dd-MM-yyyy",
        placeholder: "Pilih Tanggal",
        showClearButton: true,
        useMaskBehavior: true,
        onValueChanged: function () {
            changeSetting(2);
        }
    });

    $("#uploadFile").dxFileUploader({
        allowCanceling: true,
        useDragOver: false,
        maxFileSize: 25000000,
        allowedFileExtensions: [".pdf", ".jpg", ".gif", ".png", ".bmp"],
        invalidMaxFileSizeMessage: "Dokumen melebihi batas maksimum yang diperbolehkan",
        invalidFileExtensionMessage: "Tipe dokumen tidak diperbolehkan",
        selectButtonText: "Pilih Dokumen",
        labelText: "",
        readyToUploadMessage: "Dokumen siap untuk diunggah",
        uploadedMessage: "Dokumen Berhasil Diunggah",
        uploadFailedMessage: "Unggah Dokumen Gagal",
        uploadMethod: "POST",
        uploadMode: viewOnly ? "useForm" : "instantly",
        onValueChanged: function (args) {
            args.component.option('uploadUrl', routeApi + 'DokumenPendukung/UploadDokupen');
        },
        onUploaded: function (args) {
            var respon = args.request.response;
            //use for single upload
            args.element.data("fName", JSON.parse(respon)[0].Name.toString());
            args.element.data("fPath", JSON.parse(respon)[0].Path.toString());
            args.element.data("fId", JSON.parse(respon)[0].id.toString());
            changeSetting();
        },
        onUploadError: function (args) {
            var xhttp = args.request;
            if (xhttp.readyState === 4 && xhttp.status === 0) {
                var msg = "Terjadi gangguan koneksi. Silahkan diulang kembali.";
                toast_notify(msg, "error", 2000);
                args.component.reset();
            }
        }
    });

    $("#btnCancel").click(function () {
        var confMes = "Apakah Anda yakin ingin membatalkan transaksi ini ? ";

        if (inData) {
            var confRes = DevExpress.ui.dialog.confirm(confMes, "Batalkan Transaksi ?");
            confRes.done(function (dialogResult) {
                if (dialogResult) {
                    window.location.reload();
                }
            });
        } else {
            $("#nav-main-tab").click();
        }
    });

    $("#btnReq1").dxButton({
        icon: "key",
        stylingMode: "outlined",
        text: "Pengajuan Buka Kunci",
        type: "default",
        onClick: e => {
            idTipe = 1;
            $("#formUnlock").show();
            $("#formDate").hide();
            $('#nav-form-tab').click();
        }
    });

    $("#btnReq2").dxButton({
        icon: "event",
        stylingMode: "outlined",
        text: "Pengajuan Ubah Tanggal Jatuh Tempo",
        type: "default",
        onClick: e => {
            idTipe = 2;
            $("#formUnlock").hide();
            $("#formDate").show();
            $('#nav-form-tab').click();
        }
    });

    $("#btnOke1").click(function () {
        if (viewOnly) {
            toast_notify("Anda tidak memiliki wewenang untuk pengajuan Buka Kunci", "warning", 5000);
        } else {
            if (inData) {
                this.disabled = true;
                this.firstElementChild.className = "spinner-border spinner-border-sm";
                SaveData(this);
            }
        }
    });

    $("#btnOke2").click(function () {
        if (viewOnly) {
            toast_notify("Anda tidak memiliki wewenang untuk pengajuan Ubah Tanggal Jatuh Tempo", "warning", 5000);
        } else {
            if (inData) {
                this.disabled = true;
                this.firstElementChild.className = "spinner-border spinner-border-sm";
                SaveData(this);
            }
        }
    });

    function changeSetting() {
        var obj = {};
        var id, tgl;
        var isUp = $("#uploadFile").data("fName") ? true : false;

        if (idTipe === 1) {
            id = $("#gridBox1").dxDropDownBox("instance").option("value").join();
            if ((id !== null && isUp) || viewOnly) {
                obj["id"] = id;
                obj["tipe"] = 1;
                obj["id_file"] = $("#uploadFile").data("fId");
                obj["nama_file"] = $("#uploadFile").data("fName");
                obj["path_file"] = $("#uploadFile").data("fPath");

                $("#btnOke1").show();
            } else {
                $("#btnOke1").hide();
            }
        }

        if (idTipe === 2) {
            var id2 = $("#gridBox2").dxDropDownBox("instance").option("value").join();

            var tglOpt = $("#dateDues").dxDateBox("instance").option();
            var newTgl = tglOpt.displayFormat === "dd-MM-yyyy" ? tglOpt.text.split("-").reverse().join("-") : tglOpt.text;
            //tgl = $("#dateDues").dxDateBox("instance").option("text");

            if ((id2 !== null && tgl !== "" && isUp) || viewOnly) {
                obj["id"] = id2;
                obj["tipe"] = 2;
                obj["new_due_date"] = newTgl;
                obj["id_file"] = $("#uploadFile").data("fId");
                obj["nama_file"] = $("#uploadFile").data("fName");
                obj["path_file"] = $("#uploadFile").data("fPath");

                $("#btnOke2").show();
            } else {
                $("#btnOke2").hide();
            }
        }
        inData = obj;
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
            if (result >= 1) {
                if (method === "POST") toast_notify("Data Berhasil diproses", "success");
            } else {
                if (method === "POST") toast_notify("Gagal Proses Data", "warning");
            }
        }).fail(function (xhr) {
            d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);
        });
        return d.promise();
    }

    function SaveData(elm) {
        //var datas = JSON.stringify(inData);
        var formData = new FormData();
        formData.append("data", JSON.stringify(inData));
        try {
            $.ajax(routeApi + "DataChange/SavePib", {
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                cache: false
                //method: "POST",
                //data: datas,
                //contentType: 'application/json; charset=utf-8',
                //cache: false
            }).done(function (result) {
                var msg = result[0]["msg"];
                if (msg === "OK") {
                    toast_notify("Transaksi berhasil disimpan!", "success", 2000);
                    window.location.reload();
                }
                else {
                    toast_notify(msg, "error");
                    elm.disabled = false;
                    elm.firstElementChild.className = "dx-icon dx-icon-check";
                }
            });
        } catch (e) {
            toast_notify(e.message, "error");
            elm.disabled = false;
            elm.firstElementChild.className = "dx-icon dx-icon-check";
        }
    }
});