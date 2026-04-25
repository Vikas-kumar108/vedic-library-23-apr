Temporarily disable authentication middleware for development.

Task:
- Locate auth middleware in api-gateway
- Bypass or disable it ONLY for development

Options:
1. Comment out auth middleware in routes
OR
2. Modify middleware to always call next()

Rules:
- Do NOT delete code
- Just bypass temporarily
- Add comment: // TEMP DEV BYPASS

Goal:
Allow access to /library without login

================================



Listed directory src
Listed directory middlewares
Listed directory auth
Viewed auth.middleware.ts:1-36
Viewed library.routes.ts:1-49
Viewed index.ts:1-62
Listed directory plugins
Viewed auth.ts:1-130
Edited auth.middleware.ts
Viewed academy.routes.ts:1-36
Viewed project.routes.ts:1-22

I have temporarily bypassed the authentication middleware in the `api-gateway` to facilitate development and allow access to the `/library` (and other) routes without requiring a login.

### Changes Made:
- **Modified Middleware:** Updated `src/middlewares/auth/auth.middleware.ts` to include a bypass at the start of the `authMiddleware` function.
- **Implementation:** Added a `return` statement immediately after entering the function, prefixed with the requested `// TEMP DEV BYPASS` comment. This ensures that any route utilizing this middleware will proceed as if the authentication was successful.
- **Preserved Logic:** The original token verification and error handling logic remains in the file, commented out or following the early return, to allow for easy restoration later.

You can now access the library endpoints without providing an authorization header.