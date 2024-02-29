const signInForm = document.getElementById("signIn-form");
const signInButton = document.getElementById("signIn-form-submit");
const signInErrorMsg = document.getElementById("signIn-error-msg");

var email = document.forms['signIn-form']['email'];
var email_error = document.getElementById('email_error');
var password = document.forms['signIn-form']['password'];
var password_error = document.getElementById('password_error');

email.addEventListener('input', emailVerify);
password.addEventListener('input', passwordVerify);

function signinValid() {
    if (email.value.length < 5) {
        email.style.border = "1px solid red";
        email_error.style.display = "block";
        email.focus();
        return false;
    }
    if (password.value.length < 12) {
        password.style.border = "1px solid red";
        password_error.style.display = "block";
        password.focus();
        return false;
    }
    return true;
}

function emailVerify(){
    if(email.value.length >= 5){
        email.style.border = "1px solid silver";
        email_error.style.display = "none";
        return true;
    }
}

function passwordVerify(){
    if(password.value.length >= 12){
        password.style.border = "1px solid silver";
        password_error.style.display = "none";
        return true;
    }
}

signInButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!signinValid()) {
        return;
    }
    const user_email = email.value;
    const user_password = password.value;

    if (user_email === "email" && user_password === "password") {
        alert("You have successfully logged in.");
        window.location.href = "AB_Home_UI2.html";
    } else {
        signInErrorMsg.style.opacity = 1;
    }
})

const forgotPasswordForm = document.getElementById("forgot-password-form");
const resetPasswordButton = document.getElementById("reset-password-submit");

resetPasswordButton.addEventListener("click", (e) => {
    e.preventDefault();
    const user_email = forgotPasswordForm.user_email.value;

    // Send a password reset email
    sendPasswordResetEmail(user_email);
});

function sendPasswordResetEmail(user_email) {
    // Implement this function on the server-side
    alert("A password reset email has been sent to " + user_email);
}