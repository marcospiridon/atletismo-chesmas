import React, { useState } from 'react';
import { 
  Newspaper, 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  Flame, 
  Share2,
  Filter
} from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types';

interface NewsSectionProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onOpenSocialModal?: (article: NewsArticle) => void;
}

const CATEGORIES: ('Todas' | NewsCategory)[] = [
  'Todas',
  'Resultados',
  'Eventos & Provas',
  'Treinos',
  'Clube & Comunidade',
  'Entrevistas'
];

export const NewsSection: React.FC<NewsSectionProps> = ({
  articles,
  onSelectArticle
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'Todas' || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.tags && article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const standardArticles = filteredArticles.filter(a => a.id !== featuredArticle?.id || selectedCategory !== 'Todas' || searchQuery !== '');

  return (
    <section id="noticias-section" className="py-16 sm:py-20 bg-[#f0f4f2] border-t border-emerald-950/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#055b3a] font-black text-xs uppercase tracking-wider mb-2">
              <Newspaper className="w-4 h-4" />
              Notícias & Blog da Equipa
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
              Acompanha o Ritmo do <span className="text-[#055b3a]">Chesmas</span>
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-1 max-w-xl">
              Fica a par de todos os resultados, crónicas de provas, convocatórias de treinos e novidades da nossa família atlética.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="news-search-input"
              type="text"
              placeholder="Pesquisar notícias ou tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#055b3a] focus:border-transparent transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <Filter className="w-4 h-4 text-zinc-400 shrink-0 ml-1 mr-1" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#055b3a] text-white shadow-xs'
                  : 'bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Big Card (when no active search and category is 'Todas') */}
        {selectedCategory === 'Todas' && searchQuery === '' && featuredArticle && (
          <div className="mb-8">
            <div 
              onClick={() => onSelectArticle(featuredArticle)}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-md border border-zinc-200/80 hover:border-emerald-200 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 cursor-pointer"
            >
              <div className="lg:col-span-7 relative h-72 lg:h-96 overflow-hidden">
                <img 
                  src={featuredArticle.coverImage} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-lime-400 text-emerald-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Flame className="w-3.5 h-3.5" />
                  Destaque Principal
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                    <span className="bg-emerald-100/70 text-[#055b3a] font-bold px-2.5 py-0.5 rounded-full">
                      {featuredArticle.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#055b3a]" />
                      {new Date(featuredArticle.publishDate).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-zinc-900 group-hover:text-[#055b3a] transition-colors leading-snug mb-3">
                    {featuredArticle.title}
                  </h3>

                  <p className="text-zinc-600 text-sm sm:text-base line-clamp-3 leading-relaxed mb-4">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#055b3a]" />
                    {featuredArticle.author}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[#055b3a] font-black text-sm group-hover:translate-x-1 transition-transform">
                    Ler Artigo Completo
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-zinc-300">
            <Newspaper className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-zinc-800">Nenhuma notícia encontrada</h3>
            <p className="text-sm text-zinc-500 max-w-sm mx-auto mt-1">
              Não encontramos nenhum artigo com os termos ou categoria selecionados. Tenta outra pesquisa.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standardArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="group bg-white rounded-3xl overflow-hidden border border-zinc-200/80 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#055b3a]/90 text-white text-xs font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-[#055b3a]" />
                      <span>{new Date(article.publishDate).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>

                    <h3 className="font-black text-zinc-900 text-lg leading-snug group-hover:text-[#055b3a] transition-colors mb-2 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-zinc-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-medium truncate max-w-[150px]">
                      {article.author}
                    </span>

                    <span className="text-[#055b3a] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Ler mais
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
