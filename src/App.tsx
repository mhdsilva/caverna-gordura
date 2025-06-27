import React, { useState, useMemo } from "react";
import { Menu, ShoppingCart as CartIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProductCard } from "./components/ProductCard";
import { Cart } from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import { AdminProvider, useAdmin } from "./context/AdminContext";
import {
  AccessibilityProvider,
  useAccessibility,
} from "./context/AccessibilityContext";
import { AccessibilityControls } from "./components/AccessibilityControls";
import { LoginModal } from "./components/LoginModal";
import { Produto, Review } from "./types";
import { ReviewModal } from "./components/ReviewModal";
import { RecommendationsPanel } from "./components/RecommendationsPanel";
import PaymentScreen from "./components/PaymentScreen";

function MainContent() {
  const { t, i18n } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categoria, setCategoria] = useState<
    "all" | "hamburguer" | "acompanhamento" | "bebida"
  >("all");
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const { produtos, alternarDisponibilidade, adicionarAvaliacao } = useAdmin();
  const { speak } = useAccessibility();

  const recommendedProducts = useMemo(() => {
    const calculateAverageRating = (reviews: Review[] | undefined) => {
      if (!reviews || reviews.length === 0) return 0;
      return (
        reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      );
    };

    return [...produtos]
      .sort(
        (a, b) =>
          calculateAverageRating(b.reviews) - calculateAverageRating(a.reviews),
      )
      .slice(0, 5);
  }, [produtos]);

  const produtosFiltrados = produtos.filter(
    (produto: Produto) =>
      categoria === "all" || produto.categoria === categoria,
  );

  const handleReviewSubmit = (review: Omit<Review, "id">) => {
    if (selectedProduct) {
      adicionarAvaliacao(selectedProduct.id, review);
      speak(t("reviewSuccess"));
      // Atualizar o produto selecionado para refletir a nova avaliação no modal
      const produtoAtualizado = produtos.find(
        (p: Produto) => p.id === selectedProduct.id,
      );
      if (produtoAtualizado) {
        const novaAvaliacao = { ...review, id: `rev${Date.now()}` };
        const reviewsAtuais = produtoAtualizado.reviews ?? [];
        setSelectedProduct({
          ...produtoAtualizado,
          reviews: [...reviewsAtuais, novaAvaliacao],
        });
      } else {
        setSelectedProduct(null);
      }
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    speak(t("loginSuccess"));
  };

  const handleContinueWithoutLogin = () => {
    setShowLoginModal(false);
    speak(t("continueWithoutLogin"));
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
              <h1 className="ml-4 text-xl font-bold text-brand-yellow">
                {t("appName")}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => i18n.changeLanguage("pt")}
                  className={`text-sm font-bold ${i18n.language === "pt" ? "text-brand-yellow" : "text-white/70"}`}
                >
                  PT
                </button>
                <span className="text-white/70">|</span>
                <button
                  onClick={() => i18n.changeLanguage("en")}
                  className={`text-sm font-bold ${i18n.language === "en" ? "text-brand-yellow" : "text-white/70"}`}
                >
                  EN
                </button>
              </div>
              <AccessibilityControls />
              {isLoggedIn ? (
                <button
                  onClick={() => setIsAdmin(!isAdmin)}
                  className="text-sm text-brand-yellow hover:text-brand-brown transition-colors"
                >
                  {isAdmin ? t("logoutAdmin") : t("loginAdmin")}
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-sm text-brand-yellow hover:text-brand-brown transition-colors"
                >
                  {t("login")}
                </button>
              )}
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative p-2 text-brand-yellow hover:text-brand-brown transition-colors"
                aria-label={t("cart")}
              >
                <CartIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RecommendationsPanel
          produtos={recommendedProducts}
          onSelectProduct={setSelectedProduct}
        />

        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={() => {
              setCategoria("all");
              speak(t("showingAllProducts"));
            }}
            className={`px-4 py-2 rounded-md transition-colors ${
              categoria === "all"
                ? "bg-brand-yellow text-white"
                : "bg-white text-brand-brown hover:bg-brand-yellow/10"
            }`}
          >
            {t("all")}
          </button>
          <button
            onClick={() => {
              setCategoria("hamburguer");
              speak(t("showingHamburgers"));
            }}
            className={`px-4 py-2 rounded-md transition-colors ${
              categoria === "hamburguer"
                ? "bg-brand-yellow text-white"
                : "bg-white text-brand-brown hover:bg-brand-yellow/10"
            }`}
          >
            {t("hamburgers")}
          </button>
          <button
            onClick={() => {
              setCategoria("acompanhamento");
              speak(t("showingSides"));
            }}
            className={`px-4 py-2 rounded-md transition-colors ${
              categoria === "acompanhamento"
                ? "bg-brand-yellow text-white"
                : "bg-white text-brand-brown hover:bg-brand-yellow/10"
            }`}
          >
            {t("sides")}
          </button>
          <button
            onClick={() => {
              setCategoria("bebida");
              speak(t("showingDrinks"));
            }}
            className={`px-4 py-2 rounded-md transition-colors ${
              categoria === "bebida"
                ? "bg-brand-yellow text-white"
                : "bg-white text-brand-brown hover:bg-brand-yellow/10"
            }`}
          >
            {t("drinks")}
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
              <h2 className="text-xl font-semibold text-brand-brown">
                {t("yourCart")}
              </h2>
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
            <PaymentScreen
              onPaymentSuccess={() => {
                setShowPayment(false);
                setShowCart(false);
              }}
              onClose={() => {
                setShowPayment(false);
              }}
            />
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
