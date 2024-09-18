<?php

namespace App\Models;

use CodeIgniter\Model;

class DepartamentModel extends Model
{
    protected $table = 'departament';
    protected $primaryKey = 'id_departament'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['departament', 'status'];

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'create_at';
    protected $updatedField = 'update_at';

}

