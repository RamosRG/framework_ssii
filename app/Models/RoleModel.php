<?php

namespace App\Models;

use CodeIgniter\Model;


class RoleModel extends Model
{
    protected $table = 'role';
    protected $primaryKey = 'id_role'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['role','status', 'created_at', 'updated_at'];


    protected bool $status = true;

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    

}

