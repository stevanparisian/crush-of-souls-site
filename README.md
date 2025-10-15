# Crush of Souls — Next.js Base

Base applicative professionnelle pour le site officiel de Crush of Souls. Le projet est construit avec Next.js (App Router) et Tailwind CSS, structuré pour intégrer rapidement les APIs Songkick, Spotify et YouTube puis déployer sur Vercel, Netlify ou OVH.

## Points clés
- Layout partagé (NavBar/Footer) avec design noir & blanc, responsive et sticky navigation.
- Pages prêtes : Home, Tour, Music, News, Media, Contact.
- Modules utilitaires côté serveur (`src/lib/*.ts`) pour brancher Songkick, Spotify et YouTube.
- Gestion manuelle des concerts via `src/data/events.ts`, fusionnée avec Songkick si dispo.
- Intégration Instagram : posts sélectionnés + profil embarqué depuis `src/data/instagram.ts`.
- Galerie vidéo YouTube maintenue dans `src/data/videos.ts`.
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
YOUTUBE_CHANNEL_ID=UCxxxxxxx
YOUTUBE_SEARCH_QUERY=Crush of Souls
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
├─ data/events.ts          # Concerts saisis à la main
├─ data/instagram.ts       # Posts / profil Instagram intégrés dans /news
├─ data/videos.ts          # Clips YouTube intégrés dans /media (fallback manuel)
├─ lib/                    # Clients & agrégateurs côté serveur
└─ styles/globals.css      # Tailwind + palette sombre
```

## Intégrations API
- `src/lib/events.ts` : fusionne concerts manuels + Songkick pour `/tour` (section dates à venir + archives complètes).
- `src/lib/songkick.ts` : récupère les concerts via `SONGKICK_*` (tente l’API si clé dispo, sinon scrape la page publique et remonte les derniers concerts à défaut d’annonces).
- `src/lib/videos.ts` : récupère les vidéos YouTube (API + fallback manuel) pour la page `/media`.
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
2. Saisir/mettre à jour les dates dans `src/data/events.ts`.
3. Mettre à jour le profil/posts Instagram dans `src/data/instagram.ts`.
4. Mettre à jour les vidéos dans `src/data/videos.ts`.
5. Intégrer Spotify (ID artiste) + design des releases sur `/music`.
6. Alimenter `/media` via YouTube (`searchVideos`) ou galerie statique.
7. Construire module News (RSS, CMS headless ou saisie manuelle).
8. Ajouter Sitemap/robots, analytics et éventuels formulaires (newsletter, merch).

## Éditer les concerts manuellement

Les dates visibles sur `/tour` proviennent d’abord de `src/data/events.ts`. Ajoute une entrée :

```ts
{
  id: 'manual-2025-09-18-lille-aeronef',
  date: '2025-09-18T20:00:00+02:00',
  city: 'Lille, France',
  venue: "L'Aéronef",
  url: 'https://billetterie.exemple.com', // optionnel
}
```

Le site classe automatiquement les dates à venir et affiche, s’il n’y en a plus, les derniers concerts connus (Songkick ou saisie manuelle). Pense à utiliser un `id` unique pour éviter les doublons.

Toutes les dates (à venir comme passées) sont visibles sur `/tour` — les concerts passés apparaissent dans la section « Archives ».

## Gérer Instagram (profil & posts)

- `instagramProfileUsername` (dans `src/data/instagram.ts`) contrôle l’embed du profil (ex. `crush_of_souls`).
- Pour mettre en avant des posts précis, renseigne la liste `instagramPosts` avec les URLs publiques (`https://www.instagram.com/p/ID/`), et ajoute `caption` si nécessaire.
- La page `/news` affiche soit le profil intégré, soit une grille de posts si la liste est remplie.

## Actualiser les vidéos YouTube

- Renseigne `YOUTUBE_API_KEY` (+ `YOUTUBE_CHANNEL_ID`) pour afficher automatiquement toutes les vidéos
  du compte officiel. À défaut, la recherche `YOUTUBE_SEARCH_QUERY` (par défaut "Crush of Souls") est utilisée.
- Pour compléter ou remplacer les résultats, ajoute des clips manuels dans `src/data/videos.ts`
  (ID vidéo + `title` optionnel).
- La page `/media` fusionne l’API et les entrées manuelles et les affiche dans une grille responsive.

Prêt pour itérations créatives (animations, typographie custom, intégrations presse/merch, automation via scripts cron ou MCP).
