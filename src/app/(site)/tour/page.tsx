import { EventCard } from '@/components/EventCard';
import { getEventsSplit } from '@/lib/events';

export const revalidate = 1800;

export default async function TourPage() {
  const { upcoming, past } = await getEventsSplit();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold uppercase tracking-wide">Dates</h1>
      {upcoming.length === 0 ? (
        <p className="text-zinc-400">Aucune date annoncée pour le moment.</p>
      ) : (
        <div className="grid gap-4">
          {upcoming.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-semibold uppercase tracking-wide">Archives</h2>
        {past.length === 0 ? (
          <p className="text-zinc-500">Encore aucun concert passé enregistré.</p>
        ) : (
          <div className="grid gap-4">
            {past.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
