<?php
require_once 'connection.php';
if(isset($_POST['uname']) && $_POST['uname']!=""
        && isset($_POST['upass']) && $_POST['upass']!="")   
{
    $user=$_POST['uname'];
    $pass=$_POST['upass'];
      
    $query=  "INSERT INTO users (username, password) VALUES ('$user', '$pass')";
        $res= mysqli_query($con, $query);
          if ($res) {
        echo "Signup successful!";
        
// Show "Return to Login" button in both cases
    echo '<br><br><a href="index.html"><button>Return to Login Page</button></a>';
    } else {
        echo "Eihter your username or password is incorrect " . mysqli_error($con);
         echo '<br><br><a href="signup.html"><button>Return to Login Page</button></a>';
    }


  
}
?>