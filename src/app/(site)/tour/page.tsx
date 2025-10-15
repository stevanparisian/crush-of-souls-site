import { EventCard } from '@/components/EventCard';
import { getRecentEvents, getUpcomingEvents } from '@/lib/songkick';

export const revalidate = 1800;

export default async function TourPage() {
  const upcomingEvents = await getUpcomingEvents();
  const recentEvents = upcomingEvents.length === 0 ? await getRecentEvents(3) : [];
  const eventsToDisplay = upcomingEvents.length > 0 ? upcomingEvents : recentEvents;
  const showingRecent = upcomingEvents.length === 0 && recentEvents.length > 0;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold uppercase tracking-wide">Dates</h1>
      {showingRecent && (
        <p className="mb-4 text-sm text-zinc-400">
          Aucune date annoncée actuellement. Derniers concerts :
        </p>
      )}
      {eventsToDisplay.length === 0 ? (
        <p className="text-zinc-400">Aucune date annoncée pour le moment.</p>
      ) : (
        <div className="grid gap-4">
          {eventsToDisplay.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
