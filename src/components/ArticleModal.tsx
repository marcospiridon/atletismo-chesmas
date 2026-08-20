import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Share2, 
  Facebook, 
  MessageCircle, 
  Check, 
  Heart, 
  Tag, 
  Eye, 
  Twitter
} from 'lucide-react';
import { NewsArticle } from '../types';
import { socialSharer } from '../utils/socialSharer';

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  onLike: (articleId: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, onLike }) => {
  const [copied, setCopied] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  if (!article) return null;

  const currentUrl = window.location.href;

  const handleShareFacebook = () => {
    window.open(socialSharer.getFacebookShareUrl(currentUrl, article.title), '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = `🏃‍♂️ ${article.title}\n\n${article.summary}`;
    window.open(socialSharer.getWhatsAppShareUrl(text, currentUrl), '_blank');
  };

  const handleShareTwitter = () => {
    window.open(socialSharer.getTwitterShareUrl(article.title, currentUrl, article.tags), '_blank');
  };

  const handleCopyLink = async () => {
    const success = await socialSharer.copyToClipboard(currentUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleLike = () => {
    if (!hasLiked) {
      onLike(article.id);
      setHasLiked(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image with close button */}
        <div className="relative h-64 sm:h-80 w-full shrink-0">
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Close button */}
          <button
            id="close-article-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer"
            aria-label="Fechar notícia"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Badge & Meta */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-block bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-md mb-2 uppercase tracking-wide">
              {article.category}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight drop-shadow-xs">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Metadata info */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-600" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" />
                {new Date(article.publishDate).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-emerald-600" />
                {article.views + 1} leituras
              </span>
            </div>

            <button
              id="like-article-btn"
              onClick={handleLike}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                hasLiked 
                  ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                  : 'bg-gray-100 hover:bg-rose-50 text-gray-700 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>{article.likes + (hasLiked ? 1 : 0)} Gostos</span>
            </button>
          </div>

          {/* Summary Lead */}
          <p className="text-lg font-medium text-emerald-950/90 leading-relaxed bg-emerald-50/60 p-4 rounded-xl border-l-4 border-emerald-600">
            {article.summary}
          </p>

          {/* Article Text Content */}
          <div className="prose prose-emerald max-w-none text-gray-800 leading-relaxed text-base whitespace-pre-line">
            {article.content}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-4 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-gray-400" />
              {article.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Social Share Bar */}
          <div className="pt-6 border-t border-gray-200 bg-gray-50/80 -mx-6 -mb-6 p-6 sm:p-8 rounded-b-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 justify-center sm:justify-start">
                  <Share2 className="w-4 h-4 text-emerald-700" />
                  Partilhar esta notícia nas redes sociais
                </h4>
                <p className="text-xs text-gray-500">Ajuda a divulgar os feitos dos nossos atletas!</p>
              </div>

              <div className="flex items-center gap-2 flex-wrap justify-center">
                <button
                  id="share-article-facebook-btn"
                  onClick={handleShareFacebook}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </button>

                <button
                  id="share-article-whatsapp-btn"
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  id="share-article-twitter-btn"
                  onClick={handleShareTwitter}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black hover:bg-gray-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span>X (Twitter)</span>
                </button>

                <button
                  id="copy-article-link-btn"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado!' : 'Copiar Link'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
