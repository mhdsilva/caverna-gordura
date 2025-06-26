import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ReviewModal } from "../components/ReviewModal";
import { CartProvider } from "../context/CartContext";
import { Produto } from "../types";

describe("ReviewModal", () => {
  function renderWithCartProvider(ui: React.ReactElement) {
    return render(<CartProvider>{ui}</CartProvider>);
  }

  const produto: Produto = {
    id: "1",
    nome: "Produto Teste",
    preco: 10,
    descricao: "Descrição",
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
    fireEvent.change(screen.getByLabelText(/seu nome/i), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByLabelText(/seu comentário/i), {
      target: { value: "Ótimo!" },
    });
    // Set rating to 5
    fireEvent.click(screen.getAllByLabelText(/avaliar com 5 estrelas/i)[0]);
    fireEvent.click(screen.getByText(/enviar/i));
    expect(onSubmitReview).toHaveBeenCalledWith({
      author: "User",
      rating: 5,
      comment: "Ótimo!",
    });
  });
});
