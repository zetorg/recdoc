<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Doctor;

class DoctorController extends Controller
{

    public function getIndex()
    {
        return view('welcome');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function getList()
    {
        $doctors = Doctor::query()->take(15)->get();

        return response()->json(
            array(
                'data' => $doctors
            )
        );
    }
}
