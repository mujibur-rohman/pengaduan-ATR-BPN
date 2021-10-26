@extends('layouts.admin_res')
@section('htmlheader_title')
    {{ trans('form') }}
@endsection
@section('main-content')

    <!--==============================================================-->
    <!-- Start right Content here main -->

    <div class="main-content">

        <div class="page-content">
            <div class="container-fluid">
                <!--   main  ============================================================== -->



                <div class="panel-heading" style="margin-bottom:2%">
                    <div class="panel-title col-md-12">

                        <h4 class="col-md-4">Transaksi Pengaduan Facebook</h4>

                    </div>
                    <div class="panel-title col-md-12">

                        <form id="formfilter" method="POST">
                            {{ csrf_field() }}
                            <div class="row">
                                <div class="col-md-6" style="float:left;">
                                    <div class="fieldset" style="margin-bottom:10px;">


                                        <div class="field">
                                            <div class="field-label" style="float:left;width:40%;">Jenis Pengaduan</div>
                                            <div class="fiel-value">
                                                <select id="cmbjenispengaduan">
                                                    <option value="0">Semua data</option>
                                                    <option value="1">Pengaduan</option>
                                                    <option value="2">Informasi</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="field-label" style="float:left;width:40%;">Status Pengaduan</div>
                                            <div class="fiel-value">
                                                <select id="cmbstatuspengaduan">
                                                    <option value="0">Semua data</option>
                                                    <option value="1"> Laporan Diterima</option>
                                                    <option value="2">Proses Verifikasi</option>
                                                    <option value="3"> Proses Tindak Lanjut</option>
                                                    <option value="4">Tanggapan</option>
                                                    <option value="5">Selesai</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6" style="float:left;">
                                    <div class="fieldset" style="margin-bottom:10px;">
                                        <div class="field">
                                            <div class="field-label" style="float:left;width:40%;">Posisi Pengaduan</div>
                                            <div class="fiel-value">
                                                <select id="cmbposisipengaduan">
                                                    <option value="0">Semua data</option>
                                                    <option value="1"> Humas Pusat ATR BPN</option>
                                                    <option value="2">Itjen 7 Pusat ATR BPN</option>
                                                    <option value="3"> Verifikator Pusat ATR BPN</option>
                                                    <option value="4">Admin Kanwil Jawa Barat</option>
                                                    <option value="5">Verifikator Kanwil Jawa Barat</option>
                                                    <option value="6">Responder Kanwil Jawa Barat</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="field">
                                            <div class="field-label" style="float:left;width:40%;">Tanggal perode</div>
                                            <div class="fiel-value" style="float:left;width:25%;">
                                                <div> <input type="date" class="field-label" id="txttglawal"
                                                        name="txttglawal" required></div>
                                            </div>
                                            <div class="field-label" style="float:left;width:10%;">s/d</div>

                                            <div class="fiel-value" style="float:left;width:25%;">
                                                <div>
                                                    <input type="date" class="field-label" id="txttglakhir"
                                                        name="txttglakhir" required>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                id="btnkmb">Kembali</button>
                            <button type="submit" class="btn btn-primary" id="btncaridata">Cari Data</button>

                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                id="btnbatal">bersih</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btngetfacebook">Get
                                Facebook</button>
                        </div>
                    </div>
                    </form>

                </div>






            </div>

        </div>
        <!-- Isi Content -->


        <div class="panel-body">

            <table id="dxdatagrid" class="table table-striped table-bordered nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Jenis Pengaduan</th>
                        <th>Kanal Pengaduan</th>
                        <th>Status Pengaduan</th>
                        <th>Posisi Pengaduan</th>
                        <th>Nama</th>
                        <th>Alamat</th>
                        <th>Email</th>
                        <th>Pekerjaan</th>
                        <th>NO. Telpon</th>
                        <th>Object Aduan</th>
                        <th>No. Berkas</th>
                        <th>Uraian </th>
                        <th>Admin </th>
                        <th>Leadtime1</th>
                        <th>Leadtime2</th>
                        <th>Leadtime3</th>

                        <th>Tanggal Dibuat</th>
                        <th> </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td><input type="checkbox" id="a1"></td>
                        <td>1</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Laporan Diterima</td>
                        <td>Humas Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="a2"></td>
                        <td>2</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Laporan Diterima</td>
                        <td>Humas Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="a3"></td>
                        <td>3</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Laporan Diterima</td>
                        <td>Humas Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger2"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger3"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger3"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>

                    </tr>
                    <tr>
                        <td><input type="checkbox" id="a4"></td>
                        <td>4</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Laporan Diterima</td>
                        <td>Humas Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger1"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger2"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger3"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>
                    </tr>

                    <tr>
                        <td><input type="checkbox" id="a4"></td>
                        <td>5</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Proses Tindak Lanjut</td>
                        <td>Verifikator Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger1"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger2"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger3"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="a4"></td>
                        <td>6</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Proses Tindak Lanjut</td>
                        <td>Verifikator Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger1"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger2"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger3"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="a4"></td>
                        <td>7</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Proses Verifikasi</td>
                        <td>Itjen 7 Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger1"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger2"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger3"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="a4"></td>
                        <td>8</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Proses Verifikasi</td>
                        <td>Itjen 7 Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger1"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger2"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger3"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="a4"></td>
                        <td>9</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Proses Verifikasi</td>
                        <td>Itjen 7 Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger1"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger2"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger3"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="a4"></td>
                        <td>10</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Proses Verifikasi</td>
                        <td>Itjen 7 Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger1"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger2"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger3"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="a4"></td>
                        <td>11</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Proses Verifikasi</td>
                        <td>Itjen 7 Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger1"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger2"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger3"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="a4"></td>
                        <td>12</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Proses Verifikasi</td>
                        <td>Itjen 7 Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger1"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger2"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger3"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="a4"></td>
                        <td>13</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Proses Verifikasi</td>
                        <td>Itjen 7 Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger1"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger2"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger3"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="a4"></td>
                        <td>14</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Proses Verifikasi</td>
                        <td>Itjen 7 Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger1"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger2"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger3"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="a4"></td>
                        <td>15</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Proses Tindak Lanjut</td>
                        <td>Verifikator Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger1"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger2"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger3"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="a4"></td>
                        <td>16</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Proses Tindak Lanjut</td>
                        <td>Verifikator Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger1"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger2"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger3"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="a4"></td>
                        <td>17</td>
                        <td>Tanah</td>
                        <td>Facebook</td>
                        <td>Proses Tindak Lanjut</td>
                        <td>Verifikator Pusat ATR BPN</td>
                        <td>jamilah</td>
                        <td>Bandung jl braga no.4</td>
                        <td>jamilah@gmail.com</td>
                        <td>karyawan swasta</td>
                        <td>081344455690</td>
                        <td>Sertifika tanah</td>
                        <td>DT0002626s</td>
                        <td>Segera di proses </td>
                        <td>Admin </td>
                        <td> 1 </td>
                        <td> 2 </td>
                        <td>3 </td>
                        <td>2021-10-04</td>
                        <td><a href="javascript;" class="btn btn-primary btn-xs item-view" data="tiger1"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-edit" data="tiger2"><i
                                    class="glyphicon-save-file"></i></a>
                            <a href="javascript;" class="btn btn-primary btn-xs item-delete" data="tiger3"><i
                                    class="glyphicon-save-file"></i></a>
                        </td>
                    </tr>
                </tbody>
            </table>



        </div>

        <div class="modal fade" id="modalLoader" role="dialog" tabindex="-1">
            <div style=" position: fixed; margin-left: 50%; margin-top: 20%; ">
                <img src="{{ asset('assets_back/images/loader.gif') }}" style=" width: 50px;" alt="loading..." />
            </div>
        </div>

        <!-- Modal -->
        <!-- atribut pada bootstrap yaitu, data-backdrop="static" yaitu untuk membuat modal tidak hilang pada saat di klik sembarangan -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title" id="modalTambahTitle">Tambah Data Transaksi </h6>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>



                    <div class="modal-body">
                        <form id="formSave" method="POST">
                            {{ csrf_field() }}
                            <div class="form-group">
                                <label for="txtpengaduan_id" class="form-label">pengaduan_id</label>
                                <input type="text" class="form-control" id="txtpengaduan_id" name="txtpengaduan_id"
                                    disabled required>
                            </div>

                            <div class="form-group">
                                <label for="txtnama_jenis">Nama User</label>
                                <input type="text" class="form-control" id="txtnama_jenis" name="txtnama_jenis">
                            </div>
                            <div class="form-group">
                                <label for="txtnama_kanal"> Kanal id</label>
                                <input type="text" class="form-control" id="txtnama_kanal" name="txtnama_kanal">
                            </div>
                            <div class="form-group">
                                <label for="txtnama_status">Status id</label>
                                <input type="text" class="form-control" id="txtnama_status" name="txtnama_status">
                            </div>
                            <div class="form-group">
                                <label for="txtnama_posisi">Posisi id</label>
                                <input type="text" class="form-control" id="txtnama_posisi" name="txtnama_posisi">
                            </div>
                            <div class="form-group">
                                <label for="txtnama">Nama</label>
                                <input type="text" class="form-control" id="txtnama" name="txtnama">
                            </div>

                            <div class="form-group">
                                <label for="txtemail">Email</label>
                                <input type="text" class="form-control" id="txtemail" name="txtemail">
                            </div>
                            <div class="form-group">
                                <label for="txtpekerjaan">pekerjaan</label>
                                <input type="text" class="form-control" id="txtpekerjaan" name="txtpekerjaan" value="">
                            </div>
                            <div class="form-group">
                                <label for="txtno_telp">No telp</label>
                                <input type="text" class="form-control" id="txtno_telp" name="txtno_telp" value="">
                            </div>
                            <div class="form-group">
                                <label for="txtleadtime1">leadtime1</label>
                                <input type="text" class="form-control" id="txtleadtime1" name="txtleadtime1" value="">
                            </div>
                            <div class="form-group">
                                <label for="txtnleadtime2o_telp">leadtime2</label>
                                <input type="text" class="form-control" id="leadtime2" name="leadtime2" value="">
                            </div>
                            <div class="form-group">
                                <label for="txtleadtime3">leadtime3</label>
                                <input type="text" class="form-control" id="txtleadtime3" name="txtleadtime3" value="">
                            </div>
                            <div class="form-group">
                                <label for="txtleadtime4">leadtime4</label>
                                <input type="text" class="form-control" id="txtleadtime4" name="txtleadtime4" value="">
                            </div>
                            <div class="form-group">
                                <label for="txtleadtime5">leadtime5</label>
                                <input type="text" class="form-control" id="txtleadtime5" name="txtleadtime5" value="">
                            </div>
                            <div class="form-group">
                                <label for="txtcreate_date">Create Date</label>
                                <input type="text" class="form-control" id="txtcreate_date" name="txtcreate_date"
                                    value="">
                            </div>
                            <div class="group">
                                <label for="txtupdate_at">Update at</label>
                                <input type="text" class="form-control" id="txtupdate_at" name="txtupdate_at" value="">

                            </div>
                            <div class="group">
                                <label for="txtupdate_at">Update at</label>
                                <input type="text" class="form-control" id="txtupdate_at" name="txtupdate_at" value="">
                            </div>
                            <div class="group">
                                <label>Update by</label>
                                <input type="text" class="form-control" id="txtUpdate by" name="txtUpdate by" value="">
                            </div>

                            <div class="modal-footer">
                                <button type="resert" class="btn btn-secondary" data-dismiss="modal"
                                    id="btnCancel">Keluar</button>
                                <button type="submit" class="btn btn-primary" id="btnSimpan">Simpan</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            <!-- /.Modal Input -->


            <!-- Modal Delete -->
            <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog">
                <div class="sweet-alert showSweetAlert" data-custom-class="" data-has-cancel-button="true"
                    data-has-confirm-button="true" data-allow-outside-click="false" data-has-done-function="true"
                    data-animation="pop" data-timer="null" style="display: block; margin-top: -149px;">
                    <div class="sa-icon sa-error" style="display: none;">
                        <span class="sa-x-mark">
                            <span class="sa-line sa-left"></span>
                            <span class="sa-line sa-right"></span>
                        </span>
                    </div>
                    <div class="sa-icon sa-warning pulseWarning" style="display: block;">
                        <span class="sa-body pulseWarningIns"></span>
                        <span class="sa-dot pulseWarningIns"></span>
                    </div>
                    <div class="sa-icon sa-info" style="display: none;"></div>
                    <div class="sa-icon sa-success" style="display: none;">
                        <span class="sa-line sa-tip"></span>
                        <span class="sa-line sa-long"></span>

                        <div class="sa-placeholder"></div>
                        <div class="sa-fix"></div>
                    </div>
                    <div class="sa-icon sa-custom" style="display: none;"></div>
                    <h2>Apakah anda yakin?</h2>
                    <p style="display: block;">Data akan hilang secara permanan</p>
                    <fieldset>
                        <input type="text" tabindex="3" placeholder="">
                        <div class="sa-input-error"></div>
                    </fieldset>
                    <div class="sa-error-container">
                        <div class="icon">!</div>
                        <p>Not valid!</p>
                    </div>
                    <div class="sa-button-container">
                        <button id="btnHapus" class="confirm" tabindex="1"
                            style="display: inline-block; background-color: rgb(221, 107, 85); box-shadow: rgba(221, 107, 85, 0.8) 0px 0px 2px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset;">Ya</button>
                        <div class="sa-confirm-button-container">
                            <button class="cancel" tabindex="2"
                                style="display: inline-block; box-shadow: none;">Batal</button>
                            <div class="la-ball-fall">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- /.Modal Delete -->




            <!-- end main============================================================== -->
        </div>
    </div>
    </div>
    <!-- End Page-content main -->



