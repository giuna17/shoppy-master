import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductImageGalleryProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function ProductImageGallery({
  images,
  currentIndex,
  onClose,
  onIndexChange,
}: ProductImageGalleryProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      onIndexChange((currentIndex - 1 + images.length) % images.length);
    } else if (e.key === 'ArrowRight') {
      onIndexChange((currentIndex + 1) % images.length);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 cursor-zoom-out"
          onClick={onClose}
        />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-4xl max-h-[90vh] focus:outline-none"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-full">
            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={images[currentIndex]}
                alt={`Product view ${currentIndex + 1}`}
                className="max-h-[80vh] max-w-full object-contain cursor-zoom-out"
                onClick={onClose}
              />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onIndexChange((currentIndex - 1 + images.length) % images.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onIndexChange((currentIndex + 1) % images.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Thumbnails */}
            {images.length > 1 && (
              <div 
                className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4 py-2"
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      onIndexChange(index);
                    }}
                    className={`w-16 h-16 rounded overflow-hidden border-2 transition-all ${currentIndex === index ? 'border-primary' : 'border-transparent'}`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
