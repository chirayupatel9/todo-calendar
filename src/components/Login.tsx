import React, { useState } from 'react';
import { AuthView } from '../types';
import { Mail, Lock, ArrowRight, UserPlus, KeyRound } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string, name: string) => void;
  onForgotPassword: (email: string) => void;
}

export default function Login({ onLogin, onRegister, onForgotPassword }: LoginProps) {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switch (view) {
      case 'login':
        onLogin(email, password);
        break;
      case 'register':
        onRegister(email, password, name);
        break;
      case 'forgot-password':
        onForgotPassword(email);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {view === 'login' && 'Welcome Back'}
            {view === 'register' && 'Create Account'}
            {view === 'forgot-password' && 'Reset Password'}
          </h1>
          <p className="text-gray-600">Family Task Manager</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {view === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
                <UserPlus className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
              <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {view !== 'forgot-password' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 flex items-center justify-center gap-2"
          >
            <span>
              {view === 'login' && 'Sign In'}
              {view === 'register' && 'Create Account'}
              {view === 'forgot-password' && 'Reset Password'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {view === 'login' && (
            <>
              <button
                onClick={() => setView('forgot-password')}
                className="text-sm text-blue-600 hover:text-blue-700 block w-full text-center"
              >
                Forgot your password?
              </button>
              <button
                onClick={() => setView('register')}
                className="text-sm text-gray-600 hover:text-gray-700 block w-full text-center"
              >
                Don't have an account? Sign up
              </button>
            </>
          )}
          {(view === 'register' || view === 'forgot-password') && (
            <button
              onClick={() => setView('login')}
              className="text-sm text-gray-600 hover:text-gray-700 block w-full text-center"
            >
              Back to login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}