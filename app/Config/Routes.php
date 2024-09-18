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
});

$routes->group('user', ['namespace' => 'App\Controllers'], function($routes) {
    $routes->get('forgotPassword', 'UserController::forgotPassword');

});
$routes->group('accions', ['namespace' => 'App\Controllers'], function($routes) {
    $routes->get('addQuestions', 'AccionsController::addQuestions');
    $routes->get('addAudit', 'AccionsController::addAudit');
    $routes->get('getMachinery', 'AccionsController::getMachinery');
    $routes->get('getShift', 'AccionsController::getShift');
    $routes->get('getDepartament', 'AccionsController::getDepartament');


});

