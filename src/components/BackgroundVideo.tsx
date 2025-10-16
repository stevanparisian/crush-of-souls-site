'use client';

import { useEffect, useRef } from 'react';

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      video.muted = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.currentTime = 0;
      void video.play().catch(() => {
        // Autoplay might still be blocked on some browsers; user interaction will start playback.
      });
    };

    const onCanPlay = () => {
      attemptPlay();
    };

    video.load();

    if (video.readyState >= 2) {
      onCanPlay();
    } else {
      video.addEventListener('canplay', onCanPlay, { once: true });
    }

    const handleVisibility = () => {
      if (!document.hidden) {
        attemptPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-black">
      <video
        className="block h-screen w-screen object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        ref={videoRef}
        poster="/og-image.jpg"
      >
        <source src="/cos_pureweapon_video_compressed.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-black/60" />
    </div>
  );
}
