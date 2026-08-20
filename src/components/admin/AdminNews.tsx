import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Share2, 
  Newspaper, 
  Calendar, 
  User, 
  Eye, 
  Sparkles, 
  Check, 
  X,
  Search,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';
import { NewsArticle, NewsCategory } from '../../types';

interface AdminNewsProps {
  news: NewsArticle[];
  onSaveArticle: (article: NewsArticle) => void;
  onDeleteArticle: (id: string) => void;
  onOpenSocialShare: (article: NewsArticle) => void;
}

const CATEGORIES: NewsCategory[] = [
  'Resultados',
  'Eventos & Provas',
  'Treinos',
  'Clube & Comunidade',
  'Entrevistas'
];

const PRESET_IMAGES = [
  { label: 'Estrada & Pódios', url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Pista de Atletismo', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Trail & Montanha', url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Treino de Grupo', url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Academia Jovem', url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80' }
];

export const AdminNews: React.FC<AdminNewsProps> = ({
  news,
  onSaveArticle,
  onDeleteArticle,
  onOpenSocialShare
}) => {
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const handleStartCreate = () => {
    const newArt: NewsArticle = {
      id: `news-${Date.now()}`,
      title: '',
      slug: '',
      category: 'Resultados',
      summary: '',
      content: '',
      coverImage: PRESET_IMAGES[0].url,
      author: 'Comunicação Chesmas',
      publishDate: new Date().toISOString().split('T')[0],
      featured: false,
      tags: ['Chesmas', 'Atletismo'],
      views: 0,
      likes: 0
    };
    setEditingArticle(newArt);
    setTagsInput(newArt.tags.join(', '));
    setIsCreating(true);
  };

  const handleStartEdit = (art: NewsArticle) => {
    setEditingArticle({ ...art });
    setTagsInput(art.tags ? art.tags.join(', ') : '');
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const slug = editingArticle.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const finalArticle: NewsArticle = {
      ...editingArticle,
      slug,
      tags
    };

    onSaveArticle(finalArticle);
    setEditingArticle(null);
    setIsCreating(false);
  };

  const filteredNews = news.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200">
        <div>
          <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-emerald-700" />
            Gestão de Notícias & Blog
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Publica artigos, novidades e partilha instantaneamente no Facebook e Instagram.
          </p>
        </div>

        <button
          id="admin-add-news-btn"
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Notícia</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
            <div className="bg-emerald-900 text-white p-5 px-6 flex items-center justify-between">
              <h4 className="font-extrabold text-base">
                {isCreating ? 'Criar Nova Notícia' : 'Editar Notícia'}
              </h4>
              <button
                onClick={() => setEditingArticle(null)}
                className="text-emerald-200 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Título da Notícia *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Grande triunfo no Campeonato Regional..."
                  value={editingArticle.title}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value as NewsCategory })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Autor
                  </label>
                  <input
                    type="text"
                    value={editingArticle.author}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Data de Publicação
                  </label>
                  <input
                    type="date"
                    value={editingArticle.publishDate}
                    onChange={(e) => setEditingArticle({ ...editingArticle, publishDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Cover image URL and presets */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  URL da Imagem de Capa
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={editingArticle.coverImage}
                    onChange={(e) => setEditingArticle({ ...editingArticle, coverImage: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none font-mono"
                  />
                </div>

                {/* Preset suggestions */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                  <span className="text-[11px] font-semibold text-gray-400">Sugestões de imagem:</span>
                  {PRESET_IMAGES.map((img, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setEditingArticle({ ...editingArticle, coverImage: img.url })}
                      className="px-2 py-0.5 bg-gray-100 hover:bg-emerald-100 hover:text-emerald-900 rounded-md text-[11px] font-medium transition-colors"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Resumo / Lead (Exibido nos cartões e posts sociais)
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Breve resumo da notícia em 2 a 3 frases..."
                  value={editingArticle.summary}
                  onChange={(e) => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Texto Completo da Notícia *
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Escreve aqui o artigo detalhado..."
                  value={editingArticle.content}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm leading-relaxed focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Tags (Separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Estrada, Pódio, Recorde, Prova"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingArticle.featured}
                      onChange={(e) => setEditingArticle({ ...editingArticle, featured: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
                    />
                    <span className="text-xs font-bold text-gray-800">
                      Destacar esta notícia no topo do site
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
                >
                  Guardar Notícia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search and Table list */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filtrar notícias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <span className="text-xs text-gray-500 font-medium shrink-0">
            Total: {filteredNews.length} artigos
          </span>
        </div>

        <div className="divide-y divide-gray-100 overflow-x-auto">
          {filteredNews.length === 0 ? (
            <div className="p-12 text-center text-gray-500 text-xs">
              Nenhuma notícia cadastrada ou correspondente ao filtro.
            </div>
          ) : (
            filteredNews.map((article) => (
              <div
                key={article.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-200"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                        {article.category}
                      </span>
                      {article.featured && (
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          ★ Destaque
                        </span>
                      )}
                      <span className="text-[11px] text-gray-400">
                        {article.publishDate}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm sm:text-base text-gray-900 line-clamp-1">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {/* Social Share Trigger */}
                  <button
                    onClick={() => onOpenSocialShare(article)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors cursor-pointer border border-emerald-200"
                    title="Partilhar no Facebook e Instagram"
                  >
                    <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Partilhar Redes</span>
                  </button>

                  <button
                    onClick={() => handleStartEdit(article)}
                    className="p-2 rounded-lg text-gray-600 hover:text-emerald-700 hover:bg-gray-100 transition-colors cursor-pointer"
                    title="Editar artigo"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Tem a certeza que pretende eliminar a notícia "${article.title}"?`)) {
                        onDeleteArticle(article.id);
                      }
                    }}
                    className="p-2 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Eliminar artigo"
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
