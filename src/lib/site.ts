/**
 * Site-wide configuration. Anything a community administrator might want to
 * change without touching components lives here (or later in the
 * `site_settings` table — see supabase/schema.sql).
 */

export const siteConfig = {
  name: "Mhinga",
  tagline: "Our Home. Our Community. Our Future.",
  description:
    "Discover Mhinga community services, schools, bursaries, opportunities, news, events and important local information.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mhinga.co.za",
  locale: "en_ZA",
  location: "Mhinga, Limpopo, South Africa",
  /** Leave false until a recognised authority formally operates the site. */
  isOfficial: false,
  contactEmail: "hello@mhinga.co.za",
  /**
   * Map settings. Set `center` once the village coordinates are confirmed —
   * the Explore page then renders a live OpenStreetMap embed (no API key).
   * Mapbox / Google Maps can be added in src/components/shared/map-view.tsx.
   */
  map: {
    center: null as null | { lat: number; lng: number },
    zoom: 14,
    searchQuery: "Mhinga, Limpopo, South Africa",
  },
  social: {
    facebook: "",
    whatsappChannel: "",
    instagram: "",
  },
} as const;

/**
 * Single place to swap illustrated placeholders for real photography.
 * Drop real photos into /public/images (or Supabase Storage) and update these.
 */
export const images = {
  hero: { src: "/images/hero-landscape.svg", alt: "Illustration of hills and baobab trees at sunset — placeholder for a photograph of Mhinga" },
  hills: { src: "/images/hills-morning.svg", alt: "Illustration of green hills in the morning" },
  village: { src: "/images/village-dusk.svg", alt: "Illustration of village homes at dusk" },
  fields: { src: "/images/fields.svg", alt: "Illustration of farmed fields" },
  river: { src: "/images/river-valley.svg", alt: "Illustration of a river valley" },
  market: { src: "/images/market.svg", alt: "Illustration of market stalls" },
  school: { src: "/images/school-grounds.svg", alt: "Illustration of a school building" },
  gathering: { src: "/images/gathering.svg", alt: "Illustration of people gathered under a tree" },
  sports: { src: "/images/sports-field.svg", alt: "Illustration of a sports field" },
} as const;

export type ImageKey = keyof typeof images;

export const emergencyNumbers = [
  { label: "Police (SAPS)", number: "10111", description: "Crime, danger or violence in progress", tone: "police" },
  { label: "Ambulance / EMS", number: "10177", description: "Medical emergencies and ambulance", tone: "medical" },
  { label: "Emergency (any network)", number: "112", description: "Works from any cellphone, even without airtime", tone: "general" },
] as const;

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNav: NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Health & Clinics", href: "/services?category=health", description: "Clinics, hospitals and health support" },
      { label: "Water & Municipal", href: "/municipal-services", description: "Water, electricity, roads and waste" },
      { label: "Land & Housing", href: "/land-housing", description: "How land and housing applications work" },
      { label: "Report a Problem", href: "/report", description: "Tell us about a service issue" },
      { label: "How do I…?", href: "/how-to", description: "Step-by-step guides" },
    ],
  },
  { label: "Education", href: "/education" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "News", href: "/news" },
  {
    label: "Community",
    href: "/explore",
    children: [
      { label: "Explore Mhinga", href: "/explore", description: "Places and services near you" },
      { label: "Events", href: "/events", description: "What's on in the community" },
      { label: "Support Local", href: "/businesses", description: "Local business directory" },
      { label: "Youth Hub", href: "/youth", description: "Bursaries, jobs, skills and sport" },
      { label: "Agriculture", href: "/agriculture", description: "Farming resources and support" },
      { label: "People of Mhinga", href: "/stories", description: "Stories from our community" },
      { label: "Gallery", href: "/gallery", description: "Photos of Mhinga" },
    ],
  },
  { label: "About", href: "/about" },
];

export const footerNav = {
  explore: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Education", href: "/education" },
    { label: "Opportunities", href: "/opportunities" },
    { label: "News", href: "/news" },
    { label: "Events", href: "/events" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  community: [
    { label: "Youth Hub", href: "/youth" },
    { label: "Businesses", href: "/businesses" },
    { label: "Agriculture", href: "/agriculture" },
    { label: "Gallery", href: "/gallery" },
    { label: "How To", href: "/how-to" },
    { label: "People of Mhinga", href: "/stories" },
    { label: "Report a Problem", href: "/report" },
  ],
};
