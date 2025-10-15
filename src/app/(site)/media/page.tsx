import { VideoGrid } from '@/components/VideoGrid';
import { videos } from '@/data/videos';

export default function MediaPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold uppercase tracking-wide">Media</h1>
      <p className="mb-8 max-w-2xl text-sm text-zinc-400">
        Clips, lives et visualisers. Édite la sélection dans
        <code className="mx-1 rounded bg-zinc-900 px-2 py-0.5 text-[0.8rem]">src/data/videos.ts</code>.
      </p>
      <VideoGrid videos={videos} />
    </div>
  );
}
