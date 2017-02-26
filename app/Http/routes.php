<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/doctorrecord/{name}', function () {
    return view('welcome');
})->where('name', '[0-9]*');

Route::get('/records', function () {
    return view('welcome');
})->where('name', '[0-9]*');

Route::auth();

Route::controllers([
    'admin' => 'AdminController',
    'doctor' => 'DoctorController',
    'record' => 'RecordController'
]);