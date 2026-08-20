import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Edit3, 
  Trash2, 
  Clock, 
  MapPin, 
  User, 
  X,
  Target,
  CheckCircle2
} from 'lucide-react';
import { TrainingSession } from '../../types';

interface AdminTrainingsProps {
  trainings: TrainingSession[];
  onSaveTraining: (training: TrainingSession) => void;
  onDeleteTraining: (id: string) => void;
}

export const AdminTrainings: React.FC<AdminTrainingsProps> = ({
  trainings,
  onSaveTraining,
  onDeleteTraining
}) => {
  const [editingSession, setEditingSession] = useState<TrainingSession | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleStartCreate = () => {
    const newSession: TrainingSession = {
      id: `train-${Date.now()}`,
      title: '',
      category: 'Estrada & Meia-Maratona',
      dayOfWeek: 'Terça e Quinta-feira',
      time: '19:00 - 20:30',
      location: 'Pista Municipal de Atletismo',
      coach: 'Prof. António Ferreira',
      targetLevel: 'Todos os níveis',
      focus: 'Corrida contínua e técnica de corrida',
      notes: '',
      active: true
    };
    setEditingSession(newSession);
    setIsCreating(true);
  };

  const handleStartEdit = (t: TrainingSession) => {
    setEditingSession({ ...t });
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSession || !editingSession.title.trim()) return;

    onSaveTraining(editingSession);
    setEditingSession(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200">
        <div>
          <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-700" />
            Gestão do Calendário de Treinos
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Configura dias de treino, horários, pontos de encontro e treinadores responsáveis.
          </p>
        </div>

        <button
          id="admin-add-training-btn"
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Treino</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingSession && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
            <div className="bg-emerald-900 text-white p-5 px-6 flex items-center justify-between">
              <h4 className="font-extrabold text-base">
                {isCreating ? 'Adicionar Sessão de Treino' : 'Editar Treino'}
              </h4>
              <button
                onClick={() => setEditingSession(null)}
                className="text-emerald-200 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nome do Grupo / Sessão *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Escola de Formação (Benjamins a Infantis)"
                  value={editingSession.title}
                  onChange={(e) => setEditingSession({ ...editingSession, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Escalão / Categoria
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Formação, Seniores, Trail..."
                    value={editingSession.category}
                    onChange={(e) => setEditingSession({ ...editingSession, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Faixa Etária / Nível Alvo
                  </label>
                  <input
                    type="text"
                    placeholder="ex: 6 aos 13 anos ou Adultos"
                    value={editingSession.targetLevel}
                    onChange={(e) => setEditingSession({ ...editingSession, targetLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Dias da Semana *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Segunda e Quarta-feira"
                    value={editingSession.dayOfWeek}
                    onChange={(e) => setEditingSession({ ...editingSession, dayOfWeek: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Horário *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: 18:30 - 20:00"
                    value={editingSession.time}
                    onChange={(e) => setEditingSession({ ...editingSession, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Local de Treino
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Pista Municipal de Atletismo"
                    value={editingSession.location}
                    onChange={(e) => setEditingSession({ ...editingSession, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Treinador Responsável
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Prof. Joana Castro"
                    value={editingSession.coach}
                    onChange={(e) => setEditingSession({ ...editingSession, coach: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Conteúdo / Foco Principal do Treino
                </label>
                <textarea
                  rows={2}
                  placeholder="ex: Séries de velocidade, técnica de barreiras, corrida contínua..."
                  value={editingSession.focus}
                  onChange={(e) => setEditingSession({ ...editingSession, focus: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Avisos / Recomendações aos Atletas (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="ex: Trazer sapatilhas de bicos ou garrafa de água"
                  value={editingSession.notes || ''}
                  onChange={(e) => setEditingSession({ ...editingSession, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingSession.active}
                    onChange={(e) => setEditingSession({ ...editingSession, active: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
                  />
                  <span className="text-xs font-bold text-gray-800">
                    Treino ativo e visível no site
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingSession(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
                >
                  Guardar Treino
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Trainings Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trainings.map((session) => (
          <div
            key={session.id}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-0.5 rounded-md">
                  {session.category}
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  {session.targetLevel}
                </span>
              </div>

              <h4 className="font-extrabold text-base text-gray-900 mb-2">
                {session.title}
              </h4>

              <div className="space-y-1 text-xs text-gray-600 mb-3">
                <div>📅 <strong>{session.dayOfWeek}</strong> • {session.time}</div>
                <div>📍 {session.location}</div>
                <div>👤 Treinador: {session.coach}</div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg text-xs text-gray-700 mb-3">
                <span className="font-semibold text-emerald-800">Foco: </span>
                {session.focus}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className={`text-[11px] font-bold ${session.active ? 'text-emerald-700' : 'text-gray-400'}`}>
                {session.active ? '● Ativo no site' : '○ Oculto'}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleStartEdit(session)}
                  className="p-1.5 rounded-lg text-gray-600 hover:text-emerald-700 hover:bg-gray-100 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`Eliminar o treino "${session.title}"?`)) {
                      onDeleteTraining(session.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
