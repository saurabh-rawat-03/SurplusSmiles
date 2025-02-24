<?php

include 'connect.php';

if(isset($_POST['signUp'])){
    $rName = $_POST['rName'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password = md5($password);
    $phNum = $_POST['phnum'];
    $address = $_POST['address'];
    $gstIn = $_POST['gstIn'];
    $time = $_POST['closeTime'];

    $checkEmail = "SELECT * FROM userinfo where email='$email'";
    $result = $conn->query($checkEmail);
    if($result->num_rows > 0) {
        echo "Email already exists";
    }else{
        $insetQuery = "INSERT INTO userinfo (rName, email, password, phNumber, GST, closeTime, address)
                        VALUES ('$rName', '$email', '$password', '$phNum', '$gstIn', '$time', '$address')";
        
        if($conn->query($insetQuery) == TRUE){
            header("location: loginRestro.html");
        }else{
            echo "Error: ".$conn->error;
        }
    }
}

if(isset($_POST['signIn'])){
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password = md5($password);

    $sql = "SELECT * FROM userinfo WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);
    if($result->num_rows > 0) {
        session_start();
        $row = $result->fetch_assoc();
        $_SESSION['email'] = $row['email'];
        header("location: homepage.php");
        exit();
    }else{
        echo "Invalid Email or Password";
    }
}

?>