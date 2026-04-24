import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export interface ReceiptData {
  receiptNumber: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  donorAddress?: string;
  donorPAN?: string;
  amount: number;
  donationDate: Date;
  confirmationDate: Date;
  paymentMethod: string;
  transactionRef?: string;
}

// Organization details (should ideally come from env or config)
const ORG_NAME = process.env.ORG_NAME || 'VedicSkills Foundation';
const ORG_ADDRESS = process.env.ORG_ADDRESS || '123 Spiritual Lane, Rishikesh, Uttarakhand 249201';
const ORG_PAN = process.env.ORG_PAN || 'AAATV1234X';
const ORG_80G_REG = process.env.ORG_80G_REG || '80G/REG/2024/12345';
const ORG_80G_VALIDITY = process.env.ORG_80G_VALIDITY || 'Valid from 01-04-2024 to 31-03-2029';

// Convert number to words (Indian numbering)
function numberToWords(num: number): string {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  if (num === 0) return 'Zero';
  if (num < 20) return ones[num];
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
  if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' and ' + numberToWords(num % 100) : '');
  if (num < 100000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + numberToWords(num % 1000) : '');
  if (num < 10000000) return numberToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + numberToWords(num % 100000) : '');
  return numberToWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 ? ' ' + numberToWords(num % 10000000) : '');
}

