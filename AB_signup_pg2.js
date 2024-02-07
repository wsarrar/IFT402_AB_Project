const signInForm = document.getElementById("signIn-form");
const signInButton = document.getElementById("signIn-form-submit");
const signInErrorMsg = document.getElementById("signIn-error-msg");

const termsCheckbox = document.getElementById("agree");
const agreeCheckbox = document.getElementById("agree");

// Add event listener to the "Sign Up" button
signInButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = signInForm.email.value;
    const password = signInForm.password.value;

    // Validate the email and password
    if (email === "user" && password === "web_dev") {
        alert("You have successfully signed up.");
        location.reload();
    } else {
        signInErrorMsg.style.opacity = 1;
    }

    // Validate the "Terms and Conditions" checkbox
    if (!termsCheckbox.checked) {
        alert("You must agree to the Terms and Conditions to sign up.");
        return;
    }
});

/* This code displays a confirmation message and then redirects the 
user to the homepage after a delay of 3 seconds.*/
window.onload = function() {
    // Display a confirmation message
    alert("Thank you for signing up! Please check your email to verify your account.");
  
    // Redirect to the homepage after 3 seconds
    setTimeout(function() {
      window.location.href = "AB_Home_UI.html";
    }, 3000);
};