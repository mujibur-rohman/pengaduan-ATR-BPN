DevExpress.localization.loadMessages({
    en: {
        "dxDataGrid-editingEditRow": "Ubah",
        "dxDataGrid-editingSaveRowChanges": "Simpan",
        //  "dxDataGrid-editingCancelRowChanges": "Cancel*",
        "dxDataGrid-editingDeleteRow": "Hapus"
    }
});
var Jenis = ['Umum', 'Khusus'];

var Jenis = [{
    "ID": 0,
    "Jenis": "Umum"
}, {
    "ID": 1,
    "Jenis": "Khusus"
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
                    // console.log(data);
                }
            })

        }
    })
};

var URL = routeApi + "DataRekening/";
var gridDataSource = new DevExpress.data.CustomStore({
    load: function (load) {
        return $.ajax({
            url: URL + "GetRekening",
            type: "GET",
            success: function (data) {
                // console.log(data);
            }
        })
    },
    remove: function (key, dd) {

        let dUrl = URL + 'DeleteRekening?IdPelRekeningBank=' + key.IdPelRekeningBank;
        return deleteGrid(dUrl, "Rekening");

    },
    update: function (data, value) {
        Object.keys(value).map(function (key, index) {
            if (typeof data[key] !== 'undefined') {
                data[key] = value[key];
            }
        });

        console.log('insert', data);
        var value = $(this).serialize();
        console.log(value);
        return $.ajax({
            url: URL + "EditRekening",
            type: "Post",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function (e) {
                // alert(e);
            }
        })
    },
    insert: function (data) {
        console.log('insert', data);
        var value = $(this).serialize();
        console.log(value);
        return $.ajax({
            url: URL + "InsertRekening",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function (e) {
                //alert(e);
            }
        })
    }

});


$(function () {

    $("#gridContainer").dxDataGrid({
        rowAlternationEnabled: true,
        dataSource: gridDataSource,
        columnAutoWidth: false,
        showBorders: true,
        
        columns: [{

            dataField: "SandiBank",
            alignment: "center",
            caption: "Nama Bank",
            ///Msh ada bug Saat valueexpr di on tidak bisa menampilkan datafield nama_bank
            lookup: {
                dataSource: SandiBank,
                valueExpr: "SANDI_BANK",
                displayExpr: "NAMA_BANK"

            }
        }, {
            caption: "Nomor Rekening",
            alignment: "center",
            dataField: "NomorRekening",
            validationRules: [{ type: 'required' }]
        }, {
            caption: "Nama Rekening",
            alignment: "center",
            dataField: "NamaRekening",

            validationRules: [{ type: 'required' }]
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
        }]
    });


});