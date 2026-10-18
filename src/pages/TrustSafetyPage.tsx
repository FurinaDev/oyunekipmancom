import React from 'react';
import { ShieldCheck, Truck, Clock, AlertTriangle, FileCheck, CheckCircle2, RotateCcw } from 'lucide-react';

export const TrustSafetyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-3 text-center">
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          Güven & Tahkim Rehberi
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Güvenli Alışveriş ve 48 Saatlik Donanım Testi
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          oyunekipman.com'un ikinci el donanım ticaretini genel ilan sitelerinden ayıran en büyük farkı:
          Ödemenizin havuz hesapta korunması ve teslimat sonrası sunulan 48 saatlik donanım test hakkıdır.
        </p>
      </div>

      {/* Escrow Process Diagram Steps */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          4 Adımlı Lisanslı Havuz (Escrow) Mimarisi
        </h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              1
            </div>
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block text-sm">
                Alıcı Ödemesi ve Lisanslı Havuz Blokajı
              </span>
              <p className="text-slate-500 leading-relaxed">
                6493 sayılı Kanun kapsamında TCMB/BDDK lisanslı ödeme kuruluşu güvencesinde tutulur. Para şirket özkaynak hesaplarına veya satıcıya doğrudan aktarılmaz.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              2
            </div>
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block text-sm">
                Dinamik Kargo Barkodu ile Sevk
              </span>
              <p className="text-slate-500 leading-relaxed">
                Satıcının ekranında tek kullanımlık dinamik kargo barkodu oluşturulur. Satıcı şubeye ürünü teslim eder; kargo hareketleri anlık izlenir.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              3
            </div>
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block text-sm">
                Fiziki Teslimat ve 48 Saatlik Test Süresi
              </span>
              <p className="text-slate-500 leading-relaxed">
                Kurye paketi teslim ettiği anda panelde 48 saatlik geri sayım sayacı başlar. Alıcı ürünü bilgisayarına bağlayarak tuşları, sensörü, monitör piksellerini ve termal sıcaklıkları test eder.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              4
            </div>
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block text-sm">
                Onay, Komisyon Kesintisi & Net Aktarım
              </span>
              <p className="text-slate-500 leading-relaxed">
                Alıcı ürünü beğenip onay verdiğinde (veya 48 saat dolduğunda otomatik olarak) platform seviye komisyonu kesilir ve kalan net bedel satıcının doğrulanmış IBAN'ına gönderilir.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dispute Resolution Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Uyuşmazlık ve İade Prosedürü
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/30 dark:bg-red-950/20 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-red-700 dark:text-red-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Taşıma Esnasında Hasar Gören Paket</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Kutu ezik, yırtık veya ıslak ise kurye eşliğinde <strong>Hasar Tespit Tutanağı</strong> tutarak teslim almadan reddediniz. Tutanak yüklendiğinde havuzdaki bedel derhal alıcıya iade edilir.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
              <RotateCcw className="w-4 h-4" />
              <span>Kusurlu veya Beyana Uymayan Donanım</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              İlanda belirtilmeyen arıza, tuş temassızlığı veya aşırı ısınma varsa teslimattan itibaren 48 saat içinde kısa test videosu yükleyerek uyuşmazlık açınız. Havuz bloke çözülmez; moderatör heyeti iade sürecini başlatır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
