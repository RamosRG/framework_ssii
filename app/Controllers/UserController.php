<?php

namespace App\Controllers;

use App\Models\ActionsModel;
use App\Models\AnswersModel;
use App\Models\QuestionsModel;
use App\Models\FountainModel;
use App\Models\CategoryModel;


class UserController extends BaseController
{
    public function submitAnswer()
    {

    
        // Obtener los datos del POST
        $questionId = $this->request->getPost('questionId');
        $action = $this->request->getPost('action');
        $responsable = $this->request->getPost('responsable');
        $date = $this->request->getPost('date');
        $isComplete = $this->request->getPost('is_complete');
        $idAnswer = $this->request->getPost('fk_answer');
        
        
        // Verificar si el archivo de imagen ha sido recibido
        $image = $this->request->getFile('photo');
        if (!$image->isValid()) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'No se recibió una imagen válida']);
        }
    
        // Generar un nombre único para la imagen
        $fileName = $image->getRandomName();
        
        // Mover el archivo a la ubicación deseada
        $filePath = WRITEPATH . 'accions/' . $fileName;
        if ($image->move(WRITEPATH . 'accions', $fileName)) {
            // Preparar datos para guardar en la base de datos
            $data = [
                'fk_answer' => $idAnswer,
                'action_description' => $action,
                'responsable' => $responsable,
                'is_complete' => $isComplete,
                'date' => $date,
                'evidence_accion' => $fileName,
            ];
            
            $modelaccion = new ActionsModel();
            
            // Guardar en la base de datos
            if ($modelaccion->insert($data)) {
                return $this->response->setJSON(['status' => 'success', 'message' => 'Imagen y datos guardados correctamente']);
            } else {
                return $this->response->setJSON(['status' => 'error', 'message' => 'No se pudo guardar los datos en la base de datos']);
            }
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'No se pudo guardar la imagen en el servidor']);
        }
    }
    
    public function getFountain()
    {
        $fountain = new FountainModel();
        $data = $fountain->findAll();
        return $this->response->setJSON([
            'status' => 'success',
            'fountain' => $data
        ]);
    }
    public function getCategory()
    {
        $category = new CategoryModel();
        $data = $category->findAll();

        return $this->response->setJSON([
            'status' => 'success',
            'category' => $data
        ]);
    }
    public function createQuestion()
    {
        return view("user/create_questions");
    }
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
            // Generar un nombre de archivo único basado en el ID de la pregunta para evitar duplicados
            $newName = "photo_" . $fkQuestion . ".png";
            $file->move('questions', $newName, true); // Mueve y sobrescribe si existe

            // Obtener la ruta completa de la imagen
            $imagePath = '../questions/' . $newName;

            // Guardar los datos en la base de datos (ajusta según tu estructura de base de datos)
            $answersModel = new AnswersModel();

            // Verificar si ya existe un registro para esta pregunta
            $existingAnswer = $answersModel->where('fk_question', $fkQuestion)->first();

            // Datos a guardar
            $data = [
                'fk_question' => $fkQuestion,
                'is_complete' => $isComplete,
                'answer' => $answer,
                'evidence' => $imagePath // Guardar la ruta de la imagen en la base de datos
            ];

            // Verificar si ya existe una respuesta
            if ($existingAnswer) {
                // Si ya existe, actualizar el registro en lugar de insertar uno nuevo
                if (isset($existingAnswer['id_answer'])) {
                    $answersModel->update($existingAnswer['id_answer'], $data);
                    return $this->response->setJSON(['status' => 'success', 'message' => 'Foto actualizada exitosamente.']);
                } else {
                    return $this->response->setJSON(['status' => 'error', 'message' => 'Error: ID de respuesta no encontrado.']);
                }
            } else {
                // Si no existe, insertar un nuevo registro
                $answersModel->insert($data);
                return $this->response->setJSON(['status' => 'success', 'message' => 'Foto guardada exitosamente.']);
            }
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
