@extends('layouts.adminpanel')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">Записи к врачам</div>

                    <div class="panel-body">
                        <table class="table table-striped">
                            <tr>
                                <th>Врач</th>
                                <th>Дата</th>
                                <th>Время</th>
                                <th>Пациент</th>
                                <th>Телефон</th>
                                <th>Комментарий</th>
                            </tr>
                            @foreach ($records as $record)
                                <tr>
                                    <td>{{ $record->doctor->title }}</td>
                                    <td>{{ $record->date_at }}</td>
                                    <td>{{ $record->interval->title }}</td>
                                    <td>{{ $record->user_title }}</td>
                                    <td>{{ $record->user_phone }}</td>
                                    <td>{{ $record->comment }}</td>
                                </tr>
                            @endforeach
                        </table>
                        <?php echo $records->render(); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection