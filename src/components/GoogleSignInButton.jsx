import React, { useEffect, useRef } from 'react';
import { GOOGLE_CLIENT_ID } from '../config';

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
        callback: (response) => {
          if (!response?.credential) return;
          const userPayload = decodeGoogleJwt(response.credential);

          if (onLoginSuccessRef.current) {
            onLoginSuccessRef.current({
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
