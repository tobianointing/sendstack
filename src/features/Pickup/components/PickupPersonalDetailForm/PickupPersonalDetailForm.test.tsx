import { render, screen } from "@testing-library/react";
import { PickupPersonalDetailForm } from "./PickupPersonalDetailForm";

describe("PickupPersonalDetailForm", () => {
  it("should render the form fields", () => {
    render(<PickupPersonalDetailForm onNext={() => {}} />);
    expect(screen.getByPlaceholderText("Sender's name")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Sender's phone number")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Sender's alternative phone number")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Sender's email(optional)")
    ).toBeInTheDocument();
  });
});
