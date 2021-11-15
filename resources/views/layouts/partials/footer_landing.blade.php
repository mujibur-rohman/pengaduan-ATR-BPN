
<!-- Start Footer    baru   ============================================= -->
<div id="form">
    <!-- Side Bg --> 
    <h1 class="text-center form__title">form pengaduan</h1>
    <form id="formSave" method="POST" enctype="multipart/form-data" action="{{ URL::to('/simpan') }}">
    {{ csrf_field() }}
        
    <div class="form_layouts">

        @if ($errors->any())
            <div class="alert alert-danger">
                <p>Silahkan perbaiki data dibawah ini</p>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <h2>I. Identitas Pengadu</h2>
        <div class="row">
            <div class="form-group col-sm-6">
                <label class="form__labels" for="number">Nama <span style="color: red">*</span></label>
                <input name="pengaduan[nama]" value="{{ $model['nama'] }}" type="text" class="form-control form__items" id="number" placeholder="Nama" required>
                @if ($errors->has('nama'))
                <div class="form-text error">
                    {{ $errors->first('nama') }}
                </div>
                @endif
            </div>
            <div class="form-group col-sm-6">
                <label class="form__labels" for="date">NIK <span style="color: red">*</span></label>
                <input name="pengaduan[nik]" value="{{ $model['nik'] }}" type="text" class="form-control form__items" id="date" placeholder="NIK" required>
                @if ($errors->has('nik'))
                <div class="form-text error">
                    {{ $errors->first('nik') }}
                </div>
                @endif
            </div>
        </div>
        <div class="form-group">
            <label for="address" class="form__labels">Alamat <span style="color: red">*</span></label>
            <textarea name="pengaduan[alamat]" class="form-control form__items" id="address" rows="3" required>{{ $model['alamat'] }}</textarea>
            @if ($errors->has('alamat'))
            <div class="form-text error">
                {{ $errors->first('alamat') }}
            </div>
            @endif
        </div>
        <div class="row">
            <div class="form-group col-sm-6 col-lg-4">
                <label class="form__labels" for="email">Email <span style="color: red">*</span></label>
                <input name="pengaduan[email]" value="{{ $model['email']}}" type="text" class="form-control form__items" id="email" placeholder="Email" required>
                @if ($errors->has('email'))
                <div class="form-text error">
                    {{ $errors->first('email') }}
                </div>
                @endif
            </div>
            <div class="form-group col-sm-6 col-lg-4">
                <label class="form__labels" for="phone">No Telepon <span style="color: red">*</span></label>
                <input name="pengaduan[phone]" value="{{ $model['phone'] }}" type="text" class="form-control form__items" id="phone" placeholder="Phone" required>
                @if ($errors->has('phone'))
                <div class="form-text error">
                    {{ $errors->first('phone') }}
                </div>
                @endif
            </div>
            <div class="form-group col-sm-12 col-lg-4">
                <label class="form__labels" for="profession">Pekerjaan <span style="color: red">*</span></label>
                <input name="pengaduan[pekerjaan]" value="{{ $model['pekerjaan'] }}" type="text" class="form-control form__items" id="profession" placeholder="Pekerjaan" required>
                @if ($errors->has('pekerjaan'))
                <div class="form-text error">
                    {{ $errors->first('pekerjaan') }}
                </div>
                @endif
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <label class="form__labels" for="txtobyek_aduan">Objek Aduan (No. SHM/Letak Tanah) <span style="color: red">*</span></label>
                <input name="pengaduan[objek_aduan]" value="{{ $model['objek_aduan'] }}" type="text" class="form-control form__items" id="txtobyek_aduan" required>
                @if ($errors->has('objek_aduan'))
                <div class="form-text error">
                    {{ $errors->first('objek_aduan') }}
                </div>
                @endif
            </div>
            <div class="form-group col-sm-6">
                <label class="form__labels" for="relation">Hubungan hukum dengan tanah <span style="color: red">*</span></label>
                <input type="text" class="form-control form__items" name="pengaduan[hubungan]" value="{{$model['hubungan']}}" id="relation" required>
                @if ($errors->has('hubungan'))
                <div class="form-text error">
                    {{ $errors->first('hubungan') }}
                </div>
                @endif
            </div>
            <div class="form-group col-sm-12">
                <label class="form__labels" for="berkas">No Berkas Permohonan (Untuk pelayanan) <span style="color: red">*</span></label>
                <input name="pengaduan[no_berkas]" value="{{ $model['no_berkas'] }}" type="text" class="form-control form__items" id="berkas" required>
                @if ($errors->has('no_berkas'))
                <div class="form-text error">
                    {{ $errors->first('no_berkas') }}
                </div>
                @endif
            </div>
        </div>
        <h2>II. Uraian Pengaduan <span style="color: red">*</span></h2>
        <div class="form-group">
            <textarea name="pengaduan[uraian]" class="form-control form__items" rows="5" placeholder="Uraikan pengaduan anda disini.." required>{{$model['uraian']}}</textarea>
            @if ($errors->has('uraian'))
            <div class="form-text error">
                {{ $errors->first('uraian') }}
            </div>
            @endif
        </div>

        <h2>III. Bukti Yang Dilampirkan</h2>
        
        <div style="margin-bottom: 2rem">
            <div class="form-group col-12">
                <input class="file__upload" type="file" name="bukti1" id="file">
            </div>
            <div class="form-group col-12">
                <input class="file__upload" type="file" name="bukti2" id="file">
            </div>
            <div class="form-group col-12">
                <input class="file__upload" type="file" name="bukti3" id="file">
            </div>
        </div>

        <div class="text-right form-group">
            <button type="batal" class="btn btn-outline-danger" style="margin-right: 1rem">Hapus Form</button>
            <button type="submit" class="btn btn-color">Kirim</button>
        </div>
    </div>
    </form>
