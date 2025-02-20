<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id', 'total', 'status_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function status() {
        return $this->belongsTo(Status::class);
    }
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
