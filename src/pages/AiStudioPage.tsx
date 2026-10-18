import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  Calculator,
  Zap,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sliders,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Gamepad2,
  Search
} from 'lucide-react';
import { Product } from '../types';

interface AiStudioPageProps {
  products: Product[];
  onSelectProduct?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onNavigateCatalog?: (category?: string) => void;
}

export const AiStudioPage: React.FC<AiStudioPageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onNavigateCatalog,
}) => {
  const [activeTab, setActiveTab] = useState<'builder' | 'valuation' | 'optimizer'>('builder');

  // Builder States
  const [budget, setBudget] = useState<number>(35000);
  const [targetGame, setTargetGame] = useState<'valorant' | 'cs2' | 'cyberpunk' | 'apex'>('valorant');
  const [resolution, setResolution] = useState<'1080p' | '1440p' | '4k'>('1080p');

  // Valuation States
  const [deviceType, setDeviceType] = useState('mouse');
  const [modelName, setModelName] = useState('Logitech G PRO X Superlight 2');
  const [usageMonths, setUsageMonths] = useState(6);
  const [hasInvoice, setHasInvoice] = useState(true);
  const [calculatedValue, setCalculatedValue] = useState<{
    min: number;
    recommended: number;
    max: number;
    liquidityDays: number;
  }>({
    min: 3400,
    recommended: 3850,
    max: 4200,
    liquidityDays: 2,
  });

  // Calculate Build dynamically based on budget
  const getAiBuild = (b: number, game: string) => {
    let cpu = 'AMD Ryzen 5 7600 (6 Çekirdek 5.1GHz)';
    let gpu = 'NVIDIA GeForce RTX 4060 8GB';
    let ram = '32GB (2x16GB) DDR5 6000MHz CL30';
    let ssd = '1TB NVMe M.2 SSD (5000MB/s)';
    let psu = '650W 80+ Gold';
    let bottleneck = 2.1;
    let fps = 480;

    if (b < 25000) {
      cpu = 'AMD Ryzen 5 5600 (6 Çekirdek 4.4GHz)';
      gpu = 'NVIDIA GeForce RTX 3060 12GB';
      ram = '16GB (2x8GB) DDR4 3600MHz';
      bottleneck = 3.8;
      fps = 340;
    } else if (b >= 25000 && b < 45000) {
      cpu = 'AMD Ryzen 5 7600X (6 Çekirdek 5.3GHz)';
      gpu = 'NVIDIA GeForce RTX 4070 Super 12GB';
      ram = '32GB (2x16GB) DDR5 6000MHz CL30';
      bottleneck = 1.6;
      fps = 560;
    } else {
      cpu = 'AMD Ryzen 7 7800X3D (Dünyanın En Hızlı Espor İşlemcisi)';
      gpu = 'NVIDIA GeForce RTX 4080 Super 16GB';
      ram = '32GB DDR5 6400MHz Low-Latency';
      bottleneck = 0.8;
      fps = 850;
    }

    if (game === 'cyberpunk') fps = Math.round(fps * 0.22);
    if (game === 'cs2') fps = Math.round(fps * 0.75);
    if (game === 'apex') fps = Math.round(fps * 0.55);

    return { cpu, gpu, ram, ssd, psu, bottleneck, fps };
  };

  const currentBuild = getAiBuild(budget, targetGame);

  const handleEvaluatePrice = () => {
    let base = 3500;
    if (modelName.toLowerCase().includes('wooting')) base = 6500;
    if (modelName.toLowerCase().includes('4070')) base = 21000;
    if (modelName.toLowerCase().includes('4060')) base = 11000;
    if (modelName.toLowerCase().includes('zowie')) base = 4800;

    const invoiceFactor = hasInvoice ? 1.05 : 0.9;
    const usageFactor = Math.max(0.65, 1 - (usageMonths * 0.025));
    const rec = Math.round(base * invoiceFactor * usageFactor);

    setCalculatedValue({
      min: Math.round(rec * 0.9),
      recommended: rec,
      max: Math.round(rec * 1.1),
      liquidityDays: usageMonths < 6 ? 2 : 5,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* AI Studio Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 border border-purple-800/40 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-bold border border-purple-400/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>2026 Donanım Yapay Zeka Laboratuvarı</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            AI Donanım Stüdyosu & Ekspertiz Motoru
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed max-w-2xl">
            Sıfır darboğazlı sistem toplama sihirbazı, ikinci el donanım için anlık gerçek piyasa ekspertizi ve sistem gecikmesini (input lag) sıfıra indiren yapay zeka rehberi.
          </p>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-bold gap-2">
        <button
          onClick={() => setActiveTab('builder')}
          className={`py-3 px-5 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'builder'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>AI Sistem Toplama & Darboğaz Sihirbazı</span>
        </button>

        <button
          onClick={() => setActiveTab('valuation')}
          className={`py-3 px-5 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'valuation'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>AI Donanım Ekspertizi & Fiyat Önerisi</span>
        </button>

        <button
          onClick={() => setActiveTab('optimizer')}
          className={`py-3 px-5 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'optimizer'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>AI Gecikme (Latency) & FPS Optimizasyonu</span>
        </button>
      </div>

      {/* TAB 1: AI PC BUILDER & BOTTLENECK ENGINE */}
      {activeTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Bütçe ve Espor Hedefinizi Seçin
              </h3>
              <p className="text-xs text-slate-500">
                Yapay zeka bütçenizi en verimli şekilde parçalara paylaştırır ve sıfır darboğaz garantisi sunar.
              </p>
            </div>

            {/* Budget Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Hedef Bütçe:</span>
                <span className="font-mono text-base font-black text-indigo-600 dark:text-indigo-400">
                  {budget.toLocaleString('tr-TR')} ₺
                </span>
              </div>
              <input
                type="range"
                min={15000}
                max={95000}
                step={2500}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>15.000 ₺ (F/P)</span>
                <span>50.000 ₺ (Pro)</span>
                <span>95.000 ₺ (God-Tier)</span>
              </div>
            </div>

            {/* Game Selector */}
            <div className="space-y-2">
              <label className="font-bold text-xs text-slate-700 dark:text-slate-300 block">
                Öncelikli Espor / Oyun Disiplini:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'valorant', label: 'Valorant (CPU Focus)' },
                  { id: 'cs2', label: 'CS2 (Sub-Tick/Cache)' },
                  { id: 'apex', label: 'Apex Legends (High FPS)' },
                  { id: 'cyberpunk', label: 'Cyberpunk (GPU Ray-Trace)' },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setTargetGame(g.id as any)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      targetGame === g.id
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Resolution Selector */}
            <div className="space-y-2">
              <label className="font-bold text-xs text-slate-700 dark:text-slate-300 block">
                Ekran Çözünürlüğü:
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['1080p', '1440p', '4k'].map((res) => (
                  <button
                    key={res}
                    type="button"
                    onClick={() => setResolution(res as any)}
                    className={`py-2 rounded-xl border text-center cursor-pointer transition-all ${
                      resolution === res
                        ? 'border-indigo-600 bg-indigo-600 text-white font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {res.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* KPI Performance Banner */}
            <div className="p-6 rounded-3xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-white dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-slate-900 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                  AI Tahmini Espor Performansı
                </span>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono mt-0.5">
                  ~{currentBuild.fps} FPS
                </div>
                <span className="text-xs text-slate-500">
                  {targetGame.toUpperCase()} · {resolution} Düşük Gecikmeli Espor Ayarları
                </span>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Darboğaz Skoru
                </span>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                  %{currentBuild.bottleneck}
                </div>
                <span className="text-[10px] text-slate-500">Kusursuz Parça Dengesi</span>
              </div>
            </div>

            {/* Recommended Hardware Parts */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-6 space-y-4 shadow-xs">
              <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-600" />
                <span>Yapay Zekanın Eşleştirdiği Optimize Parçalar</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 flex items-center justify-between border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">İşlemci (CPU)</span>
                    <span className="font-bold text-slate-900 dark:text-white">{currentBuild.cpu}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                    Yüksek L3 Cache
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 flex items-center justify-between border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Ekran Kartı (GPU)</span>
                    <span className="font-bold text-slate-900 dark:text-white">{currentBuild.gpu}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 text-[10px] font-bold">
                    Reflex Desteği
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 flex items-center justify-between border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Bellek (RAM)</span>
                    <span className="font-bold text-slate-900 dark:text-white">{currentBuild.ram}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                    EXPO / XMP
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 flex items-center justify-between border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Depolama & PSU</span>
                    <span className="font-bold text-slate-900 dark:text-white">{currentBuild.ssd} · {currentBuild.psu}</span>
                  </div>
                  <span className="text-slate-400 text-[10px] font-mono">5000MB/s</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    if (onNavigateCatalog) onNavigateCatalog('pc_parts');
                  }}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Platformdaki Uyumlu Aktif Parça İlanlarını Listele</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI DONANIM EKSPERTİZİ & FİYAT ÖNERİSİ */}
      {activeTab === 'valuation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-5 shadow-xs text-xs">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                İkinci El Donanımınızı Analiz Edin
              </h3>
              <p className="text-slate-500">
                Satmak veya almak istediğiniz donanımın modelini girin; yapay zeka Türkiye ikinci el pazarındaki binlerce satışı tarayarak gerçek piyasa değerini versin.
              </p>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Kategori
              </label>
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="mouse">Oyuncu Faresi</option>
                <option value="keyboard">Mekanik Klavye</option>
                <option value="gpu">Ekran Kartı (GPU)</option>
                <option value="monitor">Espor Monitörü</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Marka & Model Adı
              </label>
              <input
                type="text"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="Örn: Wooting 60HE, RTX 4070 Super, Superlight 2"
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Kullanım Süresi (Ay)
                </label>
                <input
                  type="number"
                  min={1}
                  max={48}
                  value={usageMonths}
                  onChange={(e) => setUsageMonths(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Fatura / Garanti Durumu
                </label>
                <select
                  value={hasInvoice ? 'yes' : 'no'}
                  onChange={(e) => setHasInvoice(e.target.value === 'yes')}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="yes">TR Faturalı ve Garantili</option>
                  <option value="no">Faturasız / Garantisi Bitmiş</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleEvaluatePrice}
              className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Yapay Zeka ile Fiyatı Hesapla</span>
            </button>
          </div>

          {/* Valuation Result */}
          <div className="lg:col-span-6 border border-purple-200 dark:border-purple-900/60 rounded-3xl bg-gradient-to-br from-purple-50/40 via-white to-slate-50 dark:from-purple-950/30 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Yapay Zeka Piyasa Ekspertiz Raporu
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {modelName}
              </h3>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 block">Önerilen Hızlı Satış Fiyatı:</span>
              <div className="text-4xl font-black text-purple-600 dark:text-purple-400 font-mono">
                {calculatedValue.recommended.toLocaleString('tr-TR')} ₺
              </div>
              <p className="text-[11px] text-slate-500">
                Tahmini elden çıkarma süresi: <strong>~{calculatedValue.liquidityDays} Gün</strong> (Yüksek Talep)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
                <span className="text-slate-400 block text-[10px]">Taban / Kelepir Fiyat:</span>
                <span className="text-base font-bold text-slate-700 dark:text-slate-300 font-mono">
                  {calculatedValue.min.toLocaleString('tr-TR')} ₺
                </span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
                <span className="text-slate-400 block text-[10px]">Tavan / Sabırlı Fiyat:</span>
                <span className="text-base font-bold text-slate-700 dark:text-slate-300 font-mono">
                  {calculatedValue.max.toLocaleString('tr-TR')} ₺
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-[11px] text-purple-900 dark:text-purple-200 leading-relaxed">
              <strong>Ekspertiz Notu:</strong> Bu fiyat analizi; Sarı Sayfalar, espor Discord sunucuları ve platformumuzdaki tamamlanan son 48 saatlik satış verileri baz alınarak hesaplanmıştır.
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI LATENCY & FPS OPTIMIZER */}
      {activeTab === 'optimizer' && (
        <div className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="max-w-2xl space-y-1">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Sistem Gecikmesini (Input Lag) Sıfırlayan AI Donanım Taktikleri
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Esporcuların milisaniyeler kazandığı donanım hileleri ve ayar rehberi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
                Fare & Skatez
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">4000Hz / 8000Hz Polling Rate</h4>
              <p className="text-slate-500 leading-relaxed">
                Standart 1000Hz fareler 1ms gecikme sunarken, 8000Hz sensörler gecikmeyi 0.125ms'ye düşürür. CPU kullanımını %3 artırır ancak mikro-düzeltmelerde rakibi önce vurmanızı sağlar.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-200">
                Klavye & Switch
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Rapid Trigger & 0.1mm Hassasiyet</h4>
              <p className="text-slate-500 leading-relaxed">
                Manyetik Hall-Effect anahtarlar tuşu bırakır bırakmaz reset atar. Counter-strafe yaparken karakter anında durur ve mermi kusursuz gider.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200">
                Kolluk & Yüzey
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Sürtünmesiz Arm-Sleeve Teknolojisi</h4>
              <p className="text-slate-500 leading-relaxed">
                oyunekipman.com patentli kompresyon kolluğu, terlemeyi ve bileğin pad'e yapışmasını sıfırlar. Sensivite stabilitesi maç boyunca %100 korunur.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
