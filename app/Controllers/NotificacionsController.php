<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\Email\Email;

class NotificationController extends BaseController
{
    public function sendEmail($to, $subject, $message)
    {
        $email = \Config\Services::email();

        $email->setTo($to);
        $email->setFrom('orlando.ramos@dart.biz', 'Auditoria Por Capas');
        $email->setSubject($subject);
        $email->setMessage($message);

        if ($email->send()) {
            return true; // Correo enviado con éxito
        } else {
            return $email->printDebugger(['headers']); // Muestra errores si falla
        }
    }
}
