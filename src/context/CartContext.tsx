import React, { createContext, useContext, useState } from 'react';
import { CarrinhoContextoTipo, ItemCarrinho, Produto } from '../types';

const CarrinhoContexto = createContext<CarrinhoContextoTipo | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setItens(itensAtuais => {
      const itemExistente = itensAtuais.find(item => item.produto.id === produto.id);
      if (itemExistente) {
        return itensAtuais.map(item =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...itensAtuais, { produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (produtoId: string) => {
    setItens(itens.filter(item => item.produto.id !== produtoId));
  };

  const atualizarQuantidade = (produtoId: string, quantidade: number) => {
    if (quantidade < 1) {
      removerDoCarrinho(produtoId);
      return;
    }
    setItens(itens.map(item =>
      item.produto.id === produtoId
        ? { ...item, quantidade }
        : item
    ));
  };

  const total = itens.reduce(
    (soma, item) => soma + item.produto.preco * item.quantidade,
    0
  );

  return (
    <CarrinhoContexto.Provider value={{ 
      itens, 
      adicionarAoCarrinho, 
      removerDoCarrinho, 
      atualizarQuantidade, 
      total 
    }}>
      {children}
    </CarrinhoContexto.Provider>
  );
};

export const useCart = () => {
  const contexto = useContext(CarrinhoContexto);
  if (!contexto) throw new Error('useCart deve ser usado dentro de CartProvider');
  return contexto;
};