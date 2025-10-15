export default function MusicPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold uppercase tracking-wide">Écouter</h1>
      <div className="grid gap-8">
        <iframe
          style={{ borderRadius: 12 }}
          src="https://open.spotify.com/embed/artist/ARTIST_ID?utm_source=generator"
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

