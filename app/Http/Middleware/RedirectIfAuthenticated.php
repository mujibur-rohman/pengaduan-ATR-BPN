<?php

namespace App\Http\Middleware;

// use Auth;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->check()) {
            if (Auth::user()->hasRole('Responder')) {
                return redirect(route('indexResponderAdmin'));
            } else
            if (Auth::user()->hasRole('Verifikator')) {
                return redirect(route('indexVerifikatorAdmin'));
            } else if (Auth::user()->hasRole('admin')) {
                return redirect(route('indexPusatAdmin'));
            } else {
                return redirect(route('logout'));
            }
            // return redirect('/home');
        }

        return $next($request);
    }
}
