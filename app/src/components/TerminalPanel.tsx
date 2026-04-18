import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Terminal, AlertCircle, Radio, List, X } from 'lucide-react';

interface TerminalPanelProps {
  onTerminalSubmit: (command: string) => void;
  onClose: () => void;
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({ onTerminalSubmit, onClose }) => {
  const { 
    bottomPanelTab, setBottomPanelTab, 
    terminalLines, bottomPanelHeight 
  } = useAppStore();
  const [terminalInput, setTerminalInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    onTerminalSubmit(terminalInput);
    setTerminalInput('');
  };

  return (
    <div className="border-t border-[#2b2b2b] bg-[#181818] flex flex-col" style={{ height: bottomPanelHeight }}>
      <div className="flex items-center border-b border-[#2b2b2b]">
        {[
          { id: 'terminal', label: 'Terminal', icon: Terminal },
          { id: 'problems', label: 'Problems', icon: AlertCircle },
          { id: 'ports', label: 'Ports', icon: Radio },
          { id: 'output', label: 'Output', icon: List },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setBottomPanelTab(id as any)}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs ${bottomPanelTab === id ? 'border-b-2 border-[#007acc] text-white' : 'text-gray-500'}`}
          >
            <Icon size={12} /> {label}
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={onClose} className="p-1 hover:bg-[#2a2d2e] mr-1"><X size={12} /></button>
      </div>
      
      <div className="flex-1 overflow-auto p-2 font-mono text-sm">
        {bottomPanelTab === 'terminal' && (
          <>
            {terminalLines.map(line => (
              <div key={line.id} className={line.type === 'error' ? 'text-red-400' : line.type === 'input' ? 'text-green-400' : ''}>
                {line.content}
              </div>
            ))}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
              <span className="text-green-400">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="flex-1 bg-transparent outline-none"
                placeholder="Type command..."
                autoFocus
              />
            </form>
          </>
        )}
        {bottomPanelTab === 'output' && (
          <div className="text-gray-400">
            <div>[INFO] INNOHUB v3.0.0</div>
            <div>[INFO] Super AI ready</div>
          </div>
        )}
      </div>
    </div>
  );
};
