
<div class="panel panel-profile" id="menudisposisiView" style="display: none;">
						<div class="clearfix">
							<!-- LEFT COLUMN -->
							<div class="profile-left">
								<!-- PROFILE HEADER -->
								<div class="profile-header">
									<div class="overlay"></div>
									<div class="profile-main">
										<img src="" id="fotoProfil" class="img-circle" alt="Avatar" width="30%" height="100px">
										<h3 class="name" id="namaProfil"></h3>
										<span class="status-available" id="nipProfil"></span>
									</div>
									
								</div>
								<!-- END PROFILE HEADER -->
								<!-- PROFILE DETAIL -->
								<div class="profile-detail">
									<div class="profile-info">
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
								<!-- END PROFILE DETAIL -->
							</div>
							<!-- END LEFT COLUMN -->
							<!-- RIGHT COLUMN -->
							<!-- Modal -->
    <!-- atribut pada bootstrap yaitu, data-backdrop="static" yaitu untuk membuat modal tidak hilang pada saat di klik sembarangan -->
    <div class="modal fade" id="myModalProfile" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalProfileTitle">Tambah Data Siswa</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="formProfil" method="POST" enctype="multipart/form-data">
                        {{ csrf_field() }}
                            
                        <div class="form-group">
                           <label for="txtnis2" class="form-label">NIS</label>
                            <input type="text" class="form-control" id="txtnis2" name="txtnis2" required>
                        </div>
                            
                        <div class="form-group">
                            <label for="txtnamasiswa2">Nama Lengkap</label>
                            <input type="text" class="form-control" id="txtnamasiswa2" name="txtnamasiswa2" required>
                        </div>
                        <div class="form-group">
                            <label for="cmbjenis_kelamin2">Jenis Kelamin</label>
                            <select name="cmbjenis_kelamin2" id="cmbjenis_kelamin2" class="form-control" required>
                                <option value="">-- Pilih --</option>
                                <option value="L">Laki - laki</option>
                                <option value="W">Wanita</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="txttempat_lahir2">Tempat Lahir</label>
                            <input type="text" class="form-control" id="txttempat_lahir2" name="txttempat_lahir2" required>
                        </div>
                        <div class="form-group">
                            <label for="txttgl_lahir2">Tanggal Lahir</label>
                            <div class="input-group date">
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                                <input type="text" class="form-control pull-right" name="txttgl_lahir2" id="txttgl_lahir2" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="txtalamat2">Alamat</label>
                            <textarea name="txtalamat2" id="txtalamat2" rows="3" class="form-control" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="txtno_hp2">No Handphone</label>
                            <input type="text" class="form-control" id="txtno_hp2" name="txtno_hp2" required>
                        </div>
                        <div class="form-group">
                            <label for="foto2">Foto</label>
                            <input type="file" class="form-control" id="foto2" name="foto2">
                        </div>
                        <div class="form-group">
                            <label for="cmbkelas2">Kelas</label>
                            <select name="cmbkelas2" id="cmbkelas2" class="form-control" required>
                                <option value="">-- Pilih --</option>
                                
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="txtasal_sekolah2">Asal Sekolah</label>
                            <input type="text" class="form-control" id="txtasal_sekolah2" name="txtasal_sekolah2" required>
                        </div>
                        <div class="form-group">
                            <label for="txtnama_ortu2">Nama Orang Tua</label>
                            <input type="text" class="form-control" name="txtnama_ortu2" id="txtnama_ortu2" required>
                        </div>
                        <div class="form-group">
                            <label for="txtpekerjaan_ortu2">Pekerjaan Orang Tua</label>
                            <input type="text" class="form-control" name="txtpekerjaan_ortu2" id="txtpekerjaan_ortu2" required>
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
	<div class="modal fade" id="modalLoader2" role="dialog" tabindex="-1">
        <div style=" position: fixed; margin-left: 50%; margin-top: 20%; ">
            <img src="{{ asset('img/loader.gif')}}" style=" width: 50px;" alt="loading..." />
        </div>
    </div>
							
							<div class="profile-right">
							
								<!-- TABBED CONTENT -->
								<div class="custom-tabs-line tabs-line-bottom left-aligned">
									
									<ul class="nav" role="tablist">
										<li class="active"><a href="#tab-bottom-left2" role="tab" data-toggle="tab">Asal Sekolah</a></li>							
									</ul>
									
									
									
								</div>
								
								<div class="tab-content">
									
									<div class="tab-pane fade in active" id="tab-bottom-left2">
										<div class="table-responsive">
											<table class="table project-table">
												<thead>
													<tr>
														<th>Title</th>
														<th>Progress</th>
														<th>Leader</th>
														<th>Status</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td><a href="#">Spot Media</a></td>
														<td>
															<div class="progress">
																<div class="progress-bar" role="progressbar"
																	aria-valuenow="60" aria-valuemin="0"
																	aria-valuemax="100" style="width: 60%;">
																	<span>60% Complete</span>
																</div>
															</div>
														</td>
														<td><img src="assets/img/user2.png" alt="Avatar"
																class="avatar img-circle"> <a href="#">Michael</a></td>
														<td><span class="label label-success">ACTIVE</span></td>
													</tr>
													<tr>
														<td><a href="#">E-Commerce Site</a></td>
														<td>
															<div class="progress">
																<div class="progress-bar" role="progressbar"
																	aria-valuenow="33" aria-valuemin="0"
																	aria-valuemax="100" style="width: 33%;">
																	<span>33% Complete</span>
																</div>
															</div>
														</td>
														<td><img src="assets/img/user1.png" alt="Avatar"
																class="avatar img-circle"> <a href="#">Antonius</a></td>
														<td><span class="label label-warning">PENDING</span></td>
													</tr>
													<tr>
														<td><a href="#">Project 123GO</a></td>
														<td>
															<div class="progress">
																<div class="progress-bar" role="progressbar"
																	aria-valuenow="68" aria-valuemin="0"
																	aria-valuemax="100" style="width: 68%;">
																	<span>68% Complete</span>
																</div>
															</div>
														</td>
														<td><img src="assets/img/user1.png" alt="Avatar"
																class="avatar img-circle"> <a href="#">Antonius</a></td>
														<td><span class="label label-success">ACTIVE</span></td>
													</tr>
													<tr>
														<td><a href="#">Wordpress Theme</a></td>
														<td>
															<div class="progress">
																<div class="progress-bar" role="progressbar"
																	aria-valuenow="75" aria-valuemin="0"
																	aria-valuemax="100" style="width: 75%;">
																	<span>75%</span>
																</div>
															</div>
														</td>
														<td><img src="assets/img/user2.png" alt="Avatar"
																class="avatar img-circle"> <a href="#">Michael</a></td>
														<td><span class="label label-success">ACTIVE</span></td>
													</tr>
													<tr>
														<td><a href="#">Project 123GO</a></td>
														<td>
															<div class="progress">
																<div class="progress-bar progress-bar-success"
																	role="progressbar" aria-valuenow="100"
																	aria-valuemin="0" aria-valuemax="100"
																	style="width: 100%;">
																	<span>100%</span>
																</div>
															</div>
														</td>
														<td><img src="assets/img/user1.png" alt="Avatar"
																class="avatar img-circle" /> <a href="#">Antonius</a>
														</td>
														<td><span class="label label-default">CLOSED</span></td>
													</tr>
													<tr>
														<td><a href="#">Redesign Landing Page</a></td>
														<td>
															<div class="progress">
																<div class="progress-bar progress-bar-success"
																	role="progressbar" aria-valuenow="100"
																	aria-valuemin="0" aria-valuemax="100"
																	style="width: 100%;">
																	<span>100%</span>
																</div>
															</div>
														</td>
														<td><img src="assets/img/user5.png" alt="Avatar"
																class="avatar img-circle" /> <a href="#">Jason</a></td>
														<td><span class="label label-default">CLOSED</span></td>
													</tr>
												</tbody>
											</table>
											<br><br><br><br><br><br><br><br><br><br>
											
											
											
										</div>
									</div>
								</div>
								<!-- END TABBED CONTENT -->
							</div>
							<!-- END RIGHT COLUMN -->
						</div>
                    </div>
                    
