<?php

namespace App\Models;

use CodeIgniter\Model;

class AuditModel extends Model
{
    protected $table = 'audit';
    protected $primaryKey = 'id_audit'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['id_audit', 'no_audit', 'audit_tittle', 'fk_machinery', 'fk_shift', 'date', 'fk_departament', 'auditor', 'date_reviewed', 'fk_user'];

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'create_at';
    protected $updatedField = 'update_at';

    public function getAuditByStatus($idUser)
    {
        return $this->select('id_audit, no_audit, audit_tittle, fk_machinery, fk_shift, DATE, fk_departament, auditor, STATUS, fk_user ')
            ->where('audit.fk_user', value: $idUser) // Filtra por el id del usuario
            ->where('audit.`status`', 1) // Filtra por el estado de la auditoria
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }
    public function insertAudit($data)
    {
        return $this->insert($data);
    }

    public function getDataOfAudits()
    {
        return $this->select('audit.id_audit, audit.no_audit, audit.date, audit.auditor, audit.`status`, departament.departament,
                            machinery.machinery, shift.shift')
            ->join('departament', 'departament.id_departament = audit.fk_departament') // Realiza el INNER JOIN
            ->join('machinery', 'machinery.id_machinery = audit.fk_machinery') // Realiza el INNER JOIN
            ->join('shift', 'shift.id_shift = audit.fk_shift') // Realiza el INNER JOIN
            ->where('audit.status', 1) // Filtra por el estado de la auditoría
            ->where('departament.status', 1) // Filtra por el estado del departamento
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }
    public function getAuditByNumber($id)
    {
        return $this->select('audit.id_audit, audit.no_audit, audit.date, audit.auditor, audit.`status`, departament.departament,
                            machinery.machinery, shift.shift')
            ->join('departament', 'departament.id_departament = audit.fk_departament') // INNER JOIN con Departament
            ->join('machinery', 'machinery.id_machinery = audit.fk_machinery') // INNER JOIN con Machinery
            ->join('shift', 'shift.id_shift = audit.fk_shift') // INNER JOIN con Shift
            ->where('audit.id_audit', $id) // Filtra por el ID de la auditoría
            ->where('audit.status', 1) // Filtra por el estado de la auditoría
            ->where('departament.status', 1) // Filtra por el estado del departamento
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }   

   
}
