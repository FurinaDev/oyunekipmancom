import React, { useState, useRef } from 'react';
import { Product, MainCategory, ProductType, SellerType } from '../types';
import { CATEGORIES } from '../data/mockData';
import { HomeHero } from '../components/HomeHero';
import { ProductCard } from '../components/ProductCard';
import {
  Keyboard,
  Mouse,
  Headphones,
  Cpu,
  Tv,
  Gamepad2,
  KeyRound,
  CreditCard,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  Building2,
  Layers,
  Flame,
  Zap,
  SlidersHorizontal
} from 'lucide-react';

interface HomePageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenCreateListing: () => void;
  onNavigate: (page: string, categoryFilter?: MainCategory) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  keyboards: <Keyboard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
  mice: <Mouse className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  audio: <Headphones className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
  pc_parts: <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  monitors: <Tv className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
  consoles: <Gamepad2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
  games_keys: <KeyRound className="w-5 h-5 text-pink-600 dark:text-pink-400" />,
  epins: <CreditCard className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
  skins_cosmetics: <Sparkles className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
};

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onOpenCreateListing,
  onNavigate,
}) => {
  const [selectedType, setSelectedType] = useState<'ALL' | ProductType>('ALL');
  const [selectedSellerType, setSelectedSellerType] = useState<'ALL' | SellerType>('ALL');
  const [searchFilter, setSearchFilter] = useState('');
  const catalogRef = useRef<HTMLDivElement>(null);

  const handleScrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProducts = products.filter((p) => {
    if (selectedType !== 'ALL' && p.type !== selectedType) return false;
    if (selectedSellerType !== 'ALL' && p.seller.type !== selectedSellerType) return false;
    if (searchFilter.trim() !== '') {
      const q = searchFilter.toLocaleLowerCase('tr-TR');
      const inTitle = p.title.toLocaleLowerCase('tr-TR').includes(q);
      const inDesc = p.description.toLocaleLowerCase('tr-TR').includes(q);
      const inSeller = p.seller.name.toLocaleLowerCase('tr-TR').includes(q);
      const inSwitch = p.specs.switchType?.toLocaleLowerCase('tr-TR').includes(q);
      const inSensor = p.specs.sensorModel?.toLocaleLowerCase('tr-TR').includes(q);
      return inTitle || inDesc || inSeller || inSwitch || inSensor;
    }
    return true;
  });

  // Featured 6 items for clean, non-fatiguing 1-2 row layout
  const featuredRow1 = filteredProducts.slice(0, 6);
  const featuredRow2 = filteredProducts.slice(6, 12);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero with minimal tech background and instant AJAX live search */}
      <HomeHero
        onSearch={(query) => setSearchFilter(query)}
        onSelectCategory={(cat) => {
          if (cat === 'ALL') {
            onNavigate('physical');
          } else {
            onNavigate('physical', cat);
          }
        }}
        onOpenCreateListing={onOpenCreateListing}
        onNavigate={onNavigate}
        onScrollToCatalog={handleScrollToCatalog}
      />

      {/* 2. Compact Visual Categories Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Kategorilere Göre Donanımlar</span>
          </h2>
          <span className="text-xs text-slate-400">9 Ana Başlık</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onNavigate(cat.type === 'PHYSICAL' ? 'physical' : 'digital', cat.id);
              }}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 hover:shadow-xs transition-all text-center flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                {CATEGORY_ICONS[cat.id]}
              </div>
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. High-Density Compact Featured Grid (Exactly 6 per row on wide screens) */}
      <div ref={catalogRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header with Quick Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>Günün Öne Çıkanları</span>
              </span>
              <span className="text-xs text-slate-400">({filteredProducts.length} İlan)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              Öne Çıkan Donanımlar & Dijital Kodlar
            </h2>
          </div>

          {/* Quick Segmented Filters */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setSelectedType('ALL')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                selectedType === 'ALL'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setSelectedType('PHYSICAL')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                selectedType === 'PHYSICAL'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Fiziki Donanım
            </button>
            <button
              onClick={() => setSelectedType('DIGITAL')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                selectedType === 'DIGITAL'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Dijital Kod & E-Pin
            </button>
          </div>
        </div>

        {/* 6-Col Compact Product Grid Row 1 */}
        {featuredRow1.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-stretch">
              {featuredRow1.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>

            {/* Row 2 (if available) */}
            {featuredRow2.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-stretch pt-2">
                {featuredRow2.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={onSelectProduct}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400 space-y-2">
            <p className="text-sm">Aramanızla eşleşen donanım bulunamadı.</p>
            <button
              onClick={() => setSearchFilter('')}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>

      {/* 4. AI & Dene-Bunu Innovation Promo Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl border border-purple-200 dark:border-purple-900/60 bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>2026 Yapay Zeka & Ekipman İnovasyonu</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              AI Donanım Stüdyosu: Bütçene Göre Sıfır Darboğazlı Sistem Topla
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
              Hedef oyununu (Valorant, CS2, Cyberpunk) ve bütçeni seç; yapay zeka işlemci-ekran kartı darboğazını hesaplayıp platformdaki uyumlu aktif ilanları tek tıkla önüne getirsin.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigate('ai-studio')}
              className="px-6 py-3.5 rounded-2xl bg-purple-500 hover:bg-purple-600 font-bold text-xs sm:text-sm text-white shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Stüdyoyu Başlat</span>
            </button>
            <button
              onClick={() => onNavigate('rent-to-own')}
              className="px-6 py-3.5 rounded-2xl border border-white/20 hover:bg-white/10 font-bold text-xs sm:text-sm text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>"Dene-Bunu" Kirala</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
