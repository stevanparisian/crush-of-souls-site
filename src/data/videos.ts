export type Video = {
  /** Identifiant YouTube (ce qui suit v= dans l'URL). */
  id: string;
  /** Titre ou description courte pour auxiliaires. */
  title?: string;
};

/**
 * Clips / lives YouTube intégrés sur la page Media.
 * Renseigne ici les IDs vidéo officiels de Crush of Souls.
 */
export const videos: Video[] = [
  {
    id: 'VIDEO_ID_A_REMPLACER',
    title: 'Remplace cet ID par un clip officiel.',
  },
];

