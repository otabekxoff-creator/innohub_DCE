import React from 'react';
import { Sparkles, Settings, Github } from 'lucide-react';
import { GitHubUser } from '../types';

interface TitleBarProps {
  activeFileName?: string;
  isDirty: boolean;
  isGithubConnected: boolean;
  githubUser: GitHubUser | null;
  onSettingsClick: () => void;
}

export const TitleBar: React.FC<TitleBarProps> = React.memo(({
  activeFileName,
  isDirty,
  isGithubConnected,
  githubUser,
  onSettingsClick,
}) => {
  return (
    <div className="h-9 bg-[#181818] border-b border-[#2b2b2b] flex items-center justify-between px-3" role="banner">
      <div className="flex items-center gap-3">
        <Sparkles size={14} className="text-blue-400" aria-hidden="true" />
        <span className="text-xs font-medium">INNOHUB</span>
        <span className="text-xs text-gray-600" aria-hidden="true">|</span>
        <span className="text-xs text-gray-400">{activeFileName || 'No file'}</span>
        {isDirty && <span className="text-yellow-400 text-xs" aria-label="Unsaved changes">●</span>}
      </div>
      <div className="flex items-center gap-2">
        {isGithubConnected && githubUser && (
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Github size={12} aria-hidden="true" /> @{githubUser.login}
          </span>
        )}
        <button
          onClick={onSettingsClick}
          className="p-1 hover:bg-[#2a2d2e] rounded"
          aria-label="Open settings"
        >
          <Settings size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});

TitleBar.displayName = 'TitleBar';
