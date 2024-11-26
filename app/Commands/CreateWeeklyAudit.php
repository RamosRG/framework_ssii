<?php
namespace App\Commands;

use App\Controllers\AccionsController;
use CodeIgniter\CLI\BaseCommand;
use CodeIgniter\CLI\CLI;
use App\Models\AuditModel;

class CreateWeeklyAudit extends BaseCommand
{
    protected $group       = 'Auditoría';
    protected $name        = 'audit:create-weekly';
    protected $description = 'Crea auditorías semanales duplicando la última terminada.';

    public function run(array $params)
    {
        $auditModel = new AccionsController;
        try {
            $response = $auditModel->createWeeklyAudit();
            CLI::write(json_encode($response), 'green');
        } catch (\Exception $e) {
            CLI::error($e->getMessage());
        }
    }
}

