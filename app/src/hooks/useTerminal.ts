import { useState, useCallback } from 'react';
import { TerminalLine } from '../types';
import { INITIAL_TERMINAL_LINES, TERMINAL_COMMANDS } from '../constants';

export function useTerminal() {
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>(INITIAL_TERMINAL_LINES);
  const [terminalInput, setTerminalInput] = useState('');
  const [showBottomPanel, setShowBottomPanel] = useState(true);
  const [bottomPanelTab, setBottomPanelTab] = useState<'terminal' | 'problems' | 'ports' | 'output'>('terminal');

  const addTerminalLine = useCallback((type: 'input' | 'output' | 'error', content: string) => {
    setTerminalLines(prev => [...prev, { id: `term-${Date.now()}`, type, content, timestamp: Date.now() }]);
  }, []);

  const handleTerminalSubmit = useCallback((
    createFile: (name: string, content: string) => void,
    deleteFile: (name: string) => void,
    githubLogin: () => void,
    githubPush: () => void,
    githubPull: () => void,
    setChatInput: (input: string) => void
  ) => {
    return (e: React.FormEvent) => {
      e.preventDefault();
      if (!terminalInput.trim()) return;

      addTerminalLine('input', `$ ${terminalInput}`);

      const command = terminalInput.trim().toLowerCase();
      const args = terminalInput.trim().split(' ');

      if (command === TERMINAL_COMMANDS.HELP) {
        addTerminalLine('output', 'Commands: ls, pwd, cd, mkdir, rm, cat, touch, npm, git, github, ai, clear, exit');
      } else if (command === TERMINAL_COMMANDS.CLEAR) {
        setTerminalLines([]);
      } else if (command === TERMINAL_COMMANDS.LS || command === TERMINAL_COMMANDS.DIR) {
        addTerminalLine('output', 'src  public  package.json  README.md');
      } else if (command === TERMINAL_COMMANDS.PWD) {
        addTerminalLine('output', '/home/user/project');
      } else if (command.startsWith(TERMINAL_COMMANDS.TOUCH + ' ')) {
        createFile(args[1] || 'untitled.txt', '');
      } else if (command.startsWith(TERMINAL_COMMANDS.RM + ' ')) {
        deleteFile(args[1]);
      } else if (command.startsWith(TERMINAL_COMMANDS.CAT + ' ')) {
        addTerminalLine('output', `File content: ${args[1]}`);
      } else if (command.startsWith('npm ')) {
        addTerminalLine('output', `Running: ${terminalInput}`);
        setTimeout(() => addTerminalLine('output', '✓ Done'), 1000);
      } else if (command.startsWith('git ')) {
        addTerminalLine('output', `git ${args.slice(1).join(' ')}`);
      } else if (command === TERMINAL_COMMANDS.GITHUB_LOGIN) {
        githubLogin();
      } else if (command === TERMINAL_COMMANDS.GITHUB_PUSH) {
        githubPush();
      } else if (command === TERMINAL_COMMANDS.GITHUB_PULL) {
        githubPull();
      } else if (command.startsWith('ai ')) {
        setChatInput(args.slice(1).join(' '));
      } else if (command === TERMINAL_COMMANDS.EXIT) {
        setShowBottomPanel(false);
      } else {
        addTerminalLine('error', `Command not found: ${terminalInput}`);
      }

      setTerminalInput('');
    };
  }, [terminalInput, addTerminalLine]);

  return {
    terminalLines,
    terminalInput,
    setTerminalInput,
    showBottomPanel,
    setShowBottomPanel,
    bottomPanelTab,
    setBottomPanelTab,
    addTerminalLine,
    handleTerminalSubmit,
  };
}
