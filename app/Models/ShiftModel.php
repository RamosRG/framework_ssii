<?php

namespace App\Models;

use CodeIgniter\Model;

class ShiftModel extends Model
{
    protected $table = 'shift';
    protected $primaryKey = 'id_shift'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['shift', 'status'];

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'create_at';
    protected $updatedField = 'update_at';

}

