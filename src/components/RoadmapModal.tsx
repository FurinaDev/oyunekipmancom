import React, { useState } from 'react';
import { X, CheckCircle2, ShieldAlert, Award, FileText, ChevronRight, Layers, DollarSign, Calendar, Lock } from 'lucide-react';

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoadmapModal: React.FC<RoadmapModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'phases' | 'strategy' | 'valuation'>('phases');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl my-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                OEK-SRS-BRD-2026/V1
              </span>
              <span className="text-xs text-slate-500">Ortak İnceleme ve Yönetişim Dosyası</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
              oyunekipman.com — 4 Fazlı Proje Planı & Toplantı Stratejisi
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 px-4 sm:px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <button
            onClick={() => setActiveTab('phases')}
            className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'phases'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>4 Fazlı Uygulama Planı</span>
          </button>

          <button
            onClick={() => setActiveTab('strategy')}
            className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'strategy'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Kırmızı Çizgiler & Ortaklık Stratejisi</span>
          </button>

          <button
            onClick={() => setActiveTab('valuation')}
            className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'valuation'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Değerleme & Katkı Envanteri</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-slate-700 dark:text-slate-300">
          {/* TAB 1: 4 PHASES */}
          {activeTab === 'phases' && (
            <div className="space-y-6">
              {/* Faz 1 */}
              <div className="p-4 sm:p-5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-indigo-600 text-white">
                      FAZ 1 (CANLI MVP)
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      Çekirdek Sistem, B2C/C2C Hibrit Temel & Komisyon Motoru (1 - 3. Ay)
                    </h3>
                  </div>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    Şu Anda Uygulanan Faz
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ödeme sağlayıcı bürokrasisine takılmadan, sitenin tam çalışan bir e-ticaret ve ilan deneyimine kavuşturulması.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Fiziki & Dijital Kategori Ağacı:</strong> Klavye, fare, monitör, PC parçaları ve e-pin/oyun kodları.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Kademeli Satıcı Seviyeleri:</strong> Bronz (%10), Gümüş (%8), Altın (%6) ve Kurumsal B2C (%5) komisyon motoru.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Kategoriye Özel İlan Sihirbazı:</strong> Switch, sensör, FurMark stres testi ve anlık teslimat alanları.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Açık ve Koyu Tema:</strong> Kurumsal, minimalist, logolarla tam uyumlu responsive modern arayüz.</span>
                  </div>
                </div>
              </div>

              {/* Faz 2 */}
              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    FAZ 2
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Ödeme Sağlayıcı, Kargo Webhook & Arama Optimizasyonu (4 - 6. Ay)
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  İşlem hacmini artırmak, lojistiği otomatize etmek ve büyük perakendecileri platforma entegre etmek.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="flex items-start gap-1.5">
                    <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Ödeme Kuruluşu Pazaryeri API:</strong> iyzico / PayTR alt üye işyeri (sub-merchant) entegrasyonu.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Otomatik Kargo API:</strong> Yurtiçi / Aras tek tıkla kargo barkodu ve webhook takip dinleyicisi.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Meilisearch Filtreleme:</strong> Switch tipi, Hz, sensör modeli ve anlık yazım hatası toleranslı arama.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>B2C Toplu XML/Excel:</strong> Perakendecilerin binlerce ürünü tek tıkla portala aktarabilmesi.</span>
                  </div>
                </div>
              </div>

              {/* Faz 3 */}
              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    FAZ 3
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Güvenlik, 48 Saatlik Donanım Testi & Uyuşmazlık Çözüm Masası (7 - 9. Ay)
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Oyuncuların Sahibinden gibi genel sitelerde yaşadığı dolandırıcılık korkusunu tamamen yok eden güven çemberi.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="flex items-start gap-1.5">
                    <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>48 Saatlik Donanım Test Sayacı:</strong> Kargo teslim edildiğinde başlayan kontrol sihirbazı.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Uyuşmazlık (Dispute) Masası:</strong> Video kanıtı inceleme ve moderatör tahkim heyeti.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>NVİ TCKN & IBAN Eşleşmesi:</strong> Şüpheli veya sahte hesapların engellenmesi.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Anti-Scope Koruma:</strong> Telefon, IBAN paylaşımını otomatik maskeleme ve mesaj filtresi.</span>
                  </div>
                </div>
              </div>

              {/* Faz 4 */}
              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    FAZ 4
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Espor & Yayıncı Setup Vitrini, Takas & Mobil Ekosistem (10 - 12. Ay)
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Rakiplerin kopyalayamayacağı topluluk gücü, espor iş birlikleri ve gelir çeşitliliği.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="flex items-start gap-1.5">
                    <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Yayıncı Setup Vitrini:</strong> Yayıncıların kullandığı ekipmanlar üzerinden affiliate komisyon modeli.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Sınıf 25 Tekstil Satışı:</strong> Tescilli markayla oyuncu forması, arm-sleeve ve özel aksesuarlar.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Donanım Takas Motoru:</strong> İki kullanıcının ekipman takası + aradaki nakit farkıyla işlem yapması.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Mobil Uygulama & Discord Botu:</strong> iOS/Android anlık bildirimler ve Discord fırsat bildirimleri.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STRATEGY & CONTRACTS */}
          {activeTab === 'strategy' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Red Lines */}
                <div className="p-5 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20 space-y-3">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold text-sm">
                    <ShieldAlert className="w-4 h-4" />
                    <span>🔴 Kırmızı Çizgiler (Asla Kabul Edilmeyecekler)</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-red-600">1.</span>
                      <span><strong>Marka Mülkiyeti Devredilemez:</strong> Türk Patent tescil belgeleri şahsınızda kalmalıdır. Şirkete veya ortaklara ayni devir yerine yalnızca <em>münhasır işletme lisansı</em> verilmelidir.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-red-600">2.</span>
                      <span><strong>Net Kâr Paylaşımı Reddedilmeli:</strong> Şirket masraf göstererek kağıt üzerinde kârı sıfırlayabilir. Hakedişler <em>kasa komisyon cirosu (brüt hasılat)</em> üzerinden tanımlanmalıdır.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-red-600">3.</span>
                      <span><strong>Süresiz Hak Tanınamaz (Kill Switch Şarttır):</strong> Sözleşmede "60 gün içinde çalışan MVP teslim edilmezse sözleşme tazminatsız fesholur ve marka serbest kalır" klozu yer almalıdır.</span>
                    </li>
                  </ul>
                </div>

                {/* Green Lines */}
                <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>🟢 Yeşil Çizgiler (Kabul Edilebilecek Şartlar)</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-emerald-600">1.</span>
                      <span><strong>Mevcut Şirket Üzerinden Yürütme:</strong> Yeni şirket kurma masrafından kaçınarak onların şirketinin sanal POS ve fatura altyapısını kullanmak operasyonel hız kazandırır.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-emerald-600">2.</span>
                      <span><strong>Yazılım Mülkiyeti Onlarda Kalabilir:</strong> Onların hazır C2C/B2C altyapısının mülkiyeti kendilerinde kalabilir; sizin sermayeniz marka ve konsepttir.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-emerald-600">3.</span>
                      <span><strong>İlk 3 Ay Pazarlama Havuzuna Katkı:</strong> İlk 3 ay elde edilecek komisyon hakedişinin %50'sini ortak mutabakatla reklam ve influencer bütçesine yatırmayı kabul edebilirsiniz.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Recommended Royalty / Fee Framework */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Önerilen Ortaklık Modeli: Münhasır Marka Lisanslama + Brüt Hasılat Payı (Royalty / Fee)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 block">C2C Komisyon Payı</span>
                    <span className="text-base font-black text-indigo-600 dark:text-indigo-400 font-mono">%35 - %40</span>
                    <span className="text-[11px] text-slate-500 block mt-1">Platformun kestiği komisyondan doğrudan lisans bedeli.</span>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 block">B2C & D2C Tekstil Payı</span>
                    <span className="text-base font-black text-indigo-600 dark:text-indigo-400 font-mono">%30</span>
                    <span className="text-[11px] text-slate-500 block mt-1">Arm-sleeve ve forma brüt satış kârından pay.</span>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 block">Sponsorluk & Influencer</span>
                    <span className="text-base font-black text-indigo-600 dark:text-indigo-400 font-mono">%40</span>
                    <span className="text-[11px] text-slate-500 block mt-1">Yayıncı ve espor reklam iş birliklerinden aracılık payı.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VALUATION & ASSET INVENTORY */}
          {activeTab === 'valuation' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300">
                ⚠️ <strong>Değerleme İlkesi:</strong> Henüz cirosu başlamamış bir girişime 10-20 milyon TL gibi hayali rakamlar biçmek 20 yıllık kurumsal yöneticileri masadan kaldırır. Ancak "elimde sadece fikir var" demek sizi %5'e hapseder. Masaya konulan ayni varlıkların maliyet yaklaşımıyla tabanı çıkarılmıştır.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Brand Owner Assets */}
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Marka Sahibi Ayni Sermayesi (Siz)
                    </h4>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                      350.000 TL – 450.000 TL
                    </span>
                  </div>

                  <div className="space-y-2 text-xs divide-y divide-slate-100 dark:divide-slate-800">
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-600 dark:text-slate-400">Tescilli Marka (Sınıf 25, 28, 35 - 10 Yıllık)</span>
                      <span className="font-semibold text-slate-900 dark:text-white font-mono">200K - 250K TL</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-600 dark:text-slate-400">Alan Adı Portföyü (oyunekipman.com, .net, .org)</span>
                      <span className="font-semibold text-slate-900 dark:text-white font-mono">25K - 35K TL</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-600 dark:text-slate-400">Tasarım, UI/UX, Kurumsal Kimlik & Temalar</span>
                      <span className="font-semibold text-slate-900 dark:text-white font-mono">40K - 50K TL</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-600 dark:text-slate-400">320 Adet Arm Sleeve Fason Üretim / Pazar Tecrübesi</span>
                      <span className="font-semibold text-slate-900 dark:text-white font-mono">85K - 115K TL</span>
                    </div>
                  </div>
                </div>

                {/* IT Partners Assets */}
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      BT Ortakları Varlıkları
                    </h4>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                      500.000 TL – 600.000 TL
                    </span>
                  </div>

                  <div className="space-y-2 text-xs divide-y divide-slate-100 dark:divide-slate-800">
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-600 dark:text-slate-400">Hazır C2C/B2C Yazılım Altyapısı Uyarlaması</span>
                      <span className="font-semibold text-slate-900 dark:text-white font-mono">350K - 400K TL</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-600 dark:text-slate-400">İlk 12 Aylık Hosting, Sunucu & Altyapı Desteği</span>
                      <span className="font-semibold text-slate-900 dark:text-white font-mono">50K - 70K TL</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-600 dark:text-slate-400">İş Geliştirme & 20 Yıllık Kurumsal BT Birikimi</span>
                      <span className="font-semibold text-slate-900 dark:text-white font-mono">100K - 130K TL</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consensus Valuation Bar */}
              <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 block">Konsensüs Açılış Taban Değerlemesi</span>
                  <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                    900.000 TL – 1.050.000 TL
                  </div>
                </div>
                <div className="text-xs bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span>Marka Sahibinin Hak Ediş Oranı: </span>
                  <strong className="text-slate-900 dark:text-white font-mono font-bold text-sm">%35 – %45</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Tescilli Marka: 25, 28, 35. Sınıflar (Türk Patent ve Marka Kurumu)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-indigo-600 rounded-lg hover:opacity-90 transition-opacity"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
