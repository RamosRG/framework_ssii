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
        'created_at',
        'updated_at',
        'created_by',
        'fk_source',
        'evidence'
    ];

    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';


   
    
    public function getDataOfAccions($idAudit, $supervisorId)
    {
        $builder = $this->db->table('questions');
        $builder->select('
            audit.audit_title, audit.created_at, audit.id_audit, actions.supervisor_id
        ');
        $builder->join('audit', 'audit.id_audit = questions.fk_audit');
        $builder->join('answers', 'answers.fk_question = questions.id_question');
        $builder->join('audit', 'audit.id_audit = answers.fk_audit');
        $builder->join('actions', 'actions.fk_answer = answers.id_answer');
        $builder->where('audit.id_audit', $idAudit);
        $builder->where('audit.fk_status', 0);
        $builder->orWhere('audit.fk_status', 1);
        $builder->where('actions.supervisor_id', $supervisorId);

        return $builder->get()->getResultArray();
    }
    public function getAuditActions($idAudit, $supervisorId)
    {
        $builder = $this->db->table('questions');
        $builder->select('
            questions.question,
            audit.audit_title,
            audit.id_audit,
            answers.answer,
            answers.evidence,
            actions.action_description,
            actions.evidence_accion,
            actions.is_complete,
            actions.supervisor_id
        ');
        $builder->join('answers', 'answers.fk_question = questions.id_question');
        $builder->join('audit', 'audit.id_audit = answers.fk_audit');
        $builder->join('actions', 'actions.fk_answer = answers.id_answer');
        $builder->where('audit.id_audit', $idAudit);
        $builder->where('actions.supervisor_id', $supervisorId);

        return $builder->get()->getResultArray();
    }
    public function getAudit($auditId)
    {
        $builder = $this->db->table('questions');

        $builder->select([
            'category.category',
            'questions.question',
            'questions.created_at',
            'source.source',
            'answers.answer AS Que_se_encontro',
            'answers.evidence AS evidence_answer',
            'answers.created_at AS fecha_respuesta_pregunta',
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
        return $this->select('questions.id_question, questions.question, questions.created_by, questions.status, source.source, category.category')
            ->join('category', 'questions.fk_category = category.id_category')
            ->join('source', 'questions.fk_source = source.id_source')
            ->where('questions.status', 0)
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
                             category.category, questions.question, questions.id_question, questions.created_at, source.source, audit.no_audit,
                             audit.id_audit, audit.fk_auditor, audit.fk_status, audit.date, audit.id_audit, audit.date_start, audit.date_end')
            ->join('source', 'source.id_source = questions.fk_source')
            ->join('category', 'category.id_category = questions.fk_category')
            ->join('audit', 'questions.fk_audit = audit.id_audit')
            ->join('users', 'users.id_user = audit.fk_auditor')
            ->join('shift', 'audit.fk_shift = shift.id_shift')
            ->join('machinery', 'machinery.id_machinery = audit.fk_machinery')
            ->join('department', 'department.id_department = audit.fk_department')
            ->where('audit.id_audit', $id_audit)
            ->whereIn('audit.fk_status', [0, 1]) // Filtra por los estados de la auditoría (0 y 1)
            ->findAll();
    }
}
