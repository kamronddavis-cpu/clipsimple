'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useEditorStore } from '@/store/editorStore';
import { Music, Upload, Volume2, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function MusicControls() {
  const { settings, setMusicTrack, updateMusicVolume } = useEditorStore();
  const [uploading, setUploading] = useState(false);

  const musicTrack = settings.musicTrack;

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const audioFile = acceptedFiles[0];
    if (!audioFile) return;

    if (!audioFile.type.startsWith('audio/')) {
      alert('Please upload an audio file');
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const fileName = `${user.id}/music/${Date.now()}-${audioFile.name}`;

      const { data, error } = await supabase.storage
        .from('music')
        .upload(fileName, audioFile);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('music')
        .getPublicUrl(fileName);

      setMusicTrack({
        id: Date.now().toString(),
        url: urlData.publicUrl,
        name: audioFile.name,
        volume: 0.5,
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      alert('Failed to upload music: ' + error.message);
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg'],
    },
    maxFiles: 1,
    disabled: uploading || !!musicTrack,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Music className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">Background Music</h3>
          <p className="text-sm text-gray-400">Add music to your video</p>
        </div>
      </div>

      {/* Upload Area or Current Track */}
      {!musicTrack ? (
        <div
          {...getRootProps()}
          className={`
            card border-2 border-dashed cursor-pointer transition-all
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-dark-border hover:border-primary/50'}
            ${uploading ? 'pointer-events-none opacity-50' : ''}
          `}
        >
          <input {...getInputProps()} />

          <div className="py-12 text-center">
            {uploading ? (
              <>
                <div className="spinner mx-auto mb-4"></div>
                <p className="text-gray-400">Uploading music...</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">
                  {isDragActive ? 'Drop your music here' : 'Upload Music'}
                </h4>
                <p className="text-sm text-gray-400 mb-2">
                  Drag and drop or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  Supports MP3, WAV, M4A, OGG
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="card bg-dark-hover">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{musicTrack.name}</p>
                <p className="text-xs text-gray-400">Background Music</p>
              </div>
            </div>
            <button
              onClick={() => setMusicTrack(null)}
              className="p-2 hover:bg-accent-red/20 hover:text-accent-red rounded transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Control */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Volume: {Math.round(musicTrack.volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={musicTrack.volume}
              onChange={(e) => updateMusicVolume(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Quick Volume Presets */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => updateMusicVolume(0.25)}
              className="btn-secondary text-sm py-1 px-3 flex-1"
            >
              25%
            </button>
            <button
              onClick={() => updateMusicVolume(0.5)}
              className="btn-secondary text-sm py-1 px-3 flex-1"
            >
              50%
            </button>
            <button
              onClick={() => updateMusicVolume(0.75)}
              className="btn-secondary text-sm py-1 px-3 flex-1"
            >
              75%
            </button>
            <button
              onClick={() => updateMusicVolume(1)}
              className="btn-secondary text-sm py-1 px-3 flex-1"
            >
              100%
            </button>
          </div>
        </div>
      )}

      {/* Music Library (Future Feature) */}
      <div className="card bg-dark-hover border-dashed opacity-50">
        <div className="text-center py-8">
          <Music className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <h4 className="font-semibold mb-1">Music Library</h4>
          <p className="text-sm text-gray-400">Coming soon!</p>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-primary">💡 Tip:</span> Keep
          background music volume around 25-50% so it doesn't overpower your
          original video audio.
        </p>
      </div>
    </div>
  );
}
