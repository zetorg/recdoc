<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Doctor;
use App\TimeInterval;

class DoctorController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function getList()
    {
        $doctors = Doctor::with('specialty')->take(15)->get();

        return response()->json(
            array(
                'data' => $doctors
            )
        );
    }

    public function getTimeIntervals(Request $request)
    {
        $model_ti = new TimeInterval();
        $intervals = array();

        if ($request->has('doctor_id') && $request->has('date')) {
            $intervals = $model_ti->getFreeInterval($request->doctor_id, $request->date);
        }

        return response()->json(
            array(
                'data' => $intervals
            )
        );
    }
}
