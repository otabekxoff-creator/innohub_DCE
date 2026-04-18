import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';

interface CommandPaletteProps {
  onNewFile: () => void;
  onSaveFile: () => void;
  onGitHubLogin: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onNewFile, onSaveFile, onGitHubLogin }) => {
  const { showCommandPalette, setShowCommandPalette, showBottomPanel, setShowBottomPanel, showRightPanel, setShowRightPanel, setShowSettings } = useAppStore();

  const commands = [
    { id: 'new-file', label: 'New File', shortcut: 'Ctrl+N', action: onNewFile },
    { id: 'save-file', label: 'Save File', shortcut: 'Ctrl+S', action: onSaveFile },
    { id: 'open-terminal', label: 'Toggle Terminal', shortcut: 'Ctrl+`', action: () => setShowBottomPanel(!showBottomPanel) },
    { id: 'open-chat', label: 'Toggle AI Chat', shortcut: 'Ctrl+Shift+A', action: () => setShowRightPanel(!showRightPanel) },
    { id: 'open-settings', label: 'Settings', shortcut: 'Ctrl+,', action: () => setShowSettings(true) },
    { id: 'github-login', label: 'Connect GitHub', shortcut: '', action: onGitHubLogin },
  ];

  return (
    <AnimatePresence>
      {showCommandPalette && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50 text-white" onClick={() => setShowCommandPalette(false)}>
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-[600px] bg-[#181818] border border-[#2b2b2b] rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-3 border-b border-[#2b2b2b]">
              <input type="text" placeholder="Type command..." className="w-full bg-transparent outline-none text-sm text-white" autoFocus />
            </div>
            <div className="max-h-[400px] overflow-auto">
              {commands.map(cmd => (
                <button key={cmd.id} onClick={() => { cmd.action(); setShowCommandPalette(false); }} className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#2a2d2e] text-left">
                  <span className="text-sm">{cmd.label}</span>
                  {cmd.shortcut && <span className="text-xs text-gray-500 bg-[#3c3c3c] px-2 py-0.5 rounded">{cmd.shortcut}</span>}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
