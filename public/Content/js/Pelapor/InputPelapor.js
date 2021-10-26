
DevExpress.localization.loadMessages({
    en: {
        "dxDataGrid-editingEditRow": "Ubah",
        "dxDataGrid-editingSaveRowChanges": "Simpan",
        "dxDataGrid-editingCancelRowChanges": "Batal",
        "dxDataGrid-editingDeleteRow": "Hapus"
    }
});

var npwp = "";
var gridMappingRole;
var DataRolePelapor = {
    store: new DevExpress.data.CustomStore({
        loadMode: "raw",
        load: function () {
            return $.ajax({
                url: routeApi + "DataRolePelapor/GetPelaporType",
                type: "GET",
                success: function (data) {
                }
            })

        }
    })
};
$(function () {

    var URL = routeApi + "DataPelaporAll/";
    var gridDataSourcePelapor = new DevExpress.data.CustomStore({
        load: function (load) {
            return $.ajax({
                url: URL + "GetPelaporProfile",
                type: "GET",
                success: function (data) {
                }
            })
        }
    });

    var gridPic = $('#gridContainer2').dxDataGrid({
        rowAlternationEnabled: true,
        columnAutoWidth: false,
        showBorders: true,
        visible: false,
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
            caption: "NPWP",
            alignment: "center",
            dataField: "NPWP_Perusahaan"
        }, {
            caption: "Username",
            alignment: "center",
            dataField: "UserName"
        },{
            caption: "Nama PIC",
            alignment: "center",
            dataField: "Nama"
        }, {
            caption: "Jabatan",
            alignment: "center",
            dataField: "Jabatan"
        }, {
            type: "buttons",
            buttons: [
                {
                    text: "Reset Password",
                    onClick: function (e) {
                        var confMes = "Apakah anda yakin? ";
                        var confRes = DevExpress.ui.dialog.confirm(confMes, "Reset Password");
                        confRes.done(function (dialogResult) {
                            if (dialogResult) {
                                $.ajax({
                                    url: routeApi + 'DataPelapor/ResetPic?username=' + e.row.data.UserName,
                                    type: 'GET',
                                    contentType: 'application/json; charset=utf-8',
                                    success: function (e) {
                                        DevExpress.ui.dialog.custom({
                                            title: "Reset Password",
                                            message: "Sukses",
                                            buttons: [{
                                                text: "Keluar",

                                            }]
                                        }).show()
                                    }, error: function (e) {
                                        DevExpress.ui.dialog.custom({
                                            title: "Reset Password",
                                            message: "Gagal",
                                            buttons: [{
                                                text: "Keluar",

                                            }]
                                        }).show()
                                    }
                                });
                                
                            }
                        });
                        
                    }
                }
            ]
        }]
    }).dxDataGrid("instance");

    var gridMapRole = $('#gridContainer3').dxDataGrid({
        rowAlternationEnabled: true,
        columnAutoWidth: false,
        showBorders: true,
        visible: false,
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
            caption: "Role Pelapor",
            dataField: "TypeNameId",
            lookup: {
                dataSource: DataRolePelapor,
                valueExpr: "pelapor_type_id",
                displayExpr: "typename"
            }
        }]
    }).dxDataGrid("instance");

    $("#gridContainer").dxDataGrid({
        rowAlternationEnabled: true,
        dataSource: gridDataSourcePelapor,
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
        paging: {
            pageSize: 8
        },
        onInitialized: function (e) {
            username.toLowerCase();
            if (username.search("view") == 3) {
                e.component.deleteColumn("Mapping Role");
                e.component.deleteColumn("Lihat Contact Person");
                e.component.deleteColumn("Masuk Ke Pelapor");



                // e.component.columnOption("Mapping Role", "visible", false);
            }
        },
        columns: [ {
            caption: "NPWP",
            alignment: "center",
            dataField: "NPWP"
        }, {
            caption: "Nama Pelapor",
            alignment: "center",
            dataField: "Nama"
            }, {
            caption: "Mapping Role",
            alignment: "center",
            type: "buttons",
            buttons: [{
                text: "Mapping Role",
                onClick: function (e) {
                    gridMappingRole = new DevExpress.data.CustomStore({
                        load: function (load) {
                            return $.ajax({
                                url: routeApi + "DataRolePelapor/GetMapRole?npwp=" + e.row.data.NPWP,
                                type: "GET",
                                success: function (data) {
                                }
                            })
                        },
                        insert: function (data) {
                            var value = $(this).serialize();
                            $.ajax({
                                url: routeApi + 'DataRolePelapor/CheckMapRoleByNpwp?typenameid=' + data.TypeNameId + '&npwp=' + npwp,
                                type: 'GET',
                                success: function (e) {
                                    if (e != -1) {
                                        if (e > 0) {
                                            DevExpress.ui.notify("Role tidak boleh sama", "warning");
                                        } else {
                                            var formData = new FormData();
                                            formData.append('data', JSON.stringify(data));
                                            $.ajax({
                                                url: routeApi + 'DataRolePelapor/InsertMapRole?npwp=' + npwp,
                                                type: "POST",
                                                data: formData,
                                                contentType: false,
                                                processData: false,
                                                success: function (e) {
                                                    DevExpress.ui.notify("Sukses Tambah Data Mapping Role", "success", 2000);
                                                    gridMapRole.refresh();
                                                },
                                                error: function (e) {
                                                    DevExpress.ui.notify("Gagal Tambah Data Mapping Role", "warning", 2000);
                                                }
                                            });
                                        }
                                    } else {
                                        DevExpress.ui.notify("Gagal Tambah Data Mapping Role", "warning", 2000);
                                    }
                                },
                                error: function () {
                                    DevExpress.ui.notify("Gagal Tambah Data Mapping Role", "warning", 2000);
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
                                url: routeApi + 'DataRolePelapor/CheckMapRoleByNpwp?typenameid=' + data.TypeNameId + '&npwp=' + npwp,
                                type: 'GET',
                                success: function (e) {
                                    if (e != -1) {
                                        if (e > 0) {
                                            DevExpress.ui.notify("Role tidak boleh sama", "warning");
                                        } else {
                                            var formData = new FormData();
                                            formData.append('data', JSON.stringify(data));
                                            $.ajax({
                                                url: routeApi + 'DataRolePelapor/UpdateMapRole',
                                                type: "POST",
                                                data: formData,
                                                contentType: false,
                                                processData: false,
                                                success: function (e) {
                                                    DevExpress.ui.notify("Sukses Ubah Data Mapping Role", "success", 2000);
                                                    gridMapRole.refresh();
                                                },
                                                error: function (e) {
                                                    DevExpress.ui.notify("Gagal Ubah Data Mapping Role", "warning", 2000);
                                                }
                                            });
                                        }
                                    } else {
                                        DevExpress.ui.notify("Gagal Ubah Data Mapping Role", "warning", 2000);
                                    }
                                    
                                },
                                error: function () {
                                    DevExpress.ui.notify("Gagal Ubah Data Mapping Role", "warning", 2000);
                                }
                            })
                        },
                        remove: function (key) {
                            $.ajax({
                                url: routeApi + 'DataRolePelapor/DeleteMapRole?mapTypeName_Id=' + key.MapTypeName_Id,
                                type: "POST",
                                contentType: 'application/json; charset=utf-8',
                                success: function (e) {
                                    DevExpress.ui.notify("Sukses Hapus Data Mapping Role", "success", 2000);
                                    gridMapRole.refresh();
                                },
                                error: function (e) {
                                    DevExpress.ui.notify("Gagal Hapus Data Mapping Role", "warning", 2000);
                                }
                            });
                                
                        }
                    });
                    npwp = e.row.data.NPWP;
                    e.component.option("visible", false);
                    gridMapRole.option("visible", true);
                    gridMapRole.option("dataSource", gridMappingRole);
                    
                }
            }]
        },{
            caption: "Lihat Contact Person",
            alignment: "center",
            type: "buttons",
            buttons: [
                {
                    text: "Lihat Contact Person",
                    onClick: function (e) {
                         $.ajax({
                             url: routeApi + "DataPelapor/GetpicByNpwp?npwp=" + e.row.data.NPWP,
                             type: "GET",
                             success: function (data) {
                                 e.component.option("visible", false);
                                 gridPic.option("visible", true);
                                 gridPic.option("dataSource", data);
                            }
                        });
                    }
                }
            ]
        },{
            caption: "Masuk Ke Pelapor",
            alignment: "center",
            type: "buttons",
            buttons: [
                {
                    text: "Masuk Ke Pelapor",
                    onClick: function (e) {
                        var user = get(routeApp+"Pelapor/Pelapor/getSession");
                        npwp = e.row.data.NPWP;

                        window.location.href = routeApp +'Pelapor/LoginPel?npwp='+npwp+'&user='+user
                        //popupPel.show();
                    }
                }
            ]
        },{
            caption: "View Ke Pelapor",
            alignment: "center",
            type: "buttons",
            buttons: [
                {
                    text: "View Ke Pelapor",
                    onClick: function (e) {
                        var user = get(routeApp +"Pelapor/Pelapor/getSession");
                        npwp = e.row.data.NPWP;

                        window.location.href = routeApp +'Pelapor/PelIsView?npwp='+npwp+'&user='+user
                        //popupPel.show();
                    }
                }
            ]
        }]
    });

    var popupPel = $('#popup_login').dxPopup({
        width: 400,
        height: 350,
        showTitle: true,
        title: "Verifikasi",
        visible: false,
        dragEnabled: false,
        closeOnOutsideClick: true,
        contentTemplate: function (e) {
            var Tb_verify = $("<div id='TB_verify' style='margin-bottom: 10px'></div>");
            Tb_verify.dxTextBox({
                  hint: "Password"
            });
            var Btn_login = $("<div id='Btn_login'></div>");
            Btn_login.dxButton({
                text: "Masuk",
                type: "default",
                width: "100%",
                onClick: function () {
                    var user = get("/Pelapor/Pelapor/getSession");
                    var npwp = npwp;

                    window.location.href = routeApp + 'Pelapor/LoginPel'
                }
            });
            e.append(Tb_verify,"<br/>", Btn_login);
        }
    }).dxPopup("instance");
   
});
