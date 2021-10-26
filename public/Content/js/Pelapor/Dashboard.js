


//var DataStatistikDSBImportir = new DevExpress.data.DataSource({
//    load: function (load) {
//        let lUrl = routeApi + "DataDSBImportir/GetDSBImportir";
//        return getGrid(lUrl);

//    }
//});


//var getLastupdateImportir = "";
//var getLastupdateEksportir = "";
//var getPeriodeImportir = "";
//var getPeriodeEksportir = "";

//$.ajax({
//    url: routeApi + "DataDSBEksportir/getLastUpdate?pelapor=1",
//    contentType: 'application/json; charset=utf-8',
//    method: "POST",
//    async: false,
//    success: function (d) {
//        var formatd = d.last_update.substring(10, 0).split("/");
//        var date = formatd[1] + "/" + formatd[0] + "/" + formatd[2];

//        getLastupdateImportir = date;
//        getPeriodeImportir = d.keterangan_periode;
//    }
//});

//$.ajax({
//    url: routeApi + "DataDSBEksportir/getLastUpdate?pelapor=2",
//    contentType: 'application/json; charset=utf-8',
//    method: "POST",
//    async: false,
//    success: function (d) {
//        var formatd = d.last_update.substring(10, 0).split("/");
//        var date = formatd[1] + "/" + formatd[0] + "/" + formatd[2];

//        getLastupdateEksportir = date;
//        getPeriodeEksportir = d.keterangan_periode;
//    }
//});





//var DataStatistikDSBEksportir = new DevExpress.data.DataSource({
//    load: function (load) {
//        let lUrl = routeApi + "DataDSBEksportir/GetDSBEksportir";
//        // return getGrid(lUrl);

//        return $.ajax({
//            url: lUrl,
//            contentType: 'application/json; charset=utf-8',
//            // method: "POST",
//            async: false,
//            success: function (d) {                    
//                ch.option("title", {
//                    font: {
//                        weight: 900,
//                        size: 16
//                    },
//                    text: "PPE Sudah Jatuh Tempo yang Harus Diselesaikan",
//                    subtitle: {
//                        text: d[0].periode


//                    }
//                    });
//                ch.option("dataSource",d);
//            }
//        });

//    }
//});

//var b = "";

//$.ajax({
//    url: routeApi + "DataDSBEksportir/GetDSBEksportir",
//    contentType: 'application/json; charset=utf-8',
//    // method: "POST",
//    async: false,
//    success: function (d) {
//        b = "Periode " + d[0].periode;


//    }
//});

