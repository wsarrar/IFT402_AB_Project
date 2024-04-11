// Importing the required jsPDF library
const jsPDF = require('jspdf');

// Define the printPdf function
const printPdf = async () => {
  console.log("Generating PDF...");
  try {
    // Get PDF generation settings
    const barterType = document.querySelector('input[name="barterType"]:checked').value;
    const partyA = document.getElementById("partyA").value;
    const partyA_offer = document.getElementById(`partyA_offer_${barterType}`).value;
    const partyB = document.getElementById("partyB").value;
    const partyB_offer = document.getElementById(`partyB_offer_${barterType}`).value;

    const element = document.getElementById("barterForm");

    const opt = {
      margin: 15,
      filename: "BarterAgreement_Template.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate the PDF using html2pdf
    await html2pdf().from(element).set(opt).save();
    console.log("PDF generated successfully.");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

// Validate and save PDF function
function validateAndSavePdf() {
  const requiredFields = ['partyA', 'partyA_offer_oneTime', 'partyA_offer_ongoing', 'partyB', 'partyB_offer_oneTime', 'partyB_offer_ongoing', 'startDate', 'endDate', 'additionalTerms'];

  // Check if any required field is empty
  let emptyFields = [];
  requiredFields.forEach(field => {
    const value = document.getElementById(field).value.trim();
    if (!value) {
      emptyFields.push(field);
    }
  });

  if (emptyFields.length > 0) {
    // Display error message if any required field is empty
    document.getElementById('error-message').textContent = `Please fill out every field.`;
  } else {
    // If all required fields are filled out, save the PDF
    printPdf();
  }
}

// Attach an event listener to the 'savePdfButton' click event
document.getElementById('savePdfButton').addEventListener('click', () => {
  // Prompt user with a confirmation dialog before saving the PDF
  const confirmed = confirm('Are you sure you want to save the PDF?');

  if (confirmed) {
    validateAndSavePdf();
  }
});