import React, { createContext, useContext, useState, useEffect } from 'react';
import { CameraProduct, Article, MediaAsset, SiteSettings, AffiliateClickLog } from '../types';
import { initialCameras, initialArticles, initialMediaAssets, initialSiteSettings } from '../data/initialData';

interface DataContextType {
  cameras: CameraProduct[];
  articles: Article[];
  mediaAssets: MediaAsset[];
  siteSettings: SiteSettings;
  affiliateClicks: AffiliateClickLog[];
  currentView: string;
  activeSlug: string | null;
  adminTab: string;
  editingArticleId: string | null;
  editingCameraId: string | null;
  comparedCameraIds: string[];
  searchModalOpen: boolean;
  searchQuery: string;
  selectedCategory: string | null;
  
  // Navigation
  navigateTo: (view: string, slug?: string) => void;
  setAdminTab: (tab: string) => void;
  setEditingArticleId: (id: string | null) => void;
  setEditingCameraId: (id: string | null) => void;
  setComparedCameraIds: (ids: string[]) => void;
  toggleCompareCamera: (id: string) => void;
  setSearchModalOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string | null) => void;

  // CRUD for Articles
  saveArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  togglePublishArticle: (id: string) => void;
  getArticleBySlug: (slug: string) => Article | undefined;

  // CRUD for Cameras
  saveCamera: (camera: CameraProduct) => void;
  deleteCamera: (id: string) => void;
  getCameraBySlug: (slug: string) => CameraProduct | undefined;
  getCameraById: (id: string) => CameraProduct | undefined;

  // Affiliate Management
  updateAffiliateLink: (productId: string, linkId: string, newUrl: string, newPrice?: number, inStock?: boolean) => void;
  recordAffiliateClick: (productId: string, retailer: string, sourceType: 'article' | 'product_page' | 'comparison' | 'landing_card' | 'quick_finder', sourceSlug?: string) => void;
  
  // Media & Settings
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>) => void;
  deleteMediaAsset: (id: string) => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  resetToDemoData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CAMERAS: 'focalpoint_cameras_v1',
  ARTICLES: 'focalpoint_articles_v1',
  MEDIA: 'focalpoint_media_v1',
  SETTINGS: 'focalpoint_settings_v1',
  CLICKS: 'focalpoint_clicks_v1',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Primary state initialized from localStorage if available
  const [cameras, setCameras] = useState<CameraProduct[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CAMERAS);
      return saved ? JSON.parse(saved) : initialCameras;
    } catch {
      return initialCameras;
    }
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      return saved ? JSON.parse(saved) : initialArticles;
    } catch {
      return initialArticles;
    }
  });

  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEDIA);
      return saved ? JSON.parse(saved) : initialMediaAssets;
    } catch {
      return initialMediaAssets;
    }
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : initialSiteSettings;
    } catch {
      return initialSiteSettings;
    }
  });

  const [affiliateClicks, setAffiliateClicks] = useState<AffiliateClickLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CLICKS);
      return saved ? JSON.parse(saved) : [
        { id: 'c-1', productId: 'fuji-x100vi', productName: 'Fujifilm X100VI', retailer: 'Amazon', sourceType: 'article', sourceSlug: 'best-street-photography-cameras-2026', timestamp: '2026-09-02 18:24' },
        { id: 'c-2', productId: 'sony-a7iv', productName: 'Sony Alpha 7 IV', retailer: 'B&H Photo', sourceType: 'comparison', sourceSlug: 'sony-a7iv-vs-canon-r6-mark-ii-comparison', timestamp: '2026-09-02 19:12' },
        { id: 'c-3', productId: 'fuji-x100vi', productName: 'Fujifilm X100VI', retailer: 'B&H Photo', sourceType: 'landing_card', timestamp: '2026-09-02 20:01' },
      ];
    } catch {
      return [];
    }
  });

  // Navigation State
  const [currentView, setCurrentView] = useState<string>('landing');
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [adminTab, setAdminTab] = useState<string>('dashboard');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [editingCameraId, setEditingCameraId] = useState<string | null>(null);
  const [comparedCameraIds, setComparedCameraIds] = useState<string[]>(['sony-a7iv', 'canon-r6-ii']);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CAMERAS, JSON.stringify(cameras));
    } catch (e) {
      console.error('Failed to persist cameras', e);
    }
  }, [cameras]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
    } catch (e) {
      console.error('Failed to persist articles', e);
    }
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(mediaAssets));
    } catch (e) {
      console.error('Failed to persist media', e);
    }
  }, [mediaAssets]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(siteSettings));
    } catch (e) {
      console.error('Failed to persist settings', e);
    }
  }, [siteSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CLICKS, JSON.stringify(affiliateClicks));
    } catch (e) {
      console.error('Failed to persist affiliate clicks', e);
    }
  }, [affiliateClicks]);

  // Handle URL hash changes for back/forward navigation support
  const navigateTo = (view: string, slug?: string) => {
    setCurrentView(view);
    setActiveSlug(slug || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCompareCamera = (id: string) => {
    setComparedCameraIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= 3) {
          return [prev[1], prev[2], id];
        }
        return [...prev, id];
      }
    });
  };

  // Article operations
  const saveArticle = (article: Article) => {
    setArticles((prev) => {
      const idx = prev.findIndex((a) => a.id === article.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...article, updatedAt: new Date().toISOString().split('T')[0] };
        return updated;
      }
      return [{ ...article, publishedAt: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString().split('T')[0] }, ...prev];
    });
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const togglePublishArticle = (id: string) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === 'published' ? 'draft' : 'published' } : a
      )
    );
  };

  const getArticleBySlug = (slug: string) => {
    return articles.find((a) => a.slug === slug);
  };

  // Camera operations
  const saveCamera = (camera: CameraProduct) => {
    setCameras((prev) => {
      const idx = prev.findIndex((c) => c.id === camera.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = camera;
        return updated;
      }
      return [camera, ...prev];
    });
  };

  const deleteCamera = (id: string) => {
    setCameras((prev) => prev.filter((c) => c.id !== id));
  };

  const getCameraBySlug = (slug: string) => {
    return cameras.find((c) => c.slug === slug);
  };

  const getCameraById = (id: string) => {
    return cameras.find((c) => c.id === id);
  };

  // Affiliate operations
  const updateAffiliateLink = (productId: string, linkId: string, newUrl: string, newPrice?: number, inStock?: boolean) => {
    setCameras((prev) =>
      prev.map((cam) => {
        if (cam.id !== productId) return cam;
        return {
          ...cam,
          affiliateLinks: cam.affiliateLinks.map((link) => {
            if (link.id !== linkId) return link;
            return {
              ...link,
              url: newUrl,
              price: newPrice !== undefined ? newPrice : link.price,
              inStock: inStock !== undefined ? inStock : link.inStock,
            };
          }),
        };
      })
    );
  };

  const recordAffiliateClick = (
    productId: string,
    retailer: string,
    sourceType: 'article' | 'product_page' | 'comparison' | 'landing_card' | 'quick_finder',
    sourceSlug?: string
  ) => {
    const product = cameras.find((c) => c.id === productId);
    const log: AffiliateClickLog = {
      id: 'click-' + Date.now(),
      productId,
      productName: product?.name || 'Camera Gear',
      retailer,
      sourceType,
      sourceSlug,
      timestamp: new Date().toLocaleString(),
    };

    setAffiliateClicks((prev) => [log, ...prev.slice(0, 199)]);

    // Increment article click stat if triggered from an article
    if (sourceType === 'article' && sourceSlug) {
      setArticles((prev) =>
        prev.map((art) =>
          art.slug === sourceSlug ? { ...art, affiliateClicks: (art.affiliateClicks || 0) + 1 } : art
        )
      );
    }
  };

  // Media operations
  const addMediaAsset = (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>) => {
    const newAsset: MediaAsset = {
      ...asset,
      id: 'm-' + Date.now(),
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setMediaAssets((prev) => [newAsset, ...prev]);
  };

  const deleteMediaAsset = (id: string) => {
    setMediaAssets((prev) => prev.filter((m) => m.id !== id));
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...settings }));
  };

  const resetToDemoData = () => {
    setCameras(initialCameras);
    setArticles(initialArticles);
    setMediaAssets(initialMediaAssets);
    setSiteSettings(initialSiteSettings);
    setAffiliateClicks([]);
    localStorage.removeItem(STORAGE_KEYS.CAMERAS);
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.MEDIA);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.CLICKS);
  };

  return (
    <DataContext.Provider
      value={{
        cameras,
        articles,
        mediaAssets,
        siteSettings,
        affiliateClicks,
        currentView,
        activeSlug,
        adminTab,
        editingArticleId,
        editingCameraId,
        comparedCameraIds,
        searchModalOpen,
        searchQuery,
        selectedCategory,
        navigateTo,
        setAdminTab,
        setEditingArticleId,
        setEditingCameraId,
        setComparedCameraIds,
        toggleCompareCamera,
        setSearchModalOpen,
        setSearchQuery,
        setSelectedCategory,
        saveArticle,
        deleteArticle,
        togglePublishArticle,
        getArticleBySlug,
        saveCamera,
        deleteCamera,
        getCameraBySlug,
        getCameraById,
        updateAffiliateLink,
        recordAffiliateClick,
        addMediaAsset,
        deleteMediaAsset,
        updateSiteSettings,
        resetToDemoData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
