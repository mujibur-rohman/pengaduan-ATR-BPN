var PEB = [{
    "Sandi_KPPBC": "100100",
    "Nomor_PEB": "004957",
    "Tanggal_PEB": "02 Januari 2017",
    "Valuta_PEB": "USD",
    "Nilai_FOB": 500000,
    "No_Invoice": 123456,
    "Tgl_Invoice": "02 Januari 2017",
    "valuta_Invoice:": "USD",
    "Nilai_Invoice": 500000,
    "Valuta_Incoming": "",
    "Nilai_Incoming": "",
    "Status_Invoice": "Tidak Matched",
    "Status_PEB": "DHE Belum Diterima"

},
{
    "Sandi_KPPBC": "100101",
    "Nomor_PEB": "004957",
    "Tanggal": "02 Januari 2017",
    "Valuta_PEB": "USD",
    "Nilai_FOB": 500000,
    "No_Invoice": 123456,
    "Tgl_Invoice": "02 Januari 2017",
    "valuta_Invoice:": "USD",
    "Nilai_Invoice": 500000,
    "Valuta_Incoming": "",
    "Nilai_Incoming": "",
    "Status_Invoice": "Tidak Matched",
    "Status_PEB": "DHE Kurang"
    },
    {
        "Sandi_KPPBC": "100102",
        "Nomor_PEB": "004957",
        "Tanggal": "02 Januari 2017",
        "Valuta_PEB": "USD",
        "Nilai_FOB": 500000,
        "No_Invoice": 123456,
        "Tgl_Invoice": "02 Januari 2017",
        "valuta_Invoice:": "USD",
        "Nilai_Invoice": 500000,
        "Valuta_Incoming": "",
        "Nilai_Incoming": "",
        "Status_Invoice": "Tidak Matched",
        "Status_PEB": "DHE Kurang"
},
{
    "Sandi_KPPBC": "100103",
    "Nomor_PEB": "004957",
    "Tanggal": "02 Januari 2017",
    "Valuta_PEB": "USD",
    "Nilai_FOB": 500000,
    "No_Invoice": 123456,
    "Tgl_Invoice": "02 Januari 2017",
    "valuta_Invoice:": "USD",
    "Nilai_Invoice": 500000,
    "Valuta_Incoming": "",
    "Nilai_Incoming": "",
    "Status_Invoice": "Tidak Matched",
    "Status_PEB": "DHE Kurang"
    },
    {
        "Sandi_KPPBC": "100104",
        "Nomor_PEB": "004957",
        "Tanggal": "02 Januari 2017",
        "Valuta_PEB": "USD",
        "Nilai_FOB": 500000,
        "No_Invoice": 123456,
        "Tgl_Invoice": "02 Januari 2017",
        "valuta_Invoice:": "USD",
        "Nilai_Invoice": 500000,
        "Valuta_Incoming": "",
        "Nilai_Incoming": "",
        "Status_Invoice": "Tidak Matched",
        "Status_PEB": "DHE Kurang"
    }

];

var Status = ["DHE belum diterima", "DHE diterima"];
var now = new Date();

$(function () {
    $("#gridContainer").dxDataGrid({
        rowAlternationEnabled: true,
        dataSource: PEB,
        columnAutoWidth: false,
        showBorders: true,
        allowColumnReordering: true,
     
        columnWidth: 150,
        scrolling: {
            columnRenderingMode: "virtual"
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

        columns: [
            {
                caption: "PEB",
                alignment: "Center",
                columns: [
                    {
                        caption: "Nomor KPPBC",
                        alignment: "Center",
                        dataField: "Sandi_KPPBC"
                    }, {
                        caption: "Nomor",
                        alignment: "Center",
                        dataField: "Nomor_PEB"
                    }, {
                        caption: "Tanggal",
                        alignment: "Center",
                        dataField: "Tanggal_PEB"
                    }, {
                        caption: "Valuta",
                        alignment: "Center",
                        dataField: "Valuta_PEB"
                    }, {
                        caption: "Nilai FOB",
                        alignment: "Center",
                        dataField: "Nilai_FOB"
                    }, {
                        caption: "Invoice",
                        alignment: "Center",
                        columns: [
                            {
                                caption: "Nomor",
                                alignment: "Center",
                                dataField: "Nomor_Invoice"
                            }, {
                                caption: "Tanggal",
                                alignment: "Center",
                                dataField: "Tanggal_Invoice"
                            }, {
                                caption: "Valuta",
                                alignment: "Center",
                                dataField: "Valuta_Invoice"
                            }, {
                                caption: "Nilai Invoice",
                                alignment: "Center",
                                dataField: "Nilai_Invoice"
                            }
                        ]
                    }
                ]
            }, {
                caption: "Incoming",
                alignment: "Center",
                columns: [
                    {
                        caption: "Valuta",
                        dataField: "Valuta_Incoming",
                        alignment: "Center"
                    }, {
                        caption: "Nilai",
                        dataField: "Nilai_Incoming",
                        alignment: "Center"
                    }
                ]
            }, {
                caption: "Status Selesai",
                alignment: "Center",
                columns: [
                    {
                        caption: "Invoice",
                        alignment: "Center",
                        dataField: "Status_Invoice"
                    }, {
                        caption: "PEB",
                        dataField: "Status_PEB",
                        alignment: "Center"
                    }
                ]
            }
        ]
    });


    $("#cmbStatusPEBselesai").dxSelectBox({
        dataSource: Status
    });

    $("#txtPerPEB").dxDateBox({
        type: "date",
        //value: now,
        useMaskBehavior: true,
        displayFormat: "dd-MM-yyyy"
    });
    $("#txtSampaiPEB").dxDateBox({
        type: "date",
       // value: now,
        useMaskBehavior: true,
        displayFormat: "dd-MM-yyyy"
    });

    $("#btnSearh").dxButton({
        type: "success",
        text: "Search"
    });


    $("#txtNoPEB").dxTextBox({
        placeholder: "Masukkan Nomor PEB..."
    });
       $("#txtNoInvoice").dxTextBox({
        placeholder: "Masukkan  Nomor Invoice..."
    });




    $("#label-location").dxSelectBox({
        displayExpr: Status,
        items: ["left", "top"],
        value: "top",
        onValueChanged: data.value
    });

    $("#columns-count").dxSelectBox({
        items: ["auto", 1, 2, 3],
        value: 2,
        onValueChanged: function (data) {
            form.option("colCount", data.value);
        }
    });

    $("#min-column-width").dxSelectBox({
        items: [150, 200, 300],
        value: 300,
        onValueChanged: function (data) {
            form.option("minColWidth", data.value);
        }
    });

    $("#width").dxNumberBox({
        value: undefined,
        max: 550,
        onValueChanged: function (data) {
            form.option("width", data.value);
        }
    });

    $("#read-only").dxCheckBox({
        text: "readOnly",
        value: false,
        onValueChanged: function (data) {
            form.option("readOnly", data.value);
        }
    });

    $("#show-colon").dxCheckBox({
        text: "showColonAfterLabel",
        value: true,
        onValueChanged: function (data) {
            form.option("showColonAfterLabel", data.value);
        }
    });
});