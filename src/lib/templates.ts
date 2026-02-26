import { Template } from '@/types';

export const templates: Template[] = [
  {
    id: 'vertical-short',
    name: 'Vertical Short',
    description: 'Perfect for TikTok and Reels',
    thumbnail: '/templates/vertical-short.png',
    category: 'social',
    settings: {
      crop: {
        x: 0,
        y: 0,
        width: 1080,
        height: 1920,
        aspectRatio: '9:16',
      },
      textOverlays: [
        {
          id: '1',
          text: 'Your Title Here',
          x: 50,
          y: 15,
          fontSize: 72,
          fontFamily: 'Impact',
          color: '#ffffff',
          startTime: 0,
          endTime: 5,
          animation: 'fadeIn',
        },
      ],
    },
  },
  {
    id: 'tutorial',
    name: 'Tutorial',
    description: 'Educational content with subtitles',
    thumbnail: '/templates/tutorial.png',
    category: 'tutorial',
    settings: {
      crop: {
        x: 0,
        y: 0,
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
      },
      textOverlays: [
        {
          id: '1',
          text: 'Step 1:',
          x: 10,
          y: 85,
          fontSize: 48,
          fontFamily: 'Arial',
          color: '#ffffff',
          startTime: 0,
          endTime: 10,
          animation: 'none',
        },
      ],
    },
  },
  {
    id: 'gaming-highlight',
    name: 'Gaming Highlight',
    description: 'Epic gaming moments',
    thumbnail: '/templates/gaming.png',
    category: 'gaming',
    settings: {
      crop: {
        x: 0,
        y: 0,
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
      },
      textOverlays: [
        {
          id: '1',
          text: 'EPIC',
          x: 50,
          y: 50,
          fontSize: 96,
          fontFamily: 'Impact',
          color: '#ff0000',
          startTime: 0,
          endTime: 3,
          animation: 'slideUp',
        },
      ],
    },
  },
  {
    id: 'vlog',
    name: 'Vlog',
    description: 'Personal vlog style',
    thumbnail: '/templates/vlog.png',
    category: 'vlog',
    settings: {
      crop: {
        x: 0,
        y: 0,
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
      },
      textOverlays: [
        {
          id: '1',
          text: 'Day in the Life',
          x: 50,
          y: 10,
          fontSize: 64,
          fontFamily: 'Georgia',
          color: '#ffffff',
          startTime: 0,
          endTime: 5,
          animation: 'fadeIn',
        },
      ],
    },
  },
  {
    id: 'promo',
    name: 'Product Promo',
    description: 'Promotional content',
    thumbnail: '/templates/promo.png',
    category: 'promo',
    settings: {
      crop: {
        x: 0,
        y: 0,
        width: 1080,
        height: 1080,
        aspectRatio: '1:1',
      },
      textOverlays: [
        {
          id: '1',
          text: 'New Product!',
          x: 50,
          y: 20,
          fontSize: 80,
          fontFamily: 'Arial',
          color: '#ffff00',
          startTime: 0,
          endTime: 5,
          animation: 'fadeIn',
        },
        {
          id: '2',
          text: 'Shop Now',
          x: 50,
          y: 80,
          fontSize: 56,
          fontFamily: 'Arial',
          color: '#ffffff',
          startTime: 2,
          endTime: 10,
          animation: 'slideUp',
        },
      ],
    },
  },
];

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((t) => t.id === id);
};

export const getTemplatesByCategory = (
  category: Template['category']
): Template[] => {
  return templates.filter((t) => t.category === category);
};
