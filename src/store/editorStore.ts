import { create } from 'zustand';
import { ProjectSettings, TextOverlay, MusicTrack } from '@/types';

interface EditorState {
  currentProject: string | null;
  videoFile: File | null;
  videoUrl: string | null;
  videoDuration: number;
  currentTime: number;
  isPlaying: boolean;
  settings: ProjectSettings;

  // Actions
  setCurrentProject: (id: string | null) => void;
  setVideoFile: (file: File | null) => void;
  setVideoUrl: (url: string | null) => void;
  setVideoDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  updateTrim: (start: number, end: number) => void;
  updateCrop: (aspectRatio: '9:16' | '16:9' | '1:1') => void;
  addTextOverlay: (overlay: TextOverlay) => void;
  updateTextOverlay: (id: string, updates: Partial<TextOverlay>) => void;
  removeTextOverlay: (id: string) => void;
  setMusicTrack: (track: MusicTrack | null) => void;
  updateMusicVolume: (volume: number) => void;
  resetEditor: () => void;
}

const initialSettings: ProjectSettings = {
  trimStart: 0,
  trimEnd: 0,
  textOverlays: [],
  captions: [],
};

export const useEditorStore = create<EditorState>((set) => ({
  currentProject: null,
  videoFile: null,
  videoUrl: null,
  videoDuration: 0,
  currentTime: 0,
  isPlaying: false,
  settings: initialSettings,

  setCurrentProject: (id) => set({ currentProject: id }),

  setVideoFile: (file) => set({ videoFile: file }),

  setVideoUrl: (url) => set({ videoUrl: url }),

  setVideoDuration: (duration) => set({
    videoDuration: duration,
    settings: (state) => ({
      ...state.settings,
      trimEnd: duration,
    }),
  }),

  setCurrentTime: (time) => set({ currentTime: time }),

  setIsPlaying: (playing) => set({ isPlaying: playing }),

  updateTrim: (start, end) => set((state) => ({
    settings: {
      ...state.settings,
      trimStart: start,
      trimEnd: end,
    },
  })),

  updateCrop: (aspectRatio) => set((state) => ({
    settings: {
      ...state.settings,
      crop: {
        x: 0,
        y: 0,
        width: 1920,
        height: aspectRatio === '9:16' ? 3413 : aspectRatio === '1:1' ? 1920 : 1080,
        aspectRatio,
      },
    },
  })),

  addTextOverlay: (overlay) => set((state) => ({
    settings: {
      ...state.settings,
      textOverlays: [...(state.settings.textOverlays || []), overlay],
    },
  })),

  updateTextOverlay: (id, updates) => set((state) => ({
    settings: {
      ...state.settings,
      textOverlays: state.settings.textOverlays?.map((overlay) =>
        overlay.id === id ? { ...overlay, ...updates } : overlay
      ),
    },
  })),

  removeTextOverlay: (id) => set((state) => ({
    settings: {
      ...state.settings,
      textOverlays: state.settings.textOverlays?.filter((overlay) => overlay.id !== id),
    },
  })),

  setMusicTrack: (track) => set((state) => ({
    settings: {
      ...state.settings,
      musicTrack: track || undefined,
    },
  })),

  updateMusicVolume: (volume) => set((state) => ({
    settings: {
      ...state.settings,
      musicTrack: state.settings.musicTrack
        ? { ...state.settings.musicTrack, volume }
        : undefined,
    },
  })),

  resetEditor: () => set({
    currentProject: null,
    videoFile: null,
    videoUrl: null,
    videoDuration: 0,
    currentTime: 0,
    isPlaying: false,
    settings: initialSettings,
  }),
}));
