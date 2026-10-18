import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Mail, MapPin, Sparkles, Store, Building2, HelpCircle, Cpu, Calendar } from 'lucide-react';
import { BrandingSettings } from '../types';

interface FooterProps {
  theme: 'light' | 'dark';
  onNavigate: (page: string) => void;
  isAdmin: boolean;
  branding?: BrandingSettings;
}

export const Footer: React.FC<FooterProps> = ({ theme, onNavigate, isAdmin, branding }) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Brand Info (No text beside logo, purely the scaled PNG) */}
          <div className="space-y-3 md:col-span-2">
            <button
              onClick={() => onNavigate('home')}
              className="text-left focus:outline-none cursor-pointer"
            >
              <Logo theme={theme} size="md" branding={branding} location="footer" />
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm pt-1">
              Türkiye'nin ilk dikey oyun donanımı ve dijital kod pazaryeri. Doğrulanmış teknik parametreler, 48 saatlik donanım test hakkı ve şeffaf satıcı komisyon mimarisi.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>ETBİS & 6563 Sayılı E-Ticaret Kanunu Uyumlu Altyapı</span>
            </div>
          </div>

          {/* Kolon 1: Kurumsal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Kurumsal
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Hakkımızda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('team')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Ekibimiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('partners')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  İş Ortaklarımız
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('creators')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold cursor-pointer"
                >
                  <span>✨ İçerik Üreticileri & Espor</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  İletişim
                </button>
              </li>
            </ul>
          </div>

          {/* Kolon 2: Mağaza & Destek */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Mağaza & Destek
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('become-seller')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 font-bold text-emerald-600 dark:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Mağaza Aç / Satıcı Ol</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('create-listing')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  İlan Verme Sihirbazı
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Yardım & SSS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('seller-dashboard')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Kademeli Satıcı Oranları (%10-%5)
                </button>
              </li>
              {isAdmin && (
                <li>
                  <button
                    onClick={() => onNavigate('admin')}
                    className="text-purple-600 dark:text-purple-400 font-bold hover:underline cursor-pointer"
                  >
                    👑 Yönetim Paneli
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Kolon 3: Hızlı Linkler (Replacing Tescil & IP) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Hızlı Linkler
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('ai-studio')}
                  className="hover:text-purple-600 dark:hover:text-purple-400 font-semibold text-purple-600 dark:text-purple-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Donanım Stüdyosu</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rent-to-own')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>"Dene-Bunu" Kiralama</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('physical')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Tüm Donanım Kataloğu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('digital')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Dijital Lisans & E-Pin
                </button>
              </li>
              <li>
                <span className="text-[11px] text-slate-400 block pt-1">
                  Kadıköy / İstanbul
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal Links and Ecosystem Brands */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              © 2026 oyunekipman.com. Tüm hakları saklıdır.
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-800 dark:hover:text-white cursor-pointer">Kullanıcı Sözleşmesi</span>
              <span>·</span>
              <span className="hover:text-slate-800 dark:hover:text-white cursor-pointer">KVKK Aydınlatma Metni</span>
              <span>·</span>
              <span className="hover:text-slate-800 dark:hover:text-white cursor-pointer">48 Saat Escrow Prosedürü</span>
            </div>
          </div>

          {/* Ecosystem Brands line requested by user */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-850 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] text-slate-400">
            <span className="font-semibold text-slate-500">Ekosistem Markalarımız:</span>
            <span>·</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-300">Çağdaş Müzik Platformu</span>
            <span>·</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-300">Parantez Derneği</span>
            <span>·</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">oyunekipman.com</span>
            <span>·</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-300">ranktahmin.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
