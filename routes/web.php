<?php
use Illuminate\Support\Facades\Route;

Route::match(['get'], '/', 'LandingController@index');
Route::match(['get', 'post'], '/simpan', 'LandingController@simpan');
Route::match(['get', 'post'], '/verifikasi', 'LandingController@verifikasi');
Route::match(['get'], '/tiket', 'LandingController@tiket');

Route::middleware(['auth'])->prefix('admin')->group(function(){
    Route::match(['get', 'post'], '/settings', 'Admin\SettingsController@index');
    
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
    });
    
   Route::prefix('pusat')->group(function(){
        Route::get('/','Admin\PusatController@index')->name('indexPusatAdmin');
        Route::post('/','Admin\PusatController@postIndex')->name('postIndexPusatAdmin');
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
        Route::get('/','Admin\FaqController@index')->name('list_faq');
        Route::get('/list','Admin\FaqController@list');
        Route::post('/save','Admin\FaqController@save');
        Route::post('/delete', 'Admin\FaqController@delete');
    });
    
    // menu master mail template
    Route::prefix('mail_template')->group(function(){
        Route::get('/','Admin\Mail_templateController@index')->name('list_mail_template');
        Route::get('/list','Admin\Mail_templateController@list');
        Route::post('/save','Admin\Mail_templateController@save');
        Route::post('/delete', 'Admin\Mail_templateController@delete');
    });
    
    Route::prefix('register')->group(function(){
        Route::get('/','Admin\Register2Controller@index')->name('listregister');
        Route::get('/dataregister', 'Admin\Register2Controller@get')->name('daftarregister');
        Route::get('/datajml', 'Admin\Register2Controller@getmax')->name('maxregister');
        Route::post('/simpanregister', 'Admin\Register2Controller@save')->name('simpanregister');
        Route::get('/getDataregister/{id}', 'Admin\Register2Controller@getregister');
        Route::post('Admin/editDataregister/{id}', 'Admin\Register2Controller@update');
        Route::get('/hapusDataregister/{id}', 'Admin\Register2Controller@delete');
    });
});