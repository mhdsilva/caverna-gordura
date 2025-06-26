import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PaymentScreen from "../components/PaymentScreen";
import * as CartContext from "../context/CartContext";

vi.mock("../context/CartContext");

describe("PaymentScreen", () => {
  it("renders cart items and handles payment", () => {
    vi.spyOn(CartContext, "useCart").mockReturnValue({
      itens: [
        {
          produto: {
            id: "1",
            nome: { pt: "Produto Teste", en: "Test Product" },
            preco: 10,
            descricao: { pt: "Descrição Teste", en: "Test Description" },
            imagem: "",
            categoria: "hamburguer",
            disponivel: true,
          },
          quantidade: 1,
        },
      ],
      subtotal: 10,
      total: 10,
      cupomAplicado: null,
      erroCupom: null,
      adicionarAoCarrinho: vi.fn(),
      removerDoCarrinho: vi.fn(),
      atualizarQuantidade: vi.fn(),
      aplicarCupom: vi.fn(),
      resetCarrinho: vi.fn(),
    });
    const onClose = vi.fn();
    render(<PaymentScreen onClose={onClose} />);
    expect(screen.getByText("Produto Teste x1")).toBeInTheDocument();
    expect(screen.getByLabelText("Número do cartão")).toBeInTheDocument();
  });

  it("shows empty cart message if no items", () => {
    vi.spyOn(CartContext, "useCart").mockReturnValue({
      itens: [],
      subtotal: 0,
      total: 0,
      cupomAplicado: null,
      erroCupom: null,
      adicionarAoCarrinho: vi.fn(),
      removerDoCarrinho: vi.fn(),
      atualizarQuantidade: vi.fn(),
      aplicarCupom: vi.fn(),
      resetCarrinho: vi.fn(),
    });
    render(<PaymentScreen onClose={vi.fn()} />);
    expect(screen.getByText("Seu carrinho está vazio.")).toBeInTheDocument();
  });

  it("submits payment and shows success message", async () => {
    const resetCarrinho = vi.fn();
    vi.spyOn(CartContext, "useCart").mockReturnValue({
      itens: [
        {
          produto: {
            id: "1",
            nome: { pt: "Produto Teste", en: "Test Product" },
            preco: 10,
            descricao: { pt: "Descrição Teste", en: "Test Description" },
            imagem: "",
            categoria: "hamburguer",
            disponivel: true,
          },
          quantidade: 1,
        },
      ],
      subtotal: 10,
      total: 10,
      cupomAplicado: null,
      erroCupom: null,
      adicionarAoCarrinho: vi.fn(),
      removerDoCarrinho: vi.fn(),
      atualizarQuantidade: vi.fn(),
      aplicarCupom: vi.fn(),
      resetCarrinho,
    });
    render(<PaymentScreen onClose={vi.fn()} />);
    fireEvent.change(screen.getByLabelText("Nome no cartão"), {
      target: { value: "Nome Teste" },
    });
    fireEvent.change(screen.getByLabelText("Número do cartão"), {
      target: { value: "1234567812345678" },
    });
    fireEvent.change(screen.getByLabelText("Data de validade"), {
      target: { value: "12/34" },
    });
    fireEvent.change(screen.getByLabelText("CVV"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText("Pagar"));
    expect(
      await screen.findByText("Pedido pago com sucesso!"),
    ).toBeInTheDocument();
    expect(resetCarrinho).toHaveBeenCalled();
  });
});
