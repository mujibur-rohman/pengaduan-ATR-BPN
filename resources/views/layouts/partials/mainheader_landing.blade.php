<header id="header" class="header">
    <nav class="_nav">
        <button class="navbar-toggle toggle__menu">
            <i class="fa fa-bars"></i>
        </button>
        <a class="nav_logo" href="{{ url('/login') }}">
            <img src="{{ asset('assets_fron/images/logo-atr2.png') }}" class="logo__header" alt="Logo">
        </a>
        <ul class="nav_link">
            <li class="list-unstyled">
                <a href="#beranda" class="nav__items">Beranda</a>
            </li>
            <li class="list-unstyled">
                <a href="#tentang" class="nav__items">Tentang</a>
            </li>
            <li class="list-unstyled">
                <a href="#plot" class="nav__items">Alur Kerja</a>
            </li>
            <li class="list-unstyled">
                <a href="#fitur" class="nav__items">Fitur</a>
            </li> 
            <li class="list-unstyled">
                <a href="#faq" class="nav__items">Faq</a>
            </li>
            <li class="list-unstyled">
                <a href="#form" class="nav__items">Form Pengaduan</a>
            </li>
            <li class="list-unstyled">
                <a href="{{ url('/login') }}" class="btn btn-color login-header nav__items">Login</a>
            </li>
        </ul>
        
    </nav>
</header>