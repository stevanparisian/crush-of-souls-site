import 'server-only';

import type { Event } from '@/components/EventCard';

const API = 'https://api.songkick.com/api/3.0';
const DEFAULT_ARTIST_ID = '10207079';
const ARTIST_ID = process.env.SONGKICK_ARTIST_ID ?? DEFAULT_ARTIST_ID;
const ARTIST_SLUG = process.env.SONGKICK_ARTIST_SLUG ?? 'crush-of-souls';
const KEY = process.env.SONGKICK_API_KEY;

type SongkickApiEvent = {
  id: number | string;
  start?: { date?: string };
  location?: { city?: string };
  venue?: { displayName?: string };
  uri?: string;
};

export async function getUpcomingEvents(): Promise<Event[]> {
  const viaApi = await fetchFromApi();
  if (viaApi.length > 0) return viaApi;

  const viaScraping = await scrapeFromArtistPage();
  return viaScraping;
}

async function fetchFromApi(): Promise<Event[]> {
  if (!ARTIST_ID || !KEY) return [];

  try {
    const response = await fetch(`${API}/artists/${ARTIST_ID}/calendar.json?apikey=${KEY}`, {
      next: { revalidate: 1800 },
    });

    if (!response.ok) return [];

    const json = await response.json();
    const events = json?.resultsPage?.results?.event ?? [];

    return events.map((event: SongkickApiEvent) => ({
      id: String(event.id),
      date: event.start?.date ? `${event.start.date}T00:00:00Z` : new Date().toISOString(),
      city: event.location?.city ?? '—',
      venue: event.venue?.displayName ?? '—',
      url: event.uri,
    }));
  } catch {
    return [];
  }
}

async function scrapeFromArtistPage(): Promise<Event[]> {
  if (!ARTIST_ID) return [];

  const artistUrl = `https://www.songkick.com/artists/${ARTIST_ID}-${ARTIST_SLUG}`;

  try {
    const response = await fetch(artistUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CrushOfSoulsBot/1.0; +https://crushofsouls.com)',
      },
      next: { revalidate: 1800 },
    });

    if (!response.ok) return [];

    const html = await response.text();
    const scriptRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    const deduped = new Map<string, Event>();

    for (const match of html.matchAll(scriptRegex)) {
      const raw = match[1]?.trim();
      if (!raw) continue;

      try {
        const parsed = JSON.parse(raw);
        const records = Array.isArray(parsed) ? parsed : [parsed];

        for (const record of records) {
          if (record?.['@type'] !== 'MusicEvent' || !record?.startDate) continue;

          const startDate: string = record.startDate;
          const isoDate = startDate.includes('T') ? startDate : `${startDate}T00:00:00Z`;
          const eventTime = new Date(isoDate).getTime();
          if (Number.isNaN(eventTime) || eventTime < todayStart) continue;

          const url = typeof record.url === 'string' ? record.url : undefined;
          const id = url ?? `${isoDate}-${record?.location?.name ?? 'songkick-event'}`;

          if (deduped.has(id)) continue;

          deduped.set(id, {
            id,
            date: isoDate,
            city: record?.location?.address?.addressLocality ?? '—',
            venue: record?.location?.name ?? '—',
            url,
          });
        }
      } catch {
        // ignore malformed JSON blocks
      }
    }

    return Array.from(deduped.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  } catch {
    return [];
  }
}
