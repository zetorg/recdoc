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
        if ( empty($request->date) || empty($request->user_title) || empty($request->user_phone)
            || empty($request->time_interval)) {
            return response()->json([
                'success' => false,
                'msg' => 'Не заполнены обязательные поля'
            ]);
        }

        $date = strtotime($request->date);
        if ($date < strtotime(date('Y-m-d'))) {
            return response()->json([
                    'success' => false,
                    'msg' => 'Некорректные данные'
            ]);
        }

        $is_record = Record::where('doctor_id', $request->id)
            ->where('date_at', date('Y-m-d', $date))
            ->where('time_interval_id', $request->time_interval)
            ->get();

        if ( !empty($is_record) && count($is_record) > 0) {
            return response()->json([
                'success' => false,
                'msg' => 'Выбранное время уже занято. Попробуйте другое'
            ]);
        }

        $values = [
            'date_at' => date('Y-m-d', $date),
            'user_title' => strip_tags($request->user_title),
            'user_phone' => strip_tags($request->user_phone),
            'doctor_id' => $request->id,
            'time_interval_id' => $request->time_interval
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