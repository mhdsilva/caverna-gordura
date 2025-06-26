import '@testing-library/jest-dom';

// Enhanced mock for react-i18next to support all translation keys used in tests/components
import { vi } from 'vitest';

const translations = {
  // General
  welcome: 'Bem-vindo à Caverna da Gordura',
  currency: 'R$',
  emptyCart: 'Seu carrinho está vazio',
  addToCart: 'Adicionar ao carrinho',
  remove: 'Remover',
  checkout: 'Finalizar compra',
  login: 'Entrar',
  logout: 'Sair',
  submit: 'Enviar',
  cancel: 'Cancelar',
  review: 'Avaliar',
  rating: 'Avaliação',
  stars: 'Estrelas',
  // Accessibility
  increaseFont: 'Aumentar fonte',
  decreaseFont: 'Diminuir fonte',
  highContrast: 'Alto contraste',
  // Cart
  cart: 'Carrinho',
  total: 'Total',
  // Payment
  payment: 'Pagamento',
  pay: 'Pagar',
  // Recommendations
  recommendations: 'Recomendações',
  // Product
  product: 'Produto',
  price: 'Preço',
  // Review
  leaveReview: 'Deixe sua avaliação',
  // StarRating
  'starRating.ariaLabel': 'Avaliação de estrelas',
  // ...add more as needed for your tests/components
};

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, options) => {
      // Simple interpolation support
      let value = translations[key];
      if (!value) return key;
      if (options && typeof options === 'object') {
        Object.entries(options).forEach(([k, v]) => {
          value = value.replace(new RegExp(`{{${k}}}`, 'g'), v);
        });
      }
      return value;
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
  Trans: ({ children }) => children,
}));
