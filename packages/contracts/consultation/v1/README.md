# Consultation API v1

`POST /api/v1/leads` accepts JSON using [the request schema](request.schema.json), with an opaque `Idempotency-Key` header of 16–128 ASCII letters, digits, underscores or hyphens. Send a cryptographically random key per immutable attempt. The draft `requestId` is separate and is neither the attempt key nor the receipt.

The server returns [a receipt](receipt.schema.json) after commit. **201** is new and **200** replays that receipt. **400** covers malformed JSON, unsupported schema version and invalid attempt keys. **409** means the same key was used for different content. **413/415** enforce size and media type. **422** describes schema/domain issues using field paths and stable codes. **429/503** provide retry guidance through `Retry-After`; **500** is an unexpected failure. See [the error schema](error.schema.json). Responses are `no-store`. There is no public receipt lookup.

The current catalog accepts Hà Nội only. Route and source are client-reported attribution, locale is UI language, and market is server-derived. Dates are date-only and checked for new leads in Seoul time. Guests and duration are bounded technical integers. Contact is exactly one method; the synthetic policy permits configured phone/email. Kakao is gated and Zalo is excluded.

[Synthetic example](synthetic.json) is for isolated testing. Task 03.2 may adopt these schemas without changing the V1 envelope. Preserve key and immutable payload across ambiguous failure and only display success from a genuine receipt.
