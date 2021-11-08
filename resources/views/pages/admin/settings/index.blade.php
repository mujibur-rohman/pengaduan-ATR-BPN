@extends('layouts.admin')
@section('htmlheader_title')
    {{ trans('form') }}
@endsection
@section('main-content')

<!--==============================================================-->
<!-- Start right Content here main -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            
            <!--   main  ============================================================== -->
            <div class="panel-heading" style="margin-bottom:2%">
                <div class="panel-title col-md-12">
                    <h4 class="col-md-4">Settings</h4>
                </div>
            </div>
                
            <!-- Isi Content -->					
            <div class="panel-body table-responsive">
                <form id="form-settings" method="POST">
                    {{ csrf_field() }}
                    @if ($model != null)
                    <table class="table table-bordered table-hover table-condensed">
                        <tbody>
                        @foreach($model as $row)
                            <tr>
                                <th>{{ $row['label'] }}</th>
                                <td>
                                    @php
                                    switch($row['type']) {
                                        case 'color':
                                        case 'number':
                                        case 'string':
                                            $type = $row['type'] == "string" ? "text" : $row['type'];
                                            echo '<input name="settings[' . $row['kind'] . ']" type="' . $type . '" class="form-control" value="' . $row['content'] . '"/>';
                                            break;
                                    }
                                    @endphp
                                </td>
                                <td>{{ $row['description'] }}</td>
                            </tr>
                        @endforeach
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>&nbsp;</td>
                                <td><button class="btn btn-primary" type="submit">Simpan</button></td>
                                <td>&nbsp;</td>
                            </tr>
                        </tfoot>
                    </table>
                    @else
                    <div class="alert alert-info">
                        <p>Belum ada setting</p>
                    </div>
                    @endif
                </form>
            </div>
            <!-- end main============================================================== -->
                    
        </div>
    </div>
</div>
<!-- End Page-content main -->

@endsection
@push('script')
<script type="text/javascript">

</script>
@endpush
