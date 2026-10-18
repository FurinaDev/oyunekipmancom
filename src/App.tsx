import React, { useState, useEffect } from 'react';
import {
  Product,
  ProductType,
  SellerType,
  MainCategory,
  CartItem,
  Order,
  SellerProfile,
  SellerApplication,
  BrandingSettings,
  ProductReview,
  SellerTier
} from './types';
import { INITIAL_PRODUCTS, MOCK_SELLERS, SELLER_TIERS } from './data/mockData';
import { LOGO_PRESETS } from './data/logoPresets';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { ContactPage } from './pages/ContactPage';
import { CreatorsPage } from './pages/CreatorsPage';
import { BusinessPartnersPage } from './pages/BusinessPartnersPage';
import { BecomeSellerPage } from './pages/BecomeSellerPage';
import { CreateListingPage } from './pages/CreateListingPage';
import { ProfilePage } from './pages/ProfilePage';
import { FaqPage } from './pages/FaqPage';
import { AiStudioPage } from './pages/AiStudioPage';
import { RentToOwnPage } from './pages/RentToOwnPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { SellerDashboard } from './components/SellerDashboard';
import { ProductCatalog } from './components/ProductCatalog';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

const INITIAL_APPLICATIONS: SellerApplication[] = [
  {
    id: 'app_1',
    applicantName: 'Alperen Çakır',
    storeName: 'Çakır Espor Donanım A.Ş.',
    username: 'cakir_esport',
    email: 'alperen@cakirdonanim.com',
    phone: '0532 456 78 90',
    sellerType: 'VERIFIED_B2C',
    city: 'İstanbul',
    taxNumber: '1940294812',
    iban: 'TR44 0006 2000 1111 2222 3333 44',
    experienceBio: 'Kadıköy merkezli bilgisayar donanımı ve periferi perakendecisiyiz. Sıfır garantili mekanik klavye ve fare satışı yapacağız.',
    status: 'PENDING',
    createdAt: '2026-03-14',
  },
  {
    id: 'app_2',
    applicantName: 'Burak Keskin',
    storeName: 'Burak FPS Vault',
    username: 'burak_fps',
    email: 'burak.keskin@gmail.com',
    phone: '0544 333 22 11',
    sellerType: 'INDIVIDUAL_C2C',
    city: 'İzmir',
    idNumber: '29481039482',
    iban: 'TR12 0001 5000 9999 8888 7777 66',
    experienceBio: 'Yarı profesyonel Valorant oyuncusuyum. Elimdeki yedek ZOWIE fareleri ve Artisan mousepadleri satmak istiyorum.',
    status: 'PENDING',
    createdAt: '2026-03-15',
  },
];

