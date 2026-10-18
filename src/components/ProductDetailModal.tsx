import React from 'react';
import { Product } from '../types';
import { SELLER_TIERS } from '../data/mockData';
import { X, ShieldCheck, Star, Zap, Building2, ShoppingBag, Truck, Check, HelpCircle } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

const CONDITION_LABELS: Record<string, string> = {
  NEW_SEALED: 'Sıfır Kapalı Kutu',
  NEW_OPEN_BOX: 'Sıfır Açık Kutu',
  USED_MINT: '2. El Kusursuz',
  USED_VERY_GOOD: '2. El Çok İyi',
  USED_GOOD: '2. El İyi',
  FOR_PARTS: 'Parça Amaçlı',
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const tierInfo = SELLER_TIERS[product.seller.tier] || SELLER_TIERS.BRONZE;
  const platformFee = Math.round(product.price * tierInfo.commissionRate);
  const sellerNetEarnings = product.price - platformFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
              {product.type === 'PHYSICAL' ? 'Fiziki Donanım' : 'Dijital Ürün'}
            </span>
            <span className="text-xs text-slate-500">
              İlan No: #{product.id.toUpperCase()}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Image Container */}
            <div className="space-y-3">
              <div className="aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badges / Guarantees */}
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>
                    {product.type === 'PHYSICAL'
                      ? '48 Saatlik Donanım İnceleme & Test Koruması'
                      : 'Resmi Lisans ve Anında Kod Doğrulama Güvencesi'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Truck className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>
                    {product.type === 'PHYSICAL'
                      ? 'Anlaşmalı Kargo Takip Kodu ile Güvenli Sevk'
                      : 'Ödeme Onayından Sonra Otomatik Teslimat'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Title, Pricing & Specifications */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {CONDITION_LABELS[product.condition] || product.condition}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-2 leading-tight">
                  {product.title}
                </h2>
              </div>

              {/* Price & Stock */}
              <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between">
                <div>
                  <span className="text-xs text-indigo-700 dark:text-indigo-400 font-medium block">
                    Satış Fiyatı (KDV Dahil)
                  </span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tabular-nums">
                    {product.price.toLocaleString('tr-TR')} ₺
                  </div>
                </div>
                <div className="text-right text-xs">
                  <span className="text-slate-500 block">Stok Adedi</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                    {product.stock} adet
                  </span>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Teknik Özellikler & Doğrulama
                </h4>
                <div className="text-xs rounded-lg border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
                  {product.specs.switchType && (
                    <div className="flex justify-between p-2.5">
                      <span className="text-slate-500">Switch Türü</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{product.specs.switchType}</span>
                    </div>
                  )}
                  {product.specs.isHotSwap !== undefined && (
                    <div className="flex justify-between p-2.5">
                      <span className="text-slate-500">Hot-Swap Desteği</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{product.specs.isHotSwap ? 'Evet' : 'Hayır'}</span>
                    </div>
                  )}
                  {product.specs.sensorModel && (
                    <div className="flex justify-between p-2.5">
                      <span className="text-slate-500">Optik Sensör</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{product.specs.sensorModel}</span>
                    </div>
                  )}
                  {product.specs.maxDpi && (
                    <div className="flex justify-between p-2.5">
                      <span className="text-slate-500">Maksimum DPI</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">{product.specs.maxDpi} DPI</span>
                    </div>
                  )}
                  {product.specs.panelType && (
                    <div className="flex justify-between p-2.5">
                      <span className="text-slate-500">Panel & Hız</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{product.specs.panelType} · {product.specs.refreshRateHz}Hz</span>
                    </div>
                  )}
                  {product.specs.deadPixelStatus && (
                    <div className="flex justify-between p-2.5">
                      <span className="text-slate-500">Ölü Piksel Beyanı</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{product.specs.deadPixelStatus}</span>
                    </div>
                  )}
                  {product.specs.furmarkMaxTemp && (
                    <div className="flex justify-between p-2.5">
                      <span className="text-slate-500">Stres Testi (FurMark)</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">{product.specs.furmarkMaxTemp}</span>
                    </div>
                  )}
                  {product.specs.miningHistory && (
                    <div className="flex justify-between p-2.5">
                      <span className="text-slate-500">Madencilik (Mining)</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{product.specs.miningHistory}</span>
                    </div>
                  )}
                  {product.specs.platform && (
                    <div className="flex justify-between p-2.5">
                      <span className="text-slate-500">Platform & Bölge</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{product.specs.platform} ({product.specs.region})</span>
                    </div>
                  )}
                  {product.specs.warrantyMonths && (
                    <div className="flex justify-between p-2.5">
                      <span className="text-slate-500">Kalan Garanti</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{product.specs.warrantyMonths} Ay</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Satıcı Açıklaması
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Seller Trust Profile & Level Card */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                  {product.seller.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {product.seller.name}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${tierInfo.badgeColor}`}>
                      {tierInfo.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>@{product.seller.username}</span>
                    <span>·</span>
                    <div className="flex items-center text-amber-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 mr-1" />
                      <span>{product.seller.rating.toFixed(1)}</span>
                      <span className="text-slate-400 ml-1">({product.seller.reviewCount} değerlendirme)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commission Transparency Box */}
              <div className="sm:text-right text-xs bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block">Kademeli Komisyon Oranı</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                  %{tierInfo.commissionRate * 100} Platform Kesintisi ({platformFee} ₺)
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Satıcı Hakedişi: <strong className="text-slate-800 dark:text-slate-200 font-mono">{sellerNetEarnings} ₺</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-end gap-3">
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Sepete Ekle</span>
          </button>

          <button
            onClick={() => {
              onAddToCart(product);
              onBuyNow(product);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Zap className="w-4 h-4" />
            <span>Hemen Satın Al ({product.price.toLocaleString('tr-TR')} ₺)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
