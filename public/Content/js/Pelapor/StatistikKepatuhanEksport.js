function now() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = (day < 10 ? '0' : '') + day +
        + (month < 10 ? '0' : '') + month +
        + d.getFullYear();

    return output;
};


function lastUpdate() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();



    var output = (Number(day) < 10 ? '0' : '') + day + "/" + (Number(month) < 10 ? '0' : '') + month + "/" + d.getFullYear();

    return output;
};


function periode() {
    var d = new Date();
    var output = (d.getFullYear() - 4) + ' - ' + (d.getFullYear());

    return output;
};




var getLastUpdateEksportirPropinsi = "";
var getLastUpdateEksportirNasional = "";
var getLastUpdateEksportirAllPropinsi = "";
var getJenisKomoditasEksportirPropinsi = "";
var getJenisKomoditasEksportirNasional = "";
var getJenisKomoditasEksportirAllPropinsi = "";
var getWilayahNasional = "";
var getWilayahPropinsi = "";
var getWilayahAllPropinsi = "";
var getPeriodeEksportirNasional = "";
var getPeriodeEksportirPropinsi = "";
var getPeriodeEksportirAllPropinsi = "";
var getPerushaanAllPropinsi = "";
var getPerushaanPropinsi = "";
var getPerushaanNasional = "";





$.ajax({
    url: routeApi + "DataStatistikKepatuhanEksportirAllPropinsi/Last_update?jenis_pelapor=Eksportir&provinsi=",
    contentType: 'application/json; charset=utf-8',
    method: "POST",
    async: false,
    success: function (d) {

        getJenisKomoditasEksportirNasional = d.jenis_komoditas;
        getWilayahNasional = d.wilayah;
        getPerushaanNasional = d.nama_perusahaan;
    }
});


//function getLastUpdateEksportirPropinsi() {
//    return $.ajax({
//        url: routeApi + "DataStatistikKepatuhanEksportirAllPropinsi/Last_update?jenis_pelapor=1&komoditas=2",
//        contentType: 'application/json; charset=utf-8',
//        method: "POST",
//        success: function (d) {
//            console.log(d);
//        }
//    });

//};

var DataStatistikKepatuhanEksportirNasional = new DevExpress.data.DataSource({
    load: function (load) {
        //var NPWP = DataStatistikKepatuhanEksportirNasional._items[0]["NPWP"];
        let lUrl = routeApi + "DataStatistikKepatuhanEksportirNasional/GetStatistikKepatuhanEksportirNasional";
        return getGrid(lUrl);

    }

});






var DataStatistikDSBEksportir = new DevExpress.data.DataSource({
    load: function (load) {
        let lUrl = routeApi + "DataDSBEksportir/GetDSBEksportir";
        return getGrid(lUrl);

    }
});





