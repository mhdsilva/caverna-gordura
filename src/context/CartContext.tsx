import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { CarrinhoContextoTipo, ItemCarrinho, Produto, Coupon } from "../types";
import { coupons } from "../data/coupons";

const CarrinhoContexto = createContext<CarrinhoContextoTipo | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [cupomAplicado, setCupomAplicado] = useState<Coupon | null>(null);
  const [erroCupom, setErroCupom] = useState<string | null>(null);

  const adicionarAoCarrinho = useCallback((produto: Produto) => {
    setItens((itensAtuais: ItemCarrinho[]) => {
      const itemExistente = itensAtuais.find(
        (item: ItemCarrinho) => item.produto.id === produto.id,
      );
      if (itemExistente) {
        return itensAtuais.map((item: ItemCarrinho) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }
      return [...itensAtuais, { produto, quantidade: 1 }];
    });
  }, []);

  const removerDoCarrinho = useCallback((produtoId: string) => {
    setItens((itensAtuais: ItemCarrinho[]) =>
      itensAtuais.filter((item: ItemCarrinho) => item.produto.id !== produtoId),
    );
  }, []);

  const atualizarQuantidade = useCallback(
    (produtoId: string, quantidade: number) => {
      if (quantidade < 1) {
        removerDoCarrinho(produtoId);
        return;
      }
      setItens((itensAtuais: ItemCarrinho[]) =>
        itensAtuais.map((item: ItemCarrinho) =>
          item.produto.id === produtoId ? { ...item, quantidade } : item,
        ),
      );
    },
    [removerDoCarrinho],
  );

  const aplicarCupom = useCallback((codigo: string) => {
    const cupomEncontrado = coupons.find(
      (c) => c.code === codigo.toUpperCase(),
    );
    if (cupomEncontrado) {
      setCupomAplicado(cupomEncontrado);
      setErroCupom(null);
    } else {
      setCupomAplicado(null);
      setErroCupom("Cupom inválido ou expirado.");
    }
  }, []);

  const subtotal = useMemo(
    () =>
      itens.reduce(
        (soma: number, item: ItemCarrinho) =>
          soma + item.produto.preco * item.quantidade,
        0,
      ),
    [itens],
  );

  const total = useMemo(() => {
    if (cupomAplicado) {
      return subtotal * (1 - cupomAplicado.discount);
    }
    return subtotal;
  }, [subtotal, cupomAplicado]);

  const resetCarrinho = useCallback(() => {
    setItens([]);
    setCupomAplicado(null);
    setErroCupom(null);
  }, []);

  const value = useMemo(
    () => ({
      itens,
      adicionarAoCarrinho,
      removerDoCarrinho,
      atualizarQuantidade,
      subtotal,
      total,
      aplicarCupom,
      cupomAplicado,
      erroCupom,
      resetCarrinho,
    }),
    [
      itens,
      subtotal,
      total,
      adicionarAoCarrinho,
      removerDoCarrinho,
      atualizarQuantidade,
      aplicarCupom,
      cupomAplicado,
      erroCupom,
      resetCarrinho,
    ],
  );

  return (
    <CarrinhoContexto.Provider value={value}>
      {children}
    </CarrinhoContexto.Provider>
  );
};

export const useCart = () => {
  const contexto = useContext(CarrinhoContexto);
  if (!contexto)
    throw new Error("useCart deve ser usado dentro de CartProvider");
  return contexto;
};
