import React from 'react';
import { 
  Flame, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  ShieldCheck, 
  Heart,
  ArrowUp
} from 'lucide-react';
import { ClubInfo } from '../types';

interface FooterProps {
  clubInfo: ClubInfo;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ clubInfo, onNavigate, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#055b3a] text-emerald-100 border-t border-emerald-950/15">
      {/* Main footer contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & motto */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-md border border-white/20 shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Logo Clube de Atletismo Chesmas" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-black text-lg text-white tracking-tight block">
                  CLUBE DE ATLETISMO
                </span>
                <span className="text-lime-300 font-black text-xl sm:text-2xl tracking-wider -mt-1 block">
                  CHESMAS
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              {clubInfo.description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={clubInfo.socialMedia.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors border border-white/15 cursor-pointer"
                title="Facebook Oficial"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={clubInfo.socialMedia.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-[#E4405F] text-white flex items-center justify-center transition-colors border border-white/15 cursor-pointer"
                title="Instagram Oficial"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-lime-300">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/90">
              <li>
                <button onClick={() => onNavigate('inicio')} className="hover:text-lime-300 transition-colors cursor-pointer">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sobre')} className="hover:text-lime-300 transition-colors cursor-pointer">
                  O Clube
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('noticias')} className="hover:text-lime-300 transition-colors cursor-pointer">
                  Notícias & Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('treinos')} className="hover:text-lime-300 transition-colors cursor-pointer">
                  Horários de Treinos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('galeria')} className="hover:text-lime-300 transition-colors cursor-pointer">
                  Galeria de Fotos
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Modalities */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-lime-300">
              Secções & Escalões
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-100/80">
              <li>• Escola de Atletismo (Benjamins a Infantis)</li>
              <li>• Jovens de Rendimento (Juvenis & Juniores)</li>
              <li>• Corrida de Estrada & Fundo (10K / 21K / 42K)</li>
              <li>• Secção de Trail Running & Ultra Trail</li>
              <li>• Pista Sintética (Velocidade e Barreiras)</li>
              <li>• Masters & Veteranos</li>
            </ul>
          </div>

          {/* Col 4: Contacts & Admin trigger */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-lime-300">
              Contactos
            </h4>
            <div className="space-y-2 text-xs text-emerald-100/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-lime-300 shrink-0" />
                <span>{clubInfo.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-lime-300 shrink-0" />
                <span>{clubInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-lime-300 shrink-0" />
                <span>{clubInfo.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="footer-admin-login-btn"
                onClick={onOpenAdmin}
                className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-2xl text-xs font-bold border border-white/20 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-lime-300" />
                <span>Área Administrativa (Gestão)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Partners & Sponsors banner */}
        <div className="mt-12 pt-8 border-t border-white/15">
          <div className="text-center mb-4">
            <span className="text-[11px] font-black uppercase tracking-widest text-lime-300">
              Apoios & Parceiros Oficiais
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-emerald-100 font-bold">
            <span className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">Câmara Municipal</span>
            <span className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">Junta de Freguesia</span>
            <span className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">Associação de Atletismo</span>
            <span className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">Federação Portuguesa de Atletismo</span>
            <span className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">Comércio Local & Patrocinadores</span>
          </div>
        </div>

        {/* Bottom copyright and back-to-top */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/70 gap-4">
          <div>
            © {new Date().getFullYear()} {clubInfo.name}. Todos os direitos reservados.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-xs"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
