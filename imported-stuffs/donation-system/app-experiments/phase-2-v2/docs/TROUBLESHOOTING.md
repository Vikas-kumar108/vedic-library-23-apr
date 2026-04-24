# Troubleshooting Guide

Solutions for common issues in the VedicSkills Donation System.

---

## Quick Diagnostics

### Check System Status
```bash
curl http://localhost:3000/api/debug/status
```

This shows which services are configured:
```json
{
  "mongodb": true,
  "resend": false,
  "razorpay": false,
  "msg91": false,
  "blob": true
}
```

---

## Authentication Issues

### "Registration failed: Unexpected token '<'"

**Cause**: API returning HTML instead of JSON (usually 500 error)

**Solutions**:
1. Check MongoDB connection:
   ```bash
   # Verify MONGODB_URI is set correctly
   echo $MONGODB_URI
   ```

2. Check MongoDB Atlas:
   - IP whitelist includes your server IP
   - Database user has read/write permissions
   - Cluster is running (not paused)

3. Check server logs for actual error

---

### "Invalid credentials" when logging in

**Solutions**:
1. Verify email is correct (case-sensitive)
2. Reset password if forgotten
3. Check if user exists in database:
   ```javascript
   // In MongoDB Compass
   db.users.findOne({ email: "user@example.com" })
   ```

---

### Session expires immediately

**Cause**: NEXTAUTH_SECRET mismatch or not set

**Solutions**:
1. Verify NEXTAUTH_SECRET is set
2. Ensure same secret across all environments
3. Clear browser cookies and try again

---

## Donation Issues

### "Something went wrong" on donation submission

