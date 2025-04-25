import React, { useState, useMemo } from 'react';
import { Menu, ShoppingCart as CartIcon } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { produtos } from './data/products';
import { CartProvider } from './context/CartContext';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';
import { AccessibilityControls } from './components/AccessibilityControls';
import { LoginModal } from './components/LoginModal';
import { Produto, Review } from './types';
import { ReviewModal } from './components/ReviewModal';
import { RecommendationsPanel } from './components/RecommendationsPanel';
import PaymentScreen from './components/PaymentScreen';

function MainContent() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categoria, setCategoria] = useState<'all' | 'hamburguer' | 'acompanhamento' | 'bebida'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const { produtos, alternarDisponibilidade, adicionarAvaliacao } = useAdmin();
  const { speak } = useAccessibility();

  const recommendedProducts = useMemo(() => {
    const calculateAverageRating = (reviews: Review[] | undefined) => {
      if (!reviews || reviews.length === 0) return 0;
      return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    };

    return [...produtos]
      .sort((a, b) => calculateAverageRating(b.reviews) - calculateAverageRating(a.reviews))
      .slice(0, 5);
  }, [produtos]);

  const produtosFiltrados = produtos.filter(
    (produto: Produto) => categoria === 'all' || produto.categoria === categoria
  );

  const handleReviewSubmit = (review: Omit<Review, 'id'>) => {
    if (selectedProduct) {
      adicionarAvaliacao(selectedProduct.id, review);
      speak('Avaliação enviada com sucesso!');
      // Atualizar o produto selecionado para refletir a nova avaliação no modal
      const produtoAtualizado = produtos.find((p: Produto) => p.id === selectedProduct.id);
      if(produtoAtualizado) {
        const novaAvaliacao = { ...review, id: `rev${Date.now()}` };
        const reviewsAtuais = produtoAtualizado.reviews || [];
        setSelectedProduct({ ...produtoAtualizado, reviews: [...reviewsAtuais, novaAvaliacao] });
      } else {
        setSelectedProduct(null);
      }
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    speak('Login realizado com sucesso');
  };

  const handleContinueWithoutLogin = () => {
    setShowLoginModal(false);
    speak('Continuando sem login');
  };

  return (
    <div className="min-h-screen bg-brand-black/5">
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          onContinueWithoutLogin={handleContinueWithoutLogin}
        />
      )}

      <header className="bg-brand-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 text-brand-yellow" />
              <h1 className="ml-4 text-xl font-bold text-brand-yellow">Caverna da Gordura</h1>
            </div>
            <div className="flex items-center gap-4">
              <AccessibilityControls />
              {isLoggedIn ? (
                <button
                  onClick={() => setIsAdmin(!isAdmin)}
                  className="text-sm text-brand-yellow hover:text-brand-brown transition-colors"
                >
                  {isAdmin ? 'Sair do Modo Admin' : 'Modo Admin'}
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-sm text-brand-yellow hover:text-brand-brown transition-colors"
                >
                  Login
                </button>
              )}
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative p-2 text-brand-yellow hover:text-brand-brown transition-colors"
                aria-label="Carrinho de compras"
              >
                <CartIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RecommendationsPanel produtos={recommendedProducts} onSelectProduct={setSelectedProduct} />

        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={() => {
              setCategoria('all');
              speak('Mostrando todos os produtos');
            }}
            className={`px-4 py-2 rounded-md transition-colors ${
              categoria === 'all'
                ? 'bg-brand-yellow text-white'
                : 'bg-white text-brand-brown hover:bg-brand-yellow/10'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => {
              setCategoria('hamburguer');
              speak('Mostrando hambúrgueres');
            }}
            className={`px-4 py-2 rounded-md transition-colors ${
              categoria === 'hamburguer'
                ? 'bg-brand-yellow text-white'
                : 'bg-white text-brand-brown hover:bg-brand-yellow/10'
            }`}
          >
            Hambúrgueres
          </button>
          <button
            onClick={() => {
              setCategoria('acompanhamento');
              speak('Mostrando acompanhamentos');
            }}
            className={`px-4 py-2 rounded-md transition-colors ${
              categoria === 'acompanhamento'
                ? 'bg-brand-yellow text-white'
                : 'bg-white text-brand-brown hover:bg-brand-yellow/10'
            }`}
          >
            Acompanhamentos
          </button>
          <button
            onClick={() => {
              setCategoria('bebida');
              speak('Mostrando bebidas');
            }}
            className={`px-4 py-2 rounded-md transition-colors ${
              categoria === 'bebida'
                ? 'bg-brand-yellow text-white'
                : 'bg-white text-brand-brown hover:bg-brand-yellow/10'
            }`}
          >
            Bebidas
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtosFiltrados.map((produto: Produto) => (
            <ProductCard
              key={produto.id}
              produto={produto}
              isAdmin={isAdmin}
              onToggleAvailability={alternarDisponibilidade}
              onSelectProduct={setSelectedProduct}
            />
          ))}
        </div>

        {showCart && !showPayment && (
          <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-brand-brown">Seu Carrinho</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-brand-brown hover:text-brand-black transition-colors"
              >
                ✕
              </button>
            </div>
            <Cart onCheckout={() => setShowPayment(true)} />
          </div>
        )}
        {showCart && showPayment && (
          <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl p-6 overflow-y-auto">
            <PaymentScreen onPaymentSuccess={() => {
              setShowPayment(false);
              setShowCart(false);
            }} onClose={() => {
              setShowPayment(false);
            }} />
          </div>
        )}

        {selectedProduct && (
          <ReviewModal 
            produto={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onSubmitReview={handleReviewSubmit}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AccessibilityProvider>
      <AdminProvider>
        <CartProvider>
          <MainContent />
        </CartProvider>
      </AdminProvider>
    </AccessibilityProvider>
  );
}

export default App;