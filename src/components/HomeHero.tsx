import React, { useState } from 'react';
import { Search, ShieldCheck, Cpu, ArrowRight, Sparkles, Zap, CheckCircle2 } from 'lucide-react';
import { MainCategory } from '../types';

interface HomeHeroProps {
  onSearch: (query: string) => void;
  onSelectCategory: (cat: 'ALL' | MainCategory) => void;
  onOpenCreateListing: () => void;
  onNavigate: (page: string) => void;
  onScrollToCatalog?: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onSearch,
  onSelectCategory,
  onOpenCreateListing,
  onNavigate,
  onScrollToCatalog,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (val: string) => {
    setSearchInput(val);
    onSearch(val); // Instant AJAX live search!
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
    if (onScrollToCatalog) {
      onScrollToCatalog();
    }
  };

  const trendingTags = [
    { label: 'Wooting 60HE', cat: 'keyboards' as MainCategory },
    { label: 'Superlight 2', cat: 'mice' as MainCategory },
    { label: 'RTX 4070 Super', cat: 'pc_parts' as MainCategory },
    { label: 'Valorant VP', cat: 'epins' as MainCategory },
    { label: 'ZOWIE 240Hz', cat: 'monitors' as MainCategory },
    { label: 'Steam Cüzdan', cat: 'epins' as MainCategory },
  ];

  return (
    <div className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      {/* Subtle modern tech grid & glowing orbital background accents */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Ambient background glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center space-y-6">
        {/* Subtle Top Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
          <span>Türkiye'nin Dikey Espor & Donanım Pazaryeri</span>
          <span className="text-slate-400">·</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">C2C & B2C</span>
        </div>

        {/* Wide Centered Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Oyun Ekipmanında Güvenli İkinci El ve{' '}
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Yetkili Sıfır Mağazalar
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Mekanik klavyelerden espor mouselarına, ekran kartlarından resmi e-pin kodlarına kadar
          aradığınız tüm donanım ve lisanslar; doğrulanmış teknik parametreler ve 48 saat test güvencesiyle tek adreste.
        </p>

        {/* Centered Modern Search Bar with Instant AJAX Filtering */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2">
          <div className="relative flex items-center rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-sm hover:border-indigo-500 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Ekipman adı, switch türü, sensör modeli veya e-pin yazın (canlı arama)..."
              className="w-full px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shrink-0 shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>İlan Bul</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Trending Search Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-slate-500">
          <span className="font-semibold text-slate-400 text-[11px]">Popüler Aramalar:</span>
          {trendingTags.map((t, idx) => (
            <button
              key={idx}
              onClick={() => {
                handleInputChange(t.label);
                if (onScrollToCatalog) onScrollToCatalog();
              }}
              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-[11px] cursor-pointer"
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-3xl mx-auto border-t border-slate-100 dark:border-slate-800/80 text-left">
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-slate-900 dark:text-white block">Zorunlu Donanım Raporu</span>
              <span className="text-slate-500 text-[11px]">Switch, sensör ve stres testi kanıtı</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-slate-900 dark:text-white block">48 Saatlik Test Güvencesi</span>
              <span className="text-slate-500 text-[11px]">Siz onaylamadan satıcıya aktarılmaz</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-slate-900 dark:text-white block">Kademeli Satıcı Oranı</span>
              <span className="text-slate-500 text-[11px]">Seviyeye göre %10'dan %5'e komisyon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
