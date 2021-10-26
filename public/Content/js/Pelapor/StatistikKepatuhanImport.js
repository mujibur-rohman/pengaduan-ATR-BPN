function now() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = (day < 10 ? '0' : '') + day +
        + (month < 10 ? '0' : '') + month +
        + d.getFullYear();

    return output;
};
var DataStatistikKepatuhanImportirNasional = new DevExpress.data.DataSource({
    load: function (load) {
        let lUrl = routeApi + "DataStatistikKepatuhanImportirNasional/GetStatistikKepatuhanImportirNasional";
        return getGrid(lUrl);

    }
});


var DataStatistikKepatuhanImportirPropinsi = new DevExpress.data.DataSource({
    load: function (load) {
        let lUrl = routeApi + "DataStatistikKepatuhanImportirPropinsi/GetStatistikKepatuhanImportirPropinsi";
        return getGrid(lUrl);

    }
});



var DataStatistikDSBImportir = new DevExpress.data.DataSource({
    load: function (load) {
        let lUrl = routeApi + "DataDSBImportir/GetDSBImportir";
        return getGrid(lUrl);

    }
});

var getLastUpdateImportirPropinsi = "";
var getLastUpdateImportirNasional = "";
var getLastUpdateImportirAllPropinsi = "";
var getPeriodeImportirNasional = "";
var getPeriodeImportirPropinsi = "";
var getPeriodeImportirAllPropinsi = "";
var getJenisKomoditasEksportirPropinsi = "";
var getJenisKomoditasEksportirNasional = "";
var getJenisKomoditasEksportirAllPropinsi = "";
var getWilayahNasional = "";
var getWilayahPropinsi = "";
var getWilayahAllPropinsi = "";
var getPerushaanAllPropinsi = "";
var getPerushaanPropinsi = "";
var getPerushaanNasional = "";
var getJenisKomoditasImportirAllPropinsi = "";
var getJenisKomoditasImportirPropinsi = "";
var getJenisKomoditasImportirNasional = "";



//$.ajax({
//    url: routeApi + "DataStatistikKepatuhanEksportirAllPropinsi/Last_update?jenis_pelapor=Importir&provinsi=",
//    contentType: 'application/json; charset=utf-8',
//    method: "POST",
//    async: false,
//    success: function (d) {
//        getPeriodeImportirPropinsi = d.keterangan_periode
//        getJenisKomoditasImportirPropinsi = d.jenis_komoditas;
//        getWilayahPropinsi = d.wilayah;
//        getPerushaanPropinsi = d.nama_perusahaan;
//    }
//});

$.ajax({
    url: routeApi + "DataStatistikKepatuhanEksportirAllPropinsi/Last_update?jenis_pelapor=Importir&provinsi=",
    contentType: 'application/json; charset=utf-8',
    method: "POST",
    async: false,
    success: function (d) {
        getPeriodeImportirNasional = d.keterangan_periode;
        getJenisKomoditasImportirNasional = d.jenis_komoditas;
        getWilayahNasional = d.wilayah;
        getPerushaanNasional = d.nama_perusahaan;
    }
});

//$.ajax({
//    url: routeApi + "DataStatistikKepatuhanEksportirAllPropinsi/Last_update?jenis_pelapor=Importir&provinsi=",
//    contentType: 'application/json; charset=utf-8',
//    method: "POST",
//    async: false,
//    success: function (d) {
//        getPeriodeImportirAllPropinsi = d.keterangan_periode;
//        getJenisKomoditasImportirAllPropinsi = d.jenis_komoditas;
//        getWilayahPropinsi = d.wilayah;
//        getPerushaanPropinsi = d.nama_perusahaan;
//    }
//});




