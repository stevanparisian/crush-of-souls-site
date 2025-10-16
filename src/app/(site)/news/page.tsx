import { InstagramFeed } from '@/components/InstagramFeed';
import { instagramPosts, instagramProfileUsername } from '@/data/instagram';

export default function NewsPage() {
  return (
    <div className="page-wrapper">
      <h1 className="mb-6 text-3xl font-bold uppercase tracking-wide">News</h1>
      <p className="mb-8 max-w-2xl text-sm text-zinc-400">
        Dernières publications Instagram — ajoute ou remplace les posts dans
        <code className="mx-1 rounded bg-zinc-900 px-2 py-0.5 text-[0.8rem]">src/data/instagram.ts</code>
        pour mettre à jour cette section.
      </p>
      <InstagramFeed posts={instagramPosts} profileUsername={instagramProfileUsername} />
    </div>
  );
}
