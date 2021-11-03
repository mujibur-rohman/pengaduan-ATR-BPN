<!-- Modal Verifikator -->
<div class="modal fade" id="verifikatorModal" tabindex="-1" aria-labelledby="verifikatorModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form action="" method="post" id="form-verifikator">
                {{ csrf_field() }}
                <input type="hidden" name="pengaduan_id" value="{{ $id }}"/>
                <div class="modal-header">
                    <h5 class="modal-title" id="verifikatorModalLabel">Disposisi Verifikator</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">        
                    <div class="panel-body table-responsive">
                        <table id="data_verif" class="table table-bordered table-responsive  bordered px-2 py-4 nowrap" style="width:100%;">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
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
                        <div class="d-flex">
                            <div style="flex: 1">
                              <label class="form-label">Klasifikasi</label>
                              <select name="klasifikasi_id" class="form-select form-select-sm" aria-label=".form-select-sm">
                                    @foreach (\App\Pengaduan_klasifikasi::select('klasifikasi_id','nama_klasifikasi')->get() as $klasifikasi)
                                    <option value="{{ $klasifikasi->klasifikasi_id }}">
                                    {{ $klasifikasi->nama_klasifikasi }}
                                    </option>
                                    @endforeach
                              </select>
                            </div>
                            <div style="flex: 1; margin-left: 1rem;">
                                <label class="form-label">Kategori</label>
                                <select name="kategori_id" class="form-select form-select-sm" aria-label=".form-select-sm">
                                    @foreach (\App\Pengaduan_kategori::select('kategori_id','nama_kategori')->get() as $kategori)
                                    <option value="{{ $kategori->kategori_id }}">
                                    {{ $kategori->nama_kategori }}
                                    </option>
                                    @endforeach
                                </select>
                            </div>
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
    $('#data_verif').DataTable({
        ajax: "{{ URL::to('/admin/tr_pengaduan/get_posisi') }}",
        fixedColumns: true,
        columns: [
            { "data": "posisi_id" },
            { "data": "nama_posisi" },
            {
                width: '5%',
                className: 'text-center',
                mRender: function(data, type, row) {
                    var html = '<input type="radio" name="posisi_id" value="' + row['posisi_id'] + '">';
                    return html;
                }
            }
        ]
    });
    
    $('#btnSubmitVerifikator').click(function(e){
        e.preventDefault();
        var posisi_id = $('input[name="posisi_id"]:checked').val();
        
        if (posisi_id === undefined) {
            alert('Silahkan pilih verifikator terlebih dahulu');
            return;
        }
        
        var formData = new FormData($('#form-verifikator')[0]);
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
                console.log(response);
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