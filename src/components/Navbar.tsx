import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Trophy, 
  Calendar, 
  Newspaper, 
  Users, 
  Image as ImageIcon, 
  UserPlus, 
  ShieldCheck, 
  Phone,
  Flame,
  Instagram,
  Facebook
} from 'lucide-react';
import { ClubInfo } from '../types';

interface NavbarProps {
  clubInfo: ClubInfo;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  pendingRegistrationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  clubInfo,
  activeSection,
  onNavigate,
  onOpenAdmin,
  pendingRegistrationsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'O Clube' },
    { id: 'noticias', label: 'Notícias & Blog', icon: Newspaper },
    { id: 'treinos', label: 'Treinos & Calendário', icon: Calendar },
    { id: 'resultados', label: 'Resultados & Pódios', icon: Trophy },
    { id: 'galeria', label: 'Fotos', icon: ImageIcon },
    { id: 'inscricao', label: 'Inscrição', icon: UserPlus, highlight: true },
    { id: 'contactos', label: 'Contactos', icon: Phone }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-950/10 shadow-xs transition-all">
      {/* Top micro bar for quick info & socials */}
      <div className="bg-[#055b3a] text-emerald-100 text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold">
              <Flame className="w-3.5 h-3.5 text-lime-400" />
              Época 2026/2027 • Inscrições Abertas
            </span>
            <span className="hidden sm:inline text-emerald-300/60">|</span>
            <span className="hidden sm:inline text-emerald-100/90 text-[11px] font-medium">
              Formação • Estrada • Trail • Pista
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a 
                href={clubInfo.socialMedia.facebook} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-lime-400 transition-colors"
                title="Facebook do Atletismo Chesmas"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a 
                href={clubInfo.socialMedia.instagram} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-lime-400 transition-colors"
                title="Instagram do Atletismo Chesmas"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              id="nav-admin-btn-top"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-xs bg-[#04452c] hover:bg-[#033622] text-emerald-100 px-2.5 py-1 rounded-full transition-colors border border-emerald-600/40 cursor-pointer"
            >
              <ShieldCheck className="w-3 h-3 text-lime-400" />
              <span className="font-semibold">Área de Gestão</span>
              {pendingRegistrationsCount > 0 && (
                <span className="bg-lime-400 text-[#055b3a] font-black px-1.5 py-0.2 rounded-full text-[10px]">
                  {pendingRegistrationsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white p-1 flex items-center justify-center shadow-xs border border-emerald-950/10 group-hover:scale-105 transition-transform shrink-0">
              <img 
                src="/logo.png" 
                alt="Logo Clube de Atletismo Chesmas" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight text-zinc-900 group-hover:text-[#055b3a] transition-colors">
                  ATLETISMO <span className="text-[#055b3a]">CHESMAS</span>
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-medium tracking-wide">
                Clube & Formação Desportiva
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              if (link.highlight) {
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className="ml-2 inline-flex items-center gap-2 bg-[#055b3a] hover:bg-[#044a2f] text-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4 text-lime-300" />
                    <span>Inscreve-te</span>
                  </button>
                );
              }
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'text-[#055b3a] bg-emerald-100/60' 
                      : 'text-zinc-700 hover:text-[#055b3a] hover:bg-emerald-50/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-zinc-700 hover:text-[#055b3a] hover:bg-emerald-50 focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200/80 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                  link.highlight
                    ? 'bg-[#055b3a] text-white'
                    : isActive
                    ? 'bg-emerald-50 text-[#055b3a]'
                    : 'text-zinc-800 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon className={`w-5 h-5 ${link.highlight ? 'text-lime-300' : 'text-[#055b3a]'}`} />}
                  <span>{link.label}</span>
                </div>
              </button>
            );
          })}

          <div className="pt-4 border-t border-zinc-100 flex flex-col gap-2">
            <button
              id="mobile-admin-access-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-sm transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[#055b3a]" />
              <span>Painel de Administração</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
