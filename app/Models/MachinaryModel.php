<?php

namespace App\Models;

use CodeIgniter\Model;

class MachinaryModel extends Model
{
    protected $table = 'machinery';
    protected $primaryKey = 'id_machinery'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['machinery'];

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'create_at';
    protected $updatedField = 'update_at';

}

