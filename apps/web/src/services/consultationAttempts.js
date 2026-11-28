async function sendOnce(attempt) {
  const { submitConsultationAttempt } = await import('./consultationApiService.js');
  return submitConsultationAttempt(attempt);
}

export const retryable = new Set(['unknown', 'unavailable', 'limited']);
export const locksDraft = (state) => ['submitting', 'success', 'conflict'].includes(state) || retryable.has(state);

export function createConsultationAttempts({ publish, accepted, transport = sendOnce, key = () => crypto.randomUUID(), now = Date.now }) {
  const active = new Map();
  function update(id, value) {
    if (value) active.set(id, value);
    else active.delete(id);
    // Only presentation metadata leaves the coordinator. The serialized body stays in its closure.
    if (!value) publish(id, null);
    else {
      const { key: _key, body: _body, ...presentation } = value;
      publish(id, presentation);
    }
  }
  async function send(id, attempt) {
    const running = Object.freeze({ ...attempt, state: 'submitting' });
    update(id, running);
    let result;
    try { result = await transport(running); }
    catch { result = { state: 'unknown' }; }
    if (active.get(id) !== running) return;
    if (result.state === 'success') {
      update(id, { state: 'success', receipt: result.receipt });
      accepted(id, running.draftId);
    } else if (['validation', 'rejected'].includes(result.state) && !running.possiblyCommitted) {
      update(id, { ...result, draftId: running.draftId });
    } else if (['validation', 'rejected'].includes(result.state)) {
      // This retry was rejected, but a previous request could have persisted.
      update(id, { ...running, state: 'unknown', requestId: result.requestId });
    } else {
      update(id, {
        ...running, ...result,
        possiblyCommitted: running.possiblyCommitted || result.state === 'unknown' || result.state === 'unavailable',
      });
    }
  }
  return {
    submit(id, payload) {
      if (locksDraft(active.get(id)?.state)) return;
      return send(id, { key: key(), draftId: payload.requestId, body: JSON.stringify(payload) });
    },
    retry(id) {
      const attempt = active.get(id);
      if (!retryable.has(attempt?.state) || (attempt.retryAt && attempt.retryAt > now())) return;
      return send(id, attempt);
    },
    canEdit(id) { return !locksDraft(active.get(id)?.state); },
    reset(id) {
      if (active.get(id)?.state === 'submitting') return false;
      update(id, null);
      return true;
    },
  };
}
