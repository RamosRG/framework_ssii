<?php

namespace App\Models;

use CodeIgniter\Model;


class FollowUpModel extends Model
{
    protected $table = 'follow_up';
    protected $primaryKey = 'id_followUp'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['fk_accions', 'follow_up', 'date_response', 'is_resolved', 'created_at','updated_at'];


    protected bool $status = true;

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    

}

