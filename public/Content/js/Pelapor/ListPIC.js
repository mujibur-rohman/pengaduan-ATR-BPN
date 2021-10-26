DevExpress.localization.loadMessages({
    en: {
        "dxDataGrid-editingEditRow": "Ubah",
        "dxDataGrid-editingSaveRowChanges": "Simpan",
        "dxDataGrid-editingCancelRowChanges": "Batal",
        "dxDataGrid-editingDeleteRow": "Hapus"
    }
});
$(function () {
    let URL = routeApi + "DataPelapor/";
    var Status2 = ["Tidak Aktif", "Aktif"];
    /*   var lookupDataSource = {
           store: new DevExpress.data.CustomStore({
               loadMode: "raw",
               load: function () {
                 
                   return $.getJSON(routeApi + "DataPelapor/ListS");
               }
           }),
       }
       */

    let gridDataSource = new DevExpress.data.DataSource({
        insert: function (data) {
            const inUrl = URL + "ApiPostpic";
            return insertGrid(inUrl, "pic", data);
        },
        update: function (data, val) {
            Object.keys(val).map(function (key, index) {
                if (typeof data[key] !== 'undefined') {
                    data[key] = val[key];
                }
            });
            const inUrl = URL + "ApiPostpic";

            return insertGrid(inUrl, "pic", data);
        },
        remove: function (key, dd) {

            let dUrl = URL + 'DeletepicById?UserNameId=' + key.UserName;
            return deleteGrid(dUrl, "pic");

        },
        load: function (load) {
            let lUrl = URL + "Getpic";
            return getGrid(lUrl);
        }
    });



    $("#gridContainer").dxDataGrid({
        dataSource: gridDataSource,
        columnHidingEnabled: true,
        showBorders: true,
        onEditingStart: function (e) {
            e.component.columnOption("UserName", "allowEditing", false);
        },
        onInitNewRow: function (e) {
            e.component.columnOption("UserName", "allowEditing", true);
        },
        headerFilter: {
            visible: true
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
            allowGrouping: false,
            caption: "Username",
            alignment: "left",
            dataField: "UserName",
            visible: true
        }, {
            caption: "Manajemen Hak Akses",
            dataField: "PicId",
            alignment: "center",
            cellTemplate: function (container, opt) {

                var link;
                link = '<a href="' + routeApp + 'Pelapor/MappingPicMenu?picid=' + opt.value + '">Lihat</a>';

                container.append(link);
            }
        }

        ]
    });
});