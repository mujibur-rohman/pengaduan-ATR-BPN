@extends('layouts.landing_default')

@section('htmlheader_title')
    {{ trans('Pelayanan Pengaduan ATR/BPN') }}
@endsection

@section('main-content-mailsent') 

<div class="row mail_sent">
    
    <div class="col-md-4">
        <img src="{{asset('assets_fron/images/verified.png')}}" alt="verified">
    </div>
    <div class="col-md-8">
        <div class="row">
            <div class="col-md-6">
                <form method="post" id="form-password" action="{{ URL::to('tiket_login') }}">
                    {{ csrf_field() }}
                    @if ($message = Session::get('error'))
                    <div class="alert alert-danger alert-block">
                        <button type="button" class="close" data-dismiss="alert">×</button>    
                        <strong>{{ $message }}</strong>
                    </div>
                    @endif
                    <div class="form-group">
                        <label class="form__labels" for="number">Kode Tiket</label>
                        <input name="kode_tiket" type="text" class="form-control" id="kode_tiket">
                    </div>
                    <div class="form-group">
                        <label class="form__labels" for="number">Password <span style="color: red">*</span></label>
                        <input name="password" type="password" class="form-control" id="password" required>
                    </div>
                    <div class="form-group">
                        <button id="btnSubmit" type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<style type="text/css">
.mail_sent { align-items: normal; }
</style>
<script type="text/javascript">
$(document).ready(function(){
//    $('#form-password').submit(function(e){
//        e.preventDefault();
//        var password = $('#password').val(),
//            password_repeat = $('#password_repeat').val(),
//            data = $('#form-password').serialize();
//            
//        if (password === "") { alert('Password tidak boleh kosong'); return; }
//        if (password.length < 7) { alert('Panjang password minimal 7 karakter'); return; }
//        if (password_repeat === "") { alert('Password tidak boleh kosong'); return; }
//        if (password_repeat !== password) { alert('Password dan ulangi password tidak sama'); return; }
//        
//        $('#btnSubmit').attr('disabled', true);
//        $.post("{{ URL::to('/token_login') }}", data, function(result){
//            if (result.success) {
//                window.location = "{{ URL::to('/token') }}";
//            } else {
//                alert(result.message);
//            }
//        }, 'json')
//        .done(function(){
//            $('#btnSubmit').removeAttr('disabled');
//        })
//        .fail(function(xhr, status, error){
//            alert('Gagal login. Silahkan ulangi kembali');
//        });
//    });
});
</script>
@endsection