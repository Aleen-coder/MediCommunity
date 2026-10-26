
<?php
session_start();

require_once __DIR__ . '/connection.php';

function redirectToSignup(string $error): void
{
    header('Location: ../pages/signup.html?error=' . urlencode($error));
    exit();
}

// Accept only POST requests.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirectToSignup('invalid_request');
}

// Validate the submitted fields.
if (
    !isset($_POST['uname'], $_POST['email'], $_POST['upass']) ||
    !is_string($_POST['uname']) ||
    !is_string($_POST['email']) ||
    !is_string($_POST['upass'])
) {
    redirectToSignup('missing_fields');
}

$username = trim($_POST['uname']);
$email = trim($_POST['email']);
$password = $_POST['upass'];

// Basic validation.
if ($username === '' || $email === '' || $password === '') {
    redirectToSignup('missing_fields');
}

if (strlen($username) > 50) {
    redirectToSignup('username_too_long');
}

if (strlen($email) > 100 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    redirectToSignup('invalid_email');
}

if (strlen($password) < 8) {
    redirectToSignup('weak_password');
}

// Check whether the username or email is already registered.
$stmt = mysqli_prepare(
    $con,
    'SELECT id FROM users WHERE username = ? OR email = ? LIMIT 1'
);

if (!$stmt) {
    redirectToSignup('signup_failed');
}

mysqli_stmt_bind_param($stmt, 'ss', $username, $email);

if (!mysqli_stmt_execute($stmt)) {
    mysqli_stmt_close($stmt);
    redirectToSignup('signup_failed');
}

$result = mysqli_stmt_get_result($stmt);
$existingUser = mysqli_fetch_assoc($result);
mysqli_stmt_close($stmt);

if ($existingUser) {
    redirectToSignup('account_exists');
}

// Never store a new user's password as plain text.
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

if ($hashedPassword === false) {
    redirectToSignup('signup_failed');
}

// Public registration must not allow users to choose doctor/admin roles.
$role = 'patient';

$stmt = mysqli_prepare(
    $con,
    'INSERT INTO users (username, email, password, role)
     VALUES (?, ?, ?, ?)'
);

if (!$stmt) {
    redirectToSignup('signup_failed');
}

mysqli_stmt_bind_param(
    $stmt,
    'ssss',
    $username,
    $email,
    $hashedPassword,
    $role
);

if (!mysqli_stmt_execute($stmt)) {
    $errorNumber = mysqli_stmt_errno($stmt);
    mysqli_stmt_close($stmt);

    // Handle a duplicate username/email if another request registered
    // the same value between our initial check and the insert.
    if ($errorNumber === 1062) {
        redirectToSignup('account_exists');
    }

    redirectToSignup('signup_failed');
}

mysqli_stmt_close($stmt);

// Send the user to the login page after successful registration.
header('Location: ../pages/index.html?success=signup');
exit();
