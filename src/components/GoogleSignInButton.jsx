import React, { useEffect, useRef } from 'react';
import { GOOGLE_CLIENT_ID, supabase } from '../config';

/**
 * Safely decode base64url JWT payload into JSON object
 */
function decodeGoogleJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return JSON.parse(atob(token.split('.')[1]));
  }
}

/**
 * Persist Google Sign-In / Sign-Up user record to Supabase database
 */
async function syncUserToSupabase(idToken, userPayload) {
  try {
    // 1. Authenticate with Supabase Auth (stores user in auth.users when Google provider is enabled)
    await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    });
  } catch {
    // Continue to public.users upsert even if Supabase Auth Google provider is not yet enabled
  }

  try {
    // 2. Record/update user in public.users via secure RPC
    const { data, error } = await supabase.rpc('upsert_google_user', {
      p_google_id: userPayload.sub,
      p_email: userPayload.email,
      p_name: userPayload.name || userPayload.email.split('@')[0],
      p_given_name: userPayload.given_name || null,
      p_picture: userPayload.picture || null,
      p_email_verified: Boolean(userPayload.email_verified),
    });

    if (!error && data) {
      return data;
    }

    // 3. Fallback: direct upsert to public.users table
    const { data: tableData } = await supabase
      .from('users')
      .upsert(
        {
          google_id: userPayload.sub,
          email: userPayload.email.toLowerCase().trim(),
          name: userPayload.name || userPayload.email.split('@')[0],
          given_name: userPayload.given_name || null,
          picture: userPayload.picture || null,
          email_verified: Boolean(userPayload.email_verified),
          last_login_at: new Date().toISOString(),
        },
        { onConflict: 'google_id' }
      )
      .select('id, google_id, email, name, given_name, picture')
      .single();

    return tableData || null;
  } catch {
    return null;
  }
}

export function GoogleSignInButton({
  onLoginSuccess,
  id = 'google-btn',
  theme = 'outline',
  size = 'medium',
  text = 'signup_with',
  shape = 'rectangular',
}) {
  const buttonContainerRef = useRef(null);
  const onLoginSuccessRef = useRef(onLoginSuccess);
  onLoginSuccessRef.current = onLoginSuccess;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const clientId =
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_CLIENT_ID) ||
      GOOGLE_CLIENT_ID;

    const initializeGoogleAuth = () => {
      if (!window.google?.accounts?.id || !buttonContainerRef.current) return;

      // Initialize Google Identity Services with Client ID
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          if (!response?.credential) return;
          const userPayload = decodeGoogleJwt(response.credential);

          // Save user to Supabase database
          const dbUser = await syncUserToSupabase(response.credential, userPayload);

          if (onLoginSuccessRef.current) {
            onLoginSuccessRef.current({
              id: dbUser?.id || null,
              google_id: userPayload.sub,
              name: userPayload.name,
              given_name: userPayload.given_name,
              picture: userPayload.picture,
              email: userPayload.email,
              exp: userPayload.exp,
            });
          }
        },
      });

      // Render the official Google Sign-Up / Sign-In button
      window.google.accounts.id.renderButton(buttonContainerRef.current, {
        theme,
        size,
        text,
        shape,
      });
    };

    // If GSI script is already loaded in window
    if (window.google?.accounts?.id) {
      initializeGoogleAuth();
      return;
    }

    // Check if script tag is already in the DOM
    const existingScript = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );

    if (existingScript) {
      existingScript.addEventListener('load', initializeGoogleAuth);
      return () => {
        existingScript.removeEventListener('load', initializeGoogleAuth);
      };
    }

    // Load Google's official sign-in script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleAuth;
    document.head.appendChild(script);
  }, [theme, size, text, shape]);

  return (
    <div
      id={id}
      ref={buttonContainerRef}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: '38px',
      }}
    />
  );
}

export default GoogleSignInButton;
