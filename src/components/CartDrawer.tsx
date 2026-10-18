import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight, CheckCircle2, Truck, CreditCard } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOrderCompleted: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [buyerName, setBuyerName] = useState('Mert Aksoy');
  const [buyerPhone, setBuyerPhone] = useState('0532 555 44 33');
  const [shippingAddress, setShippingAddress] = useState('Caferağa Mah. Moda Cad. No:14/2 Kadıköy / İstanbul');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalCommission = items.reduce((acc, item) => {
    const rate = item.product.seller.tier === 'CORPORATE' ? 0.05 : item.product.seller.tier === 'GOLD' ? 0.06 : item.product.seller.tier === 'SILVER' ? 0.08 : 0.10;
    return acc + Math.round(item.product.price * item.quantity * rate);
  }, 0);
  const sellerEarnings = subtotal - totalCommission;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: `OEK-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...items],
      totalAmount: subtotal,
      platformCommission: totalCommission,
      sellerEarnings: sellerEarnings,
      status: 'PAYMENT_RECEIVED',
      createdAt: new Date().toLocaleDateString('tr-TR'),
      trackingCode: `YK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      shippingCarrier: 'Yurtiçi Kargo',
      buyerName: buyerName,
    };

    setLastOrder(newOrder);
    onOrderCompleted(newOrder);
    setStep('success');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {step === 'cart' ? 'Alışveriş Sepeti' : step === 'checkout' ? 'Sipariş & Teslimat' : 'Sipariş Tamamlandı'}
              </h2>
            </div>
            <button
              onClick={() => {
                setStep('cart');
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            {step === 'cart' && (
              <>
                {items.length > 0 ? (
                  <div className="space-y-4">
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      {items.map((item) => (
                        <div key={item.product.id} className="py-3 flex items-center gap-3">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                              {item.product.title}
                            </h4>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              <span>Satıcı: {item.product.seller.name}</span>
                              <span className="mx-1">·</span>
                              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                                {item.product.seller.type === 'VERIFIED_B2C' ? 'Sıfır B2C' : '2. El C2C'}
                              </span>
                            </div>
                            <div className="text-xs font-extrabold text-slate-900 dark:text-white font-mono mt-1">
                              {(item.product.price * item.quantity).toLocaleString('tr-TR')} ₺
                            </div>
                          </div>

                          {/* Stepper & Remove */}
                          <div className="flex items-center gap-1.5">
                            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden text-xs">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, -1)}
                                className="px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                              >
                                -
                              </button>
                              <span className="px-2 py-1 font-mono font-bold text-slate-800 dark:text-slate-200">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, 1)}
                                className="px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Trust Note */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>Korumalı Ödeme & Güvenli Kargo</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        Fiziki ürünlerde teslimat sonrası 48 saat donanım test süresi tanınır; onayınızdan sonra satıcıya aktarılır.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-16 text-center space-y-3">
                    <ShoppingBag className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                      Sepetinizde ürün bulunmamaktadır.
                    </p>
                  </div>
                )}
              </>
            )}

            {step === 'checkout' && (
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Alıcı Ad Soyad</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">İletişim Numarası (SMS Bildirimi İçin)</label>
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Kargo & Teslimat Adresi</label>
                  <textarea
                    rows={3}
                    required
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                {/* Simulated Payment Method */}
                <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-300">
                    <CreditCard className="w-4 h-4" />
                    <span>Ödeme Yöntemi: 3D Secure Kredi / Banka Kartı</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Test ortamı: Gerçek kart bilgisi gerekmez, ödeme anında güvenli havuz hesaba aktarılacaktır.
                  </p>
                </div>
              </form>
            )}

            {step === 'success' && lastOrder && (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Siparişiniz Başarıyla Oluşturuldu!
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Sipariş No: <strong className="font-mono text-slate-900 dark:text-white">{lastOrder.id}</strong>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Kargo Firması:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{lastOrder.shippingCarrier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Takip Kodu:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">{lastOrder.trackingCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ödenen Tutar:</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">{lastOrder.totalAmount.toLocaleString('tr-TR')} ₺</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500">
                  Satıcıya otomatik kargo bildirim kodu gönderildi. Ürününüz kargoya verildiğinde SMS ile bilgilendirileceksiniz.
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && step === 'cart' && (
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-3">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Ara Toplam:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{subtotal.toLocaleString('tr-TR')} ₺</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Kargo Bedeli:</span>
                <span className="font-semibold text-emerald-600">Ücretsiz (Pazaryeri Kampanyası)</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Toplam:</span>
                <span className="font-mono">{subtotal.toLocaleString('tr-TR')} ₺</span>
              </div>

              <button
                onClick={() => setStep('checkout')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <span>Siparişi Tamamla</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 'checkout' && (
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Sepete Dön
              </button>
              <button
                form="checkout-form"
                type="submit"
                className="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Ödemeyi Onayla ({subtotal.toLocaleString('tr-TR')} ₺)
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <button
                onClick={() => {
                  setStep('cart');
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-indigo-600 hover:opacity-90 transition-opacity"
              >
                Alışverişe Devam Et
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
