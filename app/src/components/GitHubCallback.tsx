import React, { useEffect, useState } from 'react';
import { useAppStore } from '../store';
import { githubAuth } from '../lib/githubAuth';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export const GitHubCallback: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const { login, setGithubUser, setGithubRepos, setIsGithubConnected } = useAppStore();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setStatus('error');
        setError(`GitHub authorization failed: ${errorParam}`);
        return;
      }

      if (!code || !state) {
        setStatus('error');
        setError('Invalid callback parameters');
        return;
      }

      try {
        // Exchange code for access token
        const success = await githubAuth.handleCallback(code, state);
        
        if (!success) {
          setStatus('error');
          setError('Failed to authenticate with GitHub');
          return;
        }

        // Fetch user info
        const user = await githubAuth.getUser();
        
        if (!user) {
          setStatus('error');
          setError('Failed to fetch user information');
          return;
        }

        // Fetch repos
        const repos = await githubAuth.getRepos();

        // Update store
        const authUser = {
          email: user.email || `${user.login}@github.com`,
          name: user.name || user.login,
          avatar: user.avatar_url,
        };

        login(authUser);
        setGithubUser(user as any);
        setGithubRepos(repos as any);
        setIsGithubConnected(true);

        setStatus('success');
        
        // Redirect to main app after short delay
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);

      } catch (err) {
        console.error('GitHub callback error:', err);
        setStatus('error');
        setError('An unexpected error occurred');
      }
    };

    handleCallback();
  }, [searchParams, login, setGithubUser, setGithubRepos, setIsGithubConnected]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]">
      <div className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
        <div className="text-center">
          {status === 'processing' && (
            <>
              <div className="w-16 h-16 bg-[#238636]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 size={32} className="text-[#238636] animate-spin" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                GitHub bilan ulanmoqda...
              </h2>
              <p className="text-gray-400">
                Iltimos, kuting. GitHub hisobingizga ulanmoqda.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Muvaffaqiyatli!
              </h2>
              <p className="text-gray-400">
                GitHub hisobingiz muvaffaqiyatli ulandi. Tez orada yo'naltirilasiz...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-red-500" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Xatolik yuz berdi
              </h2>
              <p className="text-gray-400 mb-4">{error}</p>
              <button
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded-lg transition-colors"
              >
                Bosh sahifaga qaytish
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
