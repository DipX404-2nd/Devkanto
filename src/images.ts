/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DevkantoImage {
  id: string;
  src: string;
  title: string;
  description: string;
  vibe: string;
}

export const DEVKANTO_IMAGES: DevkantoImage[] = [
  {
    id: 'blue_saree',
    src: './images/photo6.jpg',
    title: 'Grace & Elegance',
    description: 'Devkanto looking breathtakingly elegant in his turquoise blue saree, framed by nature\'s beauty.',
    vibe: 'Traditional Grace'
  },
  {
    id: 'yellow_saree',
    src: './images/photo7.jpg',
    title: 'Radiant Glow',
    description: 'A glowing smile in vibrant yellow, lighting up the room with warmth and pure happiness.',
    vibe: 'Festive Radiance'
  },
  {
    id: 'two_friends',
    src: './images/photo8.jpg',
    title: 'Laughter & Friendship',
    description: 'Sharing beautiful moments of celebration and endless smiles with loved ones.',
    vibe: 'Happy Companionship'
  },
  {
    id: 'pink_hoodie',
    src: './images/photo9.jpg',
    title: 'Charming & Playful',
    description: 'A cozy adventure blending stylish comfort with sweet, natural charm.',
    vibe: 'Playful Spirit'
  },
  {
    id: 'traditional_mother',
    src: './images/photo10.jpg',
    title: 'Sacred Blessings',
    description: 'A beautiful moment in traditional white, sharing a heart full of love with his mother.',
    vibe: 'Endless Love'
  }
];
