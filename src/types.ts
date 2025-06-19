export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: 'hamburguer' | 'acompanhamento' | 'bebida';
  disponivel: boolean;
  alergenos?: string[];
}

export interface Coupon {
  code: string;
  discount: number; // e.g., 0.1 for 10%
}

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

export interface AdminContextoTipo {
  alternarDisponibilidade: (produtoId: string) => void;
}

export interface CarrinhoContextoTipo {
  itens: ItemCarrinho[];
  adicionarAoCarrinho: (produto: Produto) => void;
  removerDoCarrinho: (produtoId: string) => void;
  atualizarQuantidade: (produtoId: string, quantidade: number) => void;
  subtotal: number;
  total: number;
  aplicarCupom: (codigo: string) => void;
  cupomAplicado: Coupon | null;
  erroCupom: string | null;
}