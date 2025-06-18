import Cookies from 'js-cookie';

export const trackEvent = async (eventName: string, metadata: any = {}) => {
  const userId = Cookies.get('user_id');
  if (!userId || Cookies.get('cookie_consent') !== 'true') return;

  await fetch('/api/track', {
    method: 'POST',
    body: JSON.stringify({
      userId,
      event: eventName,
      metadata,
      timestamp: new Date().toISOString(),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
