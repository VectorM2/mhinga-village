import type { AdminUser, DirectoryPlace, GalleryItem, PlaceCategory, ServiceReport, Story } from "@/lib/types";
import { images } from "@/lib/site";
import { localVerified, TO_CONFIRM } from "./verification";

/* ---------- Explore directory ---------- */

export const places: DirectoryPlace[] = [
  { id: "pl-sunduza", name: "Sunduza Primary School", category: "schools", description: "Grade R – 6", location: { label: "Zone 3 — next to Mbhoko shop, road to Lambani" }, href: "/education/sunduza-primary-school", verification: localVerified() },
  { id: "pl-mhinga-primary", name: "Mhinga Primary School", category: "schools", description: "Grade 7 only", location: { label: "Zone 3 — next to Mbhoko shop, road to Lambani" }, href: "/education/mhinga-primary-school", verification: localVerified() },
  { id: "pl-nkhavi", name: "Nkhavi Primary School", category: "schools", description: "Grade R – 7", location: { label: "Mhinga Zone 2" }, href: "/education/nkhavi-primary-school", verification: localVerified() },
  { id: "pl-rhangani", name: "Rhangani Primary School", category: "schools", description: "Grade R – 6", location: { label: "Mhinga Zone 3" }, href: "/education/rhangani-primary-school", verification: localVerified() },
  { id: "pl-ripambeta", name: "Ripambeta Secondary School", category: "schools", description: "Grade 8 – 12", location: { label: "Mhinga Zone 3" }, href: "/education/ripambeta-secondary-school", verification: localVerified() },
  { id: "pl-special", name: "Special Needs School", category: "schools", description: "Next to Mhinga Clinic — name to be confirmed", location: { label: "Main road towards Kruger National Park" }, href: "/education/mhinga-special-needs-school", verification: { status: "unverified", source: "Location confirmed; name to be confirmed" } },
  { id: "pl-clinic", name: "Mhinga Clinic", category: "clinics", description: "Primary healthcare clinic", location: { label: "Main road towards Kruger, beside the special needs school" }, href: "/services/mhinga-clinic", verification: localVerified() },
  { id: "pl-hospital", name: "Malamulele Hospital", category: "clinics", description: "District hospital", location: { label: "Malamulele" }, href: "/services/malamulele-hospital", verification: localVerified() },
  { id: "pl-police", name: "Police station serving Mhinga", category: "police", description: "Station name and address to be confirmed", location: { label: "To be confirmed" }, href: "/services/police", verification: TO_CONFIRM },
  { id: "pl-ta", name: "Mhinga Traditional Authority", category: "government", description: "Led by Hosi Shilungwa Mhinga II", location: { label: "Zone 2 — near the EPCSA Mission Station" }, href: "/services/traditional-authority", verification: localVerified() },
  { id: "pl-municipality", name: "Collins Chabane Municipality", category: "government", description: "Ward 31 · offices in Malamulele", location: { label: "Malamulele" }, href: "/services/collins-chabane-municipality", verification: localVerified() },
  { id: "pl-hall", name: "Community Hall", category: "halls", description: "Venue for meetings and events", location: { label: "To be confirmed" }, verification: TO_CONFIRM },
  { id: "pl-epcsa", name: "EPCSA Mission Station", category: "churches", description: "Evangelical Presbyterian Church mission station", location: { label: "Mhinga Zone 2" }, verification: localVerified() },
  { id: "pl-church", name: "Other churches & places of worship", category: "churches", description: "Listings to be added by congregations", location: { label: "Various" }, verification: TO_CONFIRM },
  { id: "pl-mbhoko", name: "Mbhoko Shop", category: "shops", description: "Landmark shop next to Sunduza and Mhinga Primary schools", location: { label: "Zone 3 — road to Lambani" }, verification: localVerified() },
  { id: "pl-shops", name: "Shops & spaza shops", category: "shops", description: "See the Support Local directory", location: { label: "Various" }, href: "/businesses?category=retail", verification: TO_CONFIRM },
  { id: "pl-food", name: "Places to eat", category: "restaurants", description: "See food businesses in the Support Local directory", location: { label: "Various" }, href: "/businesses?category=food", verification: TO_CONFIRM },
  { id: "pl-biz", name: "Local businesses", category: "businesses", description: "Browse all registered local businesses", location: { label: "Various" }, href: "/businesses", verification: TO_CONFIRM },
  { id: "pl-sports", name: "Sports ground", category: "sports", description: "Football and community sport", location: { label: "To be confirmed" }, verification: TO_CONFIRM },
  { id: "pl-atm", name: "Nearest ATMs", category: "atms", description: "ATM locations to be mapped", location: { label: "To be confirmed" }, verification: TO_CONFIRM },
  { id: "pl-taxi", name: "Taxi rank / pick-up points", category: "taxi", description: "Routes and pick-up points to be mapped", location: { label: "To be confirmed" }, verification: TO_CONFIRM },
  { id: "pl-landmark", name: "Important landmarks", category: "landmarks", description: "Heritage sites and landmarks to be added with the community", location: { label: "To be confirmed" }, href: "/about", verification: TO_CONFIRM },
];

