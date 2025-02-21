<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::where('user_id', Auth::id())->with(['status', 'orderItems.menu'])->paginate(8);

        $orders->getCollection()->transform(function ($order) {
            $order->created_at_formatted = Carbon::parse($order->created_at)->format('d M Y H:i');
            return $order;
        });
        return Inertia::render('Dashboard', [
            'status' => session('status'),
            'menu_items' => Menu::latest()->paginate(12),
            'orders' => $orders,
            'order_items' => OrderItem::whereHas('order', function ($query) {
                                    $query->where('user_id', Auth::id());
                                })->get(),
            'message' => session('message') ? session('message') : null,
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
