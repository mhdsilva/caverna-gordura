import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { AccessibilityControls } from '../components/AccessibilityControls';
import * as AccessibilityContext from '../context/AccessibilityContext';

describe('AccessibilityControls', () => {
  beforeEach(() => {
    vi.spyOn(AccessibilityContext, 'useAccessibility').mockReturnValue({
      increaseFontSize: vi.fn(),
      decreaseFontSize: vi.fn(),
      toggleHighContrast: vi.fn(),
      isHighContrast: false,
      toggleSpeech: vi.fn(),
      isSpeechEnabled: false,
      fontSize: 16,
      speak: vi.fn(),
    });
  });

  it('renders all control buttons', () => {
    render(<AccessibilityControls />);
    expect(screen.getByLabelText('Diminuir fonte')).toBeInTheDocument();
    expect(screen.getByLabelText('Aumentar fonte')).toBeInTheDocument();
    expect(screen.getByLabelText('Alternar alto contraste')).toBeInTheDocument();
    expect(screen.getByLabelText('Alternar narração')).toBeInTheDocument();
  });

  it('calls context functions on button click', () => {
    const increaseFontSize = vi.fn();
    const decreaseFontSize = vi.fn();
    const toggleHighContrast = vi.fn();
    const toggleSpeech = vi.fn();
    vi.spyOn(AccessibilityContext, 'useAccessibility').mockReturnValue({
      increaseFontSize,
      decreaseFontSize,
      toggleHighContrast,
      isHighContrast: false,
      toggleSpeech,
      isSpeechEnabled: false,
      fontSize: 16,
      speak: vi.fn(),
    });
    render(<AccessibilityControls />);
    fireEvent.click(screen.getByLabelText('Diminuir fonte'));
    fireEvent.click(screen.getByLabelText('Aumentar fonte'));
    fireEvent.click(screen.getByLabelText('Alternar alto contraste'));
    fireEvent.click(screen.getByLabelText('Alternar narração'));
    expect(decreaseFontSize).toHaveBeenCalled();
    expect(increaseFontSize).toHaveBeenCalled();
    expect(toggleHighContrast).toHaveBeenCalled();
    expect(toggleSpeech).toHaveBeenCalled();
  });

  it('applies correct style for high contrast and speech enabled', () => {
    vi.spyOn(AccessibilityContext, 'useAccessibility').mockReturnValue({
      increaseFontSize: vi.fn(),
      decreaseFontSize: vi.fn(),
      toggleHighContrast: vi.fn(),
      isHighContrast: true,
      toggleSpeech: vi.fn(),
      isSpeechEnabled: true,
      fontSize: 16,
      speak: vi.fn(),
    });
    render(<AccessibilityControls />);
    const highContrastBtn = screen.getByLabelText('Alternar alto contraste');
    const speechBtn = screen.getByLabelText('Alternar narração');
    expect(highContrastBtn).toHaveClass('text-brand-brown');
    expect(speechBtn).toHaveClass('text-brand-brown');
  });
});