$(function () {

    function now() {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();

        var output = (day < 10 ? '0' : '') + day +
            + (month < 10 ? '0' : '') + month +
            + d.getFullYear();

        return output;
    };



    function now2() {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();



        var output = (Number(day) < 10 ? '0' : '') + day + "/" + (Number(month) < 10 ? '0' : '') + month + "/" + d.getFullYear();

        return output;
    };
    var ch = $("#chartOutstandingPEB").dxChart({

        rotated: true,
        resolveLabelOverlapping: "stack",


        barGroupWidth: 40,
        commonSeriesSettings: {

            argumentField: "jenis_surat",
            //ignoreEmptyPoints: true,
            type: "stackedBar",
            label: {
                visible: true,
                showForZeroValues: false,
                position: "outside",
                // verticalOffset: -35,
                // horizontalOffset: -47,
                // verticalOffset: -35,

            }
        },

        valueAxis: {
            title: {
                alignment: "left",
                font: {
                    color: "#767676",
                    family: "Segoe UI",
                    opacity: 1,
                    size: 10,
                    weight: 400
                },
                // margin: 6,
                allowDecimals: false,
                text: "Last Update : " + now2(),
                textOverflow: "ellipsis",
                wordWrap: "normal",
                label: {
                    format: {
                        type: "fixedPoint",
                        precision: 0
                    }
                }
            }
        },
        series: [
            { valueField: "jml_sudah_selesai", name: "Jumlah Sudah Selesai", stack: "total" },
            { valueField: "jml_belum_selesai", name: "Jumlah Belum Selesai", stack: "total" }
        ],
        legend: {
            horizontalAlignment: "center",
            position: "outside",
            verticalAlignment: "bottom",
            margin: { left: 180 }
            //border: { visible: true },

        },

        //title: {
        //    font: {
        //        weight: 900,
        //        size: 16
        //    },
        //    text: "PPE Sudah Jatuh Tempo yang Harus Diselesaikan",
        //    subtitle: {
        //        text: b


        //    }
        //},
        "export": {
            enabled: true,
            fileName: NPWP + "_" + now() + "_" + "Data PPE Sudah Jatuh Tempo yang Harus Diselesaikan"
        },
        tooltip: {
            enabled: true
        }
    }).dxChart("instance");
    var ch2 = $("#chartOutstandingPIB").dxChart({
        // dataSource: DataStatistikDSBImportir,
        barGroupWidth: 40,
        resolveLabelOverlapping: "stack",
        rotated: true,
        valueAxis: {
            title: {
                alignment: "left",
                font: {
                    color: "#767676",
                    family: "Segoe UI",
                    opacity: 1,
                    size: 10,
                    weight: 400
                },
                valueType: "Numeric",
                allowDecimals: false,
                //margin: 6,
                text: "Last Update : " + now2(),
                textOverflow: "ellipsis",
                wordWrap: "normal"
            }
        },

        commonSeriesSettings: {
            argumentField: "jenis_surat",
            ignoreEmptyPoints: true,
            type: "stackedBar",
            label: {
                visible: true,
                showForZeroValues: false,
                position: "outside",
                format: {
                    type: "fixedPoint",
                    precision: 0
                }
                // verticalOffset: -35,
                // horizontalOffset: -47,
                // verticalOffset: -35,

            }
        },
        series: [
            { valueField: "jml_sudah_selesai", name: "Jumlah Sudah Selesai", stack: "total" },
            { valueField: "jml_belum_selesai", name: "Jumlah Belum Selesai", stack: "total" }
        ],
        legend: {
            horizontalAlignment: "center",
            position: "outside",
            verticalAlignment: "bottom",
            margin: { left: 180 }
            //border: { visible: true },

        },

        //title: {
        //    text: "PPI Sudah Jatuh Tempo yang Harus Diselesaikan",
        //    subtitle: {
        //        text: "Periode " + getPeriodeImportir
        //    }
        //},
        "export": {
            enabled: true,
            fileName: NPWP + "_" + now() + "_" + "Data Statistik PPI Sudah Jatuh Tempo yang Harus Diselesaikan"
        },
        tooltip: {
            enabled: true
        }
    }).dxChart("instance");

    $.ajax({
        url: routeApi + 'DataDSBEksportir/GetDSBEksportir',
        contentType: 'application/json; charset=utf-8',
        // method: "POST",
        //async: false,
        success: function (d) {
            ch.option("title", {
                font: {
                    weight: 900,
                    size: 16
                },
                margin: {
                    left: 180
                },
                text: "PPE Sudah Jatuh Tempo yang Harus Diselesaikan",
                subtitle: {
                    text: "Periode " + d[0].periode


                }
            });
            ch.option("dataSource", d);
        }
    });
    $.ajax({
        url: routeApi + 'DataDSBImportir/GetDSBImportir',
        contentType: 'application/json; charset=utf-8',
        // method: "POST",
        // async: false,
        success: function (d) {

            ch2.option("title", {
                font: {
                    weight: 900,
                    size: 16
                },
                horizontalAlignment: 'center',
                margin: {
                    left: 180
                },
                text: "PPI Sudah Jatuh Tempo yang Harus Diselesaikan",
                subtitle: {
                    text: "Periode " + d[0].periode


                }
            });
            ch2.option("dataSource", d);
        }
    });



})







