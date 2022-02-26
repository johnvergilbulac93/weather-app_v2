<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Classes\myApiClient;

class WeatherController extends Controller
{

    public function get_api_data(myApiClient $myApiClient, Request $request)
    {
        $this->validate($request, [
            'place'     => 'required',
            'venue'    => 'required',
        ]);
        return $myApiClient->api_data($request);
    }
}
