// Deno Edge Function for Chennai Rents Daily Matching
// Serves at: /functions/v1/daily-matching
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

serve(async (req) => {
  // Guard clause for cron trigger validation if wanted
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 1. Run database query to find potential matches
    // Match criteria:
    // - Distance <= 2500 meters (2.5km) using PostGIS ST_Distance
    // - Seeker budget matches (listing rent <= seeker max_budget AND listing rent >= seeker max_budget * 0.8)
    // - BHK match (listing bhk >= seeker min_bhk)
    // - Non-notified yet
    const { data: matches, error: matchError } = await supabase.rpc('find_daily_matches');
    
    if (matchError) {
      throw new Error(`Failed to find matches: ${matchError.message}`);
    }

    let emailsSentCount = 0;

    for (const match of (matches || [])) {
      // Create record in daily_matches
      const { data: insertData, error: insertError } = await supabase
        .from('daily_matches')
        .insert({
          seeker_id: match.seeker_id,
          listing_id: match.listing_id
        })
        .select();

      if (insertError) {
        // Match already processed/exists
        continue;
      }

      // 2. Dispatch emails via Resend API
      if (RESEND_API_KEY) {
        // Send email to Seeker
        await sendEmail({
          to: match.seeker_email,
          subject: `[chennairents.in] New Rental Match Found in ${match.area}!`,
          html: `
            <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid black;">
              <h1 style="font-size: 24px; border-bottom: 2px double black; padding-bottom: 8px; margin-bottom: 16px; text-transform: uppercase; text-align: center;">chennairents.in</h1>
              <p>Hello,</p>
              <p>We found an active direct landlord listing matching your preferences within 2.5km of your search target in <strong>${match.area}</strong>!</p>
              <table style="width: 100%; border: 1px solid black; border-collapse: collapse; margin: 16px 0;">
                <tr style="background: #f5f5f5;"><th style="padding: 8px; border-bottom: 1px solid black; text-align: left;">BHK Size</th><td style="padding: 8px; border-bottom: 1px solid black;">${match.listing_bhk} BHK</td></tr>
                <tr><th style="padding: 8px; border-bottom: 1px solid black; text-align: left;">Monthly Rent</th><td style="padding: 8px; border-bottom: 1px solid black;">₹${Number(match.listing_rent).toLocaleString('en-IN')}</td></tr>
                <tr style="background: #f5f5f5;"><th style="padding: 8px; border-bottom: 1px solid black; text-align: left;">Security Deposit</th><td style="padding: 8px; border-bottom: 1px solid black;">₹${Number(match.listing_deposit).toLocaleString('en-IN')}</td></tr>
                <tr><th style="padding: 8px; border-bottom: 1px solid black; text-align: left;">Furnishing</th><td style="padding: 8px; border-bottom: 1px solid black;">${match.listing_furnishing.toUpperCase()}</td></tr>
              </table>
              <p><strong>Contact Owner Directly:</strong></p>
              <ul>
                <li>Email: <a href="mailto:${match.listing_email}">${match.listing_email}</a></li>
                <li>Phone: <a href="tel:${match.listing_phone}">${match.listing_phone}</a></li>
              </ul>
              <p style="font-size: 11px; font-style: italic; color: #555; margin-top: 24px; border-top: 1px solid black; padding-top: 8px;">You received this email because you subscribed to rent alerts on chennairents.in.</p>
            </div>
          `
        });

        // Send email to Landlord
        await sendEmail({
          to: match.listing_email,
          subject: `[chennairents.in] A Flat Seeker is interested in your property!`,
          html: `
            <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid black;">
              <h1 style="font-size: 24px; border-bottom: 2px double black; padding-bottom: 8px; margin-bottom: 16px; text-transform: uppercase; text-align: center;">chennairents.in</h1>
              <p>Hello,</p>
              <p>A flat seeker matching your property's BHK size and rent limits has been identified within 2.5km of your property in <strong>${match.area}</strong>!</p>
              <p><strong>Seeker Preferences:</strong></p>
              <ul>
                <li>Desired BHK: Min ${match.seeker_min_bhk} BHK</li>
                <li>Maximum Budget: ₹${Number(match.seeker_max_budget).toLocaleString('en-IN')}</li>
                <li>Move-in Timeline: ${match.seeker_timeline}</li>
              </ul>
              <p><strong>Contact Seeker:</strong></p>
              <ul>
                <li>Email: <a href="mailto:${match.seeker_email}">${match.seeker_email}</a></li>
                <li>Phone: <a href="tel:${match.seeker_phone}">${match.seeker_phone}</a></li>
              </ul>
              <p style="font-size: 11px; font-style: italic; color: #555; margin-top: 24px; border-top: 1px solid black; padding-top: 8px;">This matching notification was dispatched automatically by chennairents.in.</p>
            </div>
          `
        });

        emailsSentCount += 2;

        // Mark match as notified
        await supabase
          .from('daily_matches')
          .update({ notified: true })
          .eq('seeker_id', match.seeker_id)
          .eq('listing_id', match.listing_id);
      }
    }

    return new Response(JSON.stringify({ success: true, processed_matches: matches?.length || 0, emails_sent: emailsSentCount }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
})

async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'alerts@chennairents.in',
      to,
      subject,
      html
    })
  });
}
