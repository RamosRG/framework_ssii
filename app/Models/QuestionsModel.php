<?php

namespace App\Models;

use CodeIgniter\Model;

class QuestionsModel extends Model
{
    protected $table = 'questions';
    protected $primaryKey = 'id_question'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['email', 'name', 'firstname', 'lastname', 'password']; // Correcto

    protected bool $status = true;

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'create_at';
    protected $updatedField = 'update_at';

    public function authenticate($email, $password)
    {
        // Construiendo la consulta SQL directamente
        $builder = $this->builder();
        $builder->select('*');
        $builder->where('email', $email);
        $query = $builder->get();

        $user = $query->getRowArray();
        
        if ($user) {
            if (password_verify($password, $user['password'])) {
                return $user;
            }
        }

        return false;
    }
    public function getUsers()
    {
        return $this->select('area.id_area, area.area, users.email, users.id_user, users.`name`, users.lastName, users.firstName, users.`status`, users.created_at, users.updated_at')  // Selecciona todos los campos de ambas tablas
            ->join('area', 'users.fk_area = area.id_area') // Realiza el INNER JOIN
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }

    public function getUsersByNumbre($id)
    {
        return $this->select('area.id_area, area.area, users.email, users.id_user, users.name, users.lastName, users.firstName, users.fk_area, users.status, users.created_at, users.updated_at')
            ->join('area', 'users.fk_area = area.id_area') // Realiza el INNER JOIN
            ->where('users.id_user', $id)  // Usa coma en lugar de => para el método where
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }
    

}

