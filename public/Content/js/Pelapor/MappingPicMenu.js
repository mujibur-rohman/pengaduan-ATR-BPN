DevExpress.localization.loadMessages({
    en: {
        "dxDataGrid-editingEditRow": "Ubah",
        "dxDataGrid-editingSaveRowChanges": "Simpan",
        //  "dxDataGrid-editingCancelRowChanges": "Cancel*",
        "dxDataGrid-editingDeleteRow": "Hapus"
    }
});

var URL = routeApi + "DataMappingMenuPic/"

var DataMenu = {
    store: new DevExpress.data.CustomStore({
        loadMode: "raw",
        load: function () {
            return $.ajax({
                url: URL + "GetMenu",
                type: "GET",
                success: function (data) {
                    console.log(data);
                }
            })

        }
    })
};

var gridDataSource1 = new DevExpress.data.CustomStore({
    load: function (load) {
        return $.ajax({
            url: URL + "GetMappingMenuPic?picid=" + picid,
            type: "GET",
            success: function (data) {
                //console.log(data);
            }
        })
    },
    insert: function (data) {
        var value = $(this).serialize();
        console.log(data);
        if (isView == 1) {
            var formData = new FormData();
            formData.append('data', JSON.stringify(data));
            $.ajax({
                url: URL + "InsertMappingMenuPic?pelpicid=" + picid,
                method: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                success: function (e) {
                    if (e != null) {
                        DevExpress.ui.notify(e.Result_Message, "success");
                    } else {
                        DevExpress.ui.notify("Menu PIC gagal di tambah", "error");
                    }
                },
                error: function (e) {
                    DevExpress.ui.notify("Menu PIC gagal di tambah", "error");
                }
            })
        } else {
            DevExpress.ui.notify("Anda tidak memiliki wewenang untuk melakukan perubahan data ini", "warning", 5000);
        }
    },
    update: function (data, values) {
        reloadDataOnNextCall = true,
            Object.keys(values).map(function (key, index) {
                if (typeof data[key] !== 'undefined') {
                    data[key] = values[key];
                }
            });
        values.IS_HEADER = 0;
        if (isView == 1) {
            var formData = new FormData();
            formData.append('data', JSON.stringify(data));
            $.ajax({
                url: URL + "UpdateMappingMenuPic",
                method: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                success: function (e) {
                    if (e != null) {
                        DevExpress.ui.notify(e.Result_Message, "success");
                    } else {
                        DevExpress.ui.notify("Menu PIC gagal di ubah", "error");
                    }
                },
                error: function (e) {
                    DevExpress.ui.notify("Menu PIC gagal di ubah", "warning");
                }
            })
        } else {
            DevExpress.ui.notify("Anda tidak memiliki wewenang untuk melakukan perubahan data ini", "warning", 5000);
        }
    },
    remove: function (key) {
        if (isView == 1) {
            $.ajax({
                url: URL + "DeleteMappingMenuPic?mappicmenuid=" + key.MappingPicMenuId,
                method: 'POST',
                contentType: 'application/json; charset=utf-8',
                success: function (e) {
                    if (e != null) {
                        DevExpress.ui.notify(e.Result_Message, "success");
                    } else {
                        DevExpress.ui.notify("Menu PIC gagal di hapus", "error");
                    }
                },
                error: function (e) {
                    DevExpress.ui.notify("Menu PIC gagal di hapus", "warning");
                }
            })
        } else {
            DevExpress.ui.notify("Anda tidak memiliki wewenang untuk melakukan perubahan data ini", "warning", 5000);
        }
    }
});

$(function () {

    var menu = $("#menu").dxDataGrid({
        rowAlternationEnabled: true,
        dataSource: gridDataSource1,
        //columnAutoWidth: true,
        showBorders: true,
        height: "100%",
        width: "100%",
        onCellPrepared: function (e) {
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $del = e.cellElement.find(".dx-link-delete");
                $del.attr("title", "Hapus Data").attr("style", "min-width:20px;padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-trash">');
            }
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $edi = e.cellElement.find(".dx-link-edit");
                $edi.attr("title", "Ubah Data").attr("style", "min-width:20px;padding: 5px 7px; display: in-line; border:none; ").append('<i class="dx-icon dx-icon-edit">');

            }
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $edi = e.cellElement.find(".dx-link-save");
                $edi.attr("title", "Simpan Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-save">');
            }
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $edi = e.cellElement.find(".dx-link-cancel");
                $edi.attr("title", "Batal Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-revert">');
            }
        },
        columnHidingEnabled: false,
        filterRow: { visible: true },
        pager: {
            allowedPageSizes: [5, 8, 15, 30],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: {
            pageSize: 8
        },
        columns: [{
            caption: "Id",
            alignment: "center",
            dataField: "MappingPicMenuId",
            visible: false
        }, {
            caption: "Menu",
            alignment: "center",
            dataField: "MappingRoleMenuId",
            lookup: {
                dataSource: DataMenu,
                valueExpr: "Gen_Map_Role_Formmenu_Id",
                displayExpr: "FormMenuName"
            }
        }]
    }).dxDataGrid("instance");

    $.ajax({
        url: routeApi + "DataPelapor/GetPicMaster?picid=" + picid,
        dataType: 'text',
        success: function (myData) {
            if (myData == 1) {
                menu.option("editing", "none");
            } else {
                menu.option("editing", {
                    mode: "row",
                    allowAdding: true,
                    allowUpdating: true,
                    allowDeleting: true,
                    texts: {
                        addRow: "Menambah Data",
                        cancelAllChanges: "Batalkan Semua Perubahan",
                        cancelRowChanges: "",
                        confirmDeleteMessage: "<center>Anda akan menghapus menu.<br>Apakah anda yakin?</center>",
                        confirmDeleteTitle: "",
                        deleteRow: "",
                        editRow: "",
                        saveAllChanges: "Simpan Perubahan",
                        saveRowChanges: " ",
                        undeleteRow: "Batalkan",
                        validationCancelChanges: "Batalkan Perubahan"
                    }
                });
            }
            
            
        }
    });
})