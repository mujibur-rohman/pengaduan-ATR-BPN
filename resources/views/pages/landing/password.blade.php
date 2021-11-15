@extends('layouts.landing_default')

@section('htmlheader_title')
    {{ trans('Pelayanan Pengaduan ATR/BPN') }}
@endsection

@section('main-content-mailsent') 

<div class="row mail_sent">
    @if (empty($token))
    <img src="{{asset('assets_fron/images/empty.png')}}" alt="empty">
    <div class="alert" style="width: 100%; ">        
        <p>Maaf token sudah expired atau tidak ada!</p>
        <a href="{{url('/')}}" class="btn">Kembali ke Home</a>
    </div>
    @else
    <div class="col-md-4">
        <img src="{{asset('assets_fron/images/verified.png')}}" alt="verified">
    </div>
    <div class="col-md-8">
        <div class="row">
            <div class="col-md-6">
                <form method="post" id="form-password">
                    <div class="form-group">
                        <div class="alert alert-info">
                            <p>Silahkan buat 6 digit PIN untuk melihat status pengaduan anda. 
                                Mohon menyimpan Kode Tiket &amp; PIN tersebut di tempat aman dan jangan memberikan pada siapapun. 
                                Kode Tiket &amp; PIN bersifat rahasia.
                            </p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form__labels" for="number">Kode Tiket</label>
                        <input name="kode_tiket" type="text" class="form-control" id="kode_tiket" readonly value="{{ $model->kode_tiket }}">
                    </div>
                    <div class="form-group">
                        <label class="form__labels" for="number">Password <span style="color: red">*</span></label>
                        <input name="password" type="password" class="form-control" id="password" required>
                    </div>
                    <div class="form-group">
                        <label class="form__labels" for="number">Ulangi Password <span style="color: red">*</span></label>
                        <input name="password_repeat" type="password" class="form-control" id="password_repeat" required>
                    </div>
                    <div class="form-group">
                        <button id="btnSubmit" type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @endif
</div>
<style type="text/css">
.mail_sent { align-items: normal; }
</style>
<script type="text/javascript">
$(document).ready(function(){
    $('#form-password').submit(function(e){
        e.preventDefault();
        var password = $('#password').val(),
            password_repeat = $('#password_repeat').val(),
            data = {
                _token: '{{ csrf_token() }}',
                password: password,
                password_repeat: password_repeat
            };
            
        if (password === "") { alert('Password tidak boleh kosong'); return; }
        if (password.length < 7) { alert('Panjang password minimal 7 karakter'); return; }
        if (password_repeat === "") { alert('Password tidak boleh kosong'); return; }
        if (password_repeat !== password) { alert('Password dan ulangi password tidak sama'); return; }
        
        $('#btnSubmit').attr('disabled', true);
        $.post("{{ URL::to('/verifikasi') }}?token={{ $token }}", data, function(result){
            if (result.success) {
                alert('Berhasil simpan');
                window.location = "{{ URL::to('/tiket') }}";
            } else {
                alert(result.message);
            }
        }, 'json')
        .done(function(){
            $('#btnSubmit').removeAttr('disabled');
        })
        .fail(function(xhr, status, error){
            alert('Gagal menyimpan. Silahkan ulangi kembali');
        });
    });
});
</script>
@endsection