/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// @ts-ignore
import photo6 from './assets/images/photo6.jpg';
// @ts-ignore
import photo7 from './assets/images/photo7.jpg';
// @ts-ignore
import photo8 from './assets/images/photo8.jpg';
// @ts-ignore
import photo9 from './assets/images/photo9.jpg';
// @ts-ignore
import photo10 from './assets/images/photo10.jpg';

export interface DevkantoImage {
  id: string;
  src: string;
  title: string;
  description: string;
  vibe: string;
}

export const DEVKANTO_IMAGES: DevkantoImage[] = [
  {
    id: 'cafe_smile',
    src: photo6 || '/images/photo6.jpg',
    title: 'Warm Cafe Vibes',
    description: 'A charming moment of relaxation, sharing a radiant smile and warm conversations.',
    vibe: 'Cool & Relaxed'
  },
  {
    id: 'park_adventure',
    src: photo7 || '/images/photo7.jpg',
    title: 'Outdoor Adventure',
    description: 'Ready to explore the world with cool confidence, stylish shades, and an adventurous spirit.',
    vibe: 'Vibrant Explorer'
  },
  {
    id: 'festive_confidence',
    src: photo8 || '/images/photo8.jpg',
    title: 'Tradition & Style',
    description: 'Blending classic check patterns with festive poise and an elegant, confident stance.',
    vibe: 'Stylish Sophistication'
  },
  {
    id: 'river_breeze',
    src: photo9 || '/images/photo9.jpg',
    title: 'By the Waterside',
    description: 'A serene walk along the river, enjoying the gentle breeze and natural outdoor beauty.',
    vibe: 'Serene Charm'
  },
  {
    id: 'steps_reflection',
    src: photo10 || '/images/photo10.jpg',
    title: 'Moments of Reflection',
    description: 'Sitting comfortably, reflecting on beautiful memories with a peaceful and happy mind.',
    vibe: 'Thoughtful Grace'
  }
];
