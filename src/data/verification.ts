import type { Verification } from "@/lib/types";

/** Shared verification presets used by the mock data. */

export const TO_CONFIRM: Verification = {
  status: "unverified",
  source: "Placeholder — information to be confirmed by a community administrator",
};

export const nationalSource = (source: string, sourceUrl?: string): Verification => ({
  status: "unverified",
  source,
  sourceUrl,
});

export const publicListing = (source: string, sourceUrl?: string): Verification => ({
  status: "unverified",
  source: `Name from public listing (${source}) — contact details to be confirmed`,
  sourceUrl,
});

/** Only used for the three national emergency numbers supplied during setup. */
export const VERIFIED_SETUP: Verification = {
  status: "verified",
  verifiedBy: "Site setup",
  verifiedAt: "2026-10-07",
  source: "National emergency numbers",
};

/** Confirmed from local knowledge by a community administrator. */
export const localVerified = (source = "Confirmed by community administrator (local knowledge)", sourceUrl?: string): Verification => ({
  status: "verified",
  verifiedBy: "Community administrator",
  verifiedAt: "2026-10-07",
  source,
  sourceUrl,
});
