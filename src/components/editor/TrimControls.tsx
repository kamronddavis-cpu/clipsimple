'use client';

import { useEditorStore } from '@/store/editorStore';
import { Scissors } from 'lucide-react';

export default function TrimControls() {
  const { videoDuration, settings, updateTrim } = useEditorStore();

  const trimStart = settings.trimStart || 0;
  const trimEnd = settings.trimEnd || videoDuration;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Scissors className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">Trim Video</h3>
          <p className="text-sm text-gray-400">Set start and end points</p>
        </div>
      </div>

      {/* Start Time */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Start Time: {formatTime(trimStart)}
        </label>
        <input
          type="range"
          min="0"
          max={videoDuration}
          step="0.1"
          value={trimStart}
          onChange={(e) => {
            const newStart = parseFloat(e.target.value);
            if (newStart < trimEnd) {
              updateTrim(newStart, trimEnd);
            }
          }}
          className="w-full"
        />
      </div>

      {/* End Time */}
      <div>
        <label className="block text-sm font-medium mb-2">
          End Time: {formatTime(trimEnd)}
        </label>
        <input
          type="range"
          min="0"
          max={videoDuration}
          step="0.1"
          value={trimEnd}
          onChange={(e) => {
            const newEnd = parseFloat(e.target.value);
            if (newEnd > trimStart) {
              updateTrim(trimStart, newEnd);
            }
          }}
          className="w-full"
        />
      </div>

      {/* Duration Info */}
      <div className="card bg-dark-hover">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 mb-1">Original Duration</p>
            <p className="font-semibold">{formatTime(videoDuration)}</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">New Duration</p>
            <p className="font-semibold text-primary">
              {formatTime(trimEnd - trimStart)}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-400">Quick Actions</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => updateTrim(0, videoDuration / 2)}
            className="btn-secondary text-sm py-2"
          >
            First Half
          </button>
          <button
            onClick={() => updateTrim(videoDuration / 2, videoDuration)}
            className="btn-secondary text-sm py-2"
          >
            Second Half
          </button>
          <button
            onClick={() => updateTrim(0, videoDuration)}
            className="btn-secondary text-sm py-2 col-span-2"
          >
            Reset to Full
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-primary">💡 Tip:</span> Drag the
          sliders to select the portion of video you want to keep. Everything
          outside will be trimmed.
        </p>
      </div>
    </div>
  );
}
