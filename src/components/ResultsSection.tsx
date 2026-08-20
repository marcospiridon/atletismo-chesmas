import React, { useState } from 'react';
import { 
  Trophy, 
  Search, 
  Medal, 
  Calendar, 
  MapPin, 
  Flame, 
  Timer, 
  Activity,
  Share2,
  Check
} from 'lucide-react';
import { RaceResult } from '../types';
import { socialSharer } from '../utils/socialSharer';

interface ResultsSectionProps {
  results: RaceResult[];
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterMedal, setFilterMedal] = useState<'todos' | 'podios' | 'ouro' | 'prata' | 'bronze'>('todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredResults = results.filter((res) => {
    const matchesSearch = 
      res.raceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.athleteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.distance.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMedal = 
      filterMedal === 'todos' ? true :
      filterMedal === 'podios' ? !!res.podiumPosition :
      filterMedal === 'ouro' ? res.medalType === 'gold' :
      filterMedal === 'prata' ? res.medalType === 'silver' :
      res.medalType === 'bronze';

    return matchesSearch && matchesMedal;
  });

  const handleShareResult = async (result: RaceResult) => {
    const caption = socialSharer.formatResultSocialCaption(result);
    const success = await socialSharer.copyToClipboard(caption);
    if (success) {
      setCopiedId(result.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section id="resultados-section" className="py-16 sm:py-20 bg-[#f0f4f2] border-t border-emerald-950/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#055b3a] font-black text-xs uppercase tracking-wider mb-2">
              <Trophy className="w-4 h-4 text-[#055b3a]" />
              Quadro de Honra & Conquistas
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
              Resultados Oficiais & <span className="text-[#055b3a]">Pódios</span>
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-1 max-w-xl">
              Celebramos o esforço, os recordes pessoais e as medalhas conquistadas pelos atletas do Chesmas em todo o país.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="results-search-input"
                type="text"
                placeholder="Atleta, prova ou local..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#055b3a] shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Podium Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setFilterMedal('todos')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filterMedal === 'todos' ? 'bg-[#055b3a] text-white shadow-xs' : 'bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200/80'
            }`}
          >
            Todas as Provas ({results.length})
          </button>
          <button
            onClick={() => setFilterMedal('podios')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filterMedal === 'podios' ? 'bg-[#055b3a] text-white shadow-xs' : 'bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200/80'
            }`}
          >
            🏆 Apenas Pódios ({results.filter(r => r.podiumPosition).length})
          </button>
          <button
            onClick={() => setFilterMedal('ouro')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filterMedal === 'ouro' ? 'bg-amber-500 text-white shadow-xs' : 'bg-amber-50 text-amber-900 border border-amber-200'
            }`}
          >
            🥇 Ouro ({results.filter(r => r.medalType === 'gold').length})
          </button>
          <button
            onClick={() => setFilterMedal('prata')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filterMedal === 'prata' ? 'bg-slate-600 text-white shadow-xs' : 'bg-slate-100 text-slate-800 border border-slate-200'
            }`}
          >
            🥈 Prata ({results.filter(r => r.medalType === 'silver').length})
          </button>
          <button
            onClick={() => setFilterMedal('bronze')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filterMedal === 'bronze' ? 'bg-amber-800 text-white shadow-xs' : 'bg-amber-100 text-amber-950 border border-amber-300'
            }`}
          >
            🥉 Bronze ({results.filter(r => r.medalType === 'bronze').length})
          </button>
        </div>

        {/* Results Bento Grid */}
        {filteredResults.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-zinc-300">
            <Trophy className="w-12 h-12 text-zinc-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-zinc-800">Nenhum resultado encontrado</h3>
            <p className="text-sm text-zinc-500 max-w-sm mx-auto mt-1">
              Não encontramos registos correspondentes à pesquisa efetuada.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((result) => {
              const isGold = result.medalType === 'gold';
              const isSilver = result.medalType === 'silver';
              const isBronze = result.medalType === 'bronze';

              return (
                <div
                  key={result.id}
                  className={`bg-white rounded-3xl p-6 sm:p-7 border shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
                    isGold 
                      ? 'border-amber-300 ring-2 ring-amber-200/50' 
                      : isSilver 
                      ? 'border-slate-300' 
                      : isBronze 
                      ? 'border-amber-400/50' 
                      : 'border-zinc-200/80 hover:border-emerald-300'
                  }`}
                >
                  {/* Top Badge Medal */}
                  {result.podiumPosition && (
                    <div className="absolute top-0 right-0">
                      <div className={`text-[10px] font-black uppercase px-3.5 py-1.5 rounded-bl-2xl shadow-xs text-white ${
                        isGold ? 'bg-gradient-to-r from-amber-500 to-yellow-600' :
                        isSilver ? 'bg-gradient-to-r from-slate-500 to-gray-600' :
                        'bg-gradient-to-r from-amber-700 to-orange-800'
                      }`}>
                        {isGold ? '🥇 1º Lugar' : isSilver ? '🥈 2º Lugar' : '🥉 3º Lugar'}
                      </div>
                    </div>
                  )}

                  <div>
                    {/* Race header */}
                    <div className="text-xs text-zinc-500 flex items-center gap-2 mb-2 pr-20">
                      <span className="flex items-center gap-1 font-bold text-[#055b3a]">
                        <MapPin className="w-3 h-3 text-[#055b3a]" />
                        {result.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(result.date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    <h3 className="font-black text-zinc-900 text-lg leading-tight mb-2 group-hover:text-[#055b3a] transition-colors">
                      {result.raceName}
                    </h3>
                    <div className="text-xs font-bold text-[#055b3a] mb-4 inline-block bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                      Distância: {result.distance}
                    </div>

                    {/* Athlete Box */}
                    <div className="bg-[#f0f4f2] rounded-2xl p-4 border border-emerald-950/5 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-black text-zinc-900 text-base">
                          {result.athleteName}
                        </div>
                        {result.bibNumber && (
                          <span className="text-[11px] font-mono text-zinc-500 bg-white px-2 py-0.5 rounded-full border border-zinc-200/60 font-bold">
                            Dorsal #{result.bibNumber}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-zinc-700">
                        <div className="flex items-center gap-1.5">
                          <Timer className="w-3.5 h-3.5 text-[#055b3a]" />
                          <span>Tempo: <strong className="text-zinc-900 font-black">{result.officialTime}</strong></span>
                        </div>
                        {result.pace && (
                          <div className="flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5 text-[#055b3a]" />
                            <span>Ritmo: <strong className="text-zinc-900">{result.pace}</strong></span>
                          </div>
                        )}
                      </div>

                      <div className="mt-2 pt-2 border-t border-zinc-200/60 text-xs text-zinc-600 flex items-center justify-between">
                        <span>Escalão: <strong className="text-zinc-800">{result.category}</strong></span>
                        {result.categoryRank && (
                          <span className="font-extrabold text-[#055b3a]">
                            {result.categoryRank}º no Escalão
                          </span>
                        )}
                      </div>
                    </div>

                    {result.notes && (
                      <p className="text-xs text-zinc-600 italic bg-white p-3 rounded-xl border border-zinc-200/60 mb-3">
                        "{result.notes}"
                      </p>
                    )}
                  </div>

                  {/* Share button */}
                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400 font-medium">
                      Homologado pelo Clube
                    </span>

                    <button
                      id={`share-result-btn-${result.id}`}
                      onClick={() => handleShareResult(result)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#055b3a] hover:text-[#044a2f] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                      title="Copiar texto formatado para redes sociais"
                    >
                      {copiedId === result.id ? (
                        <>
                          <Check className="w-3 h-3 text-[#055b3a]" />
                          <span className="text-[#055b3a]">Copiado p/ Redes!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3 h-3" />
                          <span>Partilhar Prova</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
