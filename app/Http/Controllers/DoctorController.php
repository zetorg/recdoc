<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Doctor;
use App\TimeInterval;
use App\Record;

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

    public function getBusyDates(Request $request)
    {
        $model_r = new Record();
        $dates = array();

        if ($request->has('doctor_id')) {
            $dates = $model_r->getBusyDates($request->doctor_id);
        }

        return response()->json(
            array(
                'data' => $dates
            )
        );
    }
}
