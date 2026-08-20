import React, { useState } from 'react';
import { 
  Trophy, 
  Plus, 
  Edit3, 
  Trash2, 
  Share2, 
  Medal, 
  Search, 
  Calendar, 
  Timer, 
  X,
  MapPin,
  Sparkles
} from 'lucide-react';
import { RaceResult } from '../../types';

interface AdminResultsProps {
  results: RaceResult[];
  onSaveResult: (result: RaceResult) => void;
  onDeleteResult: (id: string) => void;
  onOpenSocialShare: (result: RaceResult) => void;
}

export const AdminResults: React.FC<AdminResultsProps> = ({
  results,
  onSaveResult,
  onDeleteResult,
  onOpenSocialShare
}) => {
  const [editingResult, setEditingResult] = useState<RaceResult | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleStartCreate = () => {
    const newRes: RaceResult = {
      id: `res-${Date.now()}`,
      raceName: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      distance: '10 km',
      category: 'Seniores',
      athleteName: '',
      bibNumber: '',
      officialTime: '00:00:00',
      pace: '0:00 min/km',
      overallRank: undefined,
      categoryRank: undefined,
      podiumPosition: null,
      medalType: null,
      notes: '',
      photoUrl: ''
    };
    setEditingResult(newRes);
    setIsCreating(true);
  };

  const handleStartEdit = (res: RaceResult) => {
    setEditingResult({ ...res });
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResult || !editingResult.raceName.trim() || !editingResult.athleteName.trim()) return;

    onSaveResult(editingResult);
    setEditingResult(null);
    setIsCreating(false);
  };

  const filteredResults = results.filter(r =>
    r.athleteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.raceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200">
        <div>
          <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-emerald-700" />
            Gestão de Resultados & Pódios
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Adiciona classificações oficiais, recordes pessoais e gera posts para as redes sociais.
          </p>
        </div>

        <button
          id="admin-add-result-btn"
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Registar Resultado</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingResult && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
            <div className="bg-emerald-900 text-white p-5 px-6 flex items-center justify-between">
              <h4 className="font-extrabold text-base">
                {isCreating ? 'Registar Novo Resultado de Prova' : 'Editar Resultado'}
              </h4>
              <button
                onClick={() => setEditingResult(null)}
                className="text-emerald-200 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nome da Prova / Campeonato *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Campeonato Regional de Estrada"
                    value={editingResult.raceName}
                    onChange={(e) => setEditingResult({ ...editingResult, raceName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nome do Atleta *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Manuel Santos"
                    value={editingResult.athleteName}
                    onChange={(e) => setEditingResult({ ...editingResult, athleteName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Localidade / Cidade
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Aveiro"
                    value={editingResult.location}
                    onChange={(e) => setEditingResult({ ...editingResult, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Data da Prova
                  </label>
                  <input
                    type="date"
                    value={editingResult.date}
                    onChange={(e) => setEditingResult({ ...editingResult, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Distância / Modalidade
                  </label>
                  <input
                    type="text"
                    placeholder="ex: 10 km, Meia Maratona, 1500m"
                    value={editingResult.distance}
                    onChange={(e) => setEditingResult({ ...editingResult, distance: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Escalão Etário
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Veteranos M40, Seniores F, Sub-23"
                    value={editingResult.category}
                    onChange={(e) => setEditingResult({ ...editingResult, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Dorsal # (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="ex: 142"
                    value={editingResult.bibNumber || ''}
                    onChange={(e) => setEditingResult({ ...editingResult, bibNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Tempo Oficial *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: 00:32:45"
                    value={editingResult.officialTime}
                    onChange={(e) => setEditingResult({ ...editingResult, officialTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Ritmo Médio (ex: min/km)
                  </label>
                  <input
                    type="text"
                    placeholder="ex: 3:16 min/km"
                    value={editingResult.pace || ''}
                    onChange={(e) => setEditingResult({ ...editingResult, pace: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Classificação no Escalão
                  </label>
                  <input
                    type="number"
                    placeholder="ex: 1 (1º Lugar)"
                    value={editingResult.categoryRank || ''}
                    onChange={(e) => setEditingResult({ ...editingResult, categoryRank: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Classificação Geral (Absoluta)
                  </label>
                  <input
                    type="number"
                    placeholder="ex: 6"
                    value={editingResult.overallRank || ''}
                    onChange={(e) => setEditingResult({ ...editingResult, overallRank: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                {/* Podium & Medal Selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Pódio Conquistado
                  </label>
                  <select
                    value={editingResult.podiumPosition ? String(editingResult.podiumPosition) : ''}
                    onChange={(e) => {
                      const pos = e.target.value ? (parseInt(e.target.value) as 1 | 2 | 3) : null;
                      const medal = pos === 1 ? 'gold' : pos === 2 ? 'silver' : pos === 3 ? 'bronze' : null;
                      setEditingResult({ ...editingResult, podiumPosition: pos, medalType: medal });
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    <option value="">Nenhum Pódio</option>
                    <option value="1">🥇 1º Lugar (Ouro / Campeão)</option>
                    <option value="2">🥈 2º Lugar (Prata / Vice-Campeão)</option>
                    <option value="3">🥉 3º Lugar (Bronze)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    URL da Foto do Atleta / Prova
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={editingResult.photoUrl || ''}
                    onChange={(e) => setEditingResult({ ...editingResult, photoUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Notas ou Comentário de Destaque
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Novo Recorde Pessoal ou Mínimos Nacionais"
                    value={editingResult.notes || ''}
                    onChange={(e) => setEditingResult({ ...editingResult, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingResult(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
                >
                  Guardar Resultado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Results Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filtrar resultados ou atletas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <span className="text-xs text-gray-500 font-medium shrink-0">
            Total: {filteredResults.length} resultados
          </span>
        </div>

        <div className="divide-y divide-gray-100 overflow-x-auto">
          {filteredResults.length === 0 ? (
            <div className="p-12 text-center text-gray-500 text-xs">
              Nenhum resultado cadastrado.
            </div>
          ) : (
            filteredResults.map((res) => (
              <div
                key={res.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {res.podiumPosition ? (
                      <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md text-white ${
                        res.medalType === 'gold' ? 'bg-amber-500' :
                        res.medalType === 'silver' ? 'bg-slate-500' :
                        'bg-amber-800'
                      }`}>
                        {res.medalType === 'gold' ? '🥇 Ouro' : res.medalType === 'silver' ? '🥈 Prata' : '🥉 Bronze'} • {res.podiumPosition}º Lugar
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {res.distance}
                      </span>
                    )}

                    <span className="text-xs text-gray-400">
                      {res.date} • {res.location}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-base text-gray-900">
                    {res.athleteName} <span className="text-gray-400 font-normal text-xs">({res.category})</span>
                  </h4>
                  <div className="text-xs text-emerald-800 font-semibold mt-0.5">
                    {res.raceName} — Tempo: <span className="font-mono">{res.officialTime}</span> {res.pace && `(${res.pace})`}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => onOpenSocialShare(res)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors cursor-pointer border border-emerald-200"
                    title="Partilhar pódio no Facebook / Instagram"
                  >
                    <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Partilhar Pódio</span>
                  </button>

                  <button
                    onClick={() => handleStartEdit(res)}
                    className="p-2 rounded-lg text-gray-600 hover:text-emerald-700 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Eliminar o resultado de ${res.athleteName}?`)) {
                        onDeleteResult(res.id);
                      }
                    }}
                    className="p-2 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
