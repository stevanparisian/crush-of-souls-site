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
    title: 'Crush of Souls – Clip officiel',
  },
];
