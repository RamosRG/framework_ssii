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
use CodeIgniter\CLI\Console;

class AccionsController extends BaseController
{
   public function saveAudit() {
      var_dump($_POST);
   }
   public function getQuestionsByCategory()
   {
      $categoryId = $this->request->getPost('category_id'); // Cambiar 'category_id' por 'id_category'

      if (!$categoryId) {
         return $this->response->setJSON([
            'status' => 'error',
            'message' => 'No category ID provided.'
         ]);
      }

      $model = new QuestionsModel();
      $questions = $model->getQuestionsByCategory($categoryId);

      return $this->response->setJSON([
         'status' => 'success',
         'data' => [
            'questions' => $questions
         ]
      ]);
   }
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
      $data = [
         'no_audit' => $this->request->getPost('no_audit'),
         'fk_machinery' => $this->request->getPost('machinery'), // Corregido
         'fk_shift' => $this->request->getPost('shift'), // Corregido
         'date' => $this->request->getPost('date'),
         'fk_departament'  =>  $this->request->getPost('departament'), // Corregido
         'auditor'  => $this->request->getPost('auditor')
      ];

      try {
         $auditModel = new AuditModel();
         if ($auditModel->insertAudit($data)) {
            return $this->response->setJSON(['status' => 'success', 'message' => 'Audit created successfully']);
         } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to create the new audit']);
         }
      } catch (\Exception $e) {
         return $this->response->setJSON(['status' => 'error', 'message' => $e->getMessage()]);
      }
   }
}
