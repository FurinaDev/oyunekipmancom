import React, { useState } from 'react';
import { Product, ProductReview, SellerProfile } from '../types';
import { SELLER_TIERS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import {
  ChevronLeft,
  ShieldCheck,
  Star,
  Zap,
  Truck,
  RotateCcw,
  CheckCircle2,
  Building2,
  ShoppingBag,
  HelpCircle,
  Share2,
  Heart,
  MessageCircle,
  Cpu,
  BadgeAlert,
  Send,
  UserCheck
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateToSellerProfile?: (seller: SellerProfile) => void;
  onAddReview?: (productId: string, review: ProductReview) => void;
}

const CONDITION_LABELS: Record<string, string> = {
  NEW_SEALED: 'Sıfır (Kapalı Kutu - Jelatinli)',
  NEW_OPEN_BOX: 'Sıfır (Kutusu Açılmış, Kullanılmamış)',
  USED_MINT: '2. El Kusursuz (Çiziksiz / Sıfır Ayarında)',
  USED_VERY_GOOD: '2. El Çok İyi (Kılcal Kullanım İzi)',
  USED_GOOD: '2. El İyi (Normal Kozmetik Durum)',
  FOR_PARTS: 'Parça Amaçlı / Onarım Gerektirir',
};

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBack,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  onNavigateToSellerProfile,
  onAddReview,
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'escrow' | 'reviews'>('specs');
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // New review form state
  const [userRating, setUserRating] = useState<number>(5);
  const [userComment, setUserComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(
    product.reviews && product.reviews.length > 0
      ? product.reviews
      : [
          {
            id: 'p_rev_1',
            authorName: 'Oğuzhan K. (CS2 Oyuncusu)',
            authorUsername: 'oguzhan_fps',
            rating: 5,
            comment:
              'Ürün söylendiği gibi kutulu ve çiziksiz geldi. 48 saat test süresinde benchmark yaptım switchler ve sıcaklıklar harika. Güvenilir satıcı.',
            createdAt: '12 Mart 2026',
            verifiedPurchase: true,
          },
          {
            id: 'p_rev_2',
            authorName: 'Emre T. (Valorant)',
            authorUsername: 'emre_val',
            rating: 5,
            comment: 'Kargolama çok hızlıydı, switchlerde hiçbir çift basma veya gecikme yok. Teşekkürler.',
            createdAt: '28 Şubat 2026',
            verifiedPurchase: true,
          },
        ]
  );
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const tierInfo = SELLER_TIERS[product.seller.tier] || SELLER_TIERS.BRONZE;
  const platformFee = Math.round(product.price * tierInfo.commissionRate);

  // Similar products in same category or type
  const similarProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.type === product.type))
    .slice(0, 4);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    const newRev: ProductReview = {
      id: `rev_${Date.now()}`,
      authorName: authorName.trim() || 'Doğrulanmış Oyuncu',
      authorUsername: 'oyuncu_' + Math.floor(Math.random() * 900 + 100),
      rating: userRating,
      comment: userComment,
      createdAt: 'Az önce',
      verifiedPurchase: true,
      productTitle: product.title,
    };

    setReviewsList([newRev, ...reviewsList]);
    if (onAddReview) {
      onAddReview(product.id, newRev);
    }
    setUserComment('');
    setAuthorName('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Tüm İlanlara Dön</span>
          </button>
          <span>/</span>
          <span>{product.type === 'PHYSICAL' ? 'Fiziki Donanım' : 'Dijital Ürün'}</span>
          <span>/</span>
          <span className="capitalize">{product.category.replace('_', ' ')}</span>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-[200px] sm:max-w-xs">
            {product.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isLiked
                ? 'border-red-300 text-red-500 bg-red-50 dark:bg-red-950/20'
                : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
          </button>
          <button
            onClick={handleCopyLink}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              copied
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
            title="İlan Bağlantısını Kopyala"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Two-Column Product Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery & Test Protection Box */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 w-full rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <img
              src={product.imageUrl}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />

            {/* Condition Badge on Top Left */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-lg bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 shadow-xs backdrop-blur-xs">
                {CONDITION_LABELS[product.condition] || product.condition}
              </span>
              {product.type === 'DIGITAL' && (
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-blue-600 text-white shadow-xs">
                  Dijital Lisans / E-Pin
                </span>
              )}
            </div>

            {/* Seller Type Badge on Top Right */}
            <div className="absolute top-3 right-3">
              {product.seller.type === 'VERIFIED_B2C' ? (
                <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg bg-indigo-600 text-white shadow-xs">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Yetkili Mağaza (Sıfır Faturalı)</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg bg-slate-900/80 text-white backdrop-blur-xs">
                  <span>Esporcu İkinci El (C2C)</span>
                </span>
              )}
            </div>
          </div>

          {/* 48-Hour Escrow Protection Notice Box */}
          <div className="p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>
                {product.type === 'PHYSICAL'
                  ? '48 Saatlik Donanım Testi ve Güvenli Escrow Koruması'
                  : 'Anında Lisans Doğrulama & İade Garantisi'}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              {product.type === 'PHYSICAL'
                ? 'Ödemeniz lisanslı havuz hesapta bloke tutulur. Kargo elinize ulaştıktan sonra 48 saat boyunca switch, sensör, ölü piksel veya sıcaklık testlerini yaparsınız. Siz onay vermeden veya uyuşmazlık çözülmeden satıcıya para aktarılmaz.'
                : 'Dijital kodlar ve e-pinler ödeme onayından saniyeler sonra teslim edilir. Geçersiz veya kullanılmış kod durumunda derhal yenisi tanımlanır veya tam iade sağlanır.'}
            </p>
          </div>
        </div>

        {/* Right Column: Title, Price, Buy Box & Seller */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>İlan Kodu: #{product.id.toUpperCase()}</span>
              <span>·</span>
              <span>{product.views} kez görüntülendi</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {product.title}
            </h1>
          </div>

          {/* Pricing Box */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Satış Fiyatı</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white font-mono tabular-nums">
                  {product.price.toLocaleString('tr-TR')} ₺
                </div>
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="text-right">
                  <span className="text-xs text-emerald-600 font-semibold block">
                    %{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)} İndirim
                  </span>
                  <span className="text-sm text-slate-400 line-through font-mono">
                    {product.originalPrice.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Ücretsiz Kargo (Yurtiçi Kargo)</span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">
                Stok: {product.stock} adet
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onBuyNow(product);
                }}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Hemen Satın Al ({product.price.toLocaleString('tr-TR')} ₺)</span>
              </button>

              <button
                onClick={() => onAddToCart(product)}
                className="w-full py-3 px-4 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-slate-500" />
                <span>Sepete Ekle</span>
              </button>
            </div>
          </div>

          {/* Seller Card (Clickable to ProfilePage!) */}
          <div
            onClick={() => {
              if (onNavigateToSellerProfile) {
                onNavigateToSellerProfile(product.seller);
              }
            }}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-700 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md group-hover:scale-105 transition-transform">
                  {product.seller.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {product.seller.name}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${tierInfo.badgeColor}`}>
                      {tierInfo.label.split('/')[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>@{product.seller.username}</span>
                    <span>·</span>
                    <span>{product.seller.city}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-500 mr-1" />
                  <span>{product.seller.rating.toFixed(1)}</span>
                </div>
                <span className="text-[11px] text-slate-400 block">
                  {product.seller.completedSales} satış
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Seviye Komisyonu: <strong>%{tierInfo.commissionRate * 100}</strong>
              </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:underline">
                Satıcı & Mağaza Profilini Gör ➔
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Full-Width Tabs */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 overflow-x-auto text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-4 px-6 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'specs'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Teknik Özellikler & Doğrulama
          </button>
          <button
            onClick={() => setActiveTab('desc')}
            className={`py-4 px-6 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'desc'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Satıcı Açıklaması
          </button>
          <button
            onClick={() => setActiveTab('escrow')}
            className={`py-4 px-6 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'escrow'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            48 Saatlik Test & İade Güvencesi
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-4 px-6 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Değerlendirmeler & Yorum Yap ({reviewsList.length})
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8">
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-600" />
                <span>Kategori Bazlı Doğrulanmış Donanım Parametreleri</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {product.specs.switchType && (
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                    <span className="text-slate-400 block mb-1">Mekanik / Manyetik Switch</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{product.specs.switchType}</span>
                  </div>
                )}
                {product.specs.isHotSwap !== undefined && (
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                    <span className="text-slate-400 block mb-1">Hot-Swap PCB</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      {product.specs.isHotSwap ? 'Var (Lehimsiz Değişim)' : 'Yok (Sabit Lehimli)'}
                    </span>
                  </div>
                )}
                {product.specs.sensorModel && (
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                    <span className="text-slate-400 block mb-1">Optik Sensör Modeli</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{product.specs.sensorModel}</span>
                  </div>
                )}
                {product.specs.maxDpi && (
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                    <span className="text-slate-400 block mb-1">Maksimum DPI</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm font-mono">{product.specs.maxDpi.toLocaleString()} DPI</span>
                  </div>
                )}
                {product.specs.pollingRate && (
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                    <span className="text-slate-400 block mb-1">Polling Rate</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm font-mono">{product.specs.pollingRate}</span>
                  </div>
                )}
                {product.specs.panelType && (
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                    <span className="text-slate-400 block mb-1">Panel & Hız</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {product.specs.panelType} · {product.specs.refreshRateHz}Hz
                    </span>
                  </div>
                )}
                {product.specs.deadPixelStatus && (
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                    <span className="text-slate-400 block mb-1">Ölü Piksel Beyanı</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{product.specs.deadPixelStatus}</span>
                  </div>
                )}
                {product.specs.furmarkMaxTemp && (
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                    <span className="text-slate-400 block mb-1">FurMark Stres Sıcaklığı</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm font-mono">{product.specs.furmarkMaxTemp}</span>
                  </div>
                )}
                {product.specs.miningHistory && (
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                    <span className="text-slate-400 block mb-1">Madencilik Geçmişi</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{product.specs.miningHistory}</span>
                  </div>
                )}
                {product.specs.platform && (
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                    <span className="text-slate-400 block mb-1">Lisans Platformu & Bölge</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{product.specs.platform} ({product.specs.region})</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'desc' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Satıcının Ayrıntılı Beyanı
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-850 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                {product.description}
              </p>
            </div>
          )}

          {activeTab === 'escrow' && (
            <div className="space-y-4 max-w-3xl text-xs text-slate-600 dark:text-slate-400">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>48 Saatlik Donanım İnceleme & Escrow Prosedürü</span>
              </h3>
              <ol className="space-y-3 list-decimal list-inside leading-relaxed">
                <li>
                  <strong>Sipariş & Bloke:</strong> Alıcının ödediği tutar, lisanslı ödeme kuruluşu güvencesindeki havuz hesaba aktarılır ve satıcıya iletilmez.
                </li>
                <li>
                  <strong>Kargo ve Teslimat:</strong> Satıcı anlaşmalı kargo kodu ile ürünü şubeye teslim eder. Kargo durumu <em>"Teslim Edildi"</em> webhook'u aldığında alıcının paneline 48 saatlik sayaç açılır.
                </li>
                <li>
                  <strong>Donanım Testi:</strong> Alıcı, cihazı bilgisayarına bağlayıp tuş testi, sensör takılması, stres testi ve monitör piksel kontrolünü gerçekleştirir.
                </li>
                <li>
                  <strong>Onay veya İtiraz:</strong> Sorun yoksa alıcı "Onayla" seçeneğini tıklar veya süre sonunda otomatik onaylanır; komisyon kesilip kalan net tutar satıcının IBAN'ına gönderilir.
                </li>
              </ol>
            </div>
          )}

          {/* Interactive Reviews Tab with Form */}
          {activeTab === 'reviews' && (
            <div className="max-w-3xl space-y-8">
              {/* Review Submission Form */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    Bu Donanım / Satıcı İçin Değerlendirme Yapın
                  </h4>
                  <span className="text-[11px] text-slate-400">Doğrulanmış Alıcı Yorumu</span>
                </div>

                {reviewSubmitted && (
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Yorumunuz ve yıldızlı puanınız başarıyla eklendi!
                  </div>
                )}

                <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Puanınız (1 - 5 Yıldız):
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setUserRating(star)}
                          className="p-1 cursor-pointer transition-transform hover:scale-125"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= userRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300 dark:text-slate-700'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 font-bold text-slate-700 dark:text-slate-300">
                        {userRating} / 5 Yıldız
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                        Adınız Soyadınız / Oyuncu Nickiniz:
                      </label>
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="Örn: Görkem A."
                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Yorumunuz:
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      placeholder="Donanımın durumu, kargolama hızı ve 48 saatlik test deneyiminizi yazın..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Değerlendirmeyi Yayınla</span>
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="py-4 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{rev.authorName}</span>
                        {rev.verifiedPurchase && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Doğrulanmış Alıcı
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400">{rev.createdAt}</span>
                    </div>

                    <div className="flex items-center text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            İlginizi Çekebilecek Benzer İlanlar
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
