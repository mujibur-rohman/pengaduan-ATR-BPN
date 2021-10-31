<!DOCTYPE html>

<html lang="en">
@section('htmlheader')
    @include('layouts.partials.htmlheader_landing')
@show

<body><div class="wrapper">

    <!-- Preloader Start -->
    <div class="se-pre-con" style="display: none;"></div>
    <!-- Preloader Ends -->

    <!-- Header 
    ============================================= -->
    <header id="home">
     	@include('layouts.partials.mainheader_landing')	
    </header>
       
	 	@yield('main-content')
	
    @include('layouts.partials.footer_landing_default')

@section('scripts')
    @include('layouts.partials.scripts_landing')
@show
</div>
</body>
</html>



