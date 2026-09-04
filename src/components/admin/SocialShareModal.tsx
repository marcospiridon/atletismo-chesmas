import React, { useState } from 'react';
import { 
  X, 
  Facebook, 
  Instagram, 
  MessageCircle, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink,
  Flame,
  Smartphone
} from 'lucide-react';
import { NewsArticle } from '../../types';
import { socialSharer } from '../../utils/socialSharer';

interface SocialShareModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  facebookPageUrl?: string;
  instagramPageUrl?: string;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  article,
  onClose,
  facebookPageUrl = 'https://facebook.com/atletismochesmas',
  instagramPageUrl = 'https://instagram.com/atletismochesmas'
}) => {
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!article) return null;

  const currentUrl = window.location.href;
  const defaultCaption = socialSharer.formatNewsSocialCaption(article);

  const [caption, setCaption] = useState<string>(defaultCaption);

  const handleCopyCaption = async () => {
    const success = await socialSharer.copyToClipboard(caption);
    if (success) {
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 3000);
    }
  };

  const handleCopyLink = async () => {
    const success = await socialSharer.copyToClipboard(currentUrl);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleShareFacebook = () => {
    window.open(socialSharer.getFacebookShareUrl(currentUrl, article.title), '_blank');
  };

  const handleShareWhatsApp = () => {
    window.open(socialSharer.getWhatsAppShareUrl(caption, currentUrl), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-emerald-900 to-green-900 text-white p-5 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-400 text-emerald-950 flex items-center justify-center font-black">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg">
                Assistente de Partilha nas Redes Sociais
              </h3>
              <p className="text-xs text-emerald-200">
                Divulga no Facebook, Instagram, WhatsApp e X com 1 clique
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-emerald-800 hover:bg-emerald-700 text-emerald-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Visual Social Card Preview */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                Pré-visualização do Post / Story
              </span>

              <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 rounded-2xl overflow-hidden shadow-xl border border-emerald-700 text-white p-5 relative flex flex-col justify-between min-h-[380px]">
                {/* Background image tint */}
                {article.coverImage && (
                  <img
                    src={article.coverImage}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-25"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-transparent pointer-events-none"></div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-lime-400 text-emerald-950 font-black text-xs flex items-center justify-center">
                      CA
                    </div>
                    <span className="text-xs font-black tracking-wider text-lime-300">
                      CHESMAS ATLETISMO
                    </span>
                  </div>
                  <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {article.category}
                  </span>
                </div>

                <div className="relative z-10 my-auto py-6">
                  <div>
                    <h4 className="text-xl font-black text-white leading-tight mb-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-emerald-100 line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-3 border-t border-emerald-800 flex items-center justify-between text-[11px] text-emerald-200">
                  <span>💚 Garra & Paixão</span>
                  <span className="text-lime-300 font-semibold">atletismochesmas.pt</span>
                </div>
              </div>

              {/* Direct Club Social Pages quick triggers */}
              <div className="p-3 bg-slate-50 rounded-xl border border-gray-200 text-xs flex items-center justify-between gap-2">
                <span className="text-gray-600 font-medium">Páginas do Clube:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={facebookPageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#1877F2] font-bold hover:underline"
                  >
                    Facebook <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>•</span>
                  <a
                    href={instagramPageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#E4405F] font-bold hover:underline"
                  >
                    Instagram <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Editable Caption & Direct Actions */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Texto & Hashtags Formatados para o Post:
                  </label>
                  <button
                    onClick={() => setCaption(defaultCaption)}
                    className="text-[11px] text-emerald-700 font-semibold hover:underline cursor-pointer"
                  >
                    Restaurar Padrão
                  </button>
                </div>

                <textarea
                  rows={9}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-gray-200 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              {/* Action Buttons Grid */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Copy for Instagram */}
                  <button
                    id="copy-instagram-caption-btn"
                    onClick={handleCopyCaption}
                    className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                      copiedCaption
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white'
                    }`}
                  >
                    {copiedCaption ? <Check className="w-4 h-4" /> : <Instagram className="w-4 h-4" />}
                    <span>{copiedCaption ? 'Texto Copiado p/ Instagram!' : '1. Copiar p/ Instagram'}</span>
                  </button>

                  {/* Share on Facebook */}
                  <button
                    id="share-facebook-direct-btn"
                    onClick={handleShareFacebook}
                    className="py-3 px-4 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>2. Partilhar no Facebook</span>
                  </button>

                  {/* Share on WhatsApp */}
                  <button
                    id="share-whatsapp-direct-btn"
                    onClick={handleShareWhatsApp}
                    className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Partilhar no WhatsApp</span>
                  </button>

                  {/* Copy Link */}
                  <button
                    id="copy-direct-link-btn"
                    onClick={handleCopyLink}
                    className="py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Link Copiado!' : 'Copiar Link Direto'}</span>
                  </button>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Dica para o Instagram:</strong> Clica em <em>"Copiar p/ Instagram"</em>, abre o Instagram do clube e cola diretamente na descrição do novo Post ou Reels!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
