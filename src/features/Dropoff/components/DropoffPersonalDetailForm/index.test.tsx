import { render, screen } from "@testing-library/react";
import { DropoffPersonalDetailForm } from "./DropoffPersonalDetailForm";

describe("DropoffPersonalDetailForm", () => {
  it("renders the form fields", () => {
    render(<DropoffPersonalDetailForm onNext={() => {}} />);
    expect(screen.getByPlaceholderText("Receiver's name")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Receiver's phone number")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Receiver's alternative phone number")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Receiver's email(optional)")
    ).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });
});
