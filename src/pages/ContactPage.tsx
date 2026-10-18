import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-3 text-center">
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
          Müşteri & Kurumsal Destek
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Bizimle İletişime Geçin
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          İkinci el alım satım, kurumsal B2C mağaza başvurusu veya marka iş birlikleri için ekibimizle doğrudan görüşün.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info Card */}
        <div className="md:col-span-5 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              İletişim Bilgileri
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sorularınız ve uyuşmazlık bildirimleriniz için çalışma saatleri içinde ortalama 15 dakikada yanıt verilir.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">E-Posta</span>
                <span className="text-slate-500">destek@oyunekipman.com</span>
                <span className="text-slate-500 block">kurumsal@oyunekipman.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Ofis & Operasyon</span>
                <span className="text-slate-500">Kadıköy Bilişim Vadisi Yerleşkesi</span>
                <span className="text-slate-500 block">İstanbul, Türkiye</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Topluluk & Discord</span>
                <span className="text-slate-500">discord.gg/oyunekipman</span>
                <span className="text-slate-500 block">Canlı Destek Botu: 7/24 Aktif</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 leading-relaxed">
            🛡️ <strong>Hukuki Uyum:</strong> 6563 sayılı Kanun ve ETBİS kapsamında aracı hizmet sağlayıcı olarak faaliyet göstermekteyiz.
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Mesajınız Başarıyla İletildi!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Talebiniz destek ekibimize ulaştı. En geç 24 saat içinde e-posta adresiniz üzerinden geri dönüş sağlanacaktır.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-4 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Yeni Mesaj Gönder
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Adınız Soyadınız</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Mert Aksoy"
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">E-Posta Adresiniz</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ornek@domain.com"
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Konu</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="">Lütfen konu seçiniz...</option>
                  <option value="Sipariş & Kargo">Sipariş & Kargo Takibi</option>
                  <option value="Uyuşmazlık & İade">Donanım Testi & Uyuşmazlık Bildirimi</option>
                  <option value="Kurumsal B2C Mağaza">Kurumsal B2C Mağaza Açılışı</option>
                  <option value="Yayıncı & Sponsorluk">Yayıncı & Espor Partnerliği</option>
                  <option value="Diğer">Diğer Konular</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Mesajınız</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Sorunuzu veya talebinizi detaylı olarak belirtiniz..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Mesajı Gönder</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
