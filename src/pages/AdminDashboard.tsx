import React, { useState } from 'react';
import {
  Product,
  SellerProfile,
  SellerApplication,
  BrandingSettings,
  SellerTier
} from '../types';
import { SELLER_TIERS } from '../data/mockData';
import { LOGO_PRESETS, LogoPreset } from '../data/logoPresets';
import { Logo } from '../components/Logo';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Award,
  Layers,
  DollarSign,
  Package,
  TrendingUp,
  Sliders,
  Lock,
  ChevronRight,
  LayoutDashboard,
  UserCheck,
  Palette,
  Upload,
  Image as ImageIcon,
  Check,
  Eye,
  Store,
  Sparkles
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  sellerApplications: SellerApplication[];
  onApproveProduct: (id: string) => void;
  onRejectProduct: (id: string) => void;
  onApproveSeller: (appId: string, assignedTier: SellerTier) => void;
  onRejectSeller: (appId: string) => void;
  branding: BrandingSettings;
  onUpdateBranding: (newBranding: BrandingSettings) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  sellerApplications,
  onApproveProduct,
  onRejectProduct,
  onApproveSeller,
  onRejectSeller,
  branding,
  onUpdateBranding,
}) => {
  const [activeNav, setActiveNav] = useState<
    'overview' | 'listings' | 'sellers' | 'commissions' | 'branding'
  >('overview');

  // Multi-Slot Branding State
  const [navbarLogoInput, setNavbarLogoInput] = useState(
    branding.navbarLogoUrl || branding.lightLogoUrl || LOGO_PRESETS[0].url
  );
  const [footerLogoInput, setFooterLogoInput] = useState(
    branding.footerLogoUrl || branding.darkLogoUrl || LOGO_PRESETS[1].url
  );
  const [faviconInput, setFaviconInput] = useState(
    branding.faviconUrl || LOGO_PRESETS[2].url
  );
  const [brandTitleInput, setBrandTitleInput] = useState(branding.brandTitle || 'OYUN EKİPMAN');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Financial calculations
  const totalVolume = products.reduce((acc, p) => acc + p.price, 0);
  const totalCommission = products.reduce((acc, p) => {
    const rate = SELLER_TIERS[p.seller.tier]?.commissionRate || 0.10;
    return acc + Math.round(p.price * rate);
  }, 0);

  // File upload handler
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: 'navbar' | 'footer' | 'favicon'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (slot === 'navbar') {
        setNavbarLogoInput(dataUrl);
      } else if (slot === 'footer') {
        setFooterLogoInput(dataUrl);
      } else if (slot === 'favicon') {
        setFaviconInput(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBranding = () => {
    const updated: BrandingSettings = {
      ...branding,
      navbarLogoUrl: navbarLogoInput,
      footerLogoUrl: footerLogoInput,
      faviconUrl: faviconInput,
      lightLogoUrl: navbarLogoInput,
      darkLogoUrl: footerLogoInput,
      brandTitle: brandTitleInput,
    };
    onUpdateBranding(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header Card */}
      <div className="p-6 rounded-3xl border border-purple-200 dark:border-purple-900/60 bg-gradient-to-r from-purple-50 via-indigo-50/40 to-white dark:from-purple-950/40 dark:via-indigo-950/20 dark:to-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-600 text-white uppercase tracking-wider">
              Yönetici Paneli
            </span>
            <span className="text-xs text-slate-500 font-medium">oyunekipman.com Yönetim Kokpiti</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Hoş Geldiniz, Efe Özkan
          </h1>
          <p className="text-xs text-slate-500">
            Kurucu & Süper Yönetici Yetkileri Aktif
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Sistem Operasyonel (2026 Sürümü)</span>
          </span>
        </div>
      </div>

      {/* Main Two-Column Layout with Vertical Left Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-3 border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-2.5 space-y-1 shadow-xs text-xs font-bold">
          <div className="p-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Yönetim Masası
          </div>

          <button
            onClick={() => setActiveNav('overview')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-colors cursor-pointer ${
              activeNav === 'overview'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>Genel Bakış & Finans</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>

          <button
            onClick={() => setActiveNav('listings')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-colors cursor-pointer ${
              activeNav === 'listings'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4" />
              <span>İlan Denetim Kuyruğu</span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeNav === 'listings' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800'
              }`}
            >
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveNav('sellers')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-colors cursor-pointer ${
              activeNav === 'sellers'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-4 h-4" />
              <span>Satıcı Başvuruları</span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeNav === 'sellers' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800 font-black'
              }`}
            >
              {sellerApplications.filter((a) => a.status === 'PENDING').length} Yeni
            </span>
          </button>

          <button
            onClick={() => setActiveNav('commissions')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-colors cursor-pointer ${
              activeNav === 'commissions'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sliders className="w-4 h-4" />
              <span>Kademeli Komisyonlar</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>

          <button
            onClick={() => setActiveNav('branding')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-colors cursor-pointer ${
              activeNav === 'branding'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Palette className="w-4 h-4" />
              <span>Logo & Marka Yönetimi</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-semibold">
              Saf PNG
            </span>
          </button>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-9 border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs">
          {/* TAB 1: OVERVIEW */}
          {activeNav === 'overview' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Pazaryeri Genel Bakış & Finansal Göstergeler
                </h2>
                <p className="text-xs text-slate-500">
                  oyunekipman.com platformundaki aktif ilanlar, escrow havuzu ve gelir akışı.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                    <span>Toplam İlan Değeri</span>
                    <Package className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                    {totalVolume.toLocaleString('tr-TR')} ₺
                  </div>
                  <span className="text-[11px] text-slate-500">{products.length} adet ilan</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                    <span>Tahmini Komisyon Geliri</span>
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {totalCommission.toLocaleString('tr-TR')} ₺
                  </div>
                  <span className="text-[11px] text-slate-500">Kademeli %10-%5 havuz</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                    <span>Escrow Havuz Hesabı</span>
                    <Lock className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">
                    42.500 ₺
                  </div>
                  <span className="text-[11px] text-slate-500">48 saat test blokesi</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                    <span>Bekleyen Satıcı Başvurusu</span>
                    <UserCheck className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-black text-amber-600 font-mono">
                    {sellerApplications.filter((a) => a.status === 'PENDING').length}
                  </div>
                  <span className="text-[11px] text-slate-500">Değerlendirme bekliyor</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LISTINGS */}
          {activeNav === 'listings' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  İlan Denetim ve Moderasyon Kuyruğu
                </h2>
                <p className="text-xs text-slate-500">
                  Yayındaki tüm ilanların teknik donanım parametreleri listelenmektedir.
                </p>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden text-xs">
                {products.map((p) => {
                  const tier = SELLER_TIERS[p.seller.tier];
                  return (
                    <div
                      key={p.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-850"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100 dark:bg-slate-800 border shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                            {p.title}
                          </h4>
                          <div className="flex items-center gap-2 text-slate-500 text-[11px] mt-0.5">
                            <span>Satıcı: {p.seller.name}</span>
                            <span>·</span>
                            <span className={`px-1.5 py-0.2 rounded border font-semibold ${tier?.badgeColor}`}>
                              {tier?.label.split('/')[0]}
                            </span>
                            <span>·</span>
                            <span className="font-mono">{p.price.toLocaleString('tr-TR')} ₺</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold">
                          Yayında (Onaylı)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SELLER APPLICATIONS */}
          {activeNav === 'sellers' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Satıcı & Mağaza Başvuru Değerlendirme Masası
                </h2>
                <p className="text-xs text-slate-500">
                  "Mağaza Aç" sayfasından gönderilen başvurular incelenip onaylanır.
                </p>
              </div>

              {sellerApplications.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Henüz bekleyen satıcı başvurusu bulunmamaktadır.
                </div>
              ) : (
                <div className="space-y-4">
                  {sellerApplications.map((app) => (
                    <div
                      key={app.id}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 space-y-3 text-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                              {app.storeName} ({app.applicantName})
                            </h4>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                app.sellerType === 'VERIFIED_B2C'
                                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                                  : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                              }`}
                            >
                              {app.sellerType === 'VERIFIED_B2C' ? 'Kurumsal B2C' : 'Bireysel C2C'}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                app.status === 'APPROVED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : app.status === 'REJECTED'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {app.status === 'APPROVED' ? 'Onaylandı' : app.status === 'REJECTED' ? 'Reddedildi' : 'Bekliyor'}
                            </span>
                          </div>
                          <span className="text-slate-400 text-[11px] block mt-0.5">
                            @{app.username} · {app.city} · Başvuru: {app.createdAt}
                          </span>
                        </div>

                        {app.status === 'PENDING' && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onApproveSeller(app.id, app.sellerType === 'VERIFIED_B2C' ? 'CORPORATE' : 'SILVER')}
                              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Onayla & Seviye Belirle</span>
                            </button>
                            <button
                              onClick={() => onRejectSeller(app.id)}
                              className="px-3 py-1.5 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 text-xs font-semibold cursor-pointer"
                            >
                              Reddet
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-600 dark:text-slate-400">
                        <div>
                          <span className="text-slate-400 block text-[10px]">İletişim:</span>
                          <span>{app.email} / {app.phone}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Kimlik / Vergi No:</span>
                          <span className="font-mono">{app.taxNumber || app.idNumber || 'Belirtilmedi'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Hakediş IBAN:</span>
                          <span className="font-mono truncate block">{app.iban}</span>
                        </div>
                      </div>

                      {app.experienceBio && (
                        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                          <strong>Satış Portföyü:</strong> {app.experienceBio}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: COMMISSIONS */}
          {activeNav === 'commissions' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Satıcı Kademeleri ve Dinamik Komisyon Matrisi
                </h2>
                <p className="text-xs text-slate-500">
                  Bu oranlar tüm platform genelinde kesilen net aracılık ücretlerini belirler.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.values(SELLER_TIERS).map((t) => (
                  <div
                    key={t.tier}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 space-y-3 text-xs"
                  >
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${t.badgeColor}`}>
                      {t.label}
                    </span>
                    <div>
                      <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                        %{t.commissionRate * 100}
                      </div>
                      <span className="text-[11px] text-slate-400">İşlem Başı Kesinti</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                      {t.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BRANDING & 3-SLOT LOGO MANAGER (USER DIRECTIVE #8) */}
          {activeNav === 'branding' && (
            <div className="space-y-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    Logo & Marka Görseli Yönetimi (Saf PNG / JPEG)
                  </h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Otomatik Orantılı
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Logoların yanında metin yer almaz; doğrudan yüklediğiniz PNG görseli kullanılır ve bozulma olmadan alanına göre oran orantılı ölçeklenir.
                </p>
              </div>

              {savedSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Logolar başarıyla kaydedildi! Navbar, Footer ve Favicon anında güncellendi.</span>
                </div>
              )}

              {/* 3 Upload Slots: Navbar, Footer, Favicon */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                {/* Slot 1: Navbar Logo */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      1. Üst Menü Logosu (Navbar PNG)
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Üst menüde gösterilecek yatay veya rozet logo.
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'navbar')}
                      className="w-full text-[11px] text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                    />
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center min-h-[60px] border border-slate-100 dark:border-slate-800">
                    {navbarLogoInput ? (
                      <img
                        src={navbarLogoInput}
                        alt="Navbar Logo"
                        className="h-9 w-auto max-w-[200px] object-contain"
                      />
                    ) : (
                      <span className="text-slate-400">Yüklü Değil</span>
                    )}
                  </div>
                </div>

                {/* Slot 2: Footer Logo */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-white space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="font-bold text-white block">
                      2. Alt Menü Logosu (Footer PNG)
                    </span>
                    <p className="text-[11px] text-slate-400">
                      Koyu veya açık alt menüde gösterilecek logo.
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'footer')}
                      className="w-full text-[11px] text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-950 file:text-purple-300 hover:file:bg-purple-900 cursor-pointer"
                    />
                  </div>
                  <div className="p-3 bg-black rounded-xl flex items-center justify-center min-h-[60px] border border-slate-800">
                    {footerLogoInput ? (
                      <img
                        src={footerLogoInput}
                        alt="Footer Logo"
                        className="h-9 w-auto max-w-[200px] object-contain"
                      />
                    ) : (
                      <span className="text-slate-500">Yüklü Değil</span>
                    )}
                  </div>
                </div>

                {/* Slot 3: Favicon */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      3. Tarayıcı Favicon (PNG/ICO)
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Tarayıcı sekmesinde görünen kare rozet ikon.
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'favicon')}
                      className="w-full text-[11px] text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                    />
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center min-h-[60px] border border-slate-100 dark:border-slate-800">
                    {faviconInput ? (
                      <img
                        src={faviconInput}
                        alt="Favicon"
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <span className="text-slate-400">Yüklü Değil</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Ready Presets Palette */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="font-bold text-sm text-slate-900 dark:text-white block">
                  Hazır Logo Varlıklarından Tek Tıkla Seçin:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {LOGO_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setNavbarLogoInput(preset.url);
                        setFooterLogoInput(preset.url);
                      }}
                      className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 hover:border-indigo-500 text-left cursor-pointer transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold">
                        <span className="truncate">{preset.id}</span>
                        <span>{preset.bgType}</span>
                      </div>
                      <div className={`p-2 rounded-xl flex items-center justify-center ${preset.bgType === 'dark' ? 'bg-black' : 'bg-white border'}`}>
                        <img src={preset.url} alt={preset.name} className="h-7 w-auto object-contain" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Save & Apply */}
              <div className="pt-2">
                <button
                  onClick={handleSaveBranding}
                  className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Logoları Kaydet & Tüm Sitede Uygula</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
