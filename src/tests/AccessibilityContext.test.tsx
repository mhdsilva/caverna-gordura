import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  AccessibilityProvider,
  useAccessibility,
} from "../context/AccessibilityContext";

describe("AccessibilityContext", () => {
  it("provides accessibility context", () => {
    let value: ReturnType<typeof useAccessibility> | undefined;
    function TestComponent() {
      value = useAccessibility();
      return null;
    }
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>,
    );
    expect(value).toBeDefined();
    expect(typeof value?.increaseFontSize).toBe("function");
    expect(typeof value?.decreaseFontSize).toBe("function");
    expect(typeof value?.toggleHighContrast).toBe("function");
    expect(typeof value?.toggleSpeech).toBe("function");
    expect(typeof value?.speak).toBe("function");
    expect(typeof value?.fontSize).toBe("number");
    expect(typeof value?.isHighContrast).toBe("boolean");
    expect(typeof value?.isSpeechEnabled).toBe("boolean");
  });
});
