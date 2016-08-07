<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Record;

class RecordController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function postSave(Request $request)
    {
        $values = [
            'date_at' => date('Y-m-d', strtotime($request->date)),
            'user_title' => strip_tags($request->user_title),
            'user_phone' => strip_tags($request->user_phone),
            'doctor_id' => (int) $request->id,
            'time_interval_id' => (int) $request->time_interval
        ];
        if ($request->has('comment')) {
            $values['comment'] = strip_tags($request->comment);
        }

        $record = Record::create($values);

        return response()->json(
            array(
                'success' => !empty($record->id)
            )
        );
    }

}