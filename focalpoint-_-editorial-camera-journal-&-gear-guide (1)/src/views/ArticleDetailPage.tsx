import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  Share2, 
  Bookmark, 
  Check, 
  ChevronRight, 
  ArrowLeft,
  User,
  Quote,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DynamicProductBox } from '../components/DynamicProductBox';
import { ComparisonTable } from '../components/ComparisonTable';
import { AffiliateButton } from '../components/AffiliateButton';
import { AffiliateDisclosureBanner } from '../components/AffiliateDisclosure';
import { ArticleCard } from '../components/ArticleCard';
import { CameraCard } from '../components/CameraCard';

export const ArticleDetailPage: React.FC = () => {
  const { activeSlug, articles, cameras, navigateTo } = useData();
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const article = articles.find((a) => a.slug === activeSlug) || articles[0];

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#1A1918]">Article Not Found</h2>
        <p className="text-sm text-[#6B655D]">The article you were looking for could not be located.</p>
        <button
          onClick={() => navigateTo('blog')}
          className="px-5 py-2.5 rounded-full bg-[#1A1918] text-white text-xs font-semibold"
        >
          Return to Journal
        </button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const relatedArticles = articles
    .filter((a) => a.id !== article.id && (a.category === article.category || article.relatedArticleSlugs?.includes(a.slug)))
    .slice(0, 2);

  const featuredCameras = article.featuredCameraIds
    ? article.featuredCameraIds.map((id) => cameras.find((c) => c.id === id)).filter(Boolean) as typeof cameras
    : [];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-10 text-left">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between border-b border-[#EEEBE6] pb-4">
        <Breadcrumbs
          items={[
            { label: 'Journal', view: 'blog' },
            { label: article.category, view: 'blog' },
            { label: article.title, active: true },
          ]}
        />

        <div className="flex items-center gap-2">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="p-2 border border-[#EEEBE6] text-[#666] hover:text-black hover:border-black cursor-pointer transition-colors"
            title="Save article"
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-black text-black' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 border border-[#EEEBE6] text-[#666] hover:text-black hover:border-black cursor-pointer flex items-center gap-1 text-[11px] uppercase tracking-wider transition-colors"
            title="Share article"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#2E7D32]" /> : <Share2 className="w-3.5 h-3.5 text-[#666]" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Article Header */}
      <header className="space-y-5">
        <div className="flex items-center gap-2">
          <span className="bg-[#1A1A1A] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
            {article.category}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#888] hidden sm:inline">
            FocalPoint Editorial Field Review
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1A1A1A] leading-[1.1] tracking-tight">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="text-base sm:text-xl text-[#666] font-serif italic leading-relaxed">
            {article.subtitle}
          </p>
        )}

        {/* Author Byline & Publishing Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EEEBE6] text-xs text-[#666]">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 object-cover border border-[#EEEBE6]"
            />
            <div>
              <div className="font-semibold text-sm text-[#1A1A1A]">{article.author.name}</div>
              <div className="text-[10px] text-[#888]">{article.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#888]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTimeMinutes} min read
            </span>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="h-80 sm:h-[480px] w-full overflow-hidden bg-[#E5E2DD] relative border border-[#EEEBE6]">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Affiliate Transparency Disclosure Banner */}
      <AffiliateDisclosureBanner />

      {/* Table of Contents (if available) */}
      {article.tableOfContents && article.tableOfContents.length > 0 && (
        <div className="bg-white border border-[#EEEBE6] p-5 sm:p-6 my-6">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] mb-3">
            Table of Contents
          </h4>
          <nav className="space-y-1.5 text-xs text-[#666]">
            {article.tableOfContents.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-2 hover:text-black transition-colors">
                <span className="text-[#888] font-mono text-[11px]">{idx + 1}.</span>
                <a href={`#${item.id}`} className="hover:underline">
                  {item.title}
                </a>
              </div>
            ))}
          </nav>
        </div>
      )}

      {/* Main Rich Content Blocks Renderer */}
      <div className="space-y-8 text-base text-[#1A1A1A] leading-[1.8]">
        {article.blocks.map((block) => {
          switch (block.type) {
            case 'paragraph':
              return (
                <p key={block.id} className="text-base sm:text-lg text-[#333] font-normal leading-[1.8] font-sans">
                  {block.text}
                </p>
              );

            case 'heading2':
              const headingId = block.text?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <h2 
                  key={block.id} 
                  id={headingId}
                  className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A] pt-6 pb-2 border-b border-[#EEEBE6] leading-snug"
                >
                  {block.text}
                </h2>
              );

            case 'heading3':
              return (
                <h3 key={block.id} className="font-serif text-xl sm:text-2xl font-normal text-[#1A1A1A] pt-4">
                  {block.text}
                </h3>
              );

            case 'quote':
              return (
                <div key={block.id} className="my-8 p-6 sm:p-8 bg-[#FDFCFB] border-l-2 border-black">
                  <p className="font-serif text-xl sm:text-2xl italic text-[#1A1A1A] leading-relaxed">
                    “{block.text}”
                  </p>
                  {block.authorQuote && (
                    <span className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#888] mt-3">
                      — {block.authorQuote}
                    </span>
                  )}
                </div>
              );

            case 'callout':
              return (
                <div key={block.id} className="p-4 sm:p-5 bg-white border border-[#EEEBE6] text-xs sm:text-sm text-[#666] leading-relaxed my-6">
                  {block.text}
                </div>
              );

            case 'product_card':
              return block.productId ? (
                <DynamicProductBox
                  key={block.id}
                  productId={block.productId}
                  badge={block.productBadge}
                  customNote={block.productNote}
                  sourceSlug={article.slug}
                />
              ) : null;

            case 'comparison_table':
              return block.comparedProductIds ? (
                <ComparisonTable
                  key={block.id}
                  productIds={block.comparedProductIds}
                  sourceSlug={article.slug}
                />
              ) : null;

            case 'pros_cons':
              return (
                <div key={block.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                  <div className="bg-white border border-[#EEEBE6] p-5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#2E7D32] flex items-center gap-1.5 mb-3">
                      <CheckCircle2 className="w-4 h-4" /> Strengths
                    </span>
                    <ul className="space-y-2 text-xs text-[#555]">
                      {block.pros?.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#2E7D32] font-bold">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white border border-[#EEEBE6] p-5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#C62828] flex items-center gap-1.5 mb-3">
                      <XCircle className="w-4 h-4" /> Weaknesses
                    </span>
                    <ul className="space-y-2 text-xs text-[#555]">
                      {block.cons?.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#C62828] font-bold">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );

            case 'affiliate_cta':
              return block.productId ? (
                <div key={block.id} className="my-8 p-6 bg-[#1A1A1A] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-lg font-normal text-white">
                      {block.ctaText || 'Check Current Best Deals'}
                    </h4>
                    <p className="text-xs text-[#BBB] mt-1">
                      {block.ctaSubtext || 'Compare authorized retailer stock and instant rebates.'}
                    </p>
                  </div>
                  <AffiliateButton
                    productId={block.productId}
                    sourceType="article"
                    sourceSlug={article.slug}
                    size="md"
                  />
                </div>
              ) : null;

            default:
              return null;
          }
        })}
      </div>

      {/* Featured Cameras Quick Shelf */}
      {featuredCameras.length > 0 && (
        <section className="pt-10 border-t border-[#EEEBE6] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
              Gear Referenced in This Article
            </h3>
            <span className="text-xs text-[#888]">
              {featuredCameras.length} Cameras Field Tested
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredCameras.map((cam) => (
              <CameraCard key={cam.id} camera={cam} layout="horizontal" sourceSlug={article.slug} />
            ))}
          </div>
        </section>
      )}

      {/* Author Bio Box */}
      <section className="bg-white border border-[#EEEBE6] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={article.author.avatar}
          alt={article.author.name}
          className="w-20 h-20 object-cover border border-[#EEEBE6] shrink-0"
        />
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#888]">
            About the Author
          </span>
          <h4 className="font-serif text-xl font-normal text-[#1A1A1A]">
            {article.author.name}
          </h4>
          <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
            {article.author.bio}
          </p>
        </div>
      </section>

      {/* SEO Metadata Inspection Preview Bar (shows editorial diligence) */}
      <section className="bg-white border border-[#EEEBE6] p-4 text-xs text-[#666] space-y-1.5">
        <div className="flex items-center justify-between font-medium text-[#1A1A1A] text-[10px] uppercase tracking-[0.15em]">
          <span>SEO Schema & Indexing Meta</span>
          <span className="text-[#2E7D32]">Indexable • Rank Ready</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
          <div><strong className="text-[#1A1A1A]">Focus Keyword:</strong> {article.seo.focusKeyword}</div>
          <div><strong className="text-[#1A1A1A]">Meta Title:</strong> {article.seo.metaTitle}</div>
        </div>
      </section>

      {/* Related Content */}
      {relatedArticles.length > 0 && (
        <section className="pt-10 border-t border-[#EEEBE6] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
              Continue Reading
            </h3>
            <button
              onClick={() => navigateTo('blog')}
              className="text-[11px] uppercase tracking-wider font-semibold text-[#1A1A1A] hover:opacity-75 cursor-pointer"
            >
              All Articles →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
