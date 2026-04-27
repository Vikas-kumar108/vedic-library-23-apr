Harden Guided Path Observability

Tasks:

1. Wrap all audit_logs writes with:
   - structured logging on failure

2. Add:
   - error tag: GUIDED_PATH_FAILURE

3. Capture:
   - userId
   - nodeId
   - action
   - error message

4. Ensure:
   - still non-blocking
   - but NOT silent

Goal:
No silent failures in progression system