<?php

namespace App\Controllers;
use App\Models\AuthModel;
use App\Models\AreasModel;

class AuthController extends BaseController
{
    public function forgotPassword(){
        view('forgot_password');
    }
    public function login()
    {
        $session = session();
        $model = new AuthModel();

        // Obtener el email y la contraseña del formulario
        $email = $this->request->getPost('email');
        $password = $this->request->getPost('password');

        $user = $model->authenticate($email, $password);
        
        if ($user) {
            // Si las credenciales son correctas
            $session->set('email', $user['email']);
            return redirect()->to('admin/home');
        } else {
            // Si las credenciales son incorrectas
            echo('credenciales incorrectas');
            return redirect()->back();
        }
        
    }

    public function logout()
    {
        $session = session();
        $session->destroy(); // Destruir la sesión
        return redirect()->to('/'); // Redirigir al formulario de login
    }
    public function getData(){
       
        $model = new AuthModel();
        $data = $model-> getUsers();
        return $this->response->setJSON($data);
    }
    public function getUserById($id) {
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
