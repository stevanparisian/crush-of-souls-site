import { VideoGrid } from '@/components/VideoGrid';
import { getMediaVideos } from '@/lib/videos';

export default async function MediaPage() {
  const mediaVideos = await getMediaVideos();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold uppercase tracking-wide">Media</h1>
      <p className="mb-8 max-w-2xl text-sm text-zinc-400">
        Clips, lives et visualisers issus de la chaîne YouTube officielle. Configure
        <code className="mx-1 rounded bg-zinc-900 px-2 py-0.5 text-[0.8rem]">YOUTUBE_CHANNEL_ID</code>
        (ou renseigne des vidéos manuelles dans
        <code className="mx-1 rounded bg-zinc-900 px-2 py-0.5 text-[0.8rem]">src/data/videos.ts</code>).
      </p>
      <VideoGrid videos={mediaVideos} />
    </div>
  );
}
