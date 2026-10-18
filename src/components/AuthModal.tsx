import React, { useState } from 'react';
import { SellerProfile } from '../types';
import { MOCK_SELLERS } from '../data/mockData';
import { X, UserCircle2, ShieldCheck, Mail, Lock, Phone, User, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: SellerProfile, roleLabel: string, isAdmin?: boolean) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      // If email has "admin" or "efe", log in as Admin / Founder
      if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('efe')) {
        const adminUser: SellerProfile = {
          id: 'admin_efe',
          name: 'Efe Özkan',
          username: 'efeozkan',
          type: 'INDIVIDUAL_C2C',
          tier: 'GOLD',
          rating: 5.0,
          reviewCount: 99,
          completedSales: 50,
          joinedDate: '2023-01-01',
          isNviVerified: true,
          city: 'İstanbul',
          isApprovedSeller: true,
        };
        onLoginSuccess(adminUser, 'Marka Sahibi / Yönetici', true);
      } else {
        // Standard user login
        const regularUser: SellerProfile = {
          id: 'user_regular',
          name: fullName || 'Kaan Yıldız',
          username: 'kaanyildiz',
          type: 'INDIVIDUAL_C2C',
          tier: 'BRONZE',
          rating: 5.0,
          reviewCount: 3,
          completedSales: 2,
          joinedDate: '2025-06-15',
          isNviVerified: true,
          city: 'Ankara',
          isApprovedSeller: false, // Must apply to sell
        };
        onLoginSuccess(regularUser, 'Üye Kullanıcı', false);
      }
    } else {
      // Register new standard member
      const newUser: SellerProfile = {
        id: `usr_${Date.now()}`,
        name: fullName || 'Yeni Oyuncu',
        username: (fullName || 'oyuncu').toLowerCase().replace(/[^a-z0-9]/g, '_'),
        type: 'INDIVIDUAL_C2C',
        tier: 'BRONZE',
        rating: 5.0,
        reviewCount: 0,
        completedSales: 0,
        joinedDate: new Date().toISOString().split('T')[0],
        isNviVerified: true,
        city: 'İstanbul',
        isApprovedSeller: false, // Standard member
      };
      onLoginSuccess(newUser, 'Yeni Kayıtlı Üye', false);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <UserCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {mode === 'login' ? 'Giriş Yap' : 'Yeni Hesap Oluştur'}
              </h3>
              <span className="text-[11px] text-slate-400">oyunekipman.com Topluluğu</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch between Login & Register */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              mode === 'login'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Giriş Yap
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              mode === 'register'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Kayıt Ol
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Adınız Soyadınız
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="text"
                  placeholder="Efe Özkan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              E-Posta Adresi
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                required
                type="email"
                placeholder="ornek@oyunekipman.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Şifre
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Telefon Numarası
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="05XX XXX XX XX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            {mode === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'}
          </button>
        </form>

        {/* Fast Admin Quick Access for Preview */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center space-y-1 text-[11px] text-slate-400">
          <p>Hızlı Test Girişi:</p>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setEmail('efeozkan@oyunekipman.com');
                setPassword('123456');
              }}
              className="text-purple-600 dark:text-purple-400 font-bold hover:underline cursor-pointer"
            >
              Yönetici (Efe Özkan) Doldur
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                setEmail('oyuncu@gmail.com');
                setPassword('123456');
              }}
              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
            >
              Standart Üye Doldur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
