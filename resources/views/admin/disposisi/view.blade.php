
<div class="row" id="menudisposisiView" style="display: none;">
	<div class="col-md-5">
		<div class="panel">
			<div class="profile-header">
				<div class="overlay"></div>
				<div class="profile-main">
					<img src="" id="fotoProfil" class="img-circle" alt="Avatar" width="30%" height="100px">
					<h3 class="name" id="namaProfil"></h3>
					<span class="status-available" id="nipProfil"></span>
				</div>
				
			</div>
			<div class="panel-body">
				<div class="profil-info">
					<h4 class="heading">Profil</h4>	
					<ul class="list-unstyled list-justify">
						<li><b>ID karyawan</b><b><span id="idkaryawan"></span></b></li>
						<li><b>Tempat Lahir</b><b><span id="tempatlahir_profil"></span></b></li>
						<li><b>Tanggal Lahir</b><b><span id="tgllahir_profil"></span></b></li>
						<li><b>Nomor KTP</b><b><span id="noktpprofil"></span></b></li>
						<li><b>Status Keluarga</b><b><span id="statuskeluargaprofil"></span></b></li>
						<li><b>ID Jabatan</b><b><span id="idjabatan"></span></b></li>
						<li><b>Status Pegawai</b><b><span id="statuspegawaiprofil"></span></b></li>
						<div class="row">
							<label class="col-md-4 left">Alamat</label>
							<label class="col-md-8 text-right" id="alamatProfil">test</label>
						</div>
											
					</ul>
				</div>
				<div class="text-center"><a id="editProfile" class="btn btn-warning">Edit Profile</a></div>
			</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="panel">
			<div class="panel-body">
				<div class="profil-info">
					<div class="custom-tabs-line tabs-line-bottom">
						<h4 class="heading">Wilayah Disposis</h4>
					</div>
					<table class="table project-table">
						<thead>
							<tr>
								<th>Status Disposisi</th>
								<th>Nama Wilayah</th>
								<th>Catogori Wilayah</th>
							</tr>
						</thead>
							<tbody id="show_disposisi">
							
							</tbody>
					</table>
					<button type="button" class="btn btn-primary" id="btnkembali">Kembali</button>
				</div>
			<!-- Modal -->
    <!-- atribut pada bootstrap yaitu, data-backdrop="static" yaitu untuk membuat modal tidak hilang pada saat di klik sembarangan -->
    <div class="modal fade" id="myModalProfile" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalProfileTitle"></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="formProfil" method="POST" enctype="multipart/form-data">
                        {{ csrf_field() }}
                            
                        <div class="form-group">
                           <label for="txtidkaryawanprofil" class="form-label">ID karyawan</label>
                            <input type="text" class="form-control" id="txtidkaryawanprofil" name="txtidkaryawanprofil" required>
                        </div>
                            
                        <div class="form-group">
                            <label for="txtnipprofil">NIP</label>
                            <input type="text" class="form-control" id="txtnipprofil" name="txtnipprofil" required>
                        </div>

                        <div class="form-group">
                            <label for="txtnamakaryawanprofil">Nama Lengkap</label>
                            <input type="text" class="form-control" id="txtnamakaryawanprofil" name="txtnamakaryawanprofil" required>
                        </div>

                        <div class="form-group">
                            <label for="txttempatlahirprofil">Tempat Lahir</label>
                            <input type="text" class="form-control" id="txttempatlahirprofil" name="txttempatlahirprofil" required>
                        </div>

                        <div class="form-group">
                            <label for="txttgl_lahirprofil">Tanggal Lahir</label>
                            <div class="input-group date">
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                                <input type="text" class="form-control pull-right" name="txttgl_lahirprofil" id="txttgl_lahirprofil" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="txtalamatprofil">Alamat</label>
                            <textarea name="txtalamatprofil" id="txtalamatprofil" rows="3" class="form-control" required></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="txtno_ktpprofil">No KTP</label>
                            <input type="text" class="form-control" id="txtno_ktpprofil" name="txtno_ktpprofil" required>
                        </div>

                        <div class="form-group">
                            <label for="cmbKeluargaprofil">Status Keluarga</label>
                            <select name="cmbKeluargaprofil" id="cmbKeluargaprofil" class="form-control" required>
                                <option value="">-- Pilih --</option>
                                <option value="Lajang">Lajang</option>
                                <option value="Menikah">Menikah</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="txtid_jabatanprofil">ID Jabatan</label>
                            <input type="text" class="form-control" id="txtid_jabatanprofil" name="txtid_jabatanprofil" required>
                        </div>

                        <div class="form-group">
                            <label for="fotoprofil">Foto</label>
                            <input type="file" class="form-control" id="fotoprofil" name="fotoprofil" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="cmbPegawaiprofil">Status Pegawai</label>
                            <select name="cmbPegawaiprofil" id="cmbPegawaiprofil" class="form-control" required>
                                <option value="">-- Pilih --</option>
                                <option value="Honorer">Honorer</option>
                                <option value="Tetap">Tetap</option>
                            </select>
                        </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnCancel">Keluar</button>
                    <button type="submit" class="btn btn-primary" id="btnSimpan">Simpan</button>
                </div>
                </form>
            </div>

        </div>
    </div>
	<!-- /.Modal Input -->
			</div>
		
		</div>

	</div>
</div>
                    