export async function generateReceiptPDF(data: ReceiptData): Promise<string> {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  
  // Add a page (A4 size)
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 in points
  const { width, height } = page.getSize();
  
  // Load fonts
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  
  // Colors
  const primaryColor = rgb(1, 0.6, 0.2); // Saffron orange
  const darkColor = rgb(0.1, 0.1, 0.1);
  const grayColor = rgb(0.4, 0.4, 0.4);
  const lightGray = rgb(0.9, 0.9, 0.9);
  
  let y = height - 50;
  
  // Header - Organization Name
  page.drawText(ORG_NAME, {
    x: 50,
    y,
    size: 24,
    font: helveticaBold,
    color: primaryColor,
  });
  
  y -= 20;
  page.drawText(ORG_ADDRESS, {
    x: 50,
    y,
    size: 10,
    font: helvetica,
    color: grayColor,
  });
  
  y -= 15;
  page.drawText(`PAN: ${ORG_PAN}`, {
    x: 50,
    y,
    size: 10,
    font: helvetica,
    color: grayColor,
  });
  
  // Receipt title
  y -= 40;
  page.drawRectangle({
    x: 50,
    y: y - 5,
    width: width - 100,
    height: 30,
    color: lightGray,
  });
  
  page.drawText('DONATION RECEIPT (80G)', {
    x: (width - 200) / 2,
    y: y + 5,
    size: 16,
    font: helveticaBold,
    color: darkColor,
  });
  
  // Receipt number and date row
  y -= 50;
  page.drawText(`Receipt No: ${data.receiptNumber}`, {
    x: 50,
    y,
    size: 12,
    font: helveticaBold,
    color: darkColor,
  });
  
  page.drawText(`Date: ${data.confirmationDate.toLocaleDateString('en-IN', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })}`, {
    x: width - 200,
    y,
    size: 12,
    font: helvetica,
    color: darkColor,
  });
  
  // Donor details section
  y -= 40;
  page.drawText('DONOR DETAILS', {
    x: 50,
    y,
    size: 12,
    font: helveticaBold,
    color: primaryColor,
  });
  
  y -= 5;
  page.drawLine({
    start: { x: 50, y },
    end: { x: width - 50, y },
    thickness: 1,
    color: lightGray,
  });
  
  y -= 25;
  const labelX = 50;
  const valueX = 180;
  
  // Name
  page.drawText('Name:', { x: labelX, y, size: 11, font: helvetica, color: grayColor });
  page.drawText(data.donorName, { x: valueX, y, size: 11, font: helveticaBold, color: darkColor });
  
  // Email
  y -= 20;
  page.drawText('Email:', { x: labelX, y, size: 11, font: helvetica, color: grayColor });
  page.drawText(data.donorEmail, { x: valueX, y, size: 11, font: helvetica, color: darkColor });
  
  // Phone
  if (data.donorPhone) {
    y -= 20;
    page.drawText('Phone:', { x: labelX, y, size: 11, font: helvetica, color: grayColor });
    page.drawText(data.donorPhone, { x: valueX, y, size: 11, font: helvetica, color: darkColor });
  }
  
  // Address
  if (data.donorAddress) {
    y -= 20;
    page.drawText('Address:', { x: labelX, y, size: 11, font: helvetica, color: grayColor });
    page.drawText(data.donorAddress, { x: valueX, y, size: 11, font: helvetica, color: darkColor });
  }
  
  // PAN
  if (data.donorPAN) {
    y -= 20;
    page.drawText('PAN:', { x: labelX, y, size: 11, font: helvetica, color: grayColor });
    page.drawText(data.donorPAN, { x: valueX, y, size: 11, font: helvetica, color: darkColor });
  }
  
  // Donation details section
  y -= 40;
  page.drawText('DONATION DETAILS', {
    x: 50,
    y,
    size: 12,
    font: helveticaBold,
    color: primaryColor,
  });
  
  y -= 5;
  page.drawLine({
    start: { x: 50, y },
    end: { x: width - 50, y },
    thickness: 1,
    color: lightGray,
  });
  
  // Amount box
  y -= 35;
  page.drawRectangle({
    x: 50,
    y: y - 20,
    width: width - 100,
    height: 60,
    borderColor: primaryColor,
    borderWidth: 2,
  });
  
  page.drawText('Amount Received:', {
    x: 70,
    y: y + 10,
    size: 12,
    font: helvetica,
    color: grayColor,
  });
  
  page.drawText(`Rs. ${data.amount.toLocaleString('en-IN')}/-`, {
    x: 70,
    y: y - 10,
    size: 20,
    font: helveticaBold,
    color: darkColor,
  });
  
  // Amount in words
  y -= 55;
  page.drawText(`(Rupees ${numberToWords(data.amount)} Only)`, {
    x: 50,
    y,
    size: 11,
    font: timesItalic,
    color: grayColor,
  });
  
  // Payment details
  y -= 30;
  page.drawText('Donation Date:', { x: labelX, y, size: 11, font: helvetica, color: grayColor });
  page.drawText(data.donationDate.toLocaleDateString('en-IN', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  }), { x: valueX, y, size: 11, font: helvetica, color: darkColor });
  
  y -= 20;
  page.drawText('Payment Mode:', { x: labelX, y, size: 11, font: helvetica, color: grayColor });
  page.drawText(data.paymentMethod, { x: valueX, y, size: 11, font: helvetica, color: darkColor });
  
  if (data.transactionRef) {
    y -= 20;
    page.drawText('Transaction Ref:', { x: labelX, y, size: 11, font: helvetica, color: grayColor });
    page.drawText(data.transactionRef, { x: valueX, y, size: 11, font: helvetica, color: darkColor });
  }
  
  // 80G Section
  y -= 50;
  page.drawRectangle({
    x: 50,
    y: y - 70,
    width: width - 100,
    height: 80,
    color: rgb(1, 0.98, 0.94), // Light saffron
  });
  
  page.drawText('80G TAX EXEMPTION', {
    x: 60,
    y: y - 5,
    size: 11,
    font: helveticaBold,
    color: primaryColor,
  });
  
  page.drawText(`Registration Number: ${ORG_80G_REG}`, {
    x: 60,
    y: y - 25,
    size: 10,
    font: helvetica,
    color: darkColor,
  });
  
  page.drawText(ORG_80G_VALIDITY, {
    x: 60,
    y: y - 40,
    size: 10,
    font: helvetica,
    color: grayColor,
  });
  
  page.drawText('This donation is eligible for tax exemption under Section 80G of the Income Tax Act, 1961.', {
    x: 60,
    y: y - 58,
    size: 9,
    font: timesItalic,
    color: grayColor,
  });
  
  // Signature section
  y -= 120;
  page.drawLine({
    start: { x: width - 200, y },
    end: { x: width - 50, y },
    thickness: 1,
    color: grayColor,
  });
  
  page.drawText('Authorized Signatory', {
    x: width - 170,
    y: y - 15,
    size: 10,
    font: helvetica,
    color: grayColor,
  });
  
  page.drawText(ORG_NAME, {
    x: width - 200,
    y: y - 30,
    size: 10,
    font: helveticaBold,
    color: darkColor,
  });
  
  // Footer
  page.drawText('This is a computer-generated receipt and does not require a physical signature.', {
    x: 50,
    y: 50,
    size: 8,
    font: timesItalic,
    color: grayColor,
  });
  
  page.drawText('Thank you for your generous contribution to our mission.', {
    x: 50,
    y: 35,
    size: 8,
    font: timesRoman,
    color: grayColor,
  });
  
  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save();
  
  // Convert to base64
  const base64 = Buffer.from(pdfBytes).toString('base64');
  
  return base64;
}

// Generate receipt number
export async function generateReceiptNumber(counter: { value: number }): Promise<string> {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const sequence = String(counter.value).padStart(5, '0');
  
  return `VS/${year}${month}/${sequence}`;
}
