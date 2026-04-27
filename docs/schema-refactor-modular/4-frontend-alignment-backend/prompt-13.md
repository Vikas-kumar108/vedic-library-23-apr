Fix API Gateway connection issues across the entire codebase.

Problem:
Frontend is calling:
fetch("http://localhost:4444/...")

This causes ECONNREFUSED when gateway URL changes or is not running.

Tasks:

1. Replace ALL hardcoded URLs:

   * http://localhost:4444

2. Use environment variable:
   process.env.API_GATEWAY_URL

3. Create centralized helper:
   file: lib/api.ts

   export const apiFetch = (path: string, options?: RequestInit) => {
   return fetch(`${process.env.API_GATEWAY_URL}${path}`, {
   ...options,
   headers: {
   'Content-Type': 'application/json',
   ...(options?.headers || {}),
   },
   });
   };

4. Refactor ALL usages:
   Replace:
   fetch("http://localhost:4444/auth/login")

   With:
   apiFetch("/auth/login")

5. Ensure:

   * No logic changes
   * No response format changes
   * Only URL handling refactor

6. Validate:

   * login
   * register
   * forgot-password
   * refresh
     all use apiFetch

7. Ensure .env usage:
   API_GATEWAY_URL=http://localhost:4444

Return all modified files.
