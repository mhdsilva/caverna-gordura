import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Cart } from "../components/Cart";
import type { Coupon, ItemCarrinho } from "../types";

// Mock the lucide-react icons
vi.mock("lucide-react", () => ({
  Minus: () => <span>Minus</span>,
  Plus: () => <span>Plus</span>,
  ShoppingCart: () => <span>ShoppingCart</span>,
  X: () => <span>X</span>,
}));

// Mock the CartContext with correct types
const mockCartContext = {
  itens: [] as ItemCarrinho[],
  removerDoCarrinho: vi.fn(),
  atualizarQuantidade: vi.fn(),
  subtotal: 0,
  total: 0,
  aplicarCupom: vi.fn(),
  cupomAplicado: null as Coupon | null,
  erroCupom: null as string | null,
};

vi.mock("../context/CartContext", () => ({
  useCart: () => mockCartContext,
}));

describe("Cart component", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    mockCartContext.itens = [];
    mockCartContext.subtotal = 0;
    mockCartContext.total = 0;
    mockCartContext.cupomAplicado = null;
    mockCartContext.erroCupom = null;
  });

  it("renders empty cart message when there are no items", () => {
    render(<Cart />);

    expect(screen.getByText("ShoppingCart")).toBeInTheDocument();
    expect(screen.getByText("Seu carrinho está vazio")).toBeInTheDocument();
    expect(screen.queryByText("Finalizar Pedido")).not.toBeInTheDocument();
  });

  it("renders cart items when items are present", () => {
    mockCartContext.itens = [
      {
        produto: {
          id: "1",
          nome: "Produto Teste",
          preco: 100,
          imagem: "test.jpg",
          descricao: "",
          categoria: "hamburguer",
          disponivel: true,
        },
        quantidade: 2,
      },
    ];
    mockCartContext.subtotal = 200;
    mockCartContext.total = 200;

    render(<Cart />);

    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
    expect(screen.getByText("R$ 100.00")).toBeInTheDocument();
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("Finalizar Pedido")).toBeInTheDocument();
  });

  it("calls removerDoCarrinho when remove button is clicked", () => {
    mockCartContext.itens = [
      {
        produto: {
          id: "1",
          nome: "Produto Teste",
          preco: 100,
          imagem: "test.jpg",
          descricao: "",
          categoria: "hamburguer",
          disponivel: true,
        },
        quantidade: 1,
      },
    ];

    render(<Cart />);
    fireEvent.click(screen.getByText("X"));

    expect(mockCartContext.removerDoCarrinho).toHaveBeenCalledWith("1");
  });

  it("calls atualizarQuantidade when quantity buttons are clicked", () => {
    mockCartContext.itens = [
      {
        produto: {
          id: "1",
          nome: "Produto Teste",
          preco: 100,
          imagem: "test.jpg",
          descricao: "",
          categoria: "hamburguer",
          disponivel: true,
        },
        quantidade: 2,
      },
    ];

    render(<Cart />);

    // Test decrease quantity
    fireEvent.click(screen.getByText("Minus"));
    expect(mockCartContext.atualizarQuantidade).toHaveBeenCalledWith("1", 1);

    // Test increase quantity
    fireEvent.click(screen.getByText("Plus"));
    expect(mockCartContext.atualizarQuantidade).toHaveBeenCalledWith("1", 3);
  });

  it("handles coupon application", () => {
    mockCartContext.itens = [
      {
        produto: {
          id: "1",
          nome: "Produto Teste",
          preco: 100,
          imagem: "test.jpg",
          descricao: "",
          categoria: "hamburguer",
          disponivel: true,
        },
        quantidade: 1,
      },
    ];

    render(<Cart />);

    // Enter coupon code and click apply
    const couponInput = screen.getByPlaceholderText("Digite seu cupom");
    fireEvent.change(couponInput, { target: { value: "DESCONTO10" } });
    fireEvent.click(screen.getByText("Aplicar"));

    expect(mockCartContext.aplicarCupom).toHaveBeenCalledWith("DESCONTO10");
  });

  it("shows coupon error message when there is an error", () => {
    mockCartContext.itens = [
      {
        produto: {
          id: "1",
          nome: "Produto Teste",
          preco: 100,
          imagem: "test.jpg",
          descricao: "",
          categoria: "hamburguer",
          disponivel: true,
        },
        quantidade: 1,
      },
    ];
    mockCartContext.erroCupom = "Cupom inválido";

    render(<Cart />);

    expect(screen.getByText("Cupom inválido")).toBeInTheDocument();
  });

  it("shows applied coupon when successful", () => {
    mockCartContext.itens = [
      {
        produto: {
          id: "1",
          nome: "Produto Teste",
          preco: 100,
          imagem: "test.jpg",
          descricao: "",
          categoria: "hamburguer",
          disponivel: true,
        },
        quantidade: 1,
      },
    ];
    mockCartContext.cupomAplicado = {
      code: "DESCONTO10",
      discount: 0.1,
    };
    mockCartContext.subtotal = 100;
    mockCartContext.total = 90;

    render(<Cart />);

    expect(
      screen.getByText('Cupom "DESCONTO10" aplicado com sucesso!'),
    ).toBeInTheDocument();
    expect(screen.getByText("Desconto (DESCONTO10)")).toBeInTheDocument();
    expect(screen.getByText("- R$ 10.00")).toBeInTheDocument();
  });

  it("calls onCheckout when checkout button is clicked", () => {
    mockCartContext.itens = [
      {
        produto: {
          id: "1",
          nome: "Produto Teste",
          preco: 100,
          imagem: "test.jpg",
          descricao: "",
          categoria: "hamburguer",
          disponivel: true,
        },
        quantidade: 1,
      },
    ];
    const mockOnCheckout = vi.fn();

    render(<Cart onCheckout={mockOnCheckout} />);
    fireEvent.click(screen.getByText("Finalizar Pedido"));

    expect(mockOnCheckout).toHaveBeenCalled();
  });
});
