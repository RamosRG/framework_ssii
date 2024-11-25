<?php

namespace App\Controllers;

use App\Models\AdminModel;
use App\Models\MachinaryModel;
use App\Models\ShiftModel;
use App\Models\DepartamentModel;
use App\Models\AuditModel;
use App\Models\CategoryModel;
use App\Models\FountainModel;
use App\Models\QuestionsModel;
use App\Models\AreasModel;
use App\Models\RoleModel;
use CodeIgniter\HTTP\ResponseInterface;

class AccionsController extends BaseController
{
   public function getAuditsFinished()
   {
      $auditModel = new AuditModel();
      $data = $auditModel->getDataOfAuditsInactives();
      return $this->response->setJSON($data);
   }
   
   public function getVerificaciones($idAudit)
   {
    
       if (!$idAudit) {

           return $this->response->setJSON(['status' => 'error', 'message' => 'ID de auditoría no proporcionado.']);
       }
   
       $auditModel = new AuditModel();
    
       // Obtener las acciones tomadas
       $follow = $auditModel->getAuditVerification($idAudit);
       
       // Ver los datos en la consola para depurar
   
       if (empty($follow)) {
           return $this->response->setJSON(['status' => 'error', 'message' => 'No se encontraron acciones tomadas.']);
       }
   
       return $this->response->setJSON(['status' => 'success', 'data' => $follow]);
   }
   public function getRole()
   {
      $role = new RoleModel();
      $data = $role->findAll();
      return $this->response->setJSON([
         'status' => 'success',
         'role' => $data
      ]);
   }
   public function editAudit()
   {
       $request = service('request');

       try {
           // Leer los datos enviados
           $requestData = json_decode($request->getBody(), true);

           // Validar campos requeridos
           if (
               empty($requestData['audit_title']) ||
               empty($requestData['fk_auditor']) ||
               empty($requestData['fk_department']) ||
               empty($requestData['fk_shift']) ||
               empty($requestData['fk_machinery'])
           ) {
               return $this->response->setJSON([
                   'status' => 'error',
                   'message' => 'Faltan datos principales de la auditoría.',
               ])->setStatusCode(ResponseInterface::HTTP_BAD_REQUEST);
           }

           // Preparar los datos para la actualización
           $dataToUpdate = [
               'audit_title'   => $requestData['audit_title'],
               'fk_auditor'    => $requestData['fk_auditor'],
               'fk_department' => $requestData['fk_department'],
               'fk_shift'      => $requestData['fk_shift'],
               'fk_machinery'  => $requestData['fk_machinery'],
               'date_start'    => $requestData['date_start'] ?? null,
               'date_end'      => $requestData['date_end'] ?? null,
               'reviewed_by'   => $requestData['reviewed_by'] ?? null,
               'review_date'   => $requestData['review_date'] ?? null,
               'status'        => $requestData['status'] ?? 1, // Activo por defecto
           ];

           // Actualizar en la base de datos
           $auditModel = new AuditModel();
           $updated = $auditModel->update($requestData['id_audit'], $dataToUpdate);

           if (!$updated) {
               return $this->response->setJSON([
                   'status' => 'error',
                   'message' => 'No se pudo actualizar la auditoría.',
               ])->setStatusCode(ResponseInterface::HTTP_INTERNAL_SERVER_ERROR);
           }

           // Respuesta exitosa
           return $this->response->setJSON([
               'status' => 'success',
               'message' => 'Auditoría actualizada correctamente.',
           ]);
       } catch (\Exception $e) {
           return $this->response->setJSON([
               'status' => 'error',
               'message' => 'Error al procesar la solicitud: ' . $e->getMessage(),
           ])->setStatusCode(ResponseInterface::HTTP_INTERNAL_SERVER_ERROR);
       }
   }
   public function AuditToEdit()
   {
      return view('accions/audit_to_edit');
   }
   public function getAuditOfEdit($data)
   {
      $model = new AuditModel();

      // Obtener los datos de la auditoría
      $audit = $model->editAudit($data);

      if ($audit && count($audit) > 0) {
         return $this->response->setJSON([
            'status' => 'success',
            'data' => $audit
         ]); // Devolver los datos completos de la auditoría
      } else {
         return $this->response->setJSON(['status' => 'error', 'message' => 'Auditoría no encontrada']);
      }
   }
   public function getAuditToEdit()
   {
      $model = new AuditModel();

      // Obtener los datos de la auditoría
      $audit = $model->getAuditForId();

      if ($audit && count($audit) > 0) {
         return $this->response->setJSON([
            'status' => 'success',
            'data' => $audit
         ]); // Devolver los datos completos de la auditoría
      } else {
         return $this->response->setJSON(['status' => 'error', 'message' => 'Auditoría no encontrada']);
      }
   }
   public function showAuditsToEdit()
   {
      return view('accions/edit_audit');
   }
   public function generateWeeklyAudit()
   {
      $auditModel = new AuditModel();
      $questionsModel = new QuestionsModel();

      // Verificar si ya existe una auditoría creada esta semana
      $currentWeek = date('W');
      $currentYear = date('Y');
      $existingAudit = $auditModel->where('year', $currentYear)
         ->where('week', $currentWeek)
         ->first();

      if ($existingAudit) {
         // Si la auditoría ya existe esta semana, no se crea una nueva
         return "La auditoría ya existe para esta semana.";
      }

      // Crear una nueva auditoría para la semana actual
      $newAuditId = $auditModel->insert([
         'week' => $currentWeek,
         'year' => $currentYear,
         'status' => 'active',
         'created_at' => date('Y-m-d H:i:s')
      ]);

      // Copiar preguntas activas a la nueva auditoría
      $questions = $questionsModel->where('active', 1)->findAll();
      foreach ($questions as $question) {
         $questionsModel->insert([
            'audit_id' => $newAuditId,
            'question_text' => $question['question_text'],
            'active' => $question['active']
         ]);
      }

      return "Auditoría semanal creada exitosamente.";
   }
   public function dashboard()
   {
      return view("accions/dashboard");
   }
   public function getUser()
   {
      $areas = new AdminModel();
      $data = $areas->findAll();

      return $this->response->setJSON([
         'status' => 'success',
         'areas' => $data  // Aquí usas 'areas'
      ]);
   }
   public function getDepartamentById($idArea)
   {
      $departments = new AreasModel();
      $data = $departments->getDepartamentById($idArea); // Usar la función del modelo

      return $this->response->setJSON([
         'status' => 'success',
         'departments' => $data
      ]);
   }
   public function getArea()
   {
      $areas = new AreasModel();
      $data = $areas->findAll();

      return $this->response->setJSON([
         'status' => 'success',
         'areas' => $data  // Aquí usas 'areas'
      ]);
   }
   public function auditForUsers($data)
   {
      $model = new AuditModel();
      
      // Obtener los datos de la auditoría
      $audit = $model->getAuditByStatus($data);


      if ($audit && count($audit) > 0) {
         return $this->response->setJSON([
            'status' => 'success',
            'data' => $audit
         ]); // Devolver los datos completos de la auditoría
      } else {
         return $this->response->setJSON(['status' => 'error', 'message' => 'Auditoría no encontrada por usuario']);
      }
   }
   //funcion para obtener la auditoria para los detalles de la auditoria por el ID
   public function getAudit($data)
   {
      $model = new QuestionsModel();

      // Obtener los datos de la auditoría
      $audit = $model->getAudit($data);

      if ($audit && count($audit) > 0) {
         return $this->response->setJSON([
            'status' => 'success',
            'data' => $audit
         ]); // Devolver los datos completos de la auditoría
      } else {
         return $this->response->setJSON(['status' => 'error', 'message' => 'Auditoría no encontrada']);
      }
   }
   //Actualizar el estatus de las preguntas
   public function updateStatus()
   {
       $model = new QuestionsModel();
   
       // Obtener los datos desde el cuerpo de la solicitud POST
       $id = $this->request->getPost('questionId');
       $status = $this->request->getPost('status');
   
       // Validamos el status, debe ser 0 o 1
       if ($status != 0 && $status != 1) {
           return $this->response->setJSON(['error' => 'Status inválido']);
       }
   
       // Validamos que el ID de la pregunta exista
       if (!$id) {
           return $this->response->setJSON(['error' => 'ID de pregunta no proporcionado']);
       }
   
       // Actualizar el estado de la pregunta por ID
       if ($model->update($id, ['status' => $status])) {
           return $this->response->setJSON(['success' => 'El estado ha sido actualizado correctamente']);
       } else {
           return $this->response->setJSON(['error' => 'No se pudo actualizar el estado']);
       }
   }
   
