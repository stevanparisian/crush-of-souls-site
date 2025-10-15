'use client';

import { useEffect } from 'react';
import Script from 'next/script';

import type { InstagramPost } from '@/data/instagram';

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process(): void;
      };
    };
  }
}

type InstagramFeedProps = {
  posts: InstagramPost[];
};

export function InstagramFeed({ posts }: InstagramFeedProps) {
  useEffect(() => {
    window.instgrm?.Embeds?.process();
  }, [posts]);

  if (posts.length === 0) {
    return <p className="text-zinc-400">Aucun post Instagram pour le moment.</p>;
  }

  return (
    <>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onReady={() => window.instgrm?.Embeds?.process()}
      />
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.url}
            className="overflow-hidden rounded-2xl border border-zinc-800 bg-black/60 p-4"
          >
            <div className="instagram-embed" suppressHydrationWarning>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={post.url}
                data-instgrm-version="14"
              >
                <a href={post.url} target="_blank" rel="noreferrer">
                  Voir ce post Instagram
                </a>
              </blockquote>
            </div>
            {post.caption && <p className="mt-4 text-sm text-zinc-400">{post.caption}</p>}
          </article>
        ))}
      </div>
    </>
  );
}

