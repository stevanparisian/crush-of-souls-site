import type { Event } from '@/components/EventCard';
import { manualEvents } from '@/data/events';
import { getRecentEvents as getSongkickRecent, getUpcomingEvents as getSongkickUpcoming } from './songkick';

type SplitEvents = {
  upcoming: Event[];
  past: Event[];
};

export async function getUpcomingEvents(): Promise<Event[]> {
  const { upcoming: manualUpcoming } = splitManualEvents();
  const songkickUpcoming = await getSongkickUpcoming();

  const combined = mergeEvents([...manualUpcoming, ...songkickUpcoming]);
  return combined.sort(sortByDateAsc);
}

export async function getRecentEvents(limit = 3): Promise<Event[]> {
  const { past: manualPast } = splitManualEvents();
  const songkickRecent = await getSongkickRecent(limit);

  const combined = mergeEvents([...manualPast, ...songkickRecent]);
  return combined.sort(sortByDateDesc).slice(0, limit);
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

