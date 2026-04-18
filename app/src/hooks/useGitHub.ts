import { useState, useCallback, useEffect } from 'react';
import { GitHubUser, GitHubRepo } from '../types';

export function useGitHub() {
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [isGithubConnected, setIsGithubConnected] = useState(false);

  const handleGitHubLogin = useCallback(() => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID || 'Ov23liZ7X9l1R8J6s0Z4';
    const redirectUri = window.location.origin;
    const scope = 'repo user';

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = authUrl;
  }, []);

  const handleGitHubPush = useCallback((addTerminalLine: (type: 'input' | 'output' | 'error', content: string) => void) => {
    if (!isGithubConnected) {
      handleGitHubLogin();
      return;
    }
    addTerminalLine('output', '⬆️ Pushing to GitHub...');
    setTimeout(() => {
      addTerminalLine('output', '✓ Pushed to main');
    }, 1500);
  }, [isGithubConnected, handleGitHubLogin]);

  const handleGitHubPull = useCallback((addTerminalLine: (type: 'input' | 'output' | 'error', content: string) => void) => {
    if (!isGithubConnected) {
      handleGitHubLogin();
      return;
    }
    addTerminalLine('output', '⬇️ Pulling from GitHub...');
    setTimeout(() => {
      addTerminalLine('output', '✓ Already up to date');
    }, 1500);
  }, [isGithubConnected, handleGitHubLogin]);

  // Check for GitHub OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // In production, exchange code for token on backend
      // For demo, simulate successful auth
      setIsGithubConnected(true);
      setGithubUser({
        login: 'developer',
        avatar_url: 'https://github.com/github.png',
        name: 'Developer'
      });
      setGithubRepos([
        { id: 1, name: 'my-project', full_name: 'developer/my-project', html_url: 'https://github.com/developer/my-project', description: 'My project' },
      ]);

      // Clear URL params
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return {
    githubUser,
    githubRepos,
    isGithubConnected,
    setIsGithubConnected,
    setGithubUser,
    setGithubRepos,
    handleGitHubLogin,
    handleGitHubPush,
    handleGitHubPull,
  };
}
