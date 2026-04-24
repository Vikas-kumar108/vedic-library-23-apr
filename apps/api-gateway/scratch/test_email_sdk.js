const { Resend } = require('resend');

async function testEmail() {
  const apiKey = "re_bgCyzjwh_EmMgKddMrvpaXduwH1BavPF2";
  const resend = new Resend(apiKey);

  console.log("🛰️ Attempting to send diagnostic email via Resend...");
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'sri.gauranga.samaj.108@gmail.com', // Your test email
      subject: 'Carrier Diagnostic • Vedic Library',
      html: '<strong>Diagnostic Success.</strong> If you see this, your API key and recipient are valid.'
    });

    if (error) {
      console.error("❌ CARRIER ERROR:", error);
      console.log("\n💡 PROBABLE CAUSE: Resend Free Tier only allows sending to the email you used to sign up.");
    } else {
      console.log("✅ SDK SUCCESS: Email sent with ID:", data.id);
      console.log("💡 Check your inbox (and Spam) for 'Carrier Diagnostic'.");
    }
  } catch (err) {
    console.error("❌ EXECUTION FAILED:", err.message);
  }
}

testEmail();
