// ==================== LANGUAGE TYPES ====================
export type Language =
  | 'typescript' | 'javascript' | 'python' | 'go' | 'rust'
  | 'java' | 'cpp' | 'c' | 'csharp' | 'php' | 'ruby'
  | 'swift' | 'kotlin' | 'html' | 'css' | 'json' | 'yaml'
  | 'markdown' | 'sql' | 'bash' | 'plaintext';

// ==================== FILE TYPES ====================
export interface FileItem {
  id: string;
  name: string;
  content: string;
  language: Language;
  type: 'file' | 'folder';
  parentId: string | null;
  children?: string[];
  lastModified: number;
  isDirty: boolean;
  isOpen?: boolean;
}

export interface Tab {
  fileId: string;
  isActive: boolean;
}

// ==================== CHAT TYPES ====================
export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
  codeBlocks?: { language: string; code: string; filename?: string }[];
  actions?: AIAction[];
}

export interface AIAction {
  type: 'create_file' | 'edit_file' | 'delete_file' | 'run_command' | 'rename_file';
  filename?: string;
  newName?: string;
  content?: string;
  command?: string;
  description: string;
}

// ==================== TERMINAL TYPES ====================
export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp: number;
}

// ==================== GITHUB TYPES ====================
export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
}

// ==================== UI TYPES ====================
export type SidebarIcon = 'explorer' | 'search' | 'git' | 'debug' | 'extensions';
export type BottomPanelTab = 'terminal' | 'problems' | 'ports' | 'output';
export type Theme = 'dark' | 'light';

export interface SearchResult {
  file: FileItem;
  line: number;
  content: string;
}

export interface Command {
  id: string;
  label: string;
  shortcut: string;
  action: () => void;
}

// ==================== AUTH TYPES ====================
export interface AuthUser {
  email: string;
  name: string;
  avatar: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}
