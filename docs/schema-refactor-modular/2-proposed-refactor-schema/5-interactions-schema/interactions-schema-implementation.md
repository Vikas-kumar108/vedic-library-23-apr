# Implementation-Ready Schema: Interactions Domain (`interactions`)

This document provides the complete, production-grade PostgreSQL Data Definition Language (DDL) for the newly isolated `interactions` schema. 

This schema serves as the **Communication and Outreach Layer**, decoupled from core operational domains to absorb high-volume asynchronous logging (like email sends and marketing tracking) without causing lock contention.

---

## 1. Schema Initialization

```sql
-- Create the dedicated schema for Interactions
CREATE SCHEMA IF NOT EXISTS interactions;
```

---

## 2. Enum Definitions

These custom PostgreSQL types establish strict states for messaging, support, and marketing campaigns.

```sql
-- Messaging & Support Enums
CREATE TYPE interactions.conversation_type_enum AS ENUM (
    'P2P',
    'GROUP',
    'SUPPORT'
);

CREATE TYPE interactions.ticket_status_enum AS ENUM (
    'OPEN',
    'IN_PROGRESS',
    'RESOLVED',
    'CLOSED'
);

-- Campaigns & Communication Enums
CREATE TYPE interactions.campaign_status_enum AS ENUM (
    'DRAFT',
    'SCHEDULED',
    'SENT',
    'FAILED',
    'CANCELLED'
);

CREATE TYPE interactions.communication_channel_enum AS ENUM (
    'EMAIL',
    'SMS',
    'WHATSAPP',
    'PUSH',
    'IN_APP'
);

CREATE TYPE interactions.communication_status_enum AS ENUM (
    'DRAFT',
    'QUEUED',
    'SENT',
    'DELIVERED',
    'FAILED',
    'OPENED',
    'CLICKED'
);

-- Outreach Enums
CREATE TYPE interactions.lead_status_enum AS ENUM (
    'NEW',
    'CONTACTED',
    'QUALIFIED',
    'CONVERTED',
    'LOST'
);

CREATE TYPE interactions.engagement_type_enum AS ENUM (
    'OPEN',
    'CLICK',
    'REPLY',
    'UNSUBSCRIBE'
);
```

---

## 3. Messaging & Support Subdomain

### 3.1. `conversations` & `conversation_participants`
```sql
CREATE TABLE interactions.conversations (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    topic text,
    type interactions.conversation_type_enum NOT NULL,
    status text DEFAULT 'ACTIVE',
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE interactions.conversation_participants (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    conversation_id uuid NOT NULL REFERENCES interactions.conversations(id) ON DELETE CASCADE,
    
    -- Cross-Domain Reference to Identity Schema
    user_id uuid NOT NULL, 
    
    joined_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_read_at timestamp(3) without time zone,
    
    CONSTRAINT uq_conversation_user UNIQUE (conversation_id, user_id)
);
```

### 3.2. `messages`
```sql
CREATE TABLE interactions.messages (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    conversation_id uuid NOT NULL REFERENCES interactions.conversations(id) ON DELETE CASCADE,
    
    -- Cross-Domain Reference to Identity Schema (The sender)
    sender_id uuid NOT NULL, 
    
    content text NOT NULL,
    message_type text DEFAULT 'TEXT', -- 'TEXT', 'SYSTEM', 'ATTACHMENT'
    
    -- If it's an attachment, point outwardly to Media/DAM
    attachment_file_id uuid,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 3.3. `support_tickets`
```sql
CREATE TABLE interactions.support_tickets (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    
    -- The metadata wrapper pointing to the actual message thread
    conversation_id uuid NOT NULL REFERENCES interactions.conversations(id),
    
    -- Cross-Domain References
    user_id uuid NOT NULL, -- The user who opened the ticket
    assigned_to_id uuid,   -- The support staff assigned
    
    subject text NOT NULL,
    description text NOT NULL,
    status interactions.ticket_status_enum DEFAULT 'OPEN'::interactions.ticket_status_enum,
    priority text DEFAULT 'MEDIUM',
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

---

## 4. Campaigns & Notifications Subdomain

### 4.1. `notifications`
```sql
CREATE TABLE interactions.notifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    
    -- Cross-Domain Reference
    user_id uuid NOT NULL,
    
    type text NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    action_url text,
    
    is_read boolean DEFAULT false NOT NULL,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 4.2. `campaigns` & `communication_logs`
```sql
CREATE TABLE interactions.campaigns (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    title text NOT NULL,
    content text NOT NULL,
    
    status interactions.campaign_status_enum DEFAULT 'DRAFT'::interactions.campaign_status_enum,
    language text DEFAULT 'en',
    
    scheduled_at timestamp(3) without time zone,
    sent_at timestamp(3) without time zone,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE interactions.communication_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    
    campaign_id uuid REFERENCES interactions.campaigns(id) ON DELETE SET NULL,
    
    channel interactions.communication_channel_enum NOT NULL,
    recipient text NOT NULL, -- Email address or phone number
    
    -- Cross-Domain References (if applicable)
    user_id uuid, 
    
    status interactions.communication_status_enum DEFAULT 'QUEUED'::interactions.communication_status_enum,
    external_provider_id text, -- e.g., SendGrid/Twilio message ID
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

---

## 5. Leads & Outreach Subdomain

### 5.1. `leads` & `subscribers`
```sql
CREATE TABLE interactions.leads (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    email text UNIQUE,
    phone text UNIQUE,
    first_name text,
    last_name text,
    
    status interactions.lead_status_enum DEFAULT 'NEW'::interactions.lead_status_enum,
    source text,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE interactions.subscribers (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    email text NOT NULL UNIQUE,
    is_active boolean DEFAULT true NOT NULL,
    
    subscribed_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    unsubscribed_at timestamp(3) without time zone
);
```

### 5.2. `engagement_logs`
```sql
CREATE TABLE interactions.engagement_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    
    communication_log_id uuid NOT NULL REFERENCES interactions.communication_logs(id) ON DELETE CASCADE,
    
    -- Optional references depending on who engaged
    user_id uuid,
    lead_id uuid REFERENCES interactions.leads(id) ON DELETE CASCADE,
    
    engagement_type interactions.engagement_type_enum NOT NULL,
    
    timestamp timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

---

## 6. Summary of Key Decisions

*   **Insert-Heavy Isolation:** Tables like `communication_logs` and `engagement_logs` can grow massively (e.g., millions of rows from a single email blast). Keeping them in this isolated schema ensures routine database maintenance (vacuuming, indexing) doesn't degrade performance for critical domains like Identity or Knowledge.
*   **Virtual Schema Independence:** As with all other domains, cross-schema references (`user_id`, `attachment_file_id`) are implemented as standard `uuid` columns. There are no hard PostgreSQL foreign key constraints pointing to `identity.users` or `media.file_assets`.
*   **Unified Support Architecture:** By linking `support_tickets` natively to the new `conversations` and `messages` tables, the system avoids reinventing a chat thread system specifically for tickets. A ticket simply acts as metadata on top of a standard messaging thread.
