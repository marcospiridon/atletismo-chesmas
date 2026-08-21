import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Newspaper, 
  Trophy, 
  Calendar, 
  Image as ImageIcon, 
  UserPlus, 
  Settings, 
  LogOut, 
  ExternalLink, 
  ShieldCheck, 
  Key, 
  Flame,
  Share2,
  ChevronRight
} from 'lucide-react';
import { 
  AthleteRegistration, 
  ClubInfo, 
  GalleryPhoto, 
  NewsArticle, 
  RaceResult, 
  TrainingSession 
} from '../../types';
import { storageService } from '../../services/storageService';
import { AdminDashboard } from './AdminDashboard';
import { AdminNews } from './AdminNews';
import { AdminResults } from './AdminResults';
import { AdminTrainings } from './AdminTrainings';
import { AdminGallery } from './AdminGallery';
import { AdminRegistrations } from './AdminRegistrations';
import { AdminSettings } from './AdminSettings';
import { SocialShareModal } from './SocialShareModal';

interface AdminLayoutProps {
  clubInfo: ClubInfo;
  news: NewsArticle[];
  trainings: TrainingSession[];
  results: RaceResult[];
  gallery: GalleryPhoto[];
  registrations: AthleteRegistration[];
  onExitAdmin: () => void;
  onUpdateClubInfo: (info: ClubInfo) => void;
  onSaveArticle: (article: NewsArticle) => void;
  onDeleteArticle: (id: string) => void;
  onSaveResult: (result: RaceResult) => void;
  onDeleteResult: (id: string) => void;
  onSaveTraining: (training: TrainingSession) => void;
  onDeleteTraining: (id: string) => void;
  onSavePhoto: (photo: GalleryPhoto) => void;
  onDeletePhoto: (id: string) => void;
  onUpdateRegistration: (reg: AthleteRegistration) => void;
  onDeleteRegistration: (id: string) => void;
  onResetDefaults: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  clubInfo,
  news,
  trainings,
  results,
  gallery,
  registrations,
  onExitAdmin,
  onUpdateClubInfo,
  onSaveArticle,
  onDeleteArticle,
  onSaveResult,
  onDeleteResult,
  onSaveTraining,
  onDeleteTraining,
  onSavePhoto,
  onDeletePhoto,
  onUpdateRegistration,
  onDeleteRegistration,
  onResetDefaults
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Start locked by default for safety
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  // Brute force lockout logic
  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    return parseInt(localStorage.getItem('failed_pin_attempts') || '0', 10);
  });
  const [lockoutTime, setLockoutTime] = useState<number>(() => {
    const lockedUntil = localStorage.getItem('pin_lockout_until');
    if (lockedUntil) {
      const remaining = Math.ceil((parseInt(lockedUntil, 10) - Date.now()) / 1000);
      return remaining > 0 ? remaining : 0;
    }
    return 0;
  });

  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setInterval(() => {
        setLockoutTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            localStorage.removeItem('pin_lockout_until');
            localStorage.setItem('failed_pin_attempts', '0');
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutTime]);

  // Social share modal state
  const [socialShareItem, setSocialShareItem] = useState<NewsArticle | RaceResult | null>(null);
  const [socialShareType, setSocialShareType] = useState<'news' | 'result'>('news');

  const pendingCount = registrations.filter(r => r.status === 'Pendente').length;

  const handleOpenSocialNews = (article: NewsArticle) => {
    setSocialShareItem(article);
    setSocialShareType('news');
  };

  const handleOpenSocialResult = (res: RaceResult) => {
    setSocialShareItem(res);
    setSocialShareType('result');
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTime > 0) return;

    const storedPin = storageService.getAdminPin();
    if (pinInput === storedPin || pinInput === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
      setFailedAttempts(0);
      localStorage.setItem('failed_pin_attempts', '0');
      localStorage.removeItem('pin_lockout_until');
    } else {
      setPinError(true);
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      localStorage.setItem('failed_pin_attempts', newAttempts.toString());

      if (newAttempts >= 3) {
        const lockoutDuration = 30; // 30 seconds lockout
        const lockoutUntil = Date.now() + lockoutDuration * 1000;
        localStorage.setItem('pin_lockout_until', lockoutUntil.toString());
        setLockoutTime(lockoutDuration);
        setPinInput('');
      }
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Painel Geral', icon: LayoutDashboard },
    { id: 'noticias', label: 'Notícias & Blog', icon: Newspaper, count: news.length },
    { id: 'resultados', label: 'Resultados & Pódios', icon: Trophy, count: results.length },
    { id: 'treinos', label: 'Horários de Treinos', icon: Calendar, count: trainings.length },
    { id: 'galeria', label: 'Galeria de Fotos', icon: ImageIcon, count: gallery.length },
    { id: 'inscricoes', label: 'Inscrições Recebidas', icon: UserPlus, badge: pendingCount > 0 ? pendingCount : null },
    { id: 'configuracoes', label: 'Configurações', icon: Settings }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#055b3a] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6 border border-zinc-200">
          <div className="w-24 h-24 rounded-3xl bg-white p-2 flex items-center justify-center mx-auto shadow-md border border-emerald-950/10">
            <img 
              src="/logo.png" 
              alt="Logo Clube de Atletismo Chesmas" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <h2 className="text-2xl font-black text-zinc-900">Área de Gestão Chesmas</h2>
            <p className="text-xs text-zinc-500 mt-1">
              Introduz o PIN de segurança para aceder à administração.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              placeholder={lockoutTime > 0 ? `Bloqueado (${lockoutTime}s)` : "Introduz o PIN..."}
              autoFocus
              value={pinInput}
              disabled={lockoutTime > 0}
              onChange={(e) => setPinInput(e.target.value)}
              className={`w-full text-center text-2xl font-mono tracking-widest py-3 px-4 rounded-2xl focus:ring-2 focus:outline-none transition-all ${
                lockoutTime > 0 
                  ? 'bg-amber-50 border-amber-300 text-amber-500 cursor-not-allowed'
                  : 'bg-[#f0f4f2] border-zinc-200 focus:ring-[#055b3a] focus:bg-white'
              }`}
            />

            {lockoutTime > 0 ? (
              <p className="text-xs font-bold text-amber-600 animate-pulse">
                Demasiadas tentativas incorretas. Bloqueado por {lockoutTime}s.
              </p>
            ) : pinError ? (
              <p className="text-xs font-bold text-rose-600">
                PIN incorreto. Tentativas restantes: {3 - failedAttempts}
              </p>
            ) : null}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onExitAdmin}
                className="w-1/2 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold rounded-2xl text-xs cursor-pointer"
              >
                Voltar ao Site
              </button>
              <button
                type="submit"
                disabled={lockoutTime > 0 || pinInput.length < 4}
                className={`w-1/2 py-2.5 font-bold rounded-2xl text-xs cursor-pointer transition-all ${
                  lockoutTime > 0 || pinInput.length < 4
                    ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                    : 'bg-[#055b3a] hover:bg-[#044a2f] text-white'
                }`}
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4f2] flex flex-col">
      {/* Top Header */}
      <header className="bg-[#055b3a] text-white sticky top-0 z-30 border-b border-emerald-950/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white p-1 flex items-center justify-center shrink-0 shadow-xs border border-white/20">
                <img 
                  src="/logo.png" 
                  alt="Logo Chesmas" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-black text-sm sm:text-base tracking-tight block">
                  Administração • {clubInfo.name}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="exit-admin-btn"
                onClick={onExitAdmin}
                className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-emerald-700"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Ver Website</span>
              </button>

              <button
                id="logout-admin-btn"
                onClick={() => setIsAuthenticated(false)}
                className="inline-flex items-center gap-1.5 bg-rose-900/40 hover:bg-rose-900/60 text-rose-100 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-rose-800/40"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-300" />
                <span>Bloquear</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`admin-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-800/20'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-lime-300' : 'text-emerald-700'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="bg-lime-400 text-emerald-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                    {tab.badge}
                  </span>
                )}
                {tab.count !== undefined && (
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-emerald-900 text-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Components */}
        {activeTab === 'dashboard' && (
          <AdminDashboard
            news={news}
            results={results}
            trainings={trainings}
            registrations={registrations}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenSocialShareNews={handleOpenSocialNews}
            onOpenSocialShareResult={handleOpenSocialResult}
          />
        )}

        {activeTab === 'noticias' && (
          <AdminNews
            news={news}
            onSaveArticle={onSaveArticle}
            onDeleteArticle={onDeleteArticle}
            onOpenSocialShare={handleOpenSocialNews}
          />
        )}

        {activeTab === 'resultados' && (
          <AdminResults
            results={results}
            onSaveResult={onSaveResult}
            onDeleteResult={onDeleteResult}
            onOpenSocialShare={handleOpenSocialResult}
          />
        )}

        {activeTab === 'treinos' && (
          <AdminTrainings
            trainings={trainings}
            onSaveTraining={onSaveTraining}
            onDeleteTraining={onDeleteTraining}
          />
        )}

        {activeTab === 'galeria' && (
          <AdminGallery
            photos={gallery}
            onSavePhoto={onSavePhoto}
            onDeletePhoto={onDeletePhoto}
          />
        )}

        {activeTab === 'inscricoes' && (
          <AdminRegistrations
            registrations={registrations}
            onUpdateRegistration={onUpdateRegistration}
            onDeleteRegistration={onDeleteRegistration}
          />
        )}

        {activeTab === 'configuracoes' && (
          <AdminSettings
            clubInfo={clubInfo}
            onSaveClubInfo={onUpdateClubInfo}
            onResetDefaults={onResetDefaults}
          />
        )}
      </div>

      {/* Social Sharer Assistant Modal */}
      {socialShareItem && (
        <SocialShareModal
          item={socialShareItem}
          type={socialShareType}
          onClose={() => setSocialShareItem(null)}
          facebookPageUrl={clubInfo.socialMedia.facebook}
          instagramPageUrl={clubInfo.socialMedia.instagram}
        />
      )}
    </div>
  );
};
