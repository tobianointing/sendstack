import { fireEvent, render, screen } from "@testing-library/react";
import { SuccessCard } from "./SuccessCard";

describe("SuccessCard", () => {
  it("renders the success message", () => {
    render(<SuccessCard />);
    const successMessage = screen.getByText(/Your Request Has Been Created/i);
    expect(successMessage).toBeInTheDocument();
  });

  it("renders the waiting message", () => {
    render(<SuccessCard />);
    const waitingMessage = screen.getByText(
      /Waiting for a rider to accept your request and deliver your package/i
    );
    expect(waitingMessage).toBeInTheDocument();
  });

  it("renders the 'Sounds Good' button", () => {
    render(<SuccessCard />);
    const button = screen.getByRole("button", { name: /Sounds Good/i });
    expect(button).toBeInTheDocument();
  });

  it("calls the onStepChange function when the 'Sounds Good' button is clicked", () => {
    const mockOnStepChange = jest.fn();
    render(<SuccessCard onStepChange={mockOnStepChange} />);
    const button = screen.getByRole("button", { name: /Sounds Good/i });
    fireEvent.click(button);
    expect(mockOnStepChange).toHaveBeenCalledWith(1);
  });
});
