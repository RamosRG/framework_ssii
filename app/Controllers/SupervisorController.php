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
print_r($request);
    if (isset($request->audits) && is_array($request->audits)) {
        $followUpModel = new FollowUpModel();

        foreach ($request->audits as $audit) {
            // Verifica si se incluye el ID de la acción
            if (isset($audit->id_action)) {
                // Construye el arreglo de datos excluyendo valores nulos
                $data = array_filter([
                    'answer' => $audit->answer ?? null,
                    'evidence' => $audit->evidence ?? null,
                    'action_description' => $audit->actionDescription ?? null,
                    'evidence_accion' => $audit->evidenceAccion ?? null,
                    'date' => $audit->date ?? null,
                    'mejorado' => $audit->mejorado ?? null,
                    'responsable' => $audit->responsable ?? null
                ], fn($value) => $value !== null);

                // Si hay datos para actualizar
                if (!empty($data)) {
                    // Actualiza el registro existente
                    if (!$followUpModel->update($audit->id_action, $data)) {
                        return $this->response->setJSON([
                            'status' => 'error',
                            'message' => 'Error al actualizar los datos',
                            'details' => $followUpModel->errors()
                        ]);
                    }
                }
            } else {
                return $this->response->setJSON([
                    'status' => 'error',
                    'message' => 'Falta el ID de la acción en una de las auditorías'
                ]);
            }
        }

        return $this->response->setJSON(['status' => 'success', 'message' => 'Datos guardados correctamente']);
    }

    return $this->response->setJSON(['status' => 'error', 'message' => 'No se recibieron datos válidos']);
}



    public function showAudit()
    {
        return view("supervisor/show_audit");
    }
    public function auditToReview($idSupervisor) {
        
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
