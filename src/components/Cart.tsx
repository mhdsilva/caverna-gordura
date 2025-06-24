import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';

export const Cart = ({ onCheckout }: { onCheckout?: () => void }) => {
  const { 
    itens, 
    removerDoCarrinho, 
    atualizarQuantidade, 
    subtotal, 
    total,
    aplicarCupom,
    cupomAplicado,
    erroCupom,
  } = useCart();
  const [codigoCupom, setCodigoCupom] = useState('');
  const { t, i18n } = useTranslation();

  if (itens.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingCart className="mx-auto h-12 w-12 text-brand-yellow" />
        <p className="mt-2 text-gray-500">{t('emptyCart')}</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {itens.map(({ produto, quantidade }) => (
        <div key={produto.id} className="py-4 flex items-center gap-4">
          <img
            src={produto.imagem}
            alt={produto.nome[i18n.language]}
            className="h-16 w-16 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-medium text-brand-brown">{produto.nome[i18n.language]}</h3>
            <p className="text-sm text-gray-500">{t('currency')} {produto.preco.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => atualizarQuantidade(produto.id, quantidade - 1)}
              className="p-1 rounded-full hover:bg-brand-yellow/10 text-brand-brown"
              aria-label={t('decreaseQuantity')}
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center">{quantidade}</span>
            <button
              onClick={() => atualizarQuantidade(produto.id, quantidade + 1)}
              className="p-1 rounded-full hover:bg-brand-yellow/10 text-brand-brown"
              aria-label={t('increaseQuantity')}
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={() => removerDoCarrinho(produto.id)}
            className="p-1 rounded-full hover:bg-brand-yellow/10 text-brand-brown"
            aria-label={t('removeFromCartAria', { productName: produto.nome[i18n.language] })}
          >
            <X size={18} />
          </button>
        </div>
      ))}
      <div className="py-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="coupon-code" className="text-sm font-medium text-gray-700">
            {t('discountCoupon')}
          </label>
          <div className="flex gap-2">
            <input
              id="coupon-code"
              type="text"
              value={codigoCupom}
              onChange={(e) => setCodigoCupom(e.target.value)}
              placeholder={t('enterCoupon')}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-brand-yellow focus:border-brand-yellow"
            />
            <button
              onClick={() => aplicarCupom(codigoCupom)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              {t('apply')}
            </button>
          </div>
          {erroCupom && <p className="text-sm text-red-600 mt-1">{erroCupom}</p>}
          {cupomAplicado && !erroCupom && (
            <p className="text-sm text-green-600 mt-1">
              {t('couponSuccess', { couponCode: cupomAplicado.code })}
            </p>
          )}
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center text-brand-brown">
            <span>{t('subtotal')}</span>
            <span>{t('currency')} {subtotal.toFixed(2)}</span>
          </div>
          {cupomAplicado && (
            <div className="flex justify-between items-center text-green-600">
              <span>{t('discount', { couponCode: cupomAplicado.code })}</span>
              <span>- {t('currency')} {(subtotal - total).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center font-bold text-lg text-brand-brown">
            <span>{t('total')}</span>
            <span>{t('currency')} {total.toFixed(2)}</span>
          </div>
        </div>
        <button
          className="mt-4 w-full bg-brand-yellow text-white py-2 px-4 rounded-md hover:bg-brand-brown transition-colors focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2"
          onClick={onCheckout}
        >
          {t('checkout')}
        </button>
      </div>
    </div>
  );
};