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
        return $this->select('category.category ,questions.question, questions.create_at, fountain.fountain')
            ->join('fountain', 'fountain.id_fountain = questions.fk_fountain') // Realiza el INNER JOIN
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
}