$(function () {


    var footnoteNasional =
        "<br> Last Update: " + lastUpdate() + "</br> </br>" +
        "<br><u>Keterangan:</u></br>" +
        "<br>" + getPerushaanNasional + " melakukan ekspor " + getJenisKomoditasEksportirNasional + " di Provinsi " + getWilayahNasional + ".</br>" +
        "<br>Grafik di atas memberikan informasi terkait nilai FOB dengan DHE " + getPerushaanNasional + " (" + getJenisKomoditasEksportirNasional + ") dibandingkan dengan nilai FOB dan DHE seluruh Indonesia.</br>";




    var y = $("#chartKepatuhanNasional").dxChart({
        dataSource: DataStatistikKepatuhanEksportirNasional,
        resolveLabelOverlapping: "stack",

        commonSeriesSettings: {
            argumentField: "Tahun",
            hoverMode: "none",
            type: "stackedBar",

            ignoreEmptyPoints: false,
            label: {
                position: "outside",
                //horizontalOffset: 75,
                verticalOffset: -20,
                //backgroundColor: "white",
                visible: true,
                format: {
                    type: "fixedPoint",
                    precision: 2
                }
            }
        },
        valueAxis: {
            label: {
                format: 'fixedPoint',
                precision: 2
            }
        },
        argumentAxis: {
            title: {
                alignment: "Left",
                font: {
                    color: "#767676",
                    family: "Segoe UI",
                    opacity: 1,
                    size: 14,
                    weight: 400
                },
                margin: 6,
                text: footnoteNasional

            }

        },
        series: [
            { valueField: "Nilai_Ekspor_Impor_Individual", name: "Nilai Ekspor Pangsa Individual", stack: "NilaiEksporImpor", color: "#ff4646" },
            { valueField: "Nilai_Ekspor_Impor_Nasional", name: "Nilai Ekspor Pangsa Nasional", stack: "NilaiEksporImpor", color: "#ff6f6f" },
            { valueField: "Nilai_DHE_DPI_Individual", name: "Nilai DHE Individual", stack: "NilaiDHE", color: '#6495ed' },
            { valueField: "Nilai_DHE_DPI_Nasional", name: "Nilai DHE Nasional", stack: "NilaiDHE", color: '#92b4f2' }

        ],
        legend: {
            horizontalAlignment: "center",
            position: "outside",
            verticalAlignment: "bottom",
            border: { visible: true },
            columnCount: 4,
            customizeItems: function (items) {
                var sortedItems = [];

                items.forEach(function (item) {
                    if (item.series.name.split(" ")[0] === "NilaiEksporImpor:") {
                        sortedItems.splice(0, 0, item);
                    } else {
                        sortedItems.splice(3, 0, item);
                    }
                });
                return sortedItems;
            }
        },
        title: {

            text: "Kepatuhan Eksportir Dibandingkan Dengan Kepatuhan Komoditas Nasional",
            subtitle: {
                text: "Periode " + periode() + "(dalam Juta USD)"
            }
        },

        export: {
            enabled: true,
            fileName: NPWP + "_" + now() + "_" + "Data Statistik Kepatuhan Eksportir Nasional"
        },
        tooltip: {
            enabled: false
        }
    }).dxChart("instance");

    //  var NPWP = $("#chartKepatuhanNasional").dxChart('instance').option('dataSource')._items[0]['NPWP']



    var Pall = $("#chartKomoditasProvinsiAll").dxChart({
        // dataSource: DataStatistikKepatuhanEksportirAllPropinsi,
        resolveLabelOverlapping: "stack",
        hoverMode: "none",
        commonSeriesSettings: {
            argumentField: "Tahun",
            hoverMode: "none",

            type: "StackedBar",
            label: {
                position: "outside",
                //horizontalOffset: 75,
                verticalOffset: -35,

                // backgroundColor: "white",
                visible: true,
                format: {
                    type: "fixedPoint",
                    precision: 2
                }
            }
        },
        argumentAxis: {
            title: {
                alignment: "left",
                font: {
                    color: "#767676",
                    family: "Segoe UI",
                    opacity: 1,
                    size: 14,
                    weight: 400
                },
                margin: 6



            }
        },

        series: [


            { valueField: "Nilai_Ekspor_Impor_Individual", name: "Nilai Ekspor Pangsa Individual", stack: "NilaiEksporImpor", color: "#ff4646" },
            { valueField: "Nilai_Ekspor_Impor_Nasional", name: "Nilai Ekspor Pangsa Nasional", stack: "NilaiEksporImpor", color: "#ff6f6f" },
            { valueField: "Nilai_DHE_DPI_Individual", name: "Nilai DHE Individual", stack: "NilaiDHE", color: '#6495ed' },
            { valueField: "Nilai_DHE_DPI_Nasional", name: "Nilai DHE Nasional", stack: "NilaiDHE", color: '#92b4f2' }

        ],
        legend: {
            horizontalAlignment: "center",
            position: "outside",
            verticalAlignment: "bottom",
            border: { visible: true },
            columnCount: 4,
            customizeItems: function (items) {
                var sortedItems = [];

                items.forEach(function (item) {
                    if (item.series.name.split(" ")[0] === "NilaiEksporImpor:") {
                        sortedItems.splice(0, 0, item);
                    } else {
                        sortedItems.splice(3, 0, item);
                    }
                });
                return sortedItems;
            }
        },
        valueAxis: {
            label: {
                format: 'fixedPoint',
                precision: 2
            }
        },
        title: {
            font: {
                size: 22
            },
            text: "Kepatuhan Eksportir Dibandingkan Dengan Kepatuhan Seluruh Komoditas Provinsi di Lokasi Eksportir",
            subtitle: {
                text: "Periode " + periode() + " (dalam Juta USD)"
            }
        },
        "export": {
            enabled: true,
            fileName: NPWP + "_" + now() + "_" + "Data Statistik Kepatuhan Eksportir Seluruh Provinsi"
        },
        tooltip: {
            enabled: false
        }
    }).dxChart("instance");


    $("#cmbProvinsi").dxSelectBox({
        dataSource: routeApi + "DataStatistikKepatuhanEksportirAllPropinsi/GetProvinsi?jenis_pelapor=Eksportir",
        //searchEnabled: true,
        // searchExpr: "wilayah",
        placeholder: "Pilih Provinsi",
        showDataBeforeSearch: true,
        displayExpr: 'wilayah',
        valueExpr: "wilayah",
        searchTimeout: 10,
        onValueChanged: function (e) {
            console.log(e);
            var provinsi = e.value;
            $.ajax({
                url: routeApi + "DataStatistikKepatuhanEksportirAllPropinsi/GetStatistikKepatuhanEksportirAllPropinsi?jenis_pelapor=Eksportir&provinsi=" + provinsi,
                contentType: 'application/json; charset=utf-8',
                method: "POST",
                async: false,
                success: function (d) {
                    Pall.option("dataSource", d);
                }
            });

            $.ajax({
                url: routeApi + "DataStatistikKepatuhanEksportirAllPropinsi/Last_update?jenis_pelapor=Eksportir&provinsi=" + provinsi,
                contentType: 'application/json; charset=utf-8',
                method: "POST",
                async: false,
                success: function (d) {


                    getJenisKomoditasEksportirAllPropinsi = d.jenis_komoditas;
                    getWilayahAllPropinsi = d.wilayah;
                    getPerushaanAllPropinsi = d.nama_perusahaan;

                    var footnoteAllProvinsi =
                        "<br> Last Update: " + lastUpdate() + "</br> </br>" +
                        "<br><u>Keterangan:</u></br>" +
                        "<br>" + getPerushaanAllPropinsi + " melakukan ekspor " + getJenisKomoditasEksportirAllPropinsi + " di Provinsi " + getWilayahAllPropinsi + ".</br>" +
                        "<br>Grafik di atas memberikan informasi terkait nilai FOB dengan DHE " + getPerushaanAllPropinsi + "(" + getJenisKomoditasEksportirAllPropinsi + ") dibandingkan dengan nilai FOB dan DHE <b>seluruh komoditas</b> di Provinsi " + getWilayahAllPropinsi + ".</br>";

                    Pall.option("argumentAxis", {
                        title: {
                            text: footnoteAllProvinsi
                        }
                    })

                }
            });

        }
    });

    $("#cmbkomoditasProvinsi").dxSelectBox({
        dataSource: routeApi + "DataStatistikKepatuhanEksportirAllPropinsi/GetProvinsi?jenis_pelapor=Eksportir",
        //searchEnabled: true,
        // searchExpr: "wilayah",
        placeholder: "Pilih Provinsi",
        showDataBeforeSearch: true,
        displayExpr: 'wilayah',
        valueExpr: "wilayah",
        searchTimeout: 10,
        onValueChanged: function (e) {
            //  console.log(e);
            var provinsi = e.value;
            $.ajax({
                url: routeApi + "DataStatistikKepatuhanEksportirPropinsi/GetStatistikKepatuhanEksportirPropinsi?jenis_pelapor=Eksportir&provinsi=" + provinsi,
                contentType: 'application/json; charset=utf-8',
                method: "POST",
                async: false,
                success: function (d) {
                    SKEP.option("dataSource", d);
                }
            });

            $.ajax({
                url: routeApi + "DataStatistikKepatuhanEksportirAllPropinsi/Last_update?jenis_pelapor=Eksportir&provinsi=" + provinsi,
                contentType: 'application/json; charset=utf-8',
                method: "POST",
                async: false,
                success: function (d) {


                    getJenisKomoditasEksportirPropinsi = d.jenis_komoditas;
                    getWilayahPropinsi = d.wilayah;
                    getPerushaanPropinsi = d.nama_perusahaan;

                    var footnoteProvinsi =
                        "<br> Last Update: " + lastUpdate() + "</br> </br>" +
                        "<br><u>Keterangan:</u></br>" +
                        "<br>" + getPerushaanPropinsi + " melakukan ekspor " + getJenisKomoditasEksportirPropinsi + " di Provinsi " + getWilayahPropinsi + ".</br>" +
                        "<br>Grafik di atas memberikan informasi terkait nilai FOB dengan DHE " + getPerushaanPropinsi + " (" + getJenisKomoditasEksportirPropinsi + ") dibandingkan dengan nilai FOB dan DHE " + getJenisKomoditasEksportirPropinsi + " di Provinsi " + getWilayahPropinsi + ".</br>";

                    SKEP.option("argumentAxis", {
                        title: {
                            text: footnoteProvinsi
                        }
                    })

                }
            });

        }
    });


    $("#chartOutstanding").dxChart({
        dataSource: DataStatistikDSBEksportir,
        rotated: true,
        hoverMode: "none",
        argumentAxis: {
            title: {
                alignment: "left",
                font: {
                    color: "#767676",
                    family: "Segoe UI",
                    opacity: 1,
                    size: 14,
                    weight: 400
                },
                margin: 6,
                text: "Last Update",
                textOverflow: "ellipsis",
                wordWrap: "normal"
            }
        },
        barGroupWidth: 40,
        commonSeriesSettings: {
            argumentField: "Jenis_surat",
            type: "stackedBar"
        },
        series: [
            { valueField: "Jumlah_sudah_selesai", name: "Jumlah Sudah Selesai", stack: "total" },
            { valueField: "Jumlah_belum_selesai", name: "Jumlah Belum Selesai", stack: "total" }
        ],
        legend: {
            horizontalAlignment: "center",
            position: "outside",
            verticalAlignment: "bottom",
            border: { visible: true },
            columnCount: 2,
            customizeItems: function (items) {
                var sortedItems = [];

                items.forEach(function (item) {
                    if (item.series.name.split(" ")[0] === "total:") {
                        sortedItems.splice(0, 0, item);
                    } else {
                        sortedItems.splice(3, 0, item);
                    }
                });
                return sortedItems;
            }
        },

        title: {
            text: "PPE Sudah Jatuh Tempo yang Harus Diselesaikan",
            subtitle: {
                text: "Periode Januari 2016 sampai Desember 2019(dalam Juta USD)"
            }
        },
        "export": {
            enabled: true,
            fileName: NPWP + "_" + now() + "_" + "Data Statistik PPE Jatuh Tempo yang Harus Diselesaikan"

        },
        tooltip: {
            enabled: true
        }
    });


    var SKEP = $("#chartKomoditasProvinsi").dxChart({


        // dataSource: DataStatistikKepatuhanEksportirPropinsi,
        resolveLabelOverlapping: "stack",
        hoverMode: "none",
        commonSeriesSettings: {

            argumentField: "Tahun",
            hoverMode: "none",
            type: "stackedBar",
            label: {
                position: "outside",
                //backgroundColor: "white",
                verticalOffset: -20,
                visible: true,
                format: {
                    type: "fixedPoint",
                    precision: 2
                }
            }
        },
        valueAxis: {
            label: {
                format: 'fixedPoint',
                precision: 2
            }
        },
        argumentAxis: {
            title: {
                alignment: "left",
                font: {
                    color: "#767676",
                    family: "Segoe UI",
                    opacity: 1,
                    size: 14,
                    weight: 400
                },
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                margin: 6,
                // text: footnoteProvinsi

            },
            hoverMode: "none"
        },
        series: [



            { valueField: "Nilai_Ekspor_Impor_Individual", name: "Nilai Ekspor Pangsa Individual", stack: "NilaiEksporImpor", color: "#ff4646" },
            { valueField: "Nilai_Ekspor_Impor_Nasional", name: "Nilai Ekspor Pangsa Nasional", stack: "NilaiEksporImpor", color: "#ff6f6f" },
            { valueField: "Nilai_DHE_DPI_Individual", name: "Nilai DHE Individual", stack: "NilaiDHE", color: '#6495ed' },
            { valueField: "Nilai_DHE_DPI_Nasional", name: "Nilai DHE Nasional", stack: "NilaiDHE", color: '#92b4f2' }

        ],
        legend: {
            horizontalAlignment: "center",
            position: "outside",
            verticalAlignment: "bottom",
            border: { visible: true },
            columnCount: 4,
            customizeItems: function (items) {
                var sortedItems = [];

                items.forEach(function (item) {
                    if (item.series.name.split(" ")[0] === "NilaiEksporImpor:") {
                        sortedItems.splice(0, 0, item);
                    } else {
                        sortedItems.splice(3, 0, item);
                    }
                });
                return sortedItems;
            }
        },
        title: {
            font: {
                size: 22
            },
            text: "Kepatuhan Eksportir Dibandingkan Dengan Kepatuhan Komoditas Provinsi Di Lokasi Eksportir",
            subtitle: {
                text: "Periode " + periode() + " (dalam Juta USD)"
            }
        },
        "export": {
            enabled: true,
            fileName: NPWP + "_" + now() + "_" + "Data Statistik Kepatuhan Eksportir Provinsi di Lokasi Eksportir"
        },
        tooltip: {
            enabled: false
        }
    }).dxChart("instance");


});