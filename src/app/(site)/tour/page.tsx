import { EventCard } from '@/components/EventCard';
import { getUpcomingEvents } from '@/lib/songkick';

export const revalidate = 1800;

export default async function TourPage() {
  const events = await getUpcomingEvents();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold uppercase tracking-wide">Dates</h1>
      <div className="grid gap-4">
        {events.length === 0 && <p className="text-zinc-400">Aucune date annoncée pour le moment.</p>}
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

