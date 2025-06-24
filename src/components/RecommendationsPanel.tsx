import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Produto } from '../types';
import { ProductCard } from './ProductCard';

interface RecommendationsPanelProps {
  produtos: Produto[];
  onSelectProduct: (produto: Produto) => void;
}

export const RecommendationsPanel = ({ produtos, onSelectProduct }: RecommendationsPanelProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { t } = useTranslation();

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const isScrollable = el.scrollWidth > el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(isScrollable && el.scrollLeft < el.scrollWidth - el.clientWidth);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      checkScrollability();
      el.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      return () => {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [produtos]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.8;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mb-12 relative">
      <h2 className="text-3xl font-bold text-brand-brown mb-6 text-center">{t('recommendations')}</h2>
      
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-transform transform -translate-y-1/2 -translate-x-4"
          aria-label={t('previous')}
        >
          <ChevronLeft className="text-brand-brown" />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide space-x-6 pb-4"
      >
        {produtos.map(produto => (
          <div key={produto.id} className="snap-start flex-shrink-0 w-[90vw] sm:w-80">
            <ProductCard 
              produto={produto} 
              onSelectProduct={onSelectProduct} 
            />
          </div>
        ))}
      </div>
      
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-transform transform -translate-y-1/2 translate-x-4"
          aria-label={t('next')}
        >
          <ChevronRight className="text-brand-brown" />
        </button>
      )}
    </div>
  );
}; 