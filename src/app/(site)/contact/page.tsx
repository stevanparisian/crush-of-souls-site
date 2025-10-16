export default function ContactPage() {
  return (
    <div className="page-wrapper py-10">
      <h1 className="mb-6 text-3xl font-bold uppercase tracking-[0.35em] text-white">Contacts</h1>

      <div className="space-y-6 text-sm text-zinc-300">
        <section>
          <h2 className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-400">Booking / Tournées</h2>
          <p>
            <a className="underline-offset-4 hover:underline" href="mailto:booking@crushofsouls.com">
              booking@crushofsouls.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-400">Presse / Promo</h2>
          <p>
            <a className="underline-offset-4 hover:underline" href="mailto:press@crushofsouls.com">
              press@crushofsouls.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-400">Management</h2>
          <p>
            <a className="underline-offset-4 hover:underline" href="mailto:management@crushofsouls.com">
              management@crushofsouls.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
