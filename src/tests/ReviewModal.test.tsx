import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ReviewModal } from "../components/ReviewModal";
import { CartProvider } from "../context/CartContext";
import type { Produto } from "../types";

describe("ReviewModal", () => {
  function renderWithCartProvider(ui: React.ReactElement) {
    return render(<CartProvider>{ui}</CartProvider>);
  }

  const produto: Produto = {
    id: "1",
    nome: { pt: "Produto Teste", en: "Test Product" },
    preco: 10,
    descricao: { pt: "Descrição", en: "Description" },
    imagem: "",
    categoria: "hamburguer",
    disponivel: true,
    alergenos: [],
    reviews: [{ id: "r1", author: "User", rating: 5, comment: "Ótimo!" }],
  };

  it("renders and submits review", () => {
    const onClose = vi.fn();
    const onSubmitReview = vi.fn();
    renderWithCartProvider(
      <ReviewModal
        produto={produto}
        onClose={onClose}
        onSubmitReview={onSubmitReview}
      />,
    );
    fireEvent.change(screen.getByLabelText("Seu nome"), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByLabelText("Seu comentário"), {
      target: { value: "Ótimo!" },
    });
    // Set rating to 5
    fireEvent.click(screen.getByLabelText("Avaliar com 5 estrela(s)"));
    fireEvent.click(screen.getByText("Enviar avaliação"));
    expect(onSubmitReview).toHaveBeenCalledWith({
      author: "User",
      rating: 5,
      comment: "Ótimo!",
    });
  });
});
