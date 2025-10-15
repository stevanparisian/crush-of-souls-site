import 'server-only';

import type { Event } from '@/components/EventCard';

const API = 'https://api.songkick.com/api/3.0';
const ARTIST_ID = process.env.SONGKICK_ARTIST_ID;
const KEY = process.env.SONGKICK_API_KEY;

export async function getUpcomingEvents(): Promise<Event[]> {
  if (!ARTIST_ID || !KEY) return [];

  const response = await fetch(`${API}/artists/${ARTIST_ID}/calendar.json?apikey=${KEY}`, {
    next: { revalidate: 1800 },
  });

  if (!response.ok) return [];

  const json = await response.json();
  const events = json?.resultsPage?.results?.event ?? [];

  type SongkickEvent = {
    id: number | string;
    start?: { date?: string };
    location?: { city?: string };
    venue?: { displayName?: string };
    uri?: string;
  };

  return events.map((event: SongkickEvent) => ({
    id: String(event.id),
    date: event.start?.date ? `${event.start.date}T00:00:00Z` : new Date().toISOString(),
    city: event.location?.city ?? '—',
    venue: event.venue?.displayName ?? '—',
    url: event.uri,
  }));
}
