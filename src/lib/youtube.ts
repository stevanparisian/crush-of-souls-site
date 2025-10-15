import 'server-only';

const KEY = process.env.YOUTUBE_API_KEY;

export async function searchVideos(channelIdOrQuery: string) {
  if (!KEY) return [];

  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('maxResults', '12');

  if (channelIdOrQuery.startsWith('UC')) {
    url.searchParams.set('channelId', channelIdOrQuery);
  } else {
    url.searchParams.set('q', channelIdOrQuery);
  }

  url.searchParams.set('key', KEY);

  const response = await fetch(url.toString(), { next: { revalidate: 1800 } });

  if (!response.ok) return [];

  const json = await response.json();
  return json.items ?? [];
}

