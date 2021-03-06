<?php
use Illuminate\Support\Facades\Route;

Route::match(['get'], '/', 'LandingController@index');
Route::match(['get', 'post'], '/simpan', 'LandingController@simpan');
Route::match(['get', 'post'], '/verifikasi', 'LandingController@verifikasi');
Route::match(['get', 'post'], '/tiket', 'LandingController@tiket')->name('tiket');
Route::match(['get', 'post'], '/tiket_login', 'LandingController@tiket_login')->name('tiket_login');

Route::middleware(['auth'])->prefix('admin')->group(function(){
    Route::match(['get', 'post'], '/settings', 'Admin\SettingsController@index');
    Route::match(['post'], '/change_permission', 'Admin\SettingsController@change_permission');
    Route::get('/load_notif', 'Admin\AdminController@load_notif');
    
    Route::prefix('tr_pengaduan')->group(function () {
        Route::get('/view/{id}', 'Admin\Tr_pengaduanController@view')->name('view_pengaduan');
        Route::match(['get', 'post'], '/', 'Admin\Tr_pengaduanController@index'); //->name('listtr_pengaduan');
        Route::get('/get_posisi', 'Admin\Tr_pengaduanController@getPosisi');
        Route::post('/save_admin', 'Admin\Tr_pengaduanController@saveAdmin');
        Route::post('/save_verifikator', 'Admin\Tr_pengaduanController@saveVerifikator');
        Route::post('/save_responder', 'Admin\Tr_pengaduanController@saveResponder');
        Route::get('/get_log', 'Admin\Tr_pengaduanController@getLog');
        Route::post('/lock_release', 'Admin\Tr_pengaduanController@lock_release');
        Route::match(['get', 'post'], '/create', 'Admin\Tr_pengaduanController@create');
        Route::post('/save_create', 'Admin\Tr_pengaduanController@save_create');
        Route::post('/save_tangapan', 'Admin\Tr_pengaduanController@save_tangapan');
    });
    
   Route::prefix('pusat')->group(function(){
        Route::get('/','Admin\PusatController@index')->name('indexPusatAdmin');
        Route::post('/','Admin\PusatController@postIndex')->name('postIndexPusatAdmin');
    }); 
    
    // master pengaduan_posisi
    Route::prefix('posisi')->group(function(){
        Route::get('/','Admin\Pengaduan_posisiController@index')->name('listpengaduan_posisi');
        Route::get('/list','Admin\Pengaduan_posisiController@list');
        Route::post('/save','Admin\Pengaduan_posisiController@save');
        Route::post('/delete', 'Admin\Pengaduan_posisiController@delete');
    });
    
    // Router untuk master data ms_pengaduan_kanal
    Route::prefix('pengaduan_kanal')->group(function(){
        Route::get('/','Admin\Pengaduan_kanalController@index')->name('listpengaduan_kanal');
        Route::get('/list','Admin\Pengaduan_kanalController@list');
        Route::post('/save','Admin\Pengaduan_kanalController@save');
        Route::post('/delete', 'Admin\Pengaduan_kanalController@delete');
    });

    // master pengaduan_status
    Route::prefix('pengaduan_status')->group(function(){
        Route::get('/','Admin\Pengaduan_statusController@index')->name('listpengaduan_status');
        Route::get('/list','Admin\Pengaduan_statusController@list');
        Route::post('/save','Admin\Pengaduan_statusController@save');
        Route::post('/delete', 'Admin\Pengaduan_statusController@delete');
    });

    // Master pengaduan klasifikasi
    Route::prefix('klasifikasi')->group(function(){
        Route::get('/','Admin\Pengaduan_klasifikasiController@index')->name('listpengaduan_klasifikasi');
        Route::get('/list','Admin\Pengaduan_klasifikasiController@list');
        Route::post('/save','Admin\Pengaduan_klasifikasiController@save');
        Route::post('/delete', 'Admin\Pengaduan_klasifikasiController@delete');
    });

    // Master pengaduan kategori
    Route::prefix('kategori')->group(function(){
        Route::get('/','Admin\Pengaduan_kategoriController@index')->name('listpengaduan_kategori');
        Route::get('/list','Admin\Pengaduan_kategoriController@list');
        Route::post('/save','Admin\Pengaduan_kategoriController@save');
        Route::post('/delete', 'Admin\Pengaduan_kategoriController@delete');
    });

    // Master pengaduan jenis
    Route::prefix('jenis')->group(function(){
        Route::get('/','Admin\Pengaduan_jenisController@index')->name('listpengaduan_jenis');
        Route::get('/list','Admin\Pengaduan_jenisController@list');
        Route::post('/save','Admin\Pengaduan_jenisController@save');
        Route::post('/delete', 'Admin\Pengaduan_jenisController@delete');
    });
    
    // Master FaQ
    Route::prefix('faq')->group(function(){
        Route::get('/','Admin\MsFaqsController@index')->name('list_faq');
        Route::get('/list','Admin\MsFaqsController@list');
        Route::post('/save','Admin\MsFaqsController@save');
        Route::post('/delete', 'Admin\MsFaqsController@delete');
    });
    
    Route::get('/daftarfaq','Admin\MsFaqsController@daftarfaq');

    
    // menu master mail template
    Route::prefix('mail_template')->group(function(){
        Route::get('/','Admin\Mail_templateController@index')->name('list_mail_template');
        Route::get('/list','Admin\Mail_templateController@list');
        Route::post('/save','Admin\Mail_templateController@save');
        Route::post('/delete', 'Admin\Mail_templateController@delete');
    });
    
    Route::prefix('register')->group(function(){
        Route::get('/','Admin\Register2Controller@index')->name('listregister');
        Route::get('/list', 'Admin\Register2Controller@list');
        Route::post('/save', 'Admin\Register2Controller@save');
    });

	Route::get('/','Admin\AdminController@index')->name('indexAdmin');

	Route::prefix('pendaftaran')->group(function(){
		Route::get('/{id_jadwal?}','Admin\PendaftaranController@index')->name('indexPendaftaranAdmin');
		Route::post('/','Admin\PendaftaranController@postIndex')->name('postIndexPendaftaranAdmin');
		Route::get('add','Admin\PendaftaranController@add')->name('addPendaftaranAdmin');
		Route::post('add','Admin\PendaftaranController@postAdd')->name('postAddPendaftaranAdmin');
		Route::get('edit/{id?}','Admin\PendaftaranController@edit')->name('editPendaftaranAdmin');
		Route::post('update/{id}','Admin\PendaftaranController@update')->name('updatePendaftaranAdmin');
		Route::get('delete/{id?}','Admin\PendaftaranController@delete')->name('deletePendaftaranAdmin');
		Route::get('detail/{id?}','Admin\PendaftaranController@detail')->name('detailPendaftaranAdmin');
		
		Route::post('ajax/search','Admin\PendaftaranController@ajaxSearch')->name('ajaxSearchPendaftaranAdmin');
		Route::post('search','Admin\PendaftaranController@search')->name('searchAdvancePendaftaranAdmin');
		
		Route::post('ajax/show','Admin\PendaftaranController@ajaxShow')->name('ajaxShowPendaftaranAdmin');
		Route::post('search/{id_jadwal?}/{q?}','Admin\PendaftaranController@postSearch')->name('postSearchPendaftaranAdmin');
		// Route::get('detail','Admin\TahunAjaranControllern@index')->name('detailTahunAjaranAdmin');
	});

	Route::prefix('pembayaran')->group(function(){
		Route::get('/','Admin\PembayaranController@index')->name('indexPembayaranAdmin');
		Route::get('add','Admin\PembayaranController@add')->name('addPembayaranAdmin');
		Route::post('add','Admin\PembayaranController@postAdd')->name('postAddPembayaranAdmin');
		Route::get('edit/{id}','Admin\PembayaranController@edit')->name('editPembayaranAdmin');
		Route::post('update/{id}','Admin\PembayaranController@update')->name('updatePembayaranAdmin');
		Route::get('delete/{id}','Admin\PembayaranController@delete')->name('deletePembayaranAdmin');
		Route::get('detail/{id}','Admin\PembayaranController@detail')->name('detailPembayaranAdmin');
		Route::post('verifikasi','Admin\PembayaranController@postVerifikasi')->name('postVerifikasiPembayaranAdmin');
	});
	
	Route::prefix('pusat')->group(function(){
		Route::get('/','Admin\PusatController@index')->name('indexPusatAdmin');
		Route::post('/','Admin\PusatController@postIndex')->name('postIndexPusatAdmin'); 
        Route::get('/list','Admin\PusatController@list');
	});
	
		
   //yang baru 20210930
    // kategori_pengaduan
	Route::prefix('kategori_pengaduan')->group(function(){
	//Route::get('/','admin\Kategori_pengaduanController@allkategori_pengaduan')->name('listkategori_pengaduan');
    Route::get('/kategori_pengaduan', 'Kategori_pengaduanController@allkategori_pengaduan')->name('listkategori_pengaduan');
    Route::get('/datakategori_pengaduan', 'Kategori_pengaduanController@get')->name('daftarkategori_pengaduan');
    Route::get('/datajml', 'Kategori_pengaduanController@getmax')->name('maxkategori_pengaduan');
    Route::post('/simpankategori_pengaduan', 'Kategori_pengaduanController@save')->name('simpankategori_pengaduan');
    Route::get('/getDatakategori_pengaduan/{id}', 'Kategori_pengaduanController@getkategori_pengaduan');
    Route::post('/editDatakategori_pengaduan/{id}', 'Kategori_pengaduanController@update');
    Route::get('/hapusDatakategori_pengaduan/{id}', 'Kategori_pengaduanController@delete');

		});
     // provinsi_Verifikator
	 Route::prefix('provinsi_Verifikator')->group(function(){
	//	Route::get('/','admin\Provinsi_VerifikatorController@allprovinsi_Verifikator')->name('listprovinsi_Verifikator');
     Route::get('/provinsi_Verifikator', 'Provinsi_VerifikatorController@allprovinsi_Verifikator')->name('listprovinsi_Verifikator');
     Route::get('/dataprovinsi_Verifikator', 'Provinsi_VerifikatorController@get')->name('daftarprovinsi_Verifikator');
     Route::get('/datajml', 'Provinsi_VerifikatorController@getmax')->name('maxprovinsi_Verifikator');
     Route::post('/simpanprovinsi_Verifikator', 'Provinsi_VerifikatorController@save')->name('simpanprovinsi_Verifikator');
     Route::get('/getDataprovinsi_Verifikator/{id}', 'Provinsi_VerifikatorController@getprovinsi_Verifikator');
     Route::post('/editDataprovinsi_Verifikator/{id}', 'Provinsi_VerifikatorController@update');
     Route::get('/hapusDataprovinsi_Verifikator/{id}', 'Provinsi_VerifikatorController@delete');
	});

     // karyawan
	 Route::prefix('karyawan')->group(function(){
	//	Route::get('/','admin\KaryawanController@index')->name('indexkaryawan');
    Route::get('/karyawan', 'KaryawanController@index')->name('indexkaryawan');
    Route::get('/daftarkaryawan', 'KaryawanController@get')->name('getkaryawan');
    Route::post('/simpankaryawan', 'KaryawanController@save')->name('simpanDatakaryawan');
    Route::get('/cariProfilkaryawan/{id}', 'KaryawanController@getProfil');
    Route::get('/cariDatakaryawan/{id}', 'KaryawanController@getkaryawan');
    Route::post('/editkaryawan/{id}', 'KaryawanController@update');
    Route::get('/hapusDatakaryawan/{id}', 'KaryawanController@delete');
    Route::get('/editProfilkaryawan/{id}', 'KaryawanController@getkaryawan');
    Route::post('/updateProfilekaryawan/{id}', 'KaryawanController@updateProfile');
		}); 
    
     // disposisi
     Route::prefix('disposisi')->group(function(){
	//	Route::get('/','Admin\DisposisiController@index')->name('indexdisposisi');
     Route::get('/disposisi', 'DisposisiController@index')->name('indexdisposisi');
     Route::get('/daftardisposisi', 'DisposisiController@get2')->name('getdisposisi');
     Route::post('/simpandisposisi', 'DisposisiController@save')->name('simpanDatadisposisi');
     Route::get('/cariProfildisposisi/{id}', 'DisposisiController@getProfil');
     Route::get('/cariDatadisposisi/{id}', 'DisposisiController@getdisposisi');
     Route::post('/editdisposisi/{id}', 'DisposisiController@update');
     Route::get('/hapusDatadisposisi/{id}', 'DisposisiController@delete');
     Route::get('/editProfildisposisi/{id}', 'DisposisiController@getdisposisi');
     Route::post('/updateProfiledisposisi/{id}', 'DisposisiController@updateProfile');
     Route::get('/getidkaryawan/{id}', 'DisposisiController@getkaryawan');
    }); 

			// Route::prefix('pengaduan_status')->group(function(){
			// 	Route::get('/','Admin\Pengaduan_statusController@index')->name('listpengaduan_status');
			// 	 Route::get('/datapengaduan_status', 'Admin\Pengaduan_statusController@get')->name('daftarpengaduan_status');
			// 	 Route::get('/datajml', 'Admin\Pengaduan_statusController@getmax')->name('maxpengaduan_status');
			// 	 Route::post('/simpanpengaduan_status', 'Admin\Pengaduan_statusController@save')->name('simpanpengaduan_status');
			// 	 Route::get('/getDatapengaduan_status/{id}', 'Admin\Pengaduan_statusController@getpengaduan_status');
			// 	 Route::post('Admin/editDatapengaduan_status/{id}', 'Admin\Pengaduan_statusController@update');
			// 	 Route::get('/hapusDatapengaduan_status/{id}', 'Admin\Pengaduan_statusController@delete');
			// 	});

			Route::prefix('pengaduan_jenis')->group(function(){
			Route::get('/','Admin\Pengaduan_jenisController@index')->name('listpengaduan_jenis');
			 Route::get('/datapengaduan_jenis', 'Admin\Pengaduan_jenisController@get')->name('daftarpengaduan_jenis');
			 Route::get('/datajml', 'Admin\Pengaduan_jenisController@getmax')->name('maxpengaduan_jenis');
			 Route::post('/simpanpengaduan_jenis', 'Admin\Pengaduan_jenisController@save')->name('simpanpengaduan_jenis');
			 Route::get('/getDatapengaduan_jenis/{id}', 'Admin\Pengaduan_jenisController@getpengaduan_jenis');
			 Route::post('Admin/editDatapengaduan_jenis/{id}', 'Admin\Pengaduan_jenisController@update');
			 Route::get('/hapusDatapengaduan_jenis/{id}', 'Admin\Pengaduan_jenisController@delete');
			});

	Route::prefix('kota')->group(function () {
		Route::get('Admin/kota/{id}', 'Admin\KotaController@postIndex')->name('listkota');
		Route::get('/datakota', 'Admin\KotaController@get')->name('daftarkota');
		
	});


    //end baru
});
//end group admin  untuk admin
// //pemanggilan untuk user role Verifikator juga di bawahnya untuk Responder
Route::group(['prefix'=>'log1', 'middleware' => ['auth','role:Verifikator']], function(){
	Route::prefix('Verifikator')->group(function(){
		Route::get('/','Admin\VerifikatorController@index')->name('indexVerifikatorAdmin');
		Route::get('/tr_pengaduan/{idu}/{idu1}', 'Admin\Tr_pengaduanController@index_verifikasi')->name('verifikasi_tr_pengaduan');
		Route::get('/tr_pengaduan/non_medsos', 'Admin\Tr_pengaduanController@index_non_medsos_user')->name('verifikasi_tr_pengaduannon_medsos');
    	
		});
});
Route::group(['prefix'=>'log2', 'middleware' => ['auth','role:Responder']], function(){
	Route::prefix('Responder')->group(function(){
		Route::get('/','Admin\ResponderController@index')->name('indexResponderAdmin');
		Route::get('/tr_pengaduan/{idu}/{idu1}', 'Admin\Tr_pengaduanController@index_responder')->name('responder_tr_pengaduan');
    	Route::get('/tr_pengaduan/non_medsos', 'Admin\Tr_pengaduanController@index_non_medsos_user')->name('responder_tr_pengaduannon_medsos');
    
		});
});

Route::get('/form', 'Admin\Tr_pengaduanController@index2')->name('listformpengaduan');
Route::get('/datatr_pengaduan', 'Admin\Tr_pengaduanController@get')->name('daftarformpengaduan');
Route::get('/datajml2', 'Admin\Tr_pengaduanController@getmax')->name('maxformpengaduan');
   // Route::get('/datajml2', 'Admin\Tr_pengaduanController@getmax_form')->name('maxformpengaduan');

Route::post('/simpantr_pengaduan', 'Admin\Tr_pengaduanController@save')->name('formpengaduan');
Route::post('/simpantr_pengaduan2', 'Admin\Tr_pengaduanController@saveform')->name('formpengaduan2');
Route::get('/getDatatr_pengaduan/{id}', 'Admin\Tr_pengaduanController@gettr_pengaduan');
Route::post('Admin/editDatatr_pengaduan/{`id`}', 'Admin\Tr_pengaduanController@update');
Route::get('/hapusDatatr_pengaduan/{id}', 'Admin\Tr_pengaduanController@delete');

Route::get('logout', function(){
	Auth::logout();
	return redirect(route('login'));
});
Route::match(['get', 'post'], 'register', function(){
    return redirect('/login');
});
Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Auth::routes();