<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Specialty extends Model {

    public $timestamps = false;

    protected $table = 'specialties';

    protected $fillable = ['title'];
    protected $guarded = ['id'];

}