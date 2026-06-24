/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DishaImage {
  id: string;
  src: string;
  title: string;
  description: string;
  vibe: string;
}

export const DISHA_IMAGES: DishaImage[] = [
  {
    id: 'blue_saree',
    src: '/images/photo1.jpg',
    title: 'Grace & Elegance',
    description: 'Disha looking breathtakingly elegant in her turquoise blue saree, framed by nature\'s beauty.',
    vibe: 'Traditional Grace'
  },
  {
    id: 'yellow_saree',
    src: '/images/photo2.jpg',
    title: 'Radiant Glow',
    description: 'A glowing smile in vibrant yellow, lighting up the room with warmth and pure happiness.',
    vibe: 'Festive Radiance'
  },
  {
    id: 'two_friends',
    src: '/images/photo3.jpg',
    title: 'Laughter & Friendship',
    description: 'Sharing beautiful moments of celebration and endless smiles with loved ones.',
    vibe: 'Happy Companionship'
  },
  {
    id: 'pink_hoodie',
    src: '/images/photo4.jpg',
    title: 'Charming & Playful',
    description: 'A cozy adventure blending stylish comfort with sweet, natural charm.',
    vibe: 'Playful Spirit'
  },
  {
    id: 'traditional_mother',
    src: '/images/photo5.jpg',
    title: 'Sacred Blessings',
    description: 'A beautiful moment in traditional white, sharing a heart full of love with her mother.',
    vibe: 'Endless Love'
  }
];
