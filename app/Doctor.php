<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model {

    public $timestamps = false;

    protected $table = 'doctors';

    protected $fillable = ['title'];
    protected $guarded = ['id'];

    public function specialty()
    {
        return $this->belongsTo('App\Specialty');
    }
}