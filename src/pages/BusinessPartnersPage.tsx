import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Send,
  Sparkles,
  ArrowRight,
  Cpu,
  CreditCard,
  Truck,
  Trophy,
  Lock,
  Boxes
} from 'lucide-react';

interface PartnerItem {
  id: string;
  name: string;
  shortCode: string;
  category: 'hardware' | 'payment' | 'logistics' | 'esports' | 'security';
  categoryLabel: string;
  role: string;
  scope: string;
  statusBadge: string;
  brandColor: string;
}

const COMPACT_PARTNERS: PartnerItem[] = [
  // 1. Donanım & Distribütörler
  {
    id: 'p1',
    name: 'ASUS Republic of Gamers',
    shortCode: 'ROG',
    category: 'hardware',
    categoryLabel: 'Donanım',
    role: 'Resmi Donanım Distribütörü',
    scope: 'ROG Swift 360Hz-540Hz espor monitörleri ve Azoth serisi klavyeler.',
    statusBadge: 'Yetkili Distribütör',
    brandColor: 'text-red-600 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900',
  },
  {
    id: 'p2',
    name: 'Logitech G Türkiye',
    shortCode: 'LOGI',
    category: 'hardware',
    categoryLabel: 'Donanım',
    role: 'Periferi & Ekipman Partneri',
    scope: 'PRO X Superlight 2 serisi ve LIGHTFORCE optik anahtar garantisi.',
    statusBadge: 'Resmi Garanti',
    brandColor: 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900',
  },
  {
    id: 'p3',
    name: 'BenQ ZOWIE',
    shortCode: 'ZOWIE',
    category: 'hardware',
    categoryLabel: 'Donanım',
    role: 'Espor Monitör Standardı',
    scope: 'DyAc 2 teknolojili XL serisi monitörler ve ergonomik espor fareleri.',
    statusBadge: 'Turnuva Standardı',
    brandColor: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900',
  },
  {
    id: 'p4',
    name: 'Razer Global',
    shortCode: 'RAZER',
    category: 'hardware',
    categoryLabel: 'Donanım',
    role: 'Hassas Donanım Tedariği',
    scope: 'Viper V3 Pro 8000Hz HyperPolling fareler ve analog optik klavyeler.',
    statusBadge: 'Doğrulanmış Ürün',
    brandColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900',
  },
  {
    id: 'p5',
    name: 'SteelSeries',
    shortCode: 'STEEL',
    category: 'hardware',
    categoryLabel: 'Donanım',
    role: 'Ses & Periferi Partneri',
    scope: 'Arctis Nova Pro serisi Hi-Res espor kulaklıkları ve Apex Pro klavyeler.',
    statusBadge: 'Doğrulanmış',
    brandColor: 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900',
  },
  {
    id: 'p6',
    name: 'Wooting Keyboards',
    shortCode: 'WOOT',
    category: 'hardware',
    categoryLabel: 'Donanım',
    role: 'Hall-Effect Teknoloji Partneri',
    scope: 'Lekker L45 manyetik switch teknolojisi ve Rapid Trigger optimizasyonu.',
    statusBadge: 'İnovasyon Partneri',
    brandColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900',
  },

  // 2. Ödeme & Escrow Altyapısı
  {
    id: 'p7',
    name: 'Param / PayTR Escrow',
    shortCode: 'PARAM',
    category: 'payment',
    categoryLabel: 'Ödeme & Escrow',
    role: 'BDDK Lisanslı Havuz Hesabı',
    scope: '6493 sayılı kanun kapsamında 48 saatlik donanım test koruma havuzu.',
    statusBadge: 'BDDK & TCMB Lisanslı',
    brandColor: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900',
  },
  {
    id: 'p8',
    name: 'İyzico / PayU Altyapısı',
    shortCode: 'IYZI',
    category: 'payment',
    categoryLabel: 'Ödeme & Escrow',
    role: 'Kart Saklama & 3D Secure 2.0',
    scope: 'Tüm banka kartlarında 12 taksit desteği ve fraud/sahtecilik önleme motoru.',
    statusBadge: 'PCI-DSS Seviye 1',
    brandColor: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900',
  },
  {
    id: 'p9',
    name: 'Garanti BBVA Sanal POS',
    shortCode: 'GBBVA',
    category: 'payment',
    categoryLabel: 'Ödeme & Escrow',
    role: 'Banka Entegrasyon Sağlayıcısı',
    scope: 'Bonus puan kullanımı, ticari kart taksitlendirmeleri ve anlık takas.',
    statusBadge: 'Doğrudan POS',
    brandColor: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900',
  },

  // 3. Lojistik & Kargo Ağı
  {
    id: 'p10',
    name: 'Yurtiçi Kargo API',
    shortCode: 'YK',
    category: 'logistics',
    categoryLabel: 'Lojistik',
    role: 'Resmi Taşıma ve Barkod API',
    scope: 'İlan satıldığında otomatik kargo kodu üretimi ve hassas donanım sigortası.',
    statusBadge: 'API Entegre',
    brandColor: 'text-blue-700 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900',
  },
  {
    id: 'p11',
    name: 'Kolay Gelsin / Jetizz',
    shortCode: 'KOLAY',
    category: 'logistics',
    categoryLabel: 'Lojistik',
    role: 'Aynı Gün & Randevulu Kurye',
    scope: 'Büyükşehirlerde aynı gün saat aralıklı teslimat ve anti-darbe koruması.',
    statusBadge: 'Hızlı Teslimat',
    brandColor: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-900',
  },
  {
    id: 'p12',
    name: 'MNG Kargo Espor Lojistik',
    shortCode: 'MNG',
    category: 'logistics',
    categoryLabel: 'Lojistik',
    role: '81 İl Dağıtım Filosu',
    scope: 'Ekran kartı ve monitör gönderimlerinde özel korumalı hava yastıklı koli desteği.',
    statusBadge: 'Kırılabilir Sigortalı',
    brandColor: 'text-cyan-700 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-900',
  },

  // 4. Espor & Turnuva
  {
    id: 'p13',
    name: 'TESFED Topluluk Desteği',
    shortCode: 'TESFED',
    category: 'esports',
    categoryLabel: 'Espor',
    role: 'Espor Federasyonu İletişimi',
    scope: 'Lisanslı esporcular ve üniversite kulüpleri için resmi donanım yenileme desteği.',
    statusBadge: 'Federasyon İletişimi',
    brandColor: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900',
  },
  {
    id: 'p14',
    name: 'ESA Esports Arena',
    shortCode: 'ESA',
    category: 'esports',
    categoryLabel: 'Espor',
    role: 'Turnuva & LAN Partneri',
    scope: 'LAN finalleri ve turnuvalarda oyuncuların kullandığı setup ekipmanlarının satışı.',
    statusBadge: 'Turnuva Partneri',
    brandColor: 'text-violet-600 bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-900',
  },

  // 5. Siber Güvenlik & Doğrulama
  {
    id: 'p15',
    name: 'Cloudflare Enterprise',
    shortCode: 'CF',
    category: 'security',
    categoryLabel: 'Güvenlik',
    role: 'DDoS Koruması & WAF Altyapısı',
    scope: 'Sıfır kesinti, bot engelleme ve uçtan uca TLS 1.3 şifreleme protokolü.',
    statusBadge: 'Kurumsal WAF',
    brandColor: 'text-orange-500 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900',
  },
  {
    id: 'p16',
    name: 'E-Devlet & MERNİS API',
    shortCode: 'TCKN',
    category: 'security',
    categoryLabel: 'Güvenlik',
    role: 'Yasal Kimlik Doğrulama',
    scope: 'Bireysel ve kurumsal satıcıların TCKN/Vergi Kimlik doğrulamasıyla güvenli pazar.',
    statusBadge: 'Resmi Doğrulama',
    brandColor: 'text-red-700 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900',
  },
];

