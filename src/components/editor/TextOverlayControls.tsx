'use client';

import { useState } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { Type, Plus, Trash2, Edit2 } from 'lucide-react';
import { TextOverlay } from '@/types';

export default function TextOverlayControls() {
  const { settings, addTextOverlay, updateTextOverlay, removeTextOverlay, currentTime, videoDuration } = useEditorStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    text: '',
    fontSize: 48,
    color: '#ffffff',
    fontFamily: 'Arial',
    x: 50,
    y: 50,
  });

  const handleAddText = () => {
    const newOverlay: TextOverlay = {
      id: Date.now().toString(),
      ...formData,
      startTime: currentTime,
      endTime: Math.min(currentTime + 5, videoDuration),
      animation: 'none',
    };

    addTextOverlay(newOverlay);
    setShowAddForm(false);
    setFormData({
      text: '',
      fontSize: 48,
      color: '#ffffff',
      fontFamily: 'Arial',
      x: 50,
      y: 50,
    });
  };

  const textOverlays = settings.textOverlays || [];

  const fonts = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Georgia',
    'Verdana',
    'Impact',
    'Comic Sans MS',
  ];

  const presetColors = [
    '#ffffff',
    '#000000',
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
    '#00ffff',
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Type className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Text Overlay</h3>
            <p className="text-sm text-gray-400">Add text to your video</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary text-sm py-2 px-3 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="card bg-dark-hover space-y-4">
          <h4 className="font-semibold">New Text Overlay</h4>

          <div>
            <label className="block text-sm font-medium mb-2">Text</label>
            <input
              type="text"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className="w-full bg-dark-card border border-dark-border rounded-lg py-2 px-3 focus:outline-none focus:border-primary"
              placeholder="Enter your text"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Font Size: {formData.fontSize}px
              </label>
              <input
                type="range"
                min="16"
                max="128"
                value={formData.fontSize}
                onChange={(e) =>
                  setFormData({ ...formData, fontSize: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Font</label>
              <select
                value={formData.fontFamily}
                onChange={(e) =>
                  setFormData({ ...formData, fontFamily: e.target.value })
                }
                className="w-full bg-dark-card border border-dark-border rounded-lg py-2 px-3 focus:outline-none focus:border-primary"
              >
                {fonts.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="w-12 h-12 bg-dark-card border border-dark-border rounded-lg cursor-pointer"
              />
              <div className="flex gap-2 flex-wrap">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setFormData({ ...formData, color })}
                    className="w-8 h-8 rounded border-2 border-dark-border hover:scale-110 transition"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Position X: {formData.x}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.x}
                onChange={(e) =>
                  setFormData({ ...formData, x: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Position Y: {formData.y}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.y}
                onChange={(e) =>
                  setFormData({ ...formData, y: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddText}
              disabled={!formData.text}
              className="btn-primary flex-1"
            >
              Add Text
            </button>
            <button onClick={() => setShowAddForm(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Text Overlays List */}
      <div className="space-y-3">
        {textOverlays.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Type className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No text overlays yet</p>
            <p className="text-xs">Click "Add" to create one</p>
          </div>
        ) : (
          textOverlays.map((overlay) => (
            <div key={overlay.id} className="card bg-dark-hover">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p
                    className="font-semibold mb-2"
                    style={{
                      color: overlay.color,
                      fontFamily: overlay.fontFamily,
                    }}
                  >
                    {overlay.text}
                  </p>
                  <div className="text-xs text-gray-400 space-y-1">
                    <p>
                      Size: {overlay.fontSize}px • Font: {overlay.fontFamily}
                    </p>
                    <p>
                      Position: {overlay.x}%, {overlay.y}%
                    </p>
                    <p>
                      Time: {overlay.startTime.toFixed(1)}s -{' '}
                      {overlay.endTime.toFixed(1)}s
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeTextOverlay(overlay.id)}
                  className="p-2 hover:bg-accent-red/20 hover:text-accent-red rounded transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tips */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-primary">💡 Tip:</span> Text will
          appear from the current playback time for 5 seconds. Adjust position
          using the X and Y sliders.
        </p>
      </div>
    </div>
  );
}
