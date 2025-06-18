import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { AdminContextoTipo, Produto } from '../types';
import { produtos as produtosIniciais } from '../data/products';

const AdminContexto = createContext<AdminContextoTipo | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [produtos, setProdutos] = useState<Produto[]>(produtosIniciais);

  const alternarDisponibilidade = useCallback((produtoId: string) => {
    setProdutos(produtos.map((produto: Produto) =>
      produto.id === produtoId
        ? { ...produto, disponivel: !produto.disponivel }
        : produto
    ));
  }, [produtos]);

  const value = useMemo(() => ({ alternarDisponibilidade }), [alternarDisponibilidade]);

  return (
    <AdminContexto.Provider value={value}>
      {children}
    </AdminContexto.Provider>
  );
};

export const useAdmin = () => {
  const contexto = useContext(AdminContexto);
  if (!contexto) throw new Error('useAdmin deve ser usado dentro de AdminProvider');
  return contexto;
};