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

    public function getDataOfAudits()
    {
        return $this->select('audit.no_audit, audit.date, audit.auditor, audit.`status`, departament.departament,
                            machinery.machinery, shift.shift')
                    ->join('departament', 'departament.id_departament = audit.fk_departament') // Realiza el INNER JOIN
                    ->join('machinery', 'machinery.id_machinery = audit.fk_machinery') // Realiza el INNER JOIN
                    ->join('shift', 'shift.id_shift = audit.fk_shift') // Realiza el INNER JOIN
                    ->where('audit.status', 1) // Filtra por el estado de la auditoría
                    ->where('departament.status', 1) // Filtra por el estado del departamento
                    ->get()
                    ->getResultArray(); // Devuelve el resultado como un array
    }
    
    
}