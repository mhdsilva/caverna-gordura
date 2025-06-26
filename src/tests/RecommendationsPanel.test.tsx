import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { RecommendationsPanel } from "../components/RecommendationsPanel";
import { Produto } from "../types";
import { CartProvider } from "../context/CartContext";

describe("RecommendationsPanel", () => {
  const produtos: Produto[] = [
    {
      id: "1",
      nome: { pt: "Produto Teste", en: "Test Product" },
      preco: 10,
      descricao: { pt: "Descrição do produto", en: "Product description" },
      imagem: "",
      categoria: "hamburguer",
      disponivel: true,
      alergenos: [],
      reviews: [],
    },
  ];

  function renderWithCartProvider(ui: React.ReactElement) {
    return render(<CartProvider>{ui}</CartProvider>);
  }

  it("renders recommendations", () => {
    renderWithCartProvider(
      <RecommendationsPanel produtos={produtos} onSelectProduct={vi.fn()} />,
    );
    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
    expect(screen.getByText("Descrição do produto")).toBeInTheDocument();
  });

  it("calls onSelectProduct when a product is clicked", () => {
    const onSelectProduct = vi.fn();
    renderWithCartProvider(
      <RecommendationsPanel
        produtos={produtos}
        onSelectProduct={onSelectProduct}
      />,
    );
    // Click the review button (which is the only clickable in ProductCard)
    screen.getByLabelText("Ver avaliações de Produto Teste").click();
    expect(onSelectProduct).toHaveBeenCalledWith(produtos[0]);
  });
});
