  <!-- JAVASCRIPT -->
        
  <!--  end  JAVASCRIPT form-->

  <script type="text/javascript" src="{{ asset('assets_form/js/jquery-3.2.1.min.js') }}"></script>
<script src="{{ url('assets_form/assets/vendor/bootstrap/js/bootstrap.min.js')}}"></script>
<script src="{{ url('assets_form/assets/vendor/jquery-slimscroll/jquery.slimscroll.min.js')}}"></script>
<script src="{{ url('assets_form/assets/scripts/klorofil-common.js')}}"></script>
<script type="text/javascript" src="{{ asset('assets_form/js/bootstrap-datepicker.js') }}"></script>
<script src="{{ asset('assets_form/js/jquery.dataTables.min.js')}}"></script>
<script src="{{ asset('assets_form/js/dataTables.bootstrap.min.js')}}"></script>
<script src="{{ asset('assets_form/js/waves.js')}}"></script>
<script src="{{ asset('assets_form/js/sweetalert.min.js')}}"></script>

<script>
    $(function(){
        $('#preloader').fadeOut('slow');

        

    })

    
</script>
@stack('script')
 
   
    
@stack('script')