import React from 'react';
import { FileCode, Search, GitBranch, Bug, Box } from 'lucide-react';
import { SidebarIcon } from '../types';
import { SIDEBAR_ICONS } from '../constants';

interface SidebarIconBarProps {
  activeIcon: SidebarIcon;
  onIconClick: (icon: SidebarIcon) => void;
}

const iconMap = {
  explorer: FileCode,
  search: Search,
  git: GitBranch,
  debug: Bug,
  extensions: Box,
};

export const SidebarIconBar: React.FC<SidebarIconBarProps> = React.memo(({ activeIcon, onIconClick }) => {
  return (
    <div className="w-12 bg-[#181818] border-r border-[#2b2b2b] flex flex-col items-center py-2 gap-1" role="navigation" aria-label="Activity Bar">
      {SIDEBAR_ICONS.map(({ id, label }) => {
        const Icon = iconMap[id];
        return (
          <button
            key={id}
            onClick={() => onIconClick(id)}
            className={`w-10 h-10 flex items-center justify-center rounded hover:bg-[#2a2d2e] ${
              activeIcon === id ? 'border-l-2 border-white bg-[#2a2d2e]' : ''
            }`}
            aria-label={label}
            aria-pressed={activeIcon === id}
          >
            <Icon
              size={22}
              className={activeIcon === id ? 'text-white' : 'text-gray-500'}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
});

SidebarIconBar.displayName = 'SidebarIconBar';
