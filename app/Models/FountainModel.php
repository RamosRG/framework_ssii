<?php

namespace App\Models;

use CodeIgniter\Model;


class FountainModel extends Model
{
    protected $table = 'fountain';
    protected $primaryKey = 'id_fountain'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['fountain','status'];


    protected bool $status = true;

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

   
    

}

