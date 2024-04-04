// Importing the required jsPDF library
const jsPDF = require('jspdf');

// Define the printPdf function
const printPdf = async () => {
  // Get PDF generation settings
  const barterType = document.querySelector('input[name="barterType"]:checked').value;
  const partyA = document.getElementById("partyA").value;
  const partyA_offer = document.getElementById(`partyA_${barterType}`).value;
  const partyB = document.getElementById("partyB").value;
  const partyB_offer = document.getElementById(`partyB_${barterType}`).value;

  const element = document.getElementById("table-wrap");

  const opt = {
    margin: 15,
    filename: "BarterAgreement_Template.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  // Generate the PDF using html2pdf
  await html2pdf().from(element).set(opt).save();
};

// Validate Saving the PDF
function validateAndSavePdf() {
  // Perform form validation
  const form = document.getElementById('barterForm');
  if (!form.checkValidity()) {
      // If form is invalid, display error message
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'Please fill out all required fields.';
      return;
  }

  // If form is valid, generate and save PDF
  const pdf = new jsPDF();
  const options = {
      filename: 'barter_agreement.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().from(form).set(options).save();
}

// Attach an event listener to the 'savePdfButton' click event
document.getElementById('savePdfButton').addEventListener('click', () => {
  // Prompt user with a confirmation dialog before saving the PDF
  const confirmed = confirm('Are you sure you want to save the PDF?');

  if (confirmed) {
    validateAndSavePdf();
  }
});

// Validate and save PDF function
function validateAndSavePdf() {
  const requiredFields = ['partyA', 'partyA_offer', 'partyB', 'partyB_offer', 'startDate', 'endDate', 'additionalTerms'];

  // Check if any required field is empty
  const emptyFields = requiredFields.filter(field => !document.getElementById(field).value.trim());

  if (emptyFields.length > 0) {
    // Display error message if any required field is empty
    document.getElementById('error-message').textContent = 'Please fill out all required fields.';
  } else {
    // If all required fields are filled out, save the PDF
    printPdf();
  }
}