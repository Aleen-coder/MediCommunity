
<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/connection.php';

$sql = "
    SELECT
        d.doctor_id,
        d.full_name,
        d.speciality,
        d.email,
        d.phone_number,
        d.consultation_fee,
        d.image_url,
        dep.name AS department_name
    FROM doctors d
    LEFT JOIN departments dep
        ON d.department_id = dep.department_id
    ORDER BY d.full_name ASC
";

$result = mysqli_query($con, $sql);

if ($result === false) {
    http_response_code(500);

    echo json_encode([
        'error' => 'Unable to load doctors.'
    ]);

    exit();
}

$doctors = [];

while ($row = mysqli_fetch_assoc($result)) {
    $doctors[] = $row;
}

echo json_encode($doctors);

mysqli_free_result($result);
?>
