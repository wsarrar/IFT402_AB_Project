<?php
$host="ls-5a1a450da9b72ee816d64ca751459a1171836a83.c9iwyumu4w7q.us-west-2.rds.amazonaws.com";
$port=3306;
$socket="";
$user="dbmasteruser";
$password="";
$dbname="newab";

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
	or die ('Could not connect to the database server' . mysqli_connect_error());

//$con->close();

// Escape user inputs for security to prevent SQL injection
$firstName = mysqli_real_escape_string($conn, $_POST['firstName']);
$lastName = mysqli_real_escape_string($conn, $_POST['lastName']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$bday = mysqli_real_escape_string($conn, $_POST['bday']);
$password = mysqli_real_escape_string($conn, $_POST['password']); // Encrypt this password before storing in a real application
$phoneNumber = mysqli_real_escape_string($conn, $_POST['phoneNumber']);

// SQL query to insert user data into the 'users' table
$sql = "INSERT INTO users (firstName, lastName, email, birthday, password, phoneNumber) VALUES ('$firstName', '$lastName', '$email', '$bday', '$password', '$phoneNumber')";

// Execute the query and check for success
if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close connection
$conn->close();
?>
