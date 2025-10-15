export type InstagramPost = {
  /** Lien public du post Instagram (format https://www.instagram.com/p/ID/) */
  url: `https://www.instagram.com/p/${string}/`;
  /** Texte optionnel qui apparaîtra sous l’embed. */
  caption?: string;
};

/**
 * Posts Instagram affichés dans la page News.
 * Remplace les entrées par les URLs officielles de Crush of Souls.
 */
export const instagramPosts: InstagramPost[] = [
  {
    url: 'https://www.instagram.com/p/POST_ID_A_REMPLACER/',
    caption: 'Remplace ce post par un lien Instagram officiel.',
  },
];

