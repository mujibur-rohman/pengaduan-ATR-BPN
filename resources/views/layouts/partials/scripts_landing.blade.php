 <!-- jQuery Frameworks
    =============================================
    <script src="{{ asset('assets_fron/js/jquery-1.js') }}"></script> -->
    <script src="{{ asset('assets_form/js/jquery-3.2.1.min.js') }}"></script>
    <script src="{{ asset('assets_fron/js/bootstrap.js') }}	"></script>
    <script src="{{ asset('assets_fron/js/equal-height.js') }}"></script>
    <script src="{{ asset('assets_fron/js/jquery.js	') }}	"></script>
    <script src="{{ asset('assets_fron/js/jquery_003.js	') }}"></script>
    <script src="{{ asset('assets_fron/js/jquery_002.js	') }}"></script>
    <script src="{{ asset('assets_fron/js/modernizr.js') }}	"></script>
    <script src="{{ asset('assets_fron/js/owl.js') }}		"></script>
    <script src="{{ asset('assets_fron/js/count-to.js') }}		"></script>
    <script src="{{ asset('assets_fron/js/wow.js	') }}	"></script>
    <script src="{{ asset('assets_fron/js/jquery_004.js') }}	"></script>
    <script src="{{ asset('assets_fron/js/bootsnav.js') }}	"></script>
    <script src="{{ asset('assets_fron/js/main.js') }}		"></script>
    <script src="{{ asset('assets_fron/js/sweetalert.js') }}	"></script>
    <script src="{{ asset('assets_fron/js/script.js') }}	"></script>
    <script type="text/javascript" src="{{ asset('assets_back/js/jquery.validate.js') }}"></script>
     <script type="text/javascript" src="{{ asset('assets_back/js/validate.min.js') }}"></script>
    <script>
        $(document).ready(function(){
          $(".owl-carousel").owlCarousel({
                items:1,
                autoplay:true,
                autoplayTimeout:3000,
                smartSpeed:500,
                loop:true 
          });

          $.ajax({
            url: "{{route('maxformpengaduan')}}",
            async: false,
            dataType: 'json',
            success: function(data) {
                console.log(data);
                //  console.log(data[0].jml);
                jml = data[0].jml;
                $('#txtno_berkas').val('BPN202110.00000' + jml);
            },
            error: function() {
                alert('Gagal memanggil data max');
            }
        });
        $('#formtambahan').hide();
    }); 
   </script>     
@stack('script')
