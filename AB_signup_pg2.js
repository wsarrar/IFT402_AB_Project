let error = 0;

const popup = document.getElementById("popup");
const close = document.getElementsByClassName("close")[0];
const p = document.getElementById("data").querySelector("p");
close.addEventListener("click",()=>{
  popup.style.display="none";
})

const validate=(event)=>{
  error=0;
  const First_Name = document.getElementById("fName").value;
  const Last_Name = document.getElementById("lName").value;
  const Email = document.getElementById("email").value;
  const Birthday = document.getElementById("bday").value;
  const Password = document.getElementById("password").value;
  const Phone_Number = document.getElementById("pNum").value;
}

const showError = (id,msg) => {
    error=1;
    let Id = document.getElementById(id);
    Id.textContent = msg;
    let input = Id.parentElement.querySelector("input");
    let select = Id.parentElement.querySelector("select");
    input?input.style.border="3px solid #f58d8d":null;
    select?select.style.border="3px solid #f58d8d":null;
}

const removeError = (id) => {
    let Id = document.getElementById(id);
    Id.textContent = '';
    let input = Id.parentElement.querySelector("input")
    input?input.style.border="3px solid #66CDA0":null;
    let select = Id.parentElement.querySelector("select");
    select?select.style.border="3px solid #66CDA0":null;
}

// First Name Validation
const fNameRegx = /^[A-Za-z ]+$/;
if(!First_Name.match(fNameRegx)){
  showError("nameErr","First Name should only contain alphabets");
}
else{
  removeError("nameErr")
}

// Last Name Validation
const lNameRegx = /^[A-Za-z ]+$/;
if(!Last_Name.match(lNameRegx)){
  showError("nameErr","Last Name should only contain alphabets");
}
else{
  removeError("nameErr")
}

// Email Vlidation
const emailRegx=/^\\S+@\\S+\\.\\S+$/;
if(!email.match(emailRegx)){
  showError("emailErr","please enter a valid email");
}
else{
  removeError("emailErr")
}

// Birthday Validation
const birthday = document.getElementById("birthday").value;
const birthdayRegx = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\\d\\d$/;

if (!birthday.match(birthdayRegx)) {
  showError("birthdayErr", "Please enter a valid birthdate in the format MM/DD/YYYY");
} 

else {
  const dateParts = birthday.split("/");
  const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

  if (dateObject > new Date()) {
    showError("birthdayErr", "Birthday cannot be in the future");
  } 
  
  else {
    removeError("birthdayErr");
  }
}

// Password Validation
const passwordCapRegx = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

document.getElementById('password').addEventListener('input', function() {
  let error = 0;
  const Password = document.getElementById('password').value;
  const ConfirmPassword = document.getElementById('confirmPassword').value;
  const First_Name = document.getElementById('fName').value;
  const Last_Name = document.getElementById('lName').value;

  if (!Password.match(passwordCapRegx)) {
    showError("passwordErr", "At least 8 characters, 1 number & 1 capital letter is required");
    error++;
  } else if (Password.search(First_Name) >= 0) {
    showError("passwordErr", "Password should not contain First Name");
    error++;
  } else if (Password.search(Last_Name) >= 0) {
    showError("passwordErr", "Password should not contain Last Name");
    error++;
  } else {
    removeError("passwordErr");
  }

  if (Password !== ConfirmPassword) {
    showError("confirmPasswordErr", "Passwords do not match");
    error++;
  } else {
    removeError("confirmPasswordErr");
  }
});

document.getElementById('confirmPassword').addEventListener('input', function() {
  let error = 0;
  const Password = document.getElementById('password').value;
  const ConfirmPassword = document.getElementById('confirmPassword').value;

  if (Password !== ConfirmPassword) {
    showError("confirmPasswordErr", "Passwords do not match");
    error++;
  } else {
    removeError("confirmPasswordErr");
  }
});

/* Validate the Email and Password Requirements */
document.getElementById("submitBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Check if email is valid
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
  }

  // Check if password is valid
  if (password.length < 12) {
      alert("Password must be at least 12 characters long.");
      return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
  }

  // If all validations pass, redirect to the second sign up page
  window.location.href = "AB_SignUp_pg2.html";
});

// Phone Number Validation
document.getElementById('phoneNumber').addEventListener('input', function() {
  const phoneNumber = document.getElementById("phoneNumber").value;
  const phoneRegx = /^\\+?[1-9]\\d{1,14}$/;

  if (!phoneNumber.match(phoneRegx)) {
    showError("phoneErr", "Please enter a valid phone number in the format 000-000-0000");
    error++;
  } else {
    removeError("phoneErr");
  }
});

// Submit Validation
document.getElementById('submitBtn').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the form from being submitted

  // Validate the form here by confirming the password validation
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    showError('confirmPasswordErr', 'Passwords do not match');
    return; // Stop here if the passwords do not match
  }

  // If the form is valid, show the popup
  if (error === 0) {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('popupText').textContent = 'Form submitted successfully!';
  }
});

// Hides the popup on the webpage when the close button is clicked
document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('popup').style.display = 'none';
});

if(error==0){
  event.preventDefault();
  const fName = document.getElementById('fName').value;
  const lName = document.getElementById('lName').value;
  const email = document.getElementById('email').value;
  const bday = document.getElementById('bdate').value;
  const password = document.getElementById('password').value;
  const pNum = document.getElementById('pNum').value;
  const output=`First_Name = ${fName}; Last_Name = ${lName}; Email = ${email}; Birthday = ${bday}; Password = ${password}; Phone_Number = ${pNum};}`;
  const popup = document.getElementById('popup');
  const p = document.getElementById('popupText');
  popup.style.removeProperty("display");
  p.textContent=output;
} else {
  event.preventDefault();
}
