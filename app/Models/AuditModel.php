<?php

namespace App\Models;

use CodeIgniter\Model;

class AuditModel extends Model
{
    protected $table = 'audit';
    protected $primaryKey = 'id_audit'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['no_audit', 'audit_title', 'fk_auditor', 'fk_machinery', 'fk_shift', 'date', 'fk_department', 'status', 'date_start', 'date_end', 'reviewed_by', 'review_date', 'fk_user', 'comment', 'id_supervisor'];

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    public function GenerarPDF($auditId)
    {
        return $this->select('
            audit.no_audit, audit.audit_title, audit.date_start, 
            users.name AS auditor_name, users.firstName, 
            machinery.machinery, shift.shift, department.department,
            questions.question, questions.created_at, 
            category.category, source.source,  
            answers.answer, answers.evidence, answers.is_complete,
            actions.action_description, actions.evidence_accion, 
            actions.responsable, follow_up.follow_up, 
            follow_up.date_response, audit.reviewed_by
        ')
        ->join('users', 'users.id_user = audit.fk_auditor', 'left')
        ->join('shift', 'shift.id_shift = audit.fk_shift', 'left')
        ->join('machinery', 'machinery.id_machinery = audit.fk_machinery', 'left')
        ->join('department', 'department.id_department = audit.fk_department', 'left')
        ->join('questions', 'questions.fk_audit = audit.id_audit')
        ->join('category', 'category.id_category = questions.fk_category', 'left')
        ->join('source', 'source.id_source = questions.fk_source', 'left')
        ->join('answers', 'answers.fk_question = questions.id_question', 'left')
        ->join('actions', 'actions.fk_answer = answers.id_answer', 'left')
        ->join('follow_up', 'follow_up.fk_accions = actions.id_actions', 'left')
        ->where('audit.id_audit', $auditId)
        ->where('audit.fk_status', 0)
        ->get()
        ->getResultArray();
    }

    
    public function getAuditCompleteVerification($auditId)
    {
        return $this->select('
            audit.id_audit,
            audit.id_supervisor,
            reviewer.email AS reviewer_email,
            answers.answer,
            questions.question,
            actions.action_description,
            actions.evidence_accion,
            follow_up.follow_up,
            follow_up.is_resolved
        ')
            ->join('users AS auditor', 'auditor.id_user = audit.fk_auditor')
            ->join('users AS reviewer', 'reviewer.id_user = audit.reviewed_by')
            ->join('questions', 'audit.id_audit = questions.fk_audit')
            ->join('answers', 'answers.fk_question = questions.id_question')
            ->join('actions', 'actions.fk_answer = answers.id_answer')
            ->join('follow_up', 'follow_up.fk_accions = actions.id_actions')
            ->where('audit.id_audit', $auditId)
            ->where('audit.fk_status', 1)
            ->orWhere('audit.fk_status', 2)
            ->get()
            ->getResultArray(); // Retorna los resultados como un array
        // Depura los datos

    }
    public function getAuditFinished($id): mixed
    {
        return $this->select('audit.id_audit, audit.no_audit, audit.date, audit.audit_title, audit.`fk_status`, users.`name`,id_audit, users.firstName, users.lastName,
 department.department, machinery.machinery, shift.shift')
            ->join('users', 'users.id_user = audit.fk_auditor')  // Asegura que el auditor esté relacionado
            ->join('department', 'department.id_department = audit.fk_department') // INNER JOIN con department
            ->join('machinery', 'machinery.id_machinery = audit.fk_machinery') // INNER JOIN con Machinery
            ->join('shift', 'shift.id_shift = audit.fk_shift') // INNER JOIN con Shift
            ->where('audit.id_audit', $id) // Filtra por el ID de la auditoría
            ->where('audit.fk_status', 2) // Filtra por el estado de la auditoría
            ->where('department.status', 1) // Filtra por el estado del departmento
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }
    public function getDataOfAuditsInactives()
    {
        return $this->select('audit.id_audit, audit.no_audit, audit.audit_title, users.name,users.firstName, users.lastName, 
            audit.date, audit.fk_auditor, audit.fk_status, department.department, machinery.machinery, shift.shift')
            ->join('users', 'users.id_user = audit.fk_auditor')  // Asegura que el auditor esté relacionado
            ->join('department', 'department.id_department = audit.fk_department') // Realiza el INNER JOIN
            ->join('machinery', 'machinery.id_machinery = audit.fk_machinery') // Realiza el INNER JOIN
            ->join('shift', 'shift.id_shift = audit.fk_shift') // Realiza el INNER JOIN
            ->where('audit.fk_status', 2) // Filtra por el estado de la auditoría
            ->where('department.status', 1) // Filtra por el estado del department  
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }
    public function getAuditVerification($auditId)
    {
        return $this->select('
            audit.id_audit,
            audit.id_supervisor,
            audit.comment,
            reviewer.email AS reviewer_email,
            answers.answer,
            questions.question,
            actions.action_description,
            actions.evidence_accion,
            follow_up.follow_up,
            follow_up.is_resolved
        ')
            ->join('users AS auditor', 'auditor.id_user = audit.fk_auditor')
            ->join('users AS reviewer', 'reviewer.id_user = audit.reviewed_by')
            ->join('questions', 'audit.id_audit = questions.fk_audit')
            ->join('answers', 'answers.fk_question = questions.id_question')
            ->join('actions', 'actions.fk_answer = answers.id_answer')
            ->join('follow_up', 'follow_up.fk_accions = actions.id_actions')
            ->where('audit.id_audit', $auditId)
            ->where('audit.fk_status', 0)
            ->orWhere('audit.fk_status', 1)

            ->get()
            ->getResultArray(); // Retorna los resultados como un array
        // Depura los datos

    }
    public function getDataOfActions($auditID)
    {
        $builder = $this->db->table('audit');  // Alias para la tabla audit principal
        $builder->select('
           audit.id_audit, audit.audit_title, audit.date, audit.id_supervisor, questions.question, answers.answer, answers.evidence, actions.id_actions,
        actions.action_description, actions.evidence_accion
        ');
        $builder->join('questions', 'questions.fk_audit = audit.id_audit');  // Usar el alias 'a'
        $builder->join('answers', 'answers.fk_question = questions.id_question');
        $builder->join('actions', 'actions.fk_answer = answers.id_answer');
        $builder->where('audit.id_audit', $auditID);
        $builder->where('audit.fk_status', 0);
        $builder->orWhere('audit.fk_status', 1);

        return $builder->get()->getResultArray();
    }
    public function updateActionSupervisors($auditData)
    {
        $builder = $this->db->table('audit'); // Especificar la tabla 'audit'

        // Verificar si los datos existen
        if (isset($auditData['userId']) && isset($auditData['id_audit'])) {
            $userId = $auditData['userId'];
            $idAudit = $auditData['id_audit'];

            // Verificar si el id_audit existe en la base de datos
            $auditExists = $this->db->table('audit')->where('id_audit', $idAudit)->countAllResults();

            if ($auditExists > 0) {
                // Realizar la actualización si el audit existe
                $builder->set('id_supervisor', $userId)
                    ->where('id_audit', $idAudit)
                    ->update(); // Ejecutar la actualización

                return true; // Retornar verdadero si se actualiza correctamente
            } else {
                // Si no se encuentra el audit, retornar un error
                return false;
            }
        }

        return false; // Retornar falso si los datos no son correctos
    }
    public function getAuditForId()
    {
        return $this->select('audit.id_audit, audit.audit_title, audit.created_at, audit.created_at, audit.updated_at, department.department')
            ->join('department', 'department.id_department = audit.fk_department')
            ->findAll();
    }
    public function editAudit($id_audit)
    {
        return $this->select('audit.id_audit, audit.audit_title, audit.fk_auditor, audit.fk_department, audit.fk_shift, audit.fk_machinery,
         audit.created_at, department.department, category.category, questions.id_question, questions.question,
         department.department, questions.status, `source`.`source`, machinery.machinery, audit.created_at, audit.updated_at')
            ->join('machinery', 'machinery.id_machinery = audit.fk_machinery')
            ->join('questions', 'audit.id_audit = questions.fk_audit')
            ->join('department', 'department.id_department = audit.fk_department')
            ->join('source', 'source.id_source = questions.fk_source')
            ->join('shift', 'audit.fk_shift = shift.id_shift')
            ->join('category', 'category.id_category = questions.fk_category')
            ->where('audit.id_audit', $id_audit)
            ->where('audit.fk_status', 1)
            ->where('questions.status', 1)
            ->orderBy('audit.created_at', 'DESC') // Order by created_at in descending order
            ->findAll();
    }

    public function getAuditByStatus($idUser)
    {
        return $this->select('audit.id_audit, audit.no_audit, audit.audit_title, audit.fk_machinery, audit.fk_shift, audit.DATE, audit.fk_department,
                                    audit.fk_status, audit.fk_auditor, users.name, users.firstName, users.lastName ')
            ->join('users', 'users.id_user = audit.fk_auditor')  // Asegura que el auditor esté relacionado
            ->where('audit.fk_auditor', value: $idUser) // Filtra por el id del usuario
            ->where('audit.`fk_status`', 0) // Filtra por el estado de la auditoria

            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }
    public function insertAudit($data)
    {
        return $this->insert($data);
    }

    public function getDataOfAudits()
    {
        return $this->select('audit.id_audit, audit.no_audit, audit.audit_title, users.name,users.firstName, users.lastName, 
            audit.date, audit.fk_auditor, audit.fk_status, department.department, machinery.machinery, shift.shift')
            ->join('users', 'users.id_user = audit.fk_auditor')  // Asegura que el auditor esté relacionado
            ->join('department', 'department.id_department = audit.fk_department') // Realiza el INNER JOIN
            ->join('machinery', 'machinery.id_machinery = audit.fk_machinery') // Realiza el INNER JOIN
            ->join('shift', 'shift.id_shift = audit.fk_shift') // Realiza el INNER JOIN
            ->where('audit.fk_status', 0) // Filtra por el estado de la auditoría
            ->orWhere('audit.fk_status', 1) // Filtra por el estado de la auditoría
            ->where('department.status', 1) // Filtra por el estado del department  
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }

    public function getAuditByNumber($id): mixed
    {
        return $this->select('audit.id_audit, audit.no_audit, audit.date, audit.audit_title, audit.`fk_status`, users.`name`,id_audit, users.firstName, users.lastName,
                                        department.department, machinery.machinery, shift.shift')
            ->join('users', 'users.id_user = audit.fk_auditor')  // Asegura que el auditor esté relacionado
            ->join('department', 'department.id_department = audit.fk_department') // INNER JOIN con department
            ->join('machinery', 'machinery.id_machinery = audit.fk_machinery') // INNER JOIN con Machinery
            ->join('shift', 'shift.id_shift = audit.fk_shift') // INNER JOIN con Shift
            ->where('audit.id_audit', $id) // Filtra por el ID de la auditoría
            ->where('audit.fk_status', 0) // Filtra por el estado de la auditoría
            ->orWhere('audit.fk_status', 1) // Filtra por el estado de la auditoría
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

    public function getAuditsByDepartment(): array
    {
        return $this->select('department.department, COUNT(audit.id_audit) as audit_count')
            ->join('department', 'department.id_department = audit.fk_department')
            ->where('audit.fk_status', 1)
            ->groupBy('department.department')
            ->findAll();
    }

    public function getAuditsByStatus()
    {
        return $this->select('audit.fk_status, COUNT(audit.id_audit) as audit_count')
            ->groupBy('audit.fk_status')
            ->findAll();
    }

    public function getAuditsByShift()
    {
        return $this->select('shift.shift, COUNT(audit.id_audit) as audit_count')
            ->join('shift', 'shift.id_shift = audit.fk_shift')
            ->where('audit.fk_status', 1)
            ->groupBy('shift.shift')
            ->findAll();
    }

    // Method to get the count of pending audits
    public function getPendingAuditsCount()
    {
        return $this->where('status', 'Pendiente')->countAllResults();
    }

    // Method to get the count of audits in progress
    public function getInProgressAuditsCount()
    {
        return $this->where('status', 'En Progreso')->countAllResults();
    }

    // Method to get audits by layer, assuming a 'layer' or equivalent column exists
    public function getAuditsByLayer()
    {
        return $this->select('layer, COUNT(id_audit) as total, AVG(compliance) as cumplimiento')
            ->groupBy('layer')
            ->findAll();
    }

    // Method to retrieve audit history
    public function getAuditHistory()
    {
        return $this->orderBy('date', 'DESC')->findAll(10); // Example limit to 10 most recent records
    }
}
