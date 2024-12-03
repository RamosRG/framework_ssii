<?php

namespace App\Models;

use CodeIgniter\Model;


class AdminModel extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'id_user'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['email', 'name', 'firstName', 'lastName', 'password', 'fk_department', 'fk_role', 'privileges', 'status', 'created_at', 'updated_at', 'id_supervisor','reset_token','reset_expires'];


    protected bool $status = true;

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';


    public function isEmailExist($email)
    {
        return $this->where('email', $email)->first() !== null;
    }
    
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
        return $this->delete('users'); 
    }
    return false;

    }
    
    public function GetDataOfAccions($idSupervisor)
    {
        return $this->select([
                'users.name', 
                'users.firstName', 
                'users.lastName',
                'audit.audit_title', 
                'audit.date', 
                'audit.id_audit'
            ])
            ->join('audit', 'users.id_user = audit.fk_auditor') // Realiza el INNER JOIN correctamente
            ->where('audit.id_supervisor', $idSupervisor) // Filtra por el ID del supervisor
            ->where('audit.status', 1) // Filtra por el ID del supervisor
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }
    
}

