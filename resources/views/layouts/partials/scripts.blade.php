  <!-- JAVASCRIPT -->
        <script src="{{ asset('assets_back/js/jquery.js') }}"></script>
        <script src="{{ asset('assets_back/js/bootstrap.js') }}"></script>
        <script src="{{ asset('assets_back/js/metisMenu.js') }}"></script>
        <script src="{{ asset('assets_back/js/simplebar.js') }}"></script>
         <script src="{{ asset('assets_back/js/waves.js') }}"></script> 
        <script src="{{ asset('assets_back/js/feather.js') }}"></script>
        <!-- pace js -->
        <script src="{{ asset('assets_back/js/pace.js') }}"></script>

        <!-- apexcharts -->
        <script src="{{ asset('assets_back/js/apexcharts.js') }}"></script>

        <!-- Plugins js-->
        <script src="{{ asset('assets_back/js/jquery-jvectormap-1.js') }}"></script>
        <script src="{{ asset('assets_back/js/jquery-jvectormap-world-mill-en.js') }}"></script>
        <!-- dashboard init -->
        <script src="{{ asset('assets_back/js/dashboard.js') }}"></script><div class="jvectormap-label"></div>

         <script src="{{ asset('assets_back/js/app.js') }}"></script>

      <!--  end  JAVASCRIPT -->

 
        <script>
    $(function(){
        $('#preloader').fadeOut('slow');

        

    })

    
</script>
@stack('script')