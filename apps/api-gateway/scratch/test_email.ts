import { IntegrationRegistry } from '../src/integrations/registry'

async function testEmail() {
  console.log('🏛️  TESTING INSTITUTIONAL EMAIL DHARMA...')
  
  const emailService = IntegrationRegistry.getEmailService()
  
  const payload = {
    to: 'seeker@example.com',
    subject: 'Welcome to the Vedic Library',
    body: 'Your spiritual journey begins here.',
    html: '<h1>Spiritual Journey Begins</h1><p>Welcome to the institutional reading room.</p>'
  }

  const success = await emailService.sendEmail(payload)
  
  if (success) {
    console.log('✨ TEST COMPLETE: Email Manifested.')
  } else {
    console.log('❌ TEST FAILED: Communication Interrupted.')
  }
}

testEmail()
