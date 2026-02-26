'use client';

import { useEditorStore } from '@/store/editorStore';
import { Crop, Smartphone, Monitor, Square } from 'lucide-react';

export default function CropControls() {
  const { settings, updateCrop } = useEditorStore();

  const aspectRatios = [
    {
      value: '9:16' as const,
      label: '9:16 Vertical',
      description: 'TikTok, Reels, Shorts',
      icon: Smartphone,
    },
    {
      value: '16:9' as const,
      label: '16:9 Landscape',
      description: 'YouTube, Desktop',
      icon: Monitor,
    },
    {
      value: '1:1' as const,
      label: '1:1 Square',
      description: 'Instagram Feed',
      icon: Square,
    },
  ];

  const currentRatio = settings.crop?.aspectRatio || '16:9';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Crop className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">Crop & Resize</h3>
          <p className="text-sm text-gray-400">Change aspect ratio</p>
        </div>
      </div>

      {/* Aspect Ratio Options */}
      <div className="space-y-3">
        {aspectRatios.map((ratio) => {
          const Icon = ratio.icon;
          const isActive = currentRatio === ratio.value;

          return (
            <button
              key={ratio.value}
              onClick={() => updateCrop(ratio.value)}
              className={`
                w-full card flex items-center gap-4 text-left transition-all
                ${isActive
                  ? 'border-primary bg-primary/10'
                  : 'hover:border-primary/50'
                }
              `}
            >
              <div
                className={`
                w-12 h-12 rounded-lg flex items-center justify-center
                ${isActive ? 'bg-primary text-white' : 'bg-dark-hover text-gray-400'}
              `}
              >
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <h4 className="font-semibold mb-0.5">{ratio.label}</h4>
                <p className="text-sm text-gray-400">{ratio.description}</p>
              </div>

              {isActive && (
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* One-Click Vertical */}
      <div className="card bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold mb-1">One-Click Vertical</h4>
            <p className="text-sm text-gray-400 mb-3">
              Perfect for TikTok and Instagram Reels
            </p>
            <button
              onClick={() => updateCrop('9:16')}
              className="btn-primary text-sm py-2 px-4"
            >
              Make it 9:16
            </button>
          </div>
        </div>
      </div>

      {/* Current Settings */}
      <div className="card bg-dark-hover">
        <p className="text-sm text-gray-400 mb-2">Current Aspect Ratio</p>
        <p className="text-2xl font-bold text-primary">{currentRatio}</p>
      </div>

      {/* Tips */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-primary">💡 Tip:</span> Use 9:16 for
          maximum engagement on TikTok, Reels, and Shorts. The crop will be
          automatically centered.
        </p>
      </div>
    </div>
  );
}
