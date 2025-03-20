<?php
    session_start(); // Start the session

    // Check if the user is logged in
    if (!isset($_SESSION['email'])) {
        // Redirect to the login page if the user is not logged in
        header("Location: loginRestro.html"); // Adjust the path as needed
        exit();
    }
    
    // Prevent caching of this page
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    include("connect.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/homepage.css">
    <title>Home Page</title>
    
    <link rel="stylesheet" href="../CSS/navBar.css">

    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet"/>
    <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">


</head>
<body>

 
    <header>
        <a href="#" class="logo"><i class="ri-home-3-line"></i><span>Logo</span></a>

        <ul class="navbar">
            <li><a href="#" class="active">Home</a></li>
            <li><a href="./Pages/aboutus.html">About Us</a></li>
            <li><a href="./Pages/contactus.html">Contact Us</a></li>

        </ul>

        <div class="main">
            <li class="dropdown">
                <a href ="#" class="user"><i class="ri-user-3-line"></i>Profile</a>
                <ul class="dropdown-menu">
                    <li><a href="#">My Account</a></li>
                    <li><a href="./donateNow.php">Donate</a></li>
                    <li><a href="./logout.php">Logout</a></li>
                </ul>
            </li>
            <!-- <a href = "#">Register</a> -->
            <div class="bx bx-menu" id="menu-icon"></div>

        </div>
    </header>

    <div class="popup" id="popup">
        <img src="../Assets/tick.png" alt="success">
        <h2>Welcome</h2>
        <p>Login Successful</p>
        <button type="button" class="btn" id="close" onclick="closePopup()">Continue</button>
    </div>

            
    <div style = "text-align:center; padding:15%">
        <p style="font-size:50px; font-weight:bold;">
            Hello <?php 
            if(isset($_SESSION['email'])){
                $email = $_SESSION['email'];
                $query = mysqli_query($conn, "SELECT userinfo.* FROM userinfo WHERE email='$email'" );
                while($row = mysqli_fetch_array($query)){
                    echo $row['rName'];
                }
            }
            ?>
            
        </p>
        <a href ="./donateNow.html">Donate Now</a>
    </div>

    <script>
        let popup = document.getElementById("popup");

        function closePopup(){
            popup.classList.add("open-popup");
            // popup.classList.remove("open-popup");
        }    
    </script>
    
</body>
</html>