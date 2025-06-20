import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RecommendationsPanel } from '../components/RecommendationsPanel';
import { Produto } from '../types';
import { CartProvider } from '../context/CartContext';

describe('RecommendationsPanel', () => {
  const produtos: Produto[] = [
    {
      id: '1',
      nome: 'Test',
      preco: 10,
      descricao: 'Descrição do produto',
      imagem: '',
      categoria: 'hamburguer',
      disponivel: true,
      alergenos: [],
      reviews: [],
    },
  ];

  function renderWithCartProvider(ui: React.ReactElement) {
    return render(<CartProvider>{ui}</CartProvider>);
  }

  it('renders recommendations', () => {
    renderWithCartProvider(
      <RecommendationsPanel produtos={produtos} onSelectProduct={vi.fn()} />
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Descrição do produto')).toBeInTheDocument();
  });

  it('calls onSelectProduct when a product is clicked', () => {
    const onSelectProduct = vi.fn();
    renderWithCartProvider(
      <RecommendationsPanel produtos={produtos} onSelectProduct={onSelectProduct} />
    );
    // Click the review button (which is the only clickable in ProductCard)
    screen.getAllByLabelText(/ver avaliações/i)[0].click();
    expect(onSelectProduct).toHaveBeenCalledWith(produtos[0]);
  });
});
