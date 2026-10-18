export type ProductType = 'PHYSICAL' | 'DIGITAL';

export type SellerType = 'INDIVIDUAL_C2C' | 'VERIFIED_B2C';

export type SellerTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'CORPORATE';

export interface SellerTierInfo {
  tier: SellerTier;
  label: string;
  commissionRate: number; // e.g. 0.10 for 10%
  description: string;
  badgeColor: string;
  perks: string[];
  minSales: number;
  minRating: number;
}

export type MainCategory = 
  | 'keyboards'
  | 'mice'
  | 'audio'
  | 'pc_parts'
  | 'monitors'
  | 'consoles'
  | 'games_keys'
  | 'epins'
  | 'skins_cosmetics';

export interface CategoryDef {
  id: MainCategory;
  name: string;
  type: ProductType;
  iconName: string;
  description: string;
}

export type ItemCondition = 
  | 'NEW_SEALED'       // Sıfır Kapalı Kutu
  | 'NEW_OPEN_BOX'     // Sıfır Açık Kutu
  | 'USED_MINT'        // 2. El Kusursuz
  | 'USED_VERY_GOOD'   // 2. El Çok İyi
  | 'USED_GOOD'        // 2. El İyi
  | 'FOR_PARTS';       // Parça Amaçlı

export interface ProductReview {
  id: string;
  authorName: string;
  authorUsername: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
  productTitle?: string;
}

export interface SellerProfile {
  id: string;
  name: string;
  username: string;
  type: SellerType;
  tier: SellerTier;
  rating: number;
  reviewCount: number;
  completedSales: number;
  joinedDate: string;
  isNviVerified: boolean; // TCKN doğrulaması
  corporateTaxNo?: string;
  city: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  reviews?: ProductReview[];
  isApprovedSeller?: boolean; // Satıcı onay statüsü
}

export interface SellerApplication {
  id: string;
  applicantName: string;
  username: string;
  email: string;
  phone: string;
  sellerType: SellerType;
  storeName: string;
  city: string;
  taxNumber?: string;
  idNumber?: string;
  iban: string;
  experienceBio: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface BrandingSettings {
  lightLogoUrl: string;
  darkLogoUrl: string;
  navbarLogoUrl?: string;
  footerLogoUrl?: string;
  faviconUrl: string;
  brandTitle: string;
  brandSubtitle: string;
}

export interface TeamMemberCompact {
  id: string;
  name: string;
  role: string;
  department: 'management' | 'lab' | 'esports' | 'tech' | 'legal';
  departmentLabel: string;
  location: string;
  avatarUrl: string;
  linkedinUrl: string;
}

export interface ProductSpecs {
  // Klavye
  switchType?: string;
  isHotSwap?: boolean;
  keyboardLayout?: string;
  // Mouse
  sensorModel?: string;
  maxDpi?: number;
  pollingRate?: string;
  weightGrams?: number;
  // Monitör
  panelType?: 'IPS' | 'Fast-IPS' | 'VA' | 'OLED' | 'QD-OLED' | 'TN';
  refreshRateHz?: number;
  responseTimeMs?: string;
  deadPixelStatus?: string;
  // Ekran Kartı & PC
  vramGb?: number;
  miningHistory?: 'Hayır (Yalnızca Oyun)' | 'Evet (Kısa Süreli)' | 'Bilinmiyor';
  furmarkMaxTemp?: string;
  thermalPasteRenewed?: boolean;
  // Dijital
  platform?: 'Steam' | 'Riot Games' | 'Epic Games' | 'PlayStation Network' | 'Xbox Live' | 'Diğer';
  region?: 'Türkiye / Global' | 'TR Yalnızca' | 'EU Yalnızca';
  deliveryType?: 'Anında Otomatik Kod' | '15 Dakika Manuel Teslimat';
  warrantyMonths?: number;
}

export interface Product {
  id: string;
  title: string;
  type: ProductType;
  category: MainCategory;
  price: number;
  originalPrice?: number;
  condition: ItemCondition;
  seller: SellerProfile;
  imageUrl: string;
  secondaryImages?: string[];
  description: string;
  specs: ProductSpecs;
  stock: number;
  createdAt: string;
  views: number;
  isFeatured?: boolean;
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  platformCommission: number;
  sellerEarnings: number;
  status: 'PENDING_PAYMENT' | 'PAYMENT_RECEIVED' | 'SHIPPED' | 'TESTING_48H' | 'COMPLETED' | 'DISPUTED';
  createdAt: string;
  trackingCode?: string;
  shippingCarrier?: string;
  buyerName: string;
}
