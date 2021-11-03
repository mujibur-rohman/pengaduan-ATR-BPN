<fieldset class="border px-4 py-3 rounded mt-3">
    <legend>Log Pengaduan</legend>
    <div class="rb-container">
        <ul class="rb" id="list-log">
            <li class="rb-item" ng-repeat="itembx">
                <div class="timestamp">
                    21 Oktober 2021<br> <span class="disposisi btn-secondary rounded">Laporan Diterima</span>
                </div>
                <div class="item-title">Nama User</div>
                <div class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum unde, voluptate, consequuntur mollitia deserunt expedita illo ipsam molestias animi vero, voluptatem quaerat magnam quod porro vel. Perferendis quas sit quo?</div>
                <div class="attach-group">
                    <a href="#" class="attach rounded"><i class="fas fa-paperclip"></i>nama_file.png</a>
                    <a href="#" class="attach rounded"><i class="fas fa-paperclip"></i>nama_file2.png</a>
                </div>
            </li>
        </ul>
    </div>
</fieldset>
<script type="text/javascript">
$(document).ready(function(){
    
    function header(tanggal, status_name, nama) {
        return '<div class="timestamp">' + tanggal + '<br/><span class="disposisi btn-secondary rounded">' + status_name + '</span>' +
                ' oleh ' + nama + '</div>';
    }
    function userName(name) {
        return '<div class="item-title">' + name + '</div>';
    }
    function keterangan(text, sebelum) {
        if (text === null) { text = '&nbsp;'; }
        
        var html = '<div>';
        if (sebelum !== null) {
            html+= '<strong>Keterangan dari ' + sebelum.user_name + '</strong><br/>';
        }
        html+= text;
        html+= '</div>';
        return html;
    }
    function lampiran(data) {
        var html = '<div class="attach-group">';
        if (data.length !== 0) {
            $.each(data, function(index, obj) {
                html+= '<a target="_blank" href="' + obj.path + '" class="attach rounded"><i class="fas fa-paperclip"></i>' + obj.name + '</a>';
            });
        }
        html+= '</div>';
        return html;
    }
    
    $.get("{{ URL::to('/admin/tr_pengaduan/get_log') }}?pengaduan_id={{ $id}}", function(resp){
        if (resp.success) {
            var html = '', sebelum = null;
            $.each(resp.data, function(index, obj){
                html+= '<li class="rb-item" ng-repeat="itembx">';
                html+= header(obj.created_at, obj.status_name, obj.user_name);
                html+= keterangan(obj.keterangan, sebelum);
                html+= lampiran(obj.lampiran);
                html+= '</li>';
                
                sebelum = obj;
            });
            $('#list-log').html(html);
        }
    }, 'json');
});
</script>