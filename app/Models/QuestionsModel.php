<?php

namespace App\Models;

use CodeIgniter\Model;

class QuestionsModel extends Model
{
    protected $table = 'questions';
    protected $primaryKey = 'id_question'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['fk_category', 'fk_audit', 'question', 'status', 'create_for', 'fk_fountain']; // Correcto

    protected bool $status = true;

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'create_at';
    protected $updatedField = 'update_at';

    public function getAudit($idAudit)
    {
        return $this->select('questions.question, questions.create_at, source.source')
            ->join('source', 'source.id_source = questions.fk_source') // Realiza el INNER JOIN
            ->join('category', 'category.id_category = questions.fk_category') // Realiza el INNER JOIN
            ->where('questions.fk_audit', $idAudit) // Filtra por el id de la auditoria
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }
    public function getQuestionsByCategory($categoryId)
    {
        return $this->where('fk_category', $categoryId)
            ->where('status', 1)
            ->findAll();
    }

    public function updateQuestionById($id, $data)
    {
        return $this->update($id, $data); // Actualiza el registro con el nuevo status
    }

    public function showAllQuestions()
    {
        $builder = $this->db->table('questions');
        $builder->select('questions.id_question, questions.question, questions.create_for, questions.status, fountain.fountain, category.category')
            ->join('category', 'questions.fk_category = category.id_category') // Corrección en la clave foránea
            ->join('fountain', 'questions.fk_fountain = fountain.id_fountain') // Corrección en la clave foránea
            ->where('questions.status', 1) // Solo preguntas activas
            ->orderBy('category.category', 'ASC');
        $query = $builder->get();

        if ($query->getNumRows() > 0) {
            return $query->getResultArray(); // Devolver como array
        } else {
            return []; // Si no hay resultados, devolver un array vacío
        }
    }

    public function insertBatchQuestions($data)
    {
        return $this->insertBatch($data); // Insertar múltiples preguntas a la vez
    }
    public function auditForUser($id_audit)
    {
        return $this->select('audit.audit_tittle, audit.auditor, shift.shift, machinery.machinery, departament.departament,
                            category.category, questions.question, questions.id_question, questions.create_at, fountain.fountain, audit.no_audit,
                            audit.id_audit, audit.fk_user, audit.`status`, audit.date, audit.id_audit')
            ->join('fountain', 'fountain.id_fountain = questions.fk_fountain') // INNER JOIN
            ->join('category', 'category.id_category = questions.fk_category') // INNER JOIN
            ->join('audit', 'questions.fk_audit = audit.id_audit') // INNER JOIN
            ->join('users', 'users.id_user = audit.fk_user') // INNER JOIN
            ->join('shift', 'audit.fk_shift = shift.id_shift') // INNER JOIN
            ->join('machinery', 'machinery.id_machinery = audit.fk_machinery') // INNER JOIN
            ->join('departament', 'departament.id_departament = audit.fk_departament') // INNER JOIN
            ->where('audit.id_audit', $id_audit) // Filtra por el id del usuario
            ->where('audit.status', 1) // Filtra por el estado de la auditoría
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }
}
