/**
 * Client Email Dispatch Helper for Chennai Rents
 * Communicates with /api/send-email (powered by Resend)
 */

export async function sendEmailNotification({ to, subject, html, type = 'general' }) {
  if (!to) {
    console.warn('[EmailService] No recipient provided.');
    return { error: 'No recipient provided' };
  }

  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, subject, html, type }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('[EmailService Error]', err);
    return { error: err.message };
  }
}

/**
 * Sends a confirmation email when a user sets up a rent alert (Seeker Pin)
 */
export async function sendSeekerAlertConfirmation({ email, area, budget, minBhk }) {
  const subject = `[Chennai Rents] Your Rental Alert for ${area || 'Chennai'} is Active!`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #FDFBF7; color: #1E1B18; border: 1.5px solid #E8DFC8; border-radius: 12px;">
      <div style="border-bottom: 3px solid #F5B800; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="margin: 0; color: #B23A2E; font-size: 22px;">Chennai Rents: Alert Activated</h2>
      </div>
      <p style="font-size: 16px; line-height: 1.6;">Hello,</p>
      <p style="font-size: 15px; line-height: 1.6;">Your anonymous rent seeker alert has been recorded on the Chennai Crowdsourced Map.</p>
      <div style="background: #FFFFFF; border: 1px solid #E8DFC8; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <p style="margin: 6px 0;"><strong>Target Area:</strong> ${area || 'Chennai'}</p>
        <p style="margin: 6px 0;"><strong>Max Budget:</strong> ₹${Number(budget).toLocaleString('en-IN')}/month</p>
        <p style="margin: 6px 0;"><strong>Preferred BHK:</strong> ${minBhk ? minBhk + ' BHK' : 'Any'}</p>
      </div>
      <p style="font-size: 14px; color: #4A433B; line-height: 1.6;">When a direct owner posts a flat matching your criteria within 2.5km, we will notify you immediately with free listing and follow up.</p>
      <div style="margin-top: 24px; border-top: 1px solid #E8DFC8; padding-top: 12px; font-size: 12px; color: #7A7064;">
        Chennai Rents • 100% Free Locality-First Rental Guide • Free Listing &amp; Follow Up
      </div>
    </div>
  `;

  return sendEmailNotification({ to: email, subject, html, type: 'seeker_alert' });
}

/**
 * Sends a confirmation email when an owner lists their flat
 */
export async function sendOwnerListingConfirmation({ email, area, bhk, rent, deposit }) {
  const subject = `[Chennai Rents] Your ${bhk} BHK Flat in ${area} is Live!`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #FDFBF7; color: #1E1B18; border: 1.5px solid #E8DFC8; border-radius: 12px;">
      <div style="border-bottom: 3px solid #2F7D4F; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="margin: 0; color: #2F7D4F; font-size: 22px;">Chennai Rents: Property Live</h2>
      </div>
      <p style="font-size: 16px; line-height: 1.6;">Hello,</p>
      <p style="font-size: 15px; line-height: 1.6;">Your property listing is now visible to thousands of active flat-hunters on the Chennai Rents interactive map and listings directory.</p>
      <div style="background: #FFFFFF; border: 1px solid #E8DFC8; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <p style="margin: 6px 0;"><strong>Area:</strong> ${area}</p>
        <p style="margin: 6px 0;"><strong>BHK Type:</strong> ${bhk} BHK</p>
        <p style="margin: 6px 0;"><strong>Monthly Rent:</strong> ₹${Number(rent).toLocaleString('en-IN')}</p>
        <p style="margin: 6px 0;"><strong>Security Deposit:</strong> ₹${Number(deposit).toLocaleString('en-IN')}</p>
        <p style="margin: 6px 0;"><strong>Platform Service:</strong> Free listing and follow up</p>
      </div>
      <p style="font-size: 14px; color: #4A433B; line-height: 1.6;">Prospective tenants will reach out to you directly via phone or WhatsApp. We provide free listing and follow up.</p>
      <div style="margin-top: 24px; border-top: 1px solid #E8DFC8; padding-top: 12px; font-size: 12px; color: #7A7064;">
        Chennai Rents • 100% Free Locality-First Rental Guide
      </div>
    </div>
  `;

  return sendEmailNotification({ to: email, subject, html, type: 'owner_listing' });
}
