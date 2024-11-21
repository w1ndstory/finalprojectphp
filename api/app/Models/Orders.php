<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = [
        'product_id',
        'size',
        'quantity',
        'id',
        'client_name',
        'created_at',
        'status',
        'expected_payment_date',
    ];
}
