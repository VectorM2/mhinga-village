/**
 * Reference "now" used by the mock data so deadlines and upcoming events stay
 * meaningful during development. In production set NEXT_PUBLIC_FIXED_NOW to
 * empty (the default below falls back to the real clock when it's unset).
 */
const fixed = process.env.NEXT_PUBLIC_FIXED_NOW ?? "2026-10-07T12:00:00+02:00";
export const NOW = fixed ? new Date(fixed) : new Date();
