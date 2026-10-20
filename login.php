<?php
require_once 'connection.php';
if(isset($_POST['uname']) && $_POST['uname']!=""
        && isset($_POST['upass']) && $_POST['upass']!="")   
{
    $user=$_POST['uname'];
    $pass=$_POST['upass'];
    
    $query="Select * From users where username='$user' and password='$pass'";
    
    $res= mysqli_query($con, $query);
    
    $nbrows= mysqli_num_rows($res);
    if($nbrows== 0)
    {
         header("Location: login.html?error=invalid_credentials");// Add an error parameter for feedback
    }
    else if($nbrows==1) {
       
        header("Location:main.php"); exit(); // Always exit after header redirection
   }
    else {
        // More than one user with same credentials - a data integrity issue
        header("Location:index.html?error=multiple_users_found");
        exit();
    }
}
?>