/**
 * Vercel Serverless Function: /api/send-email
 * Dispatches transactional notifications via Resend API
 */
export default async function handler(req, res) {
  // CORS configuration
  const allowedOrigins = [
    'https://www.chennairents.in',
    'https://chennairents.in',
    'http://localhost:5173',
    'http://localhost:3000'
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.chennairents.in');
  }
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, html, type } = req.body || {};

  if (!to) {
    return res.status(400).json({ error: 'Recipient email address (to) is required' });
  }

  const resendApiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY || '';

  if (!resendApiKey) {
    console.log(`[Resend Notice] RESEND_API_KEY not set. Email logged for: ${to} | Subject: ${subject}`);
    return res.status(200).json({
      success: true,
      pendingConfig: true,
      message: 'Email registered. Add RESEND_API_KEY to your Vercel or environment variables to dispatch live emails.'
    });
  }

  try {
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Chennai Rents <onboarding@resend.dev>';

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: Array.isArray(to) ? to : [to],
        subject: subject || 'Notification from Chennai Rents',
        html: html || '<p>You have a new update from Chennai Rents.</p>',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Resend Error]', data);
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('[Resend Dispatch Error]', error);
    return res.status(500).json({ error: error.message || 'Failed to dispatch email' });
  }
}
