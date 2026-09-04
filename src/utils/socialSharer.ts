import { NewsArticle } from '../types';

export const socialSharer = {
  // Generate Facebook share link
  getFacebookShareUrl(url: string, quote?: string): string {
    const targetUrl = encodeURIComponent(url || window.location.href);
    let shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${targetUrl}`;
    if (quote) {
      shareUrl += `&quote=${encodeURIComponent(quote)}`;
    }
    return shareUrl;
  },

  // Generate WhatsApp share link
  getWhatsAppShareUrl(text: string, url?: string): string {
    const fullText = url ? `${text}\n\n👉 Saber mais: ${url}` : text;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`;
  },

  // Generate Twitter / X share link
  getTwitterShareUrl(text: string, url?: string, hashtags?: string[]): string {
    const targetUrl = encodeURIComponent(url || window.location.href);
    let shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${targetUrl}`;
    if (hashtags && hashtags.length > 0) {
      shareUrl += `&hashtags=${encodeURIComponent(hashtags.join(','))}`;
    }
    return shareUrl;
  },

  // Format a high-engagement Instagram / Facebook caption for News
  formatNewsSocialCaption(article: NewsArticle, clubName = 'Clube de Atletismo Chesmas'): string {
    const tags = [
      '#atletismochesmas',
      '#chesmas',
      '#atletismo',
      '#runningportugal',
      '#correremportugal',
      '#trailrunningpt',
      ...(article.tags || []).map(t => `#${t.toLowerCase().replace(/[^a-z0-9]/gi, '')}`)
    ].filter((v, i, a) => a.indexOf(v) === i);

    return `🏃‍♂️💚 [NOVIDADE CHESMAS] ${article.title} 💚🏃‍♂️

${article.summary}

${article.content.slice(0, 280)}${article.content.length > 280 ? '...' : ''}

🔗 Lê a notícia completa e sabe tudo no nosso site oficial!
Junta-te à nossa equipa e vem correr connosco! 💪✨

${tags.join(' ')}`;
  },

  // Copy to clipboard with success callback
  async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback for older contexts
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    }
  }
};
