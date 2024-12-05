<?php

namespace App\Controllers;

use App\Models\AdminModel;
use App\Models\AuditModel;
use App\Models\AuthModel;
use App\Models\DepartamentModel;
use App\Models\FollowUpModel;
use App\Models\QuestionsModel;
use CodeIgniter\Email\Email;

class SupervisorController extends BaseController
{
    public function finishData()
    {
        $request = $this->request->getJSON();
        if (!$request) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Datos inválidos.']);
        }
    
        $followUpModel = new FollowUpModel();
        $auditModel = new AuditModel();
    
        // Manejar datos de `follow_up`
        if (isset($request->audits) && is_array($request->audits)) {
            foreach ($request->audits as $audit) {
                if (empty($audit->id_action)) {
                    continue; // Saltar registros sin id_action
                }
    
                // Preparar datos para `follow_up`
                $data = [
                    'fk_accions' => $audit->id_action,
                    'follow_up' => $audit->comentario ?? null,
                    'date_response' => $audit->date ?? null,
                    'is_resolved' => isset($audit->mejorado) ? (int)$audit->mejorado : null,
                ];
   
                // Insertar en `follow_up`
                if (!$followUpModel->insert($data)) {
                    return $this->response->setJSON([
                        'status' => 'error',
                        'message' => 'Error al insertar en follow_up.',
                        'details' => $followUpModel->errors(),
                    ]);
                }
            }
        }
    
        // Manejar datos de responsables para `audit`
        if (isset($request->responsables) && is_array($request->responsables)) {
            foreach ($request->responsables as $responsable) {
                if (empty($responsable->id_audit) || empty($responsable->responsable)) {
                    continue; // Saltar registros incompletos
                }
    
                // Preparar datos para actualizar en `audit`
                $auditData = [
                    'reviewed_by' => $responsable->responsable,
                    'review_date' => date('Y-m-d H:i:s'),
                ];
    
                // Verificar si el registro existe antes de actualizar
                if (!$auditModel->find($responsable->id_audit)) {
                    return $this->response->setJSON([
                        'status' => 'error',
                        'message' => 'El registro de auditoría no existe.',
                        'id_audit' => $responsable->id_audit,
                    ]);
                }
    
                // Actualizar `audit`
                if (!$auditModel->update($responsable->id_audit, $auditData)) {
                    return $this->response->setJSON([
                        'status' => 'error',
                        'message' => 'Error al actualizar audit.',
                        'details' => $auditModel->errors(),
                    ]);
                }
            }
        }
    
        return $this->response->setJSON(['status' => 'success', 'message' => 'Datos procesados correctamente.']);
    }
    
    public function showAudit()
    {
        return view("supervisor/show_audit");
    }
    public function auditToReview($idSupervisor)
    {

        $card = new AdminModel();
        $data = $card->GetDataOfAccions($idSupervisor);

        return $this->response->setJSON([
            'status' => 'success',
            'data' => $data
        ]);
    }
    public function accionsOfAudit()
    {
        return view("supervisor/audit_supervisor");
    }
    public function home()
    {
        return view("supervisor/home");
    }
    public function auditForSupervisor()
    {
        // Obtener el parámetro id_audit desde la URL
        $idAudit = $this->request->getGet('id_audit');

        if ($idAudit) {
            $model = new AuditModel();

            // Obtener los datos de la auditoría
            $audit = $model->getDataOfActions($idAudit);

            if ($audit && count($audit) > 0) {
                return $this->response->setJSON([
                    'status' => 'success',
                    'data' => $audit
                ]);
            } else {
                return $this->response->setJSON(['status' => 'error', 'message' => 'Auditoría no encontrada']);
            }
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'ID de auditoría no proporcionado']);
        }
    }
}