$(function () {

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



    //var footnoteAllProvinsi =
    //    "<br> Last Update: " + lastUpdate() + "</br> </br>" +
    //    "<br><u>Keterangan:</u></br>" +
    //    "<br>" + getPerushaanAllPropinsi + " melakukan impor " + getJenisKomoditasImportirAllPropinsi + " di Provinsi " + getWilayahAllPropinsi + ".</br>" +
    //    "<br>Grafik di atas memberikan informasi terkait nilai CIF dengan DPI " + getPerushaanAllPropinsi + "(" + getJenisKomoditasImportirAllPropinsi + ") dibandingkan dengan nilai CIF dan DPI <b>seluruh komoditas</b> di Provinsi " + getWilayahAllPropinsi + ".</br>";

    //var footnoteProvinsi =
    //    "<br> Last Update: " + lastUpdate() + "</br> </br>" +
    //    "<br><u>Keterangan:</u></br>" +
    //    "<br>" + getPerushaanPropinsi + " melakukan impor " + getJenisKomoditasImportirPropinsi + " di Provinsi " + getWilayahPropinsi + ".</br>" +
    //    "<br>Grafik di atas memberikan informasi terkait nilai CIF dengan DPI " + getPerushaanPropinsi + " (" + getJenisKomoditasImportirPropinsi + ") dibandingkan dengan nilai CIF dan DPI " + getJenisKomoditasImportirPropinsi + " di Provinsi " + getWilayahPropinsi + ".</br>";

    var footnoteNasional =
        "<br> Last Update: " + lastUpdate() + "</br> </br>" +
        "<br><u>Keterangan:</u></br>" +
        "<br>" + getPerushaanNasional + " melakukan impor " + getJenisKomoditasImportirNasional + " di Provinsi " + getWilayahNasional + ".</br>" +
        "<br>Grafik di atas memberikan informasi terkait nilai CIF dengan DPI " + getPerushaanNasional + " (" + getJenisKomoditasImportirNasional + ") dibandingkan dengan nilai CIF dan DPI seluruh Indonesia.</br>";

    $("#cmbProvinsi").dxSelectBox({
        dataSource: routeApi + "DataStatistikKepatuhanEksportirAllPropinsi/GetProvinsi?jenis_pelapor=Importir",
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
                url: routeApi + "DataStatistikKepatuhanImportirAllPropinsi/GetStatistikKepatuhanImportirAllPropinsi?jenis_pelapor=Importir&provinsi=" + provinsi,
                contentType: 'application/json; charset=utf-8',
                method: "POST",
                async: false,
                success: function (d) {
                    Pall.option("dataSource", d);
                }
            });

            $.ajax({
                url: routeApi + "DataStatistikKepatuhanEksportirAllPropinsi/Last_update?jenis_pelapor=Importir&provinsi=" + provinsi,
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
                url: routeApi + "DataStatistikKepatuhanImportirPropinsi/GetStatistikKepatuhanImportirPropinsi?jenis_pelapor=Importir&provinsi=" + provinsi,
                contentType: 'application/json; charset=utf-8',
                method: "POST",
                async: false,
                success: function (d) {
                    SKIP.option("dataSource", d);
                }
            });

            $.ajax({
                url: routeApi + "DataStatistikKepatuhanEksportirAllPropinsi/Last_update?jenis_pelapor=Importir&provinsi=" + provinsi,
                contentType: 'application/json; charset=utf-8',
                method: "POST",
                async: false,
                success: function (d) {


                    getJenisKomoditasImportirPropinsi = d.jenis_komoditas;
                    getWilayahPropinsi = d.wilayah;
                    getPerushaanPropinsi = d.nama_perusahaan;


                    var footnoteProvinsi =
                        "<br> Last Update: " + lastUpdate() + "</br> </br>" +
                        "<br><u>Keterangan:</u></br>" +
                        "<br>" + getPerushaanPropinsi + " melakukan impor " + getJenisKomoditasImportirPropinsi + " di Provinsi " + getWilayahPropinsi + ".</br>" +
                        "<br>Grafik di atas memberikan informasi terkait nilai CIF dengan DPI " + getPerushaanPropinsi + " (" + getJenisKomoditasImportirPropinsi + ") dibandingkan dengan nilai CIF dan DPI " + getJenisKomoditasImportirPropinsi + " di Provinsi " + getWilayahPropinsi + ".</br>";

                    SKIP.option("argumentAxis", {
                        title: {
                            text: footnoteProvinsi
                        }
                    })

                }
            });

        }
    });





    $("#chartKepatuhanNasional").dxChart({
        dataSource: DataStatistikKepatuhanImportirNasional,
        resolveLabelOverlapping: "stack",
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
                margin: 6,
                text: footnoteNasional,
                textOverflow: "ellipsis",
                wordWrap: "normal"
            }
        },

        series: [


            { valueField: "Nilai_Ekspor_Impor_Individual", name: "Nilai Impor Pangsa Individual", stack: "NilaiEksporImpor", color: "#ff4646" },
            { valueField: "Nilai_Ekspor_Impor_Nasional", name: "Nilai Impor Pangsa Nasional", stack: "NilaiEksporImpor", color: "#ff6f6f" },
            { valueField: "Nilai_DHE_DPI_Individual", name: "Nilai DPI Individual", stack: "NilaiDHE", color: '#6495ed' },
            { valueField: "Nilai_DHE_DPI_Nasional", name: "Nilai DPI Nasional", stack: "NilaiDHE", color: '#92b4f2' },

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

            text: "Kepatuhan Importir Dibandingkan Dengan Kepatuhan Komoditas Nasional",
            subtitle: {
                text: "Periode " + periode() + " (dalam Juta USD)"
            }
        },

        "export": {
            enabled: true,
            fileName: NPWP + "_" + now() + "_" + "Data StatistikKepatuhan Importir Dibandingkan Dengan Kepatuhan Komoditas Nasional"
        },
        tooltip: {
            enabled: false
        }
    }).dxChart("instance");

    var Pall = $("#chartKomoditasProvinsiAll").dxChart({
        //   dataSource: DataStatistikKepatuhanImportirAllPropinsi,
        resolveLabelOverlapping: "stack",
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
                margin: 6,
                //  text: footnoteAllProvinsi,
                textOverflow: "ellipsis",
                wordWrap: "normal"
            }
        },
        series: [


            { valueField: "Nilai_Ekspor_Impor_Individual", name: "Nilai Impor Pangsa Individual", stack: "NilaiEksporImpor", color: "#ff4646" },
            { valueField: "Nilai_Ekspor_Impor_Nasional", name: "Nilai Impor Pangsa Nasional", stack: "NilaiEksporImpor", color: "#ff6f6f" },
            { valueField: "Nilai_DHE_DPI_Individual", name: "Nilai DPI Individual", stack: "NilaiDHE", color: '#6495ed' },
            { valueField: "Nilai_DHE_DPI_Nasional", name: "Nilai DPI Nasional", stack: "NilaiDHE", color: '#92b4f2' },

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
            text: "Kepatuhan Importir Dibandingkan Dengan Kepatuhan Seluruh Komoditas Provinsi di Lokasi Importir",
            subtitle: {
                text: "Periode " + periode() + " (dalam Juta USD)"
            }
        },
        "export": {
            enabled: true,
            fileName: NPWP + "_" + now() + "_" + "Data Statistik Kepatuhan Importir Dibandingkan Dengan Kepatuhan Seluruh Komoditas Provinsi di Lokasi Importir"
        },
        tooltip: {
            enabled: false
        }
    }).dxChart("instance");

    $("#chartOutstanding").dxChart({
        dataSource: DataStatistikDSBImportir,
        barGroupWidth: 40,
        rotated: true,

        commonSeriesSettings: {
            argumentField: "Jenis_surat",
            type: "stackedBar",
            label: {
                //backgroundColor: "white",
                visible: true,
                format: {
                    type: "fixedPoint",
                    precision: 0
                },
                font: {
                    color: "#ffffff",
                    family: "Segoe UI",
                    opacity: 1,
                    size: 14,
                    weight: 400
                }
            }
        },
        series: [
            { valueField: "Jumlah_sudah_selesai", name: "Jumlah Sudah Selesai", stack: "total" },
            { valueField: "Jumlah_belum_selesai", name: "Jumlah Belum Selesai", stack: "total" },
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
            text: "PPI Sudah Jatuh Tempo yang Harus Diselesaikan",
            subtitle: {
                text: "Periode Januari 2016 sampai Desember 2019(dalam Juta USD)"
            }
        },
        "export": {
            enabled: true,
            fileName: NPWP + "_" + now() + "_" + "Data Statistik PPI Sudah Jatuh Tempo yang Harus Diselesaikan"
        },

        tooltip: {
            enabled: true
        }
    });

    var SKIP = $("#chartKomoditasProvinsi").dxChart({
       // dataSource: DataStatistikKepatuhanImportirPropinsi,
        resolveLabelOverlapping: "stack",
        commonSeriesSettings: {
            argumentField: "Tahun",
            type: "stackedBar",
            hoverMode: "none",
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
                margin: 6,
               // text: footnoteProvinsi,
                textOverflow: "ellipsis",
                wordWrap: "normal"
            }
        },
        series: [
            { valueField: "Nilai_Ekspor_Impor_Individual", name: "Nilai Impor Pangsa Individual", stack: "NilaiEksporImpor", color: "#ff4646" },
            { valueField: "Nilai_Ekspor_Impor_Nasional", name: "Nilai Impor Pangsa Nasional", stack: "NilaiEksporImpor", color: "#ff6f6f" },
            { valueField: "Nilai_DHE_DPI_Individual", name: "Nilai DPI Individual", stack: "NilaiDHE", color: '#6495ed' },
            { valueField: "Nilai_DHE_DPI_Nasional", name: "Nilai DPI Nasional", stack: "NilaiDHE", color: '#92b4f2' },

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
            text: "Kepatuhan Importir Dibandingkan Dengan Kepatuhan Komoditas Provinsi Di Lokasi Importir",
            subtitle: {
                text: "Periode " + periode() + " (dalam Juta USD)"
            }
        },
        "export": {
            enabled: true,
            fileName: NPWP + "_" + now() + "_" + "Data Statistik Kepatuhan Importir Dibandingkan Dengan Kepatuhan Komoditas Provinsi Di Lokasi Importir"
        },
        tooltip: {
            enabled: false
        }
    }).dxChart("instance");
});