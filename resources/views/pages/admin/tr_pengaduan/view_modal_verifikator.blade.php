<!-- Modal Verifikator -->
<div class="modal fade" id="responderModal" tabindex="-1" aria-labelledby="verifikatorModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form action="" method="post" id="form-responder">
                {{ csrf_field() }}
                <input type="hidden" name="pengaduan_id" value="{{ $id }}"/>
                <div class="modal-header">
                    <h5 class="modal-title" id="verifikatorModalLabel">Disposisi Responder</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">        
                    <div class="panel-body table-responsive">
                        <table id="data_resp" class="table table-bordered table-responsive  bordered px-2 py-4 nowrap" style="width:100%;">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nama</th>
                                    <th>Posisi</th>
                                    <th width="5%">&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <div class="form-group mb-3">
                            <label for="ket" class="form-label">Keterangan</label>
                            <textarea name="keterangan" cols="4" rows="2" class="form-control"></textarea>
                        </div>
                        <div class="form-group mb-3">
                            <label for="upload-file" class="form-label">Lampiran</label>
                            <input name="lampiran_1" class="form-control form-control-sm mb-2" type="file">
                            <input name="lampiran_2" class="form-control form-control-sm" type="file">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="btnSubmitVerifikator">Kirim</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script type="text/javascript">
$(document).ready(function() {
    var url = "{{ URL::to('/admin/tr_pengaduan/get_posisi?posisi=responder') }}";
    url+= "&posisi_id={{ $model->posisi_id }}";
    
    $('#data_resp').DataTable({
        ajax: url,
        fixedColumns: true,
        columns: [
            { "data": "id_user" },
            { "data": "fullname" },
            { "data": "nama_posisi" },
            {
                width: '5%',
                className: 'text-center',
                mRender: function(data, type, row) {
                    var html = '<input type="radio" name="posisi_id" value="' + row['id_user'] + '|' + row['posisi_id'] +'">';
                    return html;
                }
            }
        ]
    });
    
    $('#btnSubmitVerifikator').click(function(e){
        e.preventDefault();
        var selected = $('input[name="posisi_id"]:checked').val();
        
        if (selected === undefined) {
            alert('Silahkan pilih responder terlebih dahulu');
            return;
        }
        
        var formData = new FormData($('#form-responder')[0]);
        $.ajax({
            url: "{{ URL::to('admin/tr_pengaduan/save_verifikator') }}",
            type: 'POST',
            data: formData,
            dataType: 'json',
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                } else {
                    location.reload();
                }
            }
        });
        
    });
} );
</script>