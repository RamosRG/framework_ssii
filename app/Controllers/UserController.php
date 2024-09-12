<?php

namespace App\Controllers;

class UserController extends BaseController
{
    public function forgotPassword(){
       return view('user/forgotPassword');
    }
    
    
}