export default function App() {
  // Theme state: Default is LIGHT mode, as explicitly requested by user
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('oe_theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('oe_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Dynamic Branding State (User can select preset or upload custom PNG in admin panel)
  const [branding, setBranding] = useState<BrandingSettings>(() => {
    const saved = localStorage.getItem('oe_branding');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      lightLogoUrl: LOGO_PRESETS[0].url, // 1250x720_beyaz
      darkLogoUrl: LOGO_PRESETS[1].url,  // 1250x720_siyah
      navbarLogoUrl: LOGO_PRESETS[0].url,
      footerLogoUrl: LOGO_PRESETS[1].url,
      faviconUrl: LOGO_PRESETS[2].url,
      brandTitle: 'OYUN EKİPMAN',
      brandSubtitle: 'Türkiye Donanım & Dijital Pazaryeri',
    };
  });

  const handleUpdateBranding = (newBranding: BrandingSettings) => {
    setBranding(newBranding);
    localStorage.setItem('oe_branding', JSON.stringify(newBranding));
  };

  // Page Routing state
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [catalogCategoryFilter, setCatalogCategoryFilter] = useState<'ALL' | MainCategory>('ALL');
  const [selectedProfileSeller, setSelectedProfileSeller] = useState<SellerProfile | null>(null);

  // Products state
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  // Seller Applications state
  const [sellerApplications, setSellerApplications] = useState<SellerApplication[]>(INITIAL_APPLICATIONS);

  // Cart & Order state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // User & Auth State (Starts with Efe Özkan for full admin/seller preview)
  const [currentUser, setCurrentUser] = useState<SellerProfile | null>({
    id: 'admin_efe',
    name: 'Efe Özkan',
    username: 'efeozkan',
    type: 'INDIVIDUAL_C2C',
    tier: 'GOLD',
    rating: 5.0,
    reviewCount: 42,
    completedSales: 28,
    joinedDate: '2023-01-01',
    isNviVerified: true,
    city: 'İstanbul',
    isApprovedSeller: true,
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(true);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Navigation Helper
  const handleNavigate = (page: string, categoryFilter?: MainCategory) => {
    if (categoryFilter) {
      setCatalogCategoryFilter(categoryFilter);
    } else {
      setCatalogCategoryFilter('ALL');
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product Selection (Goes to dedicated full-page, not popup!)
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to Seller Profile
  const handleNavigateToSellerProfile = (seller: SellerProfile) => {
    setSelectedProfileSeller(seller);
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`"${product.title.slice(0, 30)}..." sepete eklendi.`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Sipariş #${newOrder.id} başarıyla alındı. 48 saatlik kargo ve test kodunuz oluşturuldu.`);
  };

  // Create Listing
  const handleCreateListing = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`"${newProduct.title}" ilanı başarıyla yayına alındı.`);
    setSelectedProduct(newProduct);
    setCurrentPage('product-detail');
  };

  // Apply Seller Handler
  const handleApplySeller = (newApp: SellerApplication) => {
    setSellerApplications((prev) => [newApp, ...prev]);
    showToast(`"${newApp.storeName}" satıcı başvurunuz alındı.`);
  };

  // Admin Seller Approval
  const handleApproveSeller = (appId: string, assignedTier: SellerTier) => {
    setSellerApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'APPROVED' } : a))
    );
    showToast(`Satıcı başvurusu onaylandı (${assignedTier} seviyesi atandı).`);
  };

  const handleRejectSeller = (appId: string) => {
    setSellerApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'REJECTED' } : a))
    );
    showToast('Satıcı başvurusu reddedildi.');
  };

  // Add Review to Product
  const handleAddReview = (productId: string, review: ProductReview) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const reviews = p.reviews || [];
          return { ...p, reviews: [review, ...reviews] };
        }
        return p;
      })
    );
    showToast('Değerlendirmeniz ve yıldız puanınız yayınlandı.');
  };

  // Login handler
  const handleLoginSuccess = (user: SellerProfile, roleLabel: string, adminFlag?: boolean) => {
    setCurrentUser(user);
    setIsAdmin(!!adminFlag || user.name.toLowerCase().includes('efe'));
    showToast(`${user.name} olarak oturum açıldı (${roleLabel}).`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    if (currentPage === 'admin' || currentPage === 'seller-dashboard' || currentPage === 'create-listing') {
      setCurrentPage('home');
    }
    showToast('Oturum kapatıldı.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold shadow-2xl flex items-center gap-2 border border-slate-700 dark:border-slate-300 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
        isAdmin={isAdmin}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        branding={branding}
      />

      {/* Main Page Router */}
      <main className="flex-1">
        {/* 1. Dedicated Product Detail Full-Page View */}
        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            onBack={() => handleNavigate('home')}
            onAddToCart={handleAddToCart}
            onBuyNow={(p) => {
              setIsCartOpen(true);
            }}
            onSelectProduct={handleSelectProduct}
            onNavigateToSellerProfile={handleNavigateToSellerProfile}
            onAddReview={handleAddReview}
          />
        )}

        {/* 2. Home Page */}
        {currentPage === 'home' && (
          <HomePage
            products={products}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onOpenCreateListing={() => handleNavigate('create-listing')}
            onNavigate={handleNavigate}
          />
        )}

        {/* 3. Physical Hardware Filter Catalog */}
        {currentPage === 'physical' && (
          <ProductCatalog
            products={products}
            selectedCategory={catalogCategoryFilter}
            onSelectCategory={(cat) => setCatalogCategoryFilter(cat)}
            productTypeFilter="PHYSICAL"
            sellerTypeFilter="ALL"
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onResetFilters={() => setCatalogCategoryFilter('ALL')}
          />
        )}

        {/* 4. Digital Products Filter Catalog */}
        {currentPage === 'digital' && (
          <ProductCatalog
            products={products}
            selectedCategory={catalogCategoryFilter}
            onSelectCategory={(cat) => setCatalogCategoryFilter(cat)}
            productTypeFilter="DIGITAL"
            sellerTypeFilter="ALL"
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onResetFilters={() => setCatalogCategoryFilter('ALL')}
          />
        )}

        {/* 5. Creators & Streamers Page */}
        {currentPage === 'creators' && (
          <CreatorsPage
            onSelectProduct={handleSelectProduct}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {/* 6. Business Partners Page */}
        {currentPage === 'partners' && <BusinessPartnersPage />}

        {/* 7. AI Hardware Studio Page (New 2026 AI Feature) */}
        {currentPage === 'ai-studio' && (
          <AiStudioPage
            products={products}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onNavigateCatalog={(cat) => handleNavigate('physical', cat as any)}
          />
        )}

        {/* 8. "Dene-Bunu" Equipment Rental & Trial Page */}
        {currentPage === 'rent-to-own' && <RentToOwnPage />}

        {/* 9. Become a Seller / Open Store Page */}
        {currentPage === 'become-seller' && (
          <BecomeSellerPage
            onApplySeller={handleApplySeller}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {/* 10. Full-Page Multi-Step Listing Creation Wizard */}
        {currentPage === 'create-listing' && (
          <CreateListingPage
            currentSeller={currentUser}
            onSubmit={handleCreateListing}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateBecomeSeller={() => handleNavigate('become-seller')}
          />
        )}

        {/* 11. User / Seller / Store Profile Page */}
        {currentPage === 'profile' && (
          <ProfilePage
            seller={selectedProfileSeller || currentUser || MOCK_SELLERS.mertekipman}
            products={products}
            currentUser={currentUser}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onUpdateBio={(bio) => {
              if (currentUser) {
                setCurrentUser({ ...currentUser, bio });
                showToast('Biyografiniz güncellendi.');
              }
            }}
          />
        )}

        {/* 12. About Page */}
        {currentPage === 'about' && <AboutPage />}

        {/* 13. Team Page (Compact LinkedIn-style Grid) */}
        {currentPage === 'team' && <TeamPage />}

        {/* 14. Contact Page */}
        {currentPage === 'contact' && <ContactPage />}

        {/* 15. FAQ & Help Center Page */}
        {(currentPage === 'faq' || currentPage === 'trust-safety') && <FaqPage />}

        {/* 16. Seller Dashboard */}
        {currentPage === 'seller-dashboard' && currentUser && (
          <SellerDashboard
            currentSeller={currentUser}
            sellerProducts={products.filter((p) => p.seller.id === currentUser.id)}
            onOpenCreateListing={() => handleNavigate('create-listing')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {/* 17. Admin Dashboard */}
        {currentPage === 'admin' && isAdmin && (
          <AdminDashboard
            products={products}
            sellerApplications={sellerApplications}
            onApproveProduct={() => {}}
            onRejectProduct={() => {}}
            onApproveSeller={handleApproveSeller}
            onRejectSeller={handleRejectSeller}
            branding={branding}
            onUpdateBranding={handleUpdateBranding}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        theme={theme}
        onNavigate={handleNavigate}
        isAdmin={isAdmin}
        branding={branding}
      />

      {/* Modals & Drawers */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOrderCompleted={handleOrderCompleted}
      />
    </div>
  );
}
