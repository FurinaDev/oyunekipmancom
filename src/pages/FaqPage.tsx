import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CreditCard,
  Truck,
  RotateCcw,
  Store,
  KeyRound,
  MessageCircle,
  FileText
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'escrow' | 'sellers' | 'shipping' | 'digital' | 'disputes';
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  // 48 Saat Donanım Testi & Escrow
  {
    id: 'f1',
    category: 'escrow',
    question: '48 Saatlik Donanım Test Koruması nasıl çalışır?',
    answer:
      'Satın aldığınız ürün kargo tarafından size teslim edildiği anda 48 saatlik inceleme süreniz başlar. Bu süre boyunca ödediğiniz para lisanslı ödeme havuzunda güvende tutulur; satıcıya aktarılmaz. Klavyenizin switchlerini, farenizin sensörünü veya monitörünüzün ölü piksellerini test ettikten sonra onay verirsiniz.',
  },
  {
    id: 'f2',
    category: 'escrow',
    question: 'Üründe beyan edilmeyen bir kusur çıkarsa ne yapmalıyım?',
    answer:
      '48 saatlik süre dolmadan panelinizden "Uyuşmazlık Bildir / Sorun Bildir" butonuna tıklayarak fotoğraf veya video kanıtı yüklersiniz. Süre otomatik olarak durdurulur ve oyunekipman.com teknik moderasyon ekibi satıcı beyanı ile kanıtları inceleyerek iade sürecini başlatır.',
  },
  {
    id: 'f3',
    category: 'escrow',
    question: '48 saat içinde onay vermeyi unutursam ne olur?',
    answer:
      'Kargo teslimatından itibaren 48 saat boyunca herhangi bir itiraz bildirilmezse, sistem alıcının üründen memnun kaldığını varsayarak siparişi otomatik tamamlar ve satıcı hakedişini serbest bırakır.',
  },
  // Satıcı Olma & Komisyonlar
  {
    id: 'f4',
    category: 'sellers',
    question: 'Kimler oyunekipman.com\'da satıcı olabilir ve mağaza açabilir?',
    answer:
      'Bireysel oyuncular (C2C) T.C. Kimlik doğrulaması yaparak kendi donanımlarını satabilir. Vergi mükellefi olan şirketler (B2C) ise vergi levhası ibraz ederek Yetkili Kurumsal Mağaza statüsüyle sıfır ve faturalı ürün listeleyebilir. Tüm başvurular yönetim paneli denetiminden geçer.',
  },
  {
    id: 'f5',
    category: 'sellers',
    question: 'Satıcı komisyon oranları ne kadardır ve nasıl düşer?',
    answer:
      'Komisyon oranlarımız şeffaf ve kademelidir: Yeni satıcılar (Bronz) %10 ile başlar. Başarılı satışlar ve yüksek müşteri puanlarıyla Gümüş (%8) ve Altın (%6) seviyelerine yükselirsiniz. Kurumsal mağazalar ise %5 sabit komisyon avantajından yararlanır.',
  },
  {
    id: 'f6',
    category: 'sellers',
    question: 'Kazancım hesabıma ne zaman ve nasıl yatar?',
    answer:
      'Alıcı siparişi onayladığında veya 48 saatlik test süresi sorunsuz tamamlandığında, platform komisyonu kesilir ve kalan net tutar satıcının profilinde kayıtlı IBAN hesabına aynı gün EFT/FAST ile transfer edilir.',
  },
  // Kargo & Lojistik
  {
    id: 'f7',
    category: 'shipping',
    question: 'Kargo süreci nasıl işler? Anlaşmalı kod veriliyor mu?',
    answer:
      'Evet. Sipariş verildiği an satıcının paneline otomatik Yurtiçi Kargo anlaşmalı gönderi barkodu oluşturulur. Satıcı hiçbir kargo ücreti ödemeden paketi şubeye teslim eder. Alıcı da panelinden anlık kargo hareketlerini izler.',
  },
  {
    id: 'f8',
    category: 'shipping',
    question: 'Donanım kargoda hasar görürse sorumluluk kimdedir?',
    answer:
      'Tüm gönderiler anlaşmalı kargo sigortası kapsamındadır. Satıcılarımızdan ürünü koruyucu balonlu ambalajla paketlemelerini şart koşuyoruz. Kargo teslim alınırken tutanak tutulduğu takdirde kargo tazmin süreci tarafımızca yürütülür.',
  },
  // Dijital Kodlar & Lisanslar
  {
    id: 'f9',
    category: 'digital',
    question: 'Dijital oyun keyleri ve e-pinler nasıl teslim edilir?',
    answer:
      'Dijital ürünler ödemenin onaylanmasının hemen ardından saniyeler içinde panelinize tanımlanır. Steam, Riot Games veya Epic Games üzerinde anında etkinleştirebilirsiniz.',
  },
  {
    id: 'f10',
    category: 'digital',
    question: 'Dijital kod geçersiz veya kullanılmış çıkarsa ne olur?',
    answer:
      'Tüm dijital yetkili satıcılarımız anında kod yenileme taahhüdü altındadır. Satıcı 15 dakika içinde geçerli bir yeni kod sağlayamazsa ödemeniz anında kartınıza iade edilir.',
  },
  // İade & Uyuşmazlıklar
  {
    id: 'f11',
    category: 'disputes',
    question: 'Keyfi cayma hakkı ikinci el ürünlerde geçerli midir?',
    answer:
      '6502 sayılı Tüketici Kanunu gereği bireysel ikinci el (C2C) satışlarda sadece "kusur ve beyan uyuşmazlığı" durumunda iade hakkı bulunur. Kurumsal mağazalardan (B2C) alınan sıfır ürünlerde ise 14 günlük yasal cayma hakkı saklıdır.',
  },
  {
    id: 'f12',
    category: 'disputes',
    question: 'Uyuşmazlık durumunda kararı kim verir?',
    answer:
      'oyunekipman.com Donanım Tahkim Heyeti; satıcının yüklediği benchmark/fotoğraflar ile alıcının ilettiği video kanıtlarını teknik kriterlere göre inceler. Gerekli durumlarda cihaz bağımsız test merkezimize yönlendirilir.',
  },
];

export const FaqPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('f1');

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      if (!searchQuery.trim()) return matchesCat;
      const q = searchQuery.toLocaleLowerCase('tr-TR');
      const matchesSearch =
        item.question.toLocaleLowerCase('tr-TR').includes(q) ||
        item.answer.toLocaleLowerCase('tr-TR').includes(q);
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Yardım & Destek Merkezi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Sıkça Sorulan Sorular
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          48 saatlik donanım test prosedüründen satıcı komisyonlarına, kargo kodlarından dijital lisans garantisine kadar merak ettiğiniz her soru.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Soru veya anahtar kelime arayın (örn: 48 saat, iade, kargo, komisyon)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex justify-center flex-wrap gap-2 text-xs font-bold">
        {[
          { key: 'all', label: 'Tüm Sorular' },
          { key: 'escrow', label: '48 Saat Test & Escrow' },
          { key: 'sellers', label: 'Satıcı Olma & Komisyon' },
          { key: 'shipping', label: 'Kargo & Teslimat' },
          { key: 'digital', label: 'Dijital Kodlar & Lisans' },
          { key: 'disputes', label: 'İade & Uyuşmazlıklar' },
        ].map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveCategory(c.key)}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeCategory === c.key
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            Aramanızla eşleşen soru bulunamadı. Lütfen farklı kelimelerle deneyin.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => setExpandedId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-850"
                >
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Contact Help Card */}
      <div className="p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/40 bg-gradient-to-r from-indigo-50/60 via-purple-50/40 to-white dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-slate-900 text-center space-y-3">
        <h3 className="text-lg font-black text-slate-900 dark:text-white">
          Sorunuzun Cevabını Bulamadınız mı?
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          7/24 teknik moderasyon ve donanım inceleme birimimizle doğrudan iletişime geçebilirsiniz.
        </p>
        <div className="pt-2">
          <a
            href="mailto:destek@oyunekipman.com"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Destek Ekibine E-Posta Gönder</span>
          </a>
        </div>
      </div>
    </div>
  );
};
