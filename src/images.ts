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
    id: 'cafe_smile',
    src: './images/photo6.jpg?v=3',
    title: 'Warm Cafe Vibes',
    description: 'A charming moment of relaxation, sharing a radiant smile and warm conversations.',
    vibe: 'Cool & Relaxed'
  },
  {
    id: 'park_adventure',
    src: './images/photo7.jpg?v=3',
    title: 'Outdoor Adventure',
    description: 'Ready to explore the world with cool confidence, stylish shades, and an adventurous spirit.',
    vibe: 'Vibrant Explorer'
  },
  {
    id: 'festive_confidence',
    src: './images/photo8.jpg?v=3',
    title: 'Tradition & Style',
    description: 'Blending classic check patterns with festive poise and an elegant, confident stance.',
    vibe: 'Stylish Sophistication'
  },
  {
    id: 'river_breeze',
    src: './images/photo9.jpg?v=3',
    title: 'By the Waterside',
    description: 'A serene walk along the river, enjoying the gentle breeze and natural outdoor beauty.',
    vibe: 'Serene Charm'
  },
  {
    id: 'steps_reflection',
    src: './images/photo10.jpg?v=3',
    title: 'Moments of Reflection',
    description: 'Sitting comfortably, reflecting on beautiful memories with a peaceful and happy mind.',
    vibe: 'Thoughtful Grace'
  }
];
