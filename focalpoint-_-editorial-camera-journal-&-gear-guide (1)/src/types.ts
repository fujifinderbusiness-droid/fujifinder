export type CameraCategory = 
  | 'Full-Frame Mirrorless'
  | 'APS-C Mirrorless'
  | 'Compact & Street'
  | 'Medium Format'
  | 'Cinema & Video'
  | 'DSLR'
  | 'Action Camera'
  | 'Vlogging'
  | 'Accessories';

export type ArticleCategory =
  | 'Camera Guides'
  | 'Reviews'
  | 'Comparisons'
  | 'Photography'
  | 'Videography'
  | 'Vlogging'
  | 'Beginner Guides'
  | 'Accessories'
  | 'Guides';

export interface CameraSpecs {
  sensor: string; // e.g. "40.2MP APS-C X-Trans CMOS 5 HR"
  sensorFormat: 'Full-Frame' | 'APS-C' | 'Medium Format' | 'Micro Four Thirds' | '1-inch';
  mount: string; // e.g. "Fujifilm X-Mount" or "Fixed 23mm f/2"
  megapixels: number;
  isoRange: string; // "125 - 12,800 (Exp. 64 - 51,200)"
  autofocus: string; // "Intelligent Hybrid AF with AI Subject Detection"
  ibis: string; // "5-axis In-Body Image Stabilization (up to 6.0 stops)"
  continuousShooting: string; // "Up to 20 fps electronic, 11 fps mechanical"
  videoSpecs: string; // "6.2K/30p, 4K/60p, 10-bit 4:2:2 internal"
  viewfinder: string; // "3.69m-dot OLED EVF / Optical Hybrid"
  rearDisplay: string; // "3.0-inch 1.62m-dot tilting touchscreen"
  batteryLife: string; // "Approx. 450 frames (NP-W126S)"
  weight: string; // "521g (with battery and card)"
  dimensions: string; // "128 x 74.8 x 55.3 mm"
  weatherSealing: string; // "Yes (with adapter ring and protect filter)"
  memorySlots: string; // "Single UHS-I SD"
  connectivity: string; // "Wi-Fi, Bluetooth 4.2, USB-C 3.2, Micro-HDMI"
}

export interface AffiliateRetailerLink {
  id: string;
  retailer: 'Amazon' | 'B&H Photo' | 'Adorama' | 'Moment' | 'MPB (Used)';
  url: string;
  price: number;
  currency: string;
  inStock: boolean;
  badge?: string;
}

export interface CameraProduct {
  id: string;
  name: string;
  slug: string;
  brand: 'Fujifilm' | 'Sony' | 'Canon' | 'Nikon' | 'Leica' | 'Panasonic' | 'Ricoh' | 'GoPro' | 'DJI';
  category: CameraCategory;
  price: number;
  priceRange?: string;
  rating: number; // e.g. 9.4
  scoreBreakdown: {
    imageQuality: number;
    autofocus: number;
    buildErgonomics: number;
    videoFeatures: number;
    valueForMoney: number;
  };
  image: string;
  secondaryImages?: string[];
  idealUseCase: string; // e.g. "Travel, Documentary & Everyday Carry"
  shortDescription: string;
  editorialOverview: string;
  whoIsThisFor: string;
  pros: string[];
  cons: string[];
  specs: CameraSpecs;
  affiliateLinks: AffiliateRetailerLink[];
  featured?: boolean;
  editorsChoice?: boolean;
  bestForBadge?: string; // e.g. "Best for Street Photography"
  releaseYear: number;
  relatedArticleSlugs: string[];
  relatedProductIds: string[];
}

export type ArticleBlockType = 
  | 'paragraph'
  | 'heading2'
  | 'heading3'
  | 'image'
  | 'quote'
  | 'product_card'
  | 'comparison_table'
  | 'pros_cons'
  | 'affiliate_cta'
  | 'callout';

export interface ArticleBlock {
  id: string;
  type: ArticleBlockType;
  text?: string;
  authorQuote?: string;
  imageUrl?: string;
  imageCaption?: string;
  imageAlt?: string;
  productId?: string; // Links dynamically to CameraProduct
  productNote?: string;
  productBadge?: string;
  comparedProductIds?: string[];
  calloutType?: 'editorial' | 'tip' | 'warning' | 'gear-note';
  pros?: string[];
  cons?: string[];
  subjectName?: string;
  ctaText?: string;
  ctaSubtext?: string;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  category: ArticleCategory;
  coverImage: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readTimeMinutes: number;
  featured?: boolean;
  status: 'published' | 'draft';
  views: number;
  affiliateClicks: number;
  seo: SEOData;
  blocks: ArticleBlock[];
  tableOfContents?: { id: string; title: string; level: number }[];
  featuredCameraIds: string[]; // Dynamically attached camera products
  relatedArticleSlugs: string[];
}

export interface AffiliateClickLog {
  id: string;
  productId: string;
  productName: string;
  retailer: string;
  sourceType: 'article' | 'product_page' | 'comparison' | 'landing_card' | 'quick_finder';
  sourceSlug?: string;
  timestamp: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  url: string;
  category: 'camera' | 'article' | 'sample_shot' | 'banner';
  dimensions: string;
  fileSize: string;
  uploadedAt: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  siteUrl: string;
  affiliateDisclosureText: string;
  amazonAssociateTag: string;
  bhPhotoTag: string;
  contactEmail: string;
  currencySymbol: string;
  enableClickTracking: boolean;
}
