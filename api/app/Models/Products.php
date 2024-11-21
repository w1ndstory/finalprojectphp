<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = [
        'category_id',
        'title',
        'name',
        'description',
        'featured',
        'material',
        'price',
        'madein_id',
        'image1',
        'image2',
        'image3',
        'image4',
    ];
}
