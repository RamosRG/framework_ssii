<?php

namespace App\Models;

use CodeIgniter\Model;

class DepartamentModel extends Model
{
    protected $table = 'department';
    protected $primaryKey = 'id_department'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['department', 'status'];

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'create_at';
    protected $updatedField = 'update_at';

}