   public function showQuestion()
   {
      $model = new QuestionsModel();

      // Llamamos al método del modelo para obtener las preguntas activas
      $questions = $model->showAllQuestions();
      // Ver el resultado en la consola para verificar el formato JSON
      echo json_encode($questions);
   }
   public function insertQuestions()
   {

      $data = [
         'fk_category' => $this->request->getPost('category'), // Asegúrate de que coincida con el formulario
         'question' => $this->request->getPost('question'),
         'created_by' => $this->request->getPost('create_for'),
         'status' => $this->request->getPost("status"),
         'fk_source' => $this->request->getPost('source') // Asegúrate de que coincida con el formulario
      ];

      try {
         $questionsModel = new QuestionsModel();
         if ($questionsModel->insert($data)) {
            return $this->response->setJSON(['status' => 'success', 'message' => 'Question created successfully']);
         } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to create the new Question']);
         }
      } catch (\Exception $e) {
         return $this->response->setJSON(['status' => 'error', 'message' => $e->getMessage()]);
      }
   }
   public function getSource()
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

   public function auditdetails()
   {
      // Cargar la vista de detalles
      return view('accions/audit_details');
   }
   public function getAuditById($id)
   {
      $model = new AuditModel();

      // Obtener los datos de la auditoría
      $audit = $model->getAuditByNumber($id); // Cambié a 'getAuditByNumber' por consistencia

      if ($audit && count($audit) > 0) {
         return $this->response->setJSON($audit[0]); // Devolver solo el primer resultado
      } else {
         return $this->response->setJSON(['error' => 'Auditoría no encontrada']);
      }
   }
   public function getAudits()
   {
      $auditModel = new AuditModel();
      $data = $auditModel->getDataOfAudits();
      return $this->response->setJSON($data);
   }
   public function showquestions()
   {

      return view('accions/show_questions');
   }
   public function showaudit()
   {

      return view('accions/show_audit');
   }
   public function ShowFinishedAudit()
   {

      return view('accions/show_audit_finished');
   }
   public function addquestions()
   {
      return view('accions/add_questions');
   }
   public function addaudit()
   {
      return view('accions/add_audit');
   }
   public function getMachinery()
   {
      $machinery = new MachinaryModel();
      $data = $machinery->findAll();

      return $this->response->setJSON([
         'status' => 'success',
         'machinery' => $data
      ]);
   }
   public function getShift()
   {
      $shift = new ShiftModel();
      $data = $shift->findAll();

      return $this->response->setJSON([
         'status' => 'success',
         'shift' => $data
      ]);
   }
   public function getDepartament()
   {
      $departament = new DepartamentModel();
      $data = $departament->findAll();

      return $this->response->setJSON([
         'status' => 'success',
         'departament' => $data
      ]);
   }
   public function insertAudit()
   {

      $auditData = [
         'audit_title' => $this->request->getPost('name-of-audit'),
         'fk_machinery' => $this->request->getPost('machinery'),
         'fk_shift' => $this->request->getPost('shift'),
         'fk_department' => $this->request->getPost('departament'),
         'fk_auditor' => $this->request->getPost('email'),
         'date' => $this->request->getPost('date'),
      ];

      try {
         $auditModel = new AuditModel();
         $auditId = $auditModel->insertAudit($auditData);

         if ($auditId) {
            // Obtener las preguntas enviadas en formato JSON
            $questionsData = json_decode($this->request->getPost('questions'), true); // Decodificar el JSON

            // Preparar el array de preguntas para insertar
            $preparedQuestions = [];

            foreach ($questionsData as $questionData) {
               $preparedQuestions[] = [
                  'fk_audit' => $auditId,
                  'fk_category' => $questionData['id_category'], // Usar el ID de categoría de la pregunta
                  'question' => $questionData['question'],
                  'status' => 1,
                  'created_at' => $this->request->getPost('date'),
                  'fk_source' => $questionData['source'] ?? null,
               ];
            }

            $questionsModel = new QuestionsModel();
            if (!empty($preparedQuestions)) {
               if (!$questionsModel->insertBatch($preparedQuestions)) {
                  throw new \Exception('Error al insertar las preguntas');
               }
            }

            return $this->response->setJSON(['status' => 'success', 'message' => 'Audit and questions created successfully']);
         } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to create the new audit']);
         }
      } catch (\Exception $e) {
         return $this->response->setJSON(['status' => 'error', 'message' => $e->getMessage()]);
      }
   }
   private function getAuditsByDepartment($auditModel)
   {
      return $auditModel->getAuditsByDepartment();
   }

   private function getAuditsByStatus($auditModel)
   {
      return $auditModel->getAuditsByStatus();
   }

   private function getAuditsByShift($auditModel)
   {
      return $auditModel->getAuditsByShift();
   }

   private function getAuditoriasData($auditModel)
   {
      return [
         'total' => $auditModel->countAll(),
         'pendientes' => $auditModel->getPendingAuditsCount(),
         'enProgreso' => $auditModel->getInProgressAuditsCount(),
         'historial' => $auditModel->getAuditHistory()
      ];
   }
   public function getDashboardData()
   {
      $auditModel = new AuditModel();

      // Obtener todos los datos para el dashboard
      $auditsByDepartment = $this->getAuditsByDepartment($auditModel);
      $auditsByStatus = $this->getAuditsByStatus($auditModel);
      $auditsByShift = $this->getAuditsByShift($auditModel);
      $auditoriasData = $this->getAuditoriasData($auditModel);

      // Enviar los datos en formato JSON
      return $this->response->setJSON([
         'status' => 'success',
         'data' => [
            'auditsByDepartment' => $auditsByDepartment,
            'auditsByStatus' => $auditsByStatus,
            'auditsByShift' => $auditsByShift,
            'auditoriasData' => $auditoriasData
         ]
      ]);
   }
}