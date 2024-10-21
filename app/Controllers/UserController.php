<?php

namespace App\Controllers;

use App\Models\AuditModel;
use App\Models\QuestionsModel;


class UserController extends BaseController
{
    public function uploadPhoto()
    {
        $questionId = $this->request->getPost('question_id');
    
        // Verificar si hay un archivo
        if ($this->request->getFile('photo')->isValid()) {
            $file = $this->request->getFile('photo');
            $fileName = 'photo_' . time() . '.' . $file->getExtension();
            $file->move('./public/images/evidenceQuestions', $fileName);
    
            // Guardar en la base de datos
            $questionModel = new QuestionsModel(); // Asegúrate de tener el namespace correcto del modelo
            $data = [
                'evidence' => $fileName
            ];
    
            // Actualizar la evidencia en la pregunta
            if ($questionModel->addEvidenceToQuestion($questionId, $data)) {
                return $this->response->setJSON(['status' => 'success', 'message' => 'Foto guardada exitosamente.']);
            } else {
                return $this->response->setJSON(['status' => 'error', 'message' => 'Error al guardar la foto en la base de datos.']);
            }
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'No se pudo subir la foto.']);
        }
    }
    

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
