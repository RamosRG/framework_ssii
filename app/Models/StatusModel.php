<?php

namespace App\Models;

use CodeIgniter\Model;


class StatusModel extends Model
{
    protected $table = 'audit_status';
    protected $primaryKey = 'id_status'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['status'];


    protected bool $status = true;

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

   
    

}

