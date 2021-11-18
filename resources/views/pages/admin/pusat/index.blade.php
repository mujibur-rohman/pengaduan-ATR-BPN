
@extends('layouts.admin')
@section('htmlheader_title')
    {{ trans('Pusat') }}
@endsection
@section('main-content') 


            <!-- ============================================================== -->
            <!-- Start right Content here main -->
            <!-- ============================================================== -->
            <div class="main-content">

                <div class="page-content">
                    <div class="container-fluid">
                        <!-- start page title -->
                        <div class="row">
                            <div class="col-12">
                                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h2 class="mb-sm-0 fs-1">
                                        Selamat Datang di Portal Kementrian ATR BPN Kantor Pusat
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <!-- end page title -->
                        <div class="box-pengaduan border border-2 rounded-3 p-3 mb-3">
                            <div class="row box-pengaduan-1">
                                   <div class="col box-pengaduan-item">
                                    <div class="text-box">
                                        <span class="box-number">2000</span>
                                        <span class="box-title">Facebook</span>
                                    </div>
                                    <i class="fab fa-facebook box-icon"></i>
                                </div>
                                
                                <div class="col box-pengaduan-item">
                                    <div class="text-box">
                                        <span class="box-number">2000</span>
                                        <span class="box-title">Twitter</span>
                                    </div>
                                    <i class="fab fa-twitter box-icon"></i>
                                </div>
                                <div class="col box-pengaduan-item">
                                    <div class="text-box">
                                        <span class="box-number">2000</span>
                                        <span class="box-title">Instagram</span>
                                    </div>
                                    <i class="fab fa-instagram box-icon"></i>
                                </div>
                                <div class="col box-pengaduan-item">
                                    <div class="text-box">
                                        <span class="box-number">2000</span>
                                        <span class="box-title">Youtube</span>
                                    </div>
                                    <i class="fab fa-youtube box-icon"></i>
                                </div>
                            </div>
                            <div class="row box-pengaduan-2">
                                <div class="col box-pengaduan-item">
                                    <div class="text-box">
                                        <span class="box-number">2000</span>
                                        <span class="box-title">Portal Pengaduan</span>
                                    </div>
                                    <i class="fas fa-file-alt box-icon"></i>
                                </div>
                                <div class="col box-pengaduan-item">
                                    <div class="text-box">
                                        <span class="box-number">2000</span>
                                        <span class="box-title">Email</span>
                                    </div>
                                    <i class="fas fa-envelope box-icon"></i>
                                </div>
                                <div class="col box-pengaduan-item">
                                    <div class="text-box">
                                        <span class="box-number">2000</span>
                                        <span class="box-title">Surat</span>
                                    </div>
                                    <i class="fas fa-mail-bulk box-icon"></i>
                                </div>
                                <div class="col box-pengaduan-item">
                                    <div class="text-box">
                                        <span class="box-number">2000</span>
                                        <span class="box-title">Total Pengaduan</span>
                                    </div>
                                    <i class="fas fa-database box-icon"></i>
                                </div>
                             
                            </div>
                        </div>

                        <div class="row border p-3 m-1 border-2">
                            <div class="col-6">
                                <div id="chartKategori" style="height: 300px; width: 100%;"></div>
                            </div>
                            <div class="col-6">
                                <div id="chartKlasifikasi" style="height: 300px; width: 100%;"></div>
                            </div>
                            <div class="col-6 mt-5">
                                <div id="chartKanwil" style="height: 300px; width: 100%;"></div>
                            </div>
                            <div class="col-6 mt-5">
                                <div id="chartKantah" style="height: 300px; width: 100%;"></div>
                            </div>
                            <div class="col-6 mt-5">
                                <div id="chartContainer" style="height: 300px; width: 100%;"></div>
                            </div>
                            <div class="col-6 mt-5">
                                <div id="chartTahap" style="height: 300px; width: 100%;"></div>
                            </div>
                        </div>
                    </div>
                    <!-- container-fluid -->
                </div>
                <!-- End Page-content main -->

@endsection

@push('script')

