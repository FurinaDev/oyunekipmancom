import React, { useState } from 'react';
import {
  RotateCcw,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Truck,
  HeartHandshake,
  Tag
} from 'lucide-react';

interface RentableItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  purchasePrice: number;
  rent7Days: number;
  rent14Days: number;
  specs: string;
}

const RENTABLE_ITEMS: RentableItem[] = [
  {
    id: 'rent_1',
    title: 'Wooting 60HE+ Analog Manyetik Espor Klavyesi',
    category: 'Mekanik Klavye',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    purchasePrice: 6850,
    rent7Days: 390,
    rent14Days: 650,
    specs: 'Lekker L60 Hall-Effect Switchler · 0.1mm Rapid Trigger',
  },
  {
    id: 'rent_2',
    title: 'Logitech G PRO X Superlight 2 (White)',
    category: 'Oyuncu Faresi',
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    purchasePrice: 4750,
    rent7Days: 290,
    rent14Days: 480,
    specs: '60 gram · 32.000 DPI HERO 2 Sensör · 4000Hz Polling',
  },
  {
    id: 'rent_3',
    title: 'ZOWIE XL2566K 360Hz Fast-TN Espor Monitörü',
    category: 'Monitör',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    purchasePrice: 24500,
    rent7Days: 1250,
    rent14Days: 1950,
    specs: '360Hz · DyAc+ Hareket Bulanıklığı Önleme · 0.5ms GtG',
  },
  {
    id: 'rent_4',
    title: 'Artisan Hayate Otsu FX Soft (XL) Espor Mousepad',
    category: 'Mousepad & Yüzey',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    purchasePrice: 2850,
    rent7Days: 180,
    rent14Days: 290,
    specs: 'Japonya Üretimi Poron Taban · Sıfır Neme Hassasiyet',
  },
];

export const RentToOwnPage: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState<7 | 14>(7);
  const [successOrder, setSuccessOrder] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-950 to-slate-900 text-white p-8 sm:p-12 border border-indigo-800/40 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Türkiye'de Bir İlk: "Dene-Bunu" Modeli</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Satın Almadan Önce Evinde Dene. Beğenirsen Sahip Ol!
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/80 leading-relaxed max-w-2xl">
            Pahalı bir espor klavyesinin veya farenin eline uyup uymayacağını tahmin etmek zorunda değilsin. 7 veya 14 gün turnuvalarında test et; beğenirsen ödediğin kiralama bedeli satın alma tutarından düşsün!
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-emerald-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> %100 Kira İndirimiyle Satın Alma
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Ücretsiz İade Kargosu
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dezenfekte Edilmiş Sıfır Ayarı Donanım
            </span>
          </div>
        </div>
      </div>

      {/* How it works 4-Step Process */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-900 dark:text-white">
          "Dene-Bunu" Kiralama Modeli Nasıl Çalışır?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-black flex items-center justify-center">
              01
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Donanımı Seç</h3>
            <p className="text-slate-500 leading-relaxed">
              Merak ettiğin espor faresini veya analog klavyeyi seçip 7 veya 14 günlük deneme süresi belirle.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 font-black flex items-center justify-center">
              02
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Kargoyla Kapına Gelsin</h3>
            <p className="text-slate-500 leading-relaxed">
              Özel korumalı kutuda, sterilize edilmiş ve teknik testleri yapılmış şekilde kapına teslim edilir.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-black flex items-center justify-center">
              03
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Maçlarında Dene</h3>
            <p className="text-slate-500 leading-relaxed">
              Hassasiyetini ayarla, scrim ve rekabetçi maçlarında grip tarzına (palm/claw) uyup uymadığını gör.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 font-black flex items-center justify-center">
              04
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Satın Al veya İade Et</h3>
            <p className="text-slate-500 leading-relaxed">
              Beğendiysen ödediğin kira tutarı fiyattan düşer, kalanını ödersin. Beğenmediysen ücretsiz geri gönderirsin.
            </p>
          </div>
        </div>
      </div>

      {/* Duration Switcher */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Kiralanabilir Popüler Donanımlar
          </h2>
          <span className="text-xs text-slate-500">Stoklar anlık olarak güncellenmektedir</span>
        </div>

        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-bold">
          <button
            onClick={() => setSelectedDuration(7)}
            className={`px-4 py-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedDuration === 7
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            7 Günlük Deneme
          </button>
          <button
            onClick={() => setSelectedDuration(14)}
            className={`px-4 py-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedDuration === 14
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            14 Günlük Deneme
          </button>
        </div>
      </div>

      {successOrder && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{successOrder} için "Dene-Bunu" kiralama talebiniz oluşturuldu. Kargo takip kodunuz hazırlandı!</span>
        </div>
      )}

      {/* Rentable Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {RENTABLE_ITEMS.map((item) => {
          const rentalPrice = selectedDuration === 7 ? item.rent7Days : item.rent14Days;
          const remainingToBuy = item.purchasePrice - rentalPrice;

          return (
            <div
              key={item.id}
              className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {item.specs}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[11px] text-slate-400 block">{selectedDuration} Günlük Deneme:</span>
                    <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      {rentalPrice.toLocaleString('tr-TR')} ₺
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Satın Alma Bedeli:</span>
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-mono">
                      {item.purchasePrice.toLocaleString('tr-TR')} ₺
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-[11px] text-emerald-800 dark:text-emerald-300">
                  Beğenirsen sadece <strong>{remainingToBuy.toLocaleString('tr-TR')} ₺</strong> ödeyerek sahip ol!
                </div>

                <button
                  onClick={() => setSuccessOrder(item.title)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{selectedDuration} Günlüğüne Kirala & Dene</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
