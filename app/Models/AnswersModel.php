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
        'created_at',
        'updated_at'
    ];

    // Permitir que los timestamps se actualicen automáticamente
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    public function getAcciones($idAudit)
    {
        return $this->select('audit.id_audit, questions.id_question, questions.question, questions.`status`, answers.id_answer, answers.is_complete, answers.answer,
answers.evidence, answers.created_at,  users.`name`, users.firstName, users.lastName, actions.action_description, actions.created_at,
actions.evidence_accion, actions.is_complete')
            ->join('questions', 'questions.id_question = answers.fk_question')
            ->join('audit', 'audit.id_audit = questions.fk_audit')
            ->join('users', 'users.id_user = audit.fk_auditor')
            ->join('actions', 'answers.id_answer = actions.fk_answer')
            ->where('audit.id_audit', $idAudit)
            ->where('audit.status', 1)
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }
}
