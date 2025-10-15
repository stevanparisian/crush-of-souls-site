export default function MusicPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold uppercase tracking-wide">Écouter</h1>
      <div className="max-w-3xl">
        <iframe
          style={{ borderRadius: 12 }}
          src="https://open.spotify.com/embed/artist/6lrYlq9d2alpuagPfXzSne?utm_source=generator"
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      </div>
    </div>
  );
}
