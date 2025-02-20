<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function clearSessionMessage(Request $request)
    {
        $request->session()->forget('message');
        return redirect()->back();
    }
}
