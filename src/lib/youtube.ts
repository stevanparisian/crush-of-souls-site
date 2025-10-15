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
  pageToken?: string;
};

export type YouTubeSearchResponse = {
  items: YouTubeSearchItem[];
  nextPageToken?: string;
};

export async function searchVideos(
  channelIdOrQuery: string,
  options: SearchOptions = {},
): Promise<YouTubeSearchResponse> {
  if (!KEY) {
    return { items: [] };
  }

  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('maxResults', String(options.maxResults ?? 12));
  url.searchParams.set('key', KEY);
  if (options.type) url.searchParams.set('type', options.type);
  if (options.order) url.searchParams.set('order', options.order);
  if (options.pageToken) url.searchParams.set('pageToken', options.pageToken);

  if (channelIdOrQuery.startsWith('UC')) {
    url.searchParams.set('channelId', channelIdOrQuery);
  } else {
    url.searchParams.set('q', channelIdOrQuery);
  }

  const response = await fetch(url.toString(), { next: { revalidate: 1800 } });

  if (!response.ok) {
    return { items: [] };
  }

  const json = await response.json();
  return {
    items: (json.items ?? []) as YouTubeSearchItem[],
    nextPageToken: typeof json.nextPageToken === 'string' ? json.nextPageToken : undefined,
  };
}

