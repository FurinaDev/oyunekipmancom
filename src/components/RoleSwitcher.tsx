import React from 'react';
import { SellerProfile, SellerTier } from '../types';
import { MOCK_SELLERS, SELLER_TIERS } from '../data/mockData';
import { X, UserCircle2, Check, ShieldCheck, Building2, Award } from 'lucide-react';

interface RoleSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  currentSeller: SellerProfile;
  onSelectRole: (seller: SellerProfile, roleName: string) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
  isOpen,
  onClose,
  currentSeller,
  onSelectRole,
}) => {
  if (!isOpen) return null;

  const roles = [
    {
      seller: MOCK_SELLERS.mertekipman,
      roleName: 'Alıcı / FPS Oyuncusu (Mert)',
      roleBadge: 'Alıcı Modu',
      description: 'Ekipman arayan ve 48 saatlik donanım test güvencesinden yararlanan alıcı deneyimi.',
    },
    {
      seller: MOCK_SELLERS.proesport,
      roleName: 'Bireysel Satıcı: Deniz (Altın Seviye)',
      roleBadge: 'Altın Satıcı (%6)',
      description: '20+ satış yapmış, yüksek puanlı esporcu; indirimli %6 komisyon avantajından yararlanır.',
    },
    {
      seller: MOCK_SELLERS.acemioyuncu,
      roleName: 'Bireysel Satıcı: Burak (Bronz Seviye)',
      roleBadge: 'Bronz Satıcı (%10)',
      description: 'İlk kez konsolunu satan yeni kullanıcı; standart %10 komisyon oranı uygulanır.',
    },
    {
      seller: MOCK_SELLERS.wraithtech,
      roleName: 'Kurumsal Mağaza: GearMaster Ltd. (B2C)',
      roleBadge: 'Kurumsal (%5)',
      description: 'Yetkili distribütör; faturalı sıfır ürünler satar ve %5 avantajlı kurumsal komisyon öder.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Kullanıcı Rolü & Deneyim Değiştirici
            </h3>
            <p className="text-xs text-slate-500">
              Platformdaki alıcı, satıcı seviyeleri ve B2C kurumsal rolleri arasında geçiş yapın.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles List */}
        <div className="p-4 sm:p-6 space-y-3 max-h-[65vh] overflow-y-auto">
          {roles.map((r, idx) => {
            const isSelected = currentSeller.id === r.seller.id;
            const tier = SELLER_TIERS[r.seller.tier];
            return (
              <div
                key={idx}
                onClick={() => {
                  onSelectRole(r.seller, r.roleName);
                  onClose();
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {r.roleName}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${tier.badgeColor}`}>
                        {r.roleBadge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-center text-xs text-slate-500">
          Rol değiştirdiğinizde ilan verme sihirbazı ve komisyon hesaplayıcı seçili seviyeye göre otomatik güncellenir.
        </div>
      </div>
    </div>
  );
};
