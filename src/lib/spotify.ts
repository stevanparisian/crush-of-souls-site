import 'server-only';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

async function getAppToken(): Promise<string | null> {
  if (!CLIENT_ID || !CLIENT_SECRET) return null;

  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) return null;

  const json = await response.json();
  return json.access_token as string;
}

export async function getArtistReleases(artistId: string) {
  const token = await getAppToken();
  if (!token) return [];

  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single,album&market=FR&limit=20`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 1800 },
    },
  );

  if (!response.ok) return [];

  const json = await response.json();
  return json.items ?? [];
}

