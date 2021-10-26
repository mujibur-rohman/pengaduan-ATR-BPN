var ListModul = [{
    "Form": "Pelapor",
    "items": ["Pelapor A", "Pelapor B", "Pelapor C"]
}, {
    "Form": "Monitoring",
    "items": ["Monitoring A", "Monitoring B", "Monitoring C"]
}];

var ListTransaksi= ["Eksportir", "Importir"];


DevExpress.localization.loadMessages({
    en: {
        "dxDataGrid-editingEditRow": "Ubah",
        "dxDataGrid-editingSaveRowChanges": "Simpan",
        "dxDataGrid-editingCancelRowChanges": "Batal",
        "dxDataGrid-editingDeleteRow": "Hapus"
    }
});

var URLRoleInternal = routeApi + "DataRoleInternal/";
var RoleInternal = new DevExpress.data.CustomStore({
    load: function (load) {
        return $.ajax({
            url: URLRoleInternal + "GetRoleInternal",
            type: "GET",
            success: function (data) {

            }
        })
    },
    insert: function (data) {
        var value = $(this).serialize();
        insertGrid(URLRoleInternal +'InsertRoleInternal', 'Role Internal', data);

    },
    update: function (data, values) {
        reloadDataOnNextCall = true,
            Object.keys(values).map(function (key, index) {
                if (typeof data[key] !== 'undefined') {
                    data[key] = values[key];
                }
            });
        values.IS_HEADER = 0;
        //console.log(data);

        insertGrid(URLRoleInternal +'UpdateRoleInternal', 'Role Internal', data);

    },
    remove: function (key) {
        $.ajax({
            url: URLRoleInternal +'CheckMapRoleInternal?roleid=' + key.RoleId,
            type: 'GET',
            success: function (e) {
                if (e > 0) {
                    DevExpress.ui.notify("Data masih terpakai", "warning");
                } else {
                    deleteGrid(URLRoleInternal + 'DeleteRoleInternal?roleid=' + key.RoleId, 'Role Pelapor');
                }
            }
        })
    }
});

var URL = routeApi + "DataRolePelapor/";
var RolePelapor = new DevExpress.data.CustomStore({
    load: function (load) {
        return $.ajax({
            url: URL + "GetPelaporType",
            type: "GET",
            success: function (data) {

            }
        })
    },
    insert: function (data) {
        var value = $(this).serialize();
        $.ajax({
            url: routeApi + 'DataRolePelapor/InsertPelaporType',
            type: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function (e) {
                DevExpress.ui.notify("Sukses Tambah Data Role Pelapor", "success", 2000);
            },
            error: function (e) {
                DevExpress.ui.notify("Gagal Tambah Data Role Pelapor", "warning", 2000);
            }
        });
        
    },
    update: function (data, values) {
        reloadDataOnNextCall = true,
            Object.keys(values).map(function (key, index) {
                if (typeof data[key] !== 'undefined') {
                    data[key] = values[key];
                }
            });
        values.IS_HEADER = 0;
        //console.log(data);
        $.ajax({
            url: routeApi + 'DataRolePelapor/UpdatePelaporType',
            type: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function (e) {
                DevExpress.ui.notify("Sukses Ubah Data Role Pelapor", "success", 2000);
            },
            error: function (e) {
                DevExpress.ui.notify("Gagal Ubah Data Role Pelapor", "warning", 2000);
            }
        });
        //insertGrid('/simodis/api/DataRolePelapor/UpdatePelaporType', 'Role Pelapor', data);
        
    },
    remove: function (key) {
        $.ajax({
            url: URL + 'CheckMapRole?typenameid=' + key.pelapor_type_id,
            type: 'GET',
            success: function (e) {
                if (e > 0) {
                    DevExpress.ui.notify("Data masih terpakai", "warning");
                } else {
                    deleteGrid('/simodis/api/DataRolePelapor/DeletePelaporType?pelapor_type_id=' + key.pelapor_type_id, 'Role Pelapor');
                }
            }
        })
    }
});



$(function () { 
    $("#btnAdd").dxButton({
        stylingMode: "contained",
        text: "Add Role",
        type: "default",
        onClick: function () {
            window.location.href = '~/../AddRoleManagementInternal'
        }

    });

    $("#gridContainerRolePelapor").dxDataGrid({
        rowAlternationEnabled: true,
        dataSource: RolePelapor,
        columnAutoWidth: false,
        showBorders: true,
        filterRow: { visible: true },
        pager: {
            allowedPageSizes: [5, 8, 15, 30],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
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
                    items: ["typename"]
                }]
            }
        },
        paging: {
            pageSize: 8
        },
        onEditingStart: function (e) {
            e.component.columnOption("pelapor_type_id", "allowEditing", false);
            e.component.columnOption("listing_no", "allowEditing", false);
        },
        columns: [{
            allowGrouping: false,
            dataField: "pelapor_type_id",
            caption: "ID Role",
            visible: false
            
        },{
            allowGrouping: false,
            dataField: "listing_no",
            alignment: "center",
            caption: "No",
            width: "10%"
        }, {
            caption: "Nama Role",
            dataField: "typename",
            alignment: "center",
        }]
    });

    $("#gridContainerRoleInternal").dxDataGrid({
        rowAlternationEnabled: true,
        dataSource: RoleInternal,
        columnAutoWidth: false,
        showBorders: true,
        filterRow: { visible: true },
        editing: {
            allowDeleting: true,
            allowUpdating: true,
            allowAdding: true
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
                dataField: "ID",
                alignment: "center",
                caption: "RoleId",
                visible: false
        }, {
                caption: "Nama Role",
                alignment: "center",
                dataField: "RoleName"
        }, {
                caption: "MapRole",
                alignment: "center",
                dataField: "MapRoleFormMenu",
                visible: false
        }]
    });

    $("#txtNamaRole").dxTextBox({
        placeholder: "Masukkan  Nama Role..."
    });

    $("#ListTransaksi").dxList({
        dataSource: ListTransaksi,
        selectionMode: "multiple",
        showSelectionControls: true


    });
   
    $("#ListModul").dxList({
        dataSource: ListModul,
        height: "100%",
        grouped: true,
        collapsibleGroups: true,
        groupTemplate: function (data) {
            return $("<div>" + data.Form + "</div>");
        },
        selectionMode: "multiple",
        showSelectionControls: true,
        pageLoadMode: "scrollBottom"
    });

    $("#btnSave").dxButton({
        type: "success",
        text: "Simpan"
    });

});