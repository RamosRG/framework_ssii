<?php

namespace App\Models;

use CodeIgniter\Model;

class AuditModel extends Model
{
    protected $table = 'audit';
    protected $primaryKey = 'id_audit'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['id_audit', 'no_audit', 'fk_machinery', 'fk_shift', 'date', 'fk_departament', 'auditor', 'date_reviewed', 'fk_user'];

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'create_at';
    protected $updatedField = 'update_at';


    public function insertAudit($data)
    {
        return $this->insert($data);
    }

}


