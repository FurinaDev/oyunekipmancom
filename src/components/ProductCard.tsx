import React from 'react';
import { Product } from '../types';
import { SELLER_TIERS } from '../data/mockData';
import { ShieldCheck, Star, Zap, Cpu, Sparkles, Building2, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const CONDITION_LABELS: Record<string, string> = {
  NEW_SEALED: 'Sıfır Kapalı Kutu',
  NEW_OPEN_BOX: 'Sıfır Açık Kutu',
  USED_MINT: '2. El Kusursuz',
  USED_VERY_GOOD: '2. El Çok İyi',
  USED_GOOD: '2. El İyi',
  FOR_PARTS: 'Parça Amaçlı',
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
}) => {
  const tierInfo = SELLER_TIERS[product.seller.tier] || SELLER_TIERS.BRONZE;

  // Determine primary technical highlight with consistent fallback
  const primarySpec =
    product.specs.switchType
      ? `Switch: ${product.specs.switchType}`
      : product.specs.sensorModel
      ? `Sensör: ${product.specs.sensorModel}`
      : product.specs.panelType && product.specs.refreshRateHz
      ? `${product.specs.panelType} · ${product.specs.refreshRateHz}Hz`
      : product.specs.furmarkMaxTemp
      ? `FurMark: ${product.specs.furmarkMaxTemp}`
      : product.specs.deliveryType
      ? `Teslimat: ${product.specs.deliveryType}`
      : 'Test Edilmiş & Orijinal';

  return (
    <div className="group h-full flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all duration-200">
      {/* Top Media & Tags */}
      <div>
        {/* Product Image Area */}
        <div
          onClick={() => onSelect(product)}
          className="relative aspect-4/3 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer"
        >
          <img
            src={product.imageUrl}
            alt={product.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* Condition Tag */}
          <div className="absolute top-2 left-2 flex items-center gap-1">
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 shadow-xs backdrop-blur-xs">
              {CONDITION_LABELS[product.condition] || product.condition}
            </span>
            {product.type === 'DIGITAL' && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-600 text-white shadow-xs">
                Dijital
              </span>
            )}
          </div>

          {/* Seller Type Badge on Top Right */}
          <div className="absolute top-2 right-2">
            {product.seller.type === 'VERIFIED_B2C' ? (
              <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-600 text-white shadow-xs">
                <Building2 className="w-2.5 h-2.5" />
                <span>Mağaza</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-900/80 text-white backdrop-blur-xs">
                <span>2. El C2C</span>
              </span>
            )}
          </div>
        </div>

        {/* Card Body Header & Content */}
        <div className="p-3 sm:p-3.5 space-y-2">
          {/* Metadata Row: Category & City */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 truncate">
            <span className="font-bold uppercase tracking-wider text-[10px] text-indigo-600 dark:text-indigo-400">
              {product.category.replace('_', ' ')}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.seller.city}</span>
          </div>

          {/* Product Title: Explicit 2-Line Height (h-9) so all cards match perfectly */}
          <h3
            onClick={() => onSelect(product)}
            className="h-9 text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
          >
            {product.title}
          </h3>

          {/* Highlighted Tech Spec Badge Slot: Fixed h-5 for uniform layout across all products */}
          <div className="h-5 flex items-center">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300 truncate max-w-full">
              {product.type === 'DIGITAL' ? <Zap className="w-2.5 h-2.5 text-blue-500 shrink-0" /> : <Cpu className="w-2.5 h-2.5 text-indigo-500 shrink-0" />}
              <span className="truncate">{primarySpec}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Structured Card Footer (2 clean rows to prevent squeezed horizontal crowding) */}
      <div className="px-3 pb-3 sm:px-3.5 sm:pb-3.5 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 mt-auto">
        {/* Row 1: Seller Tier & Rating */}
        <div className="flex items-center justify-between text-[11px]">
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border truncate max-w-[100px] ${tierInfo.badgeColor}`}>
            {tierInfo.label.split('/')[0]}
          </span>
          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 font-semibold shrink-0">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
            <span>{product.seller.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Row 2: Price & Add to Cart Button */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="min-w-0 flex-1">
            <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-mono tabular-nums truncate">
              {product.price.toLocaleString('tr-TR')} ₺
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-[10px] text-slate-400 line-through font-mono tabular-nums">
                {product.originalPrice.toLocaleString('tr-TR')} ₺
              </div>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            title="Sepete Ekle"
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs cursor-pointer shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
