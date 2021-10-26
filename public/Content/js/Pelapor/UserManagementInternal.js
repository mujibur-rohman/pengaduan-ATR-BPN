var ListPeran = [{
    "Form": "Pelapor",
    "items": ["Pelapor A", "Pelapor B", "Pelapor C"]
}];

var UserManagement = [{
    "Kode": "budi_a01",
    "Nama": "Budi Ahmadi",
    "LoginID": "budi_a",
    "Email": "budi_a@bi.go.id",
    "Telp": "021-6320113",
    "Divisi": "DPKL",
    "Level": "G.II",
    "Peran": "AO Korporasi,AO BANK"
},
{
    "Kode": "budi_a01",
    "Nama": "Budi Ahmadi",
    "LoginID": "budi_a",
    "Email": "budi_a@bi.go.id",
    "Telp": "021-6320113",
    "Divisi": "DPKL",
    "Level": "G.II",
    "Peran": "AO Korporasi,AO BANK"
},
{
    "Kode": "budi_a01",
    "Nama": "Budi Ahmadi",
    "LoginID": "budi_a",
    "Email": "budi_a@bi.go.id",
    "Telp": "021-6320113",
    "Divisi": "DPKL",
    "Level": "G.II",
    "Peran": "AO Korporasi,AO BANK"
}];

var level = ["1", "2"];




$("#ListPeran").dxList({
    dataSource: ListPeran,
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

$("#btnEdit").dxButton({
    type: "success",
    text: "Perbaharui"
});


$("#txtKodeUser").dxTextBox({
    placeholder: "Masukkan  Kode User..."
});
$("#txtNamaUser").dxTextBox({

});

$("#txtEmailUser").dxTextBox({

});

$("#txtUserLogin").dxTextBox({

});
$("#txtDivisi").dxTextBox({

});

$("#txtNoTelp").dxTextBox({

});

$("#cmbLevel").dxSelectBox({
    dataSource: level
});






$("#btnAdd").dxButton({
    stylingMode: "contained",
    text: "Add Role",
    type: "default",
    onClick: function () {
        window.location.href = '~/../AddUserManagementInternal'
    }

});

$("#gridContainer").dxDataGrid({
    rowAlternationEnabled: true,
    dataSource: UserManagement,
    columnAutoWidth: true,
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

        allowUpdating: true,

        mode: "popup",
        popup: {
            title: "Update User Managerial",
            showTitle: true,
            width: 750,
            height: 350,
            position: {
                my: "middle",
                at: "middle",
                of: window
            }
        }
    },
    paging: {
        pageSize: 8
    },
    columns: [{
        allowGrouping: false,
        dataField: "Kode",
        alignment: "center",
        caption: "Kode"
    }, {
        caption: "Nama",
        alignment: "center",
        dataField: "Nama"
    }, {
        caption: "LoginID",
        alignment: "center",
        dataField: "LoginID"
    }, {
        caption: "Email",
        alignment: "center",
        dataField: "Email"
    }, {
        caption: "Telp",
        alignment: "center",
        dataField: "Telp"
    }, {
        caption: "Divisi",
        alignment: "center",
        dataField: "Divisi"
    }, {
        caption: "Level",
        alignment: "center",
        dataField: "Level"
    }, {
        caption: "Peran",
        alignment: "center",
        dataField: "Peran"
    }, {
        type: "buttons",
        buttons: [
            {
                text: "Ubah",
                onClick: function (e) {
                    // Execute your command here
                    window.location.href = '../Pelapor/EditUserManagementInternal?id='
                }
            }
        ]
    }]
});
