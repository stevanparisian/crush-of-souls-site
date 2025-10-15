export default async function NewsPage() {
  const posts: { title: string; url: string }[] = [];

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold uppercase tracking-wide">News</h1>
      {posts.length === 0 ? (
        <p className="text-zinc-400">Aucun article pour l’instant.</p>
      ) : (
        <ul className="list-inside list-disc">
          {posts.map((post) => (
            <li key={post.url}>
              <a className="underline" href={post.url} target="_blank" rel="noreferrer">
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

