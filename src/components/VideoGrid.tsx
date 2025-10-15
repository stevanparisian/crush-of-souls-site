import type { Video } from '@/data/videos';

type VideoGridProps = {
  videos: Video[];
};

export function VideoGrid({ videos }: VideoGridProps) {
  if (videos.length === 0) {
    return <p className="text-zinc-400">Aucune vidéo pour le moment.</p>;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {videos.map((video) => (
        <article
          key={video.id}
          className="overflow-hidden rounded-2xl border border-zinc-800 bg-black/60 shadow-lg shadow-black/30"
        >
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title ?? `YouTube video ${video.id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {video.title && (
            <p className="px-4 py-3 text-sm text-zinc-300">
              {video.title}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

