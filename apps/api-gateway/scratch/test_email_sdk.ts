import { Resend } from 'resend';

async function testEmail() {
  const apiKey = "re_bgCyzjwh_EmMgKddMrvpaXduwH1BavPF2";
  const resend = new Resend(apiKey);

  console.log("🛰️ Attempting to send diagnostic email via VERIFIED DOMAIN...");
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Vedic Gurukulam <wisdom@vedicskills.com>',
      to: 'sri.gauranga.samaj.108@gmail.com', // Your test email
      subject: 'Verified Domain Diagnostic • Vedic Library',
      html: '<strong>Success!</strong> Your verified domain is now active and delivering emails.'
    });

    if (error) {
      console.error("❌ CARRIER ERROR:", error);
    } else {
      console.log("✅ SDK SUCCESS: Email sent via verified domain. ID:", data.id);
    }
  } catch (err: any) {
    console.error("❌ EXECUTION FAILED:", err.message);
  }
}

testEmail();
