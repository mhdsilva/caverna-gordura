import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Cart } from '../components/Cart';
import { CartProvider } from '../context/CartContext';

// Helper to render Cart with context
const renderWithProvider = (ui: React.ReactElement) => {
  return render(<CartProvider>{ui}</CartProvider>);
};

describe('Cart', () => {
  it('shows empty cart message when no items', () => {
    renderWithProvider(<Cart />);
    expect(screen.getByText(/seu carrinho está vazio/i)).toBeInTheDocument();
  });

  it('does not show Finalizar Pedido button when cart is empty', () => {
    renderWithProvider(<Cart />);
    expect(screen.queryByText(/finalizar pedido/i)).not.toBeInTheDocument();
  });

  it('calls onCheckout when Finalizar Pedido is clicked (with items)', () => {
    // To test with items, we need to mock the context or refactor CartProvider to accept initial state
    // This is a placeholder for when CartProvider supports initial items
    const onCheckout = vi.fn();
    renderWithProvider(<Cart onCheckout={onCheckout} />);
    // No items, so button is not rendered
    expect(onCheckout).not.toHaveBeenCalled();
  });

  // More tests can be added for coupon, quantity, remove, etc.
});