**Common Causes**:
1. Database connection failed
2. Validation error
3. Email service error (non-blocking, shouldn't cause failure)

**Debug Steps**:
1. Open browser DevTools → Network tab
2. Submit donation and check response
3. Look for error message in response body
4. Check server logs

---

### UPI/Bank Transfer tab not opening

**Cause**: JavaScript error or component not rendering

**Solutions**:
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Check browser console for errors
4. Try different browser

---

### Razorpay popup not appearing

**Solutions**:
1. Check popup blocker - allow popups for the site
2. Verify RAZORPAY_KEY_ID is correct
3. Check browser console for Razorpay errors
4. Ensure Razorpay script loads (check Network tab)

---

### 80G checkbox not expanding

**Cause**: Component state issue

**Solutions**:
1. Refresh the page
2. Clear browser cache
3. Check if JavaScript is enabled
4. Try incognito/private mode

---

## Email Issues

### Emails not being sent

**Check 1**: Is Resend configured?
```bash
curl http://localhost:3000/api/debug/status
# Look for "resend": true
```

**Check 2**: Test email directly
```bash
curl -X POST http://localhost:3000/api/test/email \
  -H "Content-Type: application/json" \
  -d '{"type": "donation", "email": "your@email.com", "name": "Test"}'
```

**Check 3**: Resend dashboard
- Go to resend.com/emails
- Check if emails are being sent
- Look for errors or bounces

---

### Emails going to spam

**Solutions**:
1. Verify your domain in Resend dashboard
2. Add DNS records (SPF, DKIM, DMARC)
3. Use professional FROM address
4. Avoid spam trigger words in subject/body

---

### "Email skipped (no API key configured)"

**Cause**: RESEND_API_KEY not set

**Solution**:
1. Get API key from resend.com
2. Add to environment variables
3. Restart server/redeploy

---

## Payment Issues

### Razorpay test mode auto-confirming

**Expected Behavior**: When RAZORPAY_KEY_ID is not set, system runs in test mode

**For Real Payments**:
1. Get Razorpay live keys
2. Add to environment variables
3. Test with small amount first

---

### "Payment failed" error

**Common Causes**:
1. Card declined by bank
2. Network timeout
3. Invalid card details

**Solutions**:
1. Try different payment method
2. Check with bank for blocks
3. Verify card has sufficient balance

---

### Payment successful but donation not confirmed

**Cause**: Webhook not configured or signature verification failed

**Solutions**:
1. Configure webhook in Razorpay dashboard
2. Verify RAZORPAY_WEBHOOK_SECRET matches
3. Check webhook logs in Razorpay dashboard
4. Manually confirm via admin panel

---

## Admin Panel Issues

### "Admin Panel" not showing in menu

**Cause**: User doesn't have admin role

**Solutions**:
1. Check user role in database:
   ```javascript
   db.users.findOne({ email: "your@email.com" })
   ```

2. Update role if needed:
   ```javascript
   db.users.updateOne(
     { email: "your@email.com" },
     { $set: { role: "super_admin" } }
   )
   ```

3. Log out and log back in

---

### "You don't have permission" error

**Cause**: Role doesn't have required permissions

**Permission Matrix**:
| Action | Required Roles |
|--------|---------------|
| View donations | All admin roles |
| Confirm donations | ca, director, super_admin |
| Manage users | director, super_admin |
| System settings | super_admin |

---

### Admin page shows "0" for all stats

**Cause**: No data in database

**Solutions**:
1. Create some test donations first
2. Confirm at least one donation
3. Check database connection

---

## File Upload Issues

### Screenshot upload fails

**Solutions**:
1. Check file size (max 5MB)
2. Check file type (JPG, PNG only)
3. Verify Blob storage is connected
4. Check BLOB_READ_WRITE_TOKEN is set

---

### Uploaded image not displaying

**Cause**: File path issue or Blob not configured

**Solutions**:
1. Check browser console for 404 errors
2. Verify file was uploaded (check response)
3. Try re-uploading

---

## Database Issues

### "MongoNetworkError" or "ECONNREFUSED"

**Cause**: Cannot connect to MongoDB

**Solutions**:
1. Check MONGODB_URI format:
   ```
   mongodb+srv://username:password@cluster.xxxxx.mongodb.net/database?retryWrites=true&w=majority
   ```

2. Verify credentials are correct

3. Check MongoDB Atlas:
   - Cluster is running
   - IP whitelist includes your IP
   - User has database access

---

### "Duplicate key error"

**Cause**: Trying to create duplicate entry (usually email)

**Solutions**:
1. Use different email
2. Check if user already exists
3. Clear test data if needed

---

## Performance Issues

### Pages loading slowly

**Solutions**:
1. Check database indexes
2. Optimize MongoDB queries
3. Enable caching
4. Upgrade hosting plan

---

### Server timeout errors

**Solutions**:
1. Check long-running queries
2. Add pagination to lists
3. Optimize email sending (already async)
4. Consider connection pooling

---

## Common Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| "Unexpected token '<'" | API returning HTML error | Check server logs |
| "Network Error" | Cannot reach server | Check internet/server status |
| "401 Unauthorized" | Not logged in | Log in again |
| "403 Forbidden" | No permission | Check user role |
| "404 Not Found" | Resource doesn't exist | Verify URL/ID |
| "500 Internal Error" | Server crashed | Check server logs |

---

## Getting Help

### Collect Information
Before asking for help, gather:
1. Error message (exact text)
2. Browser console logs
3. Server logs (if available)
4. Steps to reproduce
5. Environment (local/production)

### Log Locations

**Vercel**: Dashboard → Project → Logs
**Self-hosted**: `pm2 logs vedicskills`
**Browser**: F12 → Console tab

---

## Reset Everything

### Clear All Test Data

```javascript
// WARNING: This deletes ALL data!
// Run in MongoDB Compass/Shell

db.donations.deleteMany({})
db.users.deleteMany({})
db.receipts.deleteMany({})
db.memberships.deleteMany({})
db.counters.deleteMany({})
```

### Fresh Start

1. Delete all data (above)
2. Create new admin: `POST /api/admin/seed`
3. Test registration
4. Test donation flow
