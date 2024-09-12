<?php

namespace App\Controllers;
use App\Models\AuthModel;
use App\Models\AreasModel;

class UserController extends BaseController
{
    public function forgotPassword(){
        view('forgot_password');
    }
    
    
}
