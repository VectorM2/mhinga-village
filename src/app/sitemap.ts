import type { MetadataRoute } from "next";
import { getBusinesses, getEvents, getGuides, getNews, getOpportunities, getSchools, getServices, getStories } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const staticRoutes = ["", "/services", "/education", "/opportunities", "/news", "/events", "/how-to", "/land-housing", "/municipal-services", "/explore", "/businesses", "/youth", "/agriculture", "/about", "/gallery", "/stories", "/report", "/contact"];
  const [services, schools, opps, news, events, guides, businesses, stories] = await Promise.all([getServices(), getSchools(), getOpportunities(), getNews(), getEvents(), getGuides(), getBusinesses(), getStories()]);
  const dyn = [
    ...services.map((x) => `/services/${x.slug}`),
    ...schools.map((x) => `/education/${x.slug}`),
    ...opps.map((x) => `/opportunities/${x.slug}`),
    ...news.map((x) => `/news/${x.slug}`),
    ...events.map((x) => `/events/${x.slug}`),
    ...guides.map((x) => `/how-to/${x.slug}`),
    ...businesses.map((x) => `/businesses/${x.slug}`),
    ...stories.map((x) => `/stories/${x.slug}`),
  ];
  return [...staticRoutes, ...dyn].map((p) => ({ url: `${base}${p}`, changeFrequency: p === "" ? "daily" : "weekly", priority: p === "" ? 1 : p.split("/").length > 2 ? 0.6 : 0.8 }));
}
