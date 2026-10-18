import React, { useState, useMemo } from 'react';
import { Product, MainCategory, ProductType, SellerType } from '../types';
import { CATEGORIES } from '../data/mockData';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, X, ArrowUpDown, Filter } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: 'ALL' | MainCategory;
  onSelectCategory: (cat: 'ALL' | MainCategory) => void;
  productTypeFilter: 'ALL' | ProductType;
  sellerTypeFilter: 'ALL' | SellerType;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onResetFilters: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  productTypeFilter,
  sellerTypeFilter,
  onSelectProduct,
  onAddToCart,
  onResetFilters,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'popular'>('newest');

  // Filtered categories according to ProductTypeFilter (Physical vs Digital)
  const visibleCategories = useMemo(() => {
    if (productTypeFilter === 'ALL') return CATEGORIES;
    return CATEGORIES.filter((c) => c.type === productTypeFilter);
  }, [productTypeFilter]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Product Type Filter
        if (productTypeFilter !== 'ALL' && p.type !== productTypeFilter) return false;
        // Seller Type Filter
        if (sellerTypeFilter !== 'ALL' && p.seller.type !== sellerTypeFilter) return false;
        // Category Filter
        if (selectedCategory !== 'ALL' && p.category !== selectedCategory) return false;
        // Search Query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLocaleLowerCase('tr-TR');
          const titleMatch = p.title.toLocaleLowerCase('tr-TR').includes(q);
          const descMatch = p.description.toLocaleLowerCase('tr-TR').includes(q);
          const sellerMatch = p.seller.name.toLocaleLowerCase('tr-TR').includes(q);
          const switchMatch = p.specs.switchType?.toLocaleLowerCase('tr-TR').includes(q);
          const sensorMatch = p.specs.sensorModel?.toLocaleLowerCase('tr-TR').includes(q);
          if (!titleMatch && !descMatch && !sellerMatch && !switchMatch && !sensorMatch) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'popular') return b.views - a.views;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, productTypeFilter, sellerTypeFilter, selectedCategory, searchQuery, sortBy]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ürün adı, switch türü, sensör modeli veya mağaza ara..."
            className="w-full pl-10 pr-9 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs sm:text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="newest">En Yeni İlanlar</option>
            <option value="price_asc">Fiyat: Düşükten Yükseğe</option>
            <option value="price_desc">Fiyat: Yüksekten Düşüğe</option>
            <option value="popular">En Çok İncelenenler</option>
          </select>
        </div>
      </div>

      {/* Horizontal Category Badges (Clean Buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => onSelectCategory('ALL')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
            selectedCategory === 'ALL'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white'
          }`}
        >
          Tüm Kategoriler ({products.length})
        </button>

        {visibleCategories.map((cat) => {
          const count = products.filter((p) => p.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Active Filter Indicators */}
      {(selectedCategory !== 'ALL' || productTypeFilter !== 'ALL' || sellerTypeFilter !== 'ALL' || searchQuery) && (
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Filtrelenen sonuç: <strong className="text-slate-900 dark:text-white font-mono">{filteredProducts.length}</strong> ilan</span>
          <span aria-hidden="true">·</span>
          <button
            onClick={onResetFilters}
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-8 space-y-3">
          <Filter className="w-8 h-8 mx-auto text-slate-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Kriterlere uygun ilan bulunamadı
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Arama terimlerinizi basitleştirebilir veya farklı kategorileri seçerek arama yapabilirsiniz.
          </p>
          <button
            onClick={onResetFilters}
            className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            Tüm İlanları Göster
          </button>
        </div>
      )}
    </section>
  );
};
