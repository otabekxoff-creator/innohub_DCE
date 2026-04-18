import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../store';
import { Brain, Sparkles, Send, Loader2, X, Check } from 'lucide-react';
import { AIAction } from '../types';

interface ChatPanelProps {
  onChatSubmit: (message: string) => void;
  onExecuteAction: (action: AIAction) => void;
  onClose: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ onChatSubmit, onExecuteAction, onClose }) => {
  const { chatMessages, isAiResponding, rightPanelWidth } = useAppStore();
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isAiResponding) return;
    onChatSubmit(chatInput);
    setChatInput('');
  };

  return (
    <div className="border-l border-[#2b2b2b] bg-[#181818] flex flex-col" style={{ width: rightPanelWidth }}>
      <div className="h-9 flex items-center justify-between px-3 border-b border-[#2b2b2b]">
        <div className="flex items-center gap-2">
          <Brain size={14} className="text-purple-400" />
          <span className="text-xs font-semibold">INNOHUB AI</span>
          {isAiResponding && <Loader2 size={12} className="animate-spin" />}
        </div>
        <button onClick={onClose} className="p-1 hover:bg-[#2a2d2e] rounded"><X size={12} /></button>
      </div>

      <div className="flex-1 overflow-auto p-3 space-y-3">
        {chatMessages.length === 0 && (
          <div className="text-center text-gray-500 text-sm mt-8">
            <Brain size={48} className="mx-auto mb-4 opacity-30" />
            <p>Ask me anything!</p>
            <p className="text-xs mt-2">"React komponent yarat"</p>
            <p className="text-xs">"API endpoint yarat"</p>
            <p className="text-xs">"Kodni tuzat"</p>
          </div>
        )}
        {chatMessages.map(msg => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
              {msg.role === 'user' ? 'Sen' : <Sparkles size={12} />}
            </div>
            <div className={`max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-600' : 'bg-[#2a2d2e]'}`}>
              {msg.content}
              {msg.actions && msg.actions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => onExecuteAction(action)}
                  className="mt-2 w-full px-3 py-2 bg-green-600 hover:bg-green-500 text-white text-xs rounded flex items-center justify-center gap-2"
                >
                  <Check size={12} /> {action.description}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-2 border-t border-[#2b2b2b]">
        <div className="flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask AI..."
            className="flex-1 px-3 py-2 bg-[#3c3c3c] rounded text-sm outline-none text-white"
            disabled={isAiResponding}
          />
          <button type="submit" disabled={isAiResponding || !chatInput.trim()} className="px-3 py-2 bg-blue-600 rounded disabled:opacity-50 text-white">
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};
