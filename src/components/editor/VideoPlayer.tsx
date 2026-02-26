'use client';

import { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useEditorStore } from '@/store/editorStore';

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    videoUrl,
    currentTime,
    isPlaying,
    videoDuration,
    setCurrentTime,
    setIsPlaying,
    setVideoDuration,
    settings,
  } = useEditorStore();

const [volume, setVolume] = useState(1);
const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = currentTime;
  }, [currentTime]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
        {/* Video Element */}
        <video
          ref={videoRef}
          src={videoUrl || undefined}
          className="w-full h-auto"
          style={{
            aspectRatio: settings.crop?.aspectRatio === '9:16' ? '9/16' : '16/9',
          }}
        />

        {/* Text Overlays Preview */}
        {settings.textOverlays?.map((overlay) => {
          if (currentTime >= overlay.startTime && currentTime <= overlay.endTime) {
            return (
              <div
                key={overlay.id}
                className="absolute pointer-events-none"
                style={{
                  left: `${overlay.x}%`,
                  top: `${overlay.y}%`,
                  fontSize: `${overlay.fontSize}px`,
                  color: overlay.color,
                  fontFamily: overlay.fontFamily,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {overlay.text}
              </div>
            );
          }
          return null;
        })}

        {/* Play Button Overlay */}
        {!isPlaying && (
          <div
            onClick={togglePlayPause}
            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer group"
          >
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition">
              <Play className="w-10 h-10 text-white ml-1" />
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max={videoDuration || 100}
            value={currentTime}
            onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
            className="w-full mb-3"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlayPause}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20"
                />
              </div>

              <span className="text-sm text-white/80">
                {formatTime(currentTime)} / {formatTime(videoDuration)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trim Range Indicator */}
      {settings.trimStart !== undefined && settings.trimEnd !== undefined && (
        <div className="mt-4 text-center text-sm text-gray-400">
          Selected: {formatTime(settings.trimStart)} - {formatTime(settings.trimEnd)}
          {' '}
          ({formatTime(settings.trimEnd - settings.trimStart)} duration)
        </div>
      )}
    </div>
  );
}
