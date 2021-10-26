    <div class="container">
        <div class="row">
            <!-- Start Navigation -->
            <nav id="mainNav" class="navbar navbar-default navbar-fixed white bootsnav on no-full nav-box no-background">

                <div class="container">            

                     <!-- Start Atribute Navigation -->
                    <div class="attr-nav button-light">
                        <ul>
                            <li>
                                <a href="{{ url('/login') }}" target="">login</a>
                            </li>
                        </ul>
                    </div>
                    <!-- End Atribute Navigation -->

                    <!-- Start Header Navigation -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                            <i class="fa fa-bars"></i>
                        </button>
                        <a class="navbar-brand" href="{{ url('/login') }}">
                        <img src="{{ asset('assets_fron/images/logo-atr2.png') }}" class="logo" alt="Logo"></a>
                    </div>
                    <!-- End Header Navigation -->

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="navbar-menu">
                        <ul class="nav navbar-nav navbar-right" data-in="#" data-out="#">
                            <li class="active">
                                <a href="#home" class="smooth-menu">Beranda </a>
                            </li>
                            <li>
                                <!-- <a class="smooth-menu" href="{{route('listformpengaduan')}}">Form Pengaduan</a> -->
                                <a class="smooth-menu" href="#form"  >Form Pengaduan</a>
                            </li>
                            <li>
                                <a class="smooth-menu" href="#about">Tentang</a>
                            </li>
                            <li>
                                <a class="smooth-menu" href="#features">Fitur</a>
                            </li>
                            <li>
                                <a class="smooth-menu" href="#process">Alur Kerja</a>
                            </li>
                            <!-- <li>
                                <a class="smooth-menu" href="#aduan-langsung">Buat Aduan</a>
                            </li> -->
                            <li>
                                <a class="smooth-menu" href="#faq">FAQ</a>
                            </li>
                            <li>
                                <a class="smooth-menu" href="#contact">Kontak</a>
                            </li>
                        </ul>
                    </div><!-- /.navbar-collapse -->
                </div>   

            </nav>
            <!-- End Navigation -->
            <div class="clearfix"></div>
            
        </div>
    </div>
