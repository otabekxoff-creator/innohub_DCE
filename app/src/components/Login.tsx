import React, { useState } from 'react';
import { useAppStore } from '../store';
import { githubAuth } from '../lib/githubAuth';
import { Sparkles, Lock, Mail, Eye, EyeOff, Github, Chrome, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      if (email && password) {
        login({ email, name: email.split('@')[0], avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}` });
      } else {
        setError('Email va parolni kiriting');
      }
      setIsLoading(false);
    }, 1000);
  };

  // Check if GitHub OAuth is configured
  const isGitHubConfigured = !!import.meta.env.VITE_GITHUB_CLIENT_ID && 
                           import.meta.env.VITE_GITHUB_CLIENT_ID !== 'your_github_client_id';

  const handleSocialLogin = (provider: string) => {
    if (provider === 'github') {
      // Check if GitHub OAuth is configured
      const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
      if (!clientId || clientId === 'your_github_client_id') {
        // Demo mode - simulate GitHub login
        setIsLoading(true);
        setTimeout(() => {
          login({ 
            email: 'demo@github.com', 
            name: 'GitHub Demo User', 
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=github'
          });
          setIsLoading(false);
        }, 1000);
        return;
      }
      // Real GitHub OAuth
      githubAuth.login();
    } else {
      // Simulated login for other providers
      setIsLoading(true);
      setTimeout(() => {
        login({ 
          email: `user@${provider}.com`, 
          name: `${provider} User`, 
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}` 
        });
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] overflow-hidden">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        
        {/* Animated circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50">
              <Sparkles size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            INNOHUB
          </h1>
          <p className="text-xl text-gray-300 mb-2">AI-Powered IDE</p>
          <p className="text-gray-400 max-w-md">
            Zamonaviy kod yozish muhiti. AI yordami, real terminal va GitHub integratsiyasi bitta joyda.
          </p>
          
          {/* Features */}
          <div className="mt-8 space-y-3 text-left max-w-sm mx-auto">
            {[
              'AI kod yordami',
              'Real terminal',
              'GitHub integratsiyasi',
              'Ko\'p fayllar bilan ishlash'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] lg:hidden" />
        
        <div className="relative z-10 w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
              <Sparkles size={28} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">INNOHUB</h2>
          </div>

          {/* Login Card */}
          <div className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl">
            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-[#0f0f0f] rounded-xl mb-6">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'login'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Kirish
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'register'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Ro'yxatdan o'tish
              </button>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white mb-1">
              {activeTab === 'login' ? 'Xush kelibsiz!' : "Hisob ochish"}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {activeTab === 'login' 
                ? 'Davom etish uchun hisobingizga kiring' 
                : "Yangi hisob ochish uchun ma'lumotlarni kiriting"}
            </p>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-xs">!</span>
                </div>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2 font-medium">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="siz@email.com"
                    className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2 font-medium">Parol</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg py-2.5 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {activeTab === 'login' && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded bg-[#0f0f0f] border-[#2a2a2a] text-blue-600" />
                    Eslab qolish
                  </label>
                  <button type="button" className="text-blue-400 hover:text-blue-300">
                    Parolni unutdingizmi?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {activeTab === 'login' ? 'Kirish' : "Ro'yxatdan o'tish"}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2a2a2a]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#1a1a1a] text-gray-500">yoki</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialLogin('github')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 py-2.5 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-gray-300 hover:bg-[#1f1f1f] hover:border-[#3a3a3a] transition-all relative"
              >
                <Github size={18} />
                <span className="text-sm">GitHub</span>
                {!isGitHubConfigured && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                    Demo
                  </span>
                )}
              </button>
              <button
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 py-2.5 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-gray-300 hover:bg-[#1f1f1f] hover:border-[#3a3a3a] transition-all"
              >
                <Chrome size={18} />
                <span className="text-sm">Google</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Kirish orqali siz{' '}
            <button className="text-blue-400 hover:text-blue-300">Foydalanish shartlari</button>
            {' '}va{' '}
            <button className="text-blue-400 hover:text-blue-300">Maxfiylik siyosati</button>
            {' '}ga rozilik bildirasiz
          </p>

          {/* GitHub OAuth Setup Instructions */}
          {!isGitHubConfigured && (
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-xs text-center">
                <strong>GitHub OAuth sozlash:</strong><br />
                1. GitHub → Settings → Developer settings → OAuth Apps<br />
                2. New OAuth App → Nom: INNOHUB IDE<br />
                3. Callback URL: {window.location.origin}/auth/github/callback<br />
                4. Client ID ni oling va Vercelga qo&apos;shing
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
