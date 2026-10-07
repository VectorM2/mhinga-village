import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TZ = "Africa/Johannesburg";

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  return new Intl.DateTimeFormat("en-ZA", { timeZone: TZ, ...opts }).format(new Date(iso));
}

export function formatShortDate(iso: string) {
  return formatDate(iso, { day: "numeric", month: "short" });
}

export function formatTime(iso: string) {
  return new Intl.DateTimeFormat("en-ZA", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(iso));
}

export function dayAndMonth(iso: string) {
  const d = new Date(iso);
  return {
    day: new Intl.DateTimeFormat("en-ZA", { timeZone: TZ, day: "numeric" }).format(d),
    month: new Intl.DateTimeFormat("en-ZA", { timeZone: TZ, month: "short" }).format(d),
    weekday: new Intl.DateTimeFormat("en-ZA", { timeZone: TZ, weekday: "short" }).format(d),
  };
}

/** Days from `now` until `iso`. Negative if in the past. */
export function daysUntil(iso: string, now: Date = new Date()) {
  const ms = new Date(iso).getTime() - now.getTime();
  return Math.ceil(ms / 86_400_000);
}

export function readingTime(words: number) {
  return Math.max(1, Math.round(words / 200));
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

/** "0800 60 10 11" → "tel:0800601011" */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** South African number → wa.me link (assumes +27 when local format) */
export function whatsappHref(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `27${digits.slice(1)}`;
  return `https://wa.me/${digits}`;
}

export function directionsHref(label: string, lat?: number, lng?: number) {
  const q = lat !== undefined && lng !== undefined ? `${lat},${lng}` : `${label}, Mhinga, Limpopo`;
  return `https://www.openstreetmap.org/search?query=${encodeURIComponent(q)}`;
}

export function titleCase(s: string) {
  return s.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function generateReference(prefix = "MH") {
  const year = new Date().getFullYear();
  const n = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${year}-${n}`;
}
