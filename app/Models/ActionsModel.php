<?php

namespace App\Models;

use CodeIgniter\Model;

class ActionsModel extends Model
{
    protected $table = 'actions'; // Nombre de la tabla
    protected $primaryKey = 'id_actions'; // Llave primaria

    protected $allowedFields = [
        'fk_answer',
        'action_description',
        'responsable',
        'evidence_accion',
        'is_comlete',
        'create_at',
        'update_at'
    ];

    // Permitir que los timestamps se actualicen automáticamente
    protected $useTimestamps = true;
    protected $createdField = 'create_at';
    protected $updatedField = 'update_at';

    
}
