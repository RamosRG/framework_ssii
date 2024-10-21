<?php

namespace App\Models;

use CodeIgniter\Model;

class AuditModel extends Model
{
    protected $table = 'audit';
    protected $primaryKey = 'id_audit'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['no_audit', 'audit_title', 'fk_auditor', 'fk_machinery', 'fk_shift', 'date', 'fk_department', 'status', 'reviewed_by', 'review_date', 'fk_user'];

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'create_at';
    protected $updatedField = 'update_at';

    public function getAuditByStatus($idUser)
    {
        return $this->select('audit.id_audit, audit.no_audit, audit.audit_title, audit.fk_machinery, audit.fk_shift, audit.DATE, audit.fk_department,
                                    audit.status, audit.fk_auditor, users.name, users.firstName, users.lastName ')
            ->join('users', 'users.id_user = audit.fk_auditor')  // Asegura que el auditor esté relacionado
            ->where('audit.fk_auditor', value: $idUser) // Filtra por el id del usuario
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
        return $this->select('audit.id_audit, audit.no_audit, audit.audit_title, users.firstName, users.lastName, 
            audit.date, audit.fk_auditor, audit.status, department.department, machinery.machinery, shift.shift')
            ->join('users', 'users.id_user = audit.fk_auditor')  // Asegura que el auditor esté relacionado
            ->join('department', 'department.id_department = audit.fk_department') // Realiza el INNER JOIN
            ->join('machinery', 'machinery.id_machinery = audit.fk_machinery') // Realiza el INNER JOIN
            ->join('shift', 'shift.id_shift = audit.fk_shift') // Realiza el INNER JOIN
            ->where('audit.status', 1) // Filtra por el estado de la auditoría
            ->where('department.status', 1) // Filtra por el estado del department  
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }

    public function getAuditByNumber($id): mixed
    {
        return $this->select('audit.id_audit, audit.no_audit, audit.date, audit.audit_title, audit.`status`, users.`name`,id_audit, users.firstName, users.lastName,
 department.department, machinery.machinery, shift.shift')
            ->join('users', 'users.id_user = audit.fk_auditor')  // Asegura que el auditor esté relacionado
            ->join('department', 'department.id_department = audit.fk_department') // INNER JOIN con department
            ->join('machinery', 'machinery.id_machinery = audit.fk_machinery') // INNER JOIN con Machinery
            ->join('shift', 'shift.id_shift = audit.fk_shift') // INNER JOIN con Shift
            ->where('audit.id_audit', $id) // Filtra por el ID de la auditoría
            ->where('audit.status', 1) // Filtra por el estado de la auditoría
            ->where('department.status', 1) // Filtra por el estado del departmento
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }
    public function getLastAuditNumber()
    {
        $auditModel = new AuditModel();

        // Obtener el último número de auditoría de la base de datos
        $lastAudit = $auditModel->select('no_audit')
            ->orderBy('id_audit', 'DESC')
            ->first(); // Obtiene la última auditoría creada

        return $this->response->setJSON($lastAudit);
    }
}
