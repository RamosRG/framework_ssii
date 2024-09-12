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
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    public function getArea()
    {
        // Construiendo la consulta SQL directamente
        $builder = $this->builder();
        $builder->select('*');
        $query = $builder->get();

        $area = $query->getResultArray();
        
        return $area;
    }
}
 ?>