@endsection

@push('script')

    <script type="text/javascript" src="{{ asset('assets_back/js/jquery.validate.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets_back/js/validate.min.js') }}"></script>
    <script type="text/javascript">
        $(function() {



            // Validasi Fprm
            var jml = 0;
            if ($("#formSave").length > 0) {
                $("#formSave").validate({

                    rules: {
                        txtpengaduan_id: {
                            required: true,
                            maxlength: 5,
                            digits: true

                        },

                        txtnama_jenis: {
                            required: true,
                            maxlength: 40
                        },

                        txtnama_kanal: {
                            required: true,
                            maxlength: 40
                        },

                        txtnama_status: {
                            required: true,
                            maxlength: 40
                        },

                        txtnama_posisi: {
                            required: true,
                            maxlength: 40
                        },

                        txtnama: {
                            required: true,
                            maxlength: 40
                        },
                        txtalamat: {
                            required: true,
                            maxlength: 80
                        },
                        txtemail: {
                            required: true,
                            maxlength: 50
                        },
                        txtpekerjaan: {
                            required: true,
                            maxlength: 50
                        },
                        txtno_telp: {
                            required: true,
                            maxlength: 20
                        },
                        txtobyek_aduan: {
                            required: true,
                            maxlength: 50
                        },
                        txthubungan: {
                            required: true,
                            maxlength: 50
                        },
                        txtno_berkas: {
                            required: true,
                            maxlength: 8
                        },
                        txturaian_pengaduan: {
                            required: true,
                            maxlength: 80
                        },
                        txtcreate_by: {
                            required: true,
                            maxlength: 10
                        },
                        txtleadtime1: {
                            required: true,
                            maxlength: 8
                        },
                        txtleadtime2: {
                            required: true,
                            maxlength: 8
                        },
                        txtleadtime3: {
                            required: true,
                            maxlength: 8
                        },
                        txtleadtime4: {
                            required: true,
                            maxlength: 8
                        },
                        txtleadtime5: {
                            required: true,
                            maxlength: 8
                        },
                        txtcreate_date: {
                            required: true,
                            maxlength: 8
                        },
                        txtupdate_at: {
                            required: true,
                            maxlength: 8
                        },
                        txtupdate_by: {
                            required: true,
                            maxlength: 8
                        },
                    },
                    messages: {

                        txtid_user: {
                            required: "Harap memasukan ID",
                            maxlength: "Tidak boleh melebihi 8 karakter",
                            digits: "Data hanya boleh diisi dengan angka"
                        },

                        txtnama_jenis: {
                            required: "Harap memasukan nama user",
                            maxlength: "Tidak boleh melebihi 40 karakter"
                        },
                        txtemail: {
                            required: "Harap memasukan email",
                            maxlength: "Tidak boleh melebihi 80 karakter"
                        },
                        txtpassword: {
                            required: "Harap memasukan passoword",
                            maxlength: "Tidak boleh melebihi 8 karakter"
                        }

                    },

                })

            }


            // .--Validasi Fprm


            // Tampil Data
            function tampilData() {
                $.ajax({
                    url: "{{ route('daftartr_pengaduan') }}",
                    async: false,
                    dataType: 'json',
                    success: function(data) {
                        console.log(data);
                        var html = '';
                        var i;
                        for (i = 0; i < data.length; i++) {
                            html += '<tr>' +
                                '<td>' + "<input type='checkbox' id='ok' >" + '</td>' +
                                '<td>' + data[i].pengaduan_id + '</td>' +
                                '<td>' + data[i].jenis_id + '</td>' +
                                '<td>' + data[i].kanal_id + '</td>' +
                                '<td>' + data[i].status_id + '</td>' +
                                '<td>' + data[i].posisi_id + '</td>' +
                                '<td>' + data[i].nama + '</td>' +
                                '<td>' + data[i].alamat + '</td>' +
                                '<td>' + data[i].email + '</td>' +
                                '<td>' + data[i].no_telp + '</td>' +
                                '<td>' + data[i].pekerjaan + '</td>' +
                                '<td>' + data[i].obyek_aduan + '</td>' +
                                '<td>' + data[i].no_berkas + '</td>' +
                                '<td>' + data[i].uraian_pengaduan + '</td>' +
                                '<td>' + data[i].leadtime1 + '</td>' +
                                '<td>' + data[i].leadtime2 + '</td>' +
                                '<td>' + data[i].leadtime3 + '</td>' +
                                '<td>' + data[i].leadtime4 + '</td>' +
                                '<td>' + data[i].leadtime5 + '</td>' +
                                '<td>' + data[i].create_date + '</td>' +
                                '<td>' +
                                '<a href = "javascript:;" class="btn btn-warning btn-xs item-edit"  data="' +
                                data[i].pengaduan_id + '"><i class="fa fa-edit"></i></a>' +
                                '<a href = "javascript:;" class="btn btn-danger btn-xs item-delete" id="' +
                                data[i].pengaduan_id + '" data="' + data[i].pengaduan_id +
                                '"><i class="fa fa-trash"></i></a>' +
                                '</td>' +
                                '</tr>';
                        }
                        $('#show_data').html(html).text();

                    },
                    error: function() {
                        alert('Gagal memanggil data');
                    }
                });
            }

            tampilData();

         

            $('#btncaridata').click(function() {
                alert("proses1 cari data");
                caridata();
            });

            function caridata() {
                alert("proses2 cari data");

            }

            $('#btnbatal').click(function() {

                batal();
            });

            function batal() {
                $('#cmbjenispengaduan').val("0");
                $('#cmbstatuspengaduan').val("0");
                $('#cmbposisipengaduan').val("0");


            }

            $('#btngetfacebook').click(function() {
                alert("proses loding ... get data facebook");
                getdata();
            });

            function getdata() {
                alert('proses2 get data facebook');
            }


            // .--Tampil Data

            $('#btnkmb').click(function() {
                //alert('masuk kembali');
                window.history.back();
            });

            // Menambahkan Record Baru
            $('#btnTambah').click(function() {
                $.ajax({
                    url: "{{ route('maxtr_pengaduan') }}",
                    async: false,
                    dataType: 'json',
                    success: function(data) {
                        //  console.log(data[0].id_user);
                        jml = data[0].jml;
                    },
                    error: function() {
                        alert('Gagal memanggil data max');
                    }
                });

                $('#formSave').trigger('reset');
                $('#txtpengaduan_id').val(jml);
                $('#myModal').find('#modalTambahTitle').text('Tambah Data User');
                $('#txtpengaduan_id-error').attr('style', 'display: none;');
                $('#txtnama_jenis-error').attr('style', 'display: none;');
                $('#txtnama_kanal-error').attr('style', 'display: none;')
                $('#txtnama_status-error').attr('style', 'display: none;')
                $('#txtnama_posisi-error').attr('style', 'display: none;')
                $('#txtnama-error').attr('style', 'display: none;')
                $('#txtalamat-error').attr('style', 'display: none;')
                $('#txtemail-error').attr('style', 'display: none;');
                $('#txtno_telp-error').attr('style', 'display: none;');
                $('#txtobyek_aduan-error').attr('style', 'display: none;');
                $('#txthubungan-error').attr('style', 'display: none;');
                $('#txtno_berkas-error').attr('style', 'display:none;');
                $('#txturaian_pengaduan-error').attr('style', 'display: none;');
                $('#txtleadtime1-error').attr('style', 'display: none;');
                $('#txtleadtime2-error').attr('style', 'display: none;');
                $('#txtleadtime3-error').attr('style', 'display: none;');
                $('#txtleadtime4-error').attr('style', 'display: none;');
                $('#txtleadtime5-error').attr('style', 'display: none;');
                $('#txtcreate_date-error').attr('style', 'display: none;');
                $('#txtupdate_at-error').attr('style', 'display: none;');
                $('#txtupdate_by-error').attr('style', 'display: none;');
                $('#formSave').attr("action", "{{ route('simpanregister') }}");
                $('#myModal').modal('show');
            })

            $('#formSave').submit(function(e) {
                e.preventDefault();
                var link = $('#formSave').attr('action');
                var request = new FormData(this);

                $.ajax({
                    url: link,
                    method: "POST",
                    data: request,
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function(response) {
                        console.log(response);
                        $('#myModal').modal('hide');
                        $('.alert-success').html('Data User Berhasil Disimpan').fadeIn().delay(
                            4000).fadeOut('slow');
                        $('#modalLoader').modal('show');
                        tampilData();
                        $('#modalLoader').modal('hide');
                    }
                });
            });

            // .--Menambahkan Record Baru

            // Update Data

            $('#show_data').on('click', '.item-edit', function() {
                var id = $(this).attr('data');
                var url = "{{ url('admin/tr_pengaduan/updatetr_pengaduan') }}/" + id;
                //$('#formSave').trigger('reset');

                $('#txtnama_jenis-error').attr('style', 'display: none;');
                $('#txtnama_kanal-error').attr('style', 'display: none;')
                $('#txtnama_status-error').attr('style', 'display: none;')
                $('#txtnama_posisi-error').attr('style', 'display: none;')
                $('#txtnama-error').attr('style', 'display: none;')
                $('#txtalamat-error').attr('style', 'display: none;')
                $('#txtemail-error').attr('style', 'display: none;');
                $('#txtno_telp-error').attr('style', 'display: none;');
                $('#txtobyek_aduan-error').attr('style', 'display: none;');
                $('#txthubungan-error').attr('style', 'display: none;');
                $('#txtno_berkas-error').attr('style', 'display:none;');
                $('#txturaian_pengaduan-error').attr('style', 'display: none;');
                $('#txtleadtime1-error').attr('style', 'display: none;');
                $('#txtleadtime2-error').attr('style', 'display: none;');
                $('#txtleadtime3-error').attr('style', 'display: none;');
                $('#txtleadtime4-error').attr('style', 'display: none;');
                $('#txtleadtime5-error').attr('style', 'display: none;');
                $('#txtcreate_date-error').attr('style', 'display: none;');
                $('#txtupdate_at-error').attr('style', 'display: none;');
                $('#txtupdate_by-error').attr('style', 'display: none;');
                $('#myModal').modal('show');
                $('#myModal').find('#modalTambahTitle').text('Edit Data User');
                $('#formSave').attr("action", url);
                //var link = $('#formSave').attr('action');
                $.ajax({
                    url: "{{ url('admin/register/getDataregister') }}/" + id,
                    type: 'ajax',
                    method: 'get',
                    async: false,
                    dataType: 'json',
                    success: function(data) {
                        ///batas

                        //console.log(data);
                        $('#txtpengaduan_id').val(data[0].pengaduan_id);
                        $('#txtnama_jenis').val(data[0].nama_jenis);
                        $('#txtnama_kanal').val(data[0].nama_kanal);
                        $('#txtnama_status').val(data[0].nama_status);
                        $('#txtnama').var(data[0].nama);
                        $('#txtalamat').var(data[0].alamat);
                        $('#txtemail').val(data[0].email);
                        $('#txtpekerjaan').val(data[0].pekerjaan);
                        $('#no_telp').val(data[0].no_telp);
                        $('#obyek_aduan').val(data[0].obyek_aduan);
                        $('#txtno_berkas').val(data[0].no_berkas);
                        $('#uraian_pengaduan').val(data[0].uraian_pengaduan);
                        $('#create_by').val(data[0].create_by);
                        $('#leadtime1').val(data[0].leadtime1);
                        $('#leadtime2').val(data[0].leadtime2);
                        $('#leadtime3').val(data[0].leadtime3);
                        $('#leadtime4').val(data[0].leadtime4);
                        $('#leadtime5').val(data[0].leadtime5);
                        $('#create_date').val(data[0].create_date);
                        $('#update_at').val(data[0].update_at);
                        $('#update_by').val(data[0].update_by);

                    }

                });




            });

            // .--Update Data

            // Delete Data


            $('#show_data').on('click', '.item-delete', function() {
                var id = $(this).attr('data');
                $('#modalDelete').modal('show');
                $('#btnHapus').unbind().click(function() {
                    $.ajax({
                        url: "{{ url('admin/hapusDatatr_pengaduan') }}/" + id,
                        method: 'get',
                        async: false,
                        type: 'ajax',
                        dataType: 'json',
                        success: function(response) {
                            if (response.success) {
                                $('#modalDelete').modal('hide');
                                $('.alert-success').html('Data User berhasil dihapus')
                                    .fadeIn().delay(4000).fadeOut('slow');
                                tampilData();
                            } else {
                                alert('Gagal');
                            }
                        }
                    });
                });

            });

            // .--Delete Data
        });
    </script>
@endpush
