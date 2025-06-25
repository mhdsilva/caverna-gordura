export interface Produto {
  id: string;
  nome: { [key: string]: string };
  descricao: { [key: string]: string };
  preco: number;
  imagem: string;
  categoria: 'hamburguer' | 'acompanhamento' | 'bebida';
  disponivel: boolean;
  alergenos?: string[];
  reviews?: Review[];
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
  produtos: Produto[];
  alternarDisponibilidade: (produtoId: string) => void;
  adicionarAvaliacao: (produtoId: string, review: Omit<Review, 'id'>) => void;
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
  resetCarrinho: () => void;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
}