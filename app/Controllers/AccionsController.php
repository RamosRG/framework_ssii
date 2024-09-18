<?php

namespace App\Controllers;

use App\Models\MachinaryModel;
use App\Models\ShiftModel;
use App\Models\DepartamentModel;
use App\Models\AuditModel;
use App\Models\AuditModelModel;

class AccionsController extends BaseController
{
   public function showAudit()
   {
      echo ('Hola desde show audits');
   }

   public function addQuestions()
   {
      return view('accions/add_questions');
   }
   public function addAudit()
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
