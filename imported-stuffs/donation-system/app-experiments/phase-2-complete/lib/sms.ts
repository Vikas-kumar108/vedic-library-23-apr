import axios from 'axios';

const MSG91_API_KEY = process.env.MSG91_API_KEY;
const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID || 'VSKILL';

// MSG91 API base URL
const MSG91_API_URL = 'https://control.msg91.com/api/v5';

interface SMSResponse {
  success: boolean;
  message?: string;
  error?: unknown;
}

// Send SMS using MSG91 Flow API
async function sendSMS(phone: string, flowId: string, variables: Record<string, string>): Promise<SMSResponse> {
  // If no API key, log and skip (for development)
  if (!MSG91_API_KEY) {
    console.log('[SMS] MSG91 not configured. Would send to:', phone, 'with variables:', variables);
    return { success: true, message: 'SMS skipped (no API key configured)' };
  }

  try {
    // Format phone number (ensure 91 prefix for India)
    const formattedPhone = phone.startsWith('91') ? phone : `91${phone.replace(/^0+/, '')}`;

    const response = await axios.post(
      `${MSG91_API_URL}/flow/`,
      {
        flow_id: flowId,
        sender: MSG91_SENDER_ID,
        mobiles: formattedPhone,
        ...variables,
      },
      {
        headers: {
          'authkey': MSG91_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data?.type === 'success') {
      return { success: true, message: 'SMS sent successfully' };
    } else {
      return { success: false, error: response.data };
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { success: false, error };
  }
}

// Alternative: Send SMS using simple API (if not using Flow)
async function sendSimpleSMS(phone: string, message: string): Promise<SMSResponse> {
  if (!MSG91_API_KEY) {
    console.log('[SMS] MSG91 not configured. Would send to:', phone, 'message:', message);
    return { success: true, message: 'SMS skipped (no API key configured)' };
  }

  try {
    const formattedPhone = phone.startsWith('91') ? phone : `91${phone.replace(/^0+/, '')}`;

    const response = await axios.get(`${MSG91_API_URL}/sendhttp.php`, {
      params: {
        authkey: MSG91_API_KEY,
        mobiles: formattedPhone,
        message: message,
        sender: MSG91_SENDER_ID,
        route: '4', // Transactional route
        country: '91',
      },
    });

    return { success: true, message: response.data };
  } catch (error) {
    console.error('Error sending simple SMS:', error);
    return { success: false, error };
  }
}

// Send donation confirmation SMS
export async function sendDonationSMS(phone: string, name: string, amount: number): Promise<SMSResponse> {
  const flowId = process.env.MSG91_DONATION_FLOW_ID;
  
  if (flowId) {
    // Use Flow API with template
    return sendSMS(phone, flowId, {
      VAR1: name,
      VAR2: amount.toLocaleString('en-IN'),
    });
  } else {
    // Fallback to simple SMS
    const message = `Namaste ${name}, thank you for your seva of Rs.${amount.toLocaleString('en-IN')} to VedicSkills. Your contribution will be confirmed shortly. - VedicSkills`;
    return sendSimpleSMS(phone, message);
  }
}

// Send receipt confirmation SMS
export async function sendReceiptSMS(phone: string, name: string, amount: number, receiptNumber: string): Promise<SMSResponse> {
  const flowId = process.env.MSG91_RECEIPT_FLOW_ID;
  
  if (flowId) {
    return sendSMS(phone, flowId, {
      VAR1: name,
      VAR2: amount.toLocaleString('en-IN'),
      VAR3: receiptNumber,
    });
  } else {
    const message = `Namaste ${name}, your donation of Rs.${amount.toLocaleString('en-IN')} is confirmed. Receipt No: ${receiptNumber}. Thank you for your seva! - VedicSkills`;
    return sendSimpleSMS(phone, message);
  }
}

// Send membership reminder SMS
export async function sendMembershipReminderSMS(
  phone: string, 
  name: string, 
  tier: string, 
  amount: number, 
  dueDate: Date
): Promise<SMSResponse> {
  const flowId = process.env.MSG91_REMINDER_FLOW_ID;
  const formattedDate = dueDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  
  if (flowId) {
    return sendSMS(phone, flowId, {
      VAR1: name,
      VAR2: tier,
      VAR3: amount.toLocaleString('en-IN'),
      VAR4: formattedDate,
    });
  } else {
    const message = `Namaste ${name}, your ${tier} seva of Rs.${amount.toLocaleString('en-IN')} is due on ${formattedDate}. Continue your sacred contribution at vedicskills.org - VedicSkills`;
    return sendSimpleSMS(phone, message);
  }
}

// Send welcome SMS on registration
export async function sendWelcomeSMS(phone: string, name: string): Promise<SMSResponse> {
  const flowId = process.env.MSG91_WELCOME_FLOW_ID;
  
  if (flowId) {
    return sendSMS(phone, flowId, {
      VAR1: name,
    });
  } else {
    const message = `Namaste ${name}, welcome to VedicSkills! Your account is ready. Start your spiritual journey at vedicskills.org - VedicSkills`;
    return sendSimpleSMS(phone, message);
  }
}
