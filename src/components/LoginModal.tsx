import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
  onContinueWithoutLogin: () => void;
}

export const LoginModal = ({ onClose, onLogin, onContinueWithoutLogin }: LoginModalProps) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label={t('closeModal')}
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold text-brand-brown mb-6">{t('welcome')}</h2>
        
        <div className="space-y-4">
          <button
            onClick={onLogin}
            className="w-full bg-brand-yellow text-white py-3 px-4 rounded-md hover:bg-brand-brown transition-colors"
          >
            {t('doLogin')}
          </button>
          
          <button
            onClick={onContinueWithoutLogin}
            className="w-full bg-white text-brand-brown border-2 border-brand-brown py-3 px-4 rounded-md hover:bg-brand-yellow/10 transition-colors"
          >
            {t('continueWithoutRegister')}
          </button>
        </div>
      </div>
    </div>
  );
};