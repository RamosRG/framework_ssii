<?php

namespace App\Models;

use CodeIgniter\Model;


class FountainModel extends Model
{
    protected $table = 'source';
    protected $primaryKey = 'id_source'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['source','status'];


    protected bool $status = true;

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

   
    

}

