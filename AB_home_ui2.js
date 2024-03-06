// Navigation handling
var navLinks = document.querySelectorAll("nav a");
navLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Hide all sections
    document.querySelectorAll(".content-page").forEach(function (page) {
      page.classList.remove("active");
    });

    // Show clicked section
    var target = e.target.getAttribute("data-target");
    document.getElementById(target).classList.add("active");
  });
});

// Basic pop-up for Sign In and Sign Up
document.getElementById("signIn").addEventListener("click", function () {
  window.location.href = "AB_SignIn.html";
});

// Basic model for Sign In and Sign Up
function showModal(title) {
  let modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100vw";
  modal.style.height = "100vh";
  modal.style.backgroundColor = "rgba(0,0,0,0.7)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";

  let modalContent = document.createElement("div");
  modalContent.style.backgroundColor = "white";
  modalContent.style.padding = "20px";
  modalContent.style.borderRadius = "10px";

  let closeBtn = document.createElement("button");
  closeBtn.innerHTML = "Close";
  closeBtn.addEventListener("click", function () {
    document.body.removeChild(modal);
  });
}

document.getElementById("signIn").addEventListener("click", function () {
  showModal("Sign In");
});

// Add this code when a user logs in
// This is just an example. You'll need to replace 'First Last' with the actual user's name.
var userName = 'First Last';

// Get the #userLoggedIn div and the #userName paragraph
var userLoggedInDiv = document.getElementById('userLoggedIn');
var userNameParagraph = document.getElementById('userName');

// Update the innerText of the #userName paragraph with the user's name
userNameParagraph.innerText = userName;

// Change the display style property of the #userLoggedIn div to make it visible
userLoggedInDiv.style.display = 'flex';
