DevExpress.localization.loadMessages({
    en: {
        "dxDataGrid-editingEditRow": "Ubah",
        "dxDataGrid-editingSaveRowChanges": "Simpan",
        //  "dxDataGrid-editingCancelRowChanges": "Cancel*",
        "dxDataGrid-editingDeleteRow": "Hapus"
    }
});
$(function () {
    var jsoDoc;
    var isUploaded = false;
    var isInput = false;
    var URL = routeApi + "DataPelaporProfileApprove/";
    
    var Jenis = [{
        "ID": 0,
        "Jenis": "Umum"
    }, {
        "ID": 1,
        "Jenis": "Khusus"
    }];

    var sts = [{
        "ID": 1,
        "sts": "Aktif"
    }, {
        "ID": 0,
        "sts": "Tidak Aktif"
    }];

    var SandiBank = {
        store: new DevExpress.data.CustomStore({
            loadMode: "raw",
            load: function () {
                // Returns an array of objects that have the following structure:
                // { id: 1, name: "John Doe" }
                return $.ajax({

                    //data: data,
                    url: routeApi + "DataSandiBank/GetSandiBank",
                    type: "GET",
                    //key: "Kode_Bank",
                    success: function (data) {
                    }
                })

            }
        })
    };

    var gridDataSource1 = new DevExpress.data.CustomStore({
        load: function (load) {
            return $.ajax({
                url: URL + "GetPelaporTemp",
                type: "GET",
                success: function (data) {
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
            if (isView == 1) {
                if (jsoDoc[0].status_approval_id != 2) {
                    var formData = new FormData();
                    formData.append('data', JSON.stringify(data));
                    $.ajax({
                        url: URL + 'UpdatePICTemp',
                        method: 'POST',
                        contentType: false,
                        processData: false,
                        data: formData,
                        success: function (e) {
                            DevExpress.ui.notify("Data PIC berhasil di ubah", "success");
                        },
                        error: function (e) {
                            DevExpress.ui.notify("Data PIC gagal di ubah", "warning");
                        }
                    })
                } else {
                    DevExpress.ui.notify("Sedang dalam proses approval", "warning");
                }
            } else {
                DevExpress.ui.notify("Anda tidak memiliki wewenang untuk melakukan perubahan data ini", "warning", 5000);
            }
            
            
        }
    });

    var gridDataSource2 = new DevExpress.data.CustomStore({
        load: function (load) {
            return $.ajax({
                url: routeApi + "DataRekening/GetRekeningTemp",
                type: "GET",
                success: function (data) {
                }
            })
        },
        insert: function (data) {
            var value = $(this).serialize();
            if (isView == 1) {
                if (jsoDoc[0].status_approval_id != 2) {
                    var formData = new FormData();
                    formData.append('data', JSON.stringify(data));
                    $.ajax({
                        url: routeApi + 'DataRekening/InsertRekeningTemp',
                        method: 'POST',
                        contentType: false,
                        processData: false,
                        data: formData,
                        success: function (e) {
                            var style = "";
                            if (e.Result_Code == 1) {
                                style = "success";
                            } else {
                                style = "warning";
                            }
                            DevExpress.ui.notify(e.Result_Message, style);
                            //RekeningGrid.refresh();
                        },
                        error: function (e) {
                            DevExpress.ui.notify("Nomor rekening gagal di tambah", "warning");
                        }
                    })
                } else {
                    DevExpress.ui.notify("Sedang dalam proses approval", "warning");
                }
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
                if (jsoDoc[0].status_approval_id != 2) {
                    var formData = new FormData();
                    formData.append('data', JSON.stringify(data));
                    $.ajax({
                        url: routeApi + 'DataRekening/EditRekeningTemp',
                        method: 'POST',
                        contentType: false,
                        processData: false,
                        data: formData,
                        success: function (e) {
                            var style = "";
                            if (e.Result_Code == 1) {
                                style = "success";
                            } else {
                                style = "warning";
                            }
                            DevExpress.ui.notify(e.Result_Message, style);
                            //RekeningGrid.refresh();
                        },
                        error: function (e) {
                            DevExpress.ui.notify("Nomor rekening gagal di ubah", "warning");
                        }
                    })
                } else {
                    DevExpress.ui.notify("Sedang dalam proses approval", "warning");
                }
            } else {
                DevExpress.ui.notify("Anda tidak memiliki wewenang untuk melakukan perubahan data ini", "warning", 5000);
            }
        },
        remove: function (key) {
            if (isView == 1) {
                if (jsoDoc[0].status_approval_id != 2) {
                    $.ajax({
                        url: routeApi + 'DataRekening/DeleteRekeningTemp?IdPelRekeningBank=' + key.IdPelRekeningBank,
                        method: 'POST',
                        contentType: false,
                        success: function (e) {
                            var style = "";
                            if (e.Result_Code == 1) {
                                style = "success";
                            } else {
                                style = "warning";
                            }
                            DevExpress.ui.notify(e.Result_Message, style);
                            //RekeningGrid.refresh();
                        },
                        error: function (e) {
                            DevExpress.ui.notify("Nomor rekening gagal di hapus", "warning");
                        }
                    })

                } else {
                    DevExpress.ui.notify("Sedang dalam proses approval", "warning");
                }
            } else {
                DevExpress.ui.notify("Anda tidak memiliki wewenang untuk melakukan perubahan data ini", "warning", 5000);
            }
            
        }
    });

    var formPelapor = $("#formPelapor").dxForm({
        labelLocation: "top",
        colCount: 2,
        items: [{
            dataField: "NPWP",
            label: {
                text: "NPWP"
            },
            editorOptions: {
                readOnly: true,
                width: "25%"
            }
        },  {
            dataField: "No_telp",
            label: {
                text: "Nomor Telepon"
            },
            name: "No_telp",
            validationRules: [{
                type: 'pattern',
                pattern: '^\\d+$',
                message: "Nomor telepon harus angka"
            }],
            editorOptions: {
                onInput: function (e) {
                    isInput = true;
                    var inputElement = e.jQueryEvent.target;
                    if (inputElement.value.length > 15)
                        inputElement.value = inputElement.value.slice(0, 15);
                },
                width: "25%"
            }
        }, {
            dataField: "Nama",
            editorOptions: {
                readOnly: true,
                width: "35%"
            }
        },  {
            dataField: "No_fax",
            label: {
                text: "Nomor Faksimile"
            },
            name: "No_fax",
            validationRules: [{
                type: 'pattern',
                pattern: '^\\d+$',
                message: "Nomor Faksimile harus angka"
            }],
            editorOptions: {
                onInput: function (e) {
                    isInput = true;
                    var inputElement = e.jQueryEvent.target;
                    if (inputElement.value.length > 15)
                        inputElement.value = inputElement.value.slice(0, 15);
                },
                width: "25%"
            }
        },  {
            dataField: "Alamat",
            editorType: "dxTextArea",
            name: "Alamat",
            editorOptions: {
                height: 75,
                width: "50%",
                onInput: function (e) {
                    isInput = true;
                },
            },
            colSpan:2
        },{
            dataField: "Kode_pos",
            name: "Kode_pos",
            label: {
                text: "Kode Pos"
            },
            validationRules: [{
                type: 'pattern',
                pattern: '^\\d+$',
                message: "Kode pos harus angka"
            }],
            editorOptions: {
                onInput: function (e) {
                    isInput = true;
                    var inputElement = e.jQueryEvent.target;
                    if (inputElement.value.length > 6)
                        inputElement.value = inputElement.value.slice(0, 6);
                },
                width: "18%"
            },
            colSpan:2
        },{
            itemType: "group",
            caption: "CONTACT PERSON",
            colSpan:2,
            items: [
                {
                    name: "PicGrid",
                    editorType: "dxDataGrid",
                    editorOptions: {
                        //rowAlternationEnabled: true,
                        allowColumnResizing: true,
                        dataSource: gridDataSource1,
                        columnAutoWidth: true,
                        scrolling: { columnRenderingMode: "virtual1" },
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
                        //belum fix
                        //onInitialized: function (e) {
                        //    if (isView == 1) {
                        //        e.component.option("editing", {
                        //            mode: "table",
                        //            allowUpdating: true,
                        //            texts: {
                        //                addRow: "Menambah Data",
                        //                cancelAllChanges: "Batalkan Semua Perubahan",
                        //                cancelRowChanges: "",
                        //                confirmDeleteMessage: "<center>Anda akan menghapus contact person<br>Apakah anda yakin?</center>",
                        //                confirmDeleteTitle: "",
                        //                deleteRow: "",
                        //                editRow: "",
                        //                saveAllChanges: "Simpan Perubahan",
                        //                saveRowChanges: " ",
                        //                undeleteRow: "Batalkan",
                        //                validationCancelChanges: "Batalkan Perubahan"
                        //            }
                        //        });
                        //    }

                        //},
                        editing: {
                            mode: "table",
                            allowUpdating: true,
                            texts: {
                                addRow: "Menambah Data",
                                cancelAllChanges: "Batalkan Semua Perubahan",
                                cancelRowChanges: "",
                                confirmDeleteMessage: "<center>Anda akan menghapus contact person<br>Apakah anda yakin?</center>",
                                confirmDeleteTitle: "",
                                deleteRow: "",
                                editRow: "",
                                saveAllChanges: "Simpan Perubahan",
                                saveRowChanges: " ",
                                undeleteRow: "Batalkan",
                                validationCancelChanges: "Batalkan Perubahan"
                            }
                        }, 
                        onEditingStart: function (e) {
                            e.component.columnOption("UserName", "allowEditing", false);
                            e.component.columnOption("Nama", "validationRules", [{
                                type: "required",
                                message: "Nama harus diisi"
                            }]);
                            e.component.columnOption("Nama", "allowEditing", true);
                            e.component.columnOption("Jabatan", "allowEditing", true);
                            e.component.columnOption("Email", "allowEditing", true);
                            e.component.columnOption("NomorHp", "allowEditing", true);
                            e.component.columnOption("Status", "allowEditing", true);
                            if (e.data.IsMaster == 1) {
                                e.component.columnOption("Status", "allowEditing", false);
                            }

                            if (e.data.Status != 1) {
                                e.component.columnOption("Nama", "allowEditing", false);
                                e.component.columnOption("Nama", "validationRules", null);
                                e.component.columnOption("Jabatan", "allowEditing", false);
                                e.component.columnOption("Email", "allowEditing", false);
                                e.component.columnOption("NomorHp", "allowEditing", false);
                            }
                            
                        },
                        columns: [
                            {
                                caption: "Username",
                                alignment: "left",
                                dataField: "UserName"

                            }, {
                                caption: "Nama",
                                alignment: "left",
                                dataField: "Nama",
                                editorOptions: {
                                    onInput: function (e) {
                                        var inputElement = e.jQueryEvent.target;
                                        if (inputElement.value.length > 100)
                                            inputElement.value = inputElement.value.slice(0, 100);
                                    },
                                }
                            }, {
                                caption: "Jabatan",
                                alignment: "left",
                                dataField: "Jabatan",
                                editorOptions: {
                                    onInput: function (e) {
                                        var inputElement = e.jQueryEvent.target;
                                        if (inputElement.value.length > 30)
                                            inputElement.value = inputElement.value.slice(0, 30);
                                    },
                                }
                            }, {
                                caption: "Email",
                                alignment: "left",
                                dataField: "Email",
                                validationRules: [{
                                    type: "email",
                                    message: "Email tidak valid"
                                }],
                                editorOptions: {
                                    onInput: function (e) {
                                        var inputElement = e.jQueryEvent.target;
                                        if (inputElement.value.length > 50)
                                            inputElement.value = inputElement.value.slice(0, 50);
                                    },
                                }
                            }, {
                                caption: "Nomor Hp",
                                alignment: "left",
                                dataField: "NomorHp",
                                validationRules: [{
                                    type: 'pattern',
                                    pattern: '^\\d+$',
                                    message: "Kolom harus angka"
                                }],
                                editorOptions: {
                                    onInput: function (e) {
                                        var inputElement = e.jQueryEvent.target;
                                        var word = inputElement.value.substr(inputElement.value.length - 1, 1);
                                        var match = new RegExp('^[0-9]$').test(word);
                                        if (!match) {
                                            inputElement.value = inputElement.value.slice(0, inputElement.value.length-1);
                                        }
                                        if (inputElement.value.length > 15)
                                            inputElement.value = inputElement.value.slice(0, 15);
                                    },
                                }

                            }, {
                                caption: "Status",
                                alignment: "center",
                                dataField: "Status",
                                lookup: {
                                    dataSource: sts,
                                    valueExpr: "ID",
                                    displayExpr: "sts"

                                },
                                validationRules: [{
                                    type: "required",
                                    message: "Status harus diisi"
                                }]

                            }
                        ]
                    }
                }
            ]
        }, {
            itemType: "group",
            caption: "ACCOUNT OFFICER Eksportir",
            colSpan:2,
            colCount: 4,
            items: [
                {
                    dataField: "Nama_AO",
                    label: {
                        text: "Nama"
                    },
                    editorOptions: {
                        readOnly: true
                    }
                }, {
                    dataField: "No_Telp_AO",
                    label: {
                        text: "Nomor Telepon"
                    },
                    editorOptions: {
                        readOnly: true
                    }
                }, {
                    dataField: "Email_AO",
                    label: {
                        text: "Email"
                    },
                    editorOptions: {
                        readOnly: true
                    }
                }]

        },{
            itemType: "group",
            caption: "ACCOUNT OFFICER Importir",
            colSpan:2,
            colCount: 4,
            items: [
                {
                    dataField: "Nama_AO_Importir",
                    label: {
                        text: "Nama"
                    },
                    editorOptions: {
                        readOnly: true
                    }
                }, {
                    dataField: "No_Telp_AO_Importir",
                    label: {
                        text: "Nomor Telepon"
                    },
                    editorOptions: {
                        readOnly: true
                    }
                }, {
                    dataField: "Email_AO_Importir",
                    label: {
                        text: "Email"
                    },
                    editorOptions: {
                        readOnly: true
                    }
                }]

        }, {
            itemType:"group",
            caption:"REKENING BANK",
            colSpan:2,
            items:[
                {
                    name: "RekeningGrid",
                    editorType: "dxDataGrid",
                    editorOptions: {
                        filterRow: { visible: true },
                        pager: {
                            allowedPageSizes: [5, 8, 15, 30],
                            showInfo: true,
                            showNavigationButtons: true,
                            showPageSizeSelector: true,
                            visible: true
                        },
                        rowAlternationEnabled: true,
                        dataSource: gridDataSource2,
                        columnAutoWidth: true,
                        showBorders: true,
                        height: "100%",
                        width: "100%",
                        editing: {
                            mode: "table",
                            allowAdding: true,
                            allowUpdating: true,
                            allowDeleting: true,
                            texts: {
                                addRow: "Menambah Data",
                                cancelAllChanges: "Batalkan Semua Perubahan",
                                cancelRowChanges: "",
                                confirmDeleteMessage: "<center>Apakah anda yakin?</center>",
                                confirmDeleteTitle: "",
                                deleteRow: "",
                                editRow: "",
                                saveAllChanges: "Simpan Perubahan",
                                saveRowChanges: " ",
                                undeleteRow: "Batalkan",
                                validationCancelChanges: "Batalkan Perubahan"
                            }
                        },
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

                                //$edi.on("click",
                                //    function () {
                                //        setTimeout(function () {
                                //            e.component.refresh();
                                //        }, 500);
                                //    });
                            }
                            if (e.column.type === "buttons" && e.rowType === "data") {
                                var $edi = e.cellElement.find(".dx-link-cancel");
                                $edi.attr("title", "Batalkan").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-revert">');
                            }
                        },
                        columns: [
                            {
                                caption: "No Rekening",
                                alignment: "left",
                                dataField: "NomorRekening",
                                validationRules: [{
                                    type: 'pattern',
                                    pattern: '^\\d+$',
                                    message: "Kolom harus angka"
                                }, {
                                    type: "required",
                                    message: "Nomor rekening harus diisi"
                                }],
                                editorOptions: {
                                    onInput: function (e) {
                                        var inputElement = e.jQueryEvent.target;
                                        if (inputElement.value.length > 30)
                                            inputElement.value = inputElement.value.slice(0, 30);
                                    },
                                }

                            }, {
                                caption: "Nama Rekening",
                                alignment: "left",
                                dataField: "NamaRekening",
                                validationRules: [{
                                    type: "required",
                                    message: "Nama rekening harus diisi"
                                }],
                            }, {
                                caption: "Nama Bank",
                                alignment: "left",
                                dataField: "SandiBank",
                                lookup: {
                                    dataSource: SandiBank,
                                    valueExpr: "SANDI_BANK",
                                    displayExpr: "NAMA_BANK"

                                }

                            }, {
                                caption: "Kategori",
                                alignment: "center",
                                dataField: "KategoriRekening",
                                lookup: {
                                    dataSource: Jenis,
                                    valueExpr: "ID",
                                    displayExpr: "Jenis"

                                },
                                validationRules: [{
                                    type: 'required',
                                    message: "Kategori rekening harus diisi"
                                }]

                            }
                        ]
                    }
                }
            ]
        }, {
            dataField: "Status_approval",
            label: {
                text: "Status Approval"
            },
            editorOptions: {
                readOnly: true,
                width: "35%"
            }
        }]
    }).dxForm("instance");


    
    
    var btn_save = $("#save").dxButton({
        text: "Save",
        type: "success",
        useSubmitBehavior: true,
        onClick: function (params) {
            if (isView == 1) {
                var isEditingRekening = formPelapor.getEditor("RekeningGrid").getController("editing").isEditing();
                var isEditingPic = formPelapor.getEditor("PicGrid").getController("editing").isEditing();
                if (isEditingRekening == false && isEditingPic == false) {
                    var isvalid = formPelapor.validate().isValid;
                    if (isvalid) {
                        let values = {};
                        $.each($('#form').serializeArray(), function (i, field) {
                            values[field.name] = field.value;
                        });
                        values.IS_HEADER = 1;

                        var formData = new FormData();
                        formData.append('data', JSON.stringify(values));
                        $.ajax({
                            url: routeApi + 'DataPelaporProfileApprove/UpdateProfile',
                            method: 'POST',
                            contentType: false,
                            processData: false,
                            data: formData,
                            success: function (e) {
                                myDialogSave.show();
                            }
                        })
                    } else {
                        DevExpress.ui.notify("Terdapat kolom yang tidak sesuai.", "warning");
                    }
                } else {
                    //Tidak bisa menympan transaksi, masih ada data yang masih belum disimpan
                    DevExpress.ui.notify("Terdapat kolom yang belum disimpan", "warning");
                }
            } else {
                DevExpress.ui.notify("Anda tidak memiliki wewenang untuk membatalkan data ini", "warning", 5000);
            }
            
        }
    }).dxButton("instance");
    var myDialogSave = DevExpress.ui.dialog.custom({
        title: "Ubah Profil",
        message: "Sukses simpan perubahan profil",
        buttons: [{
            text: "Keluar",
            onClick: function () {
                window.location.href = routeApp + 'Pelapor/EditPelapor'
            }
        }]
    });

    
    

    var btn_cetak = $("#download").dxButton({
        text: "Unduh Surat Pernyataan",
        type: "success",
        onClick: function (params) {
            params.component.option("disabled", true);
            $.ajax({
                url: routeApi + 'FileProfile/PrintFile',
                success: function (result) {
                    if (result.ResultCode == 1) {
                        downloadFromHref('/Simodis/Pelapor/PrintPelapor?nameFile=' + result.ResultMessage);
                    } else {
                        DevExpress.ui.notify(result.ResultMessage, "warning");
                    }
                    params.component.option("disabled", false);
                }
            })
        }
    }).dxButton("instance");
    

    var btn_submit = $("#submit").dxButton({
        text: "Submit",
        type: "success",
        onClick: function (params) {
            if (isView == 1) {
                var isEditingRekening = formPelapor.getEditor("RekeningGrid").getController("editing").isEditing();
                var isEditingPic = formPelapor.getEditor("PicGrid").getController("editing").isEditing();
                if (isEditingRekening == false && isEditingPic == false && isInput == false) {
                    var isvalid = formPelapor.validate().isValid;
                    if (isvalid) {
                        if (jsoDoc[0].Link_surat_pernyataan != null || isUploaded == true) {
                            var confMes = "Apakah anda yakin? ";
                            var confRes = DevExpress.ui.dialog.confirm(confMes, "Submit");
                            confRes.done(function (dialogResult) {
                                if (dialogResult) {
                                    $.ajax({
                                        url: routeApi + 'DataRekening/CheckRekeningByNpwp?npwp=' + jsoDoc[0].NPWP,
                                        method: 'GET',
                                        contentType: 'application/json; charset=utf-8',
                                        success: function (e) {
                                            if (e > 0) {
                                                $.ajax({
                                                    url: routeApi + 'DataPelaporProfileApprove/SubmitApproval',
                                                    method: 'POST',
                                                    contentType: false,
                                                    success: function (e) {
                                                        myDialogSubmit.show();
                                                    }
                                                })
                                            } else {
                                                DevExpress.ui.notify("Rekening tidak boleh kosong", "warning");
                                            }
                                        }
                                    })

                                }
                            });
                        } else {
                            DevExpress.ui.notify("File upload masih kosong", "warning");
                        }
                    } else {
                        DevExpress.ui.notify("Terdapat kolom yang tidak sesuai.", "warning");
                    }
                } else {
                    DevExpress.ui.notify("Terdapat kolom yang belum disimpan", "warning");
                }
            } else {
                DevExpress.ui.notify("Anda tidak memiliki wewenang untuk membatalkan data ini", "warning", 5000);
            }
            
            
        }
    }).dxButton("instance");
    var myDialogSubmit = DevExpress.ui.dialog.custom({
        title: "Ubah Profil",
        message: "Sukses submit perubahan profil",
        buttons: [{
            text: "Keluar",
            onClick: function () {
                window.location.href = routeApp + 'Pelapor/EditPelapor'
            }
        }]
    });
    
    $.ajax({
        url: routeApi + "DataPelaporProfileApprove/GetPelaporProfileApproval",
        dataType: 'text',
        success: function (myData) {
            jsoDoc = $.parseJSON(myData);
            
            var file_uploder;
            formPelapor.option("formData", jsoDoc[0]);
            if (jsoDoc[0].Link_surat_pernyataan == null) {
                file_uploder = $("#upload").dxFileUploader({
                    name: "FileSurat",
                    width: "30%",
                    allowCanceling: true,
                    allowedFileExtensions: [".png", ".jpg", ".pdf"],
                    maxFileSize: 25000000,
                    uploadMode: (isView == 1) ? "instantly" : "useForm",
                    invalidFileExtensionMessage: "Ekstensi File Harus Berupa JPG Atau PNG atau PDF",
                    invalidMaxFileSizeMessage: "Dokumen melebihi batas maksimum",
                    labelText: "Masukan File Approval Disini",
                    uploadUrl: routeApi + "FileProfile/InsertFile",
                    uploadMethod: "POST",
                    onUploaded: function (e) {
                        isUploaded = true;
                        var formData = new FormData();
                        var file = e.file;
                        formData.append('file', file);
                    }
                }).dxFileUploader("instance");
            } else {
                file_uploder = $("#upload").dxButton({
                    text: jsoDoc[0].Link_surat_pernyataan.split('/')[3],
                    stylingMode: "text",
                    onClick: function () {
                        var confMes = "Hapus file? ";
                        var confRes = DevExpress.ui.dialog.confirm(confMes, "Hapus");
                        confRes.done(function (dialogResult) {
                            if (dialogResult) {
                                $.ajax({
                                    url: routeApi + 'FileProfile/DeleteFile?strFileName=' + jsoDoc[0].Link_surat_pernyataan,
                                    method: 'POST',
                                    success: function (e) {
                                        window.location.href = routeApp + 'Pelapor/EditPelapor'
                                    }
                                })
                            }
                        });
                    }
                }).dxButton("instance");
            }
            if (isView == 0) {
                formPelapor.itemOption("No_telp", "editorOptions", {
                    readOnly: true,
                    width: "25%"
                });
                formPelapor.itemOption("No_fax", "editorOptions", {
                    readOnly: true,
                    width: "25%"
                });
                formPelapor.itemOption("Alamat", "editorOptions", {
                    readOnly: true,
                    height: 75,
                    width: "50%"
                });
                formPelapor.itemOption("Kode_pos", "editorOptions", {
                    readOnly: true,
                    width: "18%"
                });

                //belum fix
                //file_uploder.option("disabled", true);
                //btn_save.option("visible", false);
                //btn_submit.option("visible", false);
                //btn_cetak.option("visible", false);
            } 
            if (jsoDoc[0].status_approval_id == 2) {
                file_uploder.option("disabled", true);
                btn_save.option("disabled", true);
                btn_submit.option("disabled", true);
                btn_cetak.option("disabled", true);
            } else if (jsoDoc[0].status_approval_id == 1) { 
                file_uploder.option("disabled", true);
                btn_submit.option("disabled", true);
                btn_cetak.option("disabled", true);
            }
        }
    });
});

