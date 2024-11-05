import React, { createContext, useContext, useState } from 'react';
import { AdminContextoTipo } from '../types';
import { produtos as produtosIniciais } from '../data/products';

const AdminContexto = createContext<AdminContextoTipo | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [produtos, setProdutos] = useState(produtosIniciais);

  const alternarDisponibilidade = (produtoId: string) => {
    setProdutos(produtos.map(produto =>
      produto.id === produtoId
        ? { ...produto, disponivel: !produto.disponivel }
        : produto
    ));
  };

  return (
    <AdminContexto.Provider value={{ alternarDisponibilidade }}>
      {children}
    </AdminContexto.Provider>
  );
};

export const useAdmin = () => {
  const contexto = useContext(AdminContexto);
  if (!contexto) throw new Error('useAdmin deve ser usado dentro de AdminProvider');
  return contexto;
};