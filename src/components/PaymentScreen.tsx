import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

const PaymentScreen = ({
  onPaymentSuccess,
  onClose,
}: {
  onPaymentSuccess?: () => void;
  onClose?: () => void;
}) => {
  const { itens, subtotal, total, cupomAplicado, resetCarrinho } = useCart();
  const [nome, setNome] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [pagamentoRealizado, setPagamentoRealizado] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const isFormValid = () => {
    return (
      nome.trim() !== "" &&
      /^\d{16,19}$/.test(numeroCartao.replace(/\s/g, "")) &&
      /^\d{2}\/\d{2}$/.test(validade) &&
      /^\d{3,4}$/.test(cvv)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setPagamentoRealizado(true);
    resetCarrinho();
    if (onPaymentSuccess) onPaymentSuccess();
  };

  if (itens.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{t("emptyCartMessage")}</p>
      </div>
    );
  }

  if (pagamentoRealizado) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          {t("orderPaid")}
        </h2>
        <p className="text-brand-brown">{t("thankYou")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-brown hover:text-brand-black transition-colors"
          aria-label={t("closePayment")}
        >
          <X size={24} />
        </button>
      )}
      <h2 className="text-2xl font-bold text-brand-brown mb-6">
        {t("payment")}
      </h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-brand-brown">
          {t("orderSummary")}
        </h3>
        <ul className="divide-y divide-gray-200 mb-4">
          {itens.map(({ produto, quantidade }) => (
            <li
              key={produto.id}
              className="py-2 flex justify-between items-center"
            >
              <span>
                {produto.nome[i18n.language ?? "pt"]} x{quantidade}
              </span>
              <span>
                {t("currency")} {(produto.preco * quantidade).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between text-brand-brown">
          <span>{t("subtotal")}</span>
          <span>
            {t("currency")} {subtotal.toFixed(2)}
          </span>
        </div>
        {cupomAplicado && (
          <div className="flex justify-between text-green-600">
            <span>{t("discount", { couponCode: cupomAplicado.code })}</span>
            <span>
              - {t("currency")} {(subtotal - total).toFixed(2)}
            </span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg text-brand-brown mt-2">
          <span>{t("total")}</span>
          <span>
            {t("currency")} {total.toFixed(2)}
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nome-cartao"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t("cardName")}
          </label>
          <input
            id="nome-cartao"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-yellow focus:border-brand-yellow"
          />
        </div>
        <div>
          <label
            htmlFor="numero-cartao"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t("cardNumber")}
          </label>
          <input
            id="numero-cartao"
            type="text"
            value={numeroCartao}
            onChange={(e) => setNumeroCartao(e.target.value)}
            required
            maxLength={19}
            placeholder="0000 0000 0000 0000"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-yellow focus:border-brand-yellow"
            inputMode="numeric"
            pattern="[0-9 ]*"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label
              htmlFor="validade-cartao"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("expiryDate")}
            </label>
            <input
              id="validade-cartao"
              type="text"
              value={validade}
              onChange={(e) => setValidade(e.target.value)}
              required
              maxLength={5}
              placeholder="MM/AA"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-yellow focus:border-brand-yellow"
              pattern="\d{2}/\d{2}"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="cvv-cartao"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("cvv")}
            </label>
            <input
              id="cvv-cartao"
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              maxLength={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-yellow focus:border-brand-yellow"
              pattern="\d{3,4}"
              inputMode="numeric"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-brand-yellow text-white py-2 px-4 rounded-md hover:bg-brand-brown transition-colors font-semibold"
          disabled={!isFormValid()}
        >
          {t("pay")}
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;
