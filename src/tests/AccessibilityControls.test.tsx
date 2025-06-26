import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AccessibilityControls } from "../components/AccessibilityControls";
import { AccessibilityContext } from "../context/AccessibilityContext";
import type { AccessibilityContextType } from "../context/AccessibilityContext";

const speak = vi.fn();
const increaseFontSize = vi.fn();
const decreaseFontSize = vi.fn();
const toggleHighContrast = vi.fn();
const toggleSpeech = vi.fn();

const mockAccessibilityContext: AccessibilityContextType = {
  fontSize: 16,
  isHighContrast: false,
  isSpeechEnabled: false,
  speak,
  increaseFontSize,
  decreaseFontSize,
  toggleHighContrast,
  toggleSpeech,
};

const renderWithContext = (
  ui: React.ReactElement,
  providerProps?: Partial<AccessibilityContextType>,
) => {
  return render(
    <AccessibilityContext.Provider
      value={{ ...mockAccessibilityContext, ...providerProps }}
    >
      {ui}
    </AccessibilityContext.Provider>,
  );
};

describe("AccessibilityControls", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all buttons", () => {
    renderWithContext(<AccessibilityControls />);
    expect(screen.getByLabelText("Aumentar fonte")).toBeInTheDocument();
    expect(screen.getByLabelText("Diminuir fonte")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Alternar alto contraste"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Ativar/desativar narração"),
    ).toBeInTheDocument();
  });

  it("calls context functions on button click", () => {
    renderWithContext(<AccessibilityControls />);
    fireEvent.click(screen.getByLabelText("Aumentar fonte"));
    expect(increaseFontSize).toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText("Diminuir fonte"));
    expect(decreaseFontSize).toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText("Alternar alto contraste"));
    expect(toggleHighContrast).toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText("Ativar/desativar narração"));
    expect(toggleSpeech).toHaveBeenCalled();
  });

  it("calls speak on button hover", () => {
    renderWithContext(<AccessibilityControls />, { isSpeechEnabled: true });
    fireEvent.mouseEnter(screen.getByLabelText("Aumentar fonte"));
    expect(speak).toHaveBeenCalledWith("Aumentar fonte");
  });

  it("applies correct style for high contrast and speech enabled", () => {
    const { rerender } = renderWithContext(<AccessibilityControls />, {
      isHighContrast: true,
    });
    expect(screen.getByLabelText("Alternar alto contraste")).toHaveClass(
      "bg-brand-yellow",
    );

    rerender(
      <AccessibilityContext.Provider
        value={{ ...mockAccessibilityContext, isSpeechEnabled: true }}
      >
        <AccessibilityControls />
      </AccessibilityContext.Provider>,
    );
    expect(screen.getByLabelText("Ativar/desativar narração")).toHaveClass(
      "bg-brand-yellow",
    );
  });
});
