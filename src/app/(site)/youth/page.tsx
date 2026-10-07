import Link from "next/link";
import { ArrowRight, Briefcase, Code2, Compass, ExternalLink, GraduationCap, Hammer, Lightbulb, School, Trophy, Wallet } from "lucide-react";
import { NewsCard } from "@/components/cards/news-card";
import { OpportunityCard } from "@/components/cards/opportunity-card";
import { Section, SectionHeading } from "@/components/shared/section";
import { Breadcrumbs } from "@/components/shared/page-header";
import { getNews, getOpportunities, NOW } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mhinga Youth Hub",
  description: "Bursaries, jobs, learnerships, internships, coding, entrepreneurship, sport and career advice for young people in Mhinga.",
  path: "/youth",
});

const tiles = [
  { label: "Bursaries", href: "/opportunities?category=bursary", icon: Wallet },
  { label: "Jobs", href: "/opportunities?category=job", icon: Briefcase },
  { label: "Learnerships", href: "/opportunities?category=learnership", icon: Hammer },
  { label: "Internships", href: "/opportunities?category=internship", icon: GraduationCap },
  { label: "Coding & skills", href: "#skills", icon: Code2 },
  { label: "Entrepreneurship", href: "#entrepreneurship", icon: Lightbulb },
  { label: "Sport", href: "#sport", icon: Trophy },
  { label: "Career advice", href: "#careers", icon: Compass },
];

