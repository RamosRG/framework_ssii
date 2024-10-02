<?php

namespace App\Models;

use CodeIgniter\Model;


class CategoryModel extends Model
{
    protected $table = 'category';
    protected $primaryKey = 'id_category'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['category','status', 'created_at', 'updated_at'];


    protected bool $status = true;

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    

}

