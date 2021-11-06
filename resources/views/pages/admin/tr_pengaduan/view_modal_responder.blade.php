<!-- Modal Verifikator -->
<div class="modal fade" id="responModal" tabindex="-1" aria-labelledby="verifikatorModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form action="" method="post" id="form-responder">
                {{ csrf_field() }}
                <input type="hidden" name="pengaduan_id" value="{{ $id }}"/>
                <div class="modal-header">
                    <h5 class="modal-title" id="verifikatorModalLabel">Tulis Response</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">        
                    <div class="panel-body table-responsive">
                        <div class="form-group mb-3">
                            <label for="ket" class="form-label">Keterangan</label>
                            <textarea name="jawaban" cols="4" rows="2" class="form-control"></textarea>
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
                    <button type="button" class="btn btn-primary" id="btnSubmitResponder">Kirim</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script type="text/javascript">
$(document).ready(function() {
    $('#btnSubmitResponder').click(function(e){
        e.preventDefault();
        
        var formData = new FormData($('#form-responder')[0]);
        $.ajax({
            url: "{{ URL::to('admin/tr_pengaduan/save_responder') }}",
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