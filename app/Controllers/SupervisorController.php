<?php

namespace App\Controllers;

use App\Models\AdminModel;
use App\Models\AuthModel;
use App\Models\DepartamentModel;
use App\Models\QuestionsModel;
use CodeIgniter\Email\Email;

class SupervisorController extends BaseController
{
    public function auditToReview($idSupervisor) {
        
        $card = new AdminModel();
        $data = $card->GetDataOfAccions($idSupervisor);
    
        return $this->response->setJSON([
            'status' => 'success',
            'data' => $data
        ]);
    }
    
    
    public function AccionsOfAudit()
    {
        return view("supervisor/audit_supervisor");
    }
    public function home()
    {
        return view("supervisor/home");
    }
    public function auditForSupervisor($idUser)
    {
        $model = new QuestionsModel();

        // Obtener los datos de la auditoría
        $audit = $model->getDataOfActions($idUser);


        if ($audit && count($audit) > 0) {
            return $this->response->setJSON([
                'status' => 'success',
                'data' => $audit
            ]); // Devolver los datos completos de la auditoría
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Auditoría no encontrada por usuario']);
        }
    }
}
