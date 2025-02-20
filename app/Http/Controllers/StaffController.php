<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StaffController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'status' => session('status'),
            'menu_items' => Menu::latest()->paginate(8),
            'orders' => Orders::latest()->paginate(25),
            'message' => session('message')?session('message'):null,
        ]);
    }
}