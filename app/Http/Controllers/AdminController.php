<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Record;
use App\Doctor;

class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function getIndex()
    {
        $records = Record::with(['doctor', 'interval'])->paginate(15);

        return view('admin.dashboard', ['records' => $records]);
    }

    public function getDoctors()
    {
        $doctors = Doctor::with('specialty')->paginate(15);

        return view('admin.doctors', ['doctors' => $doctors]);
    }
}
