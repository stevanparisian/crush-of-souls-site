import 'server-only';

const KEY = process.env.YOUTUBE_API_KEY;

export type YouTubeSearchItem = {
  id: string | { videoId?: string; kind?: string };
  snippet?: {
    title?: string;
    description?: string;
    publishedAt?: string;
    thumbnails?: Record<string, { url?: string }>;
  };
};

type SearchOptions = {
  maxResults?: number;
  type?: 'video' | 'channel' | 'playlist';
  order?: 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount';
};

export async function searchVideos(channelIdOrQuery: string, options: SearchOptions = {}): Promise<YouTubeSearchItem[]> {
  if (!KEY) return [];

  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('maxResults', String(options.maxResults ?? 12));
  if (options.type) url.searchParams.set('type', options.type);
  if (options.order) url.searchParams.set('order', options.order);

  if (channelIdOrQuery.startsWith('UC')) {
    url.searchParams.set('channelId', channelIdOrQuery);
  } else {
    url.searchParams.set('q', channelIdOrQuery);
  }

  url.searchParams.set('key', KEY);

  const response = await fetch(url.toString(), { next: { revalidate: 1800 } });

  if (!response.ok) return [];

  const json = await response.json();
  return (json.items ?? []) as YouTubeSearchItem[];
}
