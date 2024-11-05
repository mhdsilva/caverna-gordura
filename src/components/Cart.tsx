import React from 'react';
import { Minus, Plus, ShoppingCart, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const { itens, removerDoCarrinho, atualizarQuantidade, total } = useCart();

  if (itens.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingCart className="mx-auto h-12 w-12 text-brand-yellow" />
        <p className="mt-2 text-gray-500">Seu carrinho está vazio</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {itens.map(({ produto, quantidade }) => (
        <div key={produto.id} className="py-4 flex items-center gap-4">
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="h-16 w-16 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-medium text-brand-brown">{produto.nome}</h3>
            <p className="text-sm text-gray-500">R$ {produto.preco.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => atualizarQuantidade(produto.id, quantidade - 1)}
              className="p-1 rounded-full hover:bg-brand-yellow/10 text-brand-brown"
              aria-label="Diminuir quantidade"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center">{quantidade}</span>
            <button
              onClick={() => atualizarQuantidade(produto.id, quantidade + 1)}
              className="p-1 rounded-full hover:bg-brand-yellow/10 text-brand-brown"
              aria-label="Aumentar quantidade"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={() => removerDoCarrinho(produto.id)}
            className="p-1 rounded-full hover:bg-brand-yellow/10 text-brand-brown"
            aria-label={`Remover ${produto.nome} do carrinho`}
          >
            <X size={18} />
          </button>
        </div>
      ))}
      <div className="py-4">
        <div className="flex justify-between items-center font-medium text-brand-brown">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <button
          className="mt-4 w-full bg-brand-yellow text-white py-2 px-4 rounded-md hover:bg-brand-brown transition-colors focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2"
          onClick={() => alert('Funcionalidade de checkout em breve!')}
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
};