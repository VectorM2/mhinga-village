import { Database, Globe, Map, ShieldCheck } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shell";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata = { title: "Settings" };

function Panel({ icon: Ico, title, description, children }: { icon: typeof Globe; title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-sand-200">
      <div className="mb-5 flex min-w-0 items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sand-100 text-bush-700">
          <Ico className="size-5" aria-hidden />
        </span>
        <div>
          <h2 className="font-sans text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export default function SettingsPage() {
  const supabaseConnected = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  return (
    <>
      <AdminPageHeader title="Settings" description="Site details, trust settings and integrations." />
      <div className="grid grid-cols-1 gap-5 break-words xl:grid-cols-2 [&>*]:min-w-0">
        <Panel icon={Globe} title="Site details" description="Shown in the header, footer and search engines.">
          <div className="space-y-4">
            <div>
              <label htmlFor="s-name" className="mb-1.5 block text-sm font-semibold">Site name</label>
              <Input id="s-name" defaultValue={siteConfig.name} />
            </div>
            <div>
              <label htmlFor="s-tag" className="mb-1.5 block text-sm font-semibold">Tagline</label>
              <Input id="s-tag" defaultValue={siteConfig.tagline} />
            </div>
            <div>
              <label htmlFor="s-desc" className="mb-1.5 block text-sm font-semibold">Description</label>
              <Textarea id="s-desc" defaultValue={siteConfig.description} className="min-h-24" />
            </div>
            <div>
              <label htmlFor="s-email" className="mb-1.5 block text-sm font-semibold">Contact email</label>
              <Input id="s-email" defaultValue={siteConfig.contactEmail} />
            </div>
            <Button type="button" disabled className="whitespace-normal">Save (needs database)</Button>
          </div>
        </Panel>
        <Panel icon={ShieldCheck} title="Trust & official status" description="Controls disclaimers shown across the site.">
          <div className="space-y-3 text-sm">
            <p className="rounded-xl bg-sand-50 p-4 ring-1 ring-sand-200">
              <span className="font-semibold">Official status: </span>
              {siteConfig.isOfficial ? "Marked as official" : "Independent community website (not official)"}. Only change this once a recognised authority formally operates the site — set <code className="rounded bg-sand-100 px-1">isOfficial</code> in <code className="rounded bg-sand-100 px-1">src/lib/site.ts</code>.
            </p>
            <p className="rounded-xl bg-sand-50 p-4 ring-1 ring-sand-200">
              <span className="font-semibold">Verification: </span>
              Content shows a green “Verified” badge only after an administrator marks it verified. Everything else shows “To be confirmed”.
            </p>
          </div>
        </Panel>
        <Panel icon={Database} title="Database" description="Supabase connection status.">
          <p className="text-sm">
            Status:{" "}
            <span className={supabaseConnected ? "font-semibold text-bush-700" : "font-semibold text-amber-gold-700"}>
              {supabaseConnected ? "Connected" : "Not connected — running on mock data"}
            </span>
          </p>
          <p className="mt-2 text-sm text-muted">Add Supabase keys to <code className="rounded bg-sand-100 px-1">.env.local</code> and run <code className="rounded bg-sand-100 px-1">supabase/schema.sql</code>. See README.</p>
        </Panel>
        <Panel icon={Map} title="Map" description="Explore page map provider.">
          <p className="text-sm">
            Provider: <span className="font-semibold">OpenStreetMap (no API key)</span>
          </p>
          <p className="mt-2 text-sm text-muted">
            {siteConfig.map.center ? "Village coordinates configured." : "Set confirmed village coordinates in siteConfig.map.center to enable the live embedded map."}
          </p>
        </Panel>
      </div>
    </>
  );
}
