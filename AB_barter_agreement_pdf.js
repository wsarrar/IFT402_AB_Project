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
  await html2pdf().set(opt).from(element).save();
};

// Attach an event listener to the 'safePdfButton' click event
document.getElementById('safePdfButton').addEventListener('click', () => {

  // Get the 'barterForm' form element
  const barterForm = document.getElementById('barterForm');

  // Create a new FormData instance with the form data
  const formData = new FormData(barterForm);

  // Create a new jsPDF document
  const pdfDoc = new jsPDF();

  // Calculate the number of pages required to accommodate the form data
  const pdfPageCount = Math.ceil(formData.size / 150);

  // Loop through each page and add the form data as text
  for (let i = 0; i < pdfPageCount; i++) {
    const chunk = Array.from(formData.entries()).slice(i * 150, (i + 1) * 150);
    const pdfPage = pdfDoc.getPage(i + 1);

    // Add the form data as text to the PDF page
    chunk.forEach(([name, value]) => {
      if (value !== undefined && value !== null) {
        // Determine the coordinates to avoid overlapping form fields
        const x = (pdfPage.width - 100) / 2;
        const y = 10 + (15 * (name.length + value.length)) / 2;

        // Write the form data on the PDF page
        pdfPage.text(`${name}: ${value}`, x, y, { maxWidth: 100 });
      }
    });
  }

  // Save the generated PDF document on the user's device
  pdfDoc.save('barter_agreement.pdf');
});
