
<!-- Start Footer    baru   ============================================= -->
<div id="form">
    <!-- Side Bg --> 
    <h1 class="text-center site-heading form__title">form pengaduan</h1>
    <form id="formSave"  method="POST" enctype="multipart/form-data">
    {{ csrf_field() }}      
        
        
    <div class="form_layouts">
        <div class="row" style="margin-bottom: 3rem">
            <div class="form-group col-sm-6">
                <label class="form__labels" for="nomor">Nomor</label>
                <input type="text" class="form-control form__items" id="nomor" value="00000XXXXX" disabled>
            </div>
            <div class="form-group col-sm-6">
                <label class="form__labels" for="tanggal">Tanggal</label>
                <input type="text" class="form-control form__items" id="tanggal" value="01/01/2000" disabled>
            </div>
        </div>

        <h2>I. Identitas Pengadu</h2>
        <div class="row">
            <div class="form-group col-sm-6">
                <label class="form__labels" for="number">Nama</label>
                <input name="txtnama" type="text" class="form-control form__items" id="number" placeholder="Nama" required>
            </div>
            <div class="form-group col-sm-6">
                <label class="form__labels" for="date">Nik</label>
                <input name="txtnik" type="text" class="form-control form__items" id="date" placeholder="NIK" required>
            </div>
        </div>
        <div class="form-group">
            <label for="address" class="form__labels">Alamat</label>
            <textarea name="txtalamat" class="form-control form__items" id="address" rows="3" required></textarea>
        </div>
        <div class="row">
            <div class="form-group col-sm-6 col-lg-4">
                <label class="form__labels" for="email">Email</label>
                <input name="txtemail" type="text" class="form-control form__items" id="email" placeholder="Email" required>
            </div>
            <div class="form-group col-sm-6 col-lg-4">
                <label class="form__labels" for="phone">No Telepon</label>
                <input name="txtno_telp" type="text" class="form-control form__items" id="phone" placeholder="Phone" required>
            </div>
            <div class="form-group col-sm-12 col-lg-4">
                <label class="form__labels" for="profession">Pekerjaan</label>
                <input name="txtpekerjaan" type="text" class="form-control form__items" id="profession" placeholder="Pekerjaan" required>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <label class="form__labels" for="txtobyek_aduan">Objek Aduan (No. SHM/Letak Tanah)</label>
                <input name="txtobyek_aduan" type="text" class="form-control form__items" id="txtobyek_aduan" required>
            </div>
            <div class="form-group col-sm-6">
                <label class="form__labels" for="relation">Hubungan hukum dengan tanah</label>
                <input type="text" class="form-control form__items" id="relation" required>
            </div>
            <div class="form-group col-sm-12">
                <label class="form__labels" for="berkas">No Berkas Permohonan (Untuk pelayanan)</label>
                <input name="txtno_berkas" type="text" class="form-control form__items" id="berkas" required>
            </div>
        </div>
        <h2>II. Uraian Pengaduan</h2>
        <div class="form-group">
            <textarea name="txturaian_pengaduan" class="form-control form__items" rows="5" placeholder="Uraikan pengaduan anda disini.." required></textarea>
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
                <div class="form-group col-12">
                <input class="file__upload" type="file" name="bukti4" id="file">
            </div>
            <div class="form-group col-12">
                <input class="file__upload" type="file" name="bukti5" id="file">
            </div>
        </div>
         <div id="formtambahan">    
            <input type="text" class="form-control" id="txtpengaduan_id" name="txtpengaduan_id" value="0" required>
            <input type="text" class="form-control" id="txtjenis_id" name="txtjenis_id" value="1"  required>
            <input type="text" class="form-control" id="txtkanal_id" name="txtkanal_id" value="5"  required>
            <input type="text" class="form-control" id="txtstatus_id" name="txtstatus_id" value="1" required>
            <input type="text" class="form-control" id="txtposisi_id" name="txtposisi_id" value="1" required>
            <input type="text" class="form-control" id="txthubungan" name="txthubungan" value="null"  required>

            <input type="text" class="form-control" id="txtcreate_by" name="txtcreate_by" value="null"  required>
            <input type="text" class="form-control" id="txtupdate_by" name="txtupdate_by" value="null"  required>
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




<!--endform     -->


