import React from 'react';
import { ShoppingCart, AlertTriangle } from 'lucide-react';
import { Produto } from '../types';
import { useCart } from '../context/CartContext';
import { StarRating } from './StarRating';

interface ProductCardProps {
  produto: Produto;
  isAdmin?: boolean;
  onToggleAvailability?: (id: string) => void;
  onSelectProduct: (produto: Produto) => void;
}

export const ProductCard = ({ produto, isAdmin, onToggleAvailability, onSelectProduct }: ProductCardProps) => {
  const { adicionarAoCarrinho } = useCart();

  const averageRating = produto.reviews && produto.reviews.length > 0
    ? produto.reviews.reduce((acc, review) => acc + review.rating, 0) / produto.reviews.length
    : 0;
  
  const reviewCount = produto.reviews?.length || 0;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg border border-brand-yellow/10"
         aria-labelledby={`produto-${produto.id}-titulo`}>
      <div className="relative">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-0 right-0 m-2 px-2 py-1 bg-brand-yellow text-white text-sm rounded">
          R$ {produto.preco.toFixed(2)}
        </div>
      </div>
      <div className="p-4">
        <h3 id={`produto-${produto.id}-titulo`} className="text-lg font-semibold text-brand-brown">
          {produto.nome}
        </h3>
        <p className="mt-2 text-gray-600">{produto.descricao}</p>
        
        <div className="mt-3">
          <button onClick={() => onSelectProduct(produto)} className="flex items-center gap-2" aria-label={`Ver avaliações de ${produto.nome}`}>
            <StarRating rating={averageRating} />
            <span className="text-sm text-gray-500 hover:text-brand-brown">
              ({reviewCount} {reviewCount === 1 ? 'avaliação' : 'avaliações'})
            </span>
          </button>
        </div>

        {produto.alergenos && produto.alergenos.length > 0 && (
          <div className="mt-2 flex items-center gap-1 text-amber-600">
            <AlertTriangle size={16} />
            <span className="text-sm">Contém: {produto.alergenos.join(', ')}</span>
          </div>
        )}

        <div className="mt-4">
          {isAdmin ? (
            <button
              onClick={() => onToggleAvailability?.(produto.id)}
              className={`w-full px-4 py-2 rounded-md transition-colors ${
                produto.disponivel
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
              aria-label={`Marcar como ${produto.disponivel ? 'indisponível' : 'disponível'}`}
            >
              {produto.disponivel ? 'Marcar Indisponível' : 'Marcar Disponível'}
            </button>
          ) : (
            <button
              onClick={() => produto.disponivel && adicionarAoCarrinho(produto)}
              disabled={!produto.disponivel}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                produto.disponivel
                  ? 'bg-brand-yellow text-white hover:bg-brand-brown'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              aria-label={`Adicionar ${produto.nome} ao carrinho`}
            >
              <ShoppingCart size={18} />
              {produto.disponivel ? 'Adicionar ao Carrinho' : 'Indisponível'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};