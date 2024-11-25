<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('auth', ['namespace' => 'App\Controllers'], function($routes) {
    $routes->post('login', 'AuthController::login');
    $routes->get('logout', 'AuthController::logout');
    $routes->get('getPrivileges', 'AuthController::getPrivileges');
    
    $routes->get('forgotPassword', 'AuthController::forgotPassword');
    $routes->get('getData', 'AuthController::getData');
    $routes->get('getUserById/(:num)', 'AuthController::getUserById/$1');
    $routes->get('getDepartmentsByArea/(:num)', 'AuthController::getDepartmentsByArea/$1');
    $routes->get('getAreaByDepartment/(:num)', 'AuthController::getAreaByDepartment/$1');
});


$routes->group('admin', ['namespace' => 'App\Controllers', 'filter' => 'auth'], function($routes) {
    $routes->get('home', 'AdminController::home');
    $routes->get('create', 'AdminController::create');
    $routes->post('insertData', 'AdminController::insertData');
    $routes->post('update', 'AdminController::update');
    $routes->get('getAreas', 'AdminController::getAreas');
    $routes->get('getUsers', 'AdminController::getUsers');
    $routes->delete('delete/(:num)', 'AdminController::delete/$1');
    $routes->get('verify/(:any)', 'AdminController::verify/$1');
});


$routes->group('user', ['namespace' => 'App\Controllers', 'filter' => 'auth'], function($routes) {
    $routes->get('forgotpassword', 'UserController::forgotpassword');
    $routes->get('home', 'UserController::home');
    $routes->get('Assignedaudit', 'UserController::Assignedaudit');
    $routes->get('auditDetails/(:num)', 'UserController::auditDetails/$1');
    $routes->get('showAudit', 'UserController::showAudit');
    $routes->get('takenActions/(:num)', 'UserController::takenActions/$1');
    $routes->post('uploadPhoto', 'UserController::uploadPhoto');
    $routes->get('createQuestion', 'UserController::createQuestion');
    $routes->get('getCategory', 'UserController::getCategory');
    $routes->get('getFountain', 'UserController::getFountain');
    $routes->post('submitAnswer', 'UserController::submitAnswer');
    $routes->post('savedAudit', 'UserController::savedAudit');
    $routes->post('submitAuditComment', 'UserController::submitAuditComment');
    
    
});


$routes->group('accions', ['namespace' => 'App\Controllers', 'filter' => 'auth'], function($routes) {
    $routes->get('getVerificaciones/(:num)', 'AccionsController::getVerificaciones/$1');
    $routes->get('getRole', 'AccionsController::getRole');
    $routes->get('getAll', 'AccionsController::getAllActions');
    $routes->get('ShowFinishedAudit', 'AccionsController::ShowFinishedAudit');
    $routes->get('getAuditsFinished', 'AccionsController::getAuditsFinished');
    $routes->get('AuditToEdit', 'AccionsController::AuditToEdit');
    $routes->get('addquestions', 'AccionsController::addquestions');
    $routes->get('getAuditToEdit', 'AccionsController::getAuditToEdit');
    $routes->get('showAuditsToEdit', 'AccionsController::showAuditsToEdit');
    $routes->get('getDashboardData', 'AccionsController::getDashboardData');
    $routes->get('dashboard', 'AccionsController::dashboard');
    $routes->get('addaudit', 'AccionsController::addaudit');
    $routes->get('getMachinery', 'AccionsController::getMachinery');
    $routes->get('getShift', 'AccionsController::getShift');
    $routes->get('getDepartament', 'AccionsController::getDepartament');
    $routes->get('getCategory', 'AccionsController::getCategory');
    $routes->get('getSource', 'AccionsController::getSource');
    $routes->post('insertAudit', 'AccionsController::insertAudit');
    $routes->get('showaudit', 'AccionsController::showaudit');
    $routes->get('getAudits', 'AccionsController::getAudits');
    $routes->get('getUser', 'AccionsController::getUser');
    $routes->get('getAuditById/(:num)', 'AccionsController::getAuditById/$1');
    $routes->get('auditdetails', 'AccionsController::auditdetails');
    $routes->post('insertQuestions', 'AccionsController::insertQuestions');
    $routes->get('showquestions', 'AccionsController::showquestions');
    $routes->get('showQuestion', 'AccionsController::showQuestion');
    $routes->get('getArea', 'AccionsController::getArea');
    $routes->post('getQuestionsByCategory', 'AccionsController::getQuestionsByCategory');
    $routes->post('updateStatus', 'AccionsController::updateStatus');
    $routes->get('getAudit/(:num)', 'AccionsController::getAudit/$1');
    $routes->get('getAuditOfEdit/(:num)', 'AccionsController::getAuditOfEdit/$1');
    $routes->get('auditForUsers/(:num)', 'AccionsController::auditForUsers/$1');
    $routes->get('getDepartamentById/(:num)', 'AccionsController::getDepartamentById/$1');
    $routes->post('editAudit', 'AccionsController::editAudit');

});


$routes->group('supervisor', ['namespace' => 'App\Controllers', 'filter' => 'auth'], function($routes) {

    $routes->get('auditToReview/(:num)', 'SupervisorController::auditToReview/$1');
    $routes->get('accionsOfAudit', 'SupervisorController::accionsOfAudit');
    $routes->get('home', 'SupervisorController::home');
    $routes->get('showActiveAudit', 'SupervisorController::showActiveAudit');
    $routes->get('auditForSupervisor', 'SupervisorController::auditForSupervisor');
    $routes->get('showAudit', 'SupervisorController::showAudit');
    $routes->post('finishData', 'SupervisorController::finishData');
    
    
});