export default async function YouthPage() {
  const [opps, news] = await Promise.all([getOpportunities(), getNews()]);
  const open = opps.filter((o) => (!o.deadline || new Date(o.deadline) >= NOW) && ["bursary", "job", "learnership", "internship", "youth-programme", "training"].includes(o.category));
  const youthNews = news.filter((n) => n.category === "youth" || n.category === "education").slice(0, 3);
  return (
    <>
      <header className="relative isolate overflow-hidden bg-charcoal-900">
        <div className="absolute -top-40 -right-20 -z-10 size-[32rem] rounded-full bg-amber-gold-400/30 blur-3xl" aria-hidden />
        <div className="absolute -bottom-40 left-0 -z-10 size-[28rem] rounded-full bg-clay-500/30 blur-3xl" aria-hidden />
        <div className="absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden />
        <div className="container-page py-12 sm:py-20">
          <Breadcrumbs inverted items={[{ label: "Youth Hub" }]} />
          <p className="mb-2 text-xs font-bold tracking-[0.16em] text-amber-gold-400 uppercase">Youth Hub</p>
          <h1 className="max-w-3xl text-5xl leading-[1.02] font-semibold text-white sm:text-7xl">
            Mhinga <span className="text-amber-gold-400 italic">Youth</span> Hub
          </h1>
          <p className="mt-5 max-w-xl text-lg text-sand-200">Funding, first jobs, new skills and big ideas. Everything young people in Mhinga need to take the next step — in one place.</p>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {tiles.map(({ label, href, icon: Ico }) => (
              <li key={label}>
                <Link href={href} className="group flex h-full items-center gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white/10">
                  <Ico className="size-6 shrink-0 text-amber-gold-400" aria-hidden />
                  <span className="font-semibold text-white">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <Section>
        <SectionHeading eyebrow="Open now" title="Bursaries, jobs & learnerships" action={{ label: "All opportunities", href: "/opportunities" }} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {open.slice(0, 6).map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
      </Section>

      <Section tone="white" id="skills" className="scroll-mt-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-bush-50 px-3 py-1 text-sm font-semibold text-bush-800">
              <Code2 className="size-4" aria-hidden /> Skills development & coding
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Learn skills the world is hiring for</h2>
            <p className="mt-3 text-lg text-charcoal-700">Digital skills open doors to remote work, freelancing and better jobs. Many quality courses are free — all you need is a phone or computer and some data.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              ["Start coding", "Free beginner courses in web development and programming are widely available online."],
              ["Build a portfolio", "Create small projects — a CV website, a simple app — to show employers."],
              ["Join a bootcamp", "Watch Opportunities for training programmes and local bootcamps."],
              ["Learn together", "Interested in starting a coding club in Mhinga? Get in touch."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl bg-sand-50 p-5 ring-1 ring-sand-200">
                <p className="font-semibold">{t}</p>
                <p className="mt-1 text-sm text-charcoal-700">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="entrepreneurship" className="scroll-mt-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-amber-gold-100 p-7 lg:col-span-2">
            <Lightbulb className="size-8 text-amber-gold-700" aria-hidden />
            <h2 className="mt-4 text-3xl font-semibold">Start something of your own</h2>
            <p className="mt-2 max-w-xl text-charcoal-700">From car washes to catering and tech services — young entrepreneurs create jobs at home. Funding and mentorship are available for qualifying young people.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/opportunities/nyda-grant-programme" className="inline-flex h-11 items-center gap-2 rounded-full bg-charcoal-900 px-5 font-semibold text-white">
                NYDA grants <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/businesses#add-your-business" className="inline-flex h-11 items-center rounded-full bg-white px-5 font-semibold ring-1 ring-sand-300">
                List your business
              </Link>
            </div>
          </div>
          <div id="sport" className="scroll-mt-24 rounded-3xl bg-bush-800 p-7 text-white">
            <Trophy className="size-8 text-amber-gold-400" aria-hidden />
            <h2 className="mt-4 text-3xl font-semibold">Sport</h2>
            <p className="mt-2 text-sand-200">Football, netball, athletics and more. Find tournaments and training in Events.</p>
            <Link href="/events" className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-amber-gold-400 px-5 font-semibold text-charcoal-900">
              See events <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="white" id="careers" className="scroll-mt-16">
        <SectionHeading title="Career advice & study options" description="Choosing what to study is a big decision. Here's where to start." />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: GraduationCap, title: "University", body: "Degrees take 3–4+ years. Apply the year before you study — usually from mid-year. Check minimum APS and subject requirements.", links: [{ l: "University of Venda", h: "/education/university-of-venda" }] },
            { icon: School, title: "TVET colleges", body: "Practical, career-focused qualifications in trades, engineering, business and IT. NSFAS funding is available for qualifying students.", links: [{ l: "Vhembe TVET College", h: "/education/vhembe-tvet-college" }] },
            { icon: Compass, title: "Choosing a career", body: "Think about subjects you enjoy, careers in demand, and how long you can study. Talk to teachers and people working in fields you like.", links: [{ l: "How to apply for NSFAS", h: "/how-to/apply-for-nsfas" }] },
          ].map(({ icon: Ico, title, body, links }) => (
            <div key={title} className="flex flex-col rounded-3xl bg-sand-50 p-6 ring-1 ring-sand-200">
              <Ico className="size-8 text-clay-600" aria-hidden />
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 flex-1 text-charcoal-700">{body}</p>
              {links.map((x) => (
                <Link key={x.h} href={x.h} className="mt-4 inline-flex items-center gap-1.5 font-semibold text-bush-700">
                  {x.l} <ArrowRight className="size-4" aria-hidden />
                </Link>
              ))}
            </div>
          ))}
        </div>
        <a href="https://sayouth.mobi" target="_blank" rel="noreferrer" className="mt-6 flex flex-col justify-between gap-3 rounded-2xl bg-charcoal-900 p-6 text-white sm:flex-row sm:items-center">
          <span>
            <span className="block text-lg font-semibold">Looking for work? Register on SAYouth.</span>
            <span className="text-sand-300">Free platform for 18–34 year olds, zero-rated on most networks.</span>
          </span>
          <span className="inline-flex items-center gap-2 font-semibold text-amber-gold-400">
            sayouth.mobi <ExternalLink className="size-4" aria-hidden />
          </span>
        </a>
      </Section>

      {youthNews.length > 0 && (
        <Section>
          <SectionHeading title="Reads for young people" action={{ label: "All news", href: "/news?category=youth" }} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {youthNews.map((n) => (
              <NewsCard key={n.id} article={n} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
