import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Upload, 
  Calendar, 
  Folder 
} from 'lucide-react';
import { GalleryPhoto } from '../../types';

interface AdminGalleryProps {
  photos: GalleryPhoto[];
  onSavePhoto: (photo: GalleryPhoto) => void;
  onDeletePhoto: (id: string) => void;
}

const CATEGORIES = ['Competições', 'Treinos', 'Pódios', 'Convívio', 'Eventos'] as const;

export const AdminGallery: React.FC<AdminGalleryProps> = ({
  photos,
  onSavePhoto,
  onDeletePhoto
}) => {
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleStartCreate = () => {
    const newPhoto: GalleryPhoto = {
      id: `gal-${Date.now()}`,
      title: '',
      album: 'Época 2026/2027',
      category: 'Competições',
      imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=80',
      date: new Date().toISOString().split('T')[0],
      photographer: 'Clube Chesmas'
    };
    setEditingPhoto(newPhoto);
    setIsCreating(true);
  };

  const handleStartEdit = (photo: GalleryPhoto) => {
    setEditingPhoto({ ...photo });
    setIsCreating(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingPhoto) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditingPhoto({ ...editingPhoto, imageUrl: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto || !editingPhoto.title.trim() || !editingPhoto.imageUrl.trim()) return;

    onSavePhoto(editingPhoto);
    setEditingPhoto(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200">
        <div>
          <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-700" />
            Gestão da Galeria de Fotos
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Adiciona novas fotografias de provas, treinos e pódios. Podes usar links ou enviar fotos do dispositivo.
          </p>
        </div>

        <button
          id="admin-add-photo-btn"
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Foto</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
            <div className="bg-emerald-900 text-white p-5 px-6 flex items-center justify-between">
              <h4 className="font-extrabold text-base">
                {isCreating ? 'Adicionar Fotografia' : 'Editar Fotografia'}
              </h4>
              <button
                onClick={() => setEditingPhoto(null)}
                className="text-emerald-200 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Legenda / Título da Foto *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Pódio no Campeonato Regional"
                  value={editingPhoto.title}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    value={editingPhoto.category}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nome do Álbum / Evento
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Campeonato Regional 2026"
                    value={editingPhoto.album}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, album: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Data da Foto
                  </label>
                  <input
                    type="date"
                    value={editingPhoto.date}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Fotógrafo / Crédito
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Carlos Fotografia"
                    value={editingPhoto.photographer || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, photographer: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  URL da Imagem
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editingPhoto.imageUrl}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-400">ou</span>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Carregar ficheiro do computador</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Preview */}
              {editingPhoto.imageUrl && (
                <div>
                  <span className="text-xs font-bold text-gray-500 block mb-1">Pré-visualização:</span>
                  <div className="h-44 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                    <img
                      src={editingPhoto.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
                >
                  Guardar Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs flex flex-col group"
          >
            <div className="relative h-40 bg-gray-900">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                {photo.category}
              </span>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-extrabold text-xs text-gray-900 line-clamp-1 mb-0.5">
                  {photo.title}
                </h4>
                <div className="text-[11px] text-gray-500 truncate">
                  {photo.album}
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-400">
                  {photo.date}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleStartEdit(photo)}
                    className="p-1 text-gray-500 hover:text-emerald-700"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Eliminar a foto "${photo.title}"?`)) {
                        onDeletePhoto(photo.id);
                      }
                    }}
                    className="p-1 text-gray-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
