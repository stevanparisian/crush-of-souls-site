export type Video = {
  /** Identifiant YouTube (ce qui suit v= dans l'URL). */
  id: string;
  /** Titre ou description courte pour auxiliaires. */
  title?: string;
};

/**
 * Clips / lives YouTube intégrés sur la page Media.
 * Sert de fallback manuel si l’API YouTube n’est pas configurée.
 */
export const videos: Video[] = [
  {
    id: 'YmMPMjCSxd0',
    title: 'Crush of Souls – Souls Apart (Official Video)',
  },
  {
    id: 'x8PB19u3NsY',
    title: 'Crush of Souls – Touch From A Heartbeat (Official Video)',
  },
  {
    id: 'Tgdo16p3a5I',
    title: 'Crush of Souls – Cult Of Two (Official Video)',
  },
  {
    id: 'EWIWy-6SM8M',
    title: 'Crush of Souls – The Pure Weapon (Official Video)',
  },
  {
    id: 'X1hpYBYXtvA',
    title: 'Crush of Souls – Pain & Ecstasy (Official Video)',
  },
  {
    id: 'nz153QUa1Ck',
    title: 'Crush of Souls – Southern Boy (Official Video)',
  },
  {
    id: 'XUTqD_AqWro',
    title: 'Crush of Souls – X Lover (Official Visual)',
  },
];
