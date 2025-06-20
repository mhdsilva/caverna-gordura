import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from '../components/ProductCard';
import { CartProvider } from '../context/CartContext';
import { Produto } from '../types';

describe('ProductCard', () => {
  const produto: Produto = {
    id: '1',
    nome: 'Test',
    preco: 10,
    descricao: 'Descrição do produto',
    imagem: '',
    categoria: 'hamburguer',
    disponivel: true,
    alergenos: ['glúten'],
    reviews: [{ id: 'r1', rating: 4, comentario: 'Ótimo!' }],
  };

  function renderWithCartProvider(ui: React.ReactElement) {
    return render(<CartProvider>{ui}</CartProvider>);
  }

  it('renders product info and handles add to cart', () => {
    renderWithCartProvider(
      <ProductCard produto={produto} onSelectProduct={vi.fn()} />
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Descrição do produto')).toBeInTheDocument();
    expect(screen.getByText(/adicionar ao carrinho/i)).toBeInTheDocument();
  });

  it('disables add to cart if not available', () => {
    renderWithCartProvider(
      <ProductCard produto={{ ...produto, disponivel: false }} onSelectProduct={vi.fn()} />
    );
    expect(screen.getByText(/indisponível/i)).toBeDisabled();
  });

  it('calls onSelectProduct when review button is clicked', () => {
    const onSelectProduct = vi.fn();
    renderWithCartProvider(
      <ProductCard produto={produto} onSelectProduct={onSelectProduct} />
    );
    fireEvent.click(screen.getByLabelText(/ver avaliações/i));
    expect(onSelectProduct).toHaveBeenCalledWith(produto);
  });

  it('shows allergens if present', () => {
    renderWithCartProvider(
      <ProductCard produto={produto} onSelectProduct={vi.fn()} />
    );
    expect(screen.getByText(/contém: glúten/i)).toBeInTheDocument();
  });
});
