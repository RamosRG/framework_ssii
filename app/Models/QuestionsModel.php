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



    public function showAllQuestions()
{
    $builder = $this->db->table('questions');
    $builder->select('id_question, fk_category, question, status, create_for, fk_fountain');
    $builder->where('status', 1); // Solo preguntas activas
    
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
