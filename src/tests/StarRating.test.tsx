import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { StarRating } from "../components/StarRating";

describe("StarRating", () => {
  it("renders stars and handles rating", () => {
    const onChange = vi.fn();
    render(<StarRating rating={2} onChange={onChange} />);
    const stars = screen.getAllByRole("button");
    expect(stars.length).toBeGreaterThan(0);
    fireEvent.click(stars[3]);
    expect(onChange).toHaveBeenCalled();
  });

  it("renders correct number of stars and highlights the rating", () => {
    render(<StarRating rating={3} totalStars={5} />);
    const stars = screen.getAllByTestId("star-icon");
    expect(stars.length).toBe(5);
    // The first 3 should be filled, the rest not
    for (let i = 0; i < 3; i++) {
      expect(stars[i]).toHaveClass("fill-current");
    }
    for (let i = 3; i < 5; i++) {
      expect(stars[i]).toHaveClass("text-gray-300");
    }
  });

  it("applies custom className", () => {
    render(<StarRating rating={2} className="custom-class" />);
    expect(screen.getByTestId("star-rating-root")).toHaveClass("custom-class");
  });
});
