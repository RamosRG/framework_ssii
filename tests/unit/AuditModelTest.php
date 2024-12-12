<?php
namespace Tests\Unit;

use CodeIgniter\Test\CIUnitTestCase;
use App\Models\AuditModel;

class AuditModelTest extends CIUnitTestCase
{
    protected $auditModel;

    protected function setUp(): void
    {
        parent::setUp();
        $this->auditModel = new AuditModel();
    }

    public function testInsertAudit()
    {
        $data = [
            'no_audit'     => 50,
            'date'         => '2024-12-01',
            'audit_title'  => 'Test Audit',
            'fk_auditor'   => 8,
            'fk_department'=> 38,
            'fk_shift'=> 3,
            'fk_machinery'=> 1,
            'fk_status'    => 1,
        ];

        $this->assertTrue($this->auditModel->insert($data) > 0);
    }

    public function testFetchAudits()
    {
        $result = $this->auditModel->findAll();
        $this->assertIsArray($result);
    }
}
