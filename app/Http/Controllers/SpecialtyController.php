<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Specialty;

class SpecialtyController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function getList(Request $request)
    {
        $doctors = Specialty::query()->take(15)->get();

        return response()->json(
            array(
                'data' => $doctors
            )
        );
    }
}
