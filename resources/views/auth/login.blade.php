@extends('layouts.app')

@section('content')
<div class="login-page">
    <img class="image-login" src="{{asset('assets_fron/images/Sign_in.png')}}" alt="login">
    <div class="login-form">
        <h1 class="title-login">Portal Pengelolaan Pengaduan ATR/BPN</h1>
        <img class="logo-login" src="{{asset('assets_fron/images/logo.png')}}" alt="">

        <h3 style="font-weight: bold;">Sign In</h3>

        @if ($errors->has('email') || $errors->has('password'))
            <div class="alert-login alert-danger alert">
                <h4>Username / Password yang Anda masukkan Salah</h4>
                <p>Silahkan cek kembali</p>
            </div>
        @endif

        <div class="form-layouts">
            <form action="{{ route('login') }}" method="POST">
                {{ csrf_field() }}
                <div class="form-grup">
                    <label for="email" class="label-form">E-Mail</label>
                    <input id="email"  type="email" class="form-control" name="email" value="{{ old('email') }}" required autofocus oninvalid="this.setCustomValidity('Username tidak boleh kosong / Penulisan Email Salah')" oninput="setCustomValidity('')">
                </div>
                <div class="form-grup">
                    <label for="password" class="label-form">Password</label>
                    <input id="password" type="password" class="form-control" name="password" required oninvalid="this.setCustomValidity('Password tidak boleh kosong')" oninput="setCustomValidity('')">
                </div>
                <div class="remember">
                    <div>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label"&nbsp; &nbsp; for="flexCheckDefault">Remember me?</label>
                    </div>
                    <a>
                        <label class="form-check-label" for="">Forgot Password</label>
                    </a>
                </div>
                <div class="btn-login">
                    <button type="submit" class="btn">Sign In</button>
                </div>
               
            </form>
        </div>
    </div>
</div>
@endsection
