const VIDEO_ID = 'EWIWy-6SM8M';
const VIDEO_PARAMS =
  'autoplay=1&mute=1&controls=0&loop=1&playlist=EWIWy-6SM8M&playsinline=1&modestbranding=1&rel=0&showinfo=0';

export function BackgroundVideo() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <iframe
        className="absolute inset-0 h-full w-full scale-125 object-cover sm:scale-110"
        src={`https://www.youtube.com/embed/${VIDEO_ID}?${VIDEO_PARAMS}`}
        title="Crush of Souls — The Pure Weapon"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
    </div>
  );
}
