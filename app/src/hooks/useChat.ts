import { useState, useCallback, useRef } from 'react';
import { ChatMessage, AIAction } from '../types';
import { SuperAI } from '../lib/SuperAI';

export function useChat(aiEngine: SuperAI) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleChatSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isAiResponding) return;

    const userMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      role: 'user',
      content: chatInput,
      timestamp: Date.now(),
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsAiResponding(true);

    try {
      const result = await aiEngine.process(userMsg.content);

      const aiMsg: ChatMessage = {
        id: `chat-${Date.now()}-ai`,
        role: 'ai',
        content: result.response,
        timestamp: Date.now(),
        codeBlocks: result.codeBlocks,
        actions: result.actions,
      };

      setChatMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: `chat-${Date.now()}-error`,
        role: 'ai',
        content: '❌ Xatolik yuz berdi. Qaytadan urinib ko\'ring.',
        timestamp: Date.now(),
      };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAiResponding(false);
    }
  }, [chatInput, isAiResponding, aiEngine]);

  const executeAction = useCallback((
    action: AIAction,
    createFile: (name: string, content: string) => void,
    deleteFile: (name: string) => void,
    addTerminalLine: (type: 'input' | 'output' | 'error', content: string) => void
  ) => {
    switch (action.type) {
      case 'create_file':
        if (action.filename && action.content) {
          createFile(action.filename, action.content);
        }
        break;
      case 'delete_file':
        if (action.filename) {
          deleteFile(action.filename);
        }
        break;
      case 'run_command':
        if (action.command) {
          addTerminalLine('output', `$ ${action.command}`);
          setTimeout(() => addTerminalLine('output', '✓ Done'), 1000);
        }
        break;
    }
  }, []);

  // Auto-scroll to bottom
  useState(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  return {
    chatMessages,
    chatInput,
    setChatInput,
    isAiResponding,
    showRightPanel,
    setShowRightPanel,
    chatEndRef,
    handleChatSubmit,
    executeAction,
  };
}
