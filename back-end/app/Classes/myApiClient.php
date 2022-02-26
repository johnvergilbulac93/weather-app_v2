<?php

namespace App\Classes;

use Illuminate\Support\Facades\Http;


class myApiClient
{
    public function api_data($request)
    {
        $weather = Http::get(env('WEATHER_URL') . $request->place . '&units=metric&APPID=' . env('WEATHER_KEY'));
        $venue = Http::get(env('VENUES_URL') . 'explore?near=' . $request->place . '&query=' . $request->venue . '&limit=12&venuePhotos=1&client_id=' . env('VENUES_CLIENT_ID') . '&client_secret=' . env('VENUES_CLIENT_SECRET') . '&v=' . env('VENUES_VERSION_DATE'));

        return  [
            'venue'     => $venue,
            'weather'   => $weather
        ];
    }
}
