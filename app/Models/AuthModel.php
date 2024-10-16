<?php

namespace App\Models;

use CodeIgniter\Model;

class AuthModel extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'id_user'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['email', 'name', 'firstName', 'lastName', 'password', 'fk_area', 'status', 'email_verified', 'verification_token', 'privileges', 'created_at', 'updated_at']; // Correcto

    protected bool $status = true;

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'create_at';
    protected $updatedField = 'update_at';

    public function authenticate($email, $password)
    {
        // Construyendo la consulta SQL para buscar el usuario por email y estado activo
        $builder = $this->builder();
        $builder->select('id_user, email, name, firstName, lastName, status, password, privileges');
        $builder->where('email', $email);
        $builder->where('status', 1); // Solo usuarios activos
        $user = $builder->get()->getFirstRow(); // Obtiene el primer resultado de la consulta

        // Verifica si se encontró el usuario
        if ($user) {
            // Verifica la contraseña utilizando password_verify
            if (password_verify($password, $user->password)) {
                return (array)$user; // Retorna el usuario si la contraseña es correcta como array
            }
        }

        return false; // Retorna false si no se encontró el usuario o la contraseña es incorrecta
    }

    public function getUsers()
    {
        return $this->select('users.email, users.name, users.firstName, users.lastName, area.area, department.department, users.`status`, users.created_at, users.updated_at')  // Selecciona todos los campos de ambas tablas
            ->join('department', 'department.id_department = users.fk_department') // Realiza el INNER JOIN
            ->join('area', 'area.id_area = department.fk_area') // Realiza el INNER JOIN
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }

    public function getUsersByNumbre($id)
    {
        return $this->select('area.id_area, area.area, users.email, users.id_user, users.name, users.lastName, users.firstName,
        users.fk_area, users.status, users.created_at, users.updated_at, users.privileges, users.password')
            ->join('area', 'users.fk_area = area.id_area') // Realiza el INNER JOIN
            ->where('users.id_user', $id)  // Usa coma en lugar de => para el método where
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }
}
