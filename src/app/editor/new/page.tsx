'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { Upload, Film, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function NewProjectPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const videoFile = acceptedFiles[0];
    if (!videoFile) return;

    if (!videoFile.type.startsWith('video/')) {
      alert('Please upload a video file');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }

      const fileName = `${user.id}/${Date.now()}-${videoFile.name}`;

      const { data, error } = await supabase.storage
        .from('videos')
        .upload(fileName, videoFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          name: videoFile.name.replace(/\.[^/.]+$/, ''),
          video_url: urlData.publicUrl,
          status: 'draft',
          orientation: 'landscape',
        })
        .select()
        .single();

      if (projectError) throw projectError;

      router.push(`/editor/${project.id}`);
    } catch (error: any) {
      console.error('Upload error:', error);
      alert('Failed to upload video: ' + error.message);
    } finally {
      setUploading(false);
    }
  }, [router]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm'],
    },
    maxFiles: 1,
    disabled: uploading,
  });

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="border-b border-dark-border bg-dark-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Upload Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Film className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Upload Your Video</h1>
          <p className="text-xl text-gray-400">
            Drag and drop or click to select
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`
            card border-2 border-dashed cursor-pointer transition-all duration-300
            ${isDragActive ? 'border-primary bg-primary/5 scale-105' : 'border-dark-border hover:border-primary/50'}
            ${uploading ? 'pointer-events-none opacity-50' : ''}
          `}
        >
          <input {...getInputProps()} />

          <div className="py-20 text-center">
            {uploading ? (
              <>
                <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-semibold mb-2">Uploading...</h3>
                <p className="text-gray-400">Please wait while we process your video</p>
              </>
            ) : (
              <>
                <Upload className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {isDragActive ? 'Drop your video here' : 'Drop your video here'}
                </h3>
                <p className="text-gray-400 mb-4">
                  or click to browse your files
                </p>
                <p className="text-sm text-gray-500">
                  Supports MP4, MOV, AVI, MKV, WebM
                </p>
              </>
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">⚡</span>
            </div>
            <h4 className="font-semibold mb-1">Fast Processing</h4>
            <p className="text-sm text-gray-400">
              Your video will be ready to edit in seconds
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎬</span>
            </div>
            <h4 className="font-semibold mb-1">Auto Detection</h4>
            <p className="text-sm text-gray-400">
              We automatically detect your video orientation
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">✂️</span>
            </div>
            <h4 className="font-semibold mb-1">Easy Editing</h4>
            <p className="text-sm text-gray-400">
              Simple tools, no complex timeline
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
