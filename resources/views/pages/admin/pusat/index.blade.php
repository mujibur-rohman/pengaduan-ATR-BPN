
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

                        <div class="row box-pengaduan-1">
                            <div class="col box-pengaduan-item">
                                <div class="text-box">
                                    <span class="box-number">2000</span>
                                    <span class="box-title">Total Pengaduan</span>
                                </div>
                                <i class="fas fa-database box-icon"></i>
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
                                    <span class="box-title">Facebook</span>
                                </div>
                                <i class="fab fa-facebook box-icon"></i>
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
                        </div>

                        <div class="row">
                            <div class="col-6">
                                <canvas id="kategoriChart"></canvas>
                            </div>
                            <div class="col-6">
                                <canvas id="klasifikasiChart"></canvas>
                            </div>
                        </div>
                    </div>
                    <!-- container-fluid -->
                </div>
                <!-- End Page-content main -->

@endsection

@push('script')

{{-- Chart Kategori --}}

<script>
  const labels = [
  'Disiplin Pegawai',
  'Sengketa',
  'Konflik Pertanahan',
  'Informasi & Pelayanan Pertanahan'
];
const data = {
  labels: labels,
  datasets: [{
    skipNull: true,
    label: 'Kategori Pengaduan',
    backgroundColor: '#5156be',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 11, 5, 2],
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {
      scales: {
        x: {
            grid : {
                display : false
            }
        },

    }
  }
};

  const kategoriChart = new Chart(
    document.getElementById('kategoriChart'),
    config
  );

</script>

<script>
    // {{-- Chart Klasifikasi --}}
  const labelsKlasifikasi = [
  'Berkadar Pengawasan',
  'Tidak Berkadar Pengawasan',
];
const dataKlasifikasi = {
  labels: labelsKlasifikasi,
  datasets: [{
    barThickness: 50,
    label: 'Klasifikasi Pengaduan',
    backgroundColor: '#FF4B2B',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 12],
  }]
};

const configKlasifikasi = {
  type: 'bar',
  data: dataKlasifikasi,
  options: {
    scales: {
        x: {
            grid : {
                display : false
            }
        }
    }
  }
};

  const klasifikasiChart = new Chart(
    document.getElementById('klasifikasiChart'),
    configKlasifikasi
  );

</script>



@endpush
