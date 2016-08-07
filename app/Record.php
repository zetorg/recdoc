<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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

}