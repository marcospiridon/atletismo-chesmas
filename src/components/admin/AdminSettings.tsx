import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Lock, 
  Facebook, 
  Instagram, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { ClubInfo } from '../../types';
import { storageService } from '../../services/storageService';

interface AdminSettingsProps {
  clubInfo: ClubInfo;
  onSaveClubInfo: (info: ClubInfo) => void;
  onResetDefaults: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  clubInfo,
  onSaveClubInfo,
  onResetDefaults
}) => {
  const [formData, setFormData] = useState<ClubInfo>({ ...clubInfo });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [adminPin, setAdminPin] = useState(storageService.getAdminPin());
  const [newPin, setNewPin] = useState('');
  const [pinSaved, setPinSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveClubInfo(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length >= 4) {
      storageService.setAdminPin(newPin);
      setAdminPin(newPin);
      setNewPin('');
      setPinSaved(true);
      setTimeout(() => setPinSaved(false), 3000);
    }
  };

  const handleExportBackup = () => {
    const jsonStr = storageService.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_chesmas_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          const success = storageService.importAllData(content);
          if (success) {
            alert('Dados importados com sucesso! A página será recarregada.');
            window.location.reload();
          } else {
            alert('Ficheiro de backup inválido.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-700" />
          Configurações do Clube & Sistema
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Atualiza as informações institucionais, links de redes sociais, credenciais de acesso e cópias de segurança.
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
        {savedSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Dados do clube atualizados com sucesso!</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">Nome Oficial do Clube</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">Lema / Slogan</label>
            <input
              type="text"
              value={formData.slogan}
              onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">Descrição Institucional</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email Geral</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Telefone / Contacto</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Presidente da Direção</label>
            <input
              type="text"
              value={formData.president}
              onChange={(e) => setFormData({ ...formData, president: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Coordenador Técnico</label>
            <input
              type="text"
              value={formData.headCoach}
              onChange={(e) => setFormData({ ...formData, headCoach: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-extrabold text-sm text-gray-900 mb-3">
            Links Oficiais das Redes Sociais
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">URL do Facebook</label>
              <input
                type="url"
                value={formData.socialMedia.facebook}
                onChange={(e) => setFormData({
                  ...formData,
                  socialMedia: { ...formData.socialMedia, facebook: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">URL do Instagram</label>
              <input
                type="url"
                value={formData.socialMedia.instagram}
                onChange={(e) => setFormData({
                  ...formData,
                  socialMedia: { ...formData.socialMedia, instagram: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Alterações</span>
          </button>
        </div>
      </form>

      {/* Security & Admin PIN */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs">
        <h4 className="font-extrabold text-sm text-gray-900 mb-2 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-700" />
          Segurança & PIN de Acesso Administrativo
        </h4>
        <p className="text-xs text-gray-500 mb-4">
          PIN atual configurado: <strong className="font-mono">{adminPin}</strong>
        </p>

        {pinSaved && (
          <div className="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-lg mb-3">
            Novo PIN guardado com sucesso!
          </div>
        )}

        <form onSubmit={handleUpdatePin} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="password"
            placeholder="Novo PIN (min. 4 dígitos)"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            className="w-full sm:w-64 px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Atualizar PIN
          </button>
        </form>
      </div>

      {/* Backup & System Reset */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-4">
        <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
          <Download className="w-4 h-4 text-emerald-700" />
          Cópia de Segurança (Backup) & Restauro
        </h4>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportBackup}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descarregar Backup JSON</span>
          </button>

          <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Importar Backup JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>

          <button
            onClick={() => {
              if (window.confirm('Tem a certeza que deseja repor todos os dados iniciais do clube? Esta ação irá restaurar as notícias, treinos e resultados de demonstração.')) {
                onResetDefaults();
                alert('Dados repostos com sucesso!');
              }
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-colors cursor-pointer ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Repor Dados Iniciais</span>
          </button>
        </div>
      </div>
    </div>
  );
};
