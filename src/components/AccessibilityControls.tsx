import React from "react";
import { Eye, Volume2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAccessibility } from "../context/AccessibilityContext";

export const AccessibilityControls = () => {
  const {
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    isHighContrast,
    toggleSpeech,
    isSpeechEnabled,
    speak,
  } = useAccessibility();
  const { t } = useTranslation();

  const handleMouseEnter = (text: string) => {
    speak(text);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={decreaseFontSize}
        className="p-2 text-brand-yellow hover:text-brand-brown transition-colors"
        aria-label={t("decreaseFont")}
        onMouseEnter={() => handleMouseEnter(t("decreaseFont"))}
      >
        A-
      </button>
      <button
        onClick={increaseFontSize}
        className="p-2 text-brand-yellow hover:text-brand-brown transition-colors"
        aria-label={t("increaseFont")}
        onMouseEnter={() => handleMouseEnter(t("increaseFont"))}
      >
        A+
      </button>
      <button
        onClick={toggleHighContrast}
        className={`p-2 transition-colors ${
          isHighContrast
            ? "bg-brand-yellow text-brand-brown"
            : "text-brand-yellow hover:text-brand-brown"
        }`}
        aria-label={t("toggleHighContrast")}
        onMouseEnter={() => handleMouseEnter(t("toggleHighContrast"))}
      >
        <Eye size={20} />
      </button>
      <button
        onClick={toggleSpeech}
        className={`p-2 transition-colors ${
          isSpeechEnabled
            ? "bg-brand-yellow text-brand-brown"
            : "text-brand-yellow hover:text-brand-brown"
        }`}
        aria-label={t("toggleNarration")}
        onMouseEnter={() => handleMouseEnter(t("toggleNarration"))}
      >
        <Volume2 size={20} />
      </button>
    </div>
  );
};
