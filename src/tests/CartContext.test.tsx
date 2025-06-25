import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartProvider, useCart } from '../context/CartContext';

describe('CartContext', () => {
  it('provides cart context', () => {
    let value: ReturnType<typeof useCart> | undefined;
    function TestComponent() {
      value = useCart();
      return null;
    }
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    expect(value).toBeDefined();
    expect(Array.isArray(value?.itens)).toBe(true);
    expect(typeof value?.adicionarAoCarrinho).toBe('function');
    expect(typeof value?.removerDoCarrinho).toBe('function');
    expect(typeof value?.atualizarQuantidade).toBe('function');
    expect(typeof value?.subtotal).toBe('number');
    expect(typeof value?.total).toBe('number');
    expect(typeof value?.aplicarCupom).toBe('function');
    expect(['object', 'null'].includes(typeof value?.cupomAplicado)).toBe(true);
    expect(['string', 'object'].includes(typeof value?.erroCupom)).toBe(true);
    expect(typeof value?.resetCarrinho).toBe('function');
  });
});
