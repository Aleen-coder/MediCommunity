
<?php
session_start();

require_once __DIR__ . '/connection.php';

// Only logged-in patients can book appointments.
if (
    !isset($_SESSION['user_id'], $_SESSION['role']) ||
    $_SESSION['role'] !== 'patient'
) {
    header('Location: ../pages/index.html?error=login_required');
    exit();
}

// Only accept form submissions.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../pages/appointments.html?error=login_required');
   exit();
}

// Validate required fields.
if (
    !isset($_POST['doctor'], $_POST['date'], $_POST['time']) ||
    !is_string($_POST['doctor']) ||
    !is_string($_POST['date']) ||
    !is_string($_POST['time'])
) {
    header('Location: ../pages/appointments.html?error=missing_fields');
    exit();
}

$doctorId = filter_var($_POST['doctor'], FILTER_VALIDATE_INT);
$appointmentDate = $_POST['date'];
$appointmentTime = $_POST['time'];
$patientId = (int) $_SESSION['user_id'];

// Validate doctor ID.
if ($doctorId === false || $doctorId <= 0) {
    header('Location: ../pages/appointments.html?error=invalid_doctor');
    exit();
}

// Validate the date format and reject past dates.
$dateObject = DateTimeImmutable::createFromFormat('!Y-m-d', $appointmentDate);
$dateErrors = DateTimeImmutable::getLastErrors();

if (
    !$dateObject ||
    ($dateErrors !== false &&
        ($dateErrors['warning_count'] > 0 || $dateErrors['error_count'] > 0)) ||
    $dateObject->format('Y-m-d') !== $appointmentDate ||
    $appointmentDate < date('Y-m-d')
) {
    header('Location: ../pages/appointments.html?error=invalid_date');
    exit();
}

// Validate the time format.
$timeObject = DateTimeImmutable::createFromFormat('!H:i', $appointmentTime);
$timeErrors = DateTimeImmutable::getLastErrors();

if (
    !$timeObject ||
    ($timeErrors !== false &&
        ($timeErrors['warning_count'] > 0 || $timeErrors['error_count'] > 0)) ||
    $timeObject->format('H:i') !== $appointmentTime
) {
    header('Location: ../pages/appointments.html?error=invalid_time');
    exit();
}

// Confirm that the selected doctor exists.
$stmt = mysqli_prepare(
    $con,
    'SELECT doctor_id FROM doctors WHERE doctor_id = ? LIMIT 1'
);

if (!$stmt) {
    header('Location: ../pages/appointments.html?error=booking_failed');
    exit();
}

mysqli_stmt_bind_param($stmt, 'i', $doctorId);

if (!mysqli_stmt_execute($stmt)) {
    mysqli_stmt_close($stmt);
    header('Location: ../pages/appointments.html?error=booking_failed');
    exit();
}

$result = mysqli_stmt_get_result($stmt);
$doctorExists = mysqli_fetch_assoc($result);
mysqli_stmt_close($stmt);

if (!$doctorExists) {
    header('Location: ../pages/appointments.html?error=invalid_doctor');
    exit();
}

// Save the appointment. Its status defaults to "pending".
$stmt = mysqli_prepare(
    $con,
    'INSERT INTO appointments (patient_id, doctor_id, `date`, `time`)
     VALUES (?, ?, ?, ?)'
);

if (!$stmt) {
    header('Location: ../pages/appointments.html?error=booking_failed');
    exit();
}

mysqli_stmt_bind_param(
    $stmt,
    'iiss',
    $patientId,
    $doctorId,
    $appointmentDate,
    $appointmentTime
);

if (!mysqli_stmt_execute($stmt)) {
    mysqli_stmt_close($stmt);
    header('Location: ../pages/appointments.html?error=booking_failed');
    exit();
}

mysqli_stmt_close($stmt);

header('Location: ../pages/appointments.html?success=appointment_booked');
exit();
