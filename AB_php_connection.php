<?php
// User Table Data
$user_id = "UserID";
$servername= "52.36.239.175";
$username = "Email";
$password = "Password";
$fName = "First Name";
$lName = "Last Name";
$bday = "Birthday";
$pNum = "Phone Number";

// Payment Table Data
$payID="PaymentID";
$trID="TransactionID";
$b_agreement = "Barter Agreement";
$b_status = "Barter Status";
$barter_date = "Barter Date";

// Product Table Data
$pID="ProductID";
$pName="Product Name";
$pImage="Product Image";
$des="Description";

// Transaction Table Data
$trDate ="Transaction Date";
$qu="Quantity";
$tValue="Total Value";

// Customer Review Table Data
$review_ID = "Review ID";
$rating = "Rating";
$comment="Comment";
$review_date="Review Date";

// Create connecton to MySQL db
$con = new mysql($servername, $username, $password, $fName, $lName, $bday, $pNum);

// Check connection to MySQL db
if ($con->connect_error){
        die("Connection failed: " . $con->connect_error);
}