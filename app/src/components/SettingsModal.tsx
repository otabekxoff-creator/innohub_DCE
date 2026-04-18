import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { X, Moon, Sun } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const { showSettings, setShowSettings, theme, setTheme, fontSize, setFontSize } = useAppStore();

  return (
    <AnimatePresence>
      {showSettings && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowSettings(false)}>
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-[400px] bg-[#181818] border border-[#2b2b2b] rounded-lg p-4 text-white" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Settings</h2>
              <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Font Size: {fontSize}px</label>
                <input type="range" min="10" max="24" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full mt-2" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setTheme('dark')} className={`flex-1 py-2 rounded border ${theme === 'dark' ? 'border-blue-500 text-blue-400' : 'border-[#3c3c3c] text-gray-400'}`}><Moon size={16} className="mx-auto" /></button>
                <button onClick={() => setTheme('light')} className={`flex-1 py-2 rounded border ${theme === 'light' ? 'border-orange-500 text-orange-400' : 'border-[#3c3c3c] text-gray-400'}`}><Sun size={16} className="mx-auto" /></button>
              </div>
              <div className="mt-4 border-t border-[#3c3c3c] pt-4">
                <label className="text-sm text-gray-400 block mb-2">Gemini API Key (SuperAI uchun)</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 bg-[#2d2d2d] rounded border border-[#3c3c3c] outline-none" 
                  placeholder="AIzaSy..." 
                  defaultValue={localStorage.getItem('gemini_api_key') || ''}
                  onChange={(e) => {
                    localStorage.setItem('gemini_api_key', e.target.value);
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">Ushbu kalit kiritilmasa SuperAI to'liq ishlamaydi.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
