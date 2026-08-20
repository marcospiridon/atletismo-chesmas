import React, { useState, useEffect } from 'react';
import { 
  AthleteRegistration, 
  ClubInfo, 
  GalleryPhoto, 
  NewsArticle, 
  RaceResult, 
  TrainingSession 
} from './types';
import { storageService } from './services/storageService';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NewsSection } from './components/NewsSection';
import { TrainingsSection } from './components/TrainingsSection';
import { ResultsSection } from './components/ResultsSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { RegistrationForm } from './components/RegistrationForm';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { AdminLayout } from './components/admin/AdminLayout';

export default function App() {
  const [clubInfo, setClubInfo] = useState<ClubInfo>(storageService.getClubInfo());
  const [news, setNews] = useState<NewsArticle[]>(storageService.getNews());
  const [trainings, setTrainings] = useState<TrainingSession[]>(storageService.getTrainings());
  const [results, setResults] = useState<RaceResult[]>(storageService.getResults());
  const [gallery, setGallery] = useState<GalleryPhoto[]>(storageService.getGallery());
  const [registrations, setRegistrations] = useState<AthleteRegistration[]>(storageService.getRegistrations());

  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Sync state helpers
  const handleUpdateClubInfo = (info: ClubInfo) => {
    storageService.saveClubInfo(info);
    setClubInfo(info);
  };

  const handleSaveArticle = (article: NewsArticle) => {
    const existingIndex = news.findIndex(n => n.id === article.id);
    let updated: NewsArticle[];
    if (existingIndex >= 0) {
      updated = [...news];
      updated[existingIndex] = article;
    } else {
      updated = [article, ...news];
    }
    storageService.saveNews(updated);
    setNews(updated);
  };

  const handleDeleteArticle = (id: string) => {
    const updated = news.filter(n => n.id !== id);
    storageService.saveNews(updated);
    setNews(updated);
  };

  const handleLikeArticle = (id: string) => {
    const updated = news.map(n => n.id === id ? { ...n, likes: n.likes + 1 } : n);
    storageService.saveNews(updated);
    setNews(updated);
  };

  const handleSaveResult = (result: RaceResult) => {
    const existingIndex = results.findIndex(r => r.id === result.id);
    let updated: RaceResult[];
    if (existingIndex >= 0) {
      updated = [...results];
      updated[existingIndex] = result;
    } else {
      updated = [result, ...results];
    }
    storageService.saveResults(updated);
    setResults(updated);
  };

  const handleDeleteResult = (id: string) => {
    const updated = results.filter(r => r.id !== id);
    storageService.saveResults(updated);
    setResults(updated);
  };

  const handleSaveTraining = (training: TrainingSession) => {
    const existingIndex = trainings.findIndex(t => t.id === training.id);
    let updated: TrainingSession[];
    if (existingIndex >= 0) {
      updated = [...trainings];
      updated[existingIndex] = training;
    } else {
      updated = [training, ...trainings];
    }
    storageService.saveTrainings(updated);
    setTrainings(updated);
  };

  const handleDeleteTraining = (id: string) => {
    const updated = trainings.filter(t => t.id !== id);
    storageService.saveTrainings(updated);
    setTrainings(updated);
  };

  const handleSavePhoto = (photo: GalleryPhoto) => {
    const existingIndex = gallery.findIndex(g => g.id === photo.id);
    let updated: GalleryPhoto[];
    if (existingIndex >= 0) {
      updated = [...gallery];
      updated[existingIndex] = photo;
    } else {
      updated = [photo, ...gallery];
    }
    storageService.saveGallery(updated);
    setGallery(updated);
  };

  const handleDeletePhoto = (id: string) => {
    const updated = gallery.filter(g => g.id !== id);
    storageService.saveGallery(updated);
    setGallery(updated);
  };

  const handleSubmitRegistration = (reg: AthleteRegistration) => {
    storageService.addRegistration(reg);
    setRegistrations(storageService.getRegistrations());
  };

  const handleUpdateRegistration = (reg: AthleteRegistration) => {
    const updated = registrations.map(r => r.id === reg.id ? reg : r);
    storageService.saveRegistrations(updated);
    setRegistrations(updated);
  };

  const handleDeleteRegistration = (id: string) => {
    const updated = registrations.filter(r => r.id !== id);
    storageService.saveRegistrations(updated);
    setRegistrations(updated);
  };

  const handleResetDefaults = () => {
    storageService.resetAllToDefault();
    setClubInfo(storageService.getClubInfo());
    setNews(storageService.getNews());
    setTrainings(storageService.getTrainings());
    setResults(storageService.getResults());
    setGallery(storageService.getGallery());
    setRegistrations(storageService.getRegistrations());
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(`${sectionId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // If in Admin Mode, show the Admin Dashboard and Management Portal
  if (isAdminMode) {
    return (
      <AdminLayout
        clubInfo={clubInfo}
        news={news}
        trainings={trainings}
        results={results}
        gallery={gallery}
        registrations={registrations}
        onExitAdmin={() => setIsAdminMode(false)}
        onUpdateClubInfo={handleUpdateClubInfo}
        onSaveArticle={handleSaveArticle}
        onDeleteArticle={handleDeleteArticle}
        onSaveResult={handleSaveResult}
        onDeleteResult={handleDeleteResult}
        onSaveTraining={handleSaveTraining}
        onDeleteTraining={handleDeleteTraining}
        onSavePhoto={handleSavePhoto}
        onDeletePhoto={handleDeletePhoto}
        onUpdateRegistration={handleUpdateRegistration}
        onDeleteRegistration={handleDeleteRegistration}
        onResetDefaults={handleResetDefaults}
      />
    );
  }

  const pendingCount = registrations.filter(r => r.status === 'Pendente').length;

  return (
    <div className="min-h-screen bg-[#f0f4f2] text-zinc-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Main Navbar */}
      <Navbar
        clubInfo={clubInfo}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminMode(true)}
        pendingRegistrationsCount={pendingCount}
      />

      {/* Hero Section */}
      <Hero
        clubInfo={clubInfo}
        onNavigate={handleNavigate}
        recentResults={results}
      />

      {/* Main Public Sections */}
      <main className="flex-1">
        {/* News & Blog Section */}
        <NewsSection
          articles={news}
          onSelectArticle={(art) => setSelectedArticle(art)}
        />

        {/* Trainings & Calendar Section */}
        <TrainingsSection
          trainings={trainings}
          onNavigateToRegister={() => handleNavigate('inscricao')}
        />

        {/* Results & Podium Section */}
        <ResultsSection
          results={results}
        />

        {/* About Club Section */}
        <AboutSection
          clubInfo={clubInfo}
          onNavigateToRegister={() => handleNavigate('inscricao')}
        />

        {/* Photo Gallery Section */}
        <GallerySection
          photos={gallery}
        />

        {/* Athlete Registration Form Section */}
        <RegistrationForm
          onSubmitRegistration={handleSubmitRegistration}
        />

        {/* Contacts & Venues Section */}
        <ContactSection
          clubInfo={clubInfo}
        />
      </main>

      {/* Footer */}
      <Footer
        clubInfo={clubInfo}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminMode(true)}
      />

      {/* Article Detail Reader Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onLike={handleLikeArticle}
        />
      )}
    </div>
  );
}
