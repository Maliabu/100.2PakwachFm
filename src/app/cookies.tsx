'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

const CookieConsent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie_consent');
    if (!consent) {
      setShowPopup(true);
    } else {
      const userId = Cookies.get('user_id');
      console.log('Tracking for user:', userId);

      const handleClick = (e: MouseEvent) => {
        console.log('Click tracked:', e.target);
      };

      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    Cookies.set('cookie_consent', 'true', { expires: 365 });
    if (!Cookies.get('user_id')) {
      Cookies.set('user_id', uuidv4(), { expires: 365 });
    }
    Cookies.set('theme', 'light', { expires: 365 });
    setTimeout(() => {    setShowPopup(false);
    }, 1000)
  };

  const handleDecline = () => {
    setDeclined(true);
    Cookies.set('cookie_consent', 'false', { expires: 365 });
    setTimeout(() => {    setShowPopup(false);
    }, 1000)
  };

  if (!showPopup) return null;

  return (
    <div
      className="flex justify-between slide-in-up"
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        background: '#152653',
        color: '#fff',
        padding: '1em',
        textAlign: 'center',
        zIndex: 9999,
      }}
    >
      <div className="text-sm p-4">
        This website uses cookies to track usage. For more information, see our{' '}
        <Link className="font-bold text-primary" href="/privacy">
          Privacy Policy
        </Link>
      </div>
      <div className="p-4">
      <Button onClick={handleAccept} style={{ marginRight: 10 }}>
  {accepted ? "Yay, let's do this!" : 'Accept'}
</Button>

        <Button variant="outline" className="bg-transparent" onClick={handleDecline}>
        {declined ? "OK, Bye!" : 'Decline'}
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
