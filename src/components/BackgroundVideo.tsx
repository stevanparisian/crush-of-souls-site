export function BackgroundVideo() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full scale-110 object-cover"
        src="/cos_pureweapon_video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
    </div>
  );
}
