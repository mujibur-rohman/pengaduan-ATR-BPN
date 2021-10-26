DevExpress.localization.loadMessages({
    en: {
        "dxDataGrid-editingEditRow": "Ubah",
        "dxDataGrid-editingSaveRowChanges": "Simpan",
        //  "dxDataGrid-editingCancelRowChanges": "Cancel*",
        "dxDataGrid-editingDeleteRow": "Hapus"
    }
});


var URL = routeApi + "DataChildMenuManagement/"
var gridDataSource1 = new DevExpress.data.CustomStore({
    load: function (load) {
        return $.ajax({
            url: URL + "GetDataChildMenu?formmenuid=" + formmenuid,
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
            url: URL + "InsertDataChildMenu?moduleid=" + moduleid + "&parentmenuid=" + formmenuid,
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
            url: URL + "UpdateDataChildMenu",
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
            url: URL + "DeleteDataChildMenu?formmenuid=" + key.FormMenuId,
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
        columnAutoWidth: false,
        showBorders: true,
        filterRow: { visible: true },
        editing: {
            mode: "popup",
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            form: {
                items: [{
                    itemType: "group",
                    colCount: 2,
                    colSpan: 2,
                    items: ["ListingNo", "Urls", "FormMenuName", "FormMenuDesc"]
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
        }, {
            caption: "Listing No",
            alignment: "center",
            dataField: "ListingNo",
            visible: false
        }, {
            caption: "Nama Menu",
            alignment: "center",
            dataField: "FormMenuName"
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
    });

    $("#back").dxButton({
        text: "Kembali",
        type: "success",
        onClick: function () {
            window.location.href = routeApp + 'Pelapor/MenuManagement';
        }
    });
})