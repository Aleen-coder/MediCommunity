<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../connection.php';

$sql = "SELECT d.doctor_id, d.full_name, d.speciality, d.email, d.phone_number,
               d.consultation_fee, d.image_url, dep.name AS department_name
        FROM doctors d
        JOIN departments dep ON d.department_id = dep.department_id";

$result = mysqli_query($con, $sql);

$doctors = [];
while ($row = mysqli_fetch_assoc($result)) {
    $doctors[] = $row;
}

echo json_encode($doctors);
?>
