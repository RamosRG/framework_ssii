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


    public function insertQuestion($data)
    {
        return $this->insert($data);
    }
}
