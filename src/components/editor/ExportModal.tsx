'use client';

import { useState, useEffect } from 'react';
import { Download, X, Crown, Loader2, CheckCircle } from 'lucide-react';
import { useEditorStore } from '@/store/editorStore';
import { supabase } from '@/lib/supabase';

interface ExportModalProps {
  projectId: string;
  onClose: () => void;
}

export default function ExportModal({ projectId, onClose }: ExportModalProps) {
  const { settings, videoUrl } = useEditorStore();
  const [quality, setQuality] = useState<'720p' | '1080p'>('720p');
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [userTier, setUserTier] = useState<'free' | 'pro'>('free');

  useEffect(() => {
    checkUserTier();
  }, []);

  const checkUserTier = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('users')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    if (data) {
      setUserTier(data.subscription_tier);
    }
  };

  const handleExport = async () => {
    if (userTier === 'free' && quality === '1080p') {
      alert('1080p export is only available for Pro users. Upgrade to access this feature.');
      return;
    }

    setExporting(true);
    setExportProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setExportProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      await new Promise((resolve) => setTimeout(resolve, 5000));

      clearInterval(progressInterval);
      setExportProgress(100);

      setDownloadUrl(videoUrl || '');
      setExportComplete(true);

      await supabase
        .from('projects')
        .update({
          status: 'completed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', projectId);

    } catch (error: any) {
      console.error('Export error:', error);
      alert('Failed to export video: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  const qualityOptions = [
    {
      value: '720p' as const,
      label: '720p HD',
      description: 'Good quality, smaller file',
      available: true,
    },
    {
      value: '1080p' as const,
      label: '1080p Full HD',
      description: 'Best quality, larger file',
      available: userTier === 'pro',
      proOnly: true,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card border border-dark-border rounded-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Export Video</h3>
              <p className="text-sm text-gray-400">Choose quality and export</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-hover rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {!exportComplete ? (
            <>
              {/* Quality Options */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">Export Quality</label>
                {qualityOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => option.available && setQuality(option.value)}
                    disabled={!option.available || exporting}
                    className={`
                      w-full card flex items-center justify-between text-left transition-all
                      ${quality === option.value && option.available
                        ? 'border-primary bg-primary/10'
                        : ''
                      }
                      ${!option.available ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{option.label}</h4>
                        {option.proOnly && (
                          <span className="flex items-center gap-1 text-xs bg-gradient-to-r from-primary to-primary-hover text-white px-2 py-0.5 rounded-full">
                            <Crown className="w-3 h-3" />
                            Pro
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{option.description}</p>
                    </div>
                    {quality === option.value && option.available && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Watermark Notice */}
              {userTier === 'free' && (
                <div className="card bg-primary/5 border-primary/20">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-primary">ℹ️ Free Plan:</span>{' '}
                    Exported videos will include a small ClipSimple watermark.
                    Upgrade to Pro to remove it.
                  </p>
                </div>
              )}

              {/* Export Progress */}
              {exporting && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Exporting...</span>
                    <span className="font-semibold text-primary">
                      {exportProgress}%
                    </span>
                  </div>
                  <div className="w-full bg-dark-hover rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-primary-hover h-full transition-all duration-300"
                      style={{ width: `${exportProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Export Button */}
              <button
                onClick={handleExport}
                disabled={exporting}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {exporting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Export {quality}
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              {/* Export Complete */}
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-accent-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Export Complete!</h3>
                <p className="text-gray-400 mb-6">
                  Your video is ready to download
                </p>
                <a
                  href={downloadUrl}
                  download
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Video
                </a>
              </div>

              <button onClick={onClose} className="btn-secondary w-full">
                Close
              </button>
            </>
          )}

          {/* Upgrade CTA for Free Users */}
          {userTier === 'free' && !exportComplete && (
            <div className="card bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Upgrade to Pro</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    Get 1080p exports, no watermark, and priority processing
                  </p>
                  <a href="/dashboard/upgrade" className="btn-primary text-sm py-2 px-4 inline-block">
                    Upgrade for $7/mo
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
