import type { Video } from '@/data/videos';
import { videos as manualVideos } from '@/data/videos';
import { searchVideos } from '@/lib/youtube';

type MediaVideo = Video;

const CHANNEL_ID = (process.env.YOUTUBE_CHANNEL_ID ?? '').trim();
const SEARCH_QUERY = (process.env.YOUTUBE_SEARCH_QUERY ?? 'Crush of Souls').trim();
const API_KEY = (process.env.YOUTUBE_API_KEY ?? '').trim();

export async function getMediaVideos(): Promise<MediaVideo[]> {
  const automaticVideos = await fetchFromYouTube();
  const combined = dedupeById([...automaticVideos, ...manualVideos]);

  if (combined.length > 0) {
    return combined;
  }

  return manualVideos;
}

async function fetchFromYouTube(): Promise<MediaVideo[]> {
  if (API_KEY) {
    return fetchViaApi(CHANNEL_ID || SEARCH_QUERY);
  }

  if (CHANNEL_ID) {
    return fetchViaRss(CHANNEL_ID);
  }

  return [];
}

async function fetchViaApi(target: string): Promise<MediaVideo[]> {
  try {
    const results = await searchVideos(target, { maxResults: 50, type: 'video', order: 'date' });
    if (!Array.isArray(results) || results.length === 0) return [];

    const mapped: MediaVideo[] = [];

    for (const item of results) {
      const videoId =
        typeof item?.id === 'string'
          ? item.id
          : typeof item?.id?.videoId === 'string'
            ? item.id.videoId
            : undefined;

      if (!videoId) continue;

      const title = item?.snippet?.title as string | undefined;
      mapped.push({ id: videoId, title });
    }

    return mapped;
  } catch {
    return [];
  }
}

async function fetchViaRss(channelId: string): Promise<MediaVideo[]> {
  try {
    const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      next: { revalidate: 1800 },
    });

    if (!response.ok) return [];

    const xml = await response.text();
    const entries = xml.split('<entry>').slice(1);
    const videos: MediaVideo[] = [];

    for (const entry of entries) {
      const idMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      if (!idMatch) continue;

      const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
      videos.push({ id: idMatch[1], title: titleMatch ? decodeTitle(titleMatch[1]) : undefined });
    }

    return videos;
  } catch {
    return [];
  }
}

function dedupeById(videos: MediaVideo[]): MediaVideo[] {
  const seen = new Set<string>();
  const result: MediaVideo[] = [];

  for (const video of videos) {
    if (!video.id || seen.has(video.id)) continue;
    seen.add(video.id);
    result.push(video);
  }

  return result;
}

function decodeTitle(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}
