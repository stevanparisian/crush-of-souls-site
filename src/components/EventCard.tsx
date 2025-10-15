export type Event = {
  id: string;
  date: string;
  city: string;
  venue: string;
  url?: string;
};

export function EventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.date);
  const formattedDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(eventDate);

  return (
    <article className="rounded-xl border border-zinc-800 p-4 hover:bg-zinc-900">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold">
          {event.city} — {event.venue}
        </h3>
        <time className="text-xs text-zinc-400">{formattedDate}</time>
      </div>
      {event.url && (
        <a className="mt-2 inline-block text-sm underline" href={event.url} target="_blank" rel="noreferrer">
          Billets / Infos
        </a>
      )}
    </article>
  );
}

