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

    public function getAudit($auditId)
    {
        $builder = $this->db->table('questions');
    
        $builder->select([
            'category.category',
            'questions.question',
            'questions.create_at',
            'source.source',
            'answers.answer AS Que_se_encontro',
            'answers.evidence AS evidence_answer',
            'answers.create_at AS fecha_respuesta_pregunta',
            // Utilizamos COALESCE para reemplazar NULL con 1
            'COALESCE(answers.is_complete, 1) AS question_complete',
            // Ajuste en el CASE para mostrar "Yes" cuando es NULL o distinto de 0
            '(CASE WHEN answers.is_complete = 0 THEN "No" ELSE "Yes" END) AS compliance',
            'actions.action_description',
            'actions.responsable',
            'actions.evidence_accion',
            // COALESCE para reemplazar NULL con 1 en action_complete
            'COALESCE(actions.is_complete, 1) AS action_complete',
            // CASE para mostrar "Yes" cuando es NULL o distinto de 0 en action_complete
            '(CASE WHEN actions.is_complete = 0 THEN "No" ELSE "Yes" END) AS action_compliance',
            'actions.created_at AS action_created_at',
            'actions.updated_at AS action_updated_at'
        ]);
    
        // Join de las tablas necesarias
        $builder->join('source', 'source.id_source = questions.fk_source', 'inner');
        $builder->join('category', 'category.id_category = questions.fk_category', 'inner');
        $builder->join('answers', 'answers.fk_question = questions.id_question', 'left');
        $builder->join('actions', 'actions.fk_answer = answers.id_answer', 'left');
    
        $builder->where('questions.fk_audit', $auditId);
    
        $query = $builder->get();  // Ejecuta la consulta
        return $query->getResultArray();  // Devuelve el resultado como un array
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

    
}
