<?php

namespace App\Models;

use CodeIgniter\Model;

class AreasModel extends Model
{
    protected $table = 'area';
    protected $primaryKey = 'id_area'; // Correcto

    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['area', 'status']; // Correcto

    protected bool $status = true;

    // Dates
    protected $useTimestamps = true; // Correcto
    protected $createdField = 'create_at';
    protected $updatedField = 'update_at';

    public function getArea()
    {
        // Construiendo la consulta SQL directamente
        $builder = $this->builder();
        $builder->select('*');
        $query = $builder->get();

        $area = $query->getResultArray();

        return $area;
    }
    public function getDepartamentById($idArea)
    {

        return $this->select('area.id_area, area.area, area.`status`, department.id_department, department.department')
            ->join('department', 'department.fk_area = area.id_area') // Realiza el INNER JOIN
            ->where('area.id_area', $idArea) // Filtra por el estado de la auditoría
            ->where('area.`status`', 1) // Filtra por el estado del departamento
            ->where('department.`status', 1) // Filtra por el estado del departamento
            ->get()
            ->getResultArray(); // Devuelve el resultado como un array
    }
}
