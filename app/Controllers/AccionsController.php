<?php

namespace App\Controllers;

class AccionsController extends BaseController
{
    public function addQuestions(){
       return view('accions/add_questions');
    }
    
    public function addAudit(){
       return view('accions/add_audit');
        
        }
}
