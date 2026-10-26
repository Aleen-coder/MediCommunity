
<?php
session_start();

require_once __DIR__ . '/connection.php';

// Always redirect to a page relative to this PHP file.
$loginPage = '../pages/index.html';

function redirectToLogin(string $error): void
{
    global $loginPage;
    header('Location: ' . $loginPage . '?error=' . urlencode($error));
    exit();
}

// Accept only a submitted username and password.
if (
    $_SERVER['REQUEST_METHOD'] !== 'POST' ||
    !isset($_POST['uname'], $_POST['upass']) ||
    !is_string($_POST['uname']) ||
    !is_string($_POST['upass'])
) {
    redirectToLogin('missing_fields');
}

$username = trim($_POST['uname']);
$password = $_POST['upass'];

if ($username === '' || $password === '') {
    redirectToLogin('missing_fields');
}

// Find the user using a prepared statement.
$stmt = mysqli_prepare(
    $con,
    'SELECT id, username, password, role FROM users WHERE username = ? LIMIT 2'
);

if (!$stmt) {
    redirectToLogin('login_failed');
}

mysqli_stmt_bind_param($stmt, 's', $username);

if (!mysqli_stmt_execute($stmt)) {
    mysqli_stmt_close($stmt);
    redirectToLogin('login_failed');
}

$result = mysqli_stmt_get_result($stmt);
$users = mysqli_fetch_all($result, MYSQLI_ASSOC);
mysqli_stmt_close($stmt);

// Do not authenticate ambiguous duplicate usernames.
if (count($users) !== 1) {
    redirectToLogin('invalid_credentials');
}

$user = $users[0];
$storedPassword = $user['password'];

// Check a modern password hash first.
$passwordInfo = password_get_info($storedPassword);
$isHashed = $passwordInfo['algoName'] !== 'unknown';

if ($isHashed) {
    $passwordIsValid = password_verify($password, $storedPassword);
} else {
    // Temporary compatibility with existing plain-text passwords.
    $passwordIsValid = hash_equals($storedPassword, $password);
}

if (!$passwordIsValid) {
    redirectToLogin('invalid_credentials');
}

// Upgrade a plain-text password to a secure hash after successful login.
if (!$isHashed || password_needs_rehash($storedPassword, PASSWORD_DEFAULT)) {
    $newHash = password_hash($password, PASSWORD_DEFAULT);

    if ($newHash === false) {
        redirectToLogin('login_failed');
    }

    $update = mysqli_prepare(
        $con,
        'UPDATE users SET password = ? WHERE username = ? AND password = ?'
    );

    if (!$update) {
        redirectToLogin('login_failed');
    }

    mysqli_stmt_bind_param(
        $update,
        'sss',
        $newHash,
        $username,
        $storedPassword
    );

    if (!mysqli_stmt_execute($update)) {
        mysqli_stmt_close($update);
        redirectToLogin('login_failed');
    }

    mysqli_stmt_close($update);
}

// Prevent session fixation and establish the logged-in session.
session_regenerate_id(true);

$_SESSION['user_id'] = (int) $user['id'];
$_SESSION['username'] = $user['username'];
$_SESSION['role'] = $user['role'];

// Redirect to the MediCommunity homepage after successful login.
header('Location: ../pages/HomePage.HTML');
exit();
