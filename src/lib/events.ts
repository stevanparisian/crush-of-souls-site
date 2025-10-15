import type { Event } from '@/components/EventCard';
import { manualEvents } from '@/data/events';
import { getRecentEvents as getSongkickRecent, getUpcomingEvents as getSongkickUpcoming } from './songkick';

type SplitEvents = {
  upcoming: Event[];
  past: Event[];
};

export async function getUpcomingEvents(): Promise<Event[]> {
  const { upcoming } = await getEventsSplit();
  return upcoming;
}

export async function getRecentEvents(limit = 3): Promise<Event[]> {
  const { past } = await getEventsSplit();
  return past.slice(0, limit);
}

export async function getEventsSplit(): Promise<SplitEvents> {
  const { upcoming: manualUpcoming, past: manualPast } = splitManualEvents();
  const [songkickUpcoming, songkickPast] = await Promise.all([
    getSongkickUpcoming(),
    getSongkickRecent(Number.POSITIVE_INFINITY),
  ]);

  const upcoming = mergeEvents([...manualUpcoming, ...songkickUpcoming]).sort(sortByDateAsc);
  const past = mergeEvents([...manualPast, ...songkickPast]).sort(sortByDateDesc);

  return { upcoming, past };
}

function splitManualEvents(): SplitEvents {
  const now = Date.now();
  const upcoming: Event[] = [];
  const past: Event[] = [];

  for (const event of manualEvents) {
    const timestamp = new Date(event.date).getTime();
    if (Number.isNaN(timestamp)) continue;

    if (timestamp >= now) {
      upcoming.push(event);
    } else {
      past.push(event);
    }
  }

  upcoming.sort(sortByDateAsc);
  past.sort(sortByDateDesc);

  return { upcoming, past };
}

function mergeEvents(events: Event[]): Event[] {
  const seen = new Set<string>();
  const merged: Event[] = [];

  for (const event of events) {
    if (seen.has(event.id)) continue;
    seen.add(event.id);
    merged.push(event);
  }

  return merged;
}

function sortByDateAsc(a: Event, b: Event) {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}

function sortByDateDesc(a: Event, b: Event) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}
