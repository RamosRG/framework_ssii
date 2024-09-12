<?php

namespace App\Models;

use CodeIgniter\Model;


class AdminModel extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'id_user'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['email', 'name', 'firstName', 'lastName', 'password', 'fk_area', 'status', 'created_at', 'updated_at'];


    protected bool $status = true;

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    public function insertUser($data)
    {
        return $this->insert($data);
    }
    public function updatedById($id, $data)
    {
        // Verificar que el ID esté presente y actualiza solo el registro que corresponde
        return $this->where('id_user', $id)->set($data)->update();

    }
    public function deletebyId($id)
    {
    if ($id) {
        $this->where('id_user', $id); // Asegúrate de que 'id_user' sea el nombre correcto de la columna en la base de datos
        return $this->delete('users'); // Cambia 'users' al nombre de tu tabla
    }
    return false;

    }
    

}

