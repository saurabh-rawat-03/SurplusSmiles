<?php
include 'connect.php';

$response = []; // Array to hold the response data

if(isset($_POST['signUp'])){
    $nName = $_POST['nName'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password = md5($password);
    $phNum = $_POST['phnum'];
    $address = $_POST['address'];




    $checkEmail = "SELECT * FROM userinfongo where email='$email'";
    $result = $conn->query($checkEmail);

    if ($result->num_rows > 0) {
        $response['status'] = 'error';
        $response['message'] = 'Email already exists';
    } else {
        // Insert new user into the database
        $insertQuery = "INSERT INTO userinfongo (nName, email, password, phNum, address)
                        VALUES ('$nName', '$email', '$password', '$phNum', '$address')";

        if ($conn->query($insertQuery)) {
            $response['status'] = 'success';
            $response['message'] = 'Registration successful! Redirecting to login...';
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Error: ' . $conn->error;
        }
    }
}

if(isset($_POST['signIn'])){
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password = md5($password);

    $sql = "SELECT * FROM userinfongo WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        session_start();
        $row = $result->fetch_assoc();
        $_SESSION['email'] = $row['email'];
        $response['status'] = 'success';
        $response['message'] = 'Login successful';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Invalid Email or Password';
    }
}
// Send the response back to the client as JSON
header('Content-Type: application/json');
echo json_encode($response);
exit();