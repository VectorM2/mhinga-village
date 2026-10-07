import { AdminPageHeader } from "@/components/admin/shell";
import { EventsManager } from "@/components/admin/managers";
import { getEvents } from "@/lib/data";

export const metadata = { title: "Events" };

export default async function Page() {
  const rows = await getEvents();
  return (
    <>
      <AdminPageHeader title="Events" description="Create and manage community events." />
      <EventsManager rows={rows} />
    </>
  );
}
