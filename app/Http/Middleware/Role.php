<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class Role
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {

        

        //     if (Auth::user()->hasRole('kantah')) {
        //         return redirect(route('indexKantahAdmin'));
        //     }  else  if (Auth::user()->hasRole('kanwil')) {
        //         return redirect(route('indexKanwilAdmin'));
        //     }  else if (Auth::user()->hasRole('admin')) {
        //        return redirect(route('indexPusatAdmin'));
        //     } else {
        //         return redirect(route('logout'));
        //     }
        //     return $next($request);
 
        // }      




        if (! $request->user()->hasRole($role)) {
            if (Auth::user()->hasRole('Responder')) {
                return redirect(route('indexResponderAdmin'));
            } else if (Auth::user()->hasRole('Verifikator')) {
                return redirect(route('indexVerifikatorAdmin'));
            } else if (Auth::user()->hasRole('admin')) {
                return redirect(route('indexPusatAdmin'));
            } else {
                return redirect(route('logout'));
            }
        }
        return $next($request);
    }
}
