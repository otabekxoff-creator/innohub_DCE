// GitHub OAuth Configuration
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || '';
const REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI || window.location.origin + '/auth/github/callback';

export interface GitHubUser {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  private: boolean;
}

class GitHubAuth {
  private accessToken: string | null = null;

  constructor() {
    // Check for stored token
    this.accessToken = localStorage.getItem('github_access_token');
  }

  // Initiate GitHub OAuth flow
  login(): void {
    const scope = 'read:user user:email repo';
    const state = this.generateState();
    
    // Store state for verification
    localStorage.setItem('github_oauth_state', state);
    
    const authUrl = `https://github.com/login/oauth/authorize?` +
      `client_id=${GITHUB_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `state=${state}`;
    
    window.location.href = authUrl;
  }

  // Handle OAuth callback
  async handleCallback(code: string, state: string): Promise<boolean> {
    // Verify state to prevent CSRF
    const storedState = localStorage.getItem('github_oauth_state');
    if (state !== storedState) {
      console.error('Invalid state parameter');
      return false;
    }

    try {
      // Exchange code for token
      // Note: In production, this should be done on your backend
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: REDIRECT_URI,
        }),
      });

      const data = await response.json();
      
      if (data.access_token) {
        this.accessToken = data.access_token;
        localStorage.setItem('github_access_token', data.access_token);
        localStorage.removeItem('github_oauth_state');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('GitHub auth error:', error);
      return false;
    }
  }

  // Get current user info
  async getUser(): Promise<GitHubUser | null> {
    if (!this.accessToken) return null;

    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        return await response.json();
      }
      
      // Token might be expired
      if (response.status === 401) {
        this.logout();
      }
      
      return null;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return null;
    }
  }

  // Get user repositories
  async getRepos(): Promise<GitHubRepo[]> {
    if (!this.accessToken) return [];

    try {
      const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        return await response.json();
      }
      
      return [];
    } catch (error) {
      console.error('Failed to fetch repos:', error);
      return [];
    }
  }

  // Check if authenticated
  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  // Logout
  logout(): void {
    this.accessToken = null;
    localStorage.removeItem('github_access_token');
    localStorage.removeItem('github_oauth_state');
  }

  // Generate random state for CSRF protection
  private generateState(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Get stored token
  getToken(): string | null {
    return this.accessToken;
  }
}

export const githubAuth = new GitHubAuth();
