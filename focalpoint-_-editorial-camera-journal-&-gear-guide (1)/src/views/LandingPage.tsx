import React, { useState } from 'react';
import { 
  ArrowRight, 
  Search, 
  Camera, 
  Star, 
  Clock, 
  Mail, 
  Check, 
  ChevronRight,
  Instagram, 
  Youtube, 
  Facebook, 
  Twitter, 
  Linkedin,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { AffiliateDisclosureBanner } from '../components/AffiliateDisclosure';

interface HeroSlide {
  badge: string;
  date: string;
  headline: string;
  subtitle: string;
  description: string;
  image: string;
  storySlug: string;
  primaryCtaText: string;
}

export const LandingPage: React.FC = () => {
  const { 
    cameras, 
    articles, 
    navigateTo, 
    setSelectedCategory, 
    trackAffiliateClick,
    setSearchModalOpen 
  } = useData();

  // Active Hero Slide index
  const [activeHeroIndex, setActiveHeroIndex] = useState<number>(0);

  // Newsletter state
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const heroSlides: HeroSlide[] = [
    {
      badge: 'FEATURED STORY',
      date: 'May 20, 2024',
      headline: 'Capture More.\nCreate Better.',
      subtitle: 'The Right Camera for Every Story',
      description: 'Discover the best cameras, in-depth reviews, and expert guides to help you capture your world in stunning detail.',
      image: 'https://images.unsplash.com/photo-1510127031490-569779437d68?auto=format&fit=crop&w=2000&q=85',
      storySlug: 'sony-a7-iv-review-the-ultimate-hybrid-camera',
      primaryCtaText: 'Read Story',
    },
    {
      badge: 'EDITOR’S CHOICE',
      date: 'May 15, 2024',
      headline: 'Tactile Soul.\nTimeless Rangefinder.',
      subtitle: 'The Fujifilm X100VI Field Report',
      description: 'A 40.2MP high-resolution sensor paired with 6-stop IBIS in a pocket-friendly classic body engineered for everyday street photography.',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=2000&q=85',
      storySlug: 'fujifilm-x100vi-in-depth-field-review',
      primaryCtaText: 'Read Field Review',
    },
    {
      badge: 'BUYING GUIDE',
      date: 'May 10, 2024',
      headline: 'Step Into\nFull-Frame Imaging.',
      subtitle: 'Mirrorless Selection Guide',
      description: 'Unpack dynamic range, sensor sizes, and autofocus architectures to invest in the optical system that matches your vision.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85',
      storySlug: 'the-complete-guide-to-choosing-your-first-mirrorless-camera',
      primaryCtaText: 'Explore Guide',
    },
  ];

  const currentHero = heroSlides[activeHeroIndex];

  // 6 Camera Categories matching the reference
  const categories = [
    {
      id: 'mirrorless',
      title: 'Mirrorless',
      desc: 'Lightweight, fast and perfect for any creator.',
      count: '24 articles',
      image: 'https://images.unsplash.com/photo-1510127031490-569779437d68?auto=format&fit=crop&w=800&q=80',
      categoryParam: 'Full-Frame Mirrorless',
      viewTarget: 'cameras' as const,
    },
    {
      id: 'dslr',
      title: 'DSLR',
      desc: 'Powerful performance that never gets old.',
      count: '18 articles',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80',
      categoryParam: 'DSLR',
      viewTarget: 'cameras' as const,
    },
    {
      id: 'compact',
      title: 'Compact',
      desc: 'Small size, big possibilities.',
      count: '12 articles',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      categoryParam: 'Compact & Street',
      viewTarget: 'cameras' as const,
    },
    {
      id: 'action-camera',
      title: 'Action Camera',
      desc: 'Built for adventure. Capture every moment.',
      count: '15 articles',
      image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=800&q=80',
      categoryParam: 'Action Camera',
      viewTarget: 'cameras' as const,
    },
    {
      id: 'vlogging',
      title: 'Vlogging',
      desc: 'Create content. Share your story.',
      count: '20 articles',
      image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=800&q=80',
      categoryParam: 'Vlogging',
      viewTarget: 'cameras' as const,
    },
    {
      id: 'accessories',
      title: 'Accessories',
      desc: 'Lenses, bags, tripods and more gear.',
      count: '22 articles',
      image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80',
      categoryParam: 'Accessories',
      viewTarget: 'blog' as const,
    },
  ];

  // 4 Popular Now articles matching reference
  const popularArticles = [
    {
      category: 'REVIEWS',
      date: 'May 18, 2024',
      title: 'Sony A7 IV Review: The Ultimate Hybrid Camera?',
      readTime: '8 min read',
      slug: 'sony-a7-iv-review-the-ultimate-hybrid-camera',
    },
    {
      category: 'GUIDES',
      date: 'May 16, 2024',
      title: '10 Tips for Stunning Landscape Photography',
      readTime: '6 min read',
      slug: '10-tips-for-stunning-landscape-photography',
    },
    {
      category: 'COMPARISONS',
      date: 'May 14, 2024',
      title: 'Canon R8 vs Sony A7 III: Which One Should You Buy?',
      readTime: '7 min read',
      slug: 'canon-r8-vs-sony-a7-iii-which-one-should-you-buy',
    },
    {
      category: 'VLOGGING',
      date: 'May 12, 2024',
      title: 'Best Cameras for YouTube in 2024 (Beginner to Pro)',
      readTime: '9 min read',
      slug: 'best-cameras-for-youtube-in-2024-beginner-to-pro',
    },
  ];

  // Sidebar popular articles for the Featured Guide row
  const sidebarArticles = [
    {
      title: 'Best Travel Cameras for Every Budget',
      date: 'May 8, 2024',
      slug: 'best-travel-cameras-for-every-budget',
      image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=200&q=80',
    },
    {
      title: 'How to Choose the Right Lens for Your Camera',
      date: 'May 6, 2024',
      slug: 'how-to-choose-the-right-lens-for-your-camera',
      image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=200&q=80',
    },
    {
      title: 'Camera Settings Cheat Sheet for Beginners',
      date: 'May 4, 2024',
      slug: 'camera-settings-cheat-sheet-for-beginners',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
  ];

  // 6 Recommended Cameras matching reference
  const recommendedCameras = [
    {
      id: 'sony-a7iv',
      name: 'Sony A7 IV',
      slug: 'sony-alpha-7-iv',
      rating: 4.8,
      reviewsCount: 245,
      price: '$2,498.00',
      image: 'https://images.unsplash.com/photo-1510127031490-569779437d68?auto=format&fit=crop&w=600&q=80',
      productId: 'sony-a7iv',
    },
    {
      id: 'canon-eos-r8',
      name: 'Canon EOS R8',
      slug: 'canon-eos-r8',
      rating: 4.6,
      reviewsCount: 189,
      price: '$1,499.00',
      image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=600&q=80',
      productId: 'canon-eos-r8',
    },
    {
      id: 'fuji-xt5',
      name: 'Fujifilm X-T5',
      slug: 'fujifilm-x-t5',
      rating: 4.7,
      reviewsCount: 132,
      price: '$1,699.00',
      image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80',
      productId: 'fuji-xt5',
    },
    {
      id: 'nikon-z6ii',
      name: 'Nikon Z6 II',
      slug: 'nikon-z6-ii',
      rating: 4.6,
      reviewsCount: 98,
      price: '$1,996.95',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
      productId: 'nikon-z6ii',
    },
    {
      id: 'sony-zve10',
      name: 'Sony ZV-E10',
      slug: 'sony-zv-e10',
      rating: 4.5,
      reviewsCount: 210,
      price: '$698.00',
      image: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=600&q=80',
      productId: 'sony-zve10',
    },
    {
      id: 'gopro-hero12',
      name: 'GoPro Hero 12',
      slug: 'gopro-hero-12-black',
      rating: 4.7,
      reviewsCount: 154,
      price: '$399.99',
      image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=600&q=80',
      productId: 'gopro-hero12',
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  const handleCategoryNavigate = (cat: typeof categories[0]) => {
    if (cat.viewTarget === 'cameras') {
      navigateTo('cameras');
    } else {
      setSelectedCategory(cat.categoryParam);
      navigateTo('blog');
    }
  };

  const handleCheckPriceClick = (e: React.MouseEvent, cam: typeof recommendedCameras[0]) => {
    e.stopPropagation();
    trackAffiliateClick(cam.productId, 'Amazon', 'landing_recommended_pill');
    navigateTo('camera-detail', cam.slug);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-12 sm:space-y-16 text-left">
      {/* 1. FULL-WIDTH CINEMATIC HERO SECTION */}
      <section 
        id="hero-cinematic-section" 
        className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] flex flex-col justify-end p-6 sm:p-10 lg:p-14 transition-all duration-700 shadow-sm"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentHero.image}
            alt={currentHero.headline}
            className="w-full h-full object-cover object-center transition-all duration-700 filter brightness-[0.85]"
          />
          {/* Editorial Vignette & Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-5 text-left mb-6 sm:mb-8">
          {/* Badge & Date */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-white bg-white/20 backdrop-blur-md border border-white/25">
              {currentHero.badge}
            </span>
            <span className="text-xs sm:text-sm text-white/80 font-medium">
              {currentHero.date}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] whitespace-pre-line font-sans">
            {currentHero.headline}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/85 max-w-xl font-normal leading-relaxed">
            {currentHero.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="hero-read-story-btn"
              onClick={() => navigateTo('article-detail', currentHero.storySlug)}
              className="bg-white text-black hover:bg-white/90 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 shadow-sm active:scale-95"
            >
              <span>{currentHero.primaryCtaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              id="hero-explore-cameras-btn"
              onClick={() => navigateTo('cameras')}
              className="bg-transparent border border-white/40 hover:bg-white/10 hover:border-white text-white px-6 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer backdrop-blur-xs active:scale-95"
            >
              Explore Cameras
            </button>
          </div>
        </div>

        {/* Bottom Carousel Indicators */}
        <div className="relative z-10 flex items-center justify-center gap-2 pt-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveHeroIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === activeHeroIndex
                  ? 'w-7 h-2 bg-white'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. EXPLORE BY CATEGORY */}
      <section id="explore-by-category-section" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-sans">
            Explore by Category
          </h2>
          <button
            onClick={() => navigateTo('cameras')}
            className="text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 font-medium transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View all categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Category Photographic Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryNavigate(cat)}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4.2] flex flex-col justify-between p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
            >
              {/* Background Photo */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15" />
              </div>

              {/* Top-Right Arrow Action Button */}
              <div className="relative z-10 flex justify-end">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-black flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card Bottom Content */}
              <div className="relative z-10 text-left space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-white/80 line-clamp-2 leading-tight font-normal">
                  {cat.desc}
                </p>
                <div className="pt-1">
                  <span className="text-[10px] uppercase tracking-wider text-white/70 font-medium">
                    {cat.count}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. POPULAR NOW SECTION */}
      <section id="popular-now-section" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-sans">
            Popular Now
          </h2>
          <button
            onClick={() => {
              setSelectedCategory(null);
              navigateTo('blog');
            }}
            className="text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 font-medium transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View all articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Compact Article Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularArticles.map((art) => (
            <div
              key={art.slug}
              onClick={() => navigateTo('article-detail', art.slug)}
              className="bg-white border border-neutral-200/80 hover:border-neutral-400 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer group shadow-2xs hover:shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  <span className="text-neutral-900 font-bold">{art.category}</span>
                  <span>•</span>
                  <span>{art.date}</span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors leading-snug line-clamp-2">
                  {art.title}
                </h3>
              </div>

              <div className="pt-4 mt-2 flex items-center gap-1 text-[11px] text-neutral-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{art.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED GUIDE & DISCOVERY / AUTHOR SIDEBAR ROW */}
      <section id="featured-guide-row" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Large Featured Article Card */}
        <div 
          onClick={() => navigateTo('article-detail', 'the-complete-guide-to-choosing-your-first-mirrorless-camera')}
          className="lg:col-span-8 relative rounded-[28px] sm:rounded-[32px] overflow-hidden min-h-[440px] sm:min-h-[500px] flex flex-col justify-between p-6 sm:p-10 cursor-pointer group shadow-xs"
        >
          {/* Background Image: Mountain Vista Photographer */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
              alt="The Complete Guide to Choosing Your First Mirrorless Camera"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20" />
          </div>

          {/* Top Badge */}
          <div className="relative z-10 flex justify-start">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-white bg-white/20 backdrop-blur-md border border-white/25">
              FEATURED GUIDE
            </span>
          </div>

          {/* Bottom Card Content */}
          <div className="relative z-10 text-left space-y-3">
            <span className="text-xs sm:text-sm text-white/80 font-medium">
              May 10, 2024
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              The Complete Guide to Choosing Your First Mirrorless Camera
            </h2>
            <p className="text-xs sm:text-sm text-white/85 max-w-xl font-normal leading-relaxed line-clamp-2">
              A step-by-step guide to help beginners choose the perfect mirrorless camera for their needs and budget.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('article-detail', 'the-complete-guide-to-choosing-your-first-mirrorless-camera');
                }}
                className="bg-white text-black hover:bg-white/90 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span>Read the Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-xs text-white/80 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-white/70" />
                <span>7 min read</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: About the Author & Popular Articles Sidebar */}
        <div className="lg:col-span-4 bg-white border border-neutral-200 rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 flex flex-col justify-between shadow-2xs">
          {/* About Author */}
          <div className="space-y-4 text-left">
            <h3 className="text-sm font-bold text-neutral-900 tracking-wide uppercase text-[11px]">
              About the Author
            </h3>

            <div className="flex items-center gap-3.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                alt="Sophie Moore"
                className="w-12 h-12 rounded-full object-cover shrink-0 border border-neutral-200"
              />
              <div>
                <h4 className="text-sm font-bold text-neutral-900">
                  Sophie Moore
                </h4>
                <p className="text-xs text-neutral-500">
                  Camera reviewer & photographer
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
              Sharing honest reviews and practical tips to help you create better.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3 pt-1 text-neutral-500">
              <a href="#instagram" aria-label="Instagram" className="hover:text-neutral-900 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#youtube" aria-label="YouTube" className="hover:text-neutral-900 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#facebook" aria-label="Facebook" className="hover:text-neutral-900 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" aria-label="Twitter" className="hover:text-neutral-900 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className="hover:text-neutral-900 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="border-t border-neutral-100 my-5" />

          {/* Popular Articles Compact List */}
          <div className="space-y-3.5 text-left">
            <h3 className="text-sm font-bold text-neutral-900 tracking-wide uppercase text-[11px]">
              Popular Articles
            </h3>

            <div className="space-y-3">
              {sidebarArticles.map((art) => (
                <div
                  key={art.slug}
                  onClick={() => navigateTo('article-detail', art.slug)}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-13 h-11 rounded-lg object-cover bg-neutral-100 shrink-0 group-hover:opacity-85 transition-opacity"
                  />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-medium">
                      {art.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. RECOMMENDED CAMERAS */}
      <section id="recommended-cameras-section" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-sans">
            Recommended Cameras
          </h2>
          <button
            onClick={() => navigateTo('cameras')}
            className="text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 font-medium transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View all cameras</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recommendedCameras.map((cam) => (
            <div
              key={cam.id}
              onClick={() => navigateTo('camera-detail', cam.slug)}
              className="bg-white border border-neutral-200 rounded-2xl p-4 flex flex-col justify-between hover:border-neutral-400 hover:shadow-xs transition-all duration-200 cursor-pointer group text-left"
            >
              {/* Camera Image */}
              <div className="w-full h-32 sm:h-36 bg-neutral-50/70 rounded-xl flex items-center justify-center p-2 mb-3 overflow-hidden">
                <img
                  src={cam.image}
                  alt={cam.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-1.5 flex-1">
                <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors truncate">
                  {cam.name}
                </h3>

                {/* Star Rating */}
                <div className="flex items-center gap-1 text-[11px]">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  </div>
                  <span className="text-neutral-500 font-medium ml-1">
                    {cam.rating} ({cam.reviewsCount})
                  </span>
                </div>

                {/* Price */}
                <div className="pt-1">
                  <span className="text-xs sm:text-sm font-bold text-neutral-900">
                    {cam.price}
                  </span>
                </div>
              </div>

              {/* Black Pill Button: Check Price */}
              <div className="pt-3 mt-1">
                <button
                  onClick={(e) => handleCheckPriceClick(e, cam)}
                  className="w-full bg-neutral-900 hover:bg-black text-white text-xs font-semibold py-2 px-3 rounded-full transition-all flex items-center justify-center gap-1 shadow-2xs active:scale-95 cursor-pointer"
                >
                  <span>Check Price</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. DARK NEWSLETTER SUBSCRIPTION SECTION */}
      <section id="newsletter-subscription-section">
        <div className="bg-[#0A0A0A] text-white rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 lg:p-14 relative overflow-hidden">
          {/* Subtle Abstract Wave / Contour Backdrop */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
              <path d="M0,100 C150,200 350,0 500,100 C650,200 750,50 800,80 L800,400 L0,400 Z" fill="currentColor" />
              <path d="M0,160 C200,80 400,260 600,120 C700,50 780,180 800,150 L800,400 L0,400 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-7 space-y-3 text-left">
              {/* Mail Icon in Circle */}
              <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center mb-4 text-white">
                <Mail className="w-5 h-5" />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug font-sans">
                Get the latest camera guides, reviews, and gear recommendations.
              </h2>

              <p className="text-xs sm:text-sm text-neutral-400 max-w-lg leading-relaxed font-normal">
                Join thousands of photography enthusiasts and never miss new articles, reviews, and exclusive deals.
              </p>
            </div>

            {/* Right Column: Input & Pill Button Form */}
            <div className="lg:col-span-5 text-left">
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-white/10 border border-white/15 focus:border-white/40 rounded-full px-5 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-white hover:bg-neutral-100 text-black font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    {subscribed ? (
                      <>
                        <Check className="w-4 h-4 text-black" />
                        <span>Subscribed</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-neutral-500 pl-2">
                  No spam. Unsubscribe anytime.
                </p>

                {subscribed && (
                  <p className="text-xs text-emerald-400 pl-2 animate-in fade-in">
                    Thank you for subscribing! Check your inbox for the welcome dispatch.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EDITORIAL INTEGRITY & AFFILIATE DISCLOSURE */}
      <section className="pt-4">
        <AffiliateDisclosureBanner />
      </section>
    </div>
  );
};
