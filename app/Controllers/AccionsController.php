<?php

namespace App\Controllers;

use App\Models\MachinaryModel;
use App\Models\ShiftModel;
use App\Models\DepartamentModel;
use App\Models\AuditModel;

class AccionsController extends BaseController
{
   public function auditdetails()
{
    // Cargar la vista de detalles
    return view('accions/audit_details');  
}


   public function getAuditById($id) {
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
