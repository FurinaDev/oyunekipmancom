import React, { useState } from 'react';
import {
  Sparkles,
  Twitch,
  Youtube,
  Radio,
  ExternalLink,
  ShoppingBag,
  Award,
  TrendingUp,
  Percent,
  CheckCircle2,
  Users,
  Send,
  Zap,
  Mouse,
  Keyboard,
  Headphones,
  Tv
} from 'lucide-react';
import { Product } from '../types';

interface CreatorSetup {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  bannerUrl: string;
  game: string;
  platform: 'twitch' | 'youtube' | 'kick';
  isLive: boolean;
  liveTitle?: string;
  viewerCount?: number;
  setup: {
    mouse: string;
    keyboard: string;
    headset: string;
    monitor: string;
    mousepad: string;
    armSleeve: string;
    dpi: number;
    sensitivity: number;
    resolution: string;
  };
  featuredGearProductId?: string;
  commissionRate: string;
}

const CREATORS_DATA: CreatorSetup[] = [
  {
    id: 'creator_1',
    name: 'Ferit "wtcN" Karakaya',
    username: 'wtcn',
    avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    game: 'Valorant & Çeşitli',
    platform: 'twitch',
    isLive: true,
    liveTitle: 'BBL Karşılaşması Öncesi Rank Kasıyoruz! | !ekipman',
    viewerCount: 14200,
    setup: {
      mouse: 'Logitech G PRO X Superlight 2',
      keyboard: 'Wooting 60HE+ (Lekker Switches)',
      headset: 'HyperX Cloud III Wireless',
      monitor: 'ZOWIE XL2566K 360Hz Fast-TN',
      mousepad: 'Artisan Hayate Otsu Soft (XL)',
      armSleeve: 'oyunekipman.com Pro Stealth Sleeve',
      dpi: 800,
      sensitivity: 0.314,
      resolution: '1920x1080 (240Hz)',
    },
    commissionRate: '%5 Özel Creator İndirimi',
  },
  {
    id: 'creator_2',
    name: 'Mehmet Yağız "cNed" İpek',
    username: 'cned',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    game: 'Valorant VCT EMEA Pro',
    platform: 'twitch',
    isLive: false,
    setup: {
      mouse: 'Razer Viper V3 Pro (White)',
      keyboard: 'Razer Huntsman V3 Pro Mini',
      headset: 'Logitech G PRO X 2 LIGHTSPEED',
      monitor: 'BenQ ZOWIE XL2546K 240Hz DyAc+',
      mousepad: 'Lethal Gaming Gear Saturn Pro',
      armSleeve: 'oyunekipman.com Kompresyon Espor Kolluğu',
      dpi: 400,
      sensitivity: 0.68,
      resolution: '1280x960 (4:3 Stretched)',
    },
    commissionRate: '%7 Esporcu İndirim Kodu',
  },
  {
    id: 'creator_3',
    name: 'Tuğkan "Elraenn" Gönültaş',
    username: 'elraenn',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    game: 'Rastgele Sohbet & Hikayeli Oyunlar',
    platform: 'kick',
    isLive: true,
    liveTitle: 'Gece Yayını & Ekipman İnceleme | Kod: ELRAENN',
    viewerCount: 22800,
    setup: {
      mouse: 'SteelSeries Aerox 3 Wireless',
      keyboard: 'SteelSeries Apex Pro TKL (OmniPoint)',
      headset: 'Beyerdynamic DT 990 Pro + Shure SM7B',
      monitor: 'Samsung Odyssey Neo G9 (OLED)',
      mousepad: 'SteelSeries QcK Heavy XXL',
      armSleeve: 'oyunekipman.com Standart Arm-Sleeve',
      dpi: 1000,
      sensitivity: 0.42,
      resolution: '2560x1440 240Hz',
    },
    commissionRate: '%5 Topluluk İndirimi',
  },
  {
    id: 'creator_4',
    name: 'Berk "Combatry" Erdinç',
    username: 'combatry',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    game: 'CS2 & FPS Analizleri',
    platform: 'youtube',
    isLive: false,
    setup: {
      mouse: 'ZOWIE EC2-CW Kablosuz',
      keyboard: 'Ducky One 3 Mini (Cherry MX Red)',
      headset: 'Sennheiser HD 560S',
      monitor: 'ZOWIE XL2566K (DyAc 2)',
      mousepad: 'ZOWIE G-SR II',
      armSleeve: 'oyunekipman.com Frictionless Sleeve',
      dpi: 800,
      sensitivity: 1.15,
      resolution: '1280x960 4:3',
    },
    commissionRate: '%6 Donanım Kuponu',
  },
];

