
 $(function() {
  $('#formSave').attr("action", "{{ route('formpengaduan2') }}");

    $.ajax({
        url: "/datajml2",
     //   url: "{{route('maxformpengaduan')}}",
        async: false,
        dataType: 'json',
        success: function(data) {
             console.log(data);
            //  console.log(data[0].jml);
            // jml = data[0].jml;
            // $('#txtno_berkas').val('BPN202110.00000' + jml);
        },
        error: function() {
            alert('Gagal memanggil data max');
        }
    });


    //maxtr_pengaduan2
    $('#submit').click(function() {
        alert("data sudah di kirim")  
             
    });


    // $('#formSave').submit(function(e) {
    //     e.preventDefault();
    //     var link = $('#formSave').attr('action');
    //     var request = new FormData(this);
    //      console.log(request)
    //      console.log(link)
    //     $.ajax({
    //         url: link,
    //         method: "POST",
    //         data: request,
    //         contentType: false,
    //         cache: false,
    //         processData: false,
    //         success: function(response) {
    //                 console.log(response);
                  
    //                 $('.alert-success').html('Data User Berhasil Disimpan').fadeIn().delay(4000).fadeOut('slow');
                   
    //         }
    //     });
    // });

  
 
  $('#formpengaduan').attr("action", "{{ url('/simpanformtr_pengaduan') }}");

  $('#formpengaduan').submit(function(e) {
    e.preventDefault();

   //  var pebJSon = hasil_getdata();
   
 //alert(pebJSon)
//     datas["json_val"] =pebJSon;
   
//     formData.append('data', JSON.stringify(datas));
//    console.log(datas)

var link = $('#formpengaduan').attr('action');
var request = new FormData(this);

$.ajax({
    url: link,
    method: "POST",
    data: request,
    contentType: false,
    cache: false,
    processData: false,
    success: function(response) {
            console.log(response);
           
            $('.alert-success').html('Data User Berhasil dikirim ').fadeIn().delay(
                4000).fadeOut('slow');
         
        },
        error: function() {
            alert('Gagal mengirim data');
        }
    });
   
    alert("data sudah di kirim lagi" )   
    kosongdata();
  })

  function kosongdata()
  { 
    click_beranda();
    $('#txtnama').val("");
    $('#txtemail').val("");
    $('#txtno_telp').val("");
    $('#txturaian_pengaduan').val("");
    $('#txtnik').val("");
    $('#txtalamat').val("");

    $('#txtpekerjaan').val("");
    $('#txtobyek_aduan').val("");
  
  }
  function click_beranda(){
    $('#home').click();
   
  }


  function hasil_getdata()
  {  
      
    var data1= $('#txtnama').val();   var data2= $('#txtemail').val();     var data3= $('#txtno_telp').val();    var data4= $('#txturaian_pengaduan').val();  
     var data5= $('#txtnik').val();    var data6=$('#txtalamat').val();    var data7=$('#txtpekerjaan').val();    var data8=$('#txtobyek_aduan').val();
  var pebJSon =  '{"nama":' + data1 + ',"email":' + data2 + ',"no_telp":' + data3 + ',"uraian_pengaduan":' + data4+ ',"nik":' + data5 + ',"alamat":' + data6+
  + ',"pekerjaan":' + data7+ ',"objyek_aduan":' + data8 + '},';
   pebJSon = "[" + pebJSon.substring(0, pebJSon.length - 1) + "]";

    return pebJSon
  }
  
// $.ajax({
//        url: "{{ route('maxtr_pengaduan2') }}",
//        async: false,
//         dataType: 'json',
//         success: function(data) {
//            console.log(data[0].id_user);
//            jml = data[0].jml;
// 		   alert("kita tampil"+ jml)
//          },
//      error: function() {
//          alert('Gagal memanggil data max');
//         }
//   });
  
});