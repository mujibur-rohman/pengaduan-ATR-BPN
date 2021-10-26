@extends('layouts.app')

@section('content')
<div class="container">
    <div class="col-md-12 col-sm-12 input-group stylish-input-group">
       
        <div class="col-md-12 left-info" style="margin-top:10px;margin-left:70px;">
            
                    
                    @if ($errors->has('email') || $errors->has('password'))
                        <div class="alert alert-danger">
                            <h4>Username / Password yang Anda masukkan Salah</h4>
                            <p>Silahkan cek kembali</p>
                        </div>
                    @endif
                    <form   method="POST" action="{{ route('login') }}">
                        {{ csrf_field() }}
                         <div class="col-md-4 left-info" style="margin-top:10px;margin-left:70px;">
                                <div class="fieldset">
                                    <div class="field">
                                        <div class="col-md-12">
                                             <a>
                                            <img src="{{asset('assets_fron/images/Sign_in.png')}}" align="central" height="500" widht="500">
                                        </a>
                                        </div>
                                    </div>
                                </div>
                            
                        </div>
                        <div class="col-md-6 left-info" style="margin-top:10px;margin-left:70px;">
                                <div class="fieldset">
                                    <div >
                                    </div>
                                        <h2>Sign In</h2>
                                        <h4>Silakan Sign In untuk masuk ke Portal Pengaduan</h4>
                                         <span class=logo-sm>
                                            <img src="{{asset('assets_fron/images/logo.png')}}" align="middle" height="120" width="100">
                                        </span>
                                        <div class="field">
                                            <div class="form-group">
                                                <div class="col-md-12">
                                                    <label for="email" class="col-md-0 control-label">E-Mail</label>
                                                    <input id="email"  type="email" class="form-control" name="email" value="{{ old('email') }}" required autofocus oninvalid="this.setCustomValidity('Username tidak boleh kosong / Penulisan Email Salah')" oninput="setCustomValidity('')">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="form-group">
                                                <div class="col-md-12">
                                                    <label for="password" class="col-md-0 control-label">Password</label>
                                                    <input id="password" type="password" class="form-control" name="password" required oninvalid="this.setCustomValidity('Password tidak boleh kosong')" oninput="setCustomValidity('')">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="field">
                                            <div class="col-md-10">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                                <label class="form-check-label"&nbsp; &nbsp; for="flexCheckDefault">
                                                    Remember me?
                                                </label>
                                                <a class="col-md-10">
                                                <label class="form-check-label" for="">
                                                   Porget Password
                                                </label>
                                                </a>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                        <div class="field">
                                            <div class="form-group">
                                                <div class="col-md-8 col-md-offset-4">
                                                    <button type="submit" class="btn btn-warning">
                                                        Sign In
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>

                                    
                           
                          
                        </form>
                    </div>
                </div>
            </div>
      
</div>
@endsection
