import React, { useState } from 'react';
import {
  Store,
  UserCheck,
  Building2,
  ShieldCheck,
  Percent,
  CheckCircle2,
  Send,
  Lock,
  FileCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { SellerApplication, SellerType } from '../types';

interface BecomeSellerPageProps {
  onApplySeller: (app: SellerApplication) => void;
  onNavigateHome: () => void;
}

export const BecomeSellerPage: React.FC<BecomeSellerPageProps> = ({
  onApplySeller,
  onNavigateHome,
}) => {
  const [sellerType, setSellerType] = useState<SellerType>('INDIVIDUAL_C2C');
  const [storeName, setStoreName] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('İstanbul');
  const [taxNumber, setTaxNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [iban, setIban] = useState('TR');
  const [experienceBio, setExperienceBio] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp: SellerApplication = {
      id: `app_${Date.now()}`,
      applicantName,
      username: username || applicantName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      email,
      phone,
      sellerType,
      storeName: storeName || `${applicantName} Ekipman`,
      city,
      taxNumber: sellerType === 'VERIFIED_B2C' ? taxNumber : undefined,
      idNumber: sellerType === 'INDIVIDUAL_C2C' ? idNumber : undefined,
      iban,
      experienceBio,
      status: 'PENDING',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onApplySeller(newApp);
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <Store className="w-3.5 h-3.5" />
          <span>Güvenli Pazaryeri Satıcı Başvuru Merkezi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          oyunekipman.com'da Mağazanızı Açın ve Satışa Başlayın
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Türkiye'nin tek dikey donanım topluluğunda ekipmanlarınızı değerinde satın. Sahte alıcılar ve dolandırıcılık riski olmadan, 48 saatlik güvenli escrow modeliyle paranız hesabınıza yatsın.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 sm:p-12 rounded-3xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 text-center space-y-4 max-w-2xl mx-auto shadow-md">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Satıcı Başvurunuz Başarıyla Gönderildi!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Başvuru kaydınız <strong>oyunekipman.com Yönetici Paneli</strong> onay kuyruğuna iletilmiştir. Moderasyon ekibimiz kimlik/vergi bilgilerinizi doğruladıktan sonra mağazanız aktif edilecek ve ilan verme yetkiniz açılacaktır.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateHome}
              className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs">
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {/* Type Selection */}
              <div className="space-y-2">
                <label className="font-bold text-slate-800 dark:text-slate-200 block text-sm">
                  1. Satıcı Hesabı Türünüzü Belirleyin
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSellerType('INDIVIDUAL_C2C')}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      sellerType === 'INDIVIDUAL_C2C'
                        ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-500'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <UserCheck className="w-5 h-5 text-indigo-600 mb-1" />
                    <span className="font-bold text-slate-900 dark:text-white block text-xs">
                      Bireysel Satıcı (C2C)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Kişisel donanım, 2. el ekipman ve esporcu satıcıları.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSellerType('VERIFIED_B2C')}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      sellerType === 'VERIFIED_B2C'
                        ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-500'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-purple-600 mb-1" />
                    <span className="font-bold text-slate-900 dark:text-white block text-xs">
                      Kurumsal Mağaza (B2C)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Vergi mükellefi, sıfır ve faturalı ürün satıcıları.
                    </span>
                  </button>
                </div>
              </div>

              {/* Store & Contact Info */}
              <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="font-bold text-slate-800 dark:text-slate-200 block text-sm">
                  2. Mağaza & İletişim Bilgileri
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      {sellerType === 'VERIFIED_B2C' ? 'Şirket / Mağaza Ticari Unvanı' : 'Mağaza Görünen Adı'} *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Örn: ProHardware Store"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Yetkili Adı Soyadı *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ad Soyad"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Kullanıcı Adı (URL slug)
                    </label>
                    <input
                      type="text"
                      placeholder="pro_hardware"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Şehir *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="İstanbul, Ankara, İzmir..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      E-Posta Adresi *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="magaza@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Telefon Numarası *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="05XX XXX XX XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Verification & IBAN */}
              <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="font-bold text-slate-800 dark:text-slate-200 block text-sm">
                  3. Güvenlik, Kimlik & Kazanç Havuz IBAN'ı
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sellerType === 'INDIVIDUAL_C2C' ? (
                    <div>
                      <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                        T.C. Kimlik No (NVİ Doğrulaması İçin) *
                      </label>
                      <input
                        required
                        type="text"
                        maxLength={11}
                        placeholder="11 haneli TCKN"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                        Vergi Dairesi & Vergi No (VKN) *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="10 haneli Vergi Kimlik No"
                        value={taxNumber}
                        onChange={(e) => setTaxNumber(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                  )}

                  <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Ödeme Aktarım IBAN Adresi *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="TR00 0000 0000 0000 0000 0000 00"
                      value={iban}
                      onChange={(e) => setIban(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Experience and categories */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="font-semibold text-slate-600 dark:text-slate-400 block">
                  Satış Deneyiminiz ve Ürün Portföyünüz
                </label>
                <textarea
                  rows={3}
                  placeholder="Hangi donanımları veya dijital ürünleri satmayı planlıyorsunuz? Daha önce ikinci el donanım satışı yaptınız mı?"
                  value={experienceBio}
                  onChange={(e) => setExperienceBio(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Satıcı Başvurusunu Yönetim Onayına Gönder</span>
              </button>
            </form>
          </div>

          {/* Right Column: Perks & Tier Rules */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-xs">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>Neden oyunekipman.com Satıcısı Olmalısınız?</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 block">48 Saatlik Escrow Koruması</strong>
                    Paranız lisanslı havuz hesapta garanti altına alınır; kargo tesliminden sonra test tamamlanınca anında hesabınıza geçer.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 block">Kademeli Düşen Komisyon (%10 ➔ %5)</strong>
                    Satış yaptıkça ve puanınız arttıkça Bronz (%10)'dan Altın (%6) ve Kurumsal (%5) kademelerine yükselirsiniz.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 block">Otomatik Anlaşmalı Kargo Kodu</strong>
                    Şubeye gidip sadece barkod kodunu okutmanız yeterlidir; desili kargo indiriminden faydalanırsınız.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 block">Doğrulanmış Esporcu Profili</strong>
                    Alıcılar mağaza profilinizdeki puanları, satış rozetlerinizi ve referanslarınızı görerek güvenle alışveriş yapar.
                  </div>
                </div>
              </div>
            </div>

            {/* Note on Approval */}
            <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 text-xs text-amber-800 dark:text-amber-300 space-y-1">
              <span className="font-bold block flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Yönetici Onay Süreci
              </span>
              <p className="leading-relaxed">
                Tüm başvurular sahte satıcıları ve dolandırıcılıkları engellemek amacıyla <strong>oyunekipman.com Yönetim Paneli</strong> tarafından incelenip onaylanır. Onaylanan satıcılar doğrudan ilan verme paneline erişebilir.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
