import React from 'react';
import { 
  Newspaper, 
  Trophy, 
  Calendar, 
  Image as ImageIcon, 
  UserPlus, 
  Flame, 
  Share2, 
  TrendingUp, 
  Sparkles, 
  Users,
  Award
} from 'lucide-react';
import { AthleteRegistration, NewsArticle, RaceResult, TrainingSession } from '../../types';

interface AdminDashboardProps {
  news: NewsArticle[];
  results: RaceResult[];
  trainings: TrainingSession[];
  registrations: AthleteRegistration[];
  onNavigateTab: (tab: string) => void;
  onOpenSocialShareNews: (article: NewsArticle) => void;
  onOpenSocialShareResult: (result: RaceResult) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  news,
  results,
  trainings,
  registrations,
  onNavigateTab,
  onOpenSocialShareNews,
  onOpenSocialShareResult
}) => {
  const pendingRegistrations = registrations.filter(r => r.status === 'Pendente');
  const podiumResults = results.filter(r => r.podiumPosition !== null && r.podiumPosition !== undefined);
  const latestArticle = news[0];
  const latestPodium = podiumResults[0];

  const stats = [
    {
      label: 'Novas Inscrições',
      value: pendingRegistrations.length,
      sublabel: `${registrations.length} totais`,
      icon: UserPlus,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      tab: 'inscricoes',
      badge: pendingRegistrations.length > 0 ? 'Requer Atenção' : 'Atualizado'
    },
    {
      label: 'Notícias & Posts',
      value: news.length,
      sublabel: 'Artigos no Blog',
      icon: Newspaper,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      tab: 'noticias'
    },
    {
      label: 'Resultados & Provas',
      value: results.length,
      sublabel: `${podiumResults.length} Pódios Oficiais`,
      icon: Trophy,
      color: 'text-amber-500',
      bg: 'bg-amber-50/80',
      tab: 'resultados'
    },
    {
      label: 'Treinos Ativos',
      value: trainings.filter(t => t.active).length,
      sublabel: 'Sessões Semanais',
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      tab: 'treinos'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-lime-400/20 text-lime-300 px-3 py-1 rounded-full text-xs font-black uppercase mb-3">
            <Flame className="w-3.5 h-3.5" />
            Painel Administrativo Chesmas
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            Gestão Rápida, Simples e Partilha Social
          </h2>
          <p className="text-emerald-200 text-xs sm:text-sm leading-relaxed">
            Atualiza os resultados dos atletas, horários de treinos, fotos da galeria e publica diretamente no Facebook e Instagram.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              onClick={() => onNavigateTab(stat.tab)}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                {stat.badge && (
                  <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full uppercase">
                    {stat.badge}
                  </span>
                )}
              </div>

              <div>
                <div className="text-3xl font-black text-gray-900 group-hover:text-emerald-700 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-gray-700">{stat.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.sublabel}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Social Share Action Center */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-emerald-700" />
              Centro de Partilha para Redes Sociais (Facebook & Instagram)
            </h3>
            <p className="text-xs text-gray-500">
              Gera legendas formatadas com hashtags oficiais e cartões visuais para partilha rápida.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Latest Article Share Card */}
          {latestArticle && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                    Última Notícia
                  </span>
                  <span>{latestArticle.publishDate}</span>
                </div>
                <h4 className="font-extrabold text-base text-gray-900 line-clamp-1 mb-1">
                  {latestArticle.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                  {latestArticle.summary}
                </p>
              </div>

              <button
                onClick={() => onOpenSocialShareNews(latestArticle)}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Gerar Post / Partilhar Notícia</span>
              </button>
            </div>
          )}

          {/* Latest Podium Share Card */}
          {latestPodium && (
            <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-amber-900 mb-2">
                  <span className="bg-amber-400 text-emerald-950 font-black px-2 py-0.5 rounded-md uppercase">
                    Pódio Destaque 🏆
                  </span>
                  <span>{latestPodium.date}</span>
                </div>
                <h4 className="font-extrabold text-base text-gray-900 line-clamp-1 mb-1">
                  {latestPodium.athleteName} — {latestPodium.raceName}
                </h4>
                <p className="text-xs text-gray-600 mb-4">
                  Tempo: <strong>{latestPodium.officialTime}</strong> ({latestPodium.distance} • {latestPodium.category})
                </p>
              </div>

              <button
                onClick={() => onOpenSocialShareResult(latestPodium)}
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Gerar Post de Celebração de Pódio</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
