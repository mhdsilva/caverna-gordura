import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

interface AccessibilityContextType {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  isSpeechEnabled: boolean;
  toggleSpeech: () => void;
  speak: (text: string) => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export const AccessibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fontSize, setFontSize] = useState(16);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] =
    useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const increaseFontSize = useCallback(() => {
    setFontSize((prev) => Math.min(prev + 2, 24));
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSize((prev) => Math.max(prev - 2, 12));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setIsHighContrast((prev) => !prev);
    document.documentElement.classList.toggle("high-contrast");
  }, []);

  const toggleSpeech = useCallback(() => {
    setIsSpeechEnabled((prev) => !prev);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (isSpeechEnabled && speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "pt-BR";
        speechSynthesis.speak(utterance);
      }
    },
    [isSpeechEnabled, speechSynthesis],
  );

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const value = useMemo(
    () => ({
      fontSize,
      increaseFontSize,
      decreaseFontSize,
      isHighContrast,
      toggleHighContrast,
      isSpeechEnabled,
      toggleSpeech,
      speak,
    }),
    [
      fontSize,
      increaseFontSize,
      decreaseFontSize,
      isHighContrast,
      toggleHighContrast,
      isSpeechEnabled,
      toggleSpeech,
      speak,
    ],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider",
    );
  }
  return context;
};
