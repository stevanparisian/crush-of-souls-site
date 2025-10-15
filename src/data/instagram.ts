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
export const instagramPosts: InstagramPost[] = [];

/** Utilise le compte officiel pour l’embed du profil complet. */
export const instagramProfileUsername = 'crush_of_souls';
