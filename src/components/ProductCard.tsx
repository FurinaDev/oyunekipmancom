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

  return (
    <div className="group flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200">
      {/* Product Image Area */}
      <div
        onClick={() => onSelect(product)}
        className="relative aspect-4/3 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer"
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
          onError={(e) => {
            // Elegant fallback if image link fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Condition Tag */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 shadow-xs backdrop-blur-xs">
            {CONDITION_LABELS[product.condition] || product.condition}
          </span>
          {product.type === 'DIGITAL' && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-600 text-white shadow-xs">
              Dijital Kod
            </span>
          )}
        </div>

        {/* Seller Type Badge on Card Top Right */}
        <div className="absolute top-2.5 right-2.5">
          {product.seller.type === 'VERIFIED_B2C' ? (
            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-600 text-white shadow-xs">
              <Building2 className="w-3 h-3" />
              <span>Yetkili Mağaza</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900/80 text-white backdrop-blur-xs">
              <span>2. El C2C</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="space-y-2">
          {/* Unboxed Metadata (Zero-pill discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-indigo-600 dark:text-indigo-400">
              {product.category.replace('_', ' ')}
            </span>
            <span aria-hidden="true">·</span>
            <span>{product.seller.city}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelect(product)}
            className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
          >
            {product.title}
          </h3>

          {/* Key Specs Snippet */}
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
            {product.specs.switchType && (
              <div className="truncate">
                <span className="text-slate-400">Switch: </span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{product.specs.switchType}</span>
              </div>
            )}
            {product.specs.sensorModel && (
              <div className="truncate">
                <span className="text-slate-400">Sensör: </span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{product.specs.sensorModel} ({product.specs.pollingRate || ''})</span>
              </div>
            )}
            {product.specs.panelType && (
              <div className="truncate">
                <span className="text-slate-400">Panel: </span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{product.specs.panelType} · {product.specs.refreshRateHz}Hz</span>
              </div>
            )}
            {product.specs.furmarkMaxTemp && (
              <div className="truncate text-emerald-600 dark:text-emerald-400 font-medium">
                FurMark: {product.specs.furmarkMaxTemp}
              </div>
            )}
            {product.specs.deliveryType && (
              <div className="truncate text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>{product.specs.deliveryType}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer: Seller Tier & Price */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          {/* Seller Tier & Rating */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border truncate ${tierInfo.badgeColor}`}>
              {tierInfo.label.split('/')[0]}
            </span>
            <div className="flex items-center text-xs text-slate-500 font-medium shrink-0">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-0.5" />
              <span>{product.seller.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right">
              <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                {product.price.toLocaleString('tr-TR')} ₺
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="text-[11px] text-slate-400 line-through font-mono tabular-nums">
                  {product.originalPrice.toLocaleString('tr-TR')} ₺
                </div>
              )}
            </div>

            <button
              onClick={() => onAddToCart(product)}
              title="Sepete Ekle"
              className="p-1.5 rounded-lg text-slate-700 hover:text-white hover:bg-indigo-600 dark:text-slate-300 dark:hover:text-white dark:hover:bg-indigo-600 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
