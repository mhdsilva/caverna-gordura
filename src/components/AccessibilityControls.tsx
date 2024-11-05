import React from 'react';
import { Eye, Volume2 } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export const AccessibilityControls = () => {
  const { 
    fontSize, 
    increaseFontSize, 
    decreaseFontSize,
    toggleHighContrast,
    isHighContrast,
    toggleSpeech,
    isSpeechEnabled
  } = useAccessibility();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={decreaseFontSize}
        className="p-2 text-brand-yellow hover:text-brand-brown transition-colors"
        aria-label="Diminuir fonte"
      >
        A-
      </button>
      <button
        onClick={increaseFontSize}
        className="p-2 text-brand-yellow hover:text-brand-brown transition-colors"
        aria-label="Aumentar fonte"
      >
        A+
      </button>
      <button
        onClick={toggleHighContrast}
        className={`p-2 transition-colors ${
          isHighContrast ? 'text-brand-brown' : 'text-brand-yellow hover:text-brand-brown'
        }`}
        aria-label="Alternar alto contraste"
      >
        <Eye size={20} />
      </button>
      <button
        onClick={toggleSpeech}
        className={`p-2 transition-colors ${
          isSpeechEnabled ? 'text-brand-brown' : 'text-brand-yellow hover:text-brand-brown'
        }`}
        aria-label="Alternar narração"
      >
        <Volume2 size={20} />
      </button>
    </div>
  );
};