

var formNIK = $("#formNIK").dxForm({
    // formData: routeApi + "DataManagementPelapor/GetPelapor",
    //  formData: employee,
    labelLocation: "top",
    items: [{
        dataField: "NPWP",
        editorOptions: {
            readOnly: true,
            width: "18%"
        }
    }, {
        dataField: "Nama",
        editorOptions: {
            readOnly: true,
            width: "25%"
        }
    }, {
        dataField: "Alamat",
        editorType: "dxTextArea",
        editorOptions: {
            readOnly: true,
            height: 75,
            width: "50%"
        }
    }, {
        dataField: "KodePos",
        editorOptions: {
            readOnly: true,
            width: "10%"
        }
    }, {
        dataField: "NoTelp",
        label: {
            text: "Nomor Telepon"
        },
        editorOptions: {
            readOnly: true,
            width: "18%"
        }
    }, {
        dataField: "NoFax",
        label: {
            text: "Nomor Faksimile"
        },
        editorOptions: {
            readOnly: true,
            width: "18%"
        }
    }]
}).dxForm("instance");

$.ajax({
    url: routeApi + "DataPelaporNIK/GetPelaporNIK",
    dataType: 'text',
    success: function (myData) {

        var jsoDoc = $.parseJSON(myData);
        formNIK.option("formData", jsoDoc[0]);

        //    alert(myData)
    }
});


var formNPWP = $("#formNPWP").dxForm({
    //formData: routeApi + "DataManagementPelapor/GetPelapor",
    //  formData: employee,
    labelLocation: "top",
    items: [{
        dataField: "NPWP",
        editorOptions: {
            readOnly: true,
            width: "18%"
        }
    }, {
        label: { text: "Kantor Pelayanan Pajak (KPP)" },
        dataField: "KPP",

        editorOptions: {
            readOnly: true,
            width: "25%"
        }
    }, {
        dataField: "Nama",
        editorOptions: {
            readOnly: true,
            width: "25%"
        }
    }, {
        dataField: "Alamat",
        editorType: "dxTextArea",
        editorOptions: {
            readOnly: true,
            height: 75,
            width: "50%"
        }
    }]
}).dxForm("instance");

$.ajax({
    url: routeApi + "DataPelaporNPWP/GetPelaporNPWP",
    dataType: 'text',
    success: function (myData) {
        var jsoDoc = $.parseJSON(myData);
        formNPWP.option("formData", jsoDoc[0]);
        //    alert(myData)
    }
});


var formPEB = $("#formPEB").dxForm({
    //formData: routeApi + "DataManagementPelapor/GetPelapor",
    //  formData: employee,
    labelLocation: "top",
    items: [{
        dataField: "NPWP",
        editorOptions: {
            readOnly: true,
            width: "18%"
        }
    }, {
        dataField: "Nama",
        editorOptions: {
            readOnly: true,
            width: "25%"
        }
    }, {
        dataField: "Alamat",

        editorOptions: {
            readOnly: true,
            height: 75,
            width: "50%"
        }
    }]
}).dxForm("instance");


$.ajax({
    url: routeApi + "DataPelaporPEB/GetPelaporPEB",
    dataType: 'text',
    success: function (myData) {
        var jsoDoc = $.parseJSON(myData);
        formPEB.option("formData", jsoDoc[0]);
        //    alert(myData)
    }
});

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
                    // console.log(data);
                }
            })

        }
    })
};

var Jenis = ['Umum', 'Khusus'];

var Jenis = [{
    "ID": 0,
    "Jenis": "Umum"
}, {
    "ID": 1,
    "Jenis": "Khusus"
}];

var gridDataSource2 = new DevExpress.data.CustomStore({
    load: function (load) {
        return $.ajax({
            url: routeApi + "DataRekening/GetRekening",
            type: "GET",
            success: function (data) {
                // console.log(data);
            }
        })
    }
});

