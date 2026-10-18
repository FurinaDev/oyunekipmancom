import React, { useState } from 'react';
import {
  Product,
  ProductType,
  MainCategory,
  ItemCondition,
  SellerProfile,
  ProductSpecs
} from '../types';
import { CATEGORIES, SELLER_TIERS } from '../data/mockData';
import {
  PlusCircle,
  AlertCircle,
  CheckCircle2,
  Calculator,
  Upload,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Cpu,
  Layers,
  Store,
  Eye,
  FileCheck,
  Check
} from 'lucide-react';

interface CreateListingPageProps {
  currentSeller: SellerProfile | null;
  onSubmit: (newProduct: Product) => void;
  onNavigateHome: () => void;
  onNavigateBecomeSeller: () => void;
}

const SAMPLE_GEAR_IMAGES: Record<string, string[]> = {
  keyboards: [
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
  ],
  mice: [
    'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
  ],
  monitors: [
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&w=800&q=80',
  ],
  pc_parts: [
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
  ],
  audio: [
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
  ],
  consoles: [
    'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
  ],
  games_keys: [
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
  ],
  epins: [
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
  ],
  skins_cosmetics: [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
  ],
};

export const CreateListingPage: React.FC<CreateListingPageProps> = ({
  currentSeller,
  onSubmit,
  onNavigateHome,
  onNavigateBecomeSeller,
}) => {
  // Check if seller is approved
  const isApproved = currentSeller && (currentSeller.isApprovedSeller !== false);

  const [step, setStep] = useState<number>(1);

  // Form State
  const [productType, setProductType] = useState<ProductType>('PHYSICAL');
  const [category, setCategory] = useState<MainCategory>('keyboards');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(3250);
  const [originalPrice, setOriginalPrice] = useState<number>(4500);
  const [condition, setCondition] = useState<ItemCondition>('USED_MINT');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
  );
  const [stock, setStock] = useState<number>(1);

  // Specs State
  const [switchType, setSwitchType] = useState('Gateron Magnetic Jade (Analog)');
  const [isHotSwap, setIsHotSwap] = useState(true);
  const [sensorModel, setSensorModel] = useState('Focus Pro 30K Optical');
  const [maxDpi, setMaxDpi] = useState<number>(30000);
  const [pollingRate, setPollingRate] = useState('4000Hz (0.25ms)');
  const [panelType, setPanelType] = useState<'IPS' | 'Fast-IPS' | 'VA' | 'OLED' | 'QD-OLED' | 'TN'>('Fast-IPS');
  const [refreshRateHz, setRefreshRateHz] = useState<number>(240);
  const [deadPixelStatus, setDeadPixelStatus] = useState('Sıfır Ölü Piksel (Kontrol Edildi)');
  const [vramGb, setVramGb] = useState<number>(16);
  const [furmarkMaxTemp, setFurmarkMaxTemp] = useState('64°C (15 dk Test)');
  const [miningHistory, setMiningHistory] = useState<'Hayır (Yalnızca Oyun)' | 'Evet (Kısa Süreli)' | 'Bilinmiyor'>('Hayır (Yalnızca Oyun)');
  const [platform, setPlatform] = useState<'Steam' | 'Riot Games' | 'Epic Games' | 'PlayStation Network' | 'Xbox Live' | 'Diğer'>('Steam');
  const [region, setRegion] = useState<'Türkiye / Global' | 'TR Yalnızca' | 'EU Yalnızca'>('Türkiye / Global');
  const [deliveryType, setDeliveryType] = useState<'Anında Otomatik Kod' | '15 Dakika Manuel Teslimat'>('Anında Otomatik Kod');

  // Seller tier & commission calculation
  const sellerTierKey = currentSeller?.tier || 'BRONZE';
  const tierInfo = SELLER_TIERS[sellerTierKey] || SELLER_TIERS.BRONZE;
  const platformFee = Math.round(price * tierInfo.commissionRate);
  const netEarnings = price - platformFee;

  // Handle Category Change
  const handleCategorySelect = (catId: MainCategory) => {
    setCategory(catId);
    const catDef = CATEGORIES.find((c) => c.id === catId);
    if (catDef) {
      setProductType(catDef.type);
    }
    const samples = SAMPLE_GEAR_IMAGES[catId];
    if (samples && samples.length > 0) {
      setImageUrl(samples[0]);
    }
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSeller) return;

    const specs: ProductSpecs = {};
    if (category === 'keyboards') {
      specs.switchType = switchType;
      specs.isHotSwap = isHotSwap;
    } else if (category === 'mice') {
      specs.sensorModel = sensorModel;
      specs.maxDpi = maxDpi;
      specs.pollingRate = pollingRate;
    } else if (category === 'monitors') {
      specs.panelType = panelType;
      specs.refreshRateHz = refreshRateHz;
      specs.deadPixelStatus = deadPixelStatus;
    } else if (category === 'pc_parts') {
      specs.vramGb = vramGb;
      specs.furmarkMaxTemp = furmarkMaxTemp;
      specs.miningHistory = miningHistory;
    } else if (productType === 'DIGITAL') {
      specs.platform = platform;
      specs.region = region;
      specs.deliveryType = deliveryType;
    }

    const newProduct: Product = {
      id: `p_${Date.now()}`,
      title,
      type: productType,
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      condition,
      seller: currentSeller,
      imageUrl,
      description,
      specs,
      stock: Number(stock),
      createdAt: 'Bugün',
      views: 1,
    };

    onSubmit(newProduct);
  };

  // If not logged in or not an approved seller, show gate
  if (!currentSeller || !isApproved) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 mx-auto flex items-center justify-center">
          <Store className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            İlan Vermek İçin Onaylı Satıcı Olmalısınız
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-lg mx-auto">
            oyunekipman.com'da güvenli alışveriş standartları gereği herkes doğrudan ilan açamaz. Dolandırıcılıkları önlemek için önce bireysel (C2C) veya kurumsal (B2C) satıcı başvurusu yapmalı ve yönetimden onay almalısınız.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onNavigateBecomeSeller}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            Hemen Satıcı Başvurusu Yap
          </button>
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-850"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Wizard Header & Steps Progress */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 uppercase">
                Adım {step} / 5
              </span>
              <span className="text-xs text-slate-500">Satıcı: {currentSeller.name} ({tierInfo.label.split('/')[0]})</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {step === 1 && '1. Kategori ve Ürün Türünü Belirleyin'}
              {step === 2 && '2. Kategoriye Özel Zorunlu Donanım Parametreleri'}
              {step === 3 && '3. İlan Başlığı, Açıklama ve Görseller'}
              {step === 4 && '4. Fiyat ve Canlı Komisyon Hesaplama'}
              {step === 5 && '5. İlan Önizlemesi ve Yayına Alma'}
            </h1>
          </div>

          <button
            onClick={onNavigateHome}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 self-start sm:self-auto"
          >
            Vazgeç ve İptal Et
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s <= step ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Wizard Form Container */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs">
        {/* STEP 1: Category Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Hangi Kategoride İlan Vereceksiniz?
              </h3>
              <p className="text-xs text-slate-500">
                Doğru kategori seçimi, alıcıların donanım filtrelerinde ilanınızı bulmasını sağlar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-500'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {cat.name}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {cat.type === 'PHYSICAL' ? 'Fiziki' : 'Dijital'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {cat.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Category Specific Technical Parameters */}
        {step === 2 && (
          <div className="space-y-6 text-xs">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-600" />
                <span>Teknik Özellik ve Doğrulama Parametreleri</span>
              </h3>
              <p className="text-slate-500">
                Alıcının 48 saatlik donanım testinde kontrol edeceği parametreleri eksiksiz doldurun.
              </p>
            </div>

            {/* Keyboard Specific */}
            {category === 'keyboards' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Mekanik / Manyetik Switch Modeli
                  </label>
                  <input
                    type="text"
                    value={switchType}
                    onChange={(e) => setSwitchType(e.target.value)}
                    placeholder="Örn: Cherry MX Red, Lekker L60, Wooting Hall-Effect"
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Hot-Swap PCB Durumu
                  </label>
                  <select
                    value={isHotSwap ? 'yes' : 'no'}
                    onChange={(e) => setIsHotSwap(e.target.value === 'yes')}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="yes">Evet - Hot-Swap (Lehimsiz switch değişimi)</option>
                    <option value="no">Hayır - Sabit lehimli PCB</option>
                  </select>
                </div>
              </div>
            )}

            {/* Mouse Specific */}
            {category === 'mice' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Optik Sensör Modeli
                  </label>
                  <input
                    type="text"
                    value={sensorModel}
                    onChange={(e) => setSensorModel(e.target.value)}
                    placeholder="Örn: HERO 2, Focus Pro 30K, PAW3395"
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Maksimum DPI
                  </label>
                  <input
                    type="number"
                    value={maxDpi}
                    onChange={(e) => setMaxDpi(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Polling Rate
                  </label>
                  <input
                    type="text"
                    value={pollingRate}
                    onChange={(e) => setPollingRate(e.target.value)}
                    placeholder="1000Hz, 4000Hz, 8000Hz"
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Monitor Specific */}
            {category === 'monitors' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Panel Tipi
                  </label>
                  <select
                    value={panelType}
                    onChange={(e) => setPanelType(e.target.value as any)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Fast-IPS">Fast-IPS (1ms GtG)</option>
                    <option value="OLED">OLED / QD-OLED (0.03ms)</option>
                    <option value="TN">Espor Fast-TN (ZOWIE)</option>
                    <option value="VA">VA Panel</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Yenileme Hızı (Hz)
                  </label>
                  <input
                    type="number"
                    value={refreshRateHz}
                    onChange={(e) => setRefreshRateHz(Number(e.target.value))}
                    placeholder="144, 240, 360, 540"
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Ölü Piksel Beyanı
                  </label>
                  <input
                    type="text"
                    value={deadPixelStatus}
                    onChange={(e) => setDeadPixelStatus(e.target.value)}
                    placeholder="Sıfır Ölü Piksel / 1 Adet Sağ Köşe"
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* PC Parts Specific */}
            {category === 'pc_parts' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    VRAM Kapasitesi (GB)
                  </label>
                  <input
                    type="number"
                    value={vramGb}
                    onChange={(e) => setVramGb(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    FurMark Max Sıcaklık
                  </label>
                  <input
                    type="text"
                    value={furmarkMaxTemp}
                    onChange={(e) => setFurmarkMaxTemp(e.target.value)}
                    placeholder="Örn: 68°C"
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Madencilik (Mining) Geçmişi
                  </label>
                  <select
                    value={miningHistory}
                    onChange={(e) => setMiningHistory(e.target.value as any)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Hayır (Yalnızca Oyun)">Hayır (Yalnızca Oyun Oynandı)</option>
                    <option value="Evet (Kısa Süreli)">Evet (Kısa Süreli Test Edildi)</option>
                    <option value="Bilinmiyor">Bilinmiyor</option>
                  </select>
                </div>
              </div>
            )}

            {/* Digital Specific */}
            {productType === 'DIGITAL' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Aktivasyon Platformu
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as any)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Steam">Steam</option>
                    <option value="Riot Games">Riot Games</option>
                    <option value="Epic Games">Epic Games</option>
                    <option value="PlayStation Network">PlayStation Network</option>
                    <option value="Xbox Live">Xbox Live</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Bölge Uyumluluğu
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value as any)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Türkiye / Global">Türkiye / Global (Tüm Hesaplar)</option>
                    <option value="TR Yalnızca">TR Yalnızca</option>
                    <option value="EU Yalnızca">EU Yalnızca</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Kod Teslimat Türü
                  </label>
                  <select
                    value={deliveryType}
                    onChange={(e) => setDeliveryType(e.target.value as any)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Anında Otomatik Kod">Anında Otomatik Kod (10 sn)</option>
                    <option value="15 Dakika Manuel Teslimat">15 Dakika Manuel Teslimat</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Title, Description, Condition & Media */}
        {step === 3 && (
          <div className="space-y-6 text-xs">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                İlan Başlığı, Görseller ve Satıcı Beyanı
              </h3>
              <p className="text-slate-500">
                Alıcıların güvenini artırmak için net, dürüst ve ayrıntılı bir açıklama yazın.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  İlan Başlığı *
                </label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Örn: Wooting 60HE+ Analog Espor Klavyesi (Faturalı - Kusursuz)"
                  className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Kozmetik / Kullanım Durumu *
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as any)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="NEW_SEALED">Sıfır (Kapalı Kutu - Jelatinli)</option>
                    <option value="NEW_OPEN_BOX">Sıfır (Açık Kutu - Kullanılmamış)</option>
                    <option value="USED_MINT">2. El Kusursuz (Sıfır Ayarında)</option>
                    <option value="USED_VERY_GOOD">2. El Çok İyi (Kılcal Kullanım İzi)</option>
                    <option value="USED_GOOD">2. El İyi (Normal Kozmetik Durum)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Stok Adedi
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Ürün Görseli (URL veya Hazır Seçim) *
                </label>
                <div className="flex gap-2">
                  <input
                    required
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  {SAMPLE_GEAR_IMAGES[category] && (
                    <button
                      type="button"
                      onClick={() => setImageUrl(SAMPLE_GEAR_IMAGES[category][0])}
                      className="px-3 py-2 rounded-xl border text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40"
                    >
                      Hazır Örnek Kullan
                    </button>
                  )}
                </div>
                {imageUrl && (
                  <div className="mt-2 w-32 h-24 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                    <img src={imageUrl} alt="Önizleme" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Detaylı Satıcı Açıklaması *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Kutu içeriği, fatura tarihi, kaç ay kullanıldığı, tuş/switch hissiyatı ve kargo hazırlığı hakkında bilgi veriniz..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Pricing & Live Commission Simulator */}
        {step === 4 && (
          <div className="space-y-6 text-xs">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-indigo-600" />
                <span>Fiyatlandırma & Şeffaf Komisyon Simülasyonu</span>
              </h3>
              <p className="text-slate-500">
                Seviyenize özel komisyon kesintisi ve elinize geçecek net tutar aşağıda canlı hesaplanmaktadır.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Satış Fiyatı (₺) *
                </label>
                <input
                  required
                  type="number"
                  min={50}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xl font-black font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Piyasa / Orijinal Sıfır Fiyatı (₺) (Opsiyonel İndirim Etiketi)
                </label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xl font-bold font-mono"
                />
              </div>
            </div>

            {/* Live Commission Calculation Box */}
            <div className="p-6 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-white dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-slate-900 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-indigo-100 dark:border-indigo-900/40">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${tierInfo.badgeColor}`}>
                    {tierInfo.label}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">Komisyon Oranınız:</span>
                </div>
                <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 font-mono">
                  %{tierInfo.commissionRate * 100}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Alıcının Ödeyeceği Tutar:</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">{price.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between text-red-500 dark:text-red-400">
                  <span>oyunekipman.com Hizmet & Escrow Kesintisi (%{tierInfo.commissionRate * 100}):</span>
                  <span className="font-bold font-mono">-{platformFee.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/40 flex justify-between text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400">
                  <span>Hesabınıza Yatacak Net Tutar:</span>
                  <span className="font-mono text-xl">{netEarnings.toLocaleString('tr-TR')} ₺</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Final Preview & Submit */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-600" />
                <span>İlanınız Alıcılara Böyle Görünecek</span>
              </h3>
              <p className="text-xs text-slate-500">
                Her şey doğruysa "İlanı Yayına Al" butonuna tıklayarak ürününüzü vitrine çıkarın.
              </p>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-slate-50/50 dark:bg-slate-850 flex flex-col sm:flex-row gap-6">
              <img
                src={imageUrl}
                alt={title}
                className="w-full sm:w-48 h-48 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
              />

              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-600 text-white uppercase">
                    {category}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                    {condition}
                  </span>
                </div>

                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  {title || 'Başlıksız İlan'}
                </h4>

                <p className="text-xs text-slate-500 line-clamp-2">
                  {description || 'Satıcı açıklaması...'}
                </p>

                <div className="pt-2 flex items-baseline gap-3">
                  <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                    {price.toLocaleString('tr-TR')} ₺
                  </span>
                  {originalPrice > price && (
                    <span className="text-xs text-slate-400 line-through font-mono">
                      {originalPrice.toLocaleString('tr-TR')} ₺
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> 48 Saatlik Donanım Testi Koruması Aktif
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Navigation Controls */}
        <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4" /> Geri
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 3 && !title.trim()) {
                  alert('Lütfen bir ilan başlığı giriniz.');
                  return;
                }
                setStep(step + 1);
              }}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              Devam Et <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-colors"
            >
              <Check className="w-4 h-4" /> İlanı Onayla ve Yayına Al
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