interface CreatorsPageProps {
  onSelectProduct?: (product: Product) => void;
  onNavigateHome?: () => void;
}

export const CreatorsPage: React.FC<CreatorsPageProps> = () => {
  const [selectedCreator, setSelectedCreator] = useState<CreatorSetup>(CREATORS_DATA[0]);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applied, setApplied] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-12 border border-purple-800/40 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>İçerik Üreticileri & Espor Setup Vitrini</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Türkiye'nin En Çok İzlenen Yayıncılarının Kullandığı Gerçek Ekipmanlar
          </h1>
          <p className="text-sm sm:text-base text-purple-100/80 leading-relaxed max-w-2xl">
            Favori yayıncınızın hassasiyet ayarlarını (DPI/Sens), kullandığı mouse skatezlerini, switch modellerini ve kol boyu sürtünmeyi sıfırlayan arm-sleeve tercihlerini inceleyin.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 font-bold text-xs sm:text-sm text-white shadow-lg transition-transform hover:scale-105"
            >
              İçerik Üreticisi / Partner Başvurusu Yap
            </button>
            <div className="flex items-center gap-3 text-xs text-purple-200/90 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> %3-%7 Komisyon Geliri
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Ücretsiz Ekipman Desteği
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Creator Selector Strip */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <span>Öne Çıkan Yayıncı & Esporcular</span>
          </h2>
          <span className="text-xs text-slate-500">Profilini görmek için bir yayıncı seçin</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CREATORS_DATA.map((creator) => {
            const isSelected = selectedCreator.id === creator.id;
            return (
              <button
                key={creator.id}
                onClick={() => setSelectedCreator(creator)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-500 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                {creator.isLive && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider animate-pulse">
                    <Radio className="w-2.5 h-2.5" /> CANLI
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <img
                    src={creator.avatarUrl}
                    alt={creator.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400 shrink-0"
                  />
                  <div className="truncate">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                      {creator.name}
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate">@{creator.username}</span>
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold block mt-0.5">
                      {creator.game}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Creator Detail Card & Setup Matrix */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 overflow-hidden shadow-lg space-y-6">
        {/* Creator Banner */}
        <div className="relative h-48 sm:h-64 w-full bg-slate-900 overflow-hidden">
          <img
            src={selectedCreator.bannerUrl}
            alt={selectedCreator.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedCreator.avatarUrl}
                alt={selectedCreator.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white dark:border-slate-900 shadow-2xl shrink-0"
              />
              <div className="text-white space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black">{selectedCreator.name}</h3>
                  {selectedCreator.platform === 'twitch' ? (
                    <Twitch className="w-5 h-5 text-purple-400" />
                  ) : (
                    <Youtube className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  Ana Disiplin: <strong className="text-white">{selectedCreator.game}</strong>
                </p>
                {selectedCreator.isLive && (
                  <p className="text-xs text-red-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    Şu anda yayında: "{selectedCreator.liveTitle}" ({selectedCreator.viewerCount?.toLocaleString()} izleyici)
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-xl bg-purple-600/90 text-white font-bold text-xs border border-purple-400/40">
                {selectedCreator.commissionRate}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Setup Specs Grid */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                {selectedCreator.name} — Güncel Donanım ve Sens Ayarları
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                En son espor turnuvası ve resmi maçlarda kullanılan resmi setup listesi.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Mouse */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                  <Mouse className="w-4 h-4" /> Oyuncu Faresi
                </span>
                <span className="font-mono text-slate-500">DPI: {selectedCreator.setup.dpi}</span>
              </div>
              <div className="text-sm font-black text-slate-900 dark:text-white">
                {selectedCreator.setup.mouse}
              </div>
              <p className="text-[11px] text-slate-500">
                Oyun İçi Sens: <strong>{selectedCreator.setup.sensitivity}</strong> (eDPI: {selectedCreator.setup.dpi * selectedCreator.setup.sensitivity})
              </p>
            </div>

            {/* Keyboard */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                  <Keyboard className="w-4 h-4" /> Mekanik Klavye
                </span>
                <span className="text-emerald-600 font-semibold">Rapid Trigger</span>
              </div>
              <div className="text-sm font-black text-slate-900 dark:text-white">
                {selectedCreator.setup.keyboard}
              </div>
              <p className="text-[11px] text-slate-500">
                Analog Hall-Effect manyetik switchler ile sıfır gecikmeli tuş tepkisi.
              </p>
            </div>

            {/* Headset */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                  <Headphones className="w-4 h-4" /> Kulaklık / Ses
                </span>
                <span className="text-slate-500">Espor Tuned</span>
              </div>
              <div className="text-sm font-black text-slate-900 dark:text-white">
                {selectedCreator.setup.headset}
              </div>
              <p className="text-[11px] text-slate-500">
                Ayak sesi ayrıştırma ve düşük frekans netliği için özel EQ profili.
              </p>
            </div>

            {/* Monitor */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                  <Tv className="w-4 h-4" /> Espor Monitörü
                </span>
                <span className="font-mono text-slate-500">{selectedCreator.setup.resolution}</span>
              </div>
              <div className="text-sm font-black text-slate-900 dark:text-white">
                {selectedCreator.setup.monitor}
              </div>
              <p className="text-[11px] text-slate-500">
                DyAc+ / Bulanıklık önleme teknolojisi ile rakip hareketini anında yakalama.
              </p>
            </div>

            {/* Mousepad */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold flex items-center gap-1.5 text-orange-600 dark:text-orange-400">
                  <Zap className="w-4 h-4" /> Mousepad Yüzeyi
                </span>
                <span className="text-slate-500">Control / Speed</span>
              </div>
              <div className="text-sm font-black text-slate-900 dark:text-white">
                {selectedCreator.setup.mousepad}
              </div>
              <p className="text-[11px] text-slate-500">
                Mikro dikişli kenarlar ve neme dirençli pürüzsüz glide dokusu.
              </p>
            </div>

            {/* Arm-Sleeve (Crucial brand connection) */}
            <div className="p-4 rounded-2xl border-2 border-purple-300 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-950/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold flex items-center gap-1.5 text-purple-700 dark:text-purple-300">
                  <Sparkles className="w-4 h-4 text-purple-600" /> Resmi Arm-Sleeve Tercihi
                </span>
                <span className="px-1.5 py-0.5 rounded bg-purple-600 text-white text-[10px] font-bold">
                  ÖZEL ÜRÜN
                </span>
              </div>
              <div className="text-sm font-black text-purple-950 dark:text-purple-100">
                {selectedCreator.setup.armSleeve}
              </div>
              <p className="text-[11px] text-purple-700/80 dark:text-purple-300/80">
                oyunekipman.com'un 320 adetlik saha testleriyle geliştirilen, pad yüzeyine yapışmayan özel sürtünmesiz kumaş.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Creator Partner Program Info */}
      <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 space-y-6">
        <div className="max-w-2xl space-y-2">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            oyunekipman.com İçerik Üretici Ağına Nasıl Katılırsınız?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Twitch, YouTube, TikTok veya Kick kanalınızda oyun ve donanım içerikleri üretiyorsanız; topluluğunuza özel indirim kodları tanımlanır ve her satıştan anında %3 ila %7 arasında nakit gelir kazanırsınız.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Kişisel İndirim Kodu</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Takipçilerinize %5-%10 indirim sağlayan size özel kupon kodu (örn: !wtcn, !elraenn).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Canlı Dashboard & Kazanç</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kuponunuzla yapılan tüm alışverişleri ve sepetleri şeffaf panelinizden anlık izleyin.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Sponsorluk & Test Ürünleri</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Yeni çıkan fareler, mekanik klavyeler ve arm-sleeveler lansmandan önce ilk size gönderilir.
            </p>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150">
            {applied ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Başvurunuz Alındı!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  İçerik yöneticimiz kanal istatistiklerinizi inceleyerek 24 saat içinde e-posta adresinizden sizinle iletişime geçecektir.
                </p>
                <button
                  onClick={() => {
                    setIsApplyModalOpen(false);
                    setApplied(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs"
                >
                  Kapat
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    İçerik Üreticisi Başvuru Formu
                  </h3>
                  <button
                    onClick={() => setIsApplyModalOpen(false)}
                    className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setApplied(true);
                  }}
                  className="space-y-3 text-xs"
                >
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Adınız Soyadınız / Sahne İsminiz
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Örn: Caner 'X' Yıldız"
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Kanal / Profil Bağlantınız (Twitch, YouTube, Kick vb.)
                    </label>
                    <input
                      required
                      type="url"
                      placeholder="https://twitch.tv/..."
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Ortalama İzleyici / Takipçi
                      </label>
                      <input
                        type="text"
                        placeholder="Örn: 250+ canlı / 15K abone"
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        İletişim E-Posta / Discord
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="ajans@yayinci.com"
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Topluluğunuz ve Ana Oyununuz
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Örn: Valorant ve CS2 odaklı rekabetçi espor topluluğu..."
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Başvuruyu Gönder</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
