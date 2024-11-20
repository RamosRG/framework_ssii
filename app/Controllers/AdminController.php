<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use App\Models\AdminModel;
use App\Models\AreasModel;
use App\Models\AuthModel;

class AdminController extends Controller
{
    public function getUsers()
    {
        $adminModel = new AdminModel();
        $data = $adminModel->findAll(); // Obtén todas las áreas

        return $this->response->setJSON([
            'status' => 'success',
            'user' => $data
        ]);
    }
    public function addQuestion()
    {
        return view('accions/add_question');
    }
    //funcion pora obtener las areas
    public function getAreas()
    {
        $areaModel = new AreasModel();
        $data = $areaModel->findAll(); // Obtén todas las áreas

        return $this->response->setJSON([
            'status' => 'success',
            'areas' => $data
        ]);
    }
    //cargar la vista de Home
    public function home()
    {
        return view('admin/home');
    }
    public function create()
    {
        $areaModel = new AreasModel();
        $data['area'] = $areaModel->getArea();
        return view('admin/create', $data);
    }
    //Funcion para insertar un usuario dentro del controlador
    public function insertData()
    {
     
        helper('text'); // Para generar una cadena aleatoria
        $token = bin2hex(random_bytes(32)); // Genera un token único para la verificación
    
        // Recolectar los datos del formulario
        $email = $this->request->getPost('email'); // Obtenemos el email de la solicitud
        $data = [
            'email' => $email,
            'name' => $this->request->getPost('name'),
            'firstName' => $this->request->getPost('firstName'),
            'lastName' => $this->request->getPost('lastName'),
            'password' => password_hash($this->request->getPost('password'), PASSWORD_DEFAULT),
            'fk_department' => $this->request->getPost('department'),
            'fk_role' => $this->request->getPost('role'),
        ];
        $adminModel = new AdminModel();
        
        // Verificar si el correo ya existe
        if ($adminModel->isEmailExist($email)) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'El correo electrónico ya está asociado.']);
        }
    
        // Intentar insertar el nuevo usuario
        if ($adminModel->insertUser($data)) {
            // Enviar correo de verificación
            return $this->response->setJSON(['status' => 'success', 'message' => 'Usuario creado con éxito. Verifica tu correo para la verificación.']);
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Error al crear el nuevo usuario.']);
        }
    }
    
    //Funcion para actualizar un usuario dentro del controlador
    public function update()
    {
        // Carga del modelo
        $userModel = new AdminModel();

        // Validación de los datos recibidos
        $id = $this->request->getPost('id_user'); // Se asegura que el ID venga del formulario
        $data = [
            'email'      => $this->request->getPost('email'),
            'name'       => $this->request->getPost('name'),
            'firstName'  => $this->request->getPost('firstName'),
            'lastName'   => $this->request->getPost('lastName'),
            'status'     => $this->request->getPost('status'),
            'fk_department'       => $this->request->getPost('department'),
            'created_at' => $this->request->getPost('created_at'),
            'updated_at' => $this->request->getPost('updated_at')
        ];
        
        //Funcion para eliminar un usuario dentro del controlador
        // me debo de asegúrate de que el ID esté presente
        if (!empty($id)) {
            if ($userModel->updatedById($id, $data)) {
                return $this->response->setJSON(['status' => 'success', 'message' => 'User updated successfully']);
            } else {
                return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to update user']);
            }
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'User ID is required']);
        }
    }

}
