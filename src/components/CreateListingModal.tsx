import React, { useState } from 'react';
import { Product, ProductType, MainCategory, ItemCondition, SellerProfile } from '../types';
import { CATEGORIES, SELLER_TIERS } from '../data/mockData';
import { X, Plus, AlertCircle, CheckCircle2, Calculator, Cpu, KeyRound, Image as ImageIcon } from 'lucide-react';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
  currentSeller: SellerProfile;
}

export const CreateListingModal: React.FC<CreateListingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentSeller,
}) => {
  if (!isOpen) return null;

  const [productType, setProductType] = useState<ProductType>('PHYSICAL');
  const [category, setCategory] = useState<MainCategory>('keyboards');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(2500);
  const [condition, setCondition] = useState<ItemCondition>('USED_VERY_GOOD');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState<number>(1);

  // Dynamic Specs
  const [switchType, setSwitchType] = useState('Cherry MX Red');
  const [isHotSwap, setIsHotSwap] = useState(true);
  const [sensorModel, setSensorModel] = useState('PixArt PAW3395');
  const [maxDpi, setMaxDpi] = useState(26000);
  const [pollingRate, setPollingRate] = useState('1000Hz');
  const [panelType, setPanelType] = useState<'IPS' | 'Fast-IPS' | 'VA' | 'OLED' | 'TN'>('Fast-IPS');
  const [refreshRateHz, setRefreshRateHz] = useState(240);
  const [deadPixelStatus, setDeadPixelStatus] = useState('0 Ölü Piksel (Kontrol Edildi)');
  const [miningHistory, setMiningHistory] = useState<'Hayır (Yalnızca Oyun)' | 'Evet (Kısa Süreli)' | 'Bilinmiyor'>('Hayır (Yalnızca Oyun)');
  const [furmarkTemp, setFurmarkTemp] = useState('65°C Max');
  const [platform, setPlatform] = useState<'Steam' | 'Riot Games' | 'Epic Games'>('Steam');
  const [deliveryType, setDeliveryType] = useState<'Anında Otomatik Kod' | '15 Dakika Manuel Teslimat'>('Anında Otomatik Kod');

  // Commission Math based on Seller Tier
  const tierInfo = SELLER_TIERS[currentSeller.tier] || SELLER_TIERS.BRONZE;
  const platformFee = Math.round(price * tierInfo.commissionRate);
  const netEarnings = price - platformFee;

  const filteredCategories = CATEGORIES.filter((c) => c.type === productType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || price <= 0) return;

    const defaultImg =
      productType === 'PHYSICAL'
        ? category === 'keyboards'
          ? 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80'
          : category === 'mice'
          ? 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';

    const newProduct: Product = {
      id: `usr-${Date.now()}`,
      title,
      type: productType,
      category,
      price,
      condition,
      seller: currentSeller,
      imageUrl: imageUrl.trim() || defaultImg,
      description: description.trim() || 'Kullanıcı tarafından teknik standartlara uygun olarak listelenmiştir.',
      stock: Number(stock) || 1,
      createdAt: new Date().toISOString().split('T')[0],
      views: 1,
      specs: {
        switchType: category === 'keyboards' ? switchType : undefined,
        isHotSwap: category === 'keyboards' ? isHotSwap : undefined,
        sensorModel: category === 'mice' ? sensorModel : undefined,
        maxDpi: category === 'mice' ? maxDpi : undefined,
        pollingRate: category === 'mice' ? pollingRate : undefined,
        panelType: category === 'monitors' ? panelType : undefined,
        refreshRateHz: category === 'monitors' ? refreshRateHz : undefined,
        deadPixelStatus: category === 'monitors' ? deadPixelStatus : undefined,
        miningHistory: category === 'pc_parts' ? miningHistory : undefined,
        furmarkMaxTemp: category === 'pc_parts' ? furmarkTemp : undefined,
        platform: productType === 'DIGITAL' ? platform : undefined,
        deliveryType: productType === 'DIGITAL' ? deliveryType : undefined,
      },
    };

    onSubmit(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Yeni İlan Oluştur
            </h2>
            <p className="text-xs text-slate-500">
              Kategoriye özel teknik standartlar ve seviyenize göre hesaplanan komisyon ile anında yayınlayın.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Step 1: Product Type Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Ürün Türü
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setProductType('PHYSICAL');
                  setCategory('keyboards');
                }}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                  productType === 'PHYSICAL'
                    ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>Fiziki Donanım</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProductType('DIGITAL');
                  setCategory('epins');
                }}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                  productType === 'DIGITAL'
                    ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Dijital (E-Pin & Kod)</span>
              </button>
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MainCategory)}
                className="w-full text-xs sm:text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {filteredCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Kondisyon / Durum
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ItemCondition)}
                className="w-full text-xs sm:text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="NEW_SEALED">Sıfır (Kapalı Kutu)</option>
                <option value="NEW_OPEN_BOX">Sıfır (Açık Kutu)</option>
                <option value="USED_MINT">2. El Kusursuz (Çiziksiz)</option>
                <option value="USED_VERY_GOOD">2. El Çok İyi (Hafif İz)</option>
                <option value="USED_GOOD">2. El İyi (Kullanım İzi Var)</option>
                <option value="FOR_PARTS">Parça Amaçlı / Onarım</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              İlan Başlığı
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Razer DeathAdder V3 Pro Kablosuz Mouse (Kutulu)"
              className="w-full text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Dynamic Technical Specs according to Category */}
          <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              <Cpu className="w-4 h-4" />
              <span>{category.toUpperCase()} İçin Zorunlu Teknik Parametreler</span>
            </div>

            {category === 'keyboards' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-600 dark:text-slate-400 block mb-1">Switch Türü & Markası</label>
                  <input
                    type="text"
                    value={switchType}
                    onChange={(e) => setSwitchType(e.target.value)}
                    placeholder="Örn: Gateron Yellow Pro / Lekker Analog"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="hotswap"
                    checked={isHotSwap}
                    onChange={(e) => setIsHotSwap(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <label htmlFor="hotswap" className="text-slate-700 dark:text-slate-300 font-medium">
                    Hot-Swap PCB (Lehimsiz switch değişimi)
                  </label>
                </div>
              </div>
            )}

            {category === 'mice' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-slate-600 dark:text-slate-400 block mb-1">Sensör Modeli</label>
                  <input
                    type="text"
                    value={sensorModel}
                    onChange={(e) => setSensorModel(e.target.value)}
                    placeholder="PixArt PAW3395 / HERO"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-600 dark:text-slate-400 block mb-1">Maks DPI</label>
                  <input
                    type="number"
                    value={maxDpi}
                    onChange={(e) => setMaxDpi(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-600 dark:text-slate-400 block mb-1">Polling Rate</label>
                  <select
                    value={pollingRate}
                    onChange={(e) => setPollingRate(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="1000Hz">1000 Hz</option>
                    <option value="4000Hz">4000 Hz</option>
                    <option value="8000Hz">8000 Hz</option>
                  </select>
                </div>
              </div>
            )}

            {category === 'monitors' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-slate-600 dark:text-slate-400 block mb-1">Panel Tipi</label>
                  <select
                    value={panelType}
                    onChange={(e) => setPanelType(e.target.value as any)}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="Fast-IPS">Fast-IPS</option>
                    <option value="OLED">OLED / QD-OLED</option>
                    <option value="VA">VA Panel</option>
                    <option value="TN">TN Espor Panel</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-600 dark:text-slate-400 block mb-1">Yenileme Hızı (Hz)</label>
                  <input
                    type="number"
                    value={refreshRateHz}
                    onChange={(e) => setRefreshRateHz(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-600 dark:text-slate-400 block mb-1">Ölü Piksel Beyanı</label>
                  <input
                    type="text"
                    value={deadPixelStatus}
                    onChange={(e) => setDeadPixelStatus(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {category === 'pc_parts' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-600 dark:text-slate-400 block mb-1">Madencilik (Mining) Geçmişi</label>
                  <select
                    value={miningHistory}
                    onChange={(e) => setMiningHistory(e.target.value as any)}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="Hayır (Yalnızca Oyun)">Hayır (Yalnızca Oyun)</option>
                    <option value="Evet (Kısa Süreli)">Evet (Kısa Süreli)</option>
                    <option value="Bilinmiyor">Bilinmiyor</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-600 dark:text-slate-400 block mb-1">FurMark Stres Testi Sıcaklığı</label>
                  <input
                    type="text"
                    value={furmarkTemp}
                    onChange={(e) => setFurmarkTemp(e.target.value)}
                    placeholder="Örn: 15 dk 66°C Max"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {productType === 'DIGITAL' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-600 dark:text-slate-400 block mb-1">Platform</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as any)}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="Steam">Steam</option>
                    <option value="Riot Games">Riot Games</option>
                    <option value="Epic Games">Epic Games</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-600 dark:text-slate-400 block mb-1">Teslimat Şekli</label>
                  <select
                    value={deliveryType}
                    onChange={(e) => setDeliveryType(e.target.value as any)}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="Anında Otomatik Kod">Anında Otomatik Kod</option>
                    <option value="15 Dakika Manuel Teslimat">15 Dakika Manuel Teslimat</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Pricing & Dynamic Commission Simulator */}
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Satış Fiyatı (TL)
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={price}
                  onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full text-base font-bold font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Stok Miktarı
                </label>
                <input
                  type="number"
                  min="1"
                  value={stock}
                  onChange={(e) => setStock(Math.max(1, Number(e.target.value)))}
                  className="w-full text-base font-bold font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Live Commission Calculation Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <Calculator className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Satıcı Seviyeniz: <strong>{tierInfo.label}</strong></span>
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                  %{tierInfo.commissionRate * 100} Komisyon
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                <div>
                  <span>Platform Kesintisi:</span>
                  <div className="font-bold text-slate-900 dark:text-white font-mono text-sm">
                    {platformFee.toLocaleString('tr-TR')} ₺
                  </div>
                </div>
                <div>
                  <span>Elinize Geçecek Net Tutar:</span>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                    {netEarnings.toLocaleString('tr-TR')} ₺
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500">
                💡 <em>{tierInfo.description}</em>
              </div>
            </div>
          </div>

          {/* Image & Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Görsel Bağlantısı (Opsiyonel - Boş bırakılırsa standart ürün görseli atanır)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Açıklama & Notlar
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ürünün kullanım geçmişi, kutu içeriği ve garanti durumu..."
              className="w-full text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Buttons */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>İlanı Canlıya Al</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
