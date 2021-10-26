DevExpress.localization.loadMessages({
    en: {
        "dxDataGrid-editingEditRow": "Ubah",
        "dxDataGrid-editingSaveRowChanges": "Simpan",
        //  "dxDataGrid-editingCancelRowChanges": "Cancel*",
        "dxDataGrid-editingDeleteRow": "Hapus"
    }
});

var URLModule = routeApi + "DataPelaporModule/"

var DataModule = {
    store: new DevExpress.data.CustomStore({
        loadMode: "raw",
        load: function () {
            return $.ajax({
                url: URLModule + "GetModule",
                type: "GET",
                success: function (data) {
                    //console.log(data);
                }
            })

        }
    })
};

var URL = routeApi + "DataMenuManagement/"
var gridDataSource1 = new DevExpress.data.CustomStore({
    load: function (load) {
        return $.ajax({
            url: URL + "GetDataMenu",
            type: "GET",
            success: function (data) {
                console.log(data);
            }
        })
    },
    insert: function (data) {
        var value = $(this).serialize();
        //console.log(data);

        $.ajax({
            url: URL + "InsertDataMenu",
            method: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (e) {
                if (e != null) {
                    DevExpress.ui.notify(e.Result_Message, "success");
                } else {
                    DevExpress.ui.notify("Menu Menu gagal di tambah", "error");
                }
            },
            error: function (e) {
                DevExpress.ui.notify("Menu Menu gagal di tambah", "error");
            }
        })
    },
    update: function (data, values) {
        reloadDataOnNextCall = true,
        Object.keys(values).map(function (key, index) {
            if (typeof data[key] !== 'undefined') {
                data[key] = values[key];
            }
        });
        values.IS_HEADER = 0;
        $.ajax({
            url: URL + "UpdateDataMenu",
            method: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (e) {
                if (e != null) {
                    DevExpress.ui.notify(e.Result_Message, "success");
                } else {
                    DevExpress.ui.notify("Menu Menu gagal di ubah", "error");
                }
            },
            error: function (e) {
                DevExpress.ui.notify("Menu Menu gagal di ubah", "error");
            }
        })
    },
    remove: function (key) {
        $.ajax({
            url: URL + "DeleteDataMenu?formmenuid=" + key.FormMenuId,
            method: 'DELETE',
            success: function (e) {
                if (e != null) {
                    DevExpress.ui.notify(e.Result_Message, "success");
                } else {
                    DevExpress.ui.notify("Menu Menu gagal di hapus", "error");
                }
            },
            error: function (e) {
                DevExpress.ui.notify("Menu Menu gagal di hapus", "error");
            }
        })
    }
});


$(function () {
    
    $("#menuData").dxDataGrid({
        rowAlternationEnabled: true,
        dataSource: gridDataSource1,
        columnAutoWidth: true,
        showBorders: true,
        filterRow: { visible: true },
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
        editing: {
            mode: "popup",
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            texts: {
                addRow: "Menambah Data",
                cancelAllChanges: "Batalkan Semua Perubahan",
                cancelRowChanges: "",
                confirmDeleteMessage: "<center>Anda akan membatalkan PPI.<br>Apakah anda yakin?</center>",
                confirmDeleteTitle: "",
                deleteRow: "",
                editRow: "",
                saveAllChanges: "Simpan Perubahan",
                saveRowChanges: " ",
                undeleteRow: "Batalkan",
                validationCancelChanges: "Batalkan Perubahan"
            },
            form: {
                items: [{
                    itemType: "group",
                    colCount: 2,
                    colSpan: 2,
                    items: ["ListingNo", "Urls", "FormMenuName", "ModuleId", "FormMenuDesc"]
                }]
            }
        },
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
            caption: "Menu Id",
            alignment: "center",
            dataField: "FormMenuId",
            visible: false
        },{
            caption: "Listing No",
            alignment: "center",
            dataField: "ListingNo",
            visible: false
        },{
            caption: "Nama Menu",
            alignment: "center",
            dataField: "FormMenuName"
        }, {
            caption: "Modul",
            alignment: "center",
            dataField: "ModuleId",
            lookup: {
                dataSource: DataModule,
                valueExpr: "Module_Id",
                displayExpr: "Module_Name"
            }
        }, {
            caption: "Deskripsi",
            alignment: "center",
            dataField: "FormMenuDesc"
        }, {
            caption: "Urls",
            alignment: "center",
            dataField: "Urls",
            visible: false
        }, {
            caption: "Parent Id",
            alignment: "center",
            dataField: "ParentMenuId",
            visible: false
        }, {
            caption: "Menu Child",
            dataField: "FormMenuId",
            alignment: "center",
            cellTemplate: function (container, opt) {

                var link;
                 link = '<a href="/Simodis/Pelapor/ChildMenuManagement?formmenuid=' + opt.value + '">Lihat</a>';

                container.append(link);
            }
        }, {
            caption: "Mapping Role Menu",
            dataField: "FormMenuId",
            alignment: "center",
            cellTemplate: function (container, opt) {

                var link;
                link = '<a href="/Simodis/Pelapor/MappingRoleMenu?formmenuid=' + opt.value + '">Lihat</a>';

                container.append(link);
            }
        }]
    })
})

