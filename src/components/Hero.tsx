import React from 'react';
import { ShieldCheck, Cpu, KeyRound, Award, CheckCircle2 } from 'lucide-react';
import { ProductType, SellerType } from '../types';

interface HeroProps {
  productTypeFilter: 'ALL' | ProductType;
  onSetProductTypeFilter: (type: 'ALL' | ProductType) => void;
  sellerTypeFilter: 'ALL' | SellerType;
  onSetSellerTypeFilter: (type: 'ALL' | SellerType) => void;
  onOpenCreateListing: () => void;
  onOpenRoadmap: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  productTypeFilter,
  onSetProductTypeFilter,
  sellerTypeFilter,
  onSetSellerTypeFilter,
  onOpenCreateListing,
  onOpenRoadmap,
}) => {
  return (
    <div className="relative border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Headline & Value Proposition */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-indigo-600 dark:text-indigo-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              <span>Sınıf 25 · 28 · 35 Tescilli Marka Güvencesi</span>
              <span className="text-slate-400">/</span>
              <span>Hibrit C2C & B2C Mimari</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Oyun Donanımı ve Dijital Kodlarda <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Doğrulanmış Teknik Standartlar
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Genel ilan sitelerindeki teknik belirsizlik ve güven sorununu sonlandıran dikey pazar yeri.
              Yetkili distribütörlerin sıfır ürünleri (B2C) ile esporcuların test edilmiş ikinci el donanımları (C2C)
              şeffaf seviyeli komisyon yapısıyla bir arada.
            </p>

            {/* Quick Action & Value Tags */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenCreateListing}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors shadow-sm"
              >
                Hemen İlan Oluştur
              </button>
              <button
                onClick={onOpenRoadmap}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              >
                4 Fazlı Proje Planını İncele
              </button>
            </div>
          </div>

          {/* Right Column: Platform Standards & Tier Perks Card */}
          <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3.5">
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Platform Çekirdek Standartları
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Zorunlu Teknik Parametreler
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    Switch markası, sensör modeli, FurMark stres testi ve ölü piksel beyanı.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Kademeli Satıcı Seviyeleri (%10 - %5)
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    Satış adedi ve memnuniyet arttıkça komisyon otomatik olarak düşer.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <KeyRound className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Yasal & Güvenli Dijital Kodlar
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    Yetkili e-pin ve resmi oyun lisansları; hesap satışı kesinlikle yasaktır.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Segmented Controls */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          {/* Product Type Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg text-xs font-semibold">
            <button
              onClick={() => onSetProductTypeFilter('ALL')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                productTypeFilter === 'ALL'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tüm Ürünler
            </button>
            <button
              onClick={() => onSetProductTypeFilter('PHYSICAL')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                productTypeFilter === 'PHYSICAL'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Fiziki Donanım</span>
            </button>
            <button
              onClick={() => onSetProductTypeFilter('DIGITAL')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                productTypeFilter === 'DIGITAL'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Dijital (E-Pin & Kod)</span>
            </button>
          </div>

          {/* Seller Type Filter (B2C vs C2C) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg text-xs font-semibold">
            <button
              onClick={() => onSetSellerTypeFilter('ALL')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                sellerTypeFilter === 'ALL'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tüm Satıcılar
            </button>
            <button
              onClick={() => onSetSellerTypeFilter('INDIVIDUAL_C2C')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                sellerTypeFilter === 'INDIVIDUAL_C2C'
                  ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Bireysel C2C (2. El)
            </button>
            <button
              onClick={() => onSetSellerTypeFilter('VERIFIED_B2C')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                sellerTypeFilter === 'VERIFIED_B2C'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Yetkili Mağaza B2C (Sıfır)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
