"use client";

/**
 * Generic CMS table: search, filter, create, edit, delete and custom row
 * actions. State is local to the page (mock). To persist, replace the
 * `commit*` helpers with server actions that write to Supabase.
 */
import { useMemo, useState } from "react";
import { CheckCircle2, MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input, Select, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type FieldDef =
  | { name: string; label: string; type: "text" | "date" | "datetime-local" | "url" | "tel" | "email"; required?: boolean; hint?: string }
  | { name: string; label: string; type: "textarea"; required?: boolean; hint?: string }
  | { name: string; label: string; type: "select"; options: { value: string; label: string }[]; required?: boolean; hint?: string }
  | { name: string; label: string; type: "checkbox"; hint?: string };

export interface Column<T> {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
  className?: string;
  /** Hide on small screens */
  hideOnMobile?: boolean;
}

export interface RowAction<T> {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  show?: (row: T) => boolean;
  apply: (row: T) => T;
  tone?: "default" | "danger";
  toast?: string;
}

export interface ResourceManagerProps<T extends { id: string }> {
  noun: string;
  rows: T[];
  columns: Column<T>[];
  searchText: (row: T) => string;
  filter?: { label: string; options: { value: string; label: string }[]; get: (row: T) => string };
  fields: FieldDef[];
  /** Map a row to form values and back */
  toForm: (row: T) => Record<string, string | boolean>;
  fromForm: (values: Record<string, string | boolean>, existing?: T) => T;
  actions?: RowAction<T>[];
  createLabel?: string;
  canCreate?: boolean;
}

export function ResourceManager<T extends { id: string }>(p: ResourceManagerProps<T>) {
  const [rows, setRows] = useState(p.rows);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState<T | "new" | null>(null);
  const [deleting, setDeleting] = useState<T | null>(null);
  const [menu, setMenuState] = useState<{ id: string; top: number; right: number } | null>(null);
  const setMenu = (_: null) => setMenuState(null);
  const [toast, setToast] = useState<string | null>(null);

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const visible = useMemo(() => {
    const t = q.trim().toLowerCase();
    return rows.filter((r) => (filter === "all" || p.filter?.get(r) === filter) && (!t || p.searchText(r).toLowerCase().includes(t)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, q, filter]);

  const save = (values: Record<string, string | boolean>) => {
    if (editing === "new") {
      const row = p.fromForm(values);
      setRows((r) => [row, ...r]);
      flash(`${p.noun} created`);
    } else if (editing) {
      const row = p.fromForm(values, editing);
      setRows((r) => r.map((x) => (x.id === row.id ? row : x)));
      flash(`${p.noun} updated`);
    }
    setEditing(null);
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative sm:max-w-xs sm:flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <label htmlFor="admin-search" className="sr-only">
              Search {p.noun.toLowerCase()}s
            </label>
            <Input id="admin-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${p.noun.toLowerCase()}s…`} className="h-11 pl-10" />
          </div>
          {p.filter && (
            <div className="sm:w-52">
              <label htmlFor="admin-filter" className="sr-only">
                {p.filter.label}
              </label>
              <Select id="admin-filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="h-11">
                <option value="all">All {p.filter.label.toLowerCase()}</option>
                {p.filter.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </div>
          )}
        </div>
        {p.canCreate !== false && (
          <Button onClick={() => setEditing("new")}>
            <Plus aria-hidden /> {p.createLabel ?? `New ${p.noun.toLowerCase()}`}
          </Button>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-sand-200">
        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm md:min-w-[40rem]">
            <thead className="border-b border-sand-200 bg-sand-50 text-xs font-semibold tracking-wide text-muted uppercase">
              <tr>
                {p.columns.map((c) => (
                  <th key={c.key} scope="col" className={cn("px-4 py-3", c.className, c.hideOnMobile && "hidden md:table-cell")}>
                    {c.label}
                  </th>
                ))}
                <th scope="col" className="w-12 px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100">
              {visible.map((row) => (
                <tr key={row.id} className="transition hover:bg-sand-50/70">
                  {p.columns.map((c) => (
                    <td key={c.key} className={cn("px-4 py-3.5 align-middle", c.className, c.hideOnMobile && "hidden md:table-cell")}>
                      {c.render(row)}
                    </td>
                  ))}
                  <td className="relative px-4 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={(ev) => {
                        if (menu?.id === row.id) return setMenuState(null);
                        const r = ev.currentTarget.getBoundingClientRect();
                        const top = r.bottom + 6 + 260 > window.innerHeight ? Math.max(8, r.top - 266) : r.bottom + 6;
                        setMenuState({ id: row.id, top, right: window.innerWidth - r.right });
                      }}
                      className="grid size-9 place-items-center rounded-lg hover:bg-sand-100"
                      aria-label="Row actions"
                      aria-expanded={menu?.id === row.id}
                    >
                      <MoreHorizontal className="size-4.5" aria-hidden />
                    </button>
                    {menu?.id === row.id && (
                      <>
                        <button type="button" aria-hidden tabIndex={-1} className="fixed inset-0 z-40 cursor-default" onClick={() => setMenu(null)} />
                        <ul style={{ top: menu.top, right: menu.right }} className="fixed z-50 w-52 animate-fade-up rounded-xl bg-white p-1.5 text-left shadow-lift ring-1 ring-sand-200 [animation-duration:0.2s]">
                          <li>
                            <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-sand-100" onClick={() => (setEditing(row), setMenu(null))}>
                              <Pencil className="size-4" aria-hidden /> Edit
                            </button>
                          </li>
                          {p.actions
                            ?.filter((a) => !a.show || a.show(row))
                            .map((a) => {
                              const Ico = a.icon ?? CheckCircle2;
                              return (
                                <li key={a.label}>
                                  <button
                                    type="button"
                                    className={cn("flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-sand-100", a.tone === "danger" && "text-clay-700")}
                                    onClick={() => {
                                      setRows((r) => r.map((x) => (x.id === row.id ? a.apply(x) : x)));
                                      setMenu(null);
                                      flash(a.toast ?? `${a.label} — done`);
                                    }}
                                  >
                                    <Ico className="size-4" /> {a.label}
                                  </button>
                                </li>
                              );
                            })}
                          <li className="mt-1 border-t border-sand-100 pt-1">
                            <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-clay-700 hover:bg-clay-50" onClick={() => (setDeleting(row), setMenu(null))}>
                              <Trash2 className="size-4" aria-hidden /> Delete
                            </button>
                          </li>
                        </ul>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!visible.length && <p className="px-4 py-12 text-center text-muted">No {p.noun.toLowerCase()}s match your filters.</p>}
        <div className="border-t border-sand-200 bg-sand-50 px-4 py-2.5 text-xs text-muted">
          {visible.length} of {rows.length} {p.noun.toLowerCase()}s
        </div>
      </div>

      <EditorDialog
        key={editing === "new" ? "new" : editing ? editing.id : "closed"}
        open={editing !== null}
        title={editing === "new" ? `New ${p.noun.toLowerCase()}` : `Edit ${p.noun.toLowerCase()}`}
        fields={p.fields}
        initial={editing && editing !== "new" ? p.toForm(editing) : {}}
        onClose={() => setEditing(null)}
        onSave={save}
      />

      <Dialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <DialogContent className="max-w-md">
          <DialogTitle className="text-xl font-semibold">Delete this {p.noun.toLowerCase()}?</DialogTitle>
          <DialogDescription className="mt-2 text-muted">This cannot be undone. Consider archiving or unpublishing instead.</DialogDescription>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button
              variant="emergency"
              onClick={() => {
                setRows((r) => r.filter((x) => x.id !== deleting?.id));
                setDeleting(null);
                flash(`${p.noun} deleted`);
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {toast && (
        <div role="status" className="fixed right-4 bottom-4 z-50 flex animate-fade-up items-center gap-2 rounded-xl bg-charcoal-900 px-4 py-3 text-sm font-medium text-white shadow-lift">
          <CheckCircle2 className="size-4 text-bush-200" aria-hidden /> {toast}
        </div>
      )}
    </div>
  );
}

function EditorDialog({
  open,
  title,
  fields,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  title: string;
  fields: FieldDef[];
  initial: Record<string, string | boolean>;
  onClose: () => void;
  onSave: (v: Record<string, string | boolean>) => void;
}) {
  const [values, setValues] = useState<Record<string, string | boolean>>(initial);
  const [error, setError] = useState<string | null>(null);
  const set = (k: string, v: string | boolean) => setValues((s) => ({ ...s, [k]: v }));

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
        <DialogDescription className="mt-1 text-sm text-muted">Changes are kept in this browser session only (prototype).</DialogDescription>
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const missing = fields.find((f) => f.type !== "checkbox" && f.required && !String(values[f.name] ?? "").trim());
            if (missing) return setError(`${missing.label} is required.`);
            onSave(values);
          }}
        >
          {error && (
            <p role="alert" className="rounded-xl bg-clay-50 px-4 py-2.5 text-sm font-medium text-clay-700">
              {error}
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((f) => {
              const id = `f-${f.name}`;
              const wide = f.type === "textarea" || f.type === "checkbox";
              return (
                <div key={f.name} className={cn(wide && "sm:col-span-2")}>
                  {f.type === "checkbox" ? (
                    <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold">
                      <input type="checkbox" checked={!!values[f.name]} onChange={(e) => set(f.name, e.target.checked)} className="size-5 accent-bush-700" />
                      {f.label}
                    </label>
                  ) : (
                    <>
                      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
                        {f.label}
                        {f.required && <span className="text-clay-600"> *</span>}
                      </label>
                      {f.type === "textarea" ? (
                        <Textarea id={id} value={String(values[f.name] ?? "")} onChange={(e) => set(f.name, e.target.value)} className="min-h-28" />
                      ) : f.type === "select" ? (
                        <Select id={id} value={String(values[f.name] ?? "")} onChange={(e) => set(f.name, e.target.value)}>
                          <option value="">Choose…</option>
                          {f.options.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </Select>
                      ) : (
                        <Input id={id} type={f.type} value={String(values[f.name] ?? "")} onChange={(e) => set(f.name, e.target.value)} />
                      )}
                    </>
                  )}
                  {f.hint && <p className="mt-1 text-xs text-muted">{f.hint}</p>}
                </div>
              );
            })}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
