<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

use App\Record;

class TimeInterval extends Model {

    public $timestamps = false;

    protected $table = 'time_intervals';

    protected $fillable = ['title'];
    protected $guarded = ['id'];

    public function getFreeInterval($doctor_id, $date) {
        $date = date('Y-m-d', strtotime($date));

        $intervals = DB::table($this->table)
            ->whereNotIn('id', function($query) use ($doctor_id, $date) {
                $query->select('time_interval_id')
                    ->from(with(new Record())->getTable())
                    ->where('doctor_id', $doctor_id)
                    ->where('date_at', $date);
            })
            ->get();

        return $intervals;
    }
}