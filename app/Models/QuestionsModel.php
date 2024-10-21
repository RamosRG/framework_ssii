<?php

namespace App\Models;

use CodeIgniter\Model;

class QuestionsModel extends Model
{
    protected $table = 'questions';
    protected $primaryKey = 'id_question';

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = [
        'fk_audit', 
        'fk_category', 
        'question', 
        'status', 
        'create_at', 
        'update_at', 
        'created_by', 
        'fk_source', 
        'evidence'
    ];

    protected $useTimestamps = true;
    protected $createdField = 'create_at';
    protected $updatedField = 'update_at';

    public function getAudit($idAudit)
    {
        return $this->select('category.category, questions.question, questions.create_at, source.source')
            ->join('source', 'source.id_source = questions.fk_source')
            ->join('category', 'category.id_category = questions.fk_category')
            ->where('questions.fk_audit', $idAudit)
            ->findAll();
    }

    public function getQuestionsByCategory($categoryId)
    {
        return $this->where(['fk_category' => $categoryId, 'status' => 1])
                    ->findAll();
    }

    public function updateQuestionById($id, $data)
    {
        return $this->update($id, $data);
    }

    public function showAllQuestions()
    {
        return $this->select('questions.id_question, questions.question, questions.create_for, questions.status, source.source, category.category')
            ->join('category', 'questions.fk_category = category.id_category')
            ->join('source', 'questions.fk_source = source.id_source')
            ->where('questions.status', 1)
            ->orderBy('category.category', 'ASC')
            ->findAll();
    }

    public function insertBatchQuestions($data)
    {
        return $this->insertBatch($data);
    }

    public function auditForUser($id_audit)
    {
        return $this->select('audit.audit_title, audit.fk_auditor, users.name, users.firstName, users.lastName, shift.shift, machinery.machinery, department.department,
                             category.category, questions.question, questions.id_question, questions.create_at, source.source, audit.no_audit,
                             audit.id_audit, audit.fk_auditor, audit.status, audit.date, audit.id_audit')
            ->join('source', 'source.id_source = questions.fk_source')
            ->join('category', 'category.id_category = questions.fk_category')
            ->join('audit', 'questions.fk_audit = audit.id_audit')
            ->join('users', 'users.id_user = audit.fk_auditor')
            ->join('shift', 'audit.fk_shift = shift.id_shift')
            ->join('machinery', 'machinery.id_machinery = audit.fk_machinery')
            ->join('department', 'department.id_department = audit.fk_department')
            ->where('audit.id_audit', $id_audit)
            ->where('audit.status', 1)
            ->findAll();
    }

    public function addEvidenceToQuestion($questionId, $data)
    {
        return $this->update($questionId, $data); // Actualizar el campo de evidencia con el nombre de archivo
    }
    
}
