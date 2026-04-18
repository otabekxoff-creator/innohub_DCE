import { FileItem, SidebarIcon, BottomPanelTab } from '../types';

// ==================== PANEL DIMENSIONS ====================
export const PANEL_DIMENSIONS = {
  SIDEBAR: {
    MIN_WIDTH: 200,
    MAX_WIDTH: 400,
    DEFAULT_WIDTH: 250,
    ICON_BAR_WIDTH: 48, // 12 * 4 (w-12 = 48px)
  },
  BOTTOM_PANEL: {
    MIN_HEIGHT: 100,
    MAX_HEIGHT: 400,
    DEFAULT_HEIGHT: 200,
  },
  RIGHT_PANEL: {
    MIN_WIDTH: 250,
    MAX_WIDTH: 500,
    DEFAULT_WIDTH: 320,
  },
} as const;

// ==================== FONT SIZES ====================
export const FONT_SETTINGS = {
  MIN_SIZE: 10,
  MAX_SIZE: 24,
  DEFAULT_SIZE: 14,
} as const;

// ==================== SIDEBAR ICONS ====================
export const SIDEBAR_ICONS: Array<{
  id: SidebarIcon;
  label: string;
}> = [
  { id: 'explorer', label: 'Explorer' },
  { id: 'search', label: 'Search' },
  { id: 'git', label: 'Source Control' },
  { id: 'debug', label: 'Debug' },
  { id: 'extensions', label: 'Extensions' },
];

// ==================== BOTTOM PANEL TABS ====================
export const BOTTOM_PANEL_TABS: Array<{
  id: BottomPanelTab;
  label: string;
}> = [
  { id: 'terminal', label: 'Terminal' },
  { id: 'problems', label: 'Problems' },
  { id: 'ports', label: 'Ports' },
  { id: 'output', label: 'Output' },
];

// ==================== LANGUAGE MAPPING ====================
export const LANGUAGE_MAP: Record<string, import('../types').Language> = {
  ts: 'typescript',
  tsx: 'typescript',
  js: 'javascript',
  jsx: 'javascript',
  py: 'python',
  go: 'go',
  rs: 'rust',
  java: 'java',
  cpp: 'cpp',
  c: 'c',
  cs: 'csharp',
  php: 'php',
  rb: 'ruby',
  swift: 'swift',
  kt: 'kotlin',
  html: 'html',
  css: 'css',
  json: 'json',
  yml: 'yaml',
  yaml: 'yaml',
  md: 'markdown',
  sql: 'sql',
  sh: 'bash',
  bash: 'bash',
  txt: 'plaintext',
} as const;

// ==================== TERMINAL COMMANDS ====================
export const TERMINAL_COMMANDS = {
  HELP: 'help',
  CLEAR: 'clear',
  LS: 'ls',
  DIR: 'dir',
  PWD: 'pwd',
  TOUCH: 'touch',
  RM: 'rm',
  CAT: 'cat',
  EXIT: 'exit',
  GITHUB_LOGIN: 'github login',
  GITHUB_PUSH: 'github push',
  GITHUB_PULL: 'github pull',
} as const;

// ==================== INITIAL TERMINAL LINES ====================
export const INITIAL_TERMINAL_LINES = [
  {
    id: '1',
    type: 'output' as const,
    content: 'INNOHUB Terminal v3.0.0 - Super AI',
    timestamp: Date.now(),
  },
];

// ==================== INITIAL FILES ====================
export const INITIAL_FILES: FileItem[] = [
  {
    id: 'root',
    name: 'project',
    content: '',
    language: 'plaintext',
    type: 'folder',
    parentId: null,
    children: ['src', 'public'],
    lastModified: Date.now(),
    isDirty: false,
    isOpen: true,
  },
  {
    id: 'src',
    name: 'src',
    content: '',
    language: 'plaintext',
    type: 'folder',
    parentId: 'root',
    children: ['app-tsx'],
    lastModified: Date.now(),
    isDirty: false,
    isOpen: true,
  },
  {
    id: 'public',
    name: 'public',
    content: '',
    language: 'plaintext',
    type: 'folder',
    parentId: 'root',
    children: [],
    lastModified: Date.now(),
    isDirty: false,
    isOpen: false,
  },
  {
    id: 'app-tsx',
    name: 'App.tsx',
    content: `import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Welcome to INNOHUB</h1>
    </div>
  );
}

export default App;`,
    language: 'typescript',
    type: 'file',
    parentId: 'src',
    lastModified: Date.now(),
    isDirty: false,
  },
];

// ==================== KEYBOARD SHORTCUTS ====================
export const SHORTCUTS = {
  COMMAND_PALETTE: { key: 'p', ctrl: true },
  SAVE: { key: 's', ctrl: true },
  NEW_FILE: { key: 'n', ctrl: true },
  SEARCH: { key: 'f', ctrl: true },
  TOGGLE_TERMINAL: { key: '`', ctrl: true },
  ESCAPE: { key: 'Escape' },
} as const;
