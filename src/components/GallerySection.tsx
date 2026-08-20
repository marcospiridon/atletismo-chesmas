import React, { useState } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Calendar, Camera, Maximize2 } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface GallerySectionProps {
  photos: GalleryPhoto[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ photos }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = ['Todas', 'Competições', 'Treinos', 'Pódios', 'Convívio', 'Eventos'];

  const filteredPhotos = photos.filter(p => 
    selectedCategory === 'Todas' || p.category === selectedCategory
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const currentPhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <section id="galeria-section" className="py-16 sm:py-20 bg-[#f0f4f2] border-t border-emerald-950/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#055b3a] font-black text-xs uppercase tracking-wider mb-2">
              <ImageIcon className="w-4 h-4 text-[#055b3a]" />
              Galeria de Momentos
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
              A Emoção do Atletismo em <span className="text-[#055b3a]">Imagens</span>
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-1 max-w-xl">
              Registo fotográfico dos nossos atletas em prova, treinos de grupo e convívios da família Chesmas.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#055b3a] text-white shadow-xs'
                    : 'bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Bento Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-zinc-300">
            <ImageIcon className="w-10 h-10 text-zinc-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-zinc-600">Nenhuma foto disponível nesta categoria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setActivePhotoIndex(index)}
                className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 bg-zinc-900 border border-zinc-200/80"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

                {/* Badge Category */}
                <div className="absolute top-3 left-3">
                  <span className="bg-[#055b3a]/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                    {photo.category}
                  </span>
                </div>

                {/* Enlarge Icon on hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-2 rounded-xl text-white backdrop-blur-xs">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-black text-sm leading-snug line-clamp-1 group-hover:text-lime-300 transition-colors">
                    {photo.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-zinc-300 mt-1">
                    <span className="truncate max-w-[120px] font-medium">{photo.album}</span>
                    <span>{new Date(photo.date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {currentPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhotoIndex(null)}
        >
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer z-10"
            aria-label="Fechar visualizador"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal content */}
          <div 
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPhoto.imageUrl}
              alt={currentPhoto.title}
              className="max-h-[70vh] w-auto max-w-full rounded-3xl object-contain shadow-2xl"
            />
            
            <div className="mt-4 text-center text-white">
              <span className="inline-block bg-[#055b3a] text-white text-xs font-black px-3 py-1 rounded-full mb-1 uppercase">
                {currentPhoto.category} • {currentPhoto.album}
              </span>
              <h3 className="text-lg font-black">{currentPhoto.title}</h3>
              <div className="flex items-center justify-center gap-3 text-xs text-zinc-400 mt-1">
                <span>{new Date(currentPhoto.date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                {currentPhoto.photographer && (
                  <span>• Foto: {currentPhoto.photographer}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
