<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $fillable = ['name'];

    public function orders() {
        $this->hasMany(Order::class);
    }
}
