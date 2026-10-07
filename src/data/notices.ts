import type { Notice } from "@/lib/types";

/**
 * Sample notices demonstrate each priority level. They are labelled as
 * samples in the UI until replaced from /admin/notices.
 */
export const notices: Notice[] = [
  {
    id: "ntc-water-maintenance",
    slug: "water-maintenance",
    title: "Water maintenance in parts of Mhinga",
    summary:
      "Water maintenance is currently taking place in parts of Mhinga. Some households may experience low pressure or no supply. Store water where possible.",
    body: "Affected sections, expected restoration time and tanker points will be confirmed by the responsible water authority. Report outages that continue for more than 24 hours using the Report a Problem form.",
    level: "important",
    category: "Water",
    areas: ["Sections to be confirmed"],
    publishedAt: "2026-10-06",
    expiresAt: "2026-10-12",
    link: "/municipal-services#water",
    isSample: true,
  },
  {
    id: "ntc-nsfas-reminder",
    slug: "nsfas-applications",
    title: "Matriculants: plan your NSFAS application early",
    summary: "Grade 12 learners who need funding for 2027 should prepare their documents now and apply as soon as the window opens.",
    level: "information",
    category: "Education",
    publishedAt: "2026-10-01",
    link: "/how-to/apply-for-nsfas",
    isSample: true,
  },
  {
    id: "ntc-cleanup",
    slug: "community-clean-up",
    title: "Community clean-up day",
    summary: "Residents are invited to join a community clean-up. Bring gloves and water — refuse bags will be provided.",
    level: "event",
    category: "Community",
    publishedAt: "2026-10-04",
    expiresAt: "2026-10-25",
    link: "/events/community-clean-up-day",
    isSample: true,
  },
  {
    id: "ntc-storm",
    slug: "severe-weather",
    title: "Severe thunderstorm warning",
    summary:
      "Example of an emergency notice. Stay indoors during storms, avoid crossing flooded roads and low-water bridges, and call 112 in an emergency.",
    level: "emergency",
    category: "Safety",
    publishedAt: "2026-10-05",
    expiresAt: "2026-10-06",
    isSample: true,
  },
];
