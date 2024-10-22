<?php

namespace App\Controllers;

use App\Models\AnswersModel;
use App\Models\AuditModel;
use App\Models\QuestionsModel;


class UserController extends BaseController
{
    public function takenActions($idAudit)
    {
        // Asegúrate de que el ID de auditoría sea válido
        if (!$idAudit) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'ID de auditoría no proporcionado.']);
        }
    
        $answerModel = new AnswersModel();
    
        // Obtener las acciones tomadas
        $data = $answerModel->getAcciones($idAudit);
    
        // Verificar si se obtuvieron datos
        if (empty($data)) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'No se encontraron acciones tomadas.']);
        }
    
        // Devuelve los datos como JSON
        return $this->response->setJSON(['status' => 'success', 'data' => $data]);
    }
    


    public function uploadPhoto() 
    {
        // Obtener los datos del formulario
        $fkQuestion = $this->request->getPost('fk_question');
        $isComplete = $this->request->getPost('is_complete');
        $answer = $this->request->getPost('answer');
        
        // Manejar el archivo subido
        $file = $this->request->getFile('photo');
    
        // Verificar si el archivo fue subido
        if ($file && $file->isValid()) {
            // Generar un nombre único para el archivo
            $newName = $file->getRandomName();
    
            // Mover el archivo a la carpeta de uploads
            $file->move('uploads', $newName); // 'uploads' es el directorio donde guardas las imágenes
    
            // Obtener la ruta completa de la imagen
            $imagePath = '../uploads/' . $newName;
    
            // Guardar los datos en la base de datos (ajusta según tu estructura de base de datos)
            $answersModel = new AnswersModel();
            $data = [
                'fk_question' => $fkQuestion,
                'is_complete' => $isComplete,
                'answer' => $answer,
                'evidence' => $imagePath // Guardar la ruta de la imagen en la base de datos
            ];
    
            // Asumiendo que tienes un método para insertar datos en la tabla de respuestas
            $answersModel->insert($data);
    
            return $this->response->setJSON(['status' => 'success', 'message' => 'Foto guardada exitosamente.']);
        }
    
        // Manejo de errores si el archivo no es válido
        return $this->response->setJSON(['status' => 'error', 'message' => 'Error al subir la foto.']);
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
