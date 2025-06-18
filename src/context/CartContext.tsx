import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { CarrinhoContextoTipo, ItemCarrinho, Produto } from '../types';

const CarrinhoContexto = createContext<CarrinhoContextoTipo | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const adicionarAoCarrinho = useCallback((produto: Produto) => {
    setItens((itensAtuais: ItemCarrinho[]) => {
      const itemExistente = itensAtuais.find((item: ItemCarrinho) => item.produto.id === produto.id);
      if (itemExistente) {
        return itensAtuais.map((item: ItemCarrinho) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...itensAtuais, { produto, quantidade: 1 }];
    });
  }, []);

  const removerDoCarrinho = useCallback((produtoId: string) => {
    setItens((itensAtuais: ItemCarrinho[]) => itensAtuais.filter((item: ItemCarrinho) => item.produto.id !== produtoId));
  }, []);

  const atualizarQuantidade = useCallback((produtoId: string, quantidade: number) => {
    if (quantidade < 1) {
      removerDoCarrinho(produtoId);
      return;
    }
    setItens((itensAtuais: ItemCarrinho[]) => itensAtuais.map((item: ItemCarrinho) =>
      item.produto.id === produtoId
        ? { ...item, quantidade }
        : item
    ));
  }, [removerDoCarrinho]);

  const total = useMemo(() =>
    itens.reduce(
      (soma: number, item: ItemCarrinho) => soma + item.produto.preco * item.quantidade,
      0
    ), [itens]);

  const value = useMemo(() => ({
    itens,
    adicionarAoCarrinho,
    removerDoCarrinho,
    atualizarQuantidade,
    total
  }), [itens, total, adicionarAoCarrinho, removerDoCarrinho, atualizarQuantidade]);

  return (
    <CarrinhoContexto.Provider value={value}>
      {children}
    </CarrinhoContexto.Provider>
  );
};

export const useCart = () => {
  const contexto = useContext(CarrinhoContexto);
  if (!contexto) throw new Error('useCart deve ser usado dentro de CartProvider');
  return contexto;
};