<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Models\Menu;
use App\Models\Order;
use App\Models\OrderItem;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::post('/clear-session-message', [SessionController::class, 'clearSessionMessage']);

    Route::resource('menu', MenuController::class)->middleware(['role:manager|admin']);
    Route::resource('orders', OrderController::class);
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('admin_index');
});
Route::middleware(['auth', 'verified', 'role:manager|cashier'])->prefix('staff')->group(function () {
    Route::get('/dashboard', [StaffController::class, 'index'])->name('staff_index');
});

Route::middleware(['auth', 'verified'])->prefix('customer')->group(function () {
    Route::resource('customer', CustomerController::class);
    Route::get('/dashboard', [CustomerController::class, 'index'])->name('cust_index');
});

Route::middleware(['auth', 'verified'])->get('/dashboard', function () {
    $user = auth()->user();

    if ($user->hasRole('admin')) {
        return redirect()->route('admin_index');
    } elseif ($user->hasAnyRole(['manager', 'cashier'])) {
        return redirect()->route('staff_index');
    } else {
        return redirect()->route('cust_index');
    }
})->name('dashboard');

require __DIR__.'/auth.php';
