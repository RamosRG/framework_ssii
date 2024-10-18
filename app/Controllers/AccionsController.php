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

class AccionsController extends BaseController
{
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
   public function updateStatus($id)
   {
      $model = new QuestionsModel();

      // Obtener el nuevo estado desde el formulario o AJAX
      $status = $this->request->getPost('status');

      // Validamos el status, debe ser 0 o 1
      if ($status != 0 && $status != 1) {
         return $this->response->setJSON(['error' => 'Status inválido']);
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
         'fk_category' => $this->request->getPost('fk_category'), // Asegúrate de que coincida con el formulario
         'question' => $this->request->getPost('question'),
         'create_for' => $this->request->getPost('create_for'),
         'fk_fountain' => $this->request->getPost('fk_fountain') // Asegúrate de que coincida con el formulario
      ];

      try {
         $questionsModel = new QuestionsModel();
         if ($questionsModel->insertQuestion($data)) {
            return $this->response->setJSON(['status' => 'success', 'message' => 'Question created successfully']);
         } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to create the new Question']);
         }
      } catch (\Exception $e) {
         return $this->response->setJSON(['status' => 'error', 'message' => $e->getMessage()]);
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

      // Recoger datos del formulario para crear la auditoría
      $auditData = [
         'audit_title' => $this->request->getPost('name-of-audit'),
         'fk_machinery' => $this->request->getPost('machinery'),
         'fk_shift' => $this->request->getPost('shift'),
         'fk_department' => $this->request->getPost('departament'),
         'fk_auditor' => $this->request->getPost('email'),  // Correctamente capturamos el id del auditor
         'date' => $this->request->getPost('date'),
      ];


      try {
         // Insertar la auditoría y obtener el ID de la auditoría insertada
         $auditModel = new AuditModel();
         $auditId = $auditModel->insertAudit($auditData);

         if ($auditId) {
            // Si la auditoría se ha creado con éxito, ahora inserta las preguntas asociadas

            // Obtener la fecha y el usuario (email) desde el formulario
            $date = $this->request->getPost('date');

            // Procesar preguntas
            $questionsData = [];
            for ($i = 1; $i <= 5; $i++) { // Asumiendo que hay 5 categorías
               for ($j = 0; $j <= 6; $j++) { // Asumiendo que hay 7 preguntas por categoría
                  $questionKey = "question_" . $i . "_" . $j;
                  $sourceKey = "source_" . $i . "_" . $j;

                  $question = $this->request->getPost($questionKey);
                  $source = $this->request->getPost($sourceKey);

                  if ($question) {
                     $questionsData[] = [
                        'fk_audit' => $auditId, // Relaciona la pregunta con la auditoría
                        'fk_category' => $i, // ID de la categoría
                        'question' => $question,
                        'create_at' => $date, // Usa la fecha obtenida
                        'fk_fountain' => $source, // Fuente de la pregunta
                        'create_for' => $this->request->getPost('auditor'),
                        'status' => 1, // Activo
                     ];
                  }
               }
            }

            // Insertar preguntas en la base de datos
            $questionsModel = new QuestionsModel();
            if (!empty($questionsData)) {
               $questionsModel->insertBatch($questionsData); // Inserta todas las preguntas de una vez
            }

            return $this->response->setJSON(['status' => 'success', 'message' => 'Audit and questions created successfully']);
         } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to create the new audit']);
         }
      } catch (\Exception $e) {
         return $this->response->setJSON(['status' => 'error', 'message' => $e->getMessage()]);
      }
   }
}
