
<?php
session_start();

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

echo json_encode([
    'authenticated' => isset($_SESSION['user_id'], $_SESSION['role'])
]);
