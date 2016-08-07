@extends('layouts.adminpanel')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">Врачи</div>

                    <div class="panel-body">
                        <table class="table table-striped">
                            <tr>
                                <th>ФИО</th>
                                <th>Специальность</th>
                            </tr>
                            @foreach ($doctors as $doctor)
                                <tr>
                                    <td>{{ $doctor->title }}</td>
                                    <td>{{ $doctor->specialty->title }}</td>
                                </tr>
                            @endforeach
                        </table>
                        <?php echo $doctors->render(); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection