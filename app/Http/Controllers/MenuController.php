<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Carbon;

use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Dashboard', [
            'status' => session('status'),
            'message' => session('message')?session('message'):null,
            'alert-type' => session('alert-type'),
            'menu_items' => Menu::latest()->paginate(8),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:254',
            'price' => 'required|string|max:254',
            'desc' =>'required|string|max:254',
            'image' => [
                'required',
                File::types(['jpeg', 'jpg', 'png'])
                    ->max(5 * 1024),
            ],
        ]);

        if($request->file('image')){
            $img = $request->file('image');
            $name_gen = hexdec(uniqid()).'.'.$img->getClientOriginalExtension();

            $food_img = Image::read($img)->resize(1024,1024);
            Storage::disk('public')->put( 'menu/'.$name_gen, file_get_contents($request->file('image')));

            Menu::insert([
                'name' => $request->name,
                'price' => $request->price,
                'desc' => $request->desc,
                'image' => $name_gen,
                'created_at' => Carbon::now(),
            ]);

        } else {
            Menu::insert([
                'name' => $request->name,
                'price' => $request->price,
                'desc' => $request->desc,
                'created_at' => Carbon::now(),
            ]);
        }
        $notification = array(
            'message' => 'Menu item added successfully.',
            'alert-type' => 'success',
        );
        return Inertia::render('Dashboard', [
            'menu_items' => Menu::latest()->paginate(8),
            'message' => 'Menu item added successfully.',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $menu)
    {
        dd($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        if(Menu::count() === 1) {
            Menu::truncate();
        } else {
            Menu::destroy($menu->id);
        }
        return Inertia::render('Dashboard', [
            'menu_items' => Menu::latest()->paginate(8),
            'message' => 'Menu item deleted successfully.',
        ]);
    }
}
