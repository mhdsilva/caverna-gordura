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

      if (str === "reviewCount" && options?.count) {
        return `(${options.count} avaliações)`;
      }
      if (str === "discount" && options?.couponCode) {
        return `Desconto (${options.couponCode})`;
      }
      if (str === "couponSuccess" && options?.couponCode) {
        return `Cupom "${options.couponCode}" aplicado com sucesso!`;
      }
      if (str === "removeFromCartAria" && options?.productName) {
        return `Remover ${options.productName} do carrinho`;
      }
      if (str === "starAria" && options?.count) {
        return `Avaliar com ${options.count} estrela(s)`;
      }
      if (str === "contains" && options?.allergens) {
        return `Contém: ${options.allergens}`;
      }
      if (str === "selectProductAria" && options?.productName) {
        return `Ver avaliações de ${options.productName}`;
      }
      if (str === "addToCartAria" && options?.productName) {
        return `Adicionar ${options.productName} ao carrinho`;
      }

      return translations[str] || str;
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: "pt",
    },
  };
}; 