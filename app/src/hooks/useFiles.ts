import { useState, useCallback } from 'react';
import { FileItem, Tab, Language } from '../types';
import { INITIAL_FILES, LANGUAGE_MAP } from '../constants';

export function useFiles() {
  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES);
  const [tabs, setTabs] = useState<Tab[]>([{ fileId: 'app-tsx', isActive: true }]);

  const handleFileClick = useCallback((fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    if (file.type === 'folder') {
      setFiles(prev => prev.map(f =>
        f.id === fileId ? { ...f, isOpen: !f.isOpen } : f
      ));
    } else {
      const existingTab = tabs.find(t => t.fileId === fileId);
      if (existingTab) {
        setTabs(prev => prev.map(t => ({ ...t, isActive: t.fileId === fileId })));
      } else {
        setTabs(prev => [...prev.map(t => ({ ...t, isActive: false })), { fileId, isActive: true }]);
      }
    }
  }, [files, tabs]);

  const handleCloseTab = useCallback((fileId: string, e: React.MouseEvent) => {
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
  }, [tabs]);

  const handleEditorChange = useCallback((value: string | undefined, activeFileId?: string) => {
    if (activeFileId && value !== undefined) {
      setFiles(prev => prev.map(f =>
        f.id === activeFileId ? { ...f, content: value, isDirty: true } : f
      ));
    }
  }, []);

  const handleSaveFile = useCallback((activeFileId?: string) => {
    if (activeFileId) {
      setFiles(prev => prev.map(f =>
        f.id === activeFileId ? { ...f, isDirty: false, lastModified: Date.now() } : f
      ));
    }
  }, []);

  const handleNewFile = useCallback(() => {
    const newFileId = `file-${Date.now()}`;
    const newFile: FileItem = {
      id: newFileId,
      name: 'untitled.ts',
      content: '',
      language: 'typescript',
      type: 'file',
      parentId: 'src',
      lastModified: Date.now(),
      isDirty: false,
    };

    setFiles(prev => prev.map(f =>
      f.id === 'src' ? { ...f, children: [...(f.children || []), newFileId] } : f
    ).concat(newFile));

    setTabs(prev => [...prev.map(t => ({ ...t, isActive: false })), { fileId: newFileId, isActive: true }]);
  }, []);

  const handleCreateFile = useCallback((filename: string, content: string) => {
    const newFileId = `file-${Date.now()}`;
    const ext = filename.split('.').pop()?.toLowerCase() || '';

    const newFile: FileItem = {
      id: newFileId,
      name: filename.split('/').pop() || filename,
      content,
      language: LANGUAGE_MAP[ext] || 'plaintext',
      type: 'file',
      parentId: 'src',
      lastModified: Date.now(),
      isDirty: true,
    };

    setFiles(prev => prev.map(f =>
      f.id === 'src' ? { ...f, children: [...(f.children || []), newFileId] } : f
    ).concat(newFile));

    setTabs(prev => [...prev.map(t => ({ ...t, isActive: false })), { fileId: newFileId, isActive: true }]);
  }, []);

  const handleDeleteFile = useCallback((filename: string) => {
    const file = files.find(f => f.name === filename);
    if (file) {
      setFiles(prev => prev.filter(f => f.id !== file.id));
      setTabs(prev => prev.filter(t => t.fileId !== file.id));
    }
  }, [files]);

  const handleFileUpload = useCallback((uploadedFiles: FileList) => {
    Array.from(uploadedFiles).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        handleCreateFile(file.name, content);
      };
      reader.readAsText(file);
    });
  }, [handleCreateFile]);

  const getActiveFile = useCallback((): FileItem | undefined => {
    const activeTab = tabs.find(t => t.isActive);
    return activeTab ? files.find(f => f.id === activeTab.fileId) : undefined;
  }, [tabs, files]);

  return {
    files,
    setFiles,
    tabs,
    setTabs,
    handleFileClick,
    handleCloseTab,
    handleEditorChange,
    handleSaveFile,
    handleNewFile,
    handleCreateFile,
    handleDeleteFile,
    handleFileUpload,
    getActiveFile,
  };
}
