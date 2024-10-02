<?php

namespace App\Controllers;

use App\Models\AuthModel;
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
    }
    public function login()
    {
        $session = session();
        $model = new AuthModel();

        // Obtener el email y la contraseña del formulario
        $email = $this->request->getPost('email');
        $password = $this->request->getPost('password');

        // Autenticar al usuario
        $user = $model->authenticate($email, $password);

        if ($user) {
            // Guardar el email y los privilegios en la sesión
            $session->set([
                'email' => $user['email'],
                'privileges' => $user['privileges'],
                'logged_in' => true
            ]);

            // Redirigir según los privilegios
            if ($user['privileges'] === '1') { // Verificar si es un string
                return $this->response->setJSON([
                    'status' => 'success',
                    'message' => 'Bienvenido Admin',
                    'redirect' => './admin/home'
                ]);
            } else {
                return $this->response->setJSON([
                    'status' => 'success',
                    'message' => 'Bienvenido Usuario',
                    'redirect' => './user/home'
                ]);
            }
        } else {
            // Credenciales incorrectas
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
}
