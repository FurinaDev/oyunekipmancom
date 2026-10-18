import React, { useState } from 'react';
import { SellerProfile, Product } from '../types';
import { SELLER_TIERS } from '../data/mockData';
import { Award, ShieldCheck, TrendingUp, DollarSign, Package, CheckCircle2, ChevronRight, Calculator, PlusCircle } from 'lucide-react';

interface SellerDashboardProps {
  currentSeller: SellerProfile;
  sellerProducts: Product[];
  onOpenCreateListing: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  currentSeller,
  sellerProducts,
  onOpenCreateListing,
  onSelectProduct,
}) => {
  const [simulationPrice, setSimulationPrice] = useState<number>(5000);
  const currentTierInfo = SELLER_TIERS[currentSeller.tier] || SELLER_TIERS.BRONZE;

  // Total sales volume & net earnings
  const totalVolume = sellerProducts.reduce((acc, p) => acc + p.price, 0);
  const currentFee = Math.round(totalVolume * currentTierInfo.commissionRate);
  const totalNet = totalVolume - currentFee;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md">
            {currentSeller.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {currentSeller.name}
              </h2>
              <span className={`text-xs font-bold px-2 py-0.5 rounded border ${currentTierInfo.badgeColor}`}>
                {currentTierInfo.label}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              @{currentSeller.username} · {currentSeller.city} · NVİ TCKN ve IBAN Doğrulanmış Hesap
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center px-4">
            <span className="text-[11px] text-slate-500 block">Mevcut Komisyonunuz</span>
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 font-mono">
              %{currentTierInfo.commissionRate * 100}
            </span>
          </div>

          <button
            onClick={onOpenCreateListing}
            className="flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Yeni İlan Ver</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>Yayındaki İlan Sayısı</span>
            <Package className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {sellerProducts.length}
          </div>
          <span className="text-[11px] text-slate-400">Aktif C2C ve B2C portföyü</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>Tamamlanan Satış</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {currentSeller.completedSales}
          </div>
          <span className="text-[11px] text-slate-400">Başarılı sorunsuz teslimat</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>Toplam Portföy Hacmi</span>
            <DollarSign className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {totalVolume.toLocaleString('tr-TR')} ₺
          </div>
          <span className="text-[11px] text-slate-400">Aktif ilanların liste değeri</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>Müşteri Memnuniyeti</span>
            <Award className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {currentSeller.rating.toFixed(1)} / 5.0
          </div>
          <span className="text-[11px] text-slate-400">{currentSeller.reviewCount} onaylı oyuncu puanı</span>
        </div>
      </div>

      {/* 4-Tier Commission Matrix & Hierarchy */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Kademeli Satıcı Seviyeleri ve Komisyon Matrisi
            </h3>
            <p className="text-xs text-slate-500">
              oyunekipman.com'da işlem adedi ve güven puanı yükseldikçe komisyon oranınız düşer.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(SELLER_TIERS).map((tier) => {
            const isCurrent = tier.tier === currentSeller.tier;
            return (
              <div
                key={tier.tier}
                className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${tier.badgeColor}`}>
                      {tier.label.split('/')[0]}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        Mevcut Seviyeniz
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                      %{tier.commissionRate * 100}
                    </div>
                    <span className="text-xs text-slate-500">İşlem Başına Komisyon</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block text-[11px]">
                      Kazanılan Ayrıcalıklar:
                    </span>
                    {tier.perks.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                  {tier.tier === 'CORPORATE' ? (
                    <span>Vergi Levhası & Yetkili Distribütörlük Şartı</span>
                  ) : (
                    <span>Gereksinim: {tier.minSales}+ Satış · {tier.minRating}+ Puan</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Commission Simulator Tool */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
          <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Fiyat ve Seviye Karşılaştırmalı Hakediş Simülatörü</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Simüle Edilecek Ürün Fiyatı:
            </label>
            <div className="relative">
              <input
                type="number"
                min="100"
                step="100"
                value={simulationPrice}
                onChange={(e) => setSimulationPrice(Math.max(100, Number(e.target.value)))}
                className="w-full text-lg font-bold font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                ₺
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Farklı seviyelerde satıcıların cebinde kalan net tutarları kıyaslayın.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.values(SELLER_TIERS).map((t) => {
              const fee = Math.round(simulationPrice * t.commissionRate);
              const takeHome = simulationPrice - fee;
              return (
                <div
                  key={t.tier}
                  className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-1"
                >
                  <span className="text-[10px] font-bold text-slate-400 block truncate">
                    {t.label.split('/')[0]} (%{t.commissionRate * 100})
                  </span>
                  <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                    {takeHome.toLocaleString('tr-TR')} ₺
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    Kesinti: {fee} ₺
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Listings in this Seller Account */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Aktif İlanlarınız ({sellerProducts.length})
        </h3>

        {sellerProducts.length > 0 ? (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
            {sellerProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                      {p.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="capitalize">{p.category.replace('_', ' ')}</span>
                      <span>·</span>
                      <span>Stok: {p.stock} adet</span>
                      <span>·</span>
                      <span>{p.views} görüntülenme</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right">
                    <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                      {p.price.toLocaleString('tr-TR')} ₺
                    </div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                      Net: {(p.price - Math.round(p.price * currentTierInfo.commissionRate)).toLocaleString('tr-TR')} ₺
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
            <p className="text-xs text-slate-500">Henüz yayında bir ilanınız bulunmuyor.</p>
            <button
              onClick={onOpenCreateListing}
              className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Hemen ilk ilanınızı verin
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
