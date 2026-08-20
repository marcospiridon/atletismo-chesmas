import React, { useState } from 'react';
import { 
  UserPlus, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  Phone, 
  User, 
  Mail, 
  Calendar, 
  HeartHandshake, 
  FileText, 
  Sparkles,
  Download,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AthleteRegistration } from '../types';

interface RegistrationFormProps {
  onSubmitRegistration: (registration: AthleteRegistration) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmitRegistration }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    idNumber: '',
    nif: '',
    gender: 'M' as 'M' | 'F' | 'Outro',
    address: '',
    city: '',
    postalCode: '',
    escalao: 'Seniores & Sub-23',
    disciplines: ['Estrada & Meia-Maratona'],
    emergencyContactName: '',
    emergencyContactPhone: '',
    medicalConditions: '',
    experienceLevel: 'Iniciante' as 'Iniciante' | 'Intermédio' | 'Avançado / Federado',
    termsAccepted: false,
    rgpdAccepted: false
  });

  const [submittedReg, setSubmittedReg] = useState<AthleteRegistration | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const availableDisciplines = [
    'Escola de Formação (Jovens)',
    'Estrada & Meia-Maratona',
    'Trail Running & Montanha',
    'Pista de Tartan (Velocidade / Barreiras / Meio-Fundo)',
    'Caminhada / Marcha Atlética',
    'Manutenção & Condição Física'
  ];

  const escaloes = [
    'Benjamins (7-11 anos)',
    'Infantis (12-13 anos)',
    'Iniciados (14-15 anos)',
    'Juvenis (16-17 anos)',
    'Juniores (18-19 anos)',
    'Sub-23 & Seniores (20-34 anos)',
    'Veteranos / Masters M35+',
    'Veteranos / Masters M45+',
    'Veteranos / Masters M55+'
  ];

  const handleDisciplineToggle = (item: string) => {
    if (formData.disciplines.includes(item)) {
      setFormData({ ...formData, disciplines: formData.disciplines.filter(d => d !== item) });
    } else {
      setFormData({ ...formData, disciplines: [...formData.disciplines, item] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Por favor preenche todos os campos obrigatórios (Nome, Email e Telemóvel).');
      return;
    }

    if (!formData.termsAccepted || !formData.rgpdAccepted) {
      setErrorMsg('É necessário aceitar os Termos do Clube e a Política de Proteção de Dados (RGPD).');
      return;
    }

    const regNumber = `CHS-2026-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const submissionDate = `${now.toISOString().split('T')[0]} ${now.toTimeString().slice(0, 5)}`;

    const newRegistration: AthleteRegistration = {
      id: `reg-${Date.now()}`,
      registrationNumber: regNumber,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      birthDate: formData.birthDate,
      idNumber: formData.idNumber.trim(),
      nif: formData.nif?.trim() || undefined,
      gender: formData.gender,
      address: formData.address.trim(),
      city: formData.city.trim(),
      postalCode: formData.postalCode.trim(),
      escalao: formData.escalao,
      disciplines: formData.disciplines.length > 0 ? formData.disciplines : ['Estrada & Meia-Maratona'],
      emergencyContactName: formData.emergencyContactName.trim(),
      emergencyContactPhone: formData.emergencyContactPhone.trim(),
      medicalConditions: formData.medicalConditions?.trim() || '',
      experienceLevel: formData.experienceLevel,
      termsAccepted: formData.termsAccepted,
      rgpdAccepted: formData.rgpdAccepted,
      status: 'Pendente',
      submissionDate
    };

    onSubmitRegistration(newRegistration);
    setSubmittedReg(newRegistration);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="inscricao-section" className="py-16 sm:py-20 bg-[#055b3a] text-white relative overflow-hidden border-t border-emerald-950/10">
      {/* Subtle accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-lime-400/20 border border-lime-400/30 text-lime-300 font-black text-xs uppercase px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Época 2026/2027 • Juntos Somos Mais Fortes
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Inscrição & <span className="text-lime-300">Junta-te ao Chesmas</span>
          </h2>
          <p className="text-emerald-100/90 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Preenche o formulário para te juntares à nossa família de corredores. A inscrição dá acesso aos treinos orientados, seguro desportivo e equipamento oficial.
          </p>
        </div>

        {submittedReg ? (
          /* Confirmation card after successful submission */
          <div className="bg-white text-zinc-900 rounded-3xl p-8 sm:p-12 shadow-xl border border-zinc-200/80 animate-fadeIn text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white p-1 flex items-center justify-center shadow-xs border border-zinc-200">
                <img 
                  src="/logo.png" 
                  alt="Logo Chesmas" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-emerald-100/80 text-[#055b3a] flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-9 h-9 text-[#055b3a]" />
              </div>
            </div>

            <span className="bg-emerald-100 text-[#055b3a] font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Inscrição Registada com Sucesso
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-3 mb-2">
              Bem-vindo ao Chesmas, {submittedReg.fullName}!
            </h3>

            <p className="text-zinc-600 text-sm sm:text-base max-w-md mx-auto mb-6">
              A tua pré-inscrição foi recebida e já está registada no sistema do clube com o código de referência:
            </p>

            <div className="bg-[#f0f4f2] border border-emerald-950/10 rounded-2xl p-4 max-w-xs mx-auto mb-6">
              <span className="text-xs text-[#055b3a] font-black block uppercase tracking-wider">
                Nº de Inscrição Oficial
              </span>
              <span className="text-2xl font-black text-zinc-900 font-mono">
                {submittedReg.registrationNumber}
              </span>
            </div>

            <div className="text-left bg-[#f0f4f2] rounded-2xl p-5 border border-emerald-950/5 text-xs sm:text-sm text-zinc-700 space-y-2.5 mb-8 max-w-lg mx-auto">
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Escalão Selecionado:</span>
                <span className="font-black text-zinc-900">{submittedReg.escalao}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Modalidades:</span>
                <span className="font-black text-zinc-900">{submittedReg.disciplines.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Email de Contacto:</span>
                <span className="font-black text-zinc-900">{submittedReg.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Telemóvel:</span>
                <span className="font-black text-zinc-900">{submittedReg.phone}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/351912345678?text=${encodeURIComponent(`Olá! Acabei de fazer a inscrição no Clube de Atletismo Chesmas (Ref: ${submittedReg.registrationNumber}). Gostaria de saber quando posso fazer o primeiro treino experimental!`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xs transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Confirmar no WhatsApp do Clube</span>
              </a>

              <button
                onClick={() => setSubmittedReg(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-sm transition-colors cursor-pointer"
              >
                Nova Inscrição
              </button>
            </div>
          </div>
        ) : (
          /* Actual Form */
          <form 
            onSubmit={handleSubmit}
            className="bg-white text-zinc-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-zinc-200/80 space-y-8"
          >
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-sm flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>{errorMsg}</div>
              </div>
            )}

            {/* Step 1: Personal info */}
            <div>
              <h3 className="text-lg font-black text-zinc-900 flex items-center gap-2 border-b border-zinc-100 pb-2 mb-4">
                <User className="w-5 h-5 text-[#055b3a]" />
                1. Dados Pessoais do Atleta
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: João Manuel da Silva"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Email de Contacto *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ex: joao.silva@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Telemóvel / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="ex: 912 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Data de Nascimento *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Género
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Cartão de Cidadão / BI
                  </label>
                  <input
                    type="text"
                    placeholder="Número do documento"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    NIF (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="ex: 123456789"
                    value={formData.nif}
                    onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Morada / Cidade
                  </label>
                  <input
                    type="text"
                    placeholder="Rua, localidade e código postal"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Sports Category & Modalities */}
            <div>
              <h3 className="text-lg font-black text-zinc-900 flex items-center gap-2 border-b border-zinc-100 pb-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-[#055b3a]" />
                2. Escalão & Modalidades de Interesse
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Escalão Principal
                  </label>
                  <select
                    value={formData.escalao}
                    onChange={(e) => setFormData({ ...formData, escalao: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                  >
                    {escaloes.map(e => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Nível de Experiência Atual
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                  >
                    <option value="Iniciante">Iniciante (Quero começar a correr / aprender)</option>
                    <option value="Intermédio">Intermédio (Já corro regularmente)</option>
                    <option value="Avançado / Federado">Avançado / Federado (Competição)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-2">
                  Disciplinas que pretendes praticar (Podes selecionar mais do que uma):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableDisciplines.map((disc) => {
                    const isChecked = formData.disciplines.includes(disc);
                    return (
                      <button
                        type="button"
                        key={disc}
                        onClick={() => handleDisciplineToggle(disc)}
                        className={`p-3.5 rounded-2xl text-xs font-bold text-left transition-all flex items-center gap-2.5 cursor-pointer border ${
                          isChecked 
                            ? 'bg-emerald-50 border-[#055b3a] text-[#055b3a]' 
                            : 'bg-[#f0f4f2] border-zinc-200/80 text-zinc-700 hover:bg-zinc-100'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                          isChecked ? 'bg-[#055b3a] border-[#055b3a] text-white' : 'border-zinc-300 bg-white'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        <span>{disc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Emergency & Health */}
            <div>
              <h3 className="text-lg font-black text-zinc-900 flex items-center gap-2 border-b border-zinc-100 pb-2 mb-4">
                <HeartHandshake className="w-5 h-5 text-[#055b3a]" />
                3. Contacto de Emergência & Saúde
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Nome do Contacto de Emergência *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Maria Silva (Mãe / Cônjuge)"
                    value={formData.emergencyContactName}
                    onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Telemóvel de Emergência *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="ex: 919 000 111"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Alergias, Lesões Recentes ou Restrições Médicas (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Indica caso tenhas alguma condição que a equipa técnica deva conhecer..."
                    value={formData.medicalConditions}
                    onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f0f4f2] border border-zinc-200/80 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#055b3a] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Terms & RGPD */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                  className="mt-1 w-4 h-4 text-[#055b3a] rounded-md focus:ring-[#055b3a]"
                />
                <span className="text-xs text-zinc-600">
                  Declaro que as informações prestadas são verdadeiras e comprometo-me a cumprir os estatutos e normas de conduta desportiva do <strong>Clube de Atletismo Chesmas</strong>.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.rgpdAccepted}
                  onChange={(e) => setFormData({ ...formData, rgpdAccepted: e.target.checked })}
                  className="mt-1 w-4 h-4 text-[#055b3a] rounded-md focus:ring-[#055b3a]"
                />
                <span className="text-xs text-zinc-600">
                  Autorizo o tratamento dos dados pessoais para efeitos de filiação, seguros desportivos e comunicações oficiais do clube (RGPD).
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-zinc-100">
              <button
                id="submit-registration-btn"
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#055b3a] hover:bg-[#044a2f] text-white font-black text-base shadow-xs hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-5 h-5 text-lime-300" />
                <span>Submeter Inscrição no Clube de Atletismo Chesmas</span>
              </button>
              <p className="text-center text-xs text-zinc-500 mt-2">
                Após a submissão, a equipa técnica entrará em contacto para confirmação de horários e entrega do kit de boas-vindas.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