export const BusinessPartnersPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'hardware' | 'payment' | 'logistics' | 'esports' | 'security'>('all');
  const [formSent, setFormSent] = useState(false);

  const filteredPartners = COMPACT_PARTNERS.filter((p) => filter === 'all' || p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Hero Header (Compact & Aligned) */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
          <Building2 className="w-3.5 h-3.5" />
          <span>Kurumsal Ekosistem & Distribütör Ağı</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          İş Ortaklarımız
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          oyunekipman.com; Türkiye'nin lider çevre birimi markaları, BDDK lisanslı güvenli ödeme havuzları ve ulusal kargo filolarıyla doğrudan entegre çalışır.
        </p>
      </div>

      {/* Professional Categorization Tabs */}
      <div className="flex justify-center flex-wrap gap-2 text-xs font-bold">
        {[
          { key: 'all', label: 'Tüm İş Ortakları' },
          { key: 'hardware', label: 'Donanım & Distribütörler' },
          { key: 'payment', label: 'BDDK & Escrow Altyapısı' },
          { key: 'logistics', label: 'Lojistik & Kargo Ağı' },
          { key: 'esports', label: 'Espor & Turnuva' },
          { key: 'security', label: 'Siber Güvenlik & Doğrulama' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key as any)}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              filter === t.key
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Highly Compact, Strictly Aligned Partner Cards Grid (4 Columns, matching TeamPage) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {filteredPartners.map((partner) => (
          <div
            key={partner.id}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
          >
            {/* Top Row: Minimal Logo/Monogram Box + Title + Verified */}
            <div className="flex items-start gap-3">
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 font-black font-mono tracking-tight text-xs shadow-2xs ${partner.brandColor}`}
              >
                {partner.shortCode}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate">
                    {partner.name}
                  </h3>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                </div>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold truncate mt-0.5">
                  {partner.role}
                </p>
                <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                  {partner.categoryLabel}
                </span>
              </div>
            </div>

            {/* Scope Summary (Strict 2-line clamp for exact uniform height) */}
            <p className="h-8 text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
              {partner.scope}
            </p>

            {/* Bottom Row: Official Status Pill + Integration Active */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 truncate max-w-[150px]">
                {partner.statusBadge}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Entegre</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Partnership Proposal Form (Compact, Modern & Streamlined) */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Markanızla oyunekipman.com Ekosistemine Katılın
          </h2>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            Donanım distribütörlüğü, resmi mağaza açılışı, turnuva sponsorluğu veya teknoloji entegrasyonu için kurumsal iş geliştirme birimimize ulaşın.
          </p>
        </div>

        {formSent ? (
          <div className="text-center py-6 space-y-2 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Talebiniz Kurumsal Ekibimize Ulaştı
            </h3>
            <p className="text-xs text-slate-500">
              İş Geliştirme Yöneticimiz 24 saat içinde kurumsal e-posta ile sizinle iletişime geçecektir.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setFormSent(true);
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs"
          >
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Firma / Marka Unvanı
              </label>
              <input
                required
                type="text"
                placeholder="Örn: X Donanım Dağıtım A.Ş."
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                İş Ortaklığı Türü
              </label>
              <select className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
                <option>Donanım Distribütörlüğü & B2C Mağaza</option>
                <option>Espor Sponsorluğu & Turnuva Desteği</option>
                <option>Ödeme & Fintek Entegrasyonu</option>
                <option>Kargo & Lojistik Hizmetleri</option>
                <option>Diğer Teknoloji İş Birliği</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Yetkili Kişi Adı Soyadı
              </label>
              <input
                required
                type="text"
                placeholder="Ad Soyad"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Kurumsal E-Posta
              </label>
              <input
                required
                type="email"
                placeholder="isgelistirme@sirketiniz.com"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                İş Birliği Kapsamı ve Detayları
              </label>
              <textarea
                required
                rows={2}
                placeholder="Ürün portföyünüz ve platformumuzda planlanan iş modeli..."
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
              />
            </div>

            <div className="sm:col-span-2 pt-1">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>İş Ortaklığı Başvurusunu Gönder</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
