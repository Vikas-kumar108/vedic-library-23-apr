# DATA_MODEL.md

--------------------------------------------------
1. OVERVIEW
--------------------------------------------------
Defines database schema and relationships.

Database:
MongoDB (via Mongoose)

--------------------------------------------------
2. USER MODEL
--------------------------------------------------

Fields:
- _id
- name
- email (unique)
- phone
- password
- role (user | admin)
- isMember
- createdAt

--------------------------------------------------
3. DONATION MODEL
--------------------------------------------------

Fields:
- _id
- userId (ref User)
- amount
- method (UPI | Bank)
- status (pending | confirmed)
- transactionRef (optional)
- isPublic (boolean)
- createdAt

--------------------------------------------------
4. MEMBERSHIP MODEL
--------------------------------------------------

Fields:
- _id
- userId (ref User)
- tier (Sevak | Yajman | Patron)
- monthlyAmount
- status (active | paused | cancelled)
- startDate
- lastPaymentDate
- nextDueDate
- paymentMethod

--------------------------------------------------
5. RECEIPT MODEL
--------------------------------------------------

Fields:
- _id
- donationId (ref Donation)
- receiptNumber
- issuedDate
- pdfUrl (base64 or cloud link)

--------------------------------------------------
6. COUNTER MODEL
--------------------------------------------------

Purpose:
Generate sequential receipt numbers

Fields:
- name (e.g. "receipt")
- value (number)

--------------------------------------------------
7. RELATIONSHIPS
--------------------------------------------------

User → Donations (1:N)

User → Membership (1:1)

Donation → Receipt (1:1)

--------------------------------------------------
8. DATA FLOW
--------------------------------------------------

User creates donation →
Donation stored →
Admin confirms →
Receipt generated →
Receipt linked to donation →
User accesses via dashboard

--------------------------------------------------
END OF FILE
--------------------------------------------------