export const placeCategoryMeta: Record<PlaceCategory, string> = {
  schools: "Schools",
  clinics: "Clinics & hospitals",
  police: "Police",
  government: "Government offices",
  halls: "Community halls",
  churches: "Churches",
  shops: "Shops",
  restaurants: "Restaurants",
  businesses: "Businesses",
  sports: "Sports grounds",
  atms: "ATMs",
  taxi: "Taxi ranks",
  landmarks: "Landmarks",
};

/* ---------- People of Mhinga ---------- */

const storyNote = "This is a sample story showing how community profiles will look. Real stories will be published with the person's consent.";

export const stories: Story[] = [
  {
    id: "st-teacher",
    slug: "the-teacher",
    name: "Our Teachers",
    role: "Teacher",
    headline: "Opening doors, one classroom at a time",
    excerpt: "The people who stay late to help with homework, coach the soccer team and believe in every learner.",
    image: images.school,
    tags: ["Education"],
    publishedAt: "2026-09-30",
    isSample: true,
    body: [
      { type: "callout", tone: "info", text: storyNote },
      { type: "paragraph", text: "Every village has teachers who give far more than the timetable asks. This story will feature a teacher from Mhinga — what drew them to teaching, the challenges of rural classrooms and the moments that make it worthwhile." },
      { type: "quote", text: "A space for a quote in the teacher's own words." },
    ],
  },
  {
    id: "st-farmer",
    slug: "the-farmer",
    name: "Our Farmers",
    role: "Farmer",
    headline: "Feeding families from the land",
    excerpt: "Growing vegetables, raising livestock and passing on knowledge through the seasons.",
    image: images.fields,
    tags: ["Agriculture"],
    publishedAt: "2026-09-24",
    isSample: true,
    body: [
      { type: "callout", tone: "info", text: storyNote },
      { type: "paragraph", text: "This story will feature a local farmer — what they grow, how they manage water in dry seasons, and their advice for young people interested in agriculture." },
    ],
  },
  {
    id: "st-entrepreneur",
    slug: "the-entrepreneur",
    name: "Our Entrepreneurs",
    role: "Entrepreneur",
    headline: "Building businesses close to home",
    excerpt: "From spaza shops to salons and tech services — creating jobs right here in Mhinga.",
    image: images.market,
    tags: ["Business"],
    publishedAt: "2026-09-18",
    isSample: true,
    body: [
      { type: "callout", tone: "info", text: storyNote },
      { type: "paragraph", text: "This story will feature a local business owner — how they started, what they've learned and how the community can support them." },
    ],
  },
  {
    id: "st-student",
    slug: "the-student",
    name: "Our Students",
    role: "Student",
    headline: "The first in the family to go to university",
    excerpt: "Young people from Mhinga studying across the country — and planning to give back.",
    image: images.hills,
    tags: ["Youth", "Education"],
    publishedAt: "2026-09-12",
    isSample: true,
    body: [
      { type: "callout", tone: "info", text: storyNote },
      { type: "paragraph", text: "This story will feature a student from Mhinga — their path from local school to university or college, how they funded their studies and their advice for matriculants." },
    ],
  },
  {
    id: "st-leader",
    slug: "the-community-leader",
    name: "Our Community Leaders",
    role: "Community leader",
    headline: "Holding the community together",
    excerpt: "The organisers, volunteers and elders who show up when it matters.",
    image: images.gathering,
    tags: ["Community"],
    publishedAt: "2026-09-06",
    isSample: true,
    body: [{ type: "callout", tone: "info", text: storyNote }],
  },
  {
    id: "st-athlete",
    slug: "the-athlete",
    name: "Our Athletes",
    role: "Athlete",
    headline: "Talent on the dusty pitch",
    excerpt: "Footballers, runners and netball players carrying Mhinga's name onto bigger fields.",
    image: images.sports,
    tags: ["Sport", "Youth"],
    publishedAt: "2026-08-30",
    isSample: true,
    body: [{ type: "callout", tone: "info", text: storyNote }],
  },
];

