import { cookies } from 'next/headers'

export const apiFetch = async (path: string, options?: RequestInit) => {
  const baseUrl = process.env.API_GATEWAY_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  
  // Clean path to ensure no double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${baseUrl}${cleanPath}`;
  
  const headers = new Headers(options?.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // If running on server, attempt to attach the session token
  if (typeof window === 'undefined') {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('vedic_token')?.value;
      if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    } catch (e) {
      // Cookies might not be available in all server contexts
    }
  }
  
  return fetch(url, {
    ...options,
    headers,
  });
};
