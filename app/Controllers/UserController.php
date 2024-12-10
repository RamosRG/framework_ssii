<?php

namespace App\Controllers;

use App\Models\ActionsModel;
use App\Models\AuditModel;
use App\Models\AnswersModel;
use App\Models\AuthModel;
use App\Models\QuestionsModel;
use App\Models\FountainModel;
use App\Models\CategoryModel;


class UserController extends BaseController
{
    public function dashboard(){
        return view('dashboard');

    }
    public function getDashboardData()
    {
        $userId = session()->get('id_user'); // Obtiene el ID del usuario logueado
    
        // Validación básica
        if (!$userId) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Usuario no autenticado.',
            ]);
        }
    
        // Modelos para obtener datos
        $auditModel = new AuditModel();
        $answersModel = new AnswersModel();
        $actionsModel = new ActionsModel();
    
        // Auditorías asignadas al usuario
        $audits = $auditModel->where('fk_auditor', $userId)->findAll();
    
        // Preguntas respondidas y no respondidas
        $totalAnswers = $answersModel->countAllResults();
        $answered = $answersModel->where('is_complete', 1)->countAllResults();
        $notAnswered = $totalAnswers - $answered;
    
        // Acciones pendientes
        $pendingActions = $actionsModel->where('is_complete', 0)->countAllResults();
    
        return $this->response->setJSON([
            'status' => 'success',
            'audits' => $audits,
            'answered' => $answered,
            'notAnswered' => $notAnswered,
            'pendingActions' => $pendingActions,
        ]);
    }
    
    public function recoverPassword($token)
    {
        return view('user/reset_password', ['token' => $token]);
    }
    public function requestPasswordReset()
    {

        $email = $this->request->getPost('email');
        if (empty($email)) {
            return $this->response->setJSON(['error' => 'El Correo es Requerido'])->setStatusCode(400);
        }

        $userModel = new AuthModel();

        // Verifica si el usuario existe
        $user = $userModel->where('email', $email)->first();
        if (!$user) {
            return $this->response->setJSON(['error' => 'Correo no Encontrado'])->setStatusCode(404);
        }

        // Generar un token único
        $resetToken = bin2hex(random_bytes(32));
        $expiration = date('Y-m-d H:i:s', strtotime('+1 hour')); // Token válido por 1 hora

        // Guardar el token en la base de datos
        $data = [
            'reset_token' => $resetToken,
            'reset_expires' => $expiration,
        ];
        $userModel->update($user['id_user'], $data);

        // Enviar el correo con el enlace de restablecimiento
        $this->sendResetEmail($email, $resetToken);

        return $this->response->setJSON(['success' => 'Revisa tu Correo']);
    }
    public function resetPassword()
    {

        $token = $this->request->getPost('token');
        $newPassword = $this->request->getPost('password');

        $authModel = new AuthModel();
        $user = $authModel->validateToken($token);

        // Verificar que el token sea válido y no haya expirado (asumiendo que se usa en la base de datos)
        if ($user) {

            // Hash de la nueva contraseña
            $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

            // Actualizar la contraseña en la base de datos
            $updateStatus = $authModel->updatePasswordByToken($token, $hashedPassword);

            if ($updateStatus) {
                return $this->response->setJSON(['success' => 'La contraseña se ha restablecido con éxito.']);
            } else {
                return $this->response->setJSON(['error' => 'Hubo un problema al actualizar la contraseña. Inténtalo de nuevo.']);
            }
        } else {
            return $this->response->setJSON(['error' => 'El token es inválido o ha expirado.']);
        }
    }
    private function sendResetEmail($email, $token)
    {
        $resetLink = base_url("/user/reset-password/{$token}");
        $emailService = \Config\Services::email();

        $emailService->setTo($email);
        $emailService->setFrom('orlandoramosperez26@gmail.com', 'Auditoria Por Capas');
        $emailService->setSubject('Restablecimiento de Contraseña');
        $emailService->setMailType('html'); // Importante para interpretar el HTML

        $emailContent = "
                <div style='font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;'>
                    <div style='max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; 
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);'>
                        <h2 style='color: #333333; text-align: center;'>Restablecimiento de Contraseña</h2>
                        <p style='color: #555555; line-height: 1.5;'>Hola,</p>
                        <p style='color: #555555; line-height: 1.5;'>Haz solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
                        <p style='text-align: center; margin: 20px 0;'>
                            <a href='{$resetLink}' style='display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #ffffff; 
                                    text-decoration: none; border-radius: 5px; font-size: 16px;'>Restablecer Contraseña</a>
                        </p>
                        <p style='color: #555555; line-height: 1.5;'>Si no solicitaste esto, ignora este correo.</p>
                        <hr style='margin: 20px 0; border: none; border-top: 1px solid #eeeeee;'/>
                        <p style='color: #777777; font-size: 12px; text-align: center;'>Este es un mensaje automático, por favor no respondas a este correo.</p>
                        <p style='color: #777777; font-size: 12px; text-align: center;'>Auditoría Por Capas &copy; " . date('Y') . "</p>
                    </div>
                </div>
            ";

        $emailService->setMessage($emailContent);

        if (!$emailService->send()) {
            log_message('error', 'Error al enviar el correo: ' . $emailService->printDebugger(['headers']));
            return false;
        }

        log_message('info', "Correo de restablecimiento enviado a {$email}");
        return true;
    }

    public function submitAuditComment()
    {
        // Obtener los datos enviados como JSON
        $request = $this->request->getJSON();
        $idAudit = $request->id_audit ?? null; // ID de la auditoría
        $comment = $request->comment ?? 'No hay comentario disponible'; // Comentario proporcionado
        $status = $request->status ?? null; // Valor del status

        // Cargar el modelo y actualizar el comentario y el status
        $auditModel = new AuditModel();
        try {
            $updated = $auditModel->update($idAudit, [
                'comment' => $comment,
                'fk_status' => $status, // Actualizar el status recibido
            ]);

            if ($updated) {
                return $this->response->setJSON([
                    'status' => 'success',
                    'message' => 'Comentario y estado actualizados.',
                    'data' => [
                        'id_audit' => $idAudit,
                        'comment' => $comment,
                        'status' => $status, // Devolver el status actualizado
                    ],
                ]);
            }

            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'No se pudo actualizar el comentario o el estado. Verifica el ID de auditoría.',
            ]);
        } catch (\Exception $e) {
            // Manejar errores de base de datos u otros errores
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Ocurrió un error al actualizar la auditoría: ' . $e->getMessage(),
            ]);
        }
    }

    public function getAuditDetails($idAudit, $supervisorId)
    {
        $actionsModel = new QuestionsModel();

        $auditDetails = $actionsModel->getDataOfAccions($idAudit, $supervisorId);

        if (!empty($auditDetails)) {
            return $this->response->setJSON([
                'status' => 'success',
                'data' => $auditDetails
            ]);
        } else {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'No se encontraron detalles para esta auditoría.'
            ]);
        }
    }
    public function savedAudit()
    {
        $data = json_decode($this->request->getBody(), true);

        if (isset($data['userId']) && isset($data['id_audit'])) {
            $userId = $data['userId'];
            $idAudit = $data['id_audit'];

            // Aquí creas una instancia del modelo AuditModel
            $modelAudit = new AuditModel();

            // Actualizas la auditoría en la base de datos
            $modelAudit->update($idAudit, ['id_supervisor' => $userId]);

            return $this->response->setJSON(['status' => 'success', 'message' => 'Auditoría actualizada correctamente.']);
        }

        return $this->response->setJSON(['status' => 'error', 'message' => 'Datos incompletos.']);
    }
    public function getAllActions()
    {
        // Instanciar el modelo
        $actionsModel = new ActionsModel();

        // Obtener todos los registros de la tabla 'actions'
        $data['actions'] = $actionsModel->findAll();

        // Retornar los datos como JSON o pasarlos a una vista
        return $this->response->setJSON($data);
    }
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
        if ($image && $image->isValid()) {
            // Generar un nombre único para la imagen
            $fileName = $image->getRandomName();

            // Ruta de destino para la imagen
            $directoryPath = FCPATH . 'public/images/accions/';
            $relativePath = 'images/accions/' . $fileName; // Ruta relativa para guardar en la base de datos

            // Crear directorio si no existe
            if (!is_dir($directoryPath)) {
                mkdir($directoryPath, 0755, true);
            }

            // Intentar mover el archivo
            if (!$image->move($directoryPath, $fileName)) {
                return $this->response->setJSON(['status' => 'error', 'message' => 'No se pudo guardar la imagen en el servidor']);
            }
        } else {
            // Si no se recibe una imagen válida, establecer el campo de evidencia como null
            $relativePath = null;
        }

        // Preparar datos para guardar en la base de datos
        $data = [
            'fk_answer' => $idAnswer,
            'action_description' => $action,
            'responsable' => $responsable,
            'is_complete' => $isComplete,
            'date' => $date,
            'evidence_accion' => $relativePath, // Guardar la ruta relativa o null
        ];

        $modelaccion = new ActionsModel();

        // Verificar si el registro ya existe
        $existingRecord = $modelaccion->where('fk_answer', $idAnswer)->first();

        if ($existingRecord) {
            // Si el registro existe, actualizarlo
            if ($modelaccion->update($existingRecord['id_actions'], $data)) {
                return $this->response->setJSON(['status' => 'success', 'message' => 'Datos actualizados correctamente']);
            } else {
                return $this->response->setJSON(['status' => 'error', 'message' => 'No se pudo actualizar los datos en la base de datos']);
            }
        } else {
            // Si el registro no existe, insertarlo
            if ($modelaccion->insert($data)) {
                return $this->response->setJSON(['status' => 'success', 'message' => 'Imagen y datos guardados correctamente']);
            } else {
                return $this->response->setJSON(['status' => 'error', 'message' => 'No se pudo guardar los datos en la base de datos']);
            }
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
        $answer = $this->request->getPost('answer');
        $isComplete = $this->request->getPost('complianceCheckBox'); // Revisión del nombre

        // Manejar el archivo subido
        $file = $this->request->getFile('photo');

        // Verificar si el archivo fue subido
        if ($file && $file->isValid()) {
            // Generar un nombre de archivo único basado en el ID de la pregunta para evitar duplicados
            $newName = "photo_" . $fkQuestion . ".png";

            // Ruta del directorio de destino
            $directory = FCPATH . 'public/images/questions/';

            // Crear directorio si no existe
            if (!is_dir($directory)) {
                mkdir($directory, 0755, true); // Crear directorio con permisos adecuados
            }

            // Mover el archivo al directorio 'questions'
            $file->move($directory, $newName); // Sobrescribe si ya existe

            // Obtener la ruta completa de la imagen
            $imagePath = '/questions/' . $newName;

            // Guardar los datos en la base de datos
            $answersModel = new AnswersModel();

            // Verificar si ya existe un registro para esta pregunta
            $existingAnswer = $answersModel->where('fk_question', $fkQuestion)->first();

            // Datos a guardar
            $data = [
                'fk_question' => $fkQuestion,
                'is_complete' => $isComplete,
                'answer' => $answer,
                'evidence' => $imagePath // Guardar la ruta relativa de la imagen
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
