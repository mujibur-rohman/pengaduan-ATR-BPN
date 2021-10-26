DevExpress.localization.loadMessages({
    en: {
        "dxDataGrid-editingEditRow": "Ubah",
        "dxDataGrid-editingSaveRowChanges": "Simpan",
        //  "dxDataGrid-editingCancelRowChanges": "Cancel*",
        "dxDataGrid-editingDeleteRow": "Hapus"
    }
});

var URLMenu = routeApi + "DataRoleInternal/"

var DataModule = {
    store: new DevExpress.data.CustomStore({
        loadMode: "raw",
        load: function () {
            return $.ajax({
                url: URLMenu + "GetRoleInternal",
                type: "GET",
                success: function (data) {
                    //console.log(data);
                }
            })

        }
    })
};

var URL = routeApi + "DataMappingRoleMenu/"
var gridDataSource1 = new DevExpress.data.CustomStore({
    load: function (load) {
        return $.ajax({
            url: URL + "GetMappingRoleMenu?formmenuid=" + formmenuid,
            type: "GET",
            success: function (data) {
                console.log(data);
            }
        })
    },
    insert: function (data) {
        var value = $(this).serialize();
        //console.log(data);
        insertGrid(URL + "InsertMappingRoleMenu?formmenuid=" + formmenuid, 'Mapping Role Menu', data);
    },
    update: function (data, values) {
        reloadDataOnNextCall = true,
            Object.keys(values).map(function (key, index) {
                if (typeof data[key] !== 'undefined') {
                    data[key] = values[key];
                }
            });
        values.IS_HEADER = 0;
        console.log(data);
        insertGrid(URL + "UpdateMappingRoleMenu?formmenuid=" + formmenuid, 'Mapping Role Menu', data);
    },
    remove: function (key) {
        console.log(key.MapRoleMenuId);
        deleteGrid(URL + "DeleteMappingRoleMenu?maproleMenuId=" + key.MapRoleMenuId, 'Mapping Role Menu');
             
    }
});

$(function () {

    $("#RoleMenuData").dxDataGrid({
        rowAlternationEnabled: true,
        dataSource: gridDataSource1,
        columnAutoWidth: true,
        showBorders: true,
        filterRow: { visible: true },
        editing: {
            mode: "row",
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
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
            caption: "Mapping Menu Id",
            alignment: "center",
            dataField: "MapRoleMenuId",
            visible: false
        }, {
            caption: "Role",
            alignment: "center",
            dataField: "RoleId",
            lookup: {
                dataSource: DataModule,
                valueExpr: "RoleId",
                displayExpr: "RoleName"
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