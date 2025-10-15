import type { Video } from '@/data/videos';
import { videos as manualVideos } from '@/data/videos';
import { searchVideos } from '@/lib/youtube';

type MediaVideo = Video;

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? '';
const SEARCH_QUERY = process.env.YOUTUBE_SEARCH_QUERY ?? 'Crush of Souls';
const API_KEY = process.env.YOUTUBE_API_KEY ?? '';

export async function getMediaVideos(): Promise<MediaVideo[]> {
  const fromYouTube = await fetchFromYouTube();
  if (fromYouTube.length > 0) {
    return fromYouTube;
  }

  return manualVideos;
}

async function fetchFromYouTube(): Promise<MediaVideo[]> {
  if (!API_KEY) return [];

  const target = CHANNEL_ID || SEARCH_QUERY;
  const results = await searchVideos(target, { maxResults: 50, type: 'video', order: 'date' });
  if (!Array.isArray(results) || results.length === 0) return [];

  const deduped = new Map<string, MediaVideo>();

  for (const item of results) {
    const videoId =
      typeof item?.id === 'string'
        ? item.id
        : typeof item?.id?.videoId === 'string'
          ? item.id.videoId
          : undefined;

    if (!videoId || deduped.has(videoId)) continue;

    const title = item?.snippet?.title as string | undefined;
    deduped.set(videoId, { id: videoId, title });
  }

  return Array.from(deduped.values());
}
