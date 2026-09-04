import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Camera, 
  Link2, 
  Image as ImageIcon, 
  Layers, 
  Settings, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  ExternalLink, 
  ArrowLeft,
  Save,
  RotateCcw,
  Sparkles,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Article, CameraProduct, ArticleCategory, CameraCategory, ArticleBlock, MediaAsset } from '../types';

export const AdminCMS: React.FC = () => {
  const { 
    cameras, 
    articles, 
    mediaAssets, 
    siteSettings, 
    affiliateClicks,
    adminTab, 
    setAdminTab,
    editingArticleId,
    setEditingArticleId,
    editingCameraId,
    setEditingCameraId,
    saveArticle,
    deleteArticle,
    togglePublishArticle,
    saveCamera,
    deleteCamera,
    updateAffiliateLink,
    addMediaAsset,
    deleteMediaAsset,
    updateSiteSettings,
    resetToDemoData,
    navigateTo
  } = useData();

  // Search & Filter state in CMS
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilterStatus, setActiveFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  // New/Editing Article Form State
  const defaultArticle: Article = {
    id: 'art-' + Date.now(),
    title: '',
    slug: '',
    subtitle: '',
    excerpt: '',
    category: 'Reviews',
    coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Editorial Staff',
      role: 'Staff Writer & Gear Analyst',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'FocalPoint editorial lab researcher and field tester.',
    },
    publishedAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    readTimeMinutes: 7,
    featured: false,
    status: 'published',
    views: 120,
    affiliateClicks: 0,
    seo: {
      metaTitle: '',
      metaDescription: '',
      focusKeyword: '',
    },
    blocks: [
      { id: 'b1', type: 'paragraph', text: 'Write your editorial overview and field test introduction here...' },
      { id: 'b2', type: 'heading2', text: 'Hardware Design & Ergonomics' },
      { id: 'b3', type: 'paragraph', text: 'Detail the tactile feel of the physical dials, grip depth, and chassis materials.' },
    ],
    featuredCameraIds: ['fuji-x100vi'],
    relatedArticleSlugs: [],
  };

  const [articleForm, setArticleForm] = useState<Article>(() => {
    if (editingArticleId) {
      const found = articles.find((a) => a.id === editingArticleId);
      if (found) return JSON.parse(JSON.stringify(found));
    }
    return defaultArticle;
  });

  // New/Editing Camera Form State
  const defaultCamera: CameraProduct = {
    id: 'cam-' + Date.now(),
    name: '',
    slug: '',
    brand: 'Fujifilm',
    category: 'APS-C Mirrorless',
    price: 1499,
    priceRange: '$1,499 – $1,599',
    rating: 9.0,
    scoreBreakdown: {
      imageQuality: 9.2,
      autofocus: 9.0,
      buildErgonomics: 9.1,
      videoFeatures: 8.8,
      valueForMoney: 8.9,
    },
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [],
    idealUseCase: 'Everyday, Travel & Street Photography',
    shortDescription: 'High resolution sensor in a lightweight weather-sealed body.',
    editorialOverview: 'A comprehensive field-tested tool that balances tactile physical dials with modern subject detection autofocus.',
    whoIsThisFor: 'Creative photographers seeking an inspiring everyday camera without unnecessary bulk.',
    pros: ['Stunning color fidelity', 'Fast subject detection autofocus', 'Tactile control dials'],
    cons: ['Single memory card slot', 'Modest battery life under continuous burst'],
    specs: {
      sensor: '26.1MP APS-C X-Trans CMOS',
      sensorFormat: 'APS-C',
      mount: 'Fujifilm X-Mount',
      megapixels: 26.1,
      isoRange: 'ISO 160–12,800',
      autofocus: 'Hybrid Phase Detection AF',
      ibis: '5-Axis In-Body Stabilization',
      continuousShooting: '15 fps mechanical',
      videoSpecs: '4K 60p 10-bit',
      viewfinder: '2.36m-Dot OLED EVF',
      rearDisplay: '3.0-inch Vari-angle Touchscreen',
      batteryLife: 'Approx. 400 frames',
      weight: '478 g with battery',
      dimensions: '126 x 85 x 65 mm',
      weatherSealing: 'Dust and moisture resistant',
      memorySlots: '1x SD (UHS-II)',
      connectivity: 'Wi-Fi, Bluetooth, USB-C, Micro-HDMI',
    },
    affiliateLinks: [
      {
        id: 'aff-' + Date.now(),
        retailer: 'Amazon',
        url: 'https://www.amazon.com?tag=focalpoint-20',
        price: 1499,
        currency: '$',
        inStock: true,
        badge: 'Authorized Stock',
      },
    ],
    featured: false,
    editorsChoice: false,
    releaseYear: 2024,
    relatedArticleSlugs: [],
    relatedProductIds: [],
  };

  const [cameraForm, setCameraForm] = useState<CameraProduct>(() => {
    if (editingCameraId) {
      const found = cameras.find((c) => c.id === editingCameraId);
      if (found) return JSON.parse(JSON.stringify(found));
    }
    return defaultCamera;
  });

  // Media upload input state
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaCategory, setNewMediaCategory] = useState<'camera' | 'article' | 'sample_shot'>('camera');

  // Stats for Dashboard
  const totalArticles = articles.length;
  const publishedArticles = articles.filter((a) => a.status === 'published').length;
  const draftArticles = articles.filter((a) => a.status === 'draft').length;
  const totalCameras = cameras.length;
  const totalClicks = affiliateClicks.length;

  // Handlers for Articles
  const handleStartCreateArticle = () => {
    setEditingArticleId(null);
    setArticleForm({
      ...defaultArticle,
      id: 'art-' + Date.now(),
      publishedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    });
    setAdminTab('article-edit');
  };

  const handleStartEditArticle = (art: Article) => {
    setEditingArticleId(art.id);
    setArticleForm(JSON.parse(JSON.stringify(art)));
    setAdminTab('article-edit');
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title) {
      alert('Please enter an article title.');
      return;
    }
    const slug = articleForm.slug || articleForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const toSave: Article = {
      ...articleForm,
      slug,
      updatedAt: new Date().toISOString().split('T')[0],
      seo: {
        ...articleForm.seo,
        metaTitle: articleForm.seo.metaTitle || articleForm.title,
        metaDescription: articleForm.seo.metaDescription || articleForm.excerpt,
        focusKeyword: articleForm.seo.focusKeyword || articleForm.title.split(' ').slice(0, 3).join(' '),
      },
    };
    saveArticle(toSave);
    alert('Article saved successfully!');
    setAdminTab('articles');
  };

  // Block insertion helper for article editor
  const handleAddBlock = (type: ArticleBlock['type'], extraProps: Partial<ArticleBlock> = {}) => {
    const newBlock: ArticleBlock = {
      id: 'b-' + Date.now(),
      type,
      text: type === 'heading2' ? 'New Section Heading' : type === 'paragraph' ? 'Add paragraph text here...' : undefined,
      ...extraProps,
    };
    setArticleForm((prev) => ({ ...prev, blocks: [...prev.blocks, newBlock] }));
  };

  const handleUpdateBlock = (blockId: string, updates: Partial<ArticleBlock>) => {
    setArticleForm((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === blockId ? { ...b, ...updates } : b)),
    }));
  };

  const handleRemoveBlock = (blockId: string) => {
    setArticleForm((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((b) => b.id !== blockId),
    }));
  };

  // Handlers for Cameras
  const handleStartCreateCamera = () => {
    setEditingCameraId(null);
    setCameraForm({
      ...defaultCamera,
      id: 'cam-' + Date.now(),
    });
    setAdminTab('camera-edit');
  };

  const handleStartEditCamera = (cam: CameraProduct) => {
    setEditingCameraId(cam.id);
    setCameraForm(JSON.parse(JSON.stringify(cam)));
    setAdminTab('camera-edit');
  };

  const handleSaveCamera = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cameraForm.name) {
      alert('Please enter a camera name.');
      return;
    }
    const slug = cameraForm.slug || cameraForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const toSave: CameraProduct = {
      ...cameraForm,
      slug,
    };
    saveCamera(toSave);
    alert('Camera product saved successfully!');
    setAdminTab('cameras');
  };

  // Add media asset
  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaUrl) return;
    addMediaAsset({
      title: newMediaTitle || 'Camera Asset',
      url: newMediaUrl,
      category: newMediaCategory,
      dimensions: '1920x1080',
      fileSize: '1.5 MB',
    });
    setNewMediaUrl('');
    setNewMediaTitle('');
    alert('Media asset added to library!');
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] flex flex-col md:flex-row text-left">
      {/* CMS SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#1A1A1A] text-white p-5 shrink-0 flex flex-col justify-between border-r border-[#262626]">
        <div className="space-y-6">
          {/* Brand & Exit */}
          <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-white text-[#1A1A1A] flex items-center justify-center font-bold text-sm">
                F
              </div>
              <div>
                <span className="font-serif font-normal text-base text-white">FocalPoint</span>
                <span className="block text-[10px] text-[#888] uppercase tracking-[0.2em] font-medium">
                  Editor CMS
                </span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('landing')}
              className="text-xs text-[#888] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Site
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-medium">
            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'articles', label: 'Article & Guide Manager', icon: FileText, count: totalArticles },
              { id: 'cameras', label: 'Camera Gear Catalog', icon: Camera, count: totalCameras },
              { id: 'affiliates', label: 'Affiliate Links Hub', icon: Link2 },
              { id: 'media', label: 'Media Asset Library', icon: ImageIcon },
              { id: 'categories', label: 'Taxonomy & Categories', icon: Layers },
              { id: 'settings', label: 'Platform & SEO Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = adminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAdminTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white text-black font-semibold'
                      : 'text-[#888] hover:bg-[#262626] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 ${isActive ? 'bg-[#1A1A1A] text-white' : 'bg-[#262626] text-[#888]'}`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Footer Action */}
        <div className="pt-6 border-t border-[#262626] text-xs text-[#888] space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span>Affiliate Clicks Logged:</span>
            <span className="font-bold text-white">{totalClicks}</span>
          </div>
          <button
            onClick={resetToDemoData}
            className="w-full py-2 px-3 bg-[#262626] text-[#AAA] hover:text-white text-center flex items-center justify-center gap-1.5 cursor-pointer text-[11px] uppercase tracking-wider transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Reset Demo Data
          </button>
        </div>
      </aside>

      {/* MAIN CMS CONTENT AREA */}
      <main className="flex-1 p-6 md:p-8 max-w-6xl mx-auto w-full overflow-y-auto">
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {adminTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEEBE6]">
              <div>
                <h1 className="font-serif text-3xl font-normal text-[#1A1A1A]">Platform Command Center</h1>
                <p className="text-xs text-[#666] mt-1">Live editorial metrics, content production status, and affiliate revenue signals</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartCreateArticle}
                  className="px-4 py-2 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-wider font-semibold hover:opacity-90 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Write Article
                </button>
                <button
                  onClick={handleStartCreateCamera}
                  className="px-4 py-2 border border-[#EEEBE6] bg-white text-black text-[11px] uppercase tracking-wider font-semibold hover:border-black flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" /> Add Camera
                </button>
              </div>
            </div>

            {/* Metric Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 border border-[#EEEBE6]">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#888]">
                  <span>Total Articles</span>
                  <FileText className="w-4 h-4 text-[#888]" />
                </div>
                <div className="font-serif text-3xl font-normal text-[#1A1A1A] mt-2">{totalArticles}</div>
                <div className="text-[11px] text-[#2E7D32] mt-1">
                  {publishedArticles} published • {draftArticles} drafts
                </div>
              </div>

              <div className="bg-white p-5 border border-[#EEEBE6]">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#888]">
                  <span>Tested Cameras</span>
                  <Camera className="w-4 h-4 text-[#888]" />
                </div>
                <div className="font-serif text-3xl font-normal text-[#1A1A1A] mt-2">{totalCameras}</div>
                <div className="text-[11px] text-[#666] mt-1">Active in gear database</div>
              </div>

              <div className="bg-white p-5 border border-[#EEEBE6]">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#888]">
                  <span>Affiliate Clicks</span>
                  <TrendingUp className="w-4 h-4 text-[#2E7D32]" />
                </div>
                <div className="font-serif text-3xl font-normal text-[#1A1A1A] mt-2">{totalClicks}</div>
                <div className="text-[11px] text-[#2E7D32] mt-1">Outbound retail referrals</div>
              </div>

              <div className="bg-white p-5 border border-[#EEEBE6]">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#888]">
                  <span>Top Retail Partner</span>
                  <DollarSign className="w-4 h-4 text-[#D97706]" />
                </div>
                <div className="font-serif text-2xl font-normal text-[#1A1A1A] mt-2">Amazon / B&H</div>
                <div className="text-[11px] text-[#666] mt-1">Tag: {siteSettings.amazonAssociateTag}</div>
              </div>
            </div>

            {/* Recent Content & Affiliate Click Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Recently Published Articles */}
              <div className="lg:col-span-7 bg-white p-6 border border-[#EEEBE6] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EEEBE6]">
                  <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">Recent Editorial Articles</h3>
                  <button onClick={() => setAdminTab('articles')} className="text-xs text-[#888] hover:text-black">
                    Manage All →
                  </button>
                </div>
                <div className="space-y-3">
                  {articles.slice(0, 4).map((art) => (
                    <div key={art.id} className="flex items-center justify-between p-3 bg-[#FDFCFB] border border-[#EEEBE6]">
                      <div className="min-w-0 flex-1 pr-3">
                        <div className="flex items-center gap-2 text-[10px] text-[#888]">
                          <span className="font-semibold uppercase tracking-wider">{art.category}</span>
                          <span>•</span>
                          <span>{art.publishedAt}</span>
                        </div>
                        <h4 className="font-serif text-sm font-normal text-[#1A1A1A] truncate mt-0.5">{art.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStartEditArticle(art)}
                          className="p-1.5 text-xs border border-[#EEEBE6] bg-white hover:border-black transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5 text-[#666]" />
                        </button>
                        <button
                          onClick={() => navigateTo('article-detail', art.slug)}
                          className="p-1.5 text-xs border border-[#EEEBE6] bg-white hover:border-black transition-colors"
                          title="View on Site"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#666]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time Affiliate Click Tracker */}
              <div className="lg:col-span-5 bg-white p-6 border border-[#EEEBE6] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EEEBE6]">
                  <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">Live Outbound Clicks</h3>
                  <span className="text-[10px] bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 font-bold uppercase tracking-wider">
                    Active Tracking
                  </span>
                </div>

                {affiliateClicks.length === 0 ? (
                  <p className="text-xs text-[#888] py-4 text-center">No affiliate clicks logged yet. Click any "Check Price" button to test.</p>
                ) : (
                  <div className="space-y-2.5 max-h-72 overflow-y-auto">
                    {affiliateClicks.slice(0, 6).map((log) => (
                      <div key={log.id} className="p-2.5 border border-[#EEEBE6] bg-[#FDFCFB] text-xs flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-[#1A1A1A] truncate">{log.productName}</div>
                          <div className="text-[10px] text-[#888]">
                            to <strong>{log.retailer}</strong> from {log.sourceType}
                          </div>
                        </div>
                        <span className="text-[10px] text-[#888] shrink-0 ml-2">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARTICLE MANAGEMENT */}
        {adminTab === 'articles' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEEBE6]">
              <div>
                <h1 className="font-serif text-3xl font-normal text-[#1A1A1A]">Articles & Guides Management</h1>
                <p className="text-xs text-[#666] mt-1">Publish, edit, preview, and optimize camera articles for SEO and affiliate conversion</p>
              </div>
              <button
                onClick={handleStartCreateArticle}
                className="px-4 py-2 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-wider font-semibold hover:opacity-90 flex items-center gap-1.5 cursor-pointer self-start"
              >
                <Plus className="w-3.5 h-3.5" /> Create New Article
              </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex items-center justify-between gap-4 bg-white p-3 border border-[#EEEBE6]">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles by title or keyword..."
                  className="w-full pl-9 pr-4 py-1.5 text-xs border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex items-center gap-1.5">
                {(['all', 'published', 'draft'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setActiveFilterStatus(st)}
                    className={`px-3 py-1 text-[11px] uppercase tracking-wider font-medium cursor-pointer transition-colors ${
                      activeFilterStatus === st ? 'bg-[#1A1A1A] text-white' : 'text-[#666] hover:bg-[#EEEBE6]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Table */}
            <div className="bg-white border border-[#EEEBE6] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FDFCFB] border-b border-[#EEEBE6] text-[#888] uppercase tracking-[0.15em] font-medium text-[10px]">
                  <tr>
                    <th className="p-4">Article</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Affiliate Clicks</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEBE6]">
                  {articles
                    .filter((a) => {
                      const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
                      const matchesStatus = activeFilterStatus === 'all' || a.status === activeFilterStatus;
                      return matchesSearch && matchesStatus;
                    })
                    .map((art) => (
                      <tr key={art.id} className="hover:bg-[#FDFCFB] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={art.coverImage} alt="" className="w-12 h-10 object-cover bg-[#EEEBE6] shrink-0 border border-[#EEEBE6]" />
                            <div className="min-w-0">
                              <h4 className="font-serif font-normal text-sm text-[#1A1A1A] truncate max-w-xs">{art.title}</h4>
                              <span className="text-[10px] text-[#888]">/{art.slug}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-[#666] font-medium">{art.category}</td>
                        <td className="p-4 text-[#666]">{art.author.name}</td>
                        <td className="p-4">
                          <button
                            onClick={() => togglePublishArticle(art.id)}
                            className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest cursor-pointer ${
                              art.status === 'published'
                                ? 'bg-[#E8F5E9] text-[#2E7D32]'
                                : 'bg-[#FFF3E0] text-[#E65100]'
                            }`}
                          >
                            {art.status}
                          </button>
                        </td>
                        <td className="p-4 font-serif font-normal text-[#1A1A1A]">{art.affiliateClicks || 0}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleStartEditArticle(art)}
                              className="p-1.5 text-xs border border-[#EEEBE6] bg-white hover:border-black transition-colors"
                              title="Edit Article"
                            >
                              <Edit className="w-3.5 h-3.5 text-[#666]" />
                            </button>
                            <button
                              onClick={() => navigateTo('article-detail', art.slug)}
                              className="p-1.5 text-xs border border-[#EEEBE6] bg-white hover:border-black transition-colors"
                              title="Preview"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#666]" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete "${art.title}"?`)) {
                                  deleteArticle(art.id);
                                }
                              }}
                              className="p-1.5 text-xs border border-[#EEEBE6] text-[#C62828] bg-white hover:border-[#C62828] transition-colors"
                              title="Delete Article"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ARTICLE EDITOR (RICH CONTENT + SEO + DYNAMIC PRODUCT BOXES) */}
        {adminTab === 'article-edit' && (
          <form onSubmit={handleSaveArticle} className="space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEEBE6]">
              <div>
                <button
                  type="button"
                  onClick={() => setAdminTab('articles')}
                  className="text-xs text-[#888] hover:text-black flex items-center gap-1 mb-1 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
                </button>
                <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A]">
                  {editingArticleId ? 'Edit Editorial Article' : 'Compose New Article'}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setArticleForm((prev) => ({ ...prev, status: prev.status === 'published' ? 'draft' : 'published' }))}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold cursor-pointer ${
                    articleForm.status === 'published' ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFF3E0] text-[#E65100]'
                  }`}
                >
                  Status: {articleForm.status}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-wider font-semibold hover:opacity-90 flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" /> Save Article
                </button>
              </div>
            </div>

            {/* Metadata Fields */}
            <div className="bg-white p-6 border border-[#EEEBE6] space-y-4">
              <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">Essential Article Metadata</h3>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                <div className="md:col-span-8">
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Headline / Title *</label>
                  <input
                    type="text"
                    value={articleForm.title}
                    onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                    placeholder="e.g. The 7 Best Cameras for Street Photography in 2026"
                    className="w-full px-3 py-2 text-sm border border-[#EEEBE6] bg-[#FDFCFB] font-serif focus:outline-none focus:border-black"
                    required
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Category</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as ArticleCategory })}
                    className="w-full px-3 py-2 text-xs border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  >
                    {[
                      'Camera Guides',
                      'Reviews',
                      'Comparisons',
                      'Photography',
                      'Videography',
                      'Vlogging',
                      'Beginner Guides',
                      'Accessories',
                    ].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-12">
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Subtitle / Dek</label>
                  <input
                    type="text"
                    value={articleForm.subtitle}
                    onChange={(e) => setArticleForm({ ...articleForm, subtitle: e.target.value })}
                    placeholder="Supporting editorial subhead"
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>

                <div className="md:col-span-12">
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Excerpt / Summary</label>
                  <textarea
                    rows={2}
                    value={articleForm.excerpt}
                    onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                    placeholder="Brief description for cards and search results"
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>

                <div className="md:col-span-6">
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Cover Image URL</label>
                  <input
                    type="text"
                    value={articleForm.coverImage}
                    onChange={(e) => setArticleForm({ ...articleForm, coverImage: e.target.value })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Author Name</label>
                  <input
                    type="text"
                    value={articleForm.author.name}
                    onChange={(e) => setArticleForm({ ...articleForm, author: { ...articleForm.author, name: e.target.value } })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Est. Read Time (Minutes)</label>
                  <input
                    type="number"
                    value={articleForm.readTimeMinutes}
                    onChange={(e) => setArticleForm({ ...articleForm, readTimeMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Structured Content Block Editor */}
            <div className="bg-white p-6 border border-[#EEEBE6] space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EEEBE6]">
                <div>
                  <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">Article Body Content Blocks</h3>
                  <p className="text-xs text-[#666]">Build semantic rich text, headings, comparison tables, and dynamic product affiliate boxes</p>
                </div>

                {/* Insertion Tools Bar */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => handleAddBlock('paragraph')}
                    className="px-2.5 py-1.5 bg-[#FDFCFB] border border-[#EEEBE6] hover:border-black text-[11px] uppercase tracking-wider font-medium transition-colors"
                  >
                    + Paragraph
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('heading2')}
                    className="px-2.5 py-1.5 bg-[#FDFCFB] border border-[#EEEBE6] hover:border-black text-[11px] uppercase tracking-wider font-medium transition-colors"
                  >
                    + H2 Heading
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('quote')}
                    className="px-2.5 py-1.5 bg-[#FDFCFB] border border-[#EEEBE6] hover:border-black text-[11px] uppercase tracking-wider font-medium transition-colors"
                  >
                    + Quote
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('product_card', { productId: cameras[0]?.id || 'fuji-x100vi', productBadge: 'Top Recommendation' })}
                    className="px-2.5 py-1.5 bg-[#1A1A1A] text-white hover:opacity-90 text-[11px] uppercase tracking-wider font-medium flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Camera Card
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('comparison_table', { comparedProductIds: ['fuji-x100vi', 'ricoh-gr-iiix'] })}
                    className="px-2.5 py-1.5 bg-[#FDFCFB] border border-[#EEEBE6] hover:border-black text-[11px] uppercase tracking-wider font-medium transition-colors"
                  >
                    + Comparison Matrix
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('affiliate_cta', { productId: cameras[0]?.id || 'fuji-x100vi', ctaText: 'Check Current Price & Availability' })}
                    className="px-2.5 py-1.5 bg-[#FDFCFB] border border-[#EEEBE6] hover:border-black text-[11px] uppercase tracking-wider font-medium transition-colors"
                  >
                    + Affiliate CTA
                  </button>
                </div>
              </div>

              {/* Blocks List */}
              <div className="space-y-4">
                {articleForm.blocks.map((block, idx) => (
                  <div key={block.id} className="p-4 border border-[#EEEBE6] bg-[#FDFCFB] relative group space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-[#888] uppercase tracking-[0.15em] font-medium">
                      <span>Block #{idx + 1}: {block.type.replace('_', ' ')}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveBlock(block.id)}
                        className="text-[#C62828] hover:underline cursor-pointer"
                      >
                        Remove Block
                      </button>
                    </div>

                    {block.type === 'paragraph' && (
                      <textarea
                        rows={3}
                        value={block.text || ''}
                        onChange={(e) => handleUpdateBlock(block.id, { text: e.target.value })}
                        className="w-full p-2 text-xs sm:text-sm bg-white border border-[#EEEBE6] focus:outline-none focus:border-black"
                        placeholder="Type paragraph content..."
                      />
                    )}

                    {block.type === 'heading2' && (
                      <input
                        type="text"
                        value={block.text || ''}
                        onChange={(e) => handleUpdateBlock(block.id, { text: e.target.value })}
                        className="w-full p-2 text-sm font-serif font-normal bg-white border border-[#EEEBE6] focus:outline-none focus:border-black"
                        placeholder="Heading 2 Title..."
                      />
                    )}

                    {block.type === 'quote' && (
                      <div className="space-y-2">
                        <textarea
                          rows={2}
                          value={block.text || ''}
                          onChange={(e) => handleUpdateBlock(block.id, { text: e.target.value })}
                          className="w-full p-2 text-xs sm:text-sm italic font-serif bg-white border border-[#EEEBE6] focus:outline-none focus:border-black"
                          placeholder="Quotation text..."
                        />
                        <input
                          type="text"
                          value={block.authorQuote || ''}
                          onChange={(e) => handleUpdateBlock(block.id, { authorQuote: e.target.value })}
                          className="w-full p-1.5 text-xs bg-white border border-[#EEEBE6] focus:outline-none focus:border-black"
                          placeholder="Attribution / Author name..."
                        />
                      </div>
                    )}

                    {/* DYNAMIC PRODUCT RECOMMENDATION CARD INSERTION */}
                    {block.type === 'product_card' && (
                      <div className="p-3 bg-white border border-[#EEEBE6] space-y-3">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-medium text-[#1A1A1A]">Select Camera from Database:</span>
                          <select
                            value={block.productId || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { productId: e.target.value })}
                            className="px-3 py-1 text-xs border border-[#EEEBE6] bg-[#FDFCFB] font-medium"
                          >
                            {cameras.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name} (${c.price.toLocaleString()}) — {c.brand}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div>
                            <label className="block text-[10px] text-[#888] uppercase tracking-wider font-medium">Custom Badge</label>
                            <input
                              type="text"
                              value={block.productBadge || ''}
                              onChange={(e) => handleUpdateBlock(block.id, { productBadge: e.target.value })}
                              placeholder="e.g. Editor’s Top Pick"
                              className="w-full p-1.5 text-xs border border-[#EEEBE6] bg-[#FDFCFB]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-[#888] uppercase tracking-wider font-medium">Editorial Note</label>
                            <input
                              type="text"
                              value={block.productNote || ''}
                              onChange={(e) => handleUpdateBlock(block.id, { productNote: e.target.value })}
                              placeholder="e.g. Best choice for street and travel shooters"
                              className="w-full p-1.5 text-xs border border-[#EEEBE6] bg-[#FDFCFB]"
                            />
                          </div>
                        </div>

                        <p className="text-[11px] text-[#2E7D32]">
                          ✓ Dynamically linked: If you update this camera's affiliate link or price in the Product Manager, it automatically reflects here!
                        </p>
                      </div>
                    )}

                    {/* COMPARISON BLOCK */}
                    {block.type === 'comparison_table' && (
                      <div className="p-3 bg-white border border-[#EEEBE6] text-xs space-y-2">
                        <span className="font-medium text-[#1A1A1A]">Side-by-Side Comparison Matrix</span>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {cameras.map((c) => {
                            const isIncluded = block.comparedProductIds?.includes(c.id);
                            return (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => {
                                  const cur = block.comparedProductIds || [];
                                  const updated = isIncluded ? cur.filter((id) => id !== c.id) : [...cur, c.id];
                                  handleUpdateBlock(block.id, { comparedProductIds: updated });
                                }}
                                className={`px-3 py-1 text-[11px] uppercase tracking-wider font-medium cursor-pointer transition-colors ${
                                  isIncluded ? 'bg-[#1A1A1A] text-white' : 'border border-[#EEEBE6] text-[#666] bg-[#FDFCFB]'
                                }`}
                              >
                                {isIncluded ? '✓ ' : '+ '} {c.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* AFFILIATE CTA BLOCK */}
                    {block.type === 'affiliate_cta' && (
                      <div className="p-3 bg-white border border-[#EEEBE6] space-y-2 text-xs">
                        <span className="font-medium text-[#1A1A1A]">Target Affiliate Product:</span>
                        <select
                          value={block.productId || ''}
                          onChange={(e) => handleUpdateBlock(block.id, { productId: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs border border-[#EEEBE6] bg-[#FDFCFB]"
                        >
                          {cameras.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={block.ctaText || ''}
                          onChange={(e) => handleUpdateBlock(block.id, { ctaText: e.target.value })}
                          placeholder="CTA Button Text (e.g. Check Best Current Price)"
                          className="w-full p-1.5 text-xs border border-[#EEEBE6] bg-[#FDFCFB]"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SEO & Meta Settings */}
            <div className="bg-white p-6 border border-[#EEEBE6] space-y-4 text-xs">
              <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">SEO & Social Meta Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Focus Keyword</label>
                  <input
                    type="text"
                    value={articleForm.seo.focusKeyword}
                    onChange={(e) => setArticleForm({ ...articleForm, seo: { ...articleForm.seo, focusKeyword: e.target.value } })}
                    placeholder="e.g. best street cameras 2026"
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Custom URL Slug</label>
                  <input
                    type="text"
                    value={articleForm.slug}
                    onChange={(e) => setArticleForm({ ...articleForm, slug: e.target.value })}
                    placeholder="e.g. best-street-photography-cameras-2026"
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Meta Title (Page Title Tag)</label>
                  <input
                    type="text"
                    value={articleForm.seo.metaTitle}
                    onChange={(e) => setArticleForm({ ...articleForm, seo: { ...articleForm.seo, metaTitle: e.target.value } })}
                    placeholder="e.g. 7 Best Cameras for Street Photography (2026 Tested) | FocalPoint"
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Meta Description</label>
                  <textarea
                    rows={2}
                    value={articleForm.seo.metaDescription}
                    onChange={(e) => setArticleForm({ ...articleForm, seo: { ...articleForm.seo, metaDescription: e.target.value } })}
                    placeholder="Search snippet description under 160 characters"
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Save Action */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EEEBE6]">
              <button
                type="button"
                onClick={() => setAdminTab('articles')}
                className="px-4 py-2 text-xs font-medium text-[#666] hover:text-black uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-wider font-semibold hover:opacity-90 flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Article Changes
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: CAMERA CATALOG MANAGEMENT */}
        {adminTab === 'cameras' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEEBE6]">
              <div>
                <h1 className="font-serif text-3xl font-normal text-[#1A1A1A]">Camera Gear Catalog</h1>
                <p className="text-xs text-[#666] mt-1">Manage camera products, retail prices, specifications, pros/cons, and affiliate URLs</p>
              </div>
              <button
                onClick={handleStartCreateCamera}
                className="px-4 py-2 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-wider font-semibold hover:opacity-90 flex items-center gap-1.5 cursor-pointer self-start"
              >
                <Plus className="w-3.5 h-3.5" /> Add Camera Model
              </button>
            </div>

            {/* Cameras Table */}
            <div className="bg-white border border-[#EEEBE6] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FDFCFB] border-b border-[#EEEBE6] text-[#888] uppercase tracking-[0.15em] font-medium text-[10px]">
                  <tr>
                    <th className="p-4">Camera</th>
                    <th className="p-4">Brand</th>
                    <th className="p-4">Format</th>
                    <th className="p-4">Base Price</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4">Primary Affiliate</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEBE6]">
                  {cameras.map((cam) => (
                    <tr key={cam.id} className="hover:bg-[#FDFCFB] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={cam.image} alt="" className="w-12 h-10 object-cover bg-[#EEEBE6] shrink-0 border border-[#EEEBE6]" />
                          <div>
                            <h4 className="font-serif font-normal text-sm text-[#1A1A1A]">{cam.name}</h4>
                            <span className="text-[10px] text-[#888]">{cam.specs.megapixels}MP</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-medium text-[#666]">{cam.brand}</td>
                      <td className="p-4 text-[#666]">{cam.specs.sensorFormat}</td>
                      <td className="p-4 font-serif font-normal text-[#1A1A1A]">${cam.price.toLocaleString()}</td>
                      <td className="p-4 font-medium text-black">★ {cam.rating.toFixed(1)}</td>
                      <td className="p-4">
                        {cam.affiliateLinks[0] ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 font-medium">
                            {cam.affiliateLinks[0].retailer} (${cam.affiliateLinks[0].price.toLocaleString()})
                          </span>
                        ) : (
                          <span className="text-xs text-[#888]">None</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleStartEditCamera(cam)}
                            className="p-1.5 text-xs border border-[#EEEBE6] bg-white hover:border-black transition-colors"
                            title="Edit Camera"
                          >
                            <Edit className="w-3.5 h-3.5 text-[#666]" />
                          </button>
                          <button
                            onClick={() => navigateTo('camera-detail', cam.slug)}
                            className="p-1.5 text-xs border border-[#EEEBE6] bg-white hover:border-black transition-colors"
                            title="View Public Page"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#666]" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete camera model "${cam.name}"?`)) {
                                deleteCamera(cam.id);
                              }
                            }}
                            className="p-1.5 text-xs border border-[#EEEBE6] text-[#C62828] bg-white hover:border-[#C62828] transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: CAMERA PRODUCT EDITOR */}
        {adminTab === 'camera-edit' && (
          <form onSubmit={handleSaveCamera} className="space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEEBE6]">
              <div>
                <button
                  type="button"
                  onClick={() => setAdminTab('cameras')}
                  className="text-xs text-[#888] hover:text-black flex items-center gap-1 mb-1 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Cameras
                </button>
                <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A]">
                  {editingCameraId ? `Edit ${cameraForm.name}` : 'Add New Camera Model'}
                </h1>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-wider font-semibold hover:opacity-90 flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" /> Save Camera Product
              </button>
            </div>

            {/* General Info */}
            <div className="bg-white p-6 border border-[#EEEBE6] space-y-4 text-xs">
              <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">Camera Identification & Category</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Model Name *</label>
                  <input
                    type="text"
                    value={cameraForm.name}
                    onChange={(e) => setCameraForm({ ...cameraForm, name: e.target.value })}
                    placeholder="e.g. Fujifilm X100VI"
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Brand</label>
                  <select
                    value={cameraForm.brand}
                    onChange={(e) => setCameraForm({ ...cameraForm, brand: e.target.value as any })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  >
                    {['Fujifilm', 'Sony', 'Canon', 'Nikon', 'Leica', 'Panasonic', 'Ricoh'].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Category</label>
                  <select
                    value={cameraForm.category}
                    onChange={(e) => setCameraForm({ ...cameraForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  >
                    {[
                      'Full-Frame Mirrorless',
                      'APS-C Mirrorless',
                      'Compact & Street',
                      'Medium Format',
                      'Cinema & Video',
                    ].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Starting Price ($ USD)</label>
                  <input
                    type="number"
                    value={cameraForm.price}
                    onChange={(e) => setCameraForm({ ...cameraForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Overall Editorial Rating (1-10)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="10"
                    value={cameraForm.rating}
                    onChange={(e) => setCameraForm({ ...cameraForm, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Primary Image URL</label>
                  <input
                    type="text"
                    value={cameraForm.image}
                    onChange={(e) => setCameraForm({ ...cameraForm, image: e.target.value })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Ideal Use Case</label>
                  <input
                    type="text"
                    value={cameraForm.idealUseCase}
                    onChange={(e) => setCameraForm({ ...cameraForm, idealUseCase: e.target.value })}
                    placeholder="e.g. Street, Travel, Everyday Carry"
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Short Description</label>
                  <textarea
                    rows={2}
                    value={cameraForm.shortDescription}
                    onChange={(e) => setCameraForm({ ...cameraForm, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Specifications Quick Sheet */}
            <div className="bg-white p-6 border border-[#EEEBE6] space-y-4 text-xs">
              <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">Key Technical Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Sensor Description</label>
                  <input
                    type="text"
                    value={cameraForm.specs.sensor}
                    onChange={(e) => setCameraForm({ ...cameraForm, specs: { ...cameraForm.specs, sensor: e.target.value } })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Megapixels</label>
                  <input
                    type="number"
                    step="0.1"
                    value={cameraForm.specs.megapixels}
                    onChange={(e) => setCameraForm({ ...cameraForm, specs: { ...cameraForm.specs, megapixels: Number(e.target.value) } })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">IBIS (Image Stabilization)</label>
                  <input
                    type="text"
                    value={cameraForm.specs.ibis}
                    onChange={(e) => setCameraForm({ ...cameraForm, specs: { ...cameraForm.specs, ibis: e.target.value } })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Video Recording</label>
                  <input
                    type="text"
                    value={cameraForm.specs.videoSpecs}
                    onChange={(e) => setCameraForm({ ...cameraForm, specs: { ...cameraForm.specs, videoSpecs: e.target.value } })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Weight</label>
                  <input
                    type="text"
                    value={cameraForm.specs.weight}
                    onChange={(e) => setCameraForm({ ...cameraForm, specs: { ...cameraForm.specs, weight: e.target.value } })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Lens Mount</label>
                  <input
                    type="text"
                    value={cameraForm.specs.mount}
                    onChange={(e) => setCameraForm({ ...cameraForm, specs: { ...cameraForm.specs, mount: e.target.value } })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Affiliate Links Management for This Camera */}
            <div className="bg-white p-6 border border-[#EEEBE6] space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">Affiliate Retailer Links</h3>
                <button
                  type="button"
                  onClick={() => {
                    const newLink = {
                      id: 'aff-' + Date.now(),
                      retailer: 'Amazon' as const,
                      url: 'https://www.amazon.com?tag=focalpoint-20',
                      price: cameraForm.price,
                      currency: '$',
                      inStock: true,
                      badge: 'Authorized Stock',
                    };
                    setCameraForm((prev) => ({ ...prev, affiliateLinks: [...prev.affiliateLinks, newLink] }));
                  }}
                  className="px-3 py-1.5 bg-[#FDFCFB] border border-[#EEEBE6] hover:border-black text-[11px] uppercase tracking-wider font-medium transition-colors"
                >
                  + Add Retailer
                </button>
              </div>

              <div className="space-y-3">
                {cameraForm.affiliateLinks.map((link, idx) => (
                  <div key={link.id} className="p-3 bg-[#FDFCFB] border border-[#EEEBE6] grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                    <div>
                      <label className="block text-[10px] text-[#888] uppercase tracking-wider font-medium">Retailer</label>
                      <select
                        value={link.retailer}
                        onChange={(e) => {
                          const updated = [...cameraForm.affiliateLinks];
                          updated[idx].retailer = e.target.value as any;
                          setCameraForm({ ...cameraForm, affiliateLinks: updated });
                        }}
                        className="w-full p-1.5 border border-[#EEEBE6] bg-white text-xs"
                      >
                        {['Amazon', 'B&H Photo', 'Adorama', 'Moment', 'MPB (Used)'].map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-[#888] uppercase tracking-wider font-medium">Affiliate Destination URL</label>
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => {
                          const updated = [...cameraForm.affiliateLinks];
                          updated[idx].url = e.target.value;
                          setCameraForm({ ...cameraForm, affiliateLinks: updated });
                        }}
                        className="w-full p-1.5 border border-[#EEEBE6] bg-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#888] uppercase tracking-wider font-medium">Price ($ USD)</label>
                      <input
                        type="number"
                        value={link.price}
                        onChange={(e) => {
                          const updated = [...cameraForm.affiliateLinks];
                          updated[idx].price = Number(e.target.value);
                          setCameraForm({ ...cameraForm, affiliateLinks: updated });
                        }}
                        className="w-full p-1.5 border border-[#EEEBE6] bg-white text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EEEBE6]">
              <button
                type="button"
                onClick={() => setAdminTab('cameras')}
                className="px-4 py-2 text-xs font-medium text-[#666] hover:text-black uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-wider font-semibold hover:opacity-90 cursor-pointer"
              >
                Save Camera
              </button>
            </div>
          </form>
        )}

        {/* TAB 6: CENTRAL AFFILIATE LINKS MANAGEMENT */}
        {adminTab === 'affiliates' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="pb-4 border-b border-[#EEEBE6]">
              <h1 className="font-serif text-3xl font-normal text-[#1A1A1A]">Central Affiliate Link Hub</h1>
              <p className="text-xs text-[#666] mt-1">
                Manage all partner tracking links in one place. Any URL update here automatically propagates across all camera cards, comparison charts, and embedded article product boxes!
              </p>
            </div>

            <div className="bg-white border border-[#EEEBE6] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FDFCFB] border-b border-[#EEEBE6] text-[#888] uppercase tracking-[0.15em] font-medium text-[10px]">
                  <tr>
                    <th className="p-4">Camera Product</th>
                    <th className="p-4">Retailer</th>
                    <th className="p-4">Affiliate URL</th>
                    <th className="p-4">Live Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEBE6]">
                  {cameras.flatMap((cam) =>
                    cam.affiliateLinks.map((link) => (
                      <tr key={link.id} className="hover:bg-[#FDFCFB] transition-colors">
                        <td className="p-4 font-serif font-normal text-[#1A1A1A]">{cam.name}</td>
                        <td className="p-4 font-medium text-[#666]">{link.retailer}</td>
                        <td className="p-4 max-w-xs truncate font-mono text-[11px] text-[#666]">
                          <input
                            type="text"
                            defaultValue={link.url}
                            onBlur={(e) => {
                              if (e.target.value !== link.url) {
                                updateAffiliateLink(cam.id, link.id, e.target.value);
                              }
                            }}
                            className="w-full px-2 py-1 bg-[#FDFCFB] border border-[#EEEBE6] focus:outline-none focus:border-black"
                          />
                        </td>
                        <td className="p-4 font-serif font-normal text-[#1A1A1A]">${link.price.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${link.inStock ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFEBEE] text-[#C62828]'}`}>
                            {link.inStock ? 'In Stock' : 'Backorder'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-[#1A1A1A] hover:underline inline-flex items-center gap-1"
                          >
                            Test <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: MEDIA LIBRARY */}
        {adminTab === 'media' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="pb-4 border-b border-[#EEEBE6]">
              <h1 className="font-serif text-3xl font-normal text-[#1A1A1A]">Media Asset Library</h1>
              <p className="text-xs text-[#666] mt-1">High-resolution camera photography, sample shots, and editorial banners</p>
            </div>

            {/* Upload / Add Form */}
            <form onSubmit={handleAddMedia} className="bg-white p-5 border border-[#EEEBE6] space-y-3">
              <h3 className="font-serif text-sm font-normal text-[#1A1A1A]">Add Image Asset</h3>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    value={newMediaTitle}
                    onChange={(e) => setNewMediaTitle(e.target.value)}
                    placeholder="Asset Title / Caption"
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    value={newMediaUrl}
                    onChange={(e) => setNewMediaUrl(e.target.value)}
                    placeholder="Image URL (Unsplash, CDN, WebP)..."
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-2 px-3 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-wider font-semibold hover:opacity-90 cursor-pointer"
                  >
                    Add Asset
                  </button>
                </div>
              </div>
            </form>

            {/* Media Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {mediaAssets.map((media) => (
                <div key={media.id} className="bg-white border border-[#EEEBE6] overflow-hidden p-3 space-y-2">
                  <div className="h-40 overflow-hidden bg-[#EEEBE6]">
                    <img src={media.url} alt={media.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <h5 className="font-medium text-[#1A1A1A] truncate max-w-[150px]">{media.title}</h5>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(media.url);
                        alert('Image URL copied to clipboard!');
                      }}
                      className="text-[10px] text-[#888] hover:text-black underline cursor-pointer"
                    >
                      Copy URL
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#888] pt-1 border-t border-[#EEEBE6]">
                    <span>{media.dimensions}</span>
                    <button
                      onClick={() => deleteMediaAsset(media.id)}
                      className="text-[#C62828] hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: SITE & SEO SETTINGS */}
        {adminTab === 'settings' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="pb-4 border-b border-[#EEEBE6]">
              <h1 className="font-serif text-3xl font-normal text-[#1A1A1A]">Platform & Affiliate Settings</h1>
              <p className="text-xs text-[#666] mt-1">Configure site branding, affiliate disclosure language, and merchant partner tags</p>
            </div>

            <div className="bg-white p-6 border border-[#EEEBE6] space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Publication Name</label>
                  <input
                    type="text"
                    value={siteSettings.siteName}
                    onChange={(e) => updateSiteSettings({ siteName: e.target.value })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Tagline</label>
                  <input
                    type="text"
                    value={siteSettings.tagline}
                    onChange={(e) => updateSiteSettings({ tagline: e.target.value })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">Amazon Associates Tag</label>
                  <input
                    type="text"
                    value={siteSettings.amazonAssociateTag}
                    onChange={(e) => updateSiteSettings({ amazonAssociateTag: e.target.value })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">B&H Photo Affiliate ID</label>
                  <input
                    type="text"
                    value={siteSettings.bhPhotoTag}
                    onChange={(e) => updateSiteSettings({ bhPhotoTag: e.target.value })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#666] mb-1 font-medium">FTC Affiliate Transparency Text</label>
                  <textarea
                    rows={3}
                    value={siteSettings.affiliateDisclosureText}
                    onChange={(e) => updateSiteSettings({ affiliateDisclosureText: e.target.value })}
                    className="w-full px-3 py-2 border border-[#EEEBE6] bg-[#FDFCFB] focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#EEEBE6] flex items-center justify-between">
                <span className="text-[11px] text-[#2E7D32] font-semibold">
                  ✓ Changes are saved instantly and persisted locally
                </span>
                <button
                  onClick={resetToDemoData}
                  className="px-4 py-2 border border-[#EEEBE6] text-xs font-medium text-[#C62828] hover:border-[#C62828] bg-white cursor-pointer"
                >
                  Reset Platform to Clean Demo State
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: TAXONOMY & CATEGORIES */}
        {adminTab === 'categories' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="pb-4 border-b border-[#EEEBE6]">
              <h1 className="font-serif text-3xl font-normal text-[#1A1A1A]">Taxonomy & Category Architecture</h1>
              <p className="text-xs text-[#666] mt-1">Manage editorial categories and camera taxonomy</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 border border-[#EEEBE6] space-y-4">
                <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">Editorial Categories</h3>
                <ul className="space-y-2 text-xs">
                  {['Camera Guides', 'Reviews', 'Comparisons', 'Photography', 'Videography', 'Vlogging', 'Beginner Guides', 'Accessories'].map((cat) => (
                    <li key={cat} className="flex items-center justify-between p-2.5 bg-[#FDFCFB] border border-[#EEEBE6]">
                      <span className="font-medium text-[#1A1A1A]">{cat}</span>
                      <span className="text-[#888]">{articles.filter(a => a.category === cat).length} articles</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 border border-[#EEEBE6] space-y-4">
                <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">Camera System Formats</h3>
                <ul className="space-y-2 text-xs">
                  {['Full-Frame Mirrorless', 'APS-C Mirrorless', 'Compact & Street', 'Medium Format', 'Cinema & Video'].map((fmt) => (
                    <li key={fmt} className="flex items-center justify-between p-2.5 bg-[#FDFCFB] border border-[#EEEBE6]">
                      <span className="font-medium text-[#1A1A1A]">{fmt}</span>
                      <span className="text-[#888]">{cameras.filter(c => c.category === fmt).length} cameras</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
