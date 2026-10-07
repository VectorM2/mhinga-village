import type { NewsArticle, NewsCategory } from "@/lib/types";
import { images } from "@/lib/site";

const TEAM = { name: "Mhinga Community Desk", role: "Editorial team" };

/**
 * Starter articles are practical, evergreen explainers rather than reports of
 * real events, so nothing here claims something happened that didn't.
 * Replace and extend them from /admin/news.
 */
export const news: NewsArticle[] = [
  {
    id: "news-welcome",
    slug: "welcome-to-the-mhinga-community-hub",
    title: "Welcome to the Mhinga community hub",
    excerpt:
      "One place for services, opportunities, notices and stories from home. Here's what you can find, and how you can help us keep it accurate.",
    category: "community",
    image: images.hills,
    author: TEAM,
    publishedAt: "2026-10-05",
    status: "published",
    featured: true,
    body: [
      { type: "paragraph", text: "This website is being built as a digital home for the people of Mhinga — a single place to find local services, school information, bursaries and jobs, community notices and the stories that make our village what it is." },
      { type: "heading", text: "What you can do here" },
      {
        type: "list",
        items: [
          "Find emergency numbers quickly from any page using the red Emergency button.",
          "Look up clinics, schools and government services.",
          "Browse bursaries, learnerships and jobs, with clear steps on how to apply.",
          "Read step-by-step guides for things like applying for an ID, a SASSA grant or NSFAS.",
          "Report water, electricity, road and waste problems.",
          "Discover and support local businesses.",
        ],
      },
      { type: "heading", text: "Help us keep information accurate" },
      { type: "paragraph", text: "Some listings still say \"Information to be confirmed\". That is deliberate: we would rather show a gap than publish a wrong phone number or the wrong opening hours. Information marked with a green Verified badge has been checked by an administrator." },
      { type: "callout", tone: "info", text: "Know the correct details for a clinic, school or office? Use the Contact page to send them to us." },
    ],
  },
  {
    id: "news-water-prep",
    slug: "how-to-prepare-for-water-interruptions",
    title: "How to prepare for water interruptions",
    excerpt: "Simple steps every household can take before, during and after a water outage — including how to store water safely.",
    category: "infrastructure",
    image: images.river,
    author: TEAM,
    publishedAt: "2026-10-02",
    status: "published",
    body: [
      { type: "paragraph", text: "Planned maintenance and unplanned outages happen. A little preparation makes a big difference, especially for households with babies, elderly people or anyone who is ill." },
      { type: "heading", text: "Before an outage" },
      { type: "list", items: ["Keep clean, covered containers of drinking water — enough for at least a day or two.", "Label containers with the date and replace stored water regularly.", "Follow Community Notices on this site for planned maintenance."] },
      { type: "heading", text: "During an outage" },
      { type: "list", items: ["Use stored water for drinking and cooking first.", "If water comes from an unsafe source, boil it for at least one minute before drinking.", "Use grey water (from washing) to flush toilets."] },
      { type: "heading", text: "After supply returns" },
      { type: "paragraph", text: "Water may look cloudy at first. Let the tap run until it is clear. If supply is not restored after the announced time, report it using the Report a Problem form so it can be followed up." },
    ],
  },
  {
    id: "news-nsfas-explainer",
    slug: "nsfas-what-matriculants-need-to-know",
    title: "NSFAS: what matriculants need to know",
    excerpt: "Who qualifies, which documents to prepare, and the mistakes that cause applications to be delayed.",
    category: "education",
    image: images.school,
    author: TEAM,
    publishedAt: "2026-09-28",
    status: "published",
    featured: true,
    body: [
      { type: "paragraph", text: "For many families in Mhinga, NSFAS is what makes university or TVET college possible. Applying early and correctly avoids months of stress." },
      { type: "heading", text: "Prepare these before the window opens" },
      { type: "list", items: ["Your ID or birth certificate", "IDs of your parents or guardian", "Proof of income where required", "An email address and cellphone number you will keep using"] },
      { type: "heading", text: "Common mistakes" },
      { type: "list", items: ["Using someone else's cellphone number or email", "Uploading unclear or uncertified documents", "Waiting until the last week to apply"] },
      { type: "quote", text: "Applying for NSFAS is free. Never pay anyone to apply on your behalf." },
      { type: "paragraph", text: "See our full step-by-step guide on applying for NSFAS in the How do I…? section." },
    ],
  },
  {
    id: "news-support-local",
    slug: "five-ways-to-support-local-businesses",
    title: "Five ways to support local businesses in Mhinga",
    excerpt: "Every rand spent close to home helps keep money, jobs and skills in the community.",
    category: "community",
    image: images.market,
    author: TEAM,
    publishedAt: "2026-09-22",
    status: "published",
    body: [
      { type: "paragraph", text: "Small businesses are the backbone of village life — from spaza shops and hair salons to mechanics, builders and farmers." },
      { type: "list", ordered: true, items: ["Buy local first when the price and quality are right.", "Recommend good businesses to friends and family.", "Leave honest, kind feedback that helps owners improve.", "Pay on time when you use local services.", "Encourage businesses to list themselves on this site — it's free."] },
    ],
  },
  {
    id: "news-garden",
    slug: "planting-season-home-gardens",
    title: "Getting your home garden ready for the planting season",
    excerpt: "Practical tips for preparing soil, saving water and choosing crops for summer in Limpopo.",
    category: "agriculture",
    image: images.fields,
    author: TEAM,
    publishedAt: "2026-09-15",
    status: "published",
    body: [
      { type: "paragraph", text: "A small, well-managed garden can supply vegetables for the household and sometimes extra to sell. The first summer rains are a good time to get started." },
      { type: "heading", text: "Start with the soil" },
      { type: "paragraph", text: "Dig in compost or well-rotted manure to help soil hold water. Mulch with dry grass or leaves to keep moisture in during hot days." },
      { type: "heading", text: "Save water" },
      { type: "list", items: ["Water early in the morning or late afternoon.", "Use trench or sunken beds so water collects around roots.", "Collect rainwater from roofs where possible."] },
      { type: "callout", tone: "info", text: "For advice suited to your plot, ask the agricultural extension officer serving the area." },
    ],
  },
  {
    id: "news-cv",
    slug: "writing-a-cv-that-gets-noticed",
    title: "Writing a CV that gets noticed",
    excerpt: "A one-page guide for young job-seekers applying for their first job or learnership.",
    category: "youth",
    image: images.gathering,
    author: TEAM,
    publishedAt: "2026-09-08",
    status: "published",
    body: [
      { type: "paragraph", text: "Your CV is often the first thing an employer sees. Keep it clear, honest and easy to read." },
      { type: "list", items: ["Put your name, phone number and email at the top.", "List education with your highest qualification first.", "Include volunteering, church, sport and community work — they show responsibility.", "Keep it to one or two pages.", "Ask someone to check spelling."] },
      { type: "paragraph", text: "Save your CV as a PDF and keep certified copies of your ID and qualifications ready." },
    ],
  },
];

export const newsCategoryMeta: Record<NewsCategory, string> = {
  community: "Community",
  education: "Education",
  health: "Health",
  youth: "Youth",
  infrastructure: "Infrastructure",
  opportunities: "Opportunities",
  agriculture: "Agriculture",
  culture: "Culture",
  events: "Events",
};
