# Crush of Souls — Next.js Base

Base applicative professionnelle pour le site officiel de Crush of Souls. Le projet est construit avec Next.js (App Router) et Tailwind CSS, structuré pour intégrer rapidement les APIs Songkick, Spotify et YouTube puis déployer sur Vercel, Netlify ou OVH.

## Points clés
- Layout partagé (NavBar/Footer) avec design noir & blanc, responsive et sticky navigation.
- Pages prêtes : Home, Tour, Music, News, Media, Contact.
- Modules utilitaires côté serveur (`src/lib/*.ts`) pour brancher Songkick, Spotify et YouTube.
- ISR configuré (`revalidate`) pour les pages connectées aux APIs externes.
- Assets SEO de base (`public/logo.svg`, `public/og-image.jpg`) et métadonnées globales.

## Démarrage rapide
```bash
npm install
npm run dev
# http://localhost:3000
```

Lint / build :
```bash
npm run lint
npm run build
```

## Variables d’environnement
Créer un fichier `.env.local` (non commité) :
```
# Songkick
# Optionnel (ID/slug par défaut déjà pris en charge)
SONGKICK_ARTIST_ID=10207079
SONGKICK_ARTIST_SLUG=crush-of-souls
SONGKICK_API_KEY=xxx

# Spotify
SPOTIFY_CLIENT_ID=xxx
SPOTIFY_CLIENT_SECRET=xxx

# YouTube
YOUTUBE_API_KEY=xxx
```

## Structure
```
src/
├─ app/
│  ├─ (site)/
│  │  ├─ layout.tsx        # Layout principal (NavBar/Footer)
│  │  ├─ page.tsx          # Home
│  │  ├─ tour/page.tsx     # /tour
│  │  ├─ music/page.tsx    # /music
│  │  ├─ news/page.tsx     # /news
│  │  └─ media/page.tsx    # /media
│  └─ contact/page.tsx     # /contact
├─ components/             # UI réutilisable (NavBar, Section, EventCard…)
├─ lib/                    # Clients API côté serveur
└─ styles/globals.css      # Tailwind + palette sombre
```

## Intégrations API
- `src/lib/songkick.ts` : récupère les concerts via `SONGKICK_*` (tente l’API si clé dispo, sinon scrape la page publique et remonte les derniers concerts à défaut d’annonces).
- `src/lib/spotify.ts` : échange client credentials → releases Spotify.
- `src/lib/youtube.ts` : recherche vidéos d’une chaîne ou requête.

Chaque module renvoie des données prêtes à mapper dans les pages (`Tour` utilise déjà Songkick via `EventCard`).

## Déploiement
1. **Vercel** (recommandé)  
   - Importer le repo GitHub  
   - Déclarer les variables d’environnement  
   - Deploy (ISR supporté nativement)
2. **Netlify**  
   - Build command `next build`  
   - Publish directory `.next`  
   - Activer le Next Runtime si SSR requis
3. **OVH**  
   - Mutualisé : `next.config.ts` → `output: 'export'` puis `npx next export` (perte SSR/ISR)  
   - VPS : déployer Node + reverse proxy (PM2/Nginx)

## Roadmap suggérée
1. Brancher Songkick avec les vraies clés et valider `/tour`.
2. Intégrer Spotify (ID artiste) + design des releases sur `/music`.
3. Alimenter `/media` via YouTube (`searchVideos`) ou galerie statique.
4. Construire module News (RSS, CMS headless ou saisie manuelle).
5. Ajouter Sitemap/robots, analytics et éventuels formulaires (newsletter, merch).

Prêt pour itérations créatives (animations, typographie custom, intégrations presse/merch, automation via scripts cron ou MCP).
