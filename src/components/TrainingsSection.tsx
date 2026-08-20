import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Target, 
  AlertCircle, 
  Sparkles,
  ChevronRight,
  Send,
  Flame
} from 'lucide-react';
import { TrainingSession } from '../types';

interface TrainingsSectionProps {
  trainings: TrainingSession[];
  onNavigateToRegister: () => void;
}

export const TrainingsSection: React.FC<TrainingsSectionProps> = ({ trainings, onNavigateToRegister }) => {
  const [filterCategory, setFilterCategory] = useState<string>('Todas');

  const categories = ['Todas', ...Array.from(new Set(trainings.map(t => t.category)))];

  const filteredTrainings = trainings.filter(t => 
    t.active && (filterCategory === 'Todas' || t.category === filterCategory)
  );

  const handleShareTraining = (training: TrainingSession) => {
    const text = `🏃‍♂️ *Treino de Atletismo - Chesmas*\n\n📌 *${training.title}*\n📅 *Dias:* ${training.dayOfWeek}\n⏰ *Horário:* ${training.time}\n📍 *Local:* ${training.location}\n👤 *Treinador:* ${training.coach}\n🎯 *Foco:* ${training.focus}\n${training.notes ? `⚠️ *Avisos:* ${training.notes}` : ''}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="treinos-section" className="py-16 sm:py-20 bg-[#f0f4f2] border-t border-emerald-950/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#055b3a] font-black text-xs uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4" />
              Plano de Treinos & Escalões
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
              Calendário & Horários de <span className="text-[#055b3a]">Treino</span>
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-1 max-w-2xl">
              Sessões orientadas por treinadores certificados pela Federação Portuguesa de Atletismo. Vem fazer 2 treinos experimentais gratuitos!
            </p>
          </div>

          <button
            onClick={onNavigateToRegister}
            className="inline-flex items-center gap-2 bg-[#055b3a] hover:bg-[#044a2f] text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-lime-300" />
            <span>Treino Experimental Grátis</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#055b3a] text-white shadow-xs'
                  : 'bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Training Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainings.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/80 hover:border-emerald-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between group shadow-xs"
            >
              <div>
                {/* Badge Escalão & Day */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-emerald-100/80 text-[#055b3a] font-extrabold text-xs px-3 py-1 rounded-full">
                    {session.category}
                  </span>
                  <span className="text-xs font-bold text-zinc-500 bg-zinc-100/70 px-2.5 py-0.5 rounded-full border border-zinc-200/60">
                    {session.targetLevel}
                  </span>
                </div>

                <h3 className="text-xl font-black text-zinc-900 group-hover:text-[#055b3a] transition-colors mb-4">
                  {session.title}
                </h3>

                {/* Info List */}
                <div className="space-y-2.5 text-sm text-zinc-700 mb-5">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#055b3a] shrink-0" />
                    <span className="font-bold text-zinc-900">{session.dayOfWeek}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#055b3a] shrink-0" />
                    <span className="font-medium text-zinc-700">{session.time}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#055b3a] shrink-0" />
                    <span className="text-zinc-600">{session.location}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-[#055b3a] shrink-0" />
                    <span className="text-zinc-700">Treinador: <strong className="text-zinc-900">{session.coach}</strong></span>
                  </div>
                </div>

                {/* Focus box */}
                <div className="bg-[#f0f4f2] p-4 rounded-2xl border border-emerald-950/5 mb-4">
                  <div className="flex items-start gap-2 text-xs text-zinc-700">
                    <Target className="w-4 h-4 text-[#055b3a] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-zinc-900 font-bold block mb-0.5">Conteúdo do Treino:</strong>
                      {session.focus}
                    </div>
                  </div>
                </div>

                {session.notes && (
                  <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2 mb-4">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>{session.notes}</div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                <button
                  onClick={() => handleShareTraining(session)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#055b3a] hover:text-[#044a2f] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  title="Partilhar treino no WhatsApp"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Horário</span>
                </button>

                <button
                  onClick={onNavigateToRegister}
                  className="inline-flex items-center gap-1 text-xs font-black text-zinc-900 hover:text-[#055b3a] transition-colors cursor-pointer"
                >
                  <span>Experimentar</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bento Banner Info */}
        <div className="mt-12 bg-[#055b3a] text-white rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xs relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-lime-400 text-emerald-950 flex items-center justify-center font-black shrink-0 shadow-xs">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-black text-white">Não sabes qual o melhor escalão para ti ou para o teu filho?</h4>
              <p className="text-xs sm:text-sm text-emerald-100/90">
                Fala diretamente com a equipa técnica para agendamento de uma sessão de avaliação sem compromisso.
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToRegister}
            className="bg-lime-400 hover:bg-lime-300 text-emerald-950 px-6 py-3 rounded-2xl font-black text-sm shadow-xs transition-all shrink-0 cursor-pointer relative z-10"
          >
            Solicitar Aconselhamento Técnico
          </button>
        </div>
      </div>
    </section>
  );
};
