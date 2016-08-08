<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Record extends Model {

    public $timestamps = false;

    protected $table = 'records';

    protected $fillable = ['date_at', 'user_title', 'user_phone', 'comment', 'doctor_id', 'time_interval_id'];
    protected $guarded = ['id'];

    public function interval()
    {
        return $this->belongsTo('App\TimeInterval', 'time_interval_id');
    }

    public function doctor()
    {
        return $this->belongsTo('App\Doctor');
    }

    public function getBusyDates($doctor_id) {
        $dates = DB::table($this->table)
            ->select('date_at')
            ->where('doctor_id', $doctor_id)
            ->where('date_at', '>=', date('Y-m-d'))
            ->groupBy('date_at')
            ->havingRaw('count(time_interval_id) = 11')
            ->get();

        $result = [];
        foreach($dates as $date) {
            array_push($result, $date->date_at);
        }

        return $result;
    }
}