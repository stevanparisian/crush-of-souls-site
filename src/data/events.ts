import type { Event } from '@/components/EventCard';

/**
 * Liste des concerts maintenue manuellement.
 * Ajoute, supprime ou modifie les entrées puis laisse Next.js re-build.
 */
export const manualEvents: Event[] = [
  {
    id: 'manual-2025-05-30-paris-le-trianon',
    date: '2025-05-30T20:00:00+02:00',
    city: 'Paris, France',
    venue: 'Le Trianon',
    url: 'https://crushofsouls.com/billets/paris',
  },
  {
    id: 'manual-2025-06-05-berlin-berghain-kantine',
    date: '2025-06-05T20:00:00+02:00',
    city: 'Berlin, Allemagne',
    venue: 'Berghain Kantine',
    url: 'https://crushofsouls.com/billets/berlin',
  },
  {
    id: 'manual-2025-04-12-lyon-le-sucre',
    date: '2025-04-12T20:00:00+02:00',
    city: 'Lyon, France',
    venue: 'Le Sucre',
  },
];

