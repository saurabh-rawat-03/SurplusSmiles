<?php
    session_start();
    include("connect.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/homepage.css">
    <title>Home Page</title>
</head>
<body>

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