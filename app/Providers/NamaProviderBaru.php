<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class NamaProviderBaru extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        
        //pengaturan halaman
        $page = '';
        if(Request::segment(1) == 'about') {
          $page = 'Tentang Kami';
        }
        if(Request::segment(1) == 'show-galeri') {
          $page = 'Galeri';
        }
        if(Request::segment(1) == 'posisi-kerja') {
          $page = 'Posisi Kerja';
        }

        // global array statis
        $categories = [
          'food'     => 'Food',
          'non-food' => 'Non-food',
          'fashion'  => 'Fashion',
          'fresh'    => 'Fresh'
        ];

        // global variabel
        $data['profil'] = Profil::latest()->first();

        $shareddata = [
          'profil' => $data['profil'],
          'page'   => $page,
          'categories' => $categories
        ];
        View::share($shareddata);
    
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
