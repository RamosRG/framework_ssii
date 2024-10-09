<?php

namespace App\Controllers;

use App\Models\AuditModel;
use App\Models\QuestionsModel;


class UserController extends BaseController
{
    
    public function auditDetails()
    {
        // Verifica si el id_audit llega correctamente
        $id_audit = $this->request->getPost('id_audit');

        $model = new QuestionsModel();
        $audit = $model->auditForUser($id_audit);

        if ($audit && count($audit) > 0) {
            
            return $this->response->setJSON([
                'status' => 'success',
                'data' => $audit,
                
            ]);
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Auditoría no encontrada']);
        }
    }
   public function showAudit($id_audit)
    {
        $model = new QuestionsModel();
        $audit = $model->auditForUser($id_audit);

        if ($audit && count($audit) > 0) {
            return view('auditDetails', ['audit' => $audit]);
        } else {
            return redirect()->to('Assignedaudit')->with('error', 'Auditoría no encontrada');
        }
    }
    public function Assignedaudit()
    {
        return view('user/audit_user');
    }
    public function forgotpassword()
    {
        return view('user/forgotPassword');
    }
    public function home()
    {
        return view('user/home');
    }
}
