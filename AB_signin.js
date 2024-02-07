const signInForm = document.getElementById("signIn-form");
const signInButton = document.getElementById("signIn-form-submit");
const signInErrorMsg = document.getElementById("signIn-error-msg");

const forgotPasswordForm = document.getElementById("forgot-password-form");
const resetPasswordButton = document.getElementById("reset-password-submit");

signInButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = signInForm.email.value;
    const password = signInForm.password.value;

    if (email === "user" && password === "web_dev") {
        alert("You have successfully logged in.");
        location.reload();
    } else {
        signInErrorMsg.style.opacity = 1;
    }
})

resetPasswordButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = forgotPasswordForm.email.value;

    // Send a password reset email
    sendPasswordResetEmail(email);
});

function sendPasswordResetEmail(email) {
    // Implement this function on the server-side
    alert("A password reset email has been sent to " + email);
}