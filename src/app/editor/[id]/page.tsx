'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Play,
  Pause,
  Scissors,
  Type,
  Music,
  Download,
  Crop,
  Sparkles,
  Save,
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useEditorStore } from '@/store/editorStore';
import VideoPlayer from '@/components/editor/VideoPlayer';
import TrimControls from '@/components/editor/TrimControls';
import CropControls from '@/components/editor/CropControls';
import TextOverlayControls from '@/components/editor/TextOverlayControls';
import MusicControls from '@/components/editor/MusicControls';
import ExportModal from '@/components/editor/ExportModal';

type EditorTab = 'trim' | 'crop' | 'text' | 'music' | 'templates';

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [activeTab, setActiveTab] = useState<EditorTab>('trim');
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const { setCurrentProject, setVideoUrl, resetEditor } = useEditorStore();

  useEffect(() => {
    loadProject();
    return () => resetEditor();
  }, [projectId]);

  const loadProject = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (error || !data) {
      alert('Project not found');
      router.push('/dashboard');
      return;
    }

    setProject(data);
    setCurrentProject(data.id);
    setVideoUrl(data.video_url);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const settings = useEditorStore.getState().settings;

    const { error } = await supabase
      .from('projects')
      .update({
        settings,
        updated_at: new Date().toISOString(),
      })
      .eq('id', projectId);

    if (error) {
      alert('Failed to save project');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'trim' as EditorTab, icon: Scissors, label: 'Trim' },
    { id: 'crop' as EditorTab, icon: Crop, label: 'Crop' },
    { id: 'text' as EditorTab, icon: Type, label: 'Text' },
    { id: 'music' as EditorTab, icon: Music, label: 'Music' },
    { id: 'templates' as EditorTab, icon: Sparkles, label: 'Templates' },
  ];

  return (
    <div className="h-screen bg-dark-bg flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-dark-border bg-dark-card/50 backdrop-blur-sm flex-shrink-0">
        <div className="px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 hover:bg-dark-hover rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-semibold">{project?.name}</h1>
                <p className="text-xs text-gray-400">Video Editor</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-secondary flex items-center gap-2 text-sm py-2 px-4"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="btn-primary flex items-center gap-2 text-sm py-2 px-4"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Preview */}
        <div className="flex-1 flex items-center justify-center bg-dark-bg p-6 overflow-auto">
          <VideoPlayer />
        </div>

        {/* Sidebar Controls */}
        <div className="w-96 border-l border-dark-border bg-dark-card flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-dark-border overflow-x-auto flex-shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 flex flex-col items-center gap-1 py-3 px-2 transition
                    ${activeTab === tab.id
                      ? 'bg-dark-hover border-b-2 border-primary text-white'
                      : 'text-gray-400 hover:text-white hover:bg-dark-hover/50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'trim' && <TrimControls />}
            {activeTab === 'crop' && <CropControls />}
            {activeTab === 'text' && <TextOverlayControls />}
            {activeTab === 'music' && <MusicControls />}
            {activeTab === 'templates' && (
              <div className="text-center text-gray-400 py-12">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Templates coming soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          projectId={projectId}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
}
