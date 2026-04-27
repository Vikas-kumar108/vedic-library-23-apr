export const apiFetch = (path: string, options?: RequestInit) => {
  const baseUrl = process.env.API_GATEWAY_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4444';
  
  // Clean path to ensure no double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return fetch(`${baseUrl}${cleanPath}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });
};
