import {
  Briefcase,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Construction,
  Droplets,
  GraduationCap,
  HandHeart,
  HeartPulse,
  House,
  IdCard,
  Landmark,
  MapPinned,
  School,
  Siren,
  Sprout,
  Stethoscope,
  Trash2,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";

const registry = {
  briefcase: Briefcase,
  "briefcase-business": BriefcaseBusiness,
  building: Building2,
  calendar: CalendarDays,
  construction: Construction,
  droplets: Droplets,
  "graduation-cap": GraduationCap,
  "hand-heart": HandHeart,
  health: HeartPulse,
  house: House,
  "id-card": IdCard,
  landmark: Landmark,
  map: MapPinned,
  school: School,
  siren: Siren,
  sprout: Sprout,
  stethoscope: Stethoscope,
  "trash-2": Trash2,
  users: Users,
  wallet: Wallet,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof registry;

/** Lets CMS content reference icons by a stable string name. */
export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = registry[name as IconName] ?? Landmark;
  return <Cmp className={className} aria-hidden />;
}
