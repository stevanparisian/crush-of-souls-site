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

type ScrapedEvent = {
  event: Event;
  timestamp: number;
};

type ScrapeBuckets = {
  upcoming: Event[];
  past: Event[];
};

export async function getUpcomingEvents(): Promise<Event[]> {
  const viaApi = await fetchFromApi();
  if (viaApi.length > 0) return viaApi;

  const scraped = await scrapeFromArtistPage();
  return scraped.upcoming;
}

export async function getRecentEvents(limit = 3): Promise<Event[]> {
  const viaApi = await fetchFromApi();
  if (viaApi.length > 0) return viaApi;

  const scraped = await scrapeFromArtistPage();
  return scraped.past.slice(0, limit);
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

async function scrapeFromArtistPage(): Promise<ScrapeBuckets> {
  if (!ARTIST_ID) return { upcoming: [], past: [] };

  const artistUrl = `https://www.songkick.com/artists/${ARTIST_ID}-${ARTIST_SLUG}`;

  try {
    const response = await fetch(artistUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CrushOfSoulsBot/1.0; +https://crushofsouls.com)',
      },
      next: { revalidate: 1800 },
    });

    if (!response.ok) return { upcoming: [], past: [] };

    const html = await response.text();
    const scriptRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    const deduped = new Set<string>();
    const upcoming: ScrapedEvent[] = [];
    const past: ScrapedEvent[] = [];

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
          if (Number.isNaN(eventTime)) continue;

          const url = typeof record.url === 'string' ? record.url : undefined;
          const id = url ?? `${isoDate}-${record?.location?.name ?? 'songkick-event'}`;

          if (deduped.has(id)) continue;
          deduped.add(id);

          const entry: ScrapedEvent = {
            event: {
              id,
              date: isoDate,
              city: record?.location?.address?.addressLocality ?? '—',
              venue: record?.location?.name ?? '—',
              url,
            },
            timestamp: eventTime,
          };

          if (eventTime >= todayStart) {
            upcoming.push(entry);
          } else {
            past.push(entry);
          }
        }
      } catch {
        // ignore malformed JSON blocks
      }
    }

    upcoming.sort((a, b) => a.timestamp - b.timestamp);
    past.sort((a, b) => b.timestamp - a.timestamp);

    return {
      upcoming: upcoming.map(({ event }) => event),
      past: past.map(({ event }) => event),
    };
  } catch {
    return { upcoming: [], past: [] };
  }
}