</div>

    <footer class="footer-landing">
            <div class="footer-items">
                <h2 class="footer-title">Social</h2>
                <div class="footer-social">
                    <a href="#" class="footer-social-items">
                        <i class="fab fa-facebook"></i>
                        <p>Facebook</p>
                    </a>
                    <a href="#" class="footer-social-items">
                        <i class="fab fa-instagram"></i>
                        <p>Instagram</p>
                    </a>
                    <a href="#" class="footer-social-items">
                        <i class="fab fa-twitter"></i>
                        <p>Twitter</p>
                    </a>
                    <a href="#" class="footer-social-items">
                        <i class="fab fa-youtube"></i>
                        <p>Youtube</p>
                    </a>
                </div>
            </div>
            <div class="footer-items subscribe">
                <h2 class="footer-title">Subscribe</h2>
                <p>SIlakan Masukkan email Anda untuk mendapatkan informasi terbaru dari Kementerian ATR / BPN</p>
                <div class="subscribe-email">
                    <input type="email" name="" class="form-control">
                    <button>Kirim</button>
                </div>
                <div class="img-footer">
                    <a href="{{Redirect::intended('https://kws.kpk.go.id')}}"><img src="{{asset('assets_fron/images/kpk.png')}}" class="logo-footer"></a>
                    <img src="{{asset('assets_fron/images/lapor.png')}}" class="logo-footer">
                </div>
            </div>
            <div class="footer-items alamat">
                <h2 class="footer-title">Alamat Kami</h2>
                <p>Gedung Kementerian Agraria dan Tata Ruang/Badan Pertanahan Nasional Jalan Sisingamangaraja No 2 Kebayoran Baru, Jakarta 12110</p>

                <div class="kontak">
                    <div class="kontak-items">
                        <i class="fas fa-home"></i>
                        <p>https://www.atrbpn.go.id</p>
                    </div>
                    <div class="kontak-items">
                        <i class="fas fa-envelope"></i>
                        <p>humas@atrbpn.go.id</p>
                    </div>
                    <div class="kontak-items">
                        <i class="fas fa-phone"></i>
                        <p>021-7228901</p>
                    </div>
                </div>
            </div>
        </footer>
        <footer class="label-footer">
            <p style="margin: 0">&copy 2021 Kementrian ATR/BPN</p>
        </footer>
<style type="text/css">
.error {
    color: #a94442;
}
</style>

