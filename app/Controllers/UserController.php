<?php

namespace App\Controllers;

use App\Models\AuditModel;
use App\Models\QuestionsModel;


class UserController extends BaseController
{
    
    public function showAudit()
    {
        return view('user/show_audit');

    }
    public function auditDetails($id_audit)
    {
        $model = new QuestionsModel();
        $audit = $model->auditForUser($id_audit);
    
        if ($audit && count($audit) > 0) {
            return $this->response->setJSON([
                'status' => 'success',
                'data' => $audit
            ]);
        } else {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Auditoría no encontrada'
            ]);
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
