import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  ChevronDown,
  Instagram,
  Facebook,
  MessageCircle
} from 'lucide-react';
import { ClubInfo } from '../types';

interface ContactSectionProps {
  clubInfo: ClubInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ clubInfo }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const faqs = [
    {
      q: "Preciso de ter experiência prévia na corrida para entrar no Chesmas?",
      a: "Não! Temos grupos para iniciantes absolutos, onde aprendes a técnica correta de corrida com evolução gradual, assim como grupos avançados de competição."
    },
    {
      q: "Posso experimentar antes de pagar qualquer mensalidade?",
      a: "Sim, oferecemos 2 treinos experimentais gratuitos para conheceres os treinadores, a pista e o ambiente do grupo."
    },
    {
      q: "A que escalões etários se destina o clube?",
      a: "Acolhemos atletas a partir dos 6 anos (Benjamins na nossa Escola de Formação) até aos escalões de Masters/Veteranos (sem limite de idade)."
    },
    {
      q: "O clube trata das inscrições nas provas oficiais e federadas?",
      a: "Sim, o departamento técnico trata da filiação na Federação Portuguesa de Atletismo e da logística de inscrição nas provas do calendário regional e nacional."
    }
  ];

  return (
    <section id="contactos-section" className="py-16 sm:py-20 bg-[#f0f4f2] border-t border-emerald-950/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-[#055b3a] font-black text-xs uppercase tracking-wider mb-2">
            <Phone className="w-4 h-4 text-[#055b3a]" />
            Fala Connosco & Localizações
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            Estamos Prontos para te <span className="text-[#055b3a]">Acolher</span>
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mt-2">
            Tens alguma dúvida sobre os treinos, mensalidades ou eventos? Entra em contacto ou visita-nos nos locais de treino.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct info & Venues */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#055b3a] text-white rounded-3xl p-6 sm:p-8 shadow-xs border border-emerald-950/10">
              <h3 className="text-xl font-black mb-4">Contactos Diretos</h3>
              
              <div className="space-y-4 text-sm text-emerald-100/90">
                <a 
                  href={`tel:${clubInfo.phone}`}
                  className="flex items-center gap-3 hover:text-lime-300 transition-colors"
                >
                  <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-lime-300 shrink-0 border border-white/15">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-200 block font-medium">Telemóvel Geral</span>
                    <strong className="text-white text-base font-black">{clubInfo.phone}</strong>
                  </div>
                </a>

                <a 
                  href={`mailto:${clubInfo.email}`}
                  className="flex items-center gap-3 hover:text-lime-300 transition-colors"
                >
                  <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-lime-300 shrink-0 border border-white/15">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-200 block font-medium">Correio Eletrónico</span>
                    <strong className="text-white text-base font-black">{clubInfo.email}</strong>
                  </div>
                </a>

                <a 
                  href={clubInfo.socialMedia.whatsapp} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3 hover:text-lime-300 transition-colors"
                >
                  <div className="w-11 h-11 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-200 block font-medium">WhatsApp Oficial</span>
                    <strong className="text-white text-base font-black">Conversar no WhatsApp</strong>
                  </div>
                </a>
              </div>

              <div className="pt-6 mt-6 border-t border-white/15">
                <span className="text-xs text-emerald-200 block mb-2 font-black uppercase tracking-wider">
                  Segue-nos nas Redes Sociais
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={clubInfo.socialMedia.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-white/10 hover:bg-[#1877F2] text-white transition-colors border border-white/15 cursor-pointer"
                    title="Facebook Chesmas"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={clubInfo.socialMedia.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-white/10 hover:bg-[#E4405F] text-white transition-colors border border-white/15 cursor-pointer"
                    title="Instagram Chesmas"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Training locations Bento Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/80 shadow-xs">
              <h4 className="font-black text-zinc-900 text-base mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#055b3a]" />
                Locais Oficiais de Treino
              </h4>
              <div className="space-y-3 text-xs sm:text-sm text-zinc-700">
                {clubInfo.trainingLocations.map((loc, i) => (
                  <div key={i} className="bg-[#f0f4f2] p-4 rounded-2xl border border-emerald-950/5">
                    <div className="font-black text-zinc-900">{loc.name}</div>
                    <div className="text-zinc-600 text-xs mt-0.5">{loc.address}</div>
                    <div className="text-[#055b3a] text-xs font-bold mt-1">{loc.details}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact form & FAQs */}
          <div className="lg:col-span-7 space-y-8">
            {/* Contact Form Bento Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs">
              <h3 className="text-xl font-black text-zinc-900 mb-1">
                Envia-nos uma Mensagem
              </h3>
              <p className="text-xs text-zinc-500 mb-6">
                Respondemos habitualmente num prazo máximo de 24 horas.
              </p>

              {sent ? (
                <div className="bg-emerald-50 border border-emerald-200 text-[#055b3a] p-6 rounded-2xl text-center space-y-2 animate-fadeIn">
                  <CheckCircle2 className="w-10 h-10 text-[#055b3a] mx-auto" />
                  <h4 className="font-black text-base">Mensagem Enviada com Sucesso!</h4>
                  <p className="text-xs text-emerald-800">
                    Obrigado pelo teu contacto. A equipa do Chesmas responderá brevemente.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">O teu Nome *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nome e apelido"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">O teu Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="email@exemplo.pt"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Assunto</label>
                    <input
                      type="text"
                      placeholder="ex: Dúvida sobre treino de formação infantil"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Mensagem *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Escreve aqui a tua mensagem..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[#055b3a] hover:bg-[#044a2f] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-lime-300" />
                    <span>Enviar Mensagem</span>
                  </button>
                </form>
              )}
            </div>

            {/* Accordion FAQs Bento Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs">
              <h4 className="font-black text-zinc-900 text-lg mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#055b3a]" />
                Perguntas Frequentes (FAQ)
              </h4>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-[#f0f4f2] rounded-2xl border border-zinc-200/60 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-4 py-3.5 text-left font-bold text-sm text-zinc-900 flex items-center justify-between gap-2 hover:text-[#055b3a] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform ${openFaq === index ? 'rotate-180 text-[#055b3a]' : ''}`} />
                    </button>
                    {openFaq === index && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-200/60 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
