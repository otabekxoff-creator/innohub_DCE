import React from 'react';
import Editor from '@monaco-editor/react';
import { useAppStore } from '../store';
import { FileCode, FileJson, FileType, FileText, ChevronDown, ChevronRight, X, Code2 } from 'lucide-react';
import { FileItem } from '../types';

export const EditorPanel: React.FC = () => {
  const { files, setFiles, tabs, setTabs, theme, fontSize } = useAppStore();

  const activeFile = files.find(f => f.id === tabs.find(t => t.isActive)?.fileId);

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') {
      return file.isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />;
    }
    const iconMap: Record<string, React.ReactNode> = {
      typescript: <FileCode size={16} className="text-blue-400" />,
      javascript: <FileCode size={16} className="text-yellow-400" />,
      python: <FileCode size={16} className="text-green-400" />,
      html: <FileType size={16} className="text-orange-500" />,
      css: <FileType size={16} className="text-blue-500" />,
      json: <FileJson size={16} className="text-yellow-500" />,
    };
    return iconMap[file.language] || <FileText size={16} className="text-gray-400" />;
  };

  const handleCloseTab = (fileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const tabIndex = tabs.findIndex(t => t.fileId === fileId);
    const newTabs = tabs.filter(t => t.fileId !== fileId);
    
    if (newTabs.length > 0) {
      const wasActive = tabs.find(t => t.fileId === fileId)?.isActive;
      if (wasActive) {
        const newActiveIndex = Math.min(tabIndex, newTabs.length - 1);
        newTabs[newActiveIndex] = { ...newTabs[newActiveIndex], isActive: true };
      }
    }
    setTabs(newTabs);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (activeFile && value !== undefined) {
      setFiles(prev => prev.map(f => 
        f.id === activeFile.id ? { ...f, content: value, isDirty: true } : f
      ));
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="flex bg-[#181818] border-b border-[#2b2b2b] overflow-x-auto">
        {tabs.map(tab => {
          const file = files.find(f => f.id === tab.fileId);
          if (!file) return null;
          return (
            <div
              key={tab.fileId}
              onClick={() => setTabs(prev => prev.map(t => ({ ...t, isActive: t.fileId === tab.fileId })))}
              className={`flex items-center gap-2 px-3 py-2 cursor-pointer border-r border-[#2b2b2b] ${tab.isActive ? 'bg-[#1e1e1e] border-t-2 border-t-[#007acc]' : 'bg-[#2d2d2d]'}`}
            >
              {getFileIcon(file)}
              <span className="text-sm">{file.name}</span>
              {file.isDirty && <span className="text-yellow-400">●</span>}
              <button onClick={(e) => handleCloseTab(tab.fileId, e)} className="p-0.5 hover:bg-[#3c3c3c] rounded"><X size={12} /></button>
            </div>
          );
        })}
      </div>

      <div className="flex-1 relative">
        {activeFile ? (
          <Editor
            height="100%"
            language={activeFile.language}
            value={activeFile.content}
            onChange={handleEditorChange}
            theme={theme === 'dark' ? 'vs-dark' : 'vs'}
            options={{ fontSize, minimap: { enabled: true }, automaticLayout: true }}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <Code2 size={64} className="mb-4 opacity-30" />
            <p>No file open</p>
          </div>
        )}
      </div>
    </div>
  );
};
