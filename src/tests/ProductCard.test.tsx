import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { ProductCard } from "../components/ProductCard";
import { CartProvider } from "../context/CartContext";
import type { Produto } from "../types";

describe("ProductCard", () => {
  const produto: Produto = {
    id: "1",
    nome: { pt: "Produto Teste", en: "Test Product" },
    preco: 10,
    descricao: { pt: "Descrição do produto", en: "Product description" },
    imagem: "",
    categoria: "hamburguer",
    disponivel: true,
    alergenos: ["glúten"],
    reviews: [{ id: "r1", author: "User", rating: 4, comment: "Ótimo!" }],
  };

  function renderWithCartProvider(ui: React.ReactElement) {
    return render(<CartProvider>{ui}</CartProvider>);
  }

  it("renders product info and handles add to cart", () => {
    renderWithCartProvider(
      <ProductCard produto={produto} onSelectProduct={vi.fn()} />,
    );
    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
    expect(screen.getByText("Descrição do produto")).toBeInTheDocument();
    expect(screen.getByText("Adicionar ao carrinho")).toBeInTheDocument();
  });

  it("disables add to cart if not available", () => {
    renderWithCartProvider(
      <ProductCard
        produto={{ ...produto, disponivel: false }}
        onSelectProduct={vi.fn()}
      />,
    );
    expect(screen.getByText("Indisponível")).toBeDisabled();
  });

  it("calls onSelectProduct when review button is clicked", () => {
    const onSelectProduct = vi.fn();
    renderWithCartProvider(
      <ProductCard produto={produto} onSelectProduct={onSelectProduct} />,
    );
    fireEvent.click(screen.getByLabelText("Ver avaliações de Produto Teste"));
    expect(onSelectProduct).toHaveBeenCalledWith(produto);
  });

  it("shows allergens if present", () => {
    renderWithCartProvider(
      <ProductCard produto={produto} onSelectProduct={vi.fn()} />,
    );
    expect(screen.getByText("Contém: Glúten")).toBeInTheDocument();
  });
});
