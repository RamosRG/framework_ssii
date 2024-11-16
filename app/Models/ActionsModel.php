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
    public function updateActionSupervisors($auditData)
    {
        $builder = $this->db->table('actions'); // Especificar la tabla 'actions'

        // Recorrer los datos para hacer las actualizaciones
        foreach ($auditData as $record) {
            // Acceder a los valores como propiedades de objeto, no como arreglo
            if ($record->userId !== null) { // Acceso correcto: $record->responsible
                $builder->set('supervisor_id', $record->userId) // Establecer el supervisor
                    ->where('fk_answer', $record->idAnswer) // Condición de búsqueda con id_answer
                    ->update(); // Ejecutar la actualización
            }
        }

        return true; // Retorna verdadero si se actualiza correctamente
    }


}