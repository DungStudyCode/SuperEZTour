const hanoiRoutes = new Set(['/destinations/ha-noi', '/destinations/hanoi']);
const sources = new Set(['hero', 'destination-header', 'cinematic-ending', 'ending-cta-quote', 'travel-theme']);

export function syntheticPolicy(draft, entry, env = import.meta.env) {
  if (!env?.DEV || env.VITE_HANOI_SYNTHETIC_INTAKE !== 'true'
      || !/^synthetic-[a-z0-9-]{1,60}$/.test(env.VITE_HANOI_SYNTHETIC_POLICY || '')
      || draft?.destinationId !== 'ha-noi' || entry?.destinationId !== 'ha-noi'
      || !hanoiRoutes.has(draft.entry?.route) || !hanoiRoutes.has(entry.route)
      || !sources.has(draft.entry?.source) || !sources.has(entry.source)) return null;
  const methods = (env.VITE_HANOI_SYNTHETIC_CONTACT_METHODS || '').split(',');
  if (methods.some((method) => !['phone', 'email'].includes(method))) return null;
  return { policyVersion: env.VITE_HANOI_SYNTHETIC_POLICY, verified: { phone: methods.includes('phone'), email: methods.includes('email'), kakao: false } };
}
