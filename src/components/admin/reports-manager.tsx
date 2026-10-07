"use client";

import { useMemo, useState } from "react";
import { ChevronRight, Clock, MapPin, MessageSquarePlus, User } from "lucide-react";
import type { ReportStatus, ServiceReport } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Select, Textarea } from "@/components/ui/input";
import { cn, formatDate, formatTime } from "@/lib/utils";
import { StatusBadge } from "./shell";

const statuses: { value: ReportStatus; label: string }[] = [
  { value: "submitted", label: "Submitted" },
  { value: "assigned", label: "Assigned" },
  { value: "in_progress", label: "In progress" },
  { value: "resolved", label: "Resolved" },
];
const teams = ["Water desk", "Infrastructure desk", "Electricity liaison", "Waste & environment", "Community Manager"];

export function ReportsManager({ rows }: { rows: ServiceReport[] }) {
  const [reports, setReports] = useState(rows);
  const [tab, setTab] = useState<"all" | ReportStatus>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const open = reports.find((r) => r.id === openId) ?? null;

  const counts = useMemo(() => Object.fromEntries(statuses.map((s) => [s.value, reports.filter((r) => r.status === s.value).length])), [reports]);
  const list = tab === "all" ? reports : reports.filter((r) => r.status === tab);
  const update = (id: string, patch: Partial<ServiceReport>) => setReports((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  return (
    <div>
      <div className="mb-5 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2">
          {[{ value: "all" as const, label: "All", count: reports.length }, ...statuses.map((s) => ({ ...s, count: counts[s.value] }))].map((t) => (
            <button
              key={t.value}
              type="button"
              aria-pressed={tab === t.value}
              onClick={() => setTab(t.value)}
              className={cn("inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold", tab === t.value ? "bg-charcoal-900 text-white" : "bg-white ring-1 ring-sand-300 hover:bg-sand-100")}
            >
              {t.label} <span className={cn("rounded-full px-1.5 text-xs", tab === t.value ? "bg-white/20" : "bg-sand-100 text-muted")}>{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      <ul className="space-y-3">
        {list.map((r) => (
          <li key={r.id}>
            <button type="button" onClick={() => setOpenId(r.id)} className="flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-left shadow-card ring-1 ring-sand-200 transition hover:shadow-lift sm:p-5">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-semibold">{r.reference}</span>
                  <StatusBadge status={r.status} />
                  <span className="rounded-full bg-sand-100 px-2 py-0.5 text-xs font-semibold capitalize">{r.category}</span>
                </div>
                <p className="mt-1.5 line-clamp-1 text-charcoal-800">{r.description}</p>
                <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" aria-hidden /> {r.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" aria-hidden /> {formatDate(r.createdAt, { day: "numeric", month: "short" })}
                  </span>
                  {r.assignedTo && (
                    <span className="inline-flex items-center gap-1">
                      <User className="size-3.5" aria-hidden /> {r.assignedTo}
                    </span>
                  )}
                </p>
              </div>
              <ChevronRight className="size-5 shrink-0 text-muted" aria-hidden />
            </button>
          </li>
        ))}
        {!list.length && <li className="rounded-2xl bg-white p-10 text-center text-muted ring-1 ring-sand-200">No reports with this status.</li>}
      </ul>

      <Dialog open={!!open} onOpenChange={(o) => !o && (setOpenId(null), setNote(""))}>
        <DialogContent className="max-w-2xl">
          {open && (
            <>
              <DialogTitle className="flex flex-wrap items-center gap-2 text-2xl font-semibold">
                <span className="font-mono">{open.reference}</span> <StatusBadge status={open.status} />
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-muted">
                {open.category[0].toUpperCase() + open.category.slice(1)} · reported {formatDate(open.createdAt)} at {formatTime(open.createdAt)}
              </DialogDescription>

              <div className="mt-5 rounded-2xl bg-sand-50 p-4 ring-1 ring-sand-200">
                <p className="text-charcoal-800">{open.description}</p>
                <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-muted">Location</dt>
                    <dd className="font-semibold">{open.location}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Reporter</dt>
                    <dd className="font-semibold">{open.reporterName ?? "Anonymous"}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="r-status" className="mb-1.5 block text-sm font-semibold">
                    Status
                  </label>
                  <Select id="r-status" value={open.status} onChange={(e) => update(open.id, { status: e.target.value as ReportStatus })}>
                    {statuses.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label htmlFor="r-assign" className="mb-1.5 block text-sm font-semibold">
                    Assigned to
                  </label>
                  <Select id="r-assign" value={open.assignedTo ?? ""} onChange={(e) => update(open.id, { assignedTo: e.target.value || undefined, status: e.target.value && open.status === "submitted" ? "assigned" : open.status })}>
                    <option value="">Unassigned</option>
                    {teams.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold">Internal notes</h3>
                <p className="text-xs text-muted">Only visible to administrators.</p>
                <ul className="mt-3 space-y-2">
                  {open.internalNotes.map((n, i) => (
                    <li key={i} className="rounded-xl bg-white p-3 text-sm ring-1 ring-sand-200">
                      <p>{n.text}</p>
                      <p className="mt-1 text-xs text-muted">
                        {n.author} · {formatDate(n.at, { day: "numeric", month: "short" })} {formatTime(n.at)}
                      </p>
                    </li>
                  ))}
                  {!open.internalNotes.length && <li className="text-sm text-muted italic">No notes yet.</li>}
                </ul>
                <form
                  className="mt-3 flex flex-col gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!note.trim()) return;
                    update(open.id, { internalNotes: [...open.internalNotes, { author: "Site Owner", at: new Date().toISOString(), text: note.trim() }] });
                    setNote("");
                  }}
                >
                  <label htmlFor="r-note" className="sr-only">
                    Add internal note
                  </label>
                  <Textarea id="r-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add an internal note…" className="min-h-20" />
                  <Button type="submit" variant="secondary" className="self-end">
                    <MessageSquarePlus aria-hidden /> Add note
                  </Button>
                </form>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
