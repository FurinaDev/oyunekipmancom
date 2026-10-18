import React, { useState } from 'react';
import { Logo } from './Logo';
import {
  Sun,
  Moon,
  ShoppingBag,
  PlusCircle,
  UserCircle2,
  Shield,
  LogOut,
  ChevronDown,
  Store,
  Sparkles,
  Keyboard,
  Mouse,
  Headphones,
  Tv,
  Cpu,
  Gamepad2,
  KeyRound,
  CreditCard,
  Menu,
  X,
  Zap,
  HelpCircle,
  Users,
  Building2,
  PhoneCall
} from 'lucide-react';
import { SellerProfile, BrandingSettings, MainCategory } from '../types';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  currentPage: string;
  onNavigate: (page: string, categoryFilter?: MainCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  currentUser: SellerProfile | null;
  isAdmin: boolean;
  onOpenAuth: () => void;
  onLogout: () => void;
  branding?: BrandingSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  currentUser,
  isAdmin,
  onOpenAuth,
  onLogout,
  branding,
}) => {
  const [hardwareMenuOpen, setHardwareMenuOpen] = useState(false);
  const [digitalMenuOpen, setDigitalMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: string, cat?: MainCategory) => {
    onNavigate(page, cat);
    setHardwareMenuOpen(false);
    setDigitalMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 border-slate-200 bg-white/95 dark:border-slate-800 dark:bg-slate-950/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Logo (Only PNG image, no text!) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center cursor-pointer focus:outline-none shrink-0"
        >
          <Logo theme={theme} size="md" branding={branding} location="navbar" />
        </button>

        {/* Zone 2: Streamlined Minimal Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-5 text-xs sm:text-sm font-bold tracking-tight">
          <button
            onClick={() => handleNavClick('home')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 ${
              currentPage === 'home'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Ana Sayfa
          </button>

          {/* Donanım Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setHardwareMenuOpen(true)}
            onMouseLeave={() => setHardwareMenuOpen(false)}
          >
            <button
              onClick={() => handleNavClick('physical')}
              className={`flex items-center gap-1 whitespace-nowrap transition-colors cursor-pointer py-1 ${
                currentPage === 'physical'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <span>Donanım</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {hardwareMenuOpen && (
              <div className="absolute top-full -left-2 w-72 p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl space-y-1 animate-in fade-in duration-150 z-50">
                <button
                  onClick={() => handleNavClick('physical', 'keyboards')}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Keyboard className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-white block">Mekanik Klavyeler</span>
                    <span className="text-[10px] text-slate-400">Custom ve Hall-Effect</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('physical', 'mice')}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Mouse className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-white block">Oyuncu Fareleri</span>
                    <span className="text-[10px] text-slate-400">Hafif espor mouselar</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('physical', 'monitors')}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Tv className="w-4 h-4 text-cyan-600 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-white block">Monitörler</span>
                    <span className="text-[10px] text-slate-400">Fast-IPS & OLED 240Hz+</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('physical', 'pc_parts')}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-white block">Ekran Kartı & PC</span>
                    <span className="text-[10px] text-slate-400">FurMark testli GPU</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('physical', 'audio')}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Headphones className="w-4 h-4 text-purple-600 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-white block">Kulaklık & Ses</span>
                    <span className="text-[10px] text-slate-400">7.1 Surround ses kartları</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('physical', 'consoles')}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Gamepad2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-white block">Konsol & Kol</span>
                    <span className="text-[10px] text-slate-400">PS5, Xbox, Switch</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Dijital Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDigitalMenuOpen(true)}
            onMouseLeave={() => setDigitalMenuOpen(false)}
          >
            <button
              onClick={() => handleNavClick('digital')}
              className={`flex items-center gap-1 whitespace-nowrap transition-colors cursor-pointer py-1 ${
                currentPage === 'digital'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <span>Dijital</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {digitalMenuOpen && (
              <div className="absolute top-full -left-2 w-60 p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl space-y-1 animate-in fade-in duration-150 z-50">
                <button
                  onClick={() => handleNavClick('digital', 'epins')}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-teal-600 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-white block">E-Pin & Cüzdan</span>
                    <span className="text-[10px] text-slate-400">Valorant VP, Steam Cüzdan</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('digital', 'games_keys')}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <KeyRound className="w-4 h-4 text-pink-600 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-white block">Oyun Lisans & Key</span>
                    <span className="text-[10px] text-slate-400">Steam, Epic, EA kodları</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('digital', 'skins_cosmetics')}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-white block">Kozmetik & Skin</span>
                    <span className="text-[10px] text-slate-400">CS2 ve legal skinler</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('creators')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 ${
              currentPage === 'creators'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            İçerik Üreticileri
          </button>

          <button
            onClick={() => handleNavClick('partners')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 ${
              currentPage === 'partners'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            İş Ortaklarımız
          </button>

          {/* AI Donanım Stüdyosu */}
          <button
            onClick={() => handleNavClick('ai-studio')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              currentPage === 'ai-studio'
                ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 font-bold'
                : 'text-purple-600 hover:text-purple-700 dark:text-purple-400 font-bold'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Donanım</span>
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 ${
              currentPage === 'contact'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            İletişim
          </button>

          <button
            onClick={() => handleNavClick('become-seller')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 flex items-center gap-1 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-bold ${
              currentPage === 'become-seller' ? 'border-b-2 border-emerald-600' : ''
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Mağaza Aç</span>
          </button>
        </nav>

        {/* Zone 3: Functional Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Tema Değiştir"
            title={theme === 'dark' ? 'Açık Temaya Geç' : 'Koyu Temaya Geç'}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            aria-label="Sepeti Görüntüle"
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Cockpit Button (ONLY visible when isAdmin is true) */}
          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentPage === 'admin'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Yönetim</span>
            </button>
          )}

          {/* Auth State */}
          {currentUser ? (
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => handleNavClick('profile')}
                title="Profilim"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <UserCircle2 className="w-4 h-4 text-indigo-500" />
                <span className="truncate max-w-[70px] sm:max-w-[100px]">{currentUser.name}</span>
              </button>

              <button
                onClick={onLogout}
                title="Çıkış Yap"
                className="p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Giriş Yap
            </button>
          )}

          {/* Create Listing */}
          <button
            onClick={() => handleNavClick('create-listing')}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">İlan Ver</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-5 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => handleNavClick('home')}
              className="p-3 text-left rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white"
            >
              Ana Sayfa
            </button>
            <button
              onClick={() => handleNavClick('physical')}
              className="p-3 text-left rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white"
            >
              Donanım
            </button>
            <button
              onClick={() => handleNavClick('digital')}
              className="p-3 text-left rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white"
            >
              Dijital Kodlar
            </button>
            <button
              onClick={() => handleNavClick('creators')}
              className="p-3 text-left rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white"
            >
              İçerik Üreticileri
            </button>
            <button
              onClick={() => handleNavClick('partners')}
              className="p-3 text-left rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white"
            >
              İş Ortaklarımız
            </button>
            <button
              onClick={() => handleNavClick('ai-studio')}
              className="p-3 text-left rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-bold"
            >
              ✨ AI Donanım Stüdyosu
            </button>
            <button
              onClick={() => handleNavClick('become-seller')}
              className="p-3 text-left rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold"
            >
              Mağaza Aç
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="p-3 text-left rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white"
            >
              Hakkımızda
            </button>
            <button
              onClick={() => handleNavClick('team')}
              className="p-3 text-left rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white"
            >
              Ekibimiz
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="p-3 text-left rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white"
            >
              İletişim
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="p-3 text-left rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white col-span-2"
            >
              Yardım & SSS
            </button>
            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className="p-3 text-left rounded-xl bg-purple-600 text-white font-bold col-span-2"
              >
                👑 Yönetim Paneli
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
