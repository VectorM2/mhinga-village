import type { ContentBlock } from "@/lib/types";
import { Callout } from "./states";

/** Renders CMS block content. Swap for a rich-text renderer when the CMS lands. */
export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-mhinga">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "paragraph":
            return <p key={i}>{b.text}</p>;
          case "heading":
            return <h2 key={i}>{b.text}</h2>;
          case "list":
            return b.ordered ? (
              <ol key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ol>
            ) : (
              <ul key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>
            );
          case "quote":
            return (
              <blockquote key={i}>
                {b.text}
                {b.cite && <cite className="mt-2 block text-sm not-italic text-muted">— {b.cite}</cite>}
              </blockquote>
            );
          case "callout":
            return (
              <div key={i} className="my-6 not-italic">
                <Callout tone={b.tone}>{b.text}</Callout>
              </div>
            );
        }
      })}
    </div>
  );
}

export function wordCount(blocks: ContentBlock[]) {
  return blocks
    .map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : ""))
    .join(" ")
    .split(/\s+/).length;
}

export function StatCard({ label, value, hint, icon }: { label: string; value: React.ReactNode; hint?: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-sand-200/70">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted">{label}</p>
        {icon && <span className="grid size-9 place-items-center rounded-xl bg-sand-100 text-bush-700 [&_svg]:size-4.5">{icon}</span>}
      </div>
      <p className="mt-2 font-display text-3xl font-semibold text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
