<?php

namespace App\Controllers;

use App\Models\AuthModel;
use App\Models\DepartamentModel;
use CodeIgniter\Email\Email;

class AuthController extends BaseController
{


    public function getPrivileges()
    {
        $session = session();
        $email = $session->get('email'); // Obtener el email del usuario actual
        $privilegesModel = new AuthModel();

        // Buscar el usuario actual por su email
        $user = $privilegesModel->where('email', $email)->first();

        if ($user) {
            return $this->response->setJSON([
                'status' => 'success',
                'privileges' => $user['privileges'] // Solo devolvemos los privilegios
            ]);
        } else {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Usuario no encontrado'
            ]);
        }
    }public function login()
    {
        $session = session();
        $model = new AuthModel();
    
        // Obtener el email y la contraseña del formulario
        $email = $this->request->getPost('email');
        $password = $this->request->getPost('password');
    
        // Autenticar al usuario
        $user = $model->authenticate($email, $password);
        if ($user) {
            // Guardar datos del usuario en la sesión
            $session->set([
                'email' => $user['email'],
                'fk_role' => $user['fk_role'],
                'username' => $user['name'],
                'id_user' => $user['id_user'],
                'logged_in' => true
            ]);
    
            // Determinar la URL de redirección según el rol
            $redirectUrl = $session->get('redirect_url') 
                ?? ($user['fk_role'] === '1' ? './manager/home' 
                : ($user['fk_role'] === '2' ? './supervisor/home' 
                : ($user['fk_role'] === '3' ? './user/home' 
                : ($user['fk_role'] === '4' ? './accions/dashboard' : './default/home'))));
            
            $session->remove('redirect_url'); // Limpiar la URL de redirección de la sesión
    
            // Si la solicitud es AJAX, responde con JSON
            if ($this->request->isAJAX()) {
                return $this->response->setJSON([
                    'status' => 'success',
                    'username' => $user['name'],
                    'id_user' => $user['id_user'],
                    'redirect' => $redirectUrl
                ]);
            }
    
            // Redirigir para solicitudes normales (no AJAX)
            return redirect()->to($redirectUrl);
        } else {
            // Responder con error si las credenciales son incorrectas
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'CREDENCIALES INCORRECTAS'
            ]);
        }
    }
    
    

    public function logout()
    {
        $session = session();
        $session->destroy(); // Destruir la sesión
        return redirect()->to('/'); // Redirigir al formulario de login
    }
    public function getData()
    {

        $model = new AuthModel();
        $data = $model->getUsers();
        return $this->response->setJSON($data);
    }
    public function getUserById($id)
    {
        $model = new AuthModel();

        // Obtener los datos del usuario
        $user = $model->getUsersByNumbre($id);

        if ($user) {
            return $this->response->setJSON($user[0]); // Devolver solo el primer usuario, si es un array
        } else {
            return $this->response->setJSON(['error' => 'Usuario no encontrado']);
        }
    }
    public function getDepartmentsByArea($areaId)
{
    $model = new DepartamentModel();
    $departments = $model->where('fk_area', $areaId)->findAll();

    return $this->response->setJSON($departments);
}
public function getAreaByDepartment($areaId)
{
    $model = new DepartamentModel();
    $departments = $model->where('fk_area', $areaId)->findAll();

    return $this->response->setJSON($departments);
}

}
