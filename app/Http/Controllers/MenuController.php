<?php

namespace App\Http\Controllers;

use App\Models\User;
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
use Illuminate\Validation\ValidationException;

use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
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

            $food_img = Image::read($img)->resize(1024,1024)->encode();
            Storage::disk('public')->put( 'menu/'.$name_gen, $food_img);

            Menu::create([
                'name' => $request->name,
                'price' => $request->price,
                'desc' => $request->desc,
                'image' => $name_gen,
                'created_at' => Carbon::now(),
            ]);

        } else {
            Menu::create([
                'name' => $request->name,
                'price' => $request->price,
                'desc' => $request->desc,
                'created_at' => Carbon::now(),
            ]);
        }

        return redirect()->back()->with('message', 'Menu item added successfully.');
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
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric',
                'desc' => 'required|string',
                'image' => [
                    'nullable',
                    File::types(['jpeg', 'jpg', 'png'])
                        ->max(5 * 1024),
                ],
            ]);
        } catch (ValidationException $e) {
            dd($e->errors());
        }

        

        $menu->name = $validatedData['name'];
        $menu->price = $validatedData['price'];
        $menu->desc = $validatedData['desc'];

        
        if ($request->hasFile('image')) {

            $img = $request->file('image');
            $name_gen = hexdec(uniqid()).'.'.$img->getClientOriginalExtension();

            $food_img = Image::read($img)->resize(1024,1024)->encode();
            Storage::disk('public')->put( 'menu/'.$name_gen, $food_img);

            if($menu->image) {
                if(Storage::disk('public')->exists('menu/'.$menu->image)) {
                    Storage::disk('public')->delete('menu/'.$menu->image);
                }
            }

            $menu->image = $name_gen;
        }
        $menu->save();

        return redirect()->back()->with('message', 'Menu item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        Menu::destroy($menu->id);

        return redirect()->back()->with('message', 'Menu item deleted successfully.');
    }
}
