// Institutional API Gateway Interface

export const apiFetch = async <T = any>(path: string, options?: RequestInit): Promise<{ data: T | null; error: string | null; status: number }> => {
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
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const token = cookieStore.get('vedic_token')?.value;
      if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    } catch (e) {
      // Cookies might not be available in all server contexts
    }
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });

  const status = response.status;
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return { data: null, error: errorData.error || 'Request failed', status };
  }

  const data = await response.json();
  return { data: data as T, error: null, status };
};
