<?php

use Daycry\CronJob\Scheduler;

$scheduler = new Scheduler();

$scheduler->command('my_job', 'app/Commands/MyJob.php')
    ->hourly(); // Run every hour