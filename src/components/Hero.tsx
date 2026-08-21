import React from 'react';
import { Trophy, Calendar, UserPlus, ArrowRight, Award, Flame, ChevronRight, Zap } from 'lucide-react';
import { ClubInfo, RaceResult } from '../types';

interface HeroProps {
  clubInfo: ClubInfo;
  onNavigate: (sectionId: string) => void;
  recentResults: RaceResult[];
}

export const Hero: React.FC<HeroProps> = ({ clubInfo, onNavigate, recentResults }) => {
  const topResult = recentResults.find(r => r.podiumPosition === 1) || recentResults[0];

  return (
    <div className="py-8 sm:py-12 bg-[#f0f4f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ticker for latest achievements */}
        {topResult && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-900/10 text-zinc-800 text-xs sm:text-sm mb-6 shadow-xs">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#055b3a]"></span>
            </span>
            <span className="font-bold text-[#055b3a]">Última Vitória:</span>
            <span className="truncate max-w-[200px] sm:max-w-md text-zinc-600 font-medium">
              {topResult.athleteName} ({topResult.raceName} • {topResult.officialTime})
            </span>
            <button 
              onClick={() => onNavigate('resultados')}
              className="text-[#055b3a] hover:text-[#044a2f] font-extrabold inline-flex items-center ml-1 cursor-pointer"
            >
              Ver <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Hero Bento Card (8 Cols) */}
          <div className="lg:col-span-7 bg-[#055b3a] text-white rounded-3xl p-8 sm:p-12 shadow-sm border border-emerald-950/10 flex flex-col justify-between relative overflow-hidden">
            {/* Athletic background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="absolute -right-16 -top-16 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-3 bg-white/15 border border-white/20 text-lime-300 pl-2 pr-4 py-2 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider backdrop-blur-xs">
                <img 
                  src="/logo.png" 
                  alt="Chesmas Logo" 
                  className="w-7 h-7 object-contain"
                  referrerPolicy="no-referrer" 
                />
                Atletismo Chesmas • Desde {clubInfo.foundationYear}
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-tight">
                Supera os teus limites na <span className="text-lime-300 underline decoration-lime-400/50 decoration-4">Pista</span>, <span className="text-emerald-100">Estrada</span> e <span className="text-lime-300">Trilhos</span>.
              </h1>

              <p className="text-base sm:text-lg text-emerald-100/90 max-w-xl font-normal leading-relaxed">
                {clubInfo.description}
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  id="hero-register-cta-btn"
                  onClick={() => onNavigate('inscricao')}
                  className="inline-flex items-center gap-2.5 bg-lime-400 hover:bg-lime-300 text-emerald-950 px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-sm hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <UserPlus className="w-5 h-5 text-emerald-950" />
                  <span>Quero Inscrever-me</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-trainings-cta-btn"
                  onClick={() => onNavigate('treinos')}
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white px-5 py-3.5 rounded-2xl font-bold text-sm sm:text-base border border-white/20 transition-all cursor-pointer backdrop-blur-xs"
                >
                  <Calendar className="w-5 h-5 text-lime-300" />
                  <span>Ver Horários de Treino</span>
                </button>
              </div>
            </div>

            {/* Badges / Metrics in Bento Sub-grid */}
            <div className="relative z-10 pt-8 mt-8 border-t border-emerald-700/50 grid grid-cols-3 gap-4 text-left">
              <div className="bg-white/10 rounded-2xl p-3 sm:p-4 border border-white/10 backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-black text-lime-300">+120</div>
                <div className="text-xs text-emerald-100/90 font-medium">Atletas Ativos</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-3 sm:p-4 border border-white/10 backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-black text-lime-300">+50</div>
                <div className="text-xs text-emerald-100/90 font-medium">Pódios & Provas</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-3 sm:p-4 border border-white/10 backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-black text-lime-300">100%</div>
                <div className="text-xs text-emerald-100/90 font-medium">Paixão & Foco</div>
              </div>
            </div>
          </div>

          {/* Right Bento Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Visual Showcase Tile */}
            <div className="relative rounded-3xl overflow-hidden border border-zinc-200/80 shadow-xs bg-white flex-1 min-h-[300px] group">
              <img
                src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=80"
                alt="Atletas do Chesmas em competição"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-lime-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    Espírito de Equipa
                  </span>
                  <span className="text-xs text-emerald-200 font-semibold">Época 2026/27</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
                  Treinar com paixão, competir com honra
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90">
                  Dos escalões de formação aos masters, todos encontram o seu ritmo no Chesmas.
                </p>
              </div>
            </div>

            {/* Achievement Bento Tile */}
            <div className="bg-white text-zinc-900 p-6 rounded-3xl shadow-xs border border-zinc-200/80 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100/70 flex items-center justify-center text-[#055b3a] shrink-0">
                <Trophy className="w-7 h-7 text-[#055b3a]" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-[#055b3a]">Quadro de Honra</div>
                <div className="text-base font-extrabold text-zinc-900 leading-snug">
                  Campeões Regionais de Corta-Mato & Fundo
                </div>
                <div className="text-xs text-zinc-500 mt-0.5 font-medium">
                  Mais de 50 pódios alcançados na última época desportiva.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
