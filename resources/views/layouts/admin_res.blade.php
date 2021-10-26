<!DOCTYPE html>
<!--
This is a starter template page. Use this page to start your new project from
scratch. This page gets rid of all links and provides the needed markup only.
-->
<html lang="en">

@section('htmlheader')
    @include('layouts.partials.htmlheader_res')
@show

<body class="wide comments example dt-example-bootstrap">
<div id="app">
    <div class="wrapper">`

    @include('layouts.partials.mainheader_res')

    @include('layouts.partials.sidebar_admin_res')

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">

        {{-- @include('layouts.partials.contentheader') --}}

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid spark-screen">
                <!-- Your Page Content Here -->
                <div id="flashmessage" class="row">
                    <div class="col-md-12">
                        @include('flash::message')
                    </div>
                </div>
                @yield('main-content')
            </div>
    </div><!-- /.content-wrapper -->

@section('scripts')
    @include('layouts.partials.scripts_res')
@show

</body>
</html>
