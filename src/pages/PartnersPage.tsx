import React, { useState } from 'react';
import { Sparkles, Tv, Award, Users, CheckCircle2, ArrowRight, DollarSign, Send } from 'lucide-react';

export const PartnersPage: React.FC = () => {
  const [applied, setApplied] = useState(false);
  const [formData, setFormData] = useState({
    channelName: '',
    platform: 'Twitch',
    channelUrl: '',
    followerCount: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
  };

  const featuredCreators = [
    {
      name: 'Deniz "AimGod" Gök',
      platform: 'Twitch & YouTube',
      followers: '85K Takipçi',
      game: 'CS2 & Valorant Pro',
      setup: [
        'Wooting 60HE+ (Lekker L45)',
        'Logitech G Pro X Superlight 2',
        'ZOWIE XL2566K 360Hz',
      ],
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Buse "Valkyrie" Aydın',
      platform: 'Kick & TikTok',
      followers: '140K Takipçi',
      game: 'Çeşitli Oyunlar & Espor',
      setup: [
        'ASUS ROG Swift OLED 240Hz',
        'Shure SM7B + GoXLR',
        'Razer Huntsman V3 Pro',
      ],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3 text-center">
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
          İçerik Üreticileri & Espor Ağı
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Yayıncı ve Esporcu Partnerlik Programı
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Kendi donanım setup vitrininizi oluşturun; takipçileriniz kullandığınız ekipmanları satın aldığında düzenli komisyon kazanın.
        </p>
      </div>

      {/* Perks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 w-fit">
            <Tv className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Kişisel "Setup Vitrini"
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Profilinizde kullandığınız fare, klavye, kulaklık ve monitörü sergileyin. Takipçileriniz tek tıkla en ucuz ikinci el veya sıfır ilana yönlensin.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 w-fit">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Affiliate & Satış Geliri
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Özel referans linkiniz üzerinden gerçekleşen her donanım ve e-pin alışverişinden %15 ile %25 arasında net komisyon hak edişi elde edin.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 w-fit">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Marka Sponsorluk Aracılığı
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Platformumuza katılan global donanım distribütörleri ile yayıncı portföyümüz arasında düzenlenen resmi ürün tanıtım sponsorluklarına dahil olun.
          </p>
        </div>
      </div>

      {/* Featured Creators Showcase */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Örnek Yayıncı Setup Vitrinleri
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredCreators.map((c, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-start gap-4"
            >
              <img
                src={c.avatar}
                alt={c.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0"
              />
              <div className="space-y-2 flex-1">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {c.name}
                  </h3>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    {c.platform} · {c.followers}
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">
                    Aktif Setup Ekipmanları:
                  </span>
                  {c.setup.map((s, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Form */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 shadow-xs space-y-6">
        <div className="space-y-1 text-center max-w-lg mx-auto">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Partnerlik Başvurusu Yapın
          </h3>
          <p className="text-xs text-slate-500">
            Twitch, YouTube, Kick veya TikTok yayıncısıysanız formu doldurun; 48 saat içinde özel affiliate kodunuzu oluşturalım.
          </p>
        </div>

        {applied ? (
          <div className="p-8 text-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Başvurunuz Alındı!
            </h4>
            <p className="text-xs text-slate-500">
              Yayıncı ilişkileri yöneticimiz kanalınızı inceleyerek en kısa sürede iletişime geçecektir.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Kanal / Yayıncı Adınız</label>
              <input
                type="text"
                required
                value={formData.channelName}
                onChange={(e) => setFormData({ ...formData, channelName: e.target.value })}
                placeholder="Örn: ProGamer_TR"
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Ana Platform</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="Twitch">Twitch</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Kick">Kick</option>
                  <option value="TikTok">TikTok</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Tahmini Takipçi / Abone</label>
                <input
                  type="text"
                  required
                  value={formData.followerCount}
                  onChange={(e) => setFormData({ ...formData, followerCount: e.target.value })}
                  placeholder="Örn: 25.000"
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Kanal Linki (URL)</label>
              <input
                type="url"
                required
                value={formData.channelUrl}
                onChange={(e) => setFormData({ ...formData, channelUrl: e.target.value })}
                placeholder="https://twitch.tv/..."
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">İletişim E-Postası</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="iletisim@yayin.com"
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Partnerlik Başvurusunu Gönder</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
