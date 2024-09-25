<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('auth', ['namespace' => 'App\Controllers'], function($routes) {
    $routes->post('login', 'AuthController::login');
    $routes->get('logout', 'AuthController::logout');
    
    $routes->get('forgotPassword', 'AuthController::forgotPassword');
    $routes->get('getData', 'AuthController::getData');
    $routes->get('getUserById/(:num)', 'AuthController::getUserById/$1');
});


$routes->group('admin', ['namespace' => 'App\Controllers'], function($routes) {
    $routes->get('home', 'AdminController::home');
    $routes->get('create', 'AdminController::create');
    $routes->post('insertData', 'AdminController::insertData');
    $routes->post('update', 'AdminController::update');
    $routes->get('getAreas', 'AdminController::getAreas');
    $routes->delete('delete/(:num)', 'AdminController::delete/$1');
    $routes->get('verify-email/(:any)', 'AdminController::verifyEmail/$1');

});

$routes->group('user', ['namespace' => 'App\Controllers'], function($routes) {
    $routes->get('forgotPassword', 'UserController::forgotPassword');

});
$routes->group('accions', ['namespace' => 'App\Controllers'], function($routes) {
    $routes->get('addquestions', 'AccionsController::addquestions');
    $routes->get('addaudit', 'AccionsController::addaudit');
    $routes->get('getMachinery', 'AccionsController::getMachinery');
    $routes->get('getShift', 'AccionsController::getShift');
    $routes->get('getDepartament', 'AccionsController::getDepartament');
    $routes->post('insertAudit', 'AccionsController::insertAudit');
    $routes->get('showaudit', 'AccionsController::showaudit');
    $routes->get('getAudits', 'AccionsController::getAudits');
    $routes->get('getAuditById/(:num)', 'AccionsController::getAuditById/$1');
    $routes->get('auditdetails', 'AccionsController::auditdetails');


});