<script type="text/javascript">

let pengaduan;

$.ajax({
    type: 'GET',
    data: '',
    url: "{{ URL::to('/admin/pusat/list') }}",
    success: function (result){
        objResult = JSON.parse(result);
        
        // Grafik Kategori
        let data = objResult.data;
        
		console.log(data[0].kategori_id);
        // kategoriLabel = kategori.map(element => {
        // });
      


        window.onload = function () {
	        var chart = new CanvasJS.Chart("chartKategori", {
		    title:{
			    text: "Kategori Pengaduan",
                fontWeight: '200',            
		    },
		    data: [              
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column",
                    color: '#5156be',
                    dataPoints: [
						{label: 'haha', y: 18}
					]
                }
		    ]
	    });
	    chart.render();

// Chart Klasifikasi
    var chart = new CanvasJS.Chart("chartKlasifikasi", {
		title:{
			text: "Klasifikasi Pengaduan",
            fontWeight: '200',            
		},
		data: [              
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
            color: '#a9aeff',
			dataPoints: [
				{ label: "Berkadar Pengawasan",  y: 10  },
				{ label: "Tidak Berkadar Pengawasan", y: 15  },
			]
		}
		]
	});
	chart.render();

// Chart Top 10 Kanwil
var chart = new CanvasJS.Chart("chartKanwil", {
	animationEnabled: true,
	title: {
		text: "Top 10 Kanwil"
	},
	axisX: {
		interval: 1
	},
	axisY: {
		includeZero: true,
	},
	data: [{
		type: "bar",
		dataPoints: [
			{ label: "Kanwil DKI Jakarta", y: 17.8 },
			{ label: "Kanwil Jawa Barat", y: 22.8 },
			{ label: "Kanwil Jawa Timur", y: 22.8},
			{ label: "Kanwil Aceh", y: 24.3 },
			{ label: "Kanwil Sumatera Barat", y: 36.8},
			{ label: "Kanwil Jawa Tengah", y: 41.1},
			{ label: "Kanwil Kalimantan Timur", y: 46.1},
			{ label: "Kanwil Madura", y: 54},
			{ label: "Kanwil Sulawesi Barat", y: 55.9},
			{ label: "Kanwil Yogyakarta", y: 69.2},
		]
	}]
});
chart.render();

// chart Kantah

var chart = new CanvasJS.Chart("chartKantah", {
	animationEnabled: true,
	title: {
		text: "Top 10 Kantah"
	},
	axisX: {
		interval: 1
	},
	axisY: {
		includeZero: true,
	},
	data: [{
		type: "bar",
		dataPoints: [
			{ label: "Kantah DKI Jakarta", y: 17.8 },
			{ label: "Kantah Jawa Barat", y: 22.8 },
			{ label: "Kantah Jawa Timur", y: 22.8},
			{ label: "Kantah Aceh", y: 24.3 },
			{ label: "Kantah Sumatera Barat", y: 36.8},
			{ label: "Kantah Jawa Tengah", y: 41.1},
			{ label: "Kantah Kalimantan Timur", y: 46.1},
			{ label: "Kantah Madura", y: 54},
			{ label: "Kantah Sulawesi Barat", y: 55.9},
			{ label: "Kantah Yogyakarta", y: 200},
		]
	}]
});
chart.render();

// Chart Pengaduan

var chart = new CanvasJS.Chart("chartContainer", {
	title:{
		text: "Grafik Pengaduan"
	},
	axisY:[{
		title: "Order",
		lineColor: "#C24642",
		tickColor: "#C24642",
		labelFontColor: "#C24642",
		titleFontColor: "#C24642",
		includeZero: true,
		suffix: "k"
	},
	{
		title: "Footfall",
		lineColor: "#369EAD",
		tickColor: "#369EAD",
		labelFontColor: "#369EAD",
		titleFontColor: "#369EAD",
		includeZero: true,
		suffix: "k"
	}],
	axisY2: {
		title: "Revenue",
		lineColor: "#7F6084",
		tickColor: "#7F6084",
		labelFontColor: "#7F6084",
		titleFontColor: "#7F6084",
		includeZero: true,
		prefix: "$",
		suffix: "k"
	},
	toolTip: {
		shared: true
	},
	legend: {
		cursor: "pointer",
		itemclick: toggleDataSeries
	},
	data: [{
		type: "line",
		name: "Footfall",
		color: "#369EAD",
		showInLegend: true,
		axisYIndex: 1,
		dataPoints: [
			{ x: new Date(2017, 00, 7), y: 85.4 }, 
			{ x: new Date(2017, 00, 14), y: 92.7 },
			{ x: new Date(2017, 00, 21), y: 64.9 },
			{ x: new Date(2017, 00, 28), y: 58.0 },
			{ x: new Date(2017, 01, 4), y: 63.4 },
			{ x: new Date(2017, 01, 11), y: 69.9 },
			{ x: new Date(2017, 01, 18), y: 88.9 },
			{ x: new Date(2017, 01, 25), y: 66.3 },
			{ x: new Date(2017, 02, 4), y: 82.7 },
			{ x: new Date(2017, 02, 11), y: 60.2 },
			{ x: new Date(2017, 02, 18), y: 87.3 },
			{ x: new Date(2017, 02, 25), y: 98.5 }
		]
	},
	{
		type: "line",
		name: "Order",
		color: "#C24642",
		axisYIndex: 0,
		showInLegend: true,
		dataPoints: [
			{ x: new Date(2017, 00, 7), y: 32.3 }, 
			{ x: new Date(2017, 00, 14), y: 33.9 },
			{ x: new Date(2017, 00, 21), y: 26.0 },
			{ x: new Date(2017, 00, 28), y: 15.8 },
			{ x: new Date(2017, 01, 4), y: 18.6 },
			{ x: new Date(2017, 01, 11), y: 34.6 },
			{ x: new Date(2017, 01, 18), y: 37.7 },
			{ x: new Date(2017, 01, 25), y: 24.7 },
			{ x: new Date(2017, 02, 4), y: 35.9 },
			{ x: new Date(2017, 02, 11), y: 12.8 },
			{ x: new Date(2017, 02, 18), y: 38.1 },
			{ x: new Date(2017, 02, 25), y: 42.4 }
		]
	},
	{
		type: "line",
		name: "Revenue",
		color: "#7F6084",
		axisYType: "secondary",
		showInLegend: true,
		dataPoints: [
			{ x: new Date(2017, 00, 7), y: 42.5 }, 
			{ x: new Date(2017, 00, 14), y: 44.3 },
			{ x: new Date(2017, 00, 21), y: 28.7 },
			{ x: new Date(2017, 00, 28), y: 22.5 },
			{ x: new Date(2017, 01, 4), y: 25.6 },
			{ x: new Date(2017, 01, 11), y: 45.7 },
			{ x: new Date(2017, 01, 18), y: 54.6 },
			{ x: new Date(2017, 01, 25), y: 32.0 },
			{ x: new Date(2017, 02, 4), y: 43.9 },
			{ x: new Date(2017, 02, 11), y: 26.4 },
			{ x: new Date(2017, 02, 18), y: 40.3 },
			{ x: new Date(2017, 02, 25), y: 54.2 }
		]
	}]
});
chart.render();

function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else {
		e.dataSeries.visible = true;
	}
	e.chart.render();
}


// Chart Tahap 

var chart = new CanvasJS.Chart("chartTahap", {
	animationEnabled: true,
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	title:{
		text: "Grafik Tahap Proses"
	},
	data: [{        
		type: "column",  
		showInLegend: true, 
		legendMarkerColor: "grey",
		dataPoints: [      
			{ y: 300878, label: "Pengaduan Diterima" },
			{ y: 266455,  label: "Verifikasi" },
			{ y: 169709,  label: "Tindak Lanjut" },
			{ y: 158400,  label: "Tanggapan" },
			{ y: 142503,  label: "Selesai" },
		]
	}]
});
        chart.render();

}


    }


})



</script>


<script type="text/javascript">


</script>
    
@endpush