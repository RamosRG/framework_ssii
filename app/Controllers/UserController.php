<?php

namespace App\Controllers;

class UserController extends BaseController
{
    public function forgotpassword(){
       return view('user/forgotPassword');
    }
    public function home(){
        return view('user/home');
    }
    
    
}
