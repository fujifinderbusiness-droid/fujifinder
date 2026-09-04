import React, { useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { LandingPage } from './views/LandingPage';
import { CamerasPage } from './views/CamerasPage';
import { CameraDetailPage } from './views/CameraDetailPage';
import { BlogPage } from './views/BlogPage';
import { ArticleDetailPage } from './views/ArticleDetailPage';
import { ComparisonsPage } from './views/ComparisonsPage';
import { AdminCMS } from './views/AdminCMS';

const MainLayout: React.FC = () => {
  const { currentView } = useData();

  // Scroll to top whenever the view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A]">
        <AdminCMS />
        <SearchModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] flex flex-col selection:bg-[#1A1A1A] selection:text-white font-sans antialiased">
      {/* Global Editorial Navigation */}
      <Navbar />

      {/* Dynamic View Switcher */}
      <main className="flex-1 w-full">
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'cameras' && <CamerasPage />}
        {currentView === 'camera-detail' && <CameraDetailPage />}
        {currentView === 'blog' && <BlogPage />}
        {currentView === 'article-detail' && <ArticleDetailPage />}
        {currentView === 'comparisons' && <ComparisonsPage />}
      </main>

      {/* Global Editorial Footer */}
      <Footer />

      {/* Universal Search Modal (Cmd+K) */}
      <SearchModal />
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <MainLayout />
    </DataProvider>
  );
}
