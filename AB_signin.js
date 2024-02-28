const signInForm = document.getElementById("signIn-form");
const signInButton = document.getElementById("signIn-form-submit");
const signInErrorMsg = document.getElementById("signIn-error-msg");

const email = document.forms['form']['email'];
const email_error = document.getElementById('email_error');
const password = document.forms['form']['password'];
const password_error = document.getElementById('password_error');

email.addEventListener('userInput', emailVerify);
password.addEventListener('userInput', passwordVerify);

function signinValid(){
    if (email.value.length < 11){
        email.style.border = "1px solid red";
        email_error.style.display = "block";
        email.focus();
        return false;
    }
    if(password.value.length < 12){
        password.style.border = "1px solid red";
        password_error.style.display = "block";
        password.focus();
        return false;
    }
}

function emailVerify(){
    if(email.value.length >= 11){
        email.style.border = "1px solid green";
        email_error.style.display = "none";
        return true;
    }
}

function passwordVerify(){
    if(password.value.length >= 12){
        email.style.border = "1px solid green";
        password_error.style.display = "none";
        return true;
    }
}

const forgotPasswordForm = document.getElementById("forgot-password-form");
const resetPasswordButton = document.getElementById("reset-password-submit");

signInButton.addEventListener("click", (e) => {
    e.preventDefault();
    const user_email = signInForm.user_email.value;
    const user_password = signInForm.user_password.value;

    if (user_email === "user" && user_password === "web_dev") {
        alert("You have successfully logged in.");
        location.reload();
    } else {
        signInErrorMsg.style.opacity = 1;
    }
})

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