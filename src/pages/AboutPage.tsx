import React from 'react';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Cpu,
  Target,
  Compass,
  CheckCircle2,
  Lock,
  Layers,
  FileText,
  Flame,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner in the exact style of CreatorsPage */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-14 border border-purple-800/40 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-bold border border-purple-400/30">
            <Award className="w-3.5 h-3.5 text-purple-300" />
            <span>TÜRKPATENT Tescilli Dikey Donanım Ekosistemi</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Donanım Tutkusundan Kurumsal Güvene: oyunekipman.com
          </h1>
          <p className="text-sm sm:text-base text-purple-100/80 leading-relaxed max-w-2xl">
            Türkiye'deki amatör sarı sayfa alım-satım karmaşasına son vermek, esporcuların ve oyuncuların ekipmanlarını sıfır risk ve 48 saatlik donanım test hakkıyla güvenle buluşturmak için yola çıktık.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-purple-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 320 Adet Arm-Sleeve Saha Tecrübesi
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 25, 28 ve 35. Tescil Sınıfları
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 48 Saatlik Donanım Escrow Güvencesi
            </span>
          </div>
        </div>
      </div>

      {/* 320 Arm-Sleeve Story & Origin Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              Çıkış Noktamız
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              320 Adet Arm-Sleeve Saha Tecrübesi ile Başlayan Yolculuk
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            oyunekipman.com; bir gecede tasarlanmış teorik bir proje değildir. Marka kurucumuz, ilk etapta <strong>320 adet özel kompresyonlu espor kolluğu (arm-sleeve)</strong> ürettirip Türkiye'deki profesyonel esporculara ve turnuva oyuncularına doğrudan ulaştırarak pazarın kalbine inmiştir.
          </p>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Bu süreçte oyuncuların sadece tekstil değil; <strong>ikinci el mekanik klavyelerde gizlenen switch arızalarından, mining çıkması yıpranmış ekran kartlarından, ölü pikselli monitörlerden ve Sarı Sayfalar / Dolap gibi genel sitelerdeki dolandırıcılıklardan</strong> ne kadar muzdarip olduğu birinci elden tespit edilmiştir.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <span className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">320+</span>
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block mt-0.5">Saha Satışı</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">48 Saat</span>
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block mt-0.5">Test Güvencesi</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">3 Sınıf</span>
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block mt-0.5">Tescilli Marka</span>
            </div>
          </div>
        </div>

        {/* Visual Story Card */}
        <div className="lg:col-span-5 border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm">
          <div className="aspect-16/10 rounded-2xl overflow-hidden bg-slate-800">
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
              alt="Espor setup"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Esporculardan Esporculara Donanım Standartları
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Her ilan için zorunlu kılınan switch türü, sensör modeli, ölü piksel beyanı ve FurMark stres testi verileri sayesinde alıcılar ne aldığını net olarak bilir.
            </p>
          </div>
        </div>
      </div>

      {/* Patent & Intellectual Property Badges */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-8 space-y-6 shadow-xs">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span>Türk Patent ve Marka Kurumu Tescil Güvencesi</span>
          </h3>
          <p className="text-xs text-slate-500">
            oyunekipman.com; kurucusu adına tescillenmiş ve yasal koruma altında olan bağımsız bir markadır.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              25. Tescil Sınıfı
            </span>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Espor Tekstili & Kolluk</h4>
            <p className="text-slate-500 leading-relaxed">
              Esporcular için üretilen sürtünmesiz arm-sleeveler, spor kıyafetleri ve oyuncu tekstil ürünlerinin marka koruması.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-850 space-y-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              28. Tescil Sınıfı
            </span>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Oyun Araç ve Gereçleri</h4>
            <p className="text-slate-500 leading-relaxed">
              Oyun çevre birimleri, mekanik klavyeler, hassas optik fareler, espor kulaklıkları ve donanım aksesuarları.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-850 space-y-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
              35. Tescil Sınıfı
            </span>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">E-Ticaret Pazaryeri</h4>
            <p className="text-slate-500 leading-relaxed">
              Çevrim içi pazar yerleri sağlama hizmetleri, alıcı ve satıcıların buluşturulması ve aracılık hizmetleri.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Misyonumuz</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Türkiye'deki her seviyeden oyuncunun ve esporcunun; donanım satın alırken "Acaba arızalı mı çıkar?" korkusu yaşamadan, doğrulanmış teknik parametreler ve 48 saatlik escrow koruması altında ekipmanına kavuşmasını sağlamak.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Vizyonumuz</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Yalnızca Türkiye'de değil, çevre coğrafyada da donanım standartlarını belirleyen; resmi yetkili markalarla bireysel esporcuları aynı şeffaf havuzda buluşturan referans donanım borsası haline gelmek.
          </p>
        </div>
      </div>
    </div>
  );
};
