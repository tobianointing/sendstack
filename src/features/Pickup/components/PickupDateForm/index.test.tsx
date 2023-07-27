import { render, screen } from "@testing-library/react";
import { PickupDateForm } from "./PickupDateForm";

describe("PickupDateForm", () => {
  it("should render the form with date and note fields", () => {
    render(<PickupDateForm />);
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Booking Note")).toBeInTheDocument();
  });
});
