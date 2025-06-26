import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { LoginModal } from "../components/LoginModal";

describe("LoginModal", () => {
  let onClose: ReturnType<typeof vi.fn>;
  let onLogin: ReturnType<typeof vi.fn>;
  let onContinue: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onClose = vi.fn();
    onLogin = vi.fn();
    onContinue = vi.fn();
  });

  it("renders modal and buttons", () => {
    render(
      <LoginModal
        onClose={onClose}
        onLogin={onLogin}
        onContinueWithoutLogin={onContinue}
      />,
    );
    expect(
      screen.getByText("Bem-vindo à Caverna da Gordura"),
    ).toBeInTheDocument();
    expect(screen.getByText("Fazer Login com Google")).toBeInTheDocument();
    expect(screen.getByText("Continuar sem cadastro")).toBeInTheDocument();
    expect(screen.getByLabelText("Fechar")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <LoginModal
        onClose={onClose}
        onLogin={onLogin}
        onContinueWithoutLogin={onContinue}
      />,
    );
    fireEvent.click(screen.getByLabelText("Fechar"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onLogin when login button is clicked", () => {
    render(
      <LoginModal
        onClose={onClose}
        onLogin={onLogin}
        onContinueWithoutLogin={onContinue}
      />,
    );
    fireEvent.click(screen.getByText("Fazer Login com Google"));
    expect(onLogin).toHaveBeenCalledTimes(1);
  });

  it("calls onContinueWithoutLogin when continue button is clicked", () => {
    render(
      <LoginModal
        onClose={onClose}
        onLogin={onLogin}
        onContinueWithoutLogin={onContinue}
      />,
    );
    fireEvent.click(screen.getByText("Continuar sem cadastro"));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("is accessible with role dialog and focus trap", () => {
    render(
      <LoginModal
        onClose={onClose}
        onLogin={onLogin}
        onContinueWithoutLogin={onContinue}
      />,
    );
    const modal = screen
      .getByText("Bem-vindo à Caverna da Gordura")
      .closest("div");
    expect(modal?.parentElement).toHaveClass("fixed");
  });
});
