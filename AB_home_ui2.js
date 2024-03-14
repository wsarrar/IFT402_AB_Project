// Navigation handling
var navLinks = document.querySelectorAll("nav a");
navLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    // Allow default action for the "Create Posting" link
    if (e.target.href.endsWith('AB_create_bp.html')) {
      return;
    }

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

// Sign Out functionality
document.getElementById('sign-out').addEventListener('click', function() {
  fetch('/logout', {
    method: 'GET',
  });

  // Redirect to the sign-in page
  window.location.href = 'AB_SignIn.html';
});
