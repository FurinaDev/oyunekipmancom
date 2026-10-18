import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Truck,
  Cpu,
  CreditCard,
  Trophy,
  CheckCircle2,
  ExternalLink,
  Send,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface PartnerItem {
  name: string;
  category: 'hardware' | 'payment' | 'logistics' | 'esports';
  role: string;
  description: string;
  logoText: string;
  verifiedBadge: string;
}

const PARTNERS: PartnerItem[] = [
  // Donanım
  {
    name: 'ASUS Republic of Gamers (ROG)',
    category: 'hardware',
    role: 'Resmi Donanım Partneri',
    description: 'ROG Swift 360Hz-540Hz monitörler, Azoth kablosuz mekanik klavyeler ve Harpe Ace hafif espor fareleri resmi tedarikçisi.',
    logoText: 'ASUS ROG',
    verifiedBadge: 'Yetkili Distribütör',
  },
  {
    name: 'Logitech G Türkiye',
    category: 'hardware',
    role: 'Periferi & Ekipman Ortağı',
    description: 'PRO X Superlight 2 serisi, LIGHTFORCE hibrit optik-mekanik anahtarlar ve espor turnuva serisi ekipman garantisi.',
    logoText: 'LOGITECH G',
    verifiedBadge: 'Resmi Garanti',
  },
  {
    name: 'BenQ ZOWIE',
    category: 'hardware',
    role: 'Espor Monitör & Ergonomi Ortağı',
    description: 'DyAc 2 teknolojili XL serisi espor monitörleri ve esporcu el yapısına göre tasarlanmış EC/FK/ZA mouse serileri.',
    logoText: 'ZOWIE',
    verifiedBadge: 'Turnuva Standardı',
  },
  {
    name: 'Razer',
    category: 'hardware',
    role: 'Espor & Donanım Ortağı',
    description: 'Viper V3 Pro 8000Hz HyperPolling fareler ve Huntsman analog optik klavyeler için doğrulanmış ürün temini.',
    logoText: 'RAZER',
    verifiedBadge: 'Doğrulanmış',
  },
  // Ödeme
  {
    name: 'BDDK Lisanslı Escrow Havuz Altyapısı (Param / PayTR)',
    category: 'payment',
    role: 'Ödeme & Güvenli Havuz Sağlayıcı',
    description: '6493 sayılı kanun kapsamında Merkez Bankası ve BDDK denetimli koruma hesabı. 48 saatlik donanım test süresince paranız yasal güvencededir.',
    logoText: 'PARAM / PAYTR',
    verifiedBadge: 'BDDK & TCMB Lisanslı',
  },
  {
    name: 'İyzico / PayU',
    category: 'payment',
    role: 'Kart Saklama & 3D Secure 2.0',
    description: 'Tüm banka ve kredi kartlarında 12 taksit desteği, fraud ve sahtecilik önleme algoritmaları.',
    logoText: 'IYZICO',
    verifiedBadge: 'PCI-DSS Seviye 1',
  },
  // Lojistik
  {
    name: 'Yurtiçi Kargo API Entegrasyonu',
    category: 'logistics',
    role: 'Resmi Taşıma ve Barkod Entegrasyonu',
    description: 'İlan satıldığında satıcıya otomatik barkod kodu oluşturulur. Adresten alım ve kırılabilir donanım sigortalı teslimat.',
    logoText: 'YURTİÇİ KARGO',
    verifiedBadge: 'API Entegre',
  },
  {
    name: 'Kolay Gelsin / Jetizz',
    category: 'logistics',
    role: 'Aynı Gün & Randevulu Teslimat',
    description: 'Büyükşehirlerde aynı gün saat aralıklı esporcu teslimatı ve hassas paket koruması.',
    logoText: 'KOLAY GELSİN',
    verifiedBadge: 'Hızlı Teslimat',
  },
  // Espor
  {
    name: 'Türkiye Espor Federasyonu (TESFED) Topluluk İletişimi',
    category: 'esports',
    role: 'Topluluk & Turnuva Ekipman Partneri',
    description: 'Lisanslı esporcuların ekipman yenileme ve üniversite kulüpleri donanım temini programı.',
    logoText: 'ESPOR LİGİ',
    verifiedBadge: 'Resmi Destek',
  },
];

export const BusinessPartnersPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'hardware' | 'payment' | 'logistics' | 'esports'>('all');
  const [formSent, setFormSent] = useState(false);

  const filteredPartners = PARTNERS.filter((p) => filter === 'all' || p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <Building2 className="w-3.5 h-3.5" />
          <span>Kurumsal Ekosistem & Ekipman Distribütörleri</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          İş Ortaklarımız, Sponsorlarımız ve Lojistik Ağımız
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          oyunekipman.com; Türkiye'nin lider çevre birimi markaları, BDDK lisanslı güvenli ödeme kuruluşları ve ulusal kargo filolarıyla doğrudan entegre çalışır.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center flex-wrap gap-2 text-xs font-bold">
        {[
          { key: 'all', label: 'Tüm İş Ortakları' },
          { key: 'hardware', label: 'Donanım & Distribütörler' },
          { key: 'payment', label: 'Ödeme & Escrow Altyapısı' },
          { key: 'logistics', label: 'Kargo & Lojistik Ağı' },
          { key: 'esports', label: 'Espor & Turnuva Partnerleri' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key as any)}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              filter === t.key
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((partner, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {partner.role}
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {partner.verifiedBadge}
                </span>
              </div>

              <div className="h-12 flex items-center">
                <span className="font-black tracking-wider text-xl text-slate-800 dark:text-slate-100 font-mono">
                  {partner.logoText}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {partner.name}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">
                {partner.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Kurumsal Entegrasyon Aktif</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Partnership Proposal Form */}
      <div className="p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Markanızla oyunekipman.com Ekosistemine Katılın
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Donanım distribütörlüğü, resmi mağaza açılışı, espor turnuva sponsorluğu veya teknoloji entegrasyonu için kurumsal iş geliştirme birimimizle görüşün.
          </p>
        </div>

        {formSent ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Talebiniz Kurumsal Ekibimize Ulaştı
            </h3>
            <p className="text-xs text-slate-500">
              İş Geliştirme Yöneticimiz 24 saat içinde kurumsal e-posta veya telefon ile sizinle iletişime geçecektir.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setFormSent(true);
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs"
          >
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Firma / Marka Unvanı
              </label>
              <input
                required
                type="text"
                placeholder="Örn: X Donanım Dağıtım A.Ş."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                İş Ortaklığı Türü
              </label>
              <select className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                <option>Donanım Distribütörlüğü & B2C Mağaza</option>
                <option>Espor Sponsorluğu & Turnuva Desteği</option>
                <option>Ödeme & Fintek Entegrasyonu</option>
                <option>Kargo & Kurye Hizmetleri</option>
                <option>Diğer İş Geliştirme</option>
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
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
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
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                İş Birliği Detayları ve Hedeflenen Kapsam
              </label>
              <textarea
                required
                rows={3}
                placeholder="Markanızın ürün portföyü ve platformumuzda gerçekleştirmek istediğiniz model..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>İş Ortaklığı Başvurusunu İlet</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
