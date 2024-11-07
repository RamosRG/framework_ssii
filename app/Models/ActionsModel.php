<?php

namespace App\Models;

use CodeIgniter\Model;

class ActionsModel extends Model
{
    protected $table = 'actions'; // Nombre de la tabla
    protected $primaryKey = 'id_action'; // Llave primaria

    protected $allowedFields = [
        'fk_answer',
        'action_description',
        'responsable',
        'evidence_accion',
        'is_complete',
        'created_at',
        'updated_at'
    ];

    // Permitir que los timestamps se actualicen automáticamente
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    
}
