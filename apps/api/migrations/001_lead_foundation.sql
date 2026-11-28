CREATE TABLE superez_leads.leads (
  id uuid PRIMARY KEY,
  public_reference text NOT NULL CONSTRAINT leads_reference_unique UNIQUE CHECK (public_reference ~ '^SEZ-[A-F0-9]{32}$'),
  schema_version integer NOT NULL CHECK (schema_version = 1),
  market text NOT NULL DEFAULT 'KR' CHECK (market = 'KR'),
  locale text NOT NULL CHECK (locale IN ('ko', 'vi')),
  destination_id text NOT NULL,
  source text NOT NULL,
  entry_route text NOT NULL,
  departure_status text NOT NULL,
  departure_date date,
  duration_status text NOT NULL,
  duration_days integer,
  adults integer NOT NULL CHECK (adults BETWEEN 1 AND 999),
  children integer NOT NULL CHECK (children BETWEEN 0 AND 999),
  itinerary_id text,
  preferences jsonb NOT NULL CHECK (jsonb_typeof(preferences) = 'object'),
  status text NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW','CONTACTED','CONSULTING','QUOTED','CONFIRMED','CLOSED')),
  closure_reason text,
  assignee_id uuid,
  received_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  record_version integer NOT NULL DEFAULT 1 CHECK (record_version > 0),
  CHECK ((departure_status = 'undecided' AND departure_date IS NULL)
      OR (departure_status = 'exact' AND departure_date IS NOT NULL)),
  CHECK ((duration_status = 'undecided' AND duration_days IS NULL)
      OR (duration_status = 'fixed' AND duration_days IS NOT NULL AND duration_days BETWEEN 1 AND 999)),
  CHECK ((status = 'CLOSED') = (closure_reason IS NOT NULL))
);

CREATE TABLE superez_leads.lead_private (
  lead_id uuid PRIMARY KEY REFERENCES superez_leads.leads(id) ON DELETE CASCADE,
  customer_name text NOT NULL CHECK (char_length(customer_name) BETWEEN 1 AND 100),
  contact_method text NOT NULL CHECK (contact_method IN ('phone','email','kakao')),
  contact_value text NOT NULL CHECK (char_length(contact_value) BETWEEN 1 AND 254),
  special_requests text CHECK (char_length(special_requests) <= 1000)
);

CREATE TABLE superez_leads.consent_receipts (
  lead_id uuid PRIMARY KEY REFERENCES superez_leads.leads(id) ON DELETE CASCADE,
  policy_version text NOT NULL,
  accepted boolean NOT NULL CHECK (accepted),
  accepted_at timestamptz NOT NULL,
  locale text NOT NULL CHECK (locale IN ('ko','vi'))
);

CREATE TABLE superez_leads.lead_idempotency (
  scope text NOT NULL,
  attempt_key text NOT NULL,
  payload_digest text NOT NULL CHECK (payload_digest ~ '^[a-f0-9]{64}$'),
  lead_id uuid NOT NULL UNIQUE REFERENCES superez_leads.leads(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  PRIMARY KEY (scope, attempt_key)
);

CREATE TABLE superez_leads.lead_activity (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  lead_id uuid NOT NULL REFERENCES superez_leads.leads(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  actor_id uuid,
  from_status text,
  to_status text,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

CREATE TABLE superez_leads.notification_outbox (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  lead_id uuid NOT NULL REFERENCES superez_leads.leads(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  event_version integer NOT NULL CHECK (event_version > 0),
  event_key text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','PROCESSING','DELIVERED','RETRY','EXHAUSTED')),
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  next_attempt_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  attempt_count integer NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
  last_error_code text
);

CREATE INDEX leads_status_recent ON superez_leads.leads (status, received_at DESC, id);
CREATE INDEX leads_assignee_recent ON superez_leads.leads (assignee_id, status, received_at DESC);
CREATE INDEX leads_destination_recent ON superez_leads.leads (destination_id, received_at DESC);
CREATE INDEX lead_activity_history ON superez_leads.lead_activity (lead_id, created_at, id);
CREATE INDEX outbox_ready ON superez_leads.notification_outbox (next_attempt_at, id) WHERE status IN ('PENDING','RETRY');

REVOKE ALL ON ALL TABLES IN SCHEMA superez_leads FROM PUBLIC;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA superez_leads FROM PUBLIC;
