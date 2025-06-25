import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PaymentScreen from '../components/PaymentScreen';
import * as CartContext from '../context/CartContext';

describe('PaymentScreen', () => {
  it('renders cart items and handles payment', () => {
    vi.spyOn(CartContext, 'useCart').mockReturnValue({
      itens: [
        { produto: { id: '1', nome: 'Test', preco: 10, descricao: '', imagem: '', categoria: 'hamburguer', disponivel: true }, quantidade: 1 }
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
    render(
      <PaymentScreen onClose={onClose} />
    );
    expect(screen.getByText((content) => content.includes('Test'))).toBeInTheDocument();
    expect(screen.getByLabelText(/número do cartão/i)).toBeInTheDocument();
  });

  it('shows empty cart message if no items', () => {
    vi.spyOn(CartContext, 'useCart').mockReturnValue({
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
    expect(screen.getByText(/carrinho está vazio/i)).toBeInTheDocument();
  });

  it('submits payment and shows success message', () => {
    const resetCarrinho = vi.fn();
    vi.spyOn(CartContext, 'useCart').mockReturnValue({
      itens: [
        { produto: { id: '1', nome: 'Test', preco: 10, descricao: '', imagem: '', categoria: 'hamburguer', disponivel: true }, quantidade: 1 }
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
    fireEvent.change(screen.getByLabelText(/nome no cartão/i), { target: { value: 'Nome Teste' } });
    fireEvent.change(screen.getByLabelText(/número do cartão/i), { target: { value: '1234567812345678' } });
    fireEvent.change(screen.getByLabelText(/validade/i), { target: { value: '12/34' } });
    fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });
    fireEvent.click(screen.getByText(/pagar/i));
    expect(screen.getByText(/pedido feito e pago/i)).toBeInTheDocument();
    expect(resetCarrinho).toHaveBeenCalled();
  });
});
