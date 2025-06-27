const getInterpolatedTranslation = (str: string, options: Record<string, string | number>) => {
  const interpolatedTranslations: Record<string, (opts: Record<string, string | number>) => string> = {
    reviewCount: (opts) => `(${opts.count} avaliações)`,
    discount: (opts) => `Desconto (${opts.couponCode})`,
    couponSuccess: (opts) => `Cupom "${opts.couponCode}" aplicado com sucesso!`,
    removeFromCartAria: (opts) => `Remover ${opts.productName} do carrinho`,
    starAria: (opts) => `Avaliar com ${opts.count} estrela(s)`,
    contains: (opts) => `Contém: ${opts.allergens}`,
    selectProductAria: (opts) => `Ver avaliações de ${opts.productName}`,
    addToCartAria: (opts) => `Adicionar ${opts.productName} ao carrinho`,
  };

  return interpolatedTranslations[str]?.(options);
};

export const useTranslation = () => {
  return {
    t: (str: string, options?: Record<string, string | number>) => {
      const translations: Record<string, string> = {
        // General
        welcome: "Bem-vindo à Caverna da Gordura",
        currency: "R$",
        emptyCart: "Seu carrinho está vazio",
        addToCart: "Adicionar ao carrinho",
        remove: "Remover",
        checkout: "Finalizar compra",
        login: "Entrar",
        logout: "Sair",
        submit: "Enviar",
        cancel: "Cancelar",
        review: "Avaliar",
        rating: "Avaliação",
        stars: "Estrelas",
        // Accessibility
        increaseFont: "Aumentar fonte",
        decreaseFont: "Diminuir fonte",
        increaseQuantity: "Aumentar quantidade",
        decreaseQuantity: "Diminuir quantidade",
        highContrast: "Alto contraste",
        toggleHighContrast: "Alternar alto contraste",
        toggleNarration: "Ativar/desativar narração",
        // Cart
        cart: "Carrinho",
        total: "Total",
        subtotal: "Subtotal",
        discountCoupon: "Cupom de desconto",
        enterCoupon: "Digite seu cupom",
        apply: "Aplicar",
        couponInvalid: "Cupom inválido",
        // Login
        doLogin: "Fazer Login com Google",
        continueWithoutRegister: "Continuar sem cadastro",
        closeModal: "Fechar",
        // Review
        yourName: "Seu nome",
        yourComment: "Seu comentário",
        submitReview: "Enviar avaliação",
        // Payment
        payment: "Pagamento",
        orderSummary: "Resumo do pedido",
        cardName: "Nome no cartão",
        cardNumber: "Número do cartão",
        expiryDate: "Data de validade",
        cvv: "CVV",
        pay: "Pagar",
        orderPaid: "Pedido pago com sucesso!",
        closePayment: "Fechar",
        emptyCartMessage: "Seu carrinho está vazio.",
        // Product
        unavailable: "Indisponível",
        glúten: "Glúten",
      };

      if (options) {
        const interpolatedResult = getInterpolatedTranslation(str, options);
        if (interpolatedResult) {
          return interpolatedResult;
        }
      }

      return translations[str] || str;
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: "pt",
    },
  };
};
