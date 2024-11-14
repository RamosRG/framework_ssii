<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AuditoriaCapas extends Migration
{
    public function up()
    {
        // Tabla 'accions'
        $this->forge->addField([
            'id_accions'          => ['type' => 'INT', 'auto_increment' => true],
            'fk_answer'           => ['type' => 'INT', 'null' => true],
            'accions'             => ['type' => 'VARCHAR', 'constraint' => '255', 'null' => true],
            'created_at'           => ['type' => 'TIMESTAMP', 'null' => true],
            'update_at'           => ['type' => 'TIMESTAMP', 'null' => true],
        ]);
        $this->forge->addKey('id_accions', true);
        $this->forge->addForeignKey('fk_answer', 'answer', 'id_answer', 'CASCADE', 'SET NULL');
        $this->forge->createTable('accions');

        // Tabla 'answer'
        $this->forge->addField([
            'id_answer'           => ['type' => 'INT', 'auto_increment' => true],
            'fk_question'         => ['type' => 'INT', 'null' => true],
            'answer'              => ['type' => 'VARCHAR', 'constraint' => '200', 'default' => ''],
            'observation'         => ['type' => 'VARCHAR', 'constraint' => '200', 'default' => ''],
            'evidence'            => ['type' => 'VARCHAR', 'constraint' => '200', 'default' => ''],
            'created_at'           => ['type' => 'TIMESTAMP', 'null' => true],
            'updated_at'           => ['type' => 'TIMESTAMP', 'null' => true],
        ]);
        $this->forge->addKey('id_answer', true);
        $this->forge->addForeignKey('fk_question', 'questions', 'id_question', 'CASCADE', 'SET NULL');
        $this->forge->createTable('answer');

        // Tabla 'area'
        $this->forge->addField([
            'id_area'             => ['type' => 'INT', 'auto_increment' => true],
            'area'                => ['type' => 'VARCHAR', 'constraint' => '50', 'default' => ''],
            'status'              => ['type' => 'INT', 'default' => 1],
            'created_at'           => ['type' => 'TIMESTAMP', 'null' => true],
            'updated_at'           => ['type' => 'TIMESTAMP', 'null' => true],
        ]);
        $this->forge->addKey('id_area', true);
        $this->forge->createTable('area');

        // Tabla 'audit'
        $this->forge->addField([
            'id_audit'            => ['type' => 'INT', 'auto_increment' => true],
            'no_audit'            => ['type' => 'INT', 'null' => false],
            'fk_machinery'        => ['type' => 'INT', 'null' => false],
            'fk_shift'            => ['type' => 'INT', 'null' => false],
            'date'                => ['type' => 'DATE', 'null' => false],
            'fk_departament'      => ['type' => 'INT', 'null' => false],
            'auditor'             => ['type' => 'VARCHAR', 'constraint' => '50', 'null' => false],
            'reviewed_by'         => ['type' => 'VARCHAR', 'constraint' => '50', 'null' => false],
            'date_reviewed'       => ['type' => 'DATETIME', 'null' => false],
            'fk_user'             => ['type' => 'INT', 'null' => false],
            'created_at'           => ['type' => 'TIMESTAMP', 'null' => true],
            'update_at'           => ['type' => 'TIMESTAMP', 'null' => true],
        ]);
        $this->forge->addKey('id_audit', true);
        $this->forge->addForeignKey('fk_departament', 'departament', 'id_departament', 'CASCADE', 'SET NULL');
        $this->forge->addForeignKey('fk_machinery', 'machinery', 'id_machinery', 'CASCADE', 'SET NULL');
        $this->forge->addForeignKey('fk_shift', 'shift', 'id_shift', 'CASCADE', 'SET NULL');
        $this->forge->addForeignKey('fk_user', 'users', 'id_user', 'CASCADE', 'SET NULL');
        $this->forge->createTable('audit');

        // Tabla 'category'
        $this->forge->addField([
            'id_category'         => ['type' => 'INT', 'auto_increment' => true],
            'category'            => ['type' => 'VARCHAR', 'constraint' => '50', 'default' => ''],
            'status'              => ['type' => 'TINYINT', 'default' => 1],
            'created_at'           => ['type' => 'TIMESTAMP', 'null' => true],
            'update_at'           => ['type' => 'TIMESTAMP', 'null' => true],
        ]);
        $this->forge->addKey('id_category', true);
        $this->forge->createTable('category');

        // Tabla 'departament'
        $this->forge->addField([
            'id_departament'      => ['type' => 'INT', 'auto_increment' => true],
            'departament'         => ['type' => 'VARCHAR', 'constraint' => '50', 'default' => ''],
            'status'              => ['type' => 'TINYINT', 'null' => true],
            'created_at'           => ['type' => 'TIMESTAMP', 'null' => true],
            'update_at'           => ['type' => 'TIMESTAMP', 'null' => true],
        ]);
        $this->forge->addKey('id_departament', true);
        $this->forge->createTable('departament');

        // Tabla 'follow-up'
        $this->forge->addField([
            'id_follow-up'        => ['type' => 'INT', 'auto_increment' => true],
            'fk_accion'           => ['type' => 'INT', 'null' => true],
            'follow-up'           => ['type' => 'VARCHAR', 'constraint' => '200', 'default' => ''],
            'description'         => ['type' => 'VARCHAR', 'constraint' => '200', 'default' => ''],
            'implementation'      => ['type' => 'VARCHAR', 'constraint' => '200', 'default' => ''],
            'improved'            => ['type' => 'VARCHAR', 'constraint' => '200', 'default' => ''],
            'evidence'            => ['type' => 'VARCHAR', 'constraint' => '150', 'null' => true],
            'created_at'           => ['type' => 'TIMESTAMP', 'null' => true],
            'update_at'           => ['type' => 'TIMESTAMP', 'null' => true],
        ]);
        $this->forge->addKey('id_follow-up', true);
        $this->forge->addForeignKey('fk_accion', 'accions', 'id_accions', 'CASCADE', 'SET NULL');
        $this->forge->createTable('follow-up');

        // Tabla 'machinery'
        $this->forge->addField([
            'id_machinery'        => ['type' => 'INT', 'auto_increment' => true],
            'imachinery'          => ['type' => 'VARCHAR', 'constraint' => '150', 'default' => ''],
            'created_at'           => ['type' => 'TIMESTAMP', 'null' => false],
            'update_ad'           => ['type' => 'TIMESTAMP', 'null' => false],
        ]);
        $this->forge->addKey('id_machinery', true);
        $this->forge->createTable('machinery');

        // Tabla 'questions'
        $this->forge->addField([
            'id_question'         => ['type' => 'INT', 'auto_increment' => true],
            'fk_category'         => ['type' => 'INT', 'null' => true],
            'fk_auditoria'        => ['type' => 'INT', 'null' => true],
            'question'            => ['type' => 'VARCHAR', 'constraint' => '200', 'null' => true],
            'status'              => ['type' => 'TINYINT', 'null' => true],
            'created_at'           => ['type' => 'TIMESTAMP', 'null' => true],
            'update_at'           => ['type' => 'TIMESTAMP', 'null' => true],
            'create_for'          => ['type' => 'TIMESTAMP', 'null' => true],
            'fk_fountain'         => ['type' => 'INT', 'null' => true],
        ]);
        $this->forge->addKey('id_question', true);
        $this->forge->addForeignKey('fk_category', 'category', 'id_category', 'CASCADE', 'SET NULL');
        $this->forge->addForeignKey('fk_auditoria', 'audit', 'id_audit', 'CASCADE', 'SET NULL');
        $this->forge->createTable('questions');

        // Tabla 'shift'
        $this->forge->addField([
            'id_shift'            => ['type' => 'INT', 'auto_increment' => true],
            'shift'               => ['type' => 'VARCHAR', 'constraint' => '50', 'default' => ''],
            'created_at'           => ['type' => 'TIMESTAMP', 'null' => false],
            'update_ad'           => ['type' => 'TIMESTAMP', 'null' => false],
        ]);
        $this->forge->addKey('id_shift', true);
        $this->forge->createTable('shift');
    }

    public function down()
    {
        $this->forge->dropTable('accions');
        $this->forge->dropTable('answer');
        $this->forge->dropTable('area');
        $this->forge->dropTable('audit');
        $this->forge->dropTable('category');
        $this->forge->dropTable('departament');
        $this->forge->dropTable('follow-up');
        $this->forge->dropTable('machinery');
        $this->forge->dropTable('questions');
        $this->forge->dropTable('shift');
    }
}
