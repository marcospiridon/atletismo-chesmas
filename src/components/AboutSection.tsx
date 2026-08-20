import React from 'react';
import { 
  Users, 
  Target, 
  Award, 
  Heart, 
  Sparkles, 
  Compass, 
  Footprints, 
  Zap, 
  Shield 
} from 'lucide-react';
import { ClubInfo } from '../types';

interface AboutSectionProps {
  clubInfo: ClubInfo;
  onNavigateToRegister: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ clubInfo, onNavigateToRegister }) => {
  const values = [
    {
      icon: Target,
      title: "Superação & Disciplina",
      desc: "Incentivamos cada atleta a superar as suas marcas com método, paciência e determinação."
    },
    {
      icon: Users,
      title: "Espírito de Família",
      desc: "No Chesmas ninguém corre sozinho. O companheirismo e apoio mútuo estão no centro da nossa cultura."
    },
    {
      icon: Sparkles,
      title: "Formação Integral",
      desc: "Ensinamos os valores do desporto aos mais jovens: respeito, resiliência, trabalho em equipa e saúde."
    },
    {
      icon: Award,
      title: "Paixão pelo Atletismo",
      desc: "Do asfalto à pista e aos trilhos de montanha, vivemos intensamente todas as passadas e desafios."
    }
  ];

  const disciplines = [
    {
      title: "Formação & Academia Jovem",
      target: "6 aos 15 anos",
      desc: "Iniciação ao atletismo através de atividades lúdicas, desenvolvimento motor, corridas de velocidade, barreiras e saltos.",
      icon: Footprints
    },
    {
      title: "Corrida de Estrada & Fundo",
      target: "10K, Meias-Maratonas & Maratonas",
      desc: "Grupos de treino estruturados com ritmos adaptados, séries no limiar e planos de preparação de provas nacionais e internacionais.",
      icon: Zap
    },
    {
      title: "Trail Running & Montanha",
      target: "Provas de Trilhos e Ultra Trail",
      desc: "Preparação específica para desnível positivo, técnica de descida em single-tracks, fortalecimento articular e autonomia.",
      icon: Compass
    },
    {
      title: "Pista de Tartan & Masters",
      target: "Velocidade, Meio-Fundo & Veteranos",
      desc: "Utilização do piso sintético para evolução técnica, controlo rigoroso de tempos e participação em campeonatos oficiais.",
      icon: Shield
    }
  ];

  return (
    <section id="sobre-section" className="py-16 sm:py-20 bg-[#f0f4f2] border-t border-emerald-950/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-[#055b3a] font-black text-xs uppercase tracking-wider mb-2">
            <Users className="w-4 h-4 text-[#055b3a]" />
            Conhece a Nossa História & Valores
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            Mais do que um clube, uma <span className="text-[#055b3a]">Paixão Partilhada</span>
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg mt-4 leading-relaxed">
            Fundado em {clubInfo.foundationYear}, o <strong>{clubInfo.name}</strong> nasceu com a missão de aproximar pessoas de todas as idades ao atletismo, fomentando hábitos de vida saudáveis e formando atletas competitivos a nível regional e nacional.
          </p>
        </div>

        {/* Pillars / Values Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/80 hover:border-emerald-300 hover:shadow-md transition-all duration-300 group shadow-xs"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-[#055b3a] flex items-center justify-center mb-4 group-hover:bg-[#055b3a] group-hover:text-white transition-colors shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-zinc-900 mb-2">{v.title}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Disciplines Bento Container */}
        <div className="bg-[#055b3a] text-white rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden border border-emerald-950/10 shadow-xs">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-lime-300 text-xs font-black uppercase tracking-wider">Secções Desportivas</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Modalidades & Categorias
                </h3>
              </div>
              <p className="text-sm text-emerald-100/90 max-w-md">
                Qualquer que seja o teu objetivo desportivo, temos um plano e um grupo de treino pronto para te acolher.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {disciplines.map((d, idx) => {
                const Icon = d.icon;
                return (
                  <div 
                    key={idx}
                    className="bg-white/10 rounded-2xl p-6 border border-white/15 hover:border-lime-400/40 transition-all backdrop-blur-xs"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/15 text-lime-300 flex items-center justify-center shrink-0 border border-white/20">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-black text-lg text-white">{d.title}</h4>
                        </div>
                        <span className="inline-block text-xs font-black text-emerald-950 bg-lime-400 px-2.5 py-0.5 rounded-full mb-2">
                          {d.target}
                        </span>
                        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                          {d.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Leadership & Coaching Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#055b3a] text-white flex items-center justify-center text-xl font-black shrink-0 shadow-xs">
              AF
            </div>
            <div>
              <span className="text-xs font-black text-[#055b3a] uppercase tracking-wider block">Coordenação Técnica</span>
              <h4 className="text-xl font-black text-zinc-900">{clubInfo.headCoach}</h4>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                Treinador Grau II da Federação Portuguesa de Atletismo com mais de 15 anos de experiência na formação de atletas de fundo e meio-fundo.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800 text-white flex items-center justify-center text-xl font-black shrink-0 shadow-xs">
              CS
            </div>
            <div>
              <span className="text-xs font-black text-zinc-500 uppercase tracking-wider block">Presidência & Direção</span>
              <h4 className="text-xl font-black text-zinc-900">{clubInfo.president}</h4>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                Dedicação total ao crescimento das condições desportivas dos nossos atletas e à ligação do clube com a comunidade local.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