var formPelapor = $("#formPelapor").dxForm({
    //formData: routeApi + "DataManagementPelapor/GetPelapor",
    //  formData: employee,
    labelLocation: "top",
    items: [{
        name: "Surat Pernyataan",
        label: {
            text: "Surat Pernyataan"
        },
        template: function (data, $itemElement) {
            $("<div>").appendTo($itemElement).dxButton({
                icon: "save",
                text: "Unduh Surat Pernyataan(Disetujui)",
                stylingMode: "outlined",
                type: "default",
                //    value: isOrderShown,
                onClick: function (e) {

                    var link = $("#formPelapor").dxForm("instance").option("formData").Link_Surat_pernyataan;

                    if (link == '' || link == null) {
                        toast_notify("Belum ada Surat Pernyataan yang disetujui", "error", 2000);
                    }
                    else {
                        var FileName = link.split('/');
                        FileName = FileName[3];


                        //var isOrderShown = e.value;
                        downloadFromHref('/Simodis/Pelapor/DownloadSuratPernyataan?nameFile=' + FileName);
                        //  form.itemOption("order", "visible", isOrderShown);

                    }


                }
            });
        }
    }, {
        dataField: "NIK",
        label: {
            text: "NIK"
        },
        editorOptions: {
            readOnly: true,
            width: "18%"
        }
    }, {
        dataField: "NPWP",
        label: {
            text: "NPWP"
        },
        editorOptions: {
            readOnly: true,
            width: "18%"
        }
    }, {
        dataField: "Nama",
        editorOptions: {
            readOnly: true,
            width: "25%"
        }
    }, {
        dataField: "Alamat",
        editorType: "dxTextArea",
        editorOptions: {
            readOnly: true,
            height: 75,
            width: "50%"
        }
    }, {
        dataField: "Kode_Pos",
        label: {
            text: "Kode Pos"
        },
        editorOptions: {
            readOnly: true,
            width: "18%"
        }
    }, {
        dataField: "No_telp",
        label: {
            text: "Nomor Telepon"
        },
        editorOptions: {
            readOnly: true,
            width: "18%"
        }
    }, {
        dataField: "No_fax",
        label: {
            text: "Nomor Faksimile"
        },
        editorOptions: {
            readOnly: true,
            width: "18%"
        }
    }, {
        itemType: "group",
        caption: "Admin / Contact Person - 1 ",
        colCount: 4,
        items: [{
            dataField: "NamaPIC1",
            label: {
                text: "Nama"
            },
            editorOptions: {
                readOnly: true
            }
        }, {
            dataField: "JabatanPIC1",
            label: {
                text: "Jabatan"
            },
            editorOptions: {
                readOnly: true
            }
        }, {
            dataField: "EmailPIC1",
            label: {
                text: "Email"
            },
            editorOptions: {
                readOnly: true
            }
        }, {
            dataField: "NoHPPIC1",
            label: {
                text: "Nomor Handphone"
            },
            editorOptions: {
                readOnly: true
            }
        }]
    }, {
        itemType: "group",
        caption: "Contact Person - 2",
        colCount: 4,
        items: [{
            dataField: "NamaPIC2",
            label: {
                text: "Nama"
            },
            editorOptions: {
                readOnly: true
            }
        }, {
            dataField: "JabatanPIC2",
            label: {
                text: "Jabatan"
            },
            editorOptions: {
                readOnly: true
            }
        }, {
            dataField: "EmailPIC2",
            label: {
                text: "Email"
            },
            editorOptions: {
                readOnly: true
            }
        }, {
            dataField: "NoHPPIC2",
            label: {
                text: "Nomor Handphone"
            },
            editorOptions: {
                readOnly: true
            }
        }]
    }, {
        itemType: "group",
        caption: "Contact Person - 3",
        colCount: 4,
        items: [{
            dataField: "NamaPIC3",
            label: {
                text: "Nama"
            },
            editorOptions: {
                readOnly: true
            }
        }, {
            dataField: "JabatanPIC3",
            label: {
                text: "Jabatan"
            },
            editorOptions: {
                readOnly: true
            }
        }, {
            dataField: "EmailPIC3",
            label: {
                text: "Email"
            },
            editorOptions: {
                readOnly: true
            }
        }, {
            dataField: "NoHPPIC3",
            label: {
                text: "Nomor Handphone"
            },
            editorOptions: {
                readOnly: true
            }
        }]
    }, {
        itemType: "group",
        caption: "Account Officer Eksportir",
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

    }, {
        itemType: "group",
        caption: "Account Officer Importir",
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
        itemType: "group",
        caption: "REKENING BANK",
        colSpan: 2,
        items: [
            {
                editorType: "dxDataGrid",
                editorOptions: {
                    paging: {
                        pageSize: 5
                    },
                    rowAlternationEnabled: true,
                    dataSource: gridDataSource2,
                    columnAutoWidth: true,
                    showBorders: true,
                    height: "100%",
                    width: "100%",
                    columns: [
                        {
                            caption: "No Rekening",
                            alignment: "center",
                            dataField: "NomorRekening",
                            validationRules: [{
                                type: 'pattern',
                                pattern: '^\\d+$',
                                message: "Kolom harus angka"
                            }, {
                                type: "required",
                                message: "Nomor rekening harus diisi"
                            }],

                        }, {
                            caption: "Nama Rekening",
                            alignment: "center",
                            dataField: "NamaRekening",
                            validationRules: [{
                                type: "required",
                                message: "Nama rekening harus diisi"
                            }],
                        }, {
                            caption: "Nama Bank",
                            alignment: "center",
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
                            validationRules: [{ type: 'required' }]

                        }
                    ]
                }
            }
        ]
    }]
}).dxForm("instance");

$.ajax({
    url: routeApi + "DataPelaporProfile/GetPelaporProfile",
    dataType: 'text',
    success: function (myData) {
        var jsoDoc = $.parseJSON(myData);
        formPelapor.option("formData", jsoDoc[0]);
        //    alert(myData)
    }
});


$("#btnGenerate").dxButton({
    text: "Unduh",
    width: 120,
    onClick: function (s, e) {
        // alert("kita")
        var doc = new jsPDF();
        var specialElementHandlers = {
            '#edit': function (element, renderer) {
                return true;
            }
        };

        doc.fromHTML($('#SySurat').html(), 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });
        doc.save('contohfile.pdf');

    }
});