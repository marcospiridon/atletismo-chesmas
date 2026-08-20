import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Download, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Phone, 
  Mail, 
  FileText, 
  Calendar, 
  X, 
  Filter,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { AthleteRegistration } from '../../types';

interface AdminRegistrationsProps {
  registrations: AthleteRegistration[];
  onUpdateRegistration: (reg: AthleteRegistration) => void;
  onDeleteRegistration: (id: string) => void;
}

export const AdminRegistrations: React.FC<AdminRegistrationsProps> = ({
  registrations,
  onUpdateRegistration,
  onDeleteRegistration
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Pendente' | 'Contactado' | 'Aprovado' | 'Recusado'>('Todos');
  const [selectedReg, setSelectedReg] = useState<AthleteRegistration | null>(null);

  const filtered = registrations.filter(r => {
    const matchesStatus = statusFilter === 'Todos' || r.status === statusFilter;
    const matchesSearch = 
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery) ||
      r.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.escalao.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (reg: AthleteRegistration, newStatus: AthleteRegistration['status']) => {
    const updated = { ...reg, status: newStatus };
    onUpdateRegistration(updated);
    if (selectedReg && selectedReg.id === reg.id) {
      setSelectedReg(updated);
    }
  };

  const handleSaveNotes = (notes: string) => {
    if (selectedReg) {
      const updated = { ...selectedReg, adminNotes: notes };
      onUpdateRegistration(updated);
      setSelectedReg(updated);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Ref', 'Nome Completo', 'Email', 'Telefone', 'Data Nasc.', 'Escalão', 'Disciplinas', 'Nível', 'Contacto Emergência', 'Tel Emergência', 'Estado', 'Data Submissão'];
    const rows = registrations.map(r => [
      r.registrationNumber,
      `"${r.fullName}"`,
      r.email,
      r.phone,
      r.birthDate,
      `"${r.escalao}"`,
      `"${r.disciplines.join('; ')}"`,
      r.experienceLevel,
      `"${r.emergencyContactName}"`,
      r.emergencyContactPhone,
      r.status,
      r.submissionDate
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `inscricoes_chesmas_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200">
        <div>
          <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-emerald-700" />
            Gestão de Inscrições de Atletas
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Fichas de novos atletas recebidas através do formulário de inscrição do website.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Ficheiro CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {(['Todos', 'Pendente', 'Contactado', 'Aprovado', 'Recusado'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                statusFilter === st
                  ? 'bg-emerald-800 text-white'
                  : 'bg-slate-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {st} ({st === 'Todos' ? registrations.length : registrations.filter(r => r.status === st).length})
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquisar atleta, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Detail Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
            <div className="bg-emerald-900 text-white p-5 px-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono bg-lime-400 text-emerald-950 font-bold px-2 py-0.5 rounded-md uppercase">
                  {selectedReg.registrationNumber}
                </span>
                <h4 className="font-extrabold text-lg mt-1 text-white">
                  Ficha de Inscrição: {selectedReg.fullName}
                </h4>
              </div>
              <button
                onClick={() => setSelectedReg(null)}
                className="text-emerald-200 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-gray-800">
              {/* Status Selector */}
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Estado da Inscrição:
                </span>
                <div className="flex items-center gap-2">
                  {(['Pendente', 'Contactado', 'Aprovado', 'Recusado'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedReg, st)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        selectedReg.status === st
                          ? st === 'Aprovado' ? 'bg-emerald-600 text-white' :
                            st === 'Contactado' ? 'bg-blue-600 text-white' :
                            st === 'Recusado' ? 'bg-rose-600 text-white' :
                            'bg-amber-500 text-white'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal info grid */}
              <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-100">
                <div>
                  <span className="text-xs text-gray-400 block">Nome Completo</span>
                  <span className="font-bold text-gray-900">{selectedReg.fullName}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Género / Data Nasc.</span>
                  <span>{selectedReg.gender} • {selectedReg.birthDate}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Email</span>
                  <a href={`mailto:${selectedReg.email}`} className="text-emerald-700 font-semibold hover:underline">
                    {selectedReg.email}
                  </a>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Telemóvel</span>
                  <a href={`tel:${selectedReg.phone}`} className="text-emerald-700 font-semibold hover:underline">
                    {selectedReg.phone}
                  </a>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Doc. Identificação / NIF</span>
                  <span>{selectedReg.idNumber} {selectedReg.nif ? `(NIF: ${selectedReg.nif})` : ''}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Morada & Cidade</span>
                  <span>{selectedReg.address || 'Não indicada'} {selectedReg.city ? `• ${selectedReg.city}` : ''}</span>
                </div>
              </div>

              {/* Sports preferences */}
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-gray-600">Escalão Pretendido:</span>
                  <span className="font-bold text-emerald-900">{selectedReg.escalao}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-gray-600">Nível de Experiência:</span>
                  <span className="font-bold text-gray-800">{selectedReg.experienceLevel}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-600 block mb-1">Disciplinas Selecionadas:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedReg.disciplines.map((d, i) => (
                      <span key={i} className="bg-emerald-100 text-emerald-900 font-semibold text-xs px-2.5 py-0.5 rounded-md">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Emergency info */}
              <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
                <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                  Contacto de Emergência & Saúde
                </h5>
                <div className="grid grid-cols-2 gap-2 text-xs text-amber-950">
                  <div>
                    <span className="text-amber-700 block">Pessoa de Contacto:</span>
                    <strong>{selectedReg.emergencyContactName}</strong>
                  </div>
                  <div>
                    <span className="text-amber-700 block">Telemóvel de Emergência:</span>
                    <strong>{selectedReg.emergencyContactPhone}</strong>
                  </div>
                </div>
                {selectedReg.medicalConditions && (
                  <div className="mt-2 text-xs text-amber-900">
                    <span className="font-bold">Observações Médicas:</span> {selectedReg.medicalConditions}
                  </div>
                )}
              </div>

              {/* Admin Notes */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Notas Internas da Equipa Técnica
                </label>
                <textarea
                  rows={3}
                  placeholder="Escreve aqui notas (ex: Entregue equipamento em 20/08, convocado para treino)..."
                  defaultValue={selectedReg.adminNotes || ''}
                  onBlur={(e) => handleSaveNotes(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <a
                  href={`https://wa.me/351${selectedReg.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Olá ${selectedReg.fullName}! Falamos do Clube de Atletismo Chesmas em relação à tua inscrição (Ref: ${selectedReg.registrationNumber}). Bem-vindo!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contactar via WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    if (window.confirm(`Eliminar definitivamente a inscrição de ${selectedReg.fullName}?`)) {
                      onDeleteRegistration(selectedReg.id);
                      setSelectedReg(null);
                    }
                  }}
                  className="text-xs text-rose-600 hover:underline font-semibold"
                >
                  Eliminar Inscrição
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registrations List Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100 overflow-x-auto">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-gray-500 text-xs">
              Nenhuma inscrição encontrada com os critérios selecionados.
            </div>
          ) : (
            filtered.map((reg) => (
              <div
                key={reg.id}
                onClick={() => setSelectedReg(reg)}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-gray-500">
                      {reg.registrationNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      reg.status === 'Aprovado' ? 'bg-emerald-100 text-emerald-800' :
                      reg.status === 'Contactado' ? 'bg-blue-100 text-blue-800' :
                      reg.status === 'Recusado' ? 'bg-rose-100 text-rose-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {reg.status}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      Submetido em: {reg.submissionDate}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-base text-gray-900">
                    {reg.fullName} <span className="text-gray-500 font-normal text-xs">• {reg.escalao}</span>
                  </h4>
                  <div className="text-xs text-gray-600 mt-0.5 flex flex-wrap items-center gap-3">
                    <span>📧 {reg.email}</span>
                    <span>📞 {reg.phone}</span>
                    <span>🏃 {reg.disciplines.join(', ')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    Ver Ficha Completa →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
