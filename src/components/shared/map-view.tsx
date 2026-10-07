import { ExternalLink, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site";

/**
 * Provider-agnostic map. Uses an OpenStreetMap embed (no API key) when
 * coordinates are configured; otherwise shows an illustrated preview with a
 * link out. To use Mapbox or Google Maps, branch on
 * process.env.NEXT_PUBLIC_MAP_PROVIDER here.
 */
export function MapView({ title = "Map of Mhinga" }: { title?: string }) {
  const { center, zoom, searchQuery } = siteConfig.map;
  const osmSearch = `https://www.openstreetmap.org/search?query=${encodeURIComponent(searchQuery)}`;

  if (center) {
    const d = 0.02 * (14 / zoom);
    const bbox = [center.lng - d, center.lat - d, center.lng + d, center.lat + d].join(",");
    return (
      <div className="overflow-hidden rounded-3xl ring-1 ring-sand-200">
        <iframe
          title={title}
          className="aspect-[4/3] w-full"
          loading="lazy"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${center.lat},${center.lng}`}
        />
        <a href={osmSearch} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 bg-white py-3 text-sm font-semibold text-bush-700">
          Open larger map <ExternalLink className="size-4" aria-hidden />
        </a>
      </div>
    );
  }

  const pins = [
    [22, 30], [38, 52], [55, 34], [64, 62], [30, 70], [76, 42], [48, 78], [70, 22],
  ];
  return (
    <figure className="relative overflow-hidden rounded-3xl bg-[#e9e2cf] ring-1 ring-sand-200">
      <svg viewBox="0 0 100 75" className="block aspect-[4/3] w-full" aria-hidden>
        <defs>
          <pattern id="contour" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10 Q5 6 10 10 T20 10" fill="none" stroke="#cdbf9d" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="75" fill="url(#contour)" />
        <path d="M-5 58 C15 50 25 64 45 56 S75 40 105 48" fill="none" stroke="#8fbfca" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M10 -5 C18 20 30 30 50 38 S80 60 90 80" fill="none" stroke="#fbf8f2" strokeWidth="2.2" />
        <path d="M-5 25 C25 28 60 18 105 30" fill="none" stroke="#fbf8f2" strokeWidth="1.4" />
        <ellipse cx="78" cy="18" rx="14" ry="9" fill="#adcab5" opacity="0.6" />
        <ellipse cx="20" cy="66" rx="16" ry="7" fill="#adcab5" opacity="0.5" />
        {pins.map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d="M0 0 C-2.6 -3.4 -3.4 -5 -3.4 -6.4 A3.4 3.4 0 1 1 3.4 -6.4 C3.4 -5 2.6 -3.4 0 0 Z" fill={i % 3 === 0 ? "#b9572e" : i % 3 === 1 ? "#244f36" : "#d4952a"} />
            <circle cy="-6.4" r="1.3" fill="#fff" />
          </g>
        ))}
      </svg>
      <figcaption className="absolute inset-x-3 bottom-3 flex flex-col gap-3 rounded-2xl bg-white/95 p-4 shadow-card backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-start gap-2 text-sm text-charcoal-700">
          <MapPin className="mt-0.5 size-4 shrink-0 text-clay-600" aria-hidden />
          <span>
            <span className="font-semibold text-ink">Interactive map coming soon.</span> Places are being mapped with the community.
          </span>
        </span>
        <a href={osmSearch} target="_blank" rel="noreferrer" className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-bush-700 px-4 text-sm font-semibold text-white hover:bg-bush-800">
          Open in OpenStreetMap <ExternalLink className="size-4" aria-hidden />
        </a>
      </figcaption>
    </figure>
  );
}
