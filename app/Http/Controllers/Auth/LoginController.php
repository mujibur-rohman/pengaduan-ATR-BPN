<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

use Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    // protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function authenticated() {
        return redirect(route('indexPusatAdmin'));
        
//        if (Auth::user()->hasRole('responder')) {
//            return redirect(route('indexResponderAdmin'));
//        }  else  if (Auth::user()->hasRole('verifikator')) {
//            return redirect(route('indexVerifikatorAdmin'));
//        }  else if (Auth::user()->hasRole('admin')) {
//           return redirect(route('indexPusatAdmin'));
//        } else {
//            return redirect(route('indexPusatAdmin'));
//        }
    }
}
