<?php

namespace App\Models;

use CodeIgniter\Model;

class AnswersModel extends Model
{
    protected $table = 'answers'; // Nombre de la tabla
    protected $primaryKey = 'id_answer'; // Llave primaria

    protected $allowedFields = [
        'fk_question',
        'is_complete',
        'answer',
        'observation',
        'evidence',
        'create_at',
        'update_at'
    ];

    // Permitir que los timestamps se actualicen automáticamente
    protected $useTimestamps = true;
    protected $createdField = 'create_at';
    protected $updatedField = 'update_at';

    public function getAcciones($idAudit)
    {
        return $this->select('audit.id_audit, questions.id_question, questions.question, questions.`status`, answers.id_answer, answers.is_complete, answers.answer,
answers.evidence, answers.create_at')
            ->join('questions', 'questions.id_question = answers.fk_question')
            ->join('audit', 'audit.id_audit = questions.fk_audit')
            ->where('audit.id_audit', $idAudit)
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }
}
