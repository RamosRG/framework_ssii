<?php

namespace App\Controllers;
use App\Models\MachinaryModel;
use App\Models\ShiftModel;
use App\Models\DepartamentModel;

class AccionsController extends BaseController
{
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
}
