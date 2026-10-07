import Link from "next/link";
import { Accessibility, BookOpen, GraduationCap, MapPin, School as SchoolIcon, Smile } from "lucide-react";
import type { School } from "@/lib/types";
import { schoolTypeMeta } from "@/data/schools";
import { Card } from "@/components/ui/card";
import { VerifiedBadge } from "@/components/shared/states";
import { ContactActions } from "./actions";

const typeIcon = {
  "early-childhood": Smile,
  primary: BookOpen,
  secondary: SchoolIcon,
  special: Accessibility,
  tertiary: GraduationCap,
} as const;

const typeTone: Record<School["type"], string> = {
  "early-childhood": "bg-amber-gold-100 text-amber-gold-700",
  primary: "bg-bush-50 text-bush-700",
  secondary: "bg-sand-100 text-charcoal-800",
  special: "bg-clay-50 text-clay-700",
  tertiary: "bg-charcoal-900 text-amber-gold-400",
};

export function SchoolCard({ school }: { school: School }) {
  const Ico = typeIcon[school.type];
  return (
    <Card interactive className="flex h-full flex-col p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className={`grid size-12 place-items-center rounded-2xl ${typeTone[school.type]}`}>
          <Ico className="size-6" aria-hidden />
        </span>
        <VerifiedBadge verification={school.verification} />
      </div>
      <p className="text-xs font-bold tracking-wider text-clay-600 uppercase">{schoolTypeMeta[school.type].label}</p>
      <h3 className="mt-1 text-xl leading-snug font-semibold">
        <Link href={`/education/${school.slug}`} className="after:absolute after:inset-0 after:rounded-2xl hover:text-bush-800">
          {school.name}
        </Link>
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{school.summary}</p>
      {(school.location || school.grades) && (
        <ul className="mt-4 space-y-1.5 text-sm text-charcoal-700">
          {school.location && (
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden /> {school.location.label}
            </li>
          )}
          {school.grades && (
            <li className="flex gap-2">
              <BookOpen className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden /> {school.grades}
            </li>
          )}
        </ul>
      )}
      <div className="relative z-10 mt-auto pt-5">
        <ContactActions contact={school.contact} location={school.location} detailsHref={`/education/${school.slug}`} />
      </div>
    </Card>
  );
}
