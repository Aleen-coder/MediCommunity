<?php
include 'connection.php';
$query = "SELECT * FROM users";
$result = mysqli_query($con, $query);
$r = mysqli_num_rows($result);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Table</title>
    <style>
        .btn-aqua {
            display: inline-block;
            padding: 10px 20px;
            border: 2px solid aqua;
            border-radius: 25px;
            background-color: transparent;
            color: aqua;
            font-size: 16px;
            font-weight: bold;
            text-decoration: none;
            text-align: center;
            transition: background-color 0.3s, color 0.3s;
        }

        .btn-aqua:hover {
            background-color: aqua;
            color: #2D343C; /* dark background for contrast */
        }

        table {
            color: white;
            border-collapse: collapse;
            width: 60%;
            margin-top: 30px;
        }

        th, td {
            border: 1px solid aqua;
            padding: 10px;
            text-align: center;
        }

        body {
            background-color: #2D343C;
            font-family: 'Poppins', sans-serif;
            padding: 20px;
        }

        input[type="text"] {
            padding: 6px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
    </style>
</head>
<body>

    <table>
        <tr>
            <th>Username</th>
            <th>Password</th>
        </tr>

        <?php
        for ($i = 0; $i < $r; $i++) {
            $fetched_row = mysqli_fetch_assoc($result);
            $username = $fetched_row['username'];
            $password = $fetched_row['password'];

            echo "<tr>
                    <td><input type='text' name='username[]' value='$username'></td>
                    <td><input type='text' name='password[]' value='$password'></td>
                </tr>";
        }
        ?>
    </table>

    <br><br>

    <!-- Aqua button linking to HomePage.html -->
    <a href="HomePage.html" class="btn-aqua">Go to Home Page</a>

</body>
</html>
