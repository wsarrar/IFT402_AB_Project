document.getElementById('postForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target);
    const productName = formData.get('productName');
    const description = formData.get('description');

    // You can add any additional validation or processing here

    // Redirect to the confirmation page
    window.location.href = 'AB_create_bp_confirm.html';
  });