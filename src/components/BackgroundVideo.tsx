'use client';

import { useEffect, useRef } from 'react';

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      video.currentTime = 0;
      void video.play().catch(() => {
        // Autoplay might still be blocked on some browsers; user interaction will start playback.
      });
    };

    const onCanPlay = () => {
      video.style.opacity = '1';
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
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-opacity duration-700"
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
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/40 to-black/80" />
    </div>
  );
}
