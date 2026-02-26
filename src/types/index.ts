export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  subscription_tier: 'free' | 'pro';
  subscription_status?: string;
  stripe_customer_id?: string;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  thumbnail_url?: string;
  video_url?: string;
  duration?: number;
  orientation: 'landscape' | 'portrait' | 'square';
  status: 'draft' | 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
  settings?: ProjectSettings;
}

export interface ProjectSettings {
  trimStart?: number;
  trimEnd?: number;
  crop?: CropSettings;
  textOverlays?: TextOverlay[];
  musicTrack?: MusicTrack;
  template?: string;
  captions?: Caption[];
}

export interface CropSettings {
  x: number;
  y: number;
  width: number;
  height: number;
  aspectRatio: '9:16' | '16:9' | '1:1';
}

export interface TextOverlay {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  startTime: number;
  endTime: number;
  animation?: 'fadeIn' | 'slideUp' | 'none';
}

export interface MusicTrack {
  id: string;
  url: string;
  name: string;
  volume: number;
  startTime?: number;
  endTime?: number;
}

export interface Caption {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  words?: Word[];
}

export interface Word {
  text: string;
  startTime: number;
  endTime: number;
  confidence?: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: 'social' | 'tutorial' | 'gaming' | 'vlog' | 'promo';
  settings: Partial<ProjectSettings>;
}

export interface ExportSettings {
  quality: '720p' | '1080p';
  format: 'mp4';
  includeWatermark: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: 'Free' | 'Pro';
  price: number;
  features: string[];
  maxExportQuality: '720p' | '1080p';
  hasWatermark: boolean;
}
