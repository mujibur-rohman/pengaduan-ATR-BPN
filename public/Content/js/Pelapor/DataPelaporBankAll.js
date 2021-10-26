
$(function () {

    $("#gridContainer").dxDataGrid({
        dataSource: routeApi + "DataPelaporBankAll/GetDataPelaporBankAll",
        showBorder: true,
        columnAutoWidth: true,
        paging: {
            pageSize: 10
        },
        remoteoperations: {
            filtering: true,
            sorting: false,
            paging: true
        },
        pager: {
            allowedPageSizes: [10, 15, 20],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        scrolling: {
            columnRenderingMode: "virtual1"
        },
        groupPanel: {
            visible: false
        },
        showColumnLines: true,
        showRowLines: true,
        columns: [
            {
                dataField: "SANDI_BANK",
                caption: "Sandi bank",
            }, {
                dataField: "NM_BANK",
                caption: "Nama Bank"
            }, {
                dataField: "ALAMAT_BANK",
                caption: "Alamat Bank"
            }, {
                dataField: "PIC_BANK",
                caption: "PIC Bank"
            }, {
                dataField: "EMAIL_PIC_BANK",
                caption: "Email PIC Bank"
            }, {
                dataField: "AO_BANK",
                caption: "AO Bank"
            }, {
                dataField: "EMAIL_AO",
                caption: "Email AO Bank"
            }, {
                dataField: "DIVISI",
                caption: "Divisi"
            }
        ],
        searchPanel: {
            visible: false,
            width: 240,
            placeholder: "Search...",
            location: 'after'
        },
        headerFilter: {
            visible: false
        }
    });

    $("#txtDivisi").dxTextBox({
        placeholder: "Divisi"
    });

    $("#txtAOBank").dxTextBox({
        placeholder: "AO Bank"
    });

    $("#txtKdBank").dxTextBox({
        placeholder: "Sandi Bank"
    });

    $("#txtNmBank").dxTextBox({
        placeholder: "Nama Bank"
    });

    $("#btnSearch").dxButton({
        icon: "search",
        text: "Cari Data",
        type: "default",
        stylingMode: "outlined",
        onClick: function (dvs1,aob1,kdb1,nmb1) {
            var dvs = $("#txtDivisi").dxTextBox("instance").option("value");
            dvs1 = "?DIVISI=" + dvs;
            var aob = $("#txtAOBank").dxTextBox("instance").option("value");
            aob1 = "?AO_BANK=" + aob;
            var kdb = $("#txtKdBank").dxTextBox("instance").option("value");
            kdb1 = "?SANDI_BANK=" + kdb;
            var nmb = $("#txtNmBank").dxTextBox("instance").option("value");
            nmb1 = "?NM_BANK=" + nmb;
            console.log(nmb1);

            $("#gridContainer").dxDataGrid("filter", [
                ["DIVISI", "=", dvs],
                "and",
                ["AO_BANK", "=", aob],
                "and",
                ["SANDI_BANK", "=", kdb],
                "and",
                ["NM_BANK", "=", nmb]
            ]);
        }        
    });

    $("#btnReset").dxButton({
        icon: "revert",
        text: "Reset",
        type: "danger",
        stylingMode: "outlined",
        onClick: function (e) {
            $("#txtDivisi").dxTextBox('instance').option('value', '');
            $("#txtAOBank").dxTextBox('instance').option('value', '');
            $("#txtKdBank").dxTextBox('instance').option('value', '');
            $("#txtNmBank").dxTextBox('instance').option('value', '');
        }
    });
    
});