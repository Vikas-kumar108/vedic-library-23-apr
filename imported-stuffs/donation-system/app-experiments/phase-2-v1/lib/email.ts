import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Use Resend's default domain for testing, or custom domain if set
const FROM_EMAIL = process.env.FROM_EMAIL || 'VedicSkills <onboarding@resend.dev>';

// Helper to check if email is configured
function isEmailConfigured(): boolean {
  return !!resend;
}

export interface DonationEmailData {
  email: string;
  name: string;
  amount: number;
  donationId: string;
}

export interface ReceiptEmailData {
  email: string;
  name: string;
  amount: number;
  receiptNumber: string;
  pdfBase64: string;
}

export interface WelcomeEmailData {
  email: string;
  name: string;
}

// Send email when donation is created (pending confirmation)
export async function sendDonationCreatedEmail(data: DonationEmailData) {
  // Skip if email not configured (development mode)
  if (!isEmailConfigured()) {
    console.log('[Email] Resend not configured. Would send donation email to:', data.email);
    return { success: true, message: 'Email skipped (no API key configured)' };
  }

  try {
    const { email, name, amount, donationId } = data;
    
    const result = await resend!.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Thank You for Your Seva - Donation Received',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Georgia, serif; background-color: #FFF8F0; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #FF9933 0%, #FF6600 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">VedicSkills</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Spreading Vedic Knowledge</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 24px;">Namaste ${name},</h2>
              
              <p style="color: #4a4a4a; line-height: 1.8; margin: 0 0 20px 0;">
                We have received your seva contribution of <strong style="color: #FF6600;">Rs. ${amount.toLocaleString('en-IN')}</strong>. 
                Your generosity supports our mission to preserve and spread Vedic wisdom.
              </p>
              
              <div style="background: #FFF8F0; border-left: 4px solid #FF9933; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; color: #666; font-size: 14px;">
                  <strong>Donation Reference:</strong><br>
                  <span style="font-family: monospace; color: #333;">${donationId}</span>
                </p>
              </div>
              
              <p style="color: #4a4a4a; line-height: 1.8; margin: 0 0 20px 0;">
                Our team will verify your donation shortly. Once confirmed, you will receive your 80G tax receipt via email.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #888; font-style: italic; margin: 0;">
                  "The giving of alms is one of the greatest virtues."<br>
                  <small>- Bhagavad Gita</small>
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f5f5f5; padding: 20px 30px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                This is an automated message from VedicSkills.<br>
                For queries, contact us at support@vedicskills.org
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    });
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending donation created email:', error);
    return { success: false, error };
  }
}

// Send email when donation is confirmed with receipt
export async function sendReceiptEmail(data: ReceiptEmailData) {
  if (!isEmailConfigured()) {
    console.log('[Email] Resend not configured. Would send receipt email to:', data.email);
    return { success: true, message: 'Email skipped (no API key configured)' };
  }

  try {
    const { email, name, amount, receiptNumber, pdfBase64 } = data;
    
    const result = await resend!.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Your 80G Receipt - ${receiptNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Georgia, serif; background-color: #FFF8F0; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px; text-align: center;">
              <div style="background: white; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 30px;">✓</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 24px;">Donation Confirmed!</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 22px;">Namaste ${name},</h2>
              
              <p style="color: #4a4a4a; line-height: 1.8; margin: 0 0 20px 0;">
                Your donation of <strong style="color: #22c55e;">Rs. ${amount.toLocaleString('en-IN')}</strong> has been confirmed. 
                Thank you for your generous seva!
              </p>
              
              <div style="background: #f0fdf4; border: 1px solid #22c55e; padding: 20px; margin: 25px 0; border-radius: 8px; text-align: center;">
                <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">Receipt Number</p>
                <p style="margin: 0; font-size: 20px; font-weight: bold; color: #166534; font-family: monospace;">${receiptNumber}</p>
              </div>
              
              <p style="color: #4a4a4a; line-height: 1.8; margin: 0 0 20px 0;">
                Your 80G tax receipt is attached to this email. You can use this for tax exemption purposes under Section 80G of the Income Tax Act.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #888; font-style: italic; margin: 0;">
                  May your generosity bring blessings to you and your family.
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f5f5f5; padding: 20px 30px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                VedicSkills Foundation<br>
                Registered under Section 80G | PAN: XXXXX1234X
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: `Receipt-${receiptNumber}.pdf`,
          content: pdfBase64,
        },
      ],
    });
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending receipt email:', error);
    return { success: false, error };
  }
}

// Send welcome email on registration
export async function sendWelcomeEmail(data: WelcomeEmailData) {
  if (!isEmailConfigured()) {
    console.log('[Email] Resend not configured. Would send welcome email to:', data.email);
    return { success: true, message: 'Email skipped (no API key configured)' };
  }

  try {
    const { email, name } = data;
    
    const result = await resend!.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Welcome to VedicSkills',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Georgia, serif; background-color: #FFF8F0; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #FF9933 0%, #FF6600 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to VedicSkills</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 24px;">Namaste ${name},</h2>
              
              <p style="color: #4a4a4a; line-height: 1.8; margin: 0 0 20px 0;">
                Thank you for joining the VedicSkills community. Your account has been created successfully.
              </p>
              
              <p style="color: #4a4a4a; line-height: 1.8; margin: 0 0 20px 0;">
                You can now:
              </p>
              
              <ul style="color: #4a4a4a; line-height: 2; padding-left: 20px;">
                <li>Make donations and track your seva history</li>
                <li>Download 80G tax receipts</li>
                <li>Join our monthly Sevak membership</li>
                <li>Stay updated on our mission</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL || 'https://vedicskills.org'}/dashboard" 
                   style="background: #FF9933; color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                  Go to Dashboard
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f5f5f5; padding: 20px 30px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                VedicSkills - Spreading Vedic Knowledge
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    });
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error };
  }
}

// Send membership reminder email
export async function sendMembershipReminderEmail(data: {
  email: string;
  name: string;
  tier: string;
  amount: number;
  dueDate: Date;
}) {
  if (!isEmailConfigured()) {
    console.log('[Email] Resend not configured. Would send reminder email to:', data.email);
    return { success: true, message: 'Email skipped (no API key configured)' };
  }

  try {
    const { email, name, tier, amount, dueDate } = data;
    
    const result = await resend!.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Seva Reminder - ${tier} Membership Due`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Georgia, serif; background-color: #FFF8F0; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #FF9933 0%, #FF6600 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Seva Reminder</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 22px;">Namaste ${name},</h2>
              
              <p style="color: #4a4a4a; line-height: 1.8; margin: 0 0 20px 0;">
                Your <strong>${tier}</strong> membership contribution of <strong>Rs. ${amount.toLocaleString('en-IN')}</strong> 
                is due on <strong>${dueDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>.
              </p>
              
              <p style="color: #4a4a4a; line-height: 1.8; margin: 0 0 20px 0;">
                Your continued support helps us spread Vedic knowledge to seekers around the world.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL || 'https://vedicskills.org'}/donate" 
                   style="background: #FF9933; color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                  Renew Your Seva
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f5f5f5; padding: 20px 30px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                VedicSkills Foundation
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    });
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending membership reminder email:', error);
    return { success: false, error };
  }
}
