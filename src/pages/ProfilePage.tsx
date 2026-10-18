import React, { useState } from 'react';
import { SellerProfile, Product, ProductReview } from '../types';
import { SELLER_TIERS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import {
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Package,
  Award,
  CheckCircle2,
  Building2,
  Edit3,
  Clock,
  Sparkles,
  ShoppingBag,
  Share2,
  ChevronRight,
  Store,
  FileText
} from 'lucide-react';

interface ProfilePageProps {
  seller: SellerProfile;
  products: Product[];
  currentUser: SellerProfile | null;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onUpdateBio?: (newBio: string) => void;
}

const DEFAULT_REVIEWS: ProductReview[] = [
  {
    id: 'rev_1',
    authorName: 'Barış K.',
    authorUsername: 'baris_cs2',
    rating: 5,
    comment: 'Wooting klavye ertesi gün teslim edildi. 48 saat test süresince tüm tuşların analog hassasiyetini denedim, sıfır ayarında kusursuz.',
    createdAt: '2 gün önce',
    verifiedPurchase: true,
    productTitle: 'Wooting 60HE+ Espor Klavyesi',
  },
  {
    id: 'rev_2',
    authorName: 'Serhat Y.',
    authorUsername: 'serhat_val',
    rating: 5,
    comment: 'Superlight 2 farenin skatezleri tertemiz, kutusu jelatiniyle gönderildi. Çok ilgili ve dürüst bir satıcı.',
    createdAt: '1 hafta önce',
    verifiedPurchase: true,
    productTitle: 'Logitech G PRO X Superlight 2',
  },
];

export const ProfilePage: React.FC<ProfilePageProps> = ({
  seller,
  products,
  currentUser,
  onSelectProduct,
  onAddToCart,
  onUpdateBio,
}) => {
  const isCorporate = seller.type === 'VERIFIED_B2C';
  const isOwner = currentUser?.id === seller.id || currentUser?.username === seller.username;

  const [activeTab, setActiveTab] = useState<'listings' | 'reviews' | 'about' | 'escrow'>('listings');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(
    seller.bio ||
      (isCorporate
        ? 'Yetkili distribütör garantili, sıfır kapalı kutu espor çevre birimleri perakendecisiyiz. Tüm ürünlerimiz faturalıdır.'
        : 'Espor donanımları koleksiyoneriyim. İlanlarım 48 saat test güvencelidir.')
  );

  const tier = SELLER_TIERS[seller.tier] || SELLER_TIERS.BRONZE;
  const sellerProducts = products.filter(
    (p) => p.seller.id === seller.id || p.seller.username === seller.username
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Compact Banner & Header Bar */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="h-28 sm:h-36 w-full bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-900 relative">
          <img
            src={
              seller.bannerUrl ||
              'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80'
            }
            alt="Banner"
            className="w-full h-full object-cover opacity-45"
          />
        </div>

        <div className="p-5 sm:p-6 relative -mt-10 sm:-mt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-900 bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shrink-0">
              {seller.avatarUrl ? (
                <img src={seller.avatarUrl} alt={seller.name} className="w-full h-full object-cover" />
              ) : (
                seller.name.slice(0, 2).toUpperCase()
              )}
            </div>

            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {seller.name}
                </h1>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${tier.badgeColor}`}>
                  {tier.label.split('/')[0]}
                </span>
                {seller.isNviVerified && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>NVİ Doğrulanmış</span>
                  </span>
                )}
                {isCorporate && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    <span>Kurumsal Mağaza</span>
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 pt-0.5">
                <span>@{seller.username}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {seller.city}
                </span>
                <span>·</span>
                <span>{seller.completedSales} Satış</span>
                <span>·</span>
                <span className="flex items-center text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 mr-0.5" /> {seller.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Profil bağlantısı panoya kopyalandı.');
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
              title="Paylaş"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {isOwner && (
              <button
                onClick={() => setIsEditingBio(!isEditingBio)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Düzenle</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {isEditingBio && (
        <div className="p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-3 text-xs">
          <label className="font-bold text-slate-900 dark:text-white block">
            Biyografi / Mağaza Açıklaması
          </label>
          <textarea
            rows={2}
            value={bioText}
            onChange={(e) => setBioText(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditingBio(false)}
              className="px-3 py-1.5 rounded-lg border text-slate-600 dark:text-slate-400"
            >
              İptal
            </button>
            <button
              onClick={() => {
                if (onUpdateBio) onUpdateBio(bioText);
                setIsEditingBio(false);
              }}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold"
            >
              Kaydet
            </button>
          </div>
        </div>
      )}

      {/* Two-Column Layout with Vertical Left Sidebar Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Vertical Menu */}
        <div className="lg:col-span-3 border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-2.5 space-y-1 shadow-xs text-xs font-bold">
          <button
            onClick={() => setActiveTab('listings')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'listings'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>Aktif İlanlar</span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeTab === 'listings' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800'
              }`}
            >
              {sellerProducts.length}
            </span>
          </button>

          {/* Reviews Tab (Available for all or if any reviews) */}
          <button
            onClick={() => setActiveTab('reviews')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>Değerlendirmeler</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>

          {/* Mağaza Bilgileri & Güvence ONLY visible for Corporate B2C stores */}
          {isCorporate && (
            <>
              <button
                onClick={() => setActiveTab('about')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'about'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  <span>Mağaza Bilgileri</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setActiveTab('escrow')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'escrow'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Kurumsal Güvence & İade</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            </>
          )}
        </div>

        {/* Right Main Content */}
        <div className="lg:col-span-9 border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-xs">
          {activeTab === 'listings' && (
            <div>
              {sellerProducts.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Bu satıcının şu anda aktif ilanı bulunmamaktadır.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sellerProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onSelect={onSelectProduct}
                      onAddToCart={onAddToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                  {seller.rating.toFixed(1)}
                </div>
                <div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {seller.reviewCount} doğrulanmış oyuncu değerlendirmesi
                  </span>
                </div>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {(seller.reviews && seller.reviews.length > 0 ? seller.reviews : DEFAULT_REVIEWS).map((rev) => (
                  <div key={rev.id} className="py-3.5 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">{rev.authorName}</span>
                      <span className="text-slate-400 text-[11px]">{rev.createdAt}</span>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && isCorporate && (
            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Kurumsal Mağaza Profili & Ticari Sicil
              </h3>
              <p className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                {bioText}
              </p>
              <div className="pt-2 text-[11px] text-slate-500">
                <span>Vergi Numarası: <strong>{seller.corporateTaxNo || 'Doğrulanmış VKN'}</strong></span> · <span>Şehir: <strong>{seller.city}</strong></span>
              </div>
            </div>
          )}

          {activeTab === 'escrow' && isCorporate && (
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Kurumsal İade ve 14 Gün Cayma Hakkı Güvencesi</span>
              </h3>
              <p>
                Bu mağazadan alınan sıfır ürünlerde 6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında 14 günlük yasal cayma hakkı bulunmaktadır.
              </p>
              <p>
                Fatura şirket adına kesilir ve resmi 2 yıl distribütör garantisi geçerlidir.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
