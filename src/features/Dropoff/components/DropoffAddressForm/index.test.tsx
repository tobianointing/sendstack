import { fireEvent, render, screen } from "@testing-library/react";
import { DropoffAddressForm } from "./DropoffAddressForm";

describe("DropoffAddressForm", () => {
  const locations = [
    { name: "Location 1", locationCode: "loc1" },
    { name: "Location 2", locationCode: "loc2" },
  ];

  it("renders the form fields", () => {
    render(<DropoffAddressForm locations={locations} />);
    expect(screen.getByText("Dropoff Area")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Dropoff address e.g 12, Shoprite, Ikeja")
    ).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });

  it("displays error messages for invalid data", async () => {
    render(<DropoffAddressForm locations={locations} />);
    fireEvent.click(screen.getByText("Continue"));
    expect(await screen.findByText(/required/i)).toBeInTheDocument();
  });
});