/* ---------- Gallery ---------- */

export const gallery: GalleryItem[] = [
  { id: "g1", title: "Hills at sunset", category: "nature", image: images.hero, aspect: "landscape" },
  { id: "g2", title: "Morning over the valley", category: "nature", image: images.hills, aspect: "portrait" },
  { id: "g3", title: "Homes at dusk", category: "community", image: images.village, aspect: "square" },
  { id: "g4", title: "Market day", category: "community", image: images.market, aspect: "landscape" },
  { id: "g5", title: "School grounds", category: "schools", image: images.school, aspect: "portrait" },
  { id: "g6", title: "Under the tree", category: "culture", image: images.gathering, aspect: "landscape" },
  { id: "g7", title: "Match day", category: "sports", image: images.sports, aspect: "square" },
  { id: "g8", title: "Fields after the rain", category: "nature", image: images.fields, aspect: "portrait" },
  { id: "g9", title: "River valley", category: "nature", image: images.river, aspect: "landscape" },
  { id: "g10", title: "Community gathering", category: "events", image: images.gathering, aspect: "portrait" },
  { id: "g11", title: "Old photographs — to be collected", category: "history", image: images.village, aspect: "landscape" },
];

/* ---------- Reports (admin mock) ---------- */

export const reports: ServiceReport[] = [
  { id: "r1", reference: "MH-2026-48213", category: "water", description: "No water for three days in our section. Neighbours affected too.", location: "Near the primary school", reporterName: "Resident", reporterContact: "—", status: "in_progress", assignedTo: "Water desk", internalNotes: [{ author: "Community Manager", at: "2026-10-05T09:12:00+02:00", text: "Forwarded to water authority." }], createdAt: "2026-10-04T08:40:00+02:00" },
  { id: "r2", reference: "MH-2026-48190", category: "streetlights", description: "Streetlight at the junction has been off for weeks.", location: "Main road junction", status: "assigned", assignedTo: "Infrastructure desk", internalNotes: [], createdAt: "2026-10-03T19:05:00+02:00" },
  { id: "r3", reference: "MH-2026-48122", category: "waste", description: "Illegal dumping next to the river path.", location: "River path", status: "submitted", internalNotes: [], createdAt: "2026-10-06T14:22:00+02:00" },
  { id: "r4", reference: "MH-2026-47988", category: "roads", description: "Large pothole after the rains, cars swerving.", location: "Road to Malamulele", status: "resolved", assignedTo: "Infrastructure desk", internalNotes: [{ author: "Editor", at: "2026-09-29T10:00:00+02:00", text: "Repaired according to resident follow-up." }], createdAt: "2026-09-21T07:10:00+02:00" },
  { id: "r5", reference: "MH-2026-48230", category: "electricity", description: "Transformer making noise and sparks.", location: "Section near the clinic", status: "submitted", internalNotes: [], createdAt: "2026-10-07T06:50:00+02:00" },
];

export const adminUsers: AdminUser[] = [
  { id: "u1", name: "Site Owner", email: "admin@mhinga.co.za", role: "super_admin", lastActiveAt: "2026-10-07T08:00:00+02:00" },
  { id: "u2", name: "News Editor", email: "editor@mhinga.co.za", role: "editor", lastActiveAt: "2026-10-06T16:30:00+02:00" },
  { id: "u3", name: "Community Manager", email: "community@mhinga.co.za", role: "community_manager", lastActiveAt: "2026-10-07T07:15:00+02:00" },
];
