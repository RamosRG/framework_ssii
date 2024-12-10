<?php

namespace App\Models;

use CodeIgniter\Model;

class ActionsModel extends Model
{
    protected $table = 'actions'; // Nombre de la tabla
    protected $primaryKey = 'id_actions'; // Llave primaria

    protected $allowedFields = [
        'action_description',
        'fk_answer',
        'evidence_accion',
        'responsable',
        'is_complete',
        'created_at',
        'updated_at',
        'supervisor',
    ];

    // Permitir que los timestamps se actualicen automáticamente
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    
    public function getActionsProgress()
    {
        return $this->select('is_complete, COUNT(*) as total')
                    ->groupBy('is_complete')
                    ->findAll();
    }